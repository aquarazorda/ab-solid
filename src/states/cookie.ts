import { cookieStorage, createStorage } from "@solid-primitives/storage";
import { Langs } from "~/utils/language";

type CookieStore = Partial<{
  lang: Langs;
  userId: string;
  showBalance: string;
}>;

const [cs, setCookies, { remove: removeCookie }] = createStorage({
  api: cookieStorage,
  options: {
    path: "/",
  },
});

export const cookies = {
  get() {
    return cs as CookieStore;
  },
  set: setCookies,
  remove: removeCookie,
};
