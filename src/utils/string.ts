import { useConfig } from "~/config";

export const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const createStaticUrl = (path: string) => {
  const { staticPath } = useConfig();

  return `${staticPath}${path}`;
};

export const dec2bin = (dec: number) => {
  if (!dec) return 0;
  let decimal = dec.toString(2);
  decimal = decimal.split("").reverse().join("");

  return decimal;
};

export const objToQueryString = (obj: object) =>
  "?" + decodeURIComponent(new URLSearchParams(obj as unknown as string).toString());
