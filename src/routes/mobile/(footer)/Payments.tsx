import { useI18n } from "@solid-primitives/i18n";
import { useRouteData } from "solid-start";
import { createPageData } from "~/queries/pages";

export const routeData = () => createPageData("pg_6");

export default function PaymentsMobile() {
  const [t] = useI18n();
  const payments = useRouteData<typeof routeData>();

  return (
    <div class="__s_position-relative _s_container _s_size-h-min-px--125">
      <div class="_s_bd-primary-5 _s_bd-solid _s_bw-1 _s_container _s_flex _s_p-6 _s_size-w-percent--25">
        <span class="_s_label _s_label-lg _s_label-font-setting-case-on">
          {t("__lang_footer_payment_methods")}
        </span>
      </div>
      <div
        class="_s_pr-6 _s_pl-6 _s_pb-6 _s_color-primary-8 _s_label-sm"
        innerHTML={payments()} // eslint-disable-line
      />
    </div>
  );
}
