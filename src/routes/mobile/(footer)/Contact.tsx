import { useLanguage } from "~/utils/language";
import { CashdeskContact } from "~/components/mobile/CashDesk/Contact";
import { DescriptionPage } from "~/components/mobile/DescriptionPage";

export default function ContactUsMobile() {
  const [t] = useLanguage();

  return (
    <DescriptionPage title={t("_lang_user_info_contact_details_title")}>
      <CashdeskContact />
    </DescriptionPage>
  );
}
