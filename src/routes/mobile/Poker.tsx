import { useI18n } from "@solid-primitives/i18n";
import { A } from "solid-start";
import PlayButtonBig from "~/mobile/components/Buttons/PlayButtonBig";
import { MainSlider } from "~/mobile/components/Sliders/HomeSlider";
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
  const [t] = useI18n();

  return (
    <>
      <MainSlider />
      <div class="_s_color-rgba-bg-primary-0-0--3 _s_p-5 _s_position-relative _s_z-1">
        {/* Todo */}
        <PlayButtonBig href="/Poker" icon="poker">
          {t("_lang_play_poker")}
        </PlayButtonBig>
      </div>
    </>
  );
}
