import { useI18n } from "@solid-primitives/i18n";
import { useRouteData } from "solid-start";
import { DescriptionPage } from "~/components/mobile/DescriptionPage";
import { createPageData } from "~/queries/pages";

export const routeData = () => createPageData("pg_6");

export default function PaymentsMobile() {
  const [t] = useI18n();
  const payments = useRouteData<typeof routeData>();

  return <DescriptionPage title={t("__lang_footer_payment_methods")} inner={payments()} />;
}
