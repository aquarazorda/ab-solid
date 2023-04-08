import { useI18n } from "@solid-primitives/i18n";
import { JSX, Show } from "solid-js";

type ContactItemProps = {
  children: JSX.Element;
  icon: string;
  label: Element;
};
const ContactItem = (props: ContactItemProps) => (
  <div class="_s_col-lg-3 _s_flex _s_lg-size-w-max-percent--6 _s_mb-5 _s_md-size-w-max-percent--12 _s_size-w-max-percent--25 _s_size-w-percent--25">
    <div class="_s_col-lg-3 _s_flex _s_lg-size-w-max-percent--6 _s_mb-5 _s_md-size-w-max-percent--12 _s_size-w-max-percent--25 _s_size-w-percent--25">
      <span
        class={`_s_adj-${props.icon} _s_b-radius-full _s_color-bg-primary-7 _s_icon _s_label-sm _s_ml-none _s_mr-2 _s_p-3`}
      />
      <div class="_s_pt-1">
        <span class="_s_color-primary-8 _s_label _s_label-xs _s_pb-1">{props.label}</span>
        <span class="_s_label _s_label-xs">{props.children}</span>
      </div>
    </div>
  </div>
);

export const CashdeskContact = (props: { withTitle?: boolean }) => {
  const [t] = useI18n();
  return (
    <>
      <Show when={props.withTitle}>
        <span class="_s_label _s_label-md _s_label-t-u _s_md-mt-none _s_mt-5 _s_mb-5">
          {t("__lang_footer_contact")}
        </span>
      </Show>
      <div
        class="_s_b-primary-7 _s_b-radius-md _s_b-solid _s_bw-1 _s_color-bg-primary-6 _s_flex 
        _s_flex-a-start _s_flex-wrap _s_pl-5 _s_pr-5 _s_pt-5"
      >
        <ContactItem icon="email" label={t("_lang_email_our_team")}>
          <a href={`mailto:${t("_lang_contact_us_mail_new")}`}>{t("_lang_contact_us_mail_new")}</a>
        </ContactItem>
        <ContactItem icon="time" label={t("_lang_working_hours")}>
          {t("_lang_working_hours_value")}
        </ContactItem>
        <ContactItem icon="location" label={t("_lang_location")}>
          {t("__lang_contact_current_address")}
        </ContactItem>
        <ContactItem icon="phone" label={t("__lang_contact_call_us")}>
          {t("_lang_contact_phone")}
        </ContactItem>
      </div>
    </>
  );
};
