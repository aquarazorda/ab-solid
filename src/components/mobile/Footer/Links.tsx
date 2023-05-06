import { For } from "solid-js";
import { useLanguage } from "~/utils/language";
import { createStaticUrl } from "~/utils/string";

export const FooterLinks = () => {
  const [, { locale }] = useLanguage();

  return (
    <div
      class="_s_flex _s_color-bg-primary-6 _s_size-w-percent--25 _s_overflow-x-scroll _s_scroll-0 _s_bw-1 
      _s_bt-solid _s_bt-primary-7 _s_flex-a-center _s_p-5  "
    >
      <For each={footerLinks}>
        {(item) => (
          <a
            href={`${
              item.urlLangRedirect
                ? // @ts-ignore
                  item.urlLangRedirect[locale()]
                : item.hasLangEnd
                ? item.url + locale()
                : item.url
            }`}
            aria-label={item.label}
            target="_blank"
            class={item.itemClass}
          >
            <img src={createStaticUrl(item.img.img)} class={item.img.className} alt={item.label} />
          </a>
        )}
      </For>
    </div>
  );
};

const footerLinks = [
  {
    label: "Initiative",
    url: "https://www.iniciativa.ge/",
    itemClass: "",
    hasLangEnd: true,
    img: {
      img: "/images/footer/initiative_en.svg",
      className: "_s_size-h-px--4",
      hasLoadingState: true,
    },
  },
  {
    label: "Adjarabet Awards",
    url: "https://www.adjarabetawards.com/",
    itemClass: "_s_pl-3",
    urlLangRedirect: {
      ka: "https://www.adjarabetawards.com/ka",
      en: "https://www.adjarabetawards.com/en",
      ru: "https://www.adjarabetawards.com/en",
    },
    img: {
      img: "/images/footer/adjarabet_awards_en.svg",
      className: "_s_size-h-px--4",
      hasLoadingState: true,
    },
  },
  {
    label: "Rule Your Games",
    url: "http://martetamashi.ge/",
    itemClass: "_s_pl-3",
    img: {
      img: "/images/footer/rule_your_games_en.svg",
      className: "_s_size-h-px--4",
      hasLoadingState: true,
    },
  },
  {
    label: "Moedani",
    url: "https://www.adjarabetawards.com/",
    itemClass: "_s_pl-3",
    urlLangRedirect: {
      ka: "/ka/Promo/moedani",
      en: "/en/Promo/moedani",
      ru: "/ru/Promo/moedani",
    },
    img: {
      img: "/images/footer/moedani_en.svg",
      className: "_s_size-h-px--4",
      hasLoadingState: true,
    },
  },
];
