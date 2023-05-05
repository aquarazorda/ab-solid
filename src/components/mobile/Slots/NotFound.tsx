import { useI18n } from "@solid-primitives/i18n";

export const GameNotFound = () => {
  const [t] = useI18n();

  return (
    <div class="_s_flex _s_flex-d-column _s_flex-a-center _s_pt-10 _s_pb-10 _s_mt-6">
      <span class="_s_icon _s_adj-search _s_color-primary-8 _s_mb-2" />
      <span class="_s_label _s_color-primary-8 _s_label-sm">{t("_lang_game_not_found")}</span>
    </div>
  );
};
