import { createMemo } from "solid-js";
import { Outlet, useNavigate, useParams, useRouteData } from "solid-start";
import { FilterNavBar, FilterNavItem } from "~/components/mobile/Games/FilterNavBar";
import { MainSlider } from "~/components/mobile/Sliders/HomeSlider";
import { getAllGamesData } from "~/queries/games";
import { getAllSliders } from "~/queries/sliders";
import { createStaticResource } from "~/queries/static";
import { BannerData } from "~/types/banner";

const casinoSlidesFilterFn = (slides: BannerData[]) =>
  slides
    .filter(
      (slide) => (slide.byTags.casino && !slide.segments?.length) || slide.byTags.visitor_casino
    )
    .sort((a, b) => a.byTags.visitor_casino?.order - b.byTags.visitor_casino?.order);

export const routeData = () => {
  const allGames = getAllGamesData();
  const [slides] = getAllSliders(casinoSlidesFilterFn);
  const [navData] = createStaticResource<{ list: FilterNavItem[] }>("providerNavCasinoMobile");

  const casinoGames = createMemo(() => allGames()?.list.filter((game) => game.type === "casino"));

  return { casinoGames, slides, navData };
};

export type CasinoMobileData = typeof routeData;

export default function CasinoMobile() {
  const { navData } = useRouteData<CasinoMobileData>();

  return (
    <>
      <MainSlider />
      <FilterNavBar navItems={navData()} />
      <Outlet />
    </>
  );
}
