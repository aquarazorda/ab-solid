import { useLanguage } from "~/utils/language";
import { P, match } from "ts-pattern";
import { useConfig } from "~/config";
import { capitalizeFirstLetter } from "~/utils/string";
import { ResourceSource, createResource } from "solid-js";

type Proxy = Partial<{
  lang: boolean;
  domain: boolean;
}>;

const generatePath = (fileName?: string, proxy?: Proxy) => {
  if (!fileName) return undefined;
  const { staticPath } = useConfig();
  const [, { locale }] = useLanguage();

  const fName: string = match(proxy)
    .with({ lang: true }, () => {
      return `${fileName}${capitalizeFirstLetter(locale?.() || "Ka")}`;
    })
    .otherwise(() => fileName);

  return `${staticPath}/${fName}.json`;
};

const fetchFn = (proxy?: Proxy) => async (fileName?: string) => {
  const path = generatePath(fileName, proxy);

  return !path ? undefined : await fetch(path).then((res) => res.json());
};

export const createStaticResource = <T>(fileName: string | ResourceSource<string>, proxy?: Proxy) =>
  match(fileName)
    .with(P.string, (name) => createResource<T>(() => fetchFn(proxy)(name)))
    .otherwise((accessor) => createResource<T, string>(accessor, fetchFn(proxy)));
