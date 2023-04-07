import { useI18n } from "@solid-primitives/i18n";
import { For } from "solid-js";
import { createSlider } from "solid-slider";
import { A } from "solid-start";
import { createStaticUrl } from "~/utils/string";

type HeaderProps = { title: string; url: string };

export const WidgetSliderHeader = (props: HeaderProps) => {
  const [t] = useI18n();

  return (
    <div class="_s_flex _s_flex-a-center _s_p-3">
      <div class="_s_icon _s_icon-md _s_color-primary-3 _s_adj-slots"></div>
      <A href={`/mobile/${props.url}`}>
        <span class="_s_label _s_label-md _s_label-t-u _s_z-1">
          {t(props.title)}
        </span>
      </A>
      <a class="_s_ml-auto ng-star-inserted" href="/mobile/ka/Slots">
        <div class="_s_flex _s_flex-a-center">
          <span data-id="all" class="_s_label _s_label-sm">
            {t("_lang_slots_allgames")}
          </span>
          <i
            data-id="all"
            class="_s_adj-arrow-right _s_icon _s_icon-xs _s_m-none"
          ></i>
        </div>
      </a>
    </div>
  );
};

type Props = {
  title: string;
  url: string;
  games: GamesList;
};

export const WidgetSlider = (props: Props) => {
  const [t, { locale }] = useI18n();
  const [slider] = createSlider({
    slides: {
      perView: 2,
    },
    loop: true,
  });

  return (
    <div class="_s_color-rgba-bg-primary-0-0--5 _s_mt-none _s_overflow-hidden _s_position-relative _s_size-h-percent--25 _s_mb-5">
      <WidgetSliderHeader title={props.title} url={props.url} />
      <div class="_s_b-radius-sm _s_flex _s_position-relative _s_size-h-percent--25 _s_z-1 _s_lg-overflow-hidden _s_size-h-min-px--30">
        <div use:slider>
          <For each={props.games}>
            {(game) => (
              <div class="_s_cursor-pointer _s_display-f _s_overflow-hidden">
                <div class="_s_size-w-percent--25 _s_flex _s_overflow-hidden _s_pl-1 _s_pr-1 _s_lg-pl-none _s_lg-pr-none">
                  <img
                    loading="lazy"
                    class="_s_size-w-percent--25 _s_flex _s_b-radius-sm _s_lg-b-radius-none"
                    src={createStaticUrl(
                      `/images/common/${game.id}_${locale()}.jpg`
                    )}
                    // src="https://newstatic.adjarabet.com/static/images/common/550131_en.jpg"
                    alt={t(game.title.langId)}
                    data-id="empty"
                  />
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};
