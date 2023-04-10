import { For } from "solid-js";
import { useConfig } from "~/config";

const footerHeadingsMobile = [
  { label: "Facebook", className: "_s_adj-facebook", url: "https://www.facebook.com/Adjarabet/" },
  { label: "Twitter", className: "_s_adj-twitter", url: "https://twitter.com/adjarabetoff" },
  // { className: '_s_adj-linkedin', url: 'https://www.linkedin.com/company/adjarabet'},
  {
    label: "Youtube",
    className: "_s_adj-youtube",
    url: "https://www.youtube.com/channel/UCZNj9ZFLy2vtvxaf_nIS-Vg",
  },
];
const footerHeadingsMobileAm = [
  {
    label: "Facebook",
    className: "_s_adj-facebook",
    url: "https://www.facebook.com/adjarabet.am/",
  },
  {
    label: "LinkedIn",
    className: "_s_adj-linkedin",
    url: "https://www.linkedin.com/company/adjarabet-armenia",
  },
  {
    label: "Instagram",
    className: "_s_adj-instagram",
    url: "https://www.instagram.com/adjarabet.am/",
  },
  {
    label: "Youtube",
    className: "_s_adj-youtube",
    url: "https://www.youtube.com/channel/UCskmPyAmGIh0DuEW-UuU0rA",
  },
  { label: "Telegram", className: "_s_adj-telegram", url: "https://t.me/+EOAUxm-uMpA0NDgy" },
];

export const FooterSocial = () => {
  const { domain } = useConfig();

  return (
    <div class="_s_flex _s_flex-a-center _s_flex-j-center _s_p-5">
      <For each={domain === "com" ? footerHeadingsMobile : footerHeadingsMobileAm}>
        {(item) => (
          <a
            target="_blank"
            class={`_s_color-primary-8 _s_icon _s_icon-sm ${item.className}`}
            href={item.url}
            aria-label={item.label}
          />
        )}
      </For>
    </div>
  );
};
