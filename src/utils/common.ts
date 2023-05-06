import { isServer } from "solid-js/web";
import { PageEvent, parseCookie } from "solid-start";

export const createArrFromNum = (num: number) => Array.from(Array(num).keys());

export const getCookies = (event: PageEvent) =>
  parseCookie(isServer && event ? event.request.headers.get("cookie") ?? "" : document.cookie);
