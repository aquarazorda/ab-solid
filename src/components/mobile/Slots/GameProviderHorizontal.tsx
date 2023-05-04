import { For, Show, createEffect, createSignal } from "solid-js";
import { useI18n } from "@solid-primitives/i18n";
import { ProviderGameData, SlotsProvider } from "~/types/slots";
import MobileGameWidgetItem from "./GameWidgetItem";
import { A } from "solid-start";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";

type Props = {
  providers?: SlotsProvider[];
  gameData: ProviderGameData;
  shouldObserve?: boolean;
  onObserve?: (e: boolean) => void;
};

const MobileGameProviderHorizontal = (props: Props) => {
  let ref: HTMLDivElement | undefined;
  const [t, { locale }] = useI18n();
  const currentProvider = props.providers?.find(
    ({ id }) => String(id) === props.gameData.providerId
  );

  const [wasVisible, setWasVisible] = createSignal(false);
  const useVisibilityObserver = props.shouldObserve && createVisibilityObserver({ threshold: 0.1 });
  const visible = useVisibilityObserver ? useVisibilityObserver(() => ref) : () => false;

  createEffect(() => {
    if (!wasVisible() && props.shouldObserve && ref && visible()) {
      setWasVisible(true);
      props.onObserve?.(visible());
    }
  });

  return (
    <Show when={currentProvider}>
      {(provider) => (
        <div ref={ref} class="_s_mb-4" data-id={`provider-games-${provider().name[locale()]}`}>
          <div class="_s_flex _s_flex-a-center _s_flex-j-between _s_pl-5 _s_pr-5">
            <div class="_s_flex _s_flex-a-center _s_flex-j-between _s_size-w-percent--25 _s_mb-1">
              <div class="_s_label _s_label-sm _s_label-t-u">{provider().name[locale()]}</div>
              <div class="_s_label _s_label-sm _s_label-t-u _s_color-primary-8">
                {t("__lang_view_all")}
              </div>
            </div>
          </div>
          <div class="_s_flex _s_overflow-x-auto _s_scroll-0 _s_pt-1 _s_pl-4 _s_pr-5 _s_pb-4">
            <For each={props.gameData.games}>
              {(game) => (
                <MobileGameWidgetItem providerName={provider().name[locale()]} game={game} />
              )}
            </For>
            <div class="_s_flex _s_flex-shrink-0 _s_size-w-percent--11 _s_pb-1">
              <A
                href={`./${provider().route}`}
                class="_s_size-w-percent--25 _s_color-bg-primary-4 _s_size-h-percent--25 _s_b-radius-md _s_flex _s_flex-a-center _s_flex-j-center"
              >
                <span class="_s_label _s_label-sm _s_label-t-u _s_label-font-setting-case-on _s_color-primary-8">
                  {t("__lang_view_all")}
                </span>
              </A>
            </div>
          </div>
          <div class="_s_bd-solid _s_bw-2 _s_bd-primary-7 _s_size-w-max-percent--25 _s_ml-5 _s_mr-5 opacity-05" />
        </div>
      )}
    </Show>
  );
};

export default MobileGameProviderHorizontal;