import {
  Accessor,
  createContext,
  createMemo,
  createResource,
  createSignal,
  on,
  useContext,
} from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { useServerContext } from "solid-start";
import { getCookies } from "./common";
import { useConfig } from "~/config";
import { isServer } from "solid-js/web";

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
  const [initialKeys, setInitialKeys] = createStore(new Set<string>());

  const [initialDict] = createResource(() => initialKeys, initializeLangs(defaultLang), {
    deferStream: true,
    onHydrated: () => {
      setLanguage(defaultLang, true);
    },
  });

  const [dict, setDict] = createStore<Dict>({
    [defaultLang]: initialDict(),
  } as Dict);

  const proxy = createMemo<Record<string, string>>(
    on(
      () => [dict[locale()]],
      () =>
        new Proxy(dict[locale()] || {}, {
          get: (target, property: string) => target?.[property] || property,
        })
    )
  );

  const setLanguage = async (lang: Lang, initial?: boolean) => {
    if (!initial && dict[lang]) {
      setLocale(lang);
      return true;
    }

    const res = await fetchLangs(lang);
    setDict(lang, reconcile(res));
    setLocale(lang);

    return true;
  };

  const l = (key: string) => {
    isServer && setInitialKeys((s) => s.add(key));
    return proxy()?.[key] || key;
  };

  const value: LanguageContextType = [l, { locale, setLanguage }];

  return <LanguageContext.Provider value={value}>{props.children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);

const initializeLangs = (lang: Lang) => async (keys: Set<string>) => {
  const res = await fetchLangs(lang);
  const dict: Record<string, string> = {};

  keys.forEach((key) => (dict[key] = res[key]));

  return dict;
};

const fetchLangs = async (lang: string) => {
  const { staticPath } = useConfig();

  if (isServer) {
    return await import(`~/data/langs/lang${lang}New.json`).then((res) => res.default);
  }

  return await fetch(`${staticPath}/lang${lang}New.json`).then(
    (res) => res.json() as Promise<Record<string, string>>
  );
};
