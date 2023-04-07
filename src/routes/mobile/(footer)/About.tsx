import { useI18n } from "@solid-primitives/i18n";
import { useRouteData } from "solid-start";
import { createPageData } from "~/queries/pages";

export const routeData = () => createPageData("pg_3");

export default function AboutMobile() {
  const [t] = useI18n();
  const about = useRouteData<typeof routeData>();

  return (
    <div class="_s_container _s_flex _s_flex-wrap _s_mb-5 _s_size-w-percent--25">
      <div class="_s_size-w-percent--25">
        <span class="_s_label _s_label-md _s_color-primary-1 _s_bd-primary-7 _s_bd-solid _s_bw-1 _s_color-bg-primary-4 _s_flex _s_flex-a-center _s_mb-4 _s_p-5">
          {t("__lang_footer_about_us")}
        </span>
      </div>
      <div
        class="_s_pl-5 _s_pr-5 _s_color-primary-8 _s_label _s_flex-d-column _s_flex-a-start"
        innerHTML={about()} // eslint-disable-line
      />
    </div>
  );
}
