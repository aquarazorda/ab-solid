import { BannerData } from "~/types/banner";
import { createMemo, createResource } from "solid-js";

type SliderFilterFn = (banners: BannerData[]) => BannerData[];

export const getAllSliders = (filterFn: SliderFilterFn) => {
  const [slidersData] = createResource<BannerData[]>(() =>
    import("~/data/json/allSlidersDataMobile.json").then((res) => res.default)
  );
  const slides = createMemo(() => (slidersData() ? filterFn(slidersData() || []) : []));

  return [slides];
};
