import { useI18n } from "@solid-primitives/i18n";
import { useParams } from "solid-start";
import { useConfig } from "~/config";
import withHeaderHeight from "~/utils/directives/withHeaderHeight";

false && withHeaderHeight;

export default function PromoMobile() {
  const params = useParams();
  const { isMobile } = useConfig();
  const [, { locale }] = useI18n();

  return (
    <iframe
      use:withHeaderHeight={true}
      src={`https://promos.www.adjarabet.com/${params.name}/?lang=${locale()}&device=${
        isMobile ? "mobile" : "desktop"
      }`}
      frameborder="0"
      style={{ width: "100%", height: "100vh" }}
    />
  );
}
