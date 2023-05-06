import { useLanguage } from "~/utils/language";
import { useRouteData } from "solid-start";
import { DescriptionPage } from "~/components/mobile/DescriptionPage";
import { createPageData } from "~/queries/pages";

export const routeData = () => createPageData("pg_5");

export default function PrivacyMobile() {
  const [t] = useLanguage();
  const privacy = useRouteData<typeof routeData>();

  return <DescriptionPage title={t("__lang_footer_confidental")} inner={privacy()} />;
}
