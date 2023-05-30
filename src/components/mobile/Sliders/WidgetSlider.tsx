import { For, Show, Suspense, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { createSlider } from "solid-slider";
import { A } from "solid-start";
import { Loader } from "~/components/Loader";
import { GamesList } from "~/types/game";
import { useOpenGame } from "~/utils/games";
import { useLanguage } from "~/utils/language";
import { createStaticUrl } from "~/utils/string";

type HeaderProps = { title: string; url: string };

export const WidgetSliderHeader = (props: HeaderProps) => {
  const [t] = useLanguage();

  return (
    <div class="_s_flex _s_flex-a-center _s_p-3" style={{ height: "48px" }}>
      <div class="_s_icon _s_icon-md _s_color-primary-3 _s_adj-slots" />
      <A href={`/mobile/${props.url}`}>
        <span class="_s_label _s_label-md _s_label-t-u _s_z-1">{t(props.title)}</span>
      </A>
      <a class="_s_ml-auto ng-star-inserted" href={`/mobile/${props.url}`}>
        <div class="_s_flex _s_flex-a-center">
          <span data-id="all" class="_s_label _s_label-sm">
            {t("_lang_slots_allgames")}
          </span>
          <i data-id="all" class="_s_adj-arrow-right _s_icon _s_icon-xs _s_m-none" />
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
  const [t, { locale }] = useLanguage();
  const [slider, { current, details }] = createSlider({
    slides: {
      perView: 2,
      spacing: 8,
    },
    loop: true,
  });

  const [loaded, setLoaded] = createStore<Record<number, boolean>>({});
  const openGame = useOpenGame();

  createEffect(() => {
    setLoaded(current(), true);
    setLoaded(current() + 1, true);
  });

  return (
    <div class="_s_color-rgba-bg-primary-0-0--5 _s_mt-none _s_overflow-hidden _s_position-relative _s_size-h-percent--25 _s_mb-5">
      <WidgetSliderHeader title={props.title} url={props.url} />
      <div
        use:slider
        class="_s_b-radius-sm _s_flex _s_position-relative _s_size-h-percent--25 _s_z-1 _s_lg-overflow-hidden"
        style={{ "min-height": "135.24px" }}
      >
        <For each={props.games}>
          {(game, idx) => {
            const [imgLoaded, setImgLoaded] = createSignal(false);

            return (
              <div>
                <Show when={loaded[idx()] && !imgLoaded()}>
                  <div class="_s_size-w-percent--25 _s_size-h-percent--25 _s_flex _s_b-radius-sm _s_lg-b-radius-none _s_flex-a-center">
                    <Loader />
                  </div>
                </Show>
                <Show when={loaded[idx()]}>
                  <img
                    loading="lazy"
                    onClick={() => openGame(game.id)}
                    class="_s_size-w-percent--25 _s_flex _s_b-radius-sm _s_lg-b-radius-none"
                    src={createStaticUrl(`/images/common/${game.id}_${locale()}.jpg`)}
                    alt={t(game.title.langId)}
                    data-id="empty"
                    onLoad={() => setImgLoaded(true)}
                  />
                </Show>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};
