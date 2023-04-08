import { useI18n } from "@solid-primitives/i18n";

export const PromoEmptyContainer = (props: { filter: string }) => {
  const [t] = useI18n();

  return (
    <div
      class="_s_flex _s_flex-j-center _s_size-h-percent--25 _s_b-solid _s_b-radius-sm _s_bw-1 
      _s_b-primary-7 _s_bd-primary-7 _s_mb-8 _s_size-h-min-px--87"
    >
      <div class="_s_flex _s_flex-a-center _s_label-a-center">
        <i class="_s_icon _s_icon-sm _s_color-primary-8 _s_mr-3 _s_adj-information-circle" />
        <span class="_s_label _s_label-sm _s_color-primary-8">
          {t("_lang_promotion_page_2nd_placeholder").replace("__games__", props.filter)}
        </span>
      </div>
    </div>
  );
};
