import { createStaticUrl } from "~/utils/string";
import { WidgetSliderHeader } from "./WidgetSlider";
import { useI18n } from "@solid-primitives/i18n";

export const AviatorWidget = () => {
  const [t] = useI18n();
  return (
    <div class="_s_color-rgba-bg-primary-0-0--5 _s_position-relative _s_z-1 _s_pb-7">
      <WidgetSliderHeader title="_lang_aviator_header" url="/Aviator" />
      <div class="_s_size-w-percent--25 _s_display-b _s_position-relative">
        <div class="_s_flex _s_flex-a-center _s_flex-j-center">
          <img
            class="_s_size-w-percent--25"
            src={createStaticUrl("/atomic/images/bg/aviator-bg.png")}
            alt={t("_lang_aviator_header")}
          />
        </div>
      </div>
    </div>
  );
};
