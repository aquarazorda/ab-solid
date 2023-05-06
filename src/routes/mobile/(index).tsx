import { Show, Suspense, createMemo } from "solid-js";
import { A, useRouteData } from "solid-start";
import { AviatorWidget } from "~/components/mobile/Sliders/Aviator";
import { MainSlider, homePageSliderFilterFn } from "~/components/mobile/Sliders/HomeSlider";
import { WidgetSlider } from "~/components/mobile/Sliders/WidgetSlider";
import { generateWidgetData } from "~/utils/games";
import { getAllSliders } from "~/queries/sliders";
import { getAllGamesData } from "~/queries/games";
import { useUser } from "~/states/user";
import { useLanguage } from "~/utils/language";

export type HomeMobileData = typeof routeData;

export const routeData = () => {
  const [slides] = getAllSliders(homePageSliderFilterFn);
  const allGamesData = getAllGamesData();

  return { slides, allGamesData };
};

export default function Index() {
  const [t] = useLanguage();
  const [, { isAuthenticated }] = useUser();
  const { allGamesData } = useRouteData<HomeMobileData>();
  const games = createMemo(() => generateWidgetData(allGamesData()?.list || []));

  return (
    <div class="_s_size-w-percent--25 _s_container _s_color-bg-primary-0 _s_lg-color-bg-transparent">
      <MainSlider />
      <div
        data-id="login-button-wrapper"
        class="_s_display-b _s_lg-display-n _s_pl-5 _s_pr-5 _s_size-w-percent--25"
      >
        <Show when={!isAuthenticated()}>
          <A
            data-id="login-button-link"
            class="_s_btn _s_btn-md _s_size-w-percent--25 _s_btn-positive ng-star-inserted"
            href="/mobile/SignUp/ThreeSteps/First"
          >
            <span data-id="login-button-label" class="_s_label _s_label-md">
              {t("_lang_login_button_register")}
            </span>
          </A>
        </Show>
      </div>
      <div class="_s_mt-5">
        <Suspense>
          <Show when={games()}>
            <WidgetSlider title="__lang__slots" url="Slots" games={games().slots} />
            <WidgetSlider title="__lang__casino" url="Casino" games={games().casino} />
            <WidgetSlider title="_lang_id_poker_and_games" url="Games" games={games().poker} />
            <AviatorWidget />
          </Show>
        </Suspense>
      </div>
    </div>
  );
}
