import { useI18n } from "@solid-primitives/i18n";
import { cookieStorage } from "@solid-primitives/storage";
import { Accessor, createEffect, createMemo, createResource, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { defaultLang } from "~/root";

export type Langs = "en" | "ka" | "ru" | "hy";

export const fetchLangs = async (lang: string) =>
  await fetch(`https://newstatic.adjarabet.com/static/lang${lang}New.json`).then((res) => res.json());

const [fetchedLangs, setFetchedLangs] = createStore({
  en: false,
  ka: false,
  ru: false,
  hy: false,
});

export const initializeLangs = () => {
  const [, { locale, add }] = useI18n();
  createEffect(() => {
    if (defaultLang()) {
      changeLang(defaultLang()!, { locale, add });
    }
  });
};

type Props = {
  locale: (lang?: string | undefined) => string;
  add: (lang: string, table: Record<string, any>) => void;
};

export const changeLang = async (lang: Langs, { locale, add }: Props) => {
  const dictRes = await fetchLangs(lang);

  if (!fetchedLangs[lang]) {
    add(lang, dictRes);
    setFetchedLangs(lang, true);
  }

  locale(lang);
  cookieStorage.setItem("lang", lang);

  return lang;
};
