import { For, Show, createMemo } from "solid-js";
import { useI18n } from "@solid-primitives/i18n";
import { ProviderGameData, SlotsProvider } from "~/types/slots";
import MobileGameWidgetItem from "./GameWidgetItem";
import { A, useNavigate } from "solid-start";
import { VisibilityProps, useVisibility } from "~/utils/directives/visibility";

type Props = {
  title?: string;
  providers?: SlotsProvider[];
  gameData: ProviderGameData;
} & VisibilityProps;

const MobileGameProviderHorizontal = (props: Props) => {
  let ref: HTMLDivElement | undefined;
  const [t, { locale }] = useI18n();
  const navigate = useNavigate();

  const currentProvider = props.providers?.find(
    ({ id }) => String(id) === props.gameData.providerId
  );

  const title = createMemo(() => (props.title ? t(props.title) : currentProvider?.name[locale()]));

  useVisibility({
    ref: () => ref,
    onObserve: props.onObserve,
    shouldObserve: props.shouldObserve,
  });

  return (
    <Show when={currentProvider || title()}>
      <div ref={ref} class="_s_mb-4" data-id={`provider-games-${title()}`}>
        <div class="_s_flex _s_flex-a-center _s_flex-j-between _s_pl-5 _s_pr-5">
          <div class="_s_flex _s_flex-a-center _s_flex-j-between _s_size-w-percent--25 _s_mb-1">
            <div class="_s_label _s_label-sm _s_label-t-u">{title()}</div>
            <Show when={currentProvider?.id}>
              <div
                class="_s_label _s_label-sm _s_label-t-u _s_color-primary-8"
                onClick={() => navigate("./" + currentProvider?.id)}
              >
                {t("__lang_view_all")}
              </div>
            </Show>
          </div>
        </div>
        <div class="_s_flex _s_overflow-x-auto _s_scroll-0 _s_pt-1 _s_pl-4 _s_pr-5 _s_pb-4">
          <For each={props.gameData.games}>
            {(game) => <MobileGameWidgetItem providerName={title()} game={game} />}
          </For>
          <Show when={currentProvider?.route}>
            <div class="_s_flex _s_flex-shrink-0 _s_size-w-percent--11 _s_pb-1">
              <A
                href={`./${currentProvider?.route}`}
                class="_s_size-w-percent--25 _s_color-bg-primary-4 _s_size-h-percent--25 
                  _s_b-radius-md _s_flex _s_flex-a-center _s_flex-j-center"
              >
                <span class="_s_label _s_label-sm _s_label-t-u _s_label-font-setting-case-on _s_color-primary-8">
                  {t("__lang_view_all")}
                </span>
              </A>
            </div>
          </Show>
        </div>
        <div class="_s_bd-solid _s_bw-2 _s_bd-primary-7 _s_size-w-max-percent--25 _s_ml-5 _s_mr-5 opacity-05" />
      </div>
    </Show>
  );
};

export default MobileGameProviderHorizontal;
