import { useI18n } from "@solid-primitives/i18n";
import { A } from "solid-start";

export const FooterPhones = () => {
  const [t] = useI18n();

  return (
    <>
      <div class="_s_flex">
        <a
          href="isUserVip == true ? 'tel:+995322223388' : 'tel:+995322711010'"
          target="_blank"
          class="_s_btn _s_btn-negative _s_mt-3 _s_mb-3 _s_size-w-percent--25 _s_mr-1"
        >
          <span class="_s_flex">
            <div class="_s_adj-phone   _s_color-primary-8 _s_icon _s_icon-sm  " />
            <span class="_s_label _s_label-sm _s_color-primary-1">
              {t("_lang_mobile_call_button")}
            </span>
          </span>
        </a>
        {/* todo (click)="openZoho()" */}
        <div class="_s_btn _s_btn-negative _s_mb-5 _s_ml-1 _s_mt-3 _s_size-w-percent--25">
          <span class="_s_flex">
            <div class="_s_adj-chat   _s_color-primary-8 _s_icon _s_icon-sm" />
            <span class="_s_label _s_label-sm _s_color-primary-1">{t("_lang_chat_with_us")}</span>
          </span>
        </div>
      </div>
      <A href="/mobile/Referral" class="_s_btn _s_btn-negative _s_mb-5 _s_size-w-percent--25">
        <span class="_s_label _s_label-md ">{t("_lang_refer_friend")}</span>
      </A>
    </>
  );
};
