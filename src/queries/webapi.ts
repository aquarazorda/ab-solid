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

export const createWebApiQuery = <T>(
  path: string,
  params?: () => object | undefined,
  post?: boolean,
  filterFn?: (j: T) => T
) => {
  const data = createQuery<T>(
    () => [path, params?.()],
    () =>
      createWebApiFetchFn<T>(path, params, post).then((data) => (filterFn ? filterFn(data) : data)),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      get enabled() {
        return post ? !!params?.() : true;
      },
    }
  );

  return data;
};
