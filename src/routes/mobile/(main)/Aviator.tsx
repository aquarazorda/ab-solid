import { useLanguage } from "~/utils/language";
import { A } from "solid-start";
import PlayButtonBig from "~/components/mobile/Buttons/PlayButtonBig";
import { MainSlider } from "~/components/mobile/Sliders/HomeSlider";
import { getAllSliders } from "~/queries/sliders";
import { BannerData } from "~/types/banner";

const aviatorSlidesFilterFn = (slides: BannerData[]) =>
  slides
    ?.filter(
      ({ byTags, segments }) => (byTags.aviator && !segments?.length) || byTags.visitor_aviator
    )
    .sort((slide1, slide2) => slide1.byTags?.aviator?.order - slide2.byTags?.aviator?.order);

export const routeData = () => {
  const [slides] = getAllSliders(aviatorSlidesFilterFn);
  return { slides };
};

export default function MobileAviatorPage() {
  const [t] = useLanguage();

  return (
    <>
      <MainSlider />
      <div class="_s_color-rgba-bg-primary-0-0--3 _s_p-5 _s_position-relative _s_z-1">
        <PlayButtonBig gameId={4934} icon="aviator">
          {t("_lang_play_aviator")}
        </PlayButtonBig>
      </div>
    </>
  );
}
