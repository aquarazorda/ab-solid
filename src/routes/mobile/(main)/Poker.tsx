import { useLanguage } from "~/utils/language";
import { A } from "solid-start";
import PlayButtonBig from "~/components/mobile/Buttons/PlayButtonBig";
import { MainSlider } from "~/components/mobile/Sliders/HomeSlider";
import { getAllSliders } from "~/queries/sliders";
import { BannerData } from "~/types/banner";

const pokerSlidesFilterFn = (slides: BannerData[]) =>
  slides
    ?.filter(({ byTags, segments }) => (byTags.poker && !segments?.length) || byTags.visitor_poker)
    .sort((slide1, slide2) => slide1.byTags?.poker?.order - slide2.byTags?.poker?.order);

export const routeData = () => {
  const [slides] = getAllSliders(pokerSlidesFilterFn);
  return { slides };
};

export default function MobilePokerPage() {
  const [t] = useLanguage();

  return (
    <>
      <MainSlider />
      <div class="_s_color-rgba-bg-primary-0-0--3 _s_p-5 _s_position-relative _s_z-1">
        <PlayButtonBig gameId={541964} icon="poker">
          {t("_lang_play_poker")}
        </PlayButtonBig>
      </div>
    </>
  );
}
