import { cookieStorage, createStorage } from "@solid-primitives/storage";
import { createRoot } from "solid-js";
import { Langs } from "~/utils/language";

type CookieStore = Partial<{
  lang: Langs;
  userId: string;
  showBalance: string;
}>;

const [cs, setCookies, { remove: removeCookie }] = createRoot(() =>
  createStorage({
    api: cookieStorage,
    options: {
      path: "/",
    },
  })
);

export const useCookies = () => ({
  get() {
    return cs as CookieStore;
  },
  set: setCookies,
  remove: removeCookie,
});
