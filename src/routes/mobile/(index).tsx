import { useI18n } from "@solid-primitives/i18n";
import { Show, createMemo } from "solid-js";
import { A, useRouteData } from "solid-start";
import { AviatorWidget } from "~/mobile/components/Sliders/Aviator";
import { HomeSlider } from "~/mobile/components/Sliders/HomeSlider";
import { WidgetSlider } from "~/mobile/components/Sliders/WidgetSlider";
import { generateWidgetData } from "~/utils/games";
import { createStaticResource } from "~/queries/utils";
import { BannerData } from "~/types/banner";

export type HomeMobileData = typeof routeData;

export const routeData = () => {
  const [slidersData] = createStaticResource<BannerData[]>(
    "allSlidersDataMobile"
  );

  const [allGamesData] = createStaticResource<{ list: GamesList }>(
    "allGamesDataMobile"
  );

  return { slidersData, allGamesData };
};

export default function Index() {
  const [t] = useI18n();
  const { allGamesData } = useRouteData<HomeMobileData>();
  const games = createMemo(() =>
    generateWidgetData(allGamesData()?.list || [])
  );

  return (
    <div class="_s_size-w-percent--25 _s_container _s_color-bg-primary-0 _s_lg-color-bg-transparent">
      <HomeSlider />
      <div
        data-id="login-button-wrapper"
        class="_s_display-b _s_lg-display-n _s_pl-5 _s_pr-5 _s_size-w-percent--25"
      >
        <A
          data-id="login-button-link"
          class="_s_btn _s_btn-md _s_size-w-percent--25 _s_btn-positive ng-star-inserted"
          href="/mobile/SignUp/ThreeSteps/First"
        >
          <span data-id="login-button-label" class="_s_label _s_label-md">
            {t("_lang_login_button_register")}
          </span>
        </A>
      </div>
      <div class="_s_mt-5">
        <Show when={games()}>
          <WidgetSlider
            title="__lang__slots"
            url="/Slots"
            games={games().slots}
          />
          <WidgetSlider
            title="__lang__casino"
            url="/Casino"
            games={games().casino}
          />
          <WidgetSlider
            title="_lang_id_poker_and_games"
            url="/Games"
            games={games().poker}
          />
          <AviatorWidget />
        </Show>
      </div>
    </div>
  );
}
