import { useI18n } from "@solid-primitives/i18n";
import { For, Show } from "solid-js";
import { A, useParams } from "solid-start";
import { isAuthenticated } from "~/states/user";
import { SlotsProvider } from "~/types/slots";

type Props = {
  providers: SlotsProvider[];
};

const ProviderNavigation = (props: Props) => {
  const params = useParams<{ provider: string }>();
  const [t, { locale }] = useI18n();

  return (
    <div class="_s_flex _s_overflow-x-scroll _s_pl-2 _s_pr-5 _s_scroll-0 _s_pt-2">
      <div class="_s_position-relative" classList={{ "_s_a-opacity _s_a-b": !params.provider }}>
        <div class="_s_opacity-0--5 _s_aitem-opacity-1">
          <A href="./" class="_s_flex _s_flex-a-center _s_flex-d-column _s_size-w-px--18">
            <span
              class="_s_size-w-px--12 _s_size-h-px--12 _s_color-bg-primary-7 _s_flex _s_flex-a-center 
              _s_flex-j-center _s_b-radius-full _s_b-solid _s_bw-2 _s_b-transparent _s_aitem-b-primary-2"
            >
              <span class="_s_icon _s_icon-xs _s_adj-slots" />
            </span>
            <Show when={isAuthenticated()}>
              <span class="_s_label _s_label-xs _s_white-space-nowrap _s_label-t-c">
                {t("_lang_my_casino_authorized")}
              </span>
            </Show>
            <Show when={!isAuthenticated()}>
              <span class="_s_label _s_label-xs _s_white-space-nowrap _s_label-t-c">
                {t("_lang_all_games_nonauthorized")}
              </span>
            </Show>
          </A>
        </div>
      </div>
      <For each={props.providers}>
        {(item) => (
          <div
            class="_s_position-relative"
            classList={{
              "_s_a-opacity _s_a-b": item.id === Number(params.provider),
              new: item?.new,
            }}
            data-provider-active={item.id === Number(params.provider) || undefined}
            data-provider-name={item.name[locale()]}
          >
            <div class="_s_opacity-0--5 _s_aitem-opacity-1">
              <A
                class="_s_flex _s_flex-d-column _s_flex-a-center _s_size-w-px--18"
                href={`./${item.id}`}
                data-id={`${item?.name[locale()]}-lobby-icon`}
              >
                <span
                  class="_s_size-w-px--12 _s_size-h-px--12 _s_color-bg-primary-7 _s_flex _s_flex-a-center 
                  _s_flex-j-center _s_b-radius-full _s_b-solid _s_bw-2 _s_b-transparent _s_aitem-b-primary-2 _s_p-2"
                >
                  <img
                    src={item.iconImg}
                    alt={item.name[locale()]}
                    class="_s_size-h-max-percent--25 _s_size-w-max-percent--25"
                  />
                </span>
                <span class="_s_label _s_label-xs _s_white-space-nowrap _s_label-t-c">
                  {item.name[locale()]}
                </span>
                <Show when={item.new}>
                  <span
                    class="_s_flex _s_flex-j-center _s_position-absolute _s_position-l-percent--0 
                    _s_position-minus-t-px--2 _s_size-w-percent--25"
                  >
                    <span
                      class="_s_b-radius-sm _s_color-bg-primary-3 _s_pl-1 _s_pr-1 _s_label-xs _s_color-primary-1
                      _s_size-h-px--3 _s_label-t-u"
                    >
                      New
                    </span>
                  </span>
                </Show>
              </A>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};

export default ProviderNavigation;
