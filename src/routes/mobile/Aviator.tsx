import { useI18n } from "@solid-primitives/i18n";
import { A } from "solid-start";
import PlayButtonBig from "~/mobile/components/Buttons/PlayButtonBig";
import { MainSlider } from "~/mobile/components/Sliders/HomeSlider";
import { getAllSliders } from "~/queries/sliders";
import { BannerData } from "~/types/banner";

const aviatorSlidesFilterFn = (slides: BannerData[]) =>
  slides
    ?.filter(({ byTags, segments }) => (byTags.aviator && !segments?.length) || byTags.visitor_aviator)
    .sort((slide1, slide2) => slide1.byTags?.aviator?.order - slide2.byTags?.aviator?.order);

export const routeData = () => {
  const [slides] = getAllSliders(aviatorSlidesFilterFn);
  return { slides };
};

export default function MobileAviatorPage() {
  const [t] = useI18n();

  return (
    <>
      <MainSlider />
      <div class="_s_color-rgba-bg-primary-0-0--3 _s_p-5 _s_position-relative _s_z-1">
        {/* Todo */}
        <PlayButtonBig href="/Aviator" icon="aviator">
          {t("_lang_play_aviator")}
        </PlayButtonBig>
      </div>
    </>
  );
}
