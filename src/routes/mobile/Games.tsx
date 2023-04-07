import { useI18n } from "@solid-primitives/i18n";
import { A } from "@solidjs/router";
import { For } from "solid-js";
import { useConfig } from "~/config";
import { MainSlider } from "~/mobile/components/Sliders/HomeSlider";
import { getAllSliders } from "~/queries/sliders";
import { BannerData } from "~/types/banner";

const gameSlidesFilterFn = (slides: BannerData[]) =>
  slides
    ?.filter(({ byTags, segments }) => (byTags.games && !segments?.length) || byTags.visitor_games)
    .sort((slide1, slide2) => slide1.byTags?.games?.order - slide2.byTags?.games?.order);

export const routeData = () => {
  const [slides] = getAllSliders(gameSlidesFilterFn);
  return { slides };
};

export default function MobileGamesPage() {
  const { isAm } = useConfig();
  const [t] = useI18n();
  const games = isAm ? gameListTypesAm : gameListTypes;

  return (
    <>
      <MainSlider />
      <div class="_s_color-rgba-bg-primary-0-0--3 _s_p-5 _s_position-relative _s_z-1">
        <For each={games}>
          {(game) => (
            // TODO
            <A
              href="/Game/id"
              class={`_s_flex _s_flex-a-center _s_b-radius-sm _s_p-7 _s_mb-2 _s_size-w-percent--25 _s_color-bg-${game.bgColor}`}
            >
              <div class="_s_flex _s_flex-a-center _s_size-w-percent--25">
                <span class={`_s_ml-none _s_icon _s_icon-lg _s_adj-${game.icon}`} />
                <span class="_s_label _s_label-md">{t(game.title.langId)}</span>
                <div class="_s_ml-auto">
                  <span class="_s_icon _s_icon-sm _s_ml-auto _s_mr-none _s_adj-arrow-right" />
                </div>
              </div>
            </A>
          )}
        </For>
      </div>
    </>
  );
}

const gameListTypes = [
  {
    bgColor: "primary-10",
    icon: "dominoes",
    title: { lang: true, langId: "_lang_play_dominoes" },
    game: { gameId: "8053", pid: 91, width: 990, height: 600, type: "game" },
  },
  {
    bgColor: "primary-11",
    icon: "bura",
    title: { lang: true, langId: "_lang_play_bura" },
    game: { gameId: "8052", pid: 91, width: 990, height: 600, type: "game" },
  },
  {
    bgColor: "primary-12 _s_color-bg-primary-12", //_s_color-bg-primary-12
    icon: "table-games",
    title: { lang: true, langId: "_lang_play_backgammon" },
    game: { gameId: "8054", pid: 91, width: 990, height: 600, type: "game" },
  },
  {
    bgColor: "primary-13",
    icon: "seka",
    title: { lang: true, langId: "_lang_play_seka" },
    game: { gameId: "8055", pid: 91, width: 990, height: 600, type: "game" },
  },
];

const gameListTypesAm = [
  {
    bgColor: "primary-12",
    icon: "table-games",
    title: { lang: true, langId: "_lang_play_backgammon" },
    game: { gameId: "8054", pid: 84, width: 990, height: 600, type: "game" },
  },
  {
    bgColor: "primary-10",
    icon: "dominoes",
    title: { lang: true, langId: "_lang_play_dominoes" },
    game: { gameId: "8053", pid: 84, width: 990, height: 600, type: "game" },
  },
  {
    bgColor: "primary-13",
    icon: "seka",
    title: { lang: true, langId: "_lang_play_seka" },
    game: { gameId: "8055", pid: 84, width: 990, height: 600, type: "game" },
  },
];
