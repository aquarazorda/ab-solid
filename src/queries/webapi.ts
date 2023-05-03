import { createQuery } from "@tanstack/solid-query";
import { createMemo } from "solid-js";
import { useConfig } from "~/config";
import { objToQueryString } from "~/utils/string";

export const createWebApiQuery = <T>(
  path: string,
  params?: () => object,
  post?: boolean,
  filterFn?: (j: T) => T
) => {
  const { webApiPath } = useConfig();

  const data = createQuery<T>(
    () => [path, params?.()],
    () =>
      fetch(`${webApiPath}/${path}${!post && params ? objToQueryString(params()) : ""}`, {
        method: post ? "POST" : "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: post ? JSON.stringify(params?.()) : undefined,
      })
        .then((res) => res.json())
        .then((data) => (filterFn ? filterFn(data) : data)),
    { refetchOnMount: false, refetchOnWindowFocus: false, refetchOnReconnect: false }
  );

  const returnData = createMemo(() => data.data);

  return returnData;
};
