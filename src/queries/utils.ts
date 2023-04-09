import { useI18n } from "@solid-primitives/i18n";
import { P, isMatching, match } from "ts-pattern";
import { useConfig } from "~/config";
import { capitalizeFirstLetter } from "~/utils/string";
import { ResourceSource, createResource } from "solid-js";
import { CoreApiAction, CoreApiDataType, CoreApiResponseType, coreApiActionMap } from "./coreapi";
import { createMutation } from "@tanstack/solid-query";

type Proxy = Partial<{
  lang: boolean;
  domain: boolean;
}>;

const generatePath = (fileName?: string, proxy?: Proxy) => {
  if (!fileName) return undefined;
  const { staticPath } = useConfig();
  const [, { locale }] = useI18n();

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

export const createCoreApiMutation = <T extends CoreApiAction>(action: T) => {
  const { coreApiPath } = useConfig();
  const actionData = coreApiActionMap[action];

  const mutationFn = async (data: CoreApiDataType<T>) => {
    if (!isMatching(actionData.schema, data)) {
      return false;
    }

    const formData = new URLSearchParams();
    Object.entries({ ...actionData.default, ...data }).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    return (await fetch(`${coreApiPath}/${actionData.path}`, {
      method: actionData.method,
      body: formData.toString(),
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
      },
    }).then((res) => res.json())) as Promise<CoreApiResponseType<T>>;
  };

  const { mutateAsync } = createMutation(mutationFn);

  return mutateAsync;
};
