import { useI18n } from "@solid-primitives/i18n";

export const FooterDescription = () => {
  const [t] = useI18n();

  return (
    <div class="_s_flex _s_pb-5">
      <i class="_s_color-primary-8 _s_icon _s_icon-lg _s_adj-25"></i>
      <div>
        <div>
          <div class="_s_label _s_label-sm _s_color-primary-8 _s_cursor-pointer">
            {t("_lang_mobile_footer_license")}
          </div>
        </div>
        <div>
          <div class="_s_label _s_label-sm _s_color-primary-8 _s_cursor-pointer">
            {t("__lang_footer_text_first")}
          </div>
        </div>
        <div>
          <div class="_s_label _s_label-sm _s_color-primary-8 _s_cursor-pointer">
            {t("_lang_mobile_footer_copyright")}
          </div>
        </div>
      </div>
    </div>
  );
};
