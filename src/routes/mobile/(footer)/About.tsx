import { useLanguage } from "~/utils/language";
import { useRouteData } from "solid-start";
import { DescriptionPage } from "~/components/mobile/DescriptionPage";
import { createPageData } from "~/queries/pages";

export const routeData = () => createPageData("pg_3");

export default function AboutMobile() {
  const [t] = useLanguage();
  const about = useRouteData<typeof routeData>();

  return <DescriptionPage title={t("__lang_footer_about_us")} class="_s_mt-4" inner={about()} />;
}
