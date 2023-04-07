import { useI18n } from "@solid-primitives/i18n";
import { match } from "ts-pattern";
import { useConfig } from "~/config";
import { capitalizeFirstLetter } from "~/utils/string";
import { createResource } from "solid-js";

type Proxy = Partial<{
  lang: boolean;
}>;

export const createStaticResource = <T>(fileName: string, proxy?: Proxy) => {
  const { staticPath } = useConfig();
  const [, { locale }] = useI18n();

  const fName: string = match(proxy)
    .with({ lang: true }, () => {
      return `${fileName}${capitalizeFirstLetter(locale?.() || "Ka")}`;
    })
    .otherwise(() => fileName);

  return createResource<T>(() =>
    fetch(`${staticPath}/${fName}.json`).then((res) => res.json())
  );
};
