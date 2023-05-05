import { createQuery } from "@tanstack/solid-query";
import { useConfig } from "~/config";
import { objToQueryString } from "~/utils/string";

export const createWebApiFetchFn = <T>(
  path: string,
  params?: () => object | undefined,
  post?: boolean
) => {
  const { webApiPath } = useConfig();

  return fetch(
    `${webApiPath}/${path}${!post && params && params() ? objToQueryString(params()!) : ""}`,
    {
      method: post ? "POST" : "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: post ? JSON.stringify(params?.()) : undefined,
    }
  ).then((res) => res.json()) as Promise<T>;
};

type Props<T> = {
  path: string;
  key?: () => unknown;
  params?: () => object | undefined;
  options?: {
    post?: boolean;
    filterFn?: (j: T) => T;
  };
};

export const createWebApiQuery = <T>(props: Props<T>) =>
  createQuery<T>(
    () => ["webApi" + props.path, props.key?.() || props.params?.()],
    () =>
      createWebApiFetchFn<T>(props.path, props.params, props.options?.post).then((data) =>
        props.options?.filterFn ? props.options.filterFn(data) : data
      ),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      get enabled() {
        return props.options?.post ? !!props.params?.() : true;
      },
    }
  );
