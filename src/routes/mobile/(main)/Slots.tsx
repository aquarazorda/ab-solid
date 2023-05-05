import { useI18n } from "@solid-primitives/i18n";
import { Show, Suspense } from "solid-js";
import { Outlet, Title, useParams, useRouteData, useSearchParams } from "solid-start";
import { MainSlider } from "~/components/mobile/Sliders/HomeSlider";
import SlotsCategoryNavigation from "~/components/mobile/Slots/CategoryNavigation";
import MobileSlotsGamePage from "~/components/mobile/Slots/GamePage";
import MobileGameWidgetLoader from "~/components/mobile/Slots/GameWidgetLoader";
import JackpotsComponent from "~/components/mobile/Slots/Jackpots";
import ProviderNavigation from "~/components/mobile/Slots/ProviderNavigation";
import { getAllSliders } from "~/queries/sliders";
import { createWebApiQuery } from "~/queries/webapi";
import { getFilteredGames } from "~/queries/webapi/getFilteredSlotGames";
import { isAuthenticated } from "~/states/user";
import { BannerData } from "~/types/banner";
import { SlotsFilter, SlotsProvider } from "~/types/slots";

export type SlotsRouteData = typeof routeData;
export type SlotsRouteSearchParams = { text?: string; category?: string };

const slotsSlidesFilterFn = (slides: BannerData[]) =>
  slides
    .filter(
      (slide) => (slide.byTags.slots && !slide.segments?.length) || slide.byTags.visitor_slots
    )
    .sort((a, b) => a.byTags.visitor_slots?.order - b.byTags.visitor_slots?.order);

export const slotsRouteDefaultParams = {
  device: "mobile",
  type: "slot",
};

export const routeData = () => {
  const [slides] = getAllSliders(slotsSlidesFilterFn);
  const providers = createWebApiQuery<SlotsProvider[]>({
    path: "games/providers",
    params: () => slotsRouteDefaultParams,
    options: {
      post: false,
      filterFn: (data) => data.slice(1),
    },
  });

  const categories = createWebApiQuery<SlotsFilter[]>({
    path: "games/filters",
    key: () => (isAuthenticated() ? "auth" : "noAuth"),
    params: () => ({
      ...slotsRouteDefaultParams,
    }),
  });

  const searchResults = getFilteredGames({
    from: 0,
    type: "slot",
  });

  return { slides, providers, categories, searchResults };
};

export default function SlotsMobile() {
  const { providers, categories, searchResults } = useRouteData<SlotsRouteData>();
  const [t] = useI18n();
  const params = useParams<{ provider: string }>();
  const [search] = useSearchParams<SlotsRouteSearchParams>();

  return (
    <>
      <Title>Adjarabet.com - {t("__lang__slots")}</Title>
      <MainSlider />
      <ProviderNavigation providers={providers.data || []} />
      <SlotsCategoryNavigation categories={categories.data || []} />
      <Show when={!params.provider || params.provider === "EGT"}>
        <JackpotsComponent type="EGT_MOBILE_NEW_SLOTS" />
      </Show>
      <Show when={search.text}>
        <MobileSlotsGamePage initialData={searchResults.data} />
      </Show>
      <Show when={!search.text}>
        <Suspense fallback={<MobileGameWidgetLoader count={3} />}>
          <Outlet />
        </Suspense>
      </Show>
    </>
  );
}
