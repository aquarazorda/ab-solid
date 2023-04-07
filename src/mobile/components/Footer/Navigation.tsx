import { useI18n } from "@solid-primitives/i18n";
import { For } from "solid-js";
import { A } from "solid-start";
import { useConfig } from "~/config";

export const FooterNav = () => {
  const { domain } = useConfig();
  const [t] = useI18n();

  return (
    <div class="_s_color-bg-primary-6 _s_display-f _s_flex _s_flex-j-between _s_overflow-x-scroll _s_p-1 _s_scroll-0 _s_size-w-percent--25">
      <For each={domain === "com" ? footerNavData : footerNavDataAm}>
        {(item) => (
          <A
            href={`/mobile/${item.route}`}
            class="_s_flex _s_flex-a-center _s_flex-d-column _s_pb-1 _s_pl-2 _s_pr-2 _s_pt-1"
          >
            <span class="_s_aitem-color-primary-1   _s_color-primary-8 _s_label _s_label-a-center _s_flex-j-center _s_label-sm _s_white-space-nowrap">
              {t(item.name)}
            </span>
          </A>
        )}
      </For>
    </div>
  );
};

const footerNavData = [
  {
    name: "_lang_cashdesk_footer",
    route: "cashDesk",
  },
  {
    name: "__lang_footer_about_us",
    route: "About",
  },
  {
    name: "__lang_footer_rules",
    route: "Rules",
  },
  {
    name: "__lang_footer_payment_methods",
    route: "Payments",
  },
  {
    name: "__lang_footer_confidental",
    route: "Privacy",
  },
  {
    name: "__lang_footer_contact",
    route: "Contact",
  },
  {
    name: "__lang_footer_faq",
    route: "Promo/onboarding",
  },
];

const footerNavDataAm = [
  {
    name: "__lang_footer_about_us",
    route: "About",
  },
  {
    name: "__lang_footer_rules",
    route: "Rules",
  },
  {
    name: "__lang_footer_confidental",
    route: "Privacy",
  },
  {
    name: "__lang_footer_contact",
    route: "Contact",
  },
  {
    name: "_lang_cashdesk_footer",
    route: "cashDesk",
  },
];
