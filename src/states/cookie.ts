import { cookieStorage, createStorage } from "@solid-primitives/storage";
import { createRoot } from "solid-js";
import { Lang } from "~/utils/language";

type CookieStore = Partial<{
  lang: Lang;
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
