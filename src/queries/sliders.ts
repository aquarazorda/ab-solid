import { BannerData } from "~/types/banner";
import { createStaticResource } from "./utils";
import { createMemo } from "solid-js";
import { useConfig } from "~/config";

type SliderFilterFn = (banners: BannerData[]) => BannerData[];

export const getAllSliders = (filterFn: SliderFilterFn) => {
  const { isMobile } = useConfig();

  const [slidersData] = createStaticResource<BannerData[]>(
    isMobile ? "allSlidersDataMobile" : "allSlidersData"
  );
  const slides = createMemo(() => (slidersData() ? filterFn(slidersData() || []) : []));

  return [slides];
};
