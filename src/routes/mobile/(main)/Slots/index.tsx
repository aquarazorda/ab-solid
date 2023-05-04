import { RouteDataArgs, useRouteData } from "solid-start";
import { SlotsRouteData } from "../Slots";
import { For, Show, Suspense, createEffect, createMemo, createSignal, on } from "solid-js";
import MobileGameProviderHorizontal from "~/components/mobile/Slots/GameProviderHorizontal";
import { createStore } from "solid-js/store";
import MobileGameWidgetLoader from "~/components/mobile/Slots/GameWidgetLoader";
import { createArrFromNum } from "~/utils/common";
import { getProviderGames } from "~/queries/webapi/getProviderGames";

export const routeData = ({ data }: RouteDataArgs<SlotsRouteData>) => {
  const initialProviderData = getProviderGames(
    createMemo(() => data.providers.data),
    0
  );

  return { initialProviderData, providers: data.providers };
};

export default function MobileSlotsMain() {
  const data = useRouteData<typeof routeData>();
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
          <Suspense>
            <Show when={providerData.isFetched}>
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
            </Show>
            <Show when={providerData.isLoading}>
              <For each={createArrFromNum(3)}>{() => <MobileGameWidgetLoader count={3} />}</For>
            </Show>
          </Suspense>
        )}
      </For>
    </div>
  );
}
