import { Show, Suspense, createEffect } from "solid-js";
import { Outlet, useParams, useRouteData } from "solid-start";
import { MainSlider } from "~/components/mobile/Sliders/HomeSlider";
import SlotsCategoryNavigation from "~/components/mobile/Slots/CategoryNavigation";
import JackpotsComponent from "~/components/mobile/Slots/Jackpots";
import ProviderNavigation from "~/components/mobile/Slots/ProviderNavigation";
import { getAllSliders } from "~/queries/sliders";
import { createWebApiQuery } from "~/queries/webapi";
import { isAuthenticated } from "~/states/user";
import { BannerData } from "~/types/banner";
import { SlotsFilter, SlotsProvider } from "~/types/slots";

export type SlotsRouteData = typeof routeData;

const slotsSlidesFilterFn = (slides: BannerData[]) =>
  slides
    .filter(
      (slide) => (slide.byTags.slots && !slide.segments?.length) || slide.byTags.visitor_slots
    )
    .sort((a, b) => a.byTags.visitor_slots?.order - b.byTags.visitor_slots?.order);

export const routeData = () => {
  const [slides] = getAllSliders(slotsSlidesFilterFn);
  const providers = createWebApiQuery<SlotsProvider[]>(
    "games/providers",
    () => ({
      device: "mobile",
      type: "slot",
    }),
    false,
    (data) => data.slice(1)
  );

  const categories = createWebApiQuery<SlotsFilter[]>("games/filters", () => ({
    device: "mobile",
    type: "slot",
    isLoggedIn: isAuthenticated(),
  }));

  return { slides, providers, categories };
};

export default function SlotsMobile() {
  const { providers, categories } = useRouteData<SlotsRouteData>();
  const params = useParams<{ provider: string }>();

  return (
    <>
      <MainSlider />
      <Suspense>
        <ProviderNavigation providers={providers() || []} />
      </Suspense>
      <Suspense>
        <SlotsCategoryNavigation categories={categories() || []} />
      </Suspense>
      <Show when={!params.provider || params.provider === "EGT"}>
        <JackpotsComponent type="EGT_MOBILE_NEW_SLOTS" />
      </Show>
      <Outlet />
    </>
  );
}
