import { Show } from "solid-js";
import { useI18n } from "@solid-primitives/i18n";
import { FooterDescription } from "./Description";
import { LangSelector } from "./LangSelector";
import { FooterLinks } from "./Links";
import { FooterNav } from "./Navigation";
import { FooterPhones } from "./Phones";
import { FooterSocial } from "./Social";
import { scrollToTop } from "~/utils/window";
import { createStore } from "solid-js/store";

export const [footerState, setFooterState] = createStore({
  hidden: false,
});

export const Footer = () => {
  const [t] = useI18n();
  return (
    <Show when={!footerState.hidden}>
      <div class="_s_color-bg-primary-5">
        <FooterSocial />
        <div class="_s_mb-2 _s_pl-2 _s_pr-2">
          <LangSelector />
          <FooterPhones />
          <FooterNav />
          <FooterLinks />
          <FooterDescription />
          <a
            tabindex="0"
            data-id="back-top-top"
            class="_s_btn _s_btn-transparent _s_size-w-percent--24 _s_bw-1 _s_b-solid _s_b-primary-7"
            onClick={scrollToTop}
          >
            <span class="_s_flex">
              <i class="_s_adj-triangle-up _s_color-primary-1 _s_icon _s_icon-sm" />
              <span data-id="back-top-top-span" class="_s_label _s_label-sm _s_color-primary-1">
                {t("_lang_top")}
              </span>
            </span>
          </a>
        </div>
      </div>
    </Show>
  );
};
