import { RouteDataArgs, useRouteData, useSearchParams } from "solid-start";
import { SlotsRouteData, SlotsRouteSearchParams } from "../Slots";
import {
  Accessor,
  For,
  Show,
  Suspense,
  createEffect,
  createMemo,
  createSignal,
  on,
} from "solid-js";
import MobileGameProviderHorizontal from "~/components/mobile/Slots/GameProviderHorizontal";
import { createStore } from "solid-js/store";
import MobileGameWidgetLoader from "~/components/mobile/Slots/GameWidgetLoader";
import { getProviderGames } from "~/queries/webapi/getProviderGames";
import MobileSlotsGamePage from "~/components/mobile/Slots/GamePage";

export const routeData = ({ data }: RouteDataArgs<SlotsRouteData>) => {
  const [search] = useSearchParams<SlotsRouteSearchParams>();

  const initialProviderData = getProviderGames(
    createMemo(() => (!search.text && !search.category ? data.providers.data : undefined)),
    0
  );

  return {
    initialProviderData,
    providers: data.providers,
    categories: data.categories,
    categoryData: data.searchResults,
  };
};

export default function MobileSlotsMain() {
  const data = useRouteData<typeof routeData>();
  const [search] = useSearchParams<SlotsRouteSearchParams>();
  const [loadNumber, setLoadNumber] = createSignal(0);
  const [lazyData, setLazyData] = createStore<ReturnType<typeof getProviderGames>[]>([]);
  const blocksToLoad = 3;

  createEffect(
    on(loadNumber, (number) => {
      if (number) {
        setLazyData(
          lazyData.length,
          getProviderGames(() => data.providers.data, number)
        );
      }
    })
  );

  const onObserve = (idx: number) => () => {
    idx > loadNumber() &&
      data.providers.data?.length &&
      idx < data.providers.data?.length &&
      setLoadNumber(idx);
  };

  return (
    <>
      <Show when={search.category}>
        <MobileSlotsGamePage initialData={data.categoryData?.data} />
      </Show>
      <Show when={!search.category}>
        <div class="_s_color-bg-primary-0 _s_pt-1 _s_pb-1">
          <For each={data.initialProviderData.data}>
            {(gameItem, idx) => (
              <MobileGameProviderHorizontal
                shouldObserve={idx() === data.initialProviderData.data!.length - 1}
                onObserve={onObserve(idx() + 1)}
                providers={data.providers.data}
                gameData={gameItem}
              />
            )}
          </For>
          <For each={lazyData}>
            {(providerData, providerIdx) => (
              <Suspense fallback={<MobileGameWidgetLoader count={3} />}>
                <For each={providerData.data}>
                  {(gameItem, idx) => (
                    <MobileGameProviderHorizontal
                      shouldObserve={idx() === providerData.data!.length - 1}
                      onObserve={onObserve(blocksToLoad + (providerIdx() + 1) * blocksToLoad)}
                      providers={data.providers.data}
                      gameData={gameItem}
                    />
                  )}
                </For>
              </Suspense>
            )}
          </For>
        </div>
      </Show>
    </>
  );
}
