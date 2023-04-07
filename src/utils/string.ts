import { useConfig } from "~/config";

export const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const createStaticUrl = (path: string) => {
  const { staticPath } = useConfig();

  return `${staticPath}${path}`;
};
