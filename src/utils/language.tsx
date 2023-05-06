import {
  Accessor,
  createContext,
  createMemo,
  createSignal,
  on,
  onMount,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import { useServerContext } from "solid-start";
import { getCookies } from "./common";

export type Lang = "en" | "ka" | "ru" | "hy";

type Dict = Record<Lang, Record<string, string>>;

type LanguageContextType = [
  (key: string) => string,
  { locale: Accessor<Lang>; setLanguage: (lang: Lang) => void }
];

const LanguageContext = createContext({} as LanguageContextType);

export const createLanguageProvider = () => (props: { children: Element }) => {
  const event = useServerContext();
  const defaultLang = (getCookies(event).lang as Lang) || "ka";

  const [locale, setLocale] = createSignal<Lang>(defaultLang);

  const [dict, setDict] = createStore<Dict>({} as Dict);

  onMount(async () => {
    await setLanguage(defaultLang);
  });

  const proxy = createMemo<Record<string, string>>(
    on(
      () => [dict[locale()]],
      () =>
        new Proxy(dict[locale()] || {}, {
          get: (target, property: string) => target?.[property] || property,
        })
    )
  );

  const setLanguage = async (lang: Lang) => {
    if (dict[lang]) {
      setLocale(lang);
      return true;
    }

    const res = await fetchLangs(lang);
    setDict(lang, res);
    setLocale(lang);

    return true;
  };

  const l = (key: string) => proxy()?.[key] || key;

  const value: LanguageContextType = [l, { locale, setLanguage }];

  return <LanguageContext.Provider value={value}>{props.children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);

export const fetchLangs = async (lang: string) => {
  if (lang) {
    return await fetch(`https://newstatic.adjarabet.com/static/lang${lang}New.json`).then(
      (res) => res.json() as unknown as Record<string, string>
    );
  }

  return {};
};
