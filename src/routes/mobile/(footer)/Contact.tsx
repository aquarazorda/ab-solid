import { useI18n } from "@solid-primitives/i18n";
import { CashdeskContact } from "~/components/mobile/CashDesk/Contact";
import { DescriptionPage } from "~/components/mobile/DescriptionPage";

export default function ContactUsMobile() {
  const [t] = useI18n();

  return (
    <DescriptionPage title={t("_lang_user_info_contact_details_title")}>
      <CashdeskContact />
    </DescriptionPage>
  );
}
