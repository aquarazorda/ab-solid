import { useI18n } from "@solid-primitives/i18n";
import { For, Show, Suspense, createEffect, createMemo, createSignal, on } from "solid-js";
import { useParams, useRouteData, useSearchParams } from "solid-start";
import { SlotsRouteData, SlotsRouteSearchParams } from "~/routes/mobile/(main)/Slots";
import { SearchGameData } from "~/types/slots";
import MobileGameWidgetItem from "./GameWidgetItem";
import { createStore } from "solid-js/store";
import { getFilteredGames } from "~/queries/webapi/getFilteredSlotGames";
import MobileGameItemLoader from "./GameItemLoader";
import { GameNotFound } from "./NotFound";

type Props = {
  initialData?: SearchGameData;
};

const MobileSlotsGamePage = (props: Props) => {
  const [, { locale }] = useI18n();
  const routeData = useRouteData<SlotsRouteData>();
  const params = useParams<{ provider?: string }>();
  const [loadNumber, setLoadNumber] = createSignal(0);
  const [search] = useSearchParams<SlotsRouteSearchParams>();
  const [lazyData, setLazyData] = createStore<ReturnType<typeof getFilteredGames>[]>([]);

  const currentProvider = createMemo(() =>
    params.provider
      ? routeData.providers.data?.find((provider) => provider.id === Number(params.provider))
      : undefined
  );

  const currentCategory = createMemo(() =>
    search.category
      ? routeData.categories.data?.find((category) => category.id === Number(search.category))
      : undefined
  );

  createEffect(
    on(loadNumber, (number) =>
      setLazyData(
        lazyData.length,
        getFilteredGames({
          from: number,
          type: "slot",
        })
      )
    )
  );

  const onObserve = (idx: number) => () => {
    idx > loadNumber() &&
      props.initialData?.totalCount &&
      idx < props.initialData.totalCount &&
      setLoadNumber(idx);
  };

  return (
    <div class="_s_p-5 _s_pt-none">
      <Show when={!search.text}>
        <h2 class="_s_label _s_label-sm _s_label-t-u _s_label-font-setting-case-on _s_mb-2">
          <span
            class={`_s_icon _s_icon-sm _s_adj-${currentCategory()?.icon || "mines"} _s_ml-none`}
          />
          {currentProvider()?.name[locale()] || currentCategory()?.name[locale()]}
        </h2>
      </Show>
      <Show when={props.initialData?.items.length} fallback={<GameNotFound />}>
        <div class="_s_flex _s_flex-wrap _s_flex-j-between">
          <For each={props.initialData?.items}>
            {(gameItem, idx) => (
              <MobileGameWidgetItem
                game={gameItem}
                providerName={currentProvider()?.name[locale()]}
                shouldObserve={props.initialData!.items.length - 1 === idx()}
                onObserve={onObserve(idx() + 1)}
                big
              />
            )}
          </For>
          <Suspense fallback={<MobileGameItemLoader count={8} />}>
            <For each={lazyData}>
              {(gameData, lazyIdx) => (
                <For each={gameData.data?.items}>
                  {(gameItem, idx) => (
                    <MobileGameWidgetItem
                      game={gameItem}
                      providerName={currentProvider()?.name[locale()]}
                      shouldObserve={gameData.data!.items.length - 1 === idx()}
                      onObserve={onObserve(lazyIdx() * 8 + idx() + 8)}
                      big
                    />
                  )}
                </For>
              )}
            </For>
          </Suspense>
        </div>
      </Show>
    </div>
  );
};

export default MobileSlotsGamePage;
