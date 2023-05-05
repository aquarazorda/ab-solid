import { createQuery } from "@tanstack/solid-query";
import { useConfig } from "~/config";
import { objToQueryString } from "~/utils/string";
import { checkResponse } from "./common";
import { isAuthenticated, user } from "~/states/user";

const createWebApiFetchFn =
  (isAuthProxy: boolean) =>
  <T>(path: string, params?: () => object | undefined, post?: boolean) => {
    const { webApiPath, authProxyPath } = useConfig();

    return fetch(
      `${isAuthProxy ? authProxyPath : webApiPath}/${path}${
        !post && params && params() ? objToQueryString(params()!) : ""
      }`,
      {
        method: post ? "POST" : "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(isAuthProxy
            ? {
                "X-Requested-With": "XMLHttpRequest",
                "x-userid": String(user.UserID),
              }
            : {}),
        },
        body: post ? JSON.stringify(params?.()) : undefined,
        credentials: isAuthProxy ? "include" : undefined,
      }
    ).then(checkResponse<T>);
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

const webApiQuery =
  (isAuthProxy: boolean) =>
  <T>(props: Props<T>) =>
    createQuery<T>(
      () =>
        props.key
          ? ["webApi-", props.key()]
          : ["webApi-" + props.path, props.params?.(), isAuthProxy ? isAuthenticated() : "noAuth"],
      () =>
        createWebApiFetchFn(isAuthProxy)<T>(props.path, props.params, props.options?.post).then(
          (data) => (props.options?.filterFn ? props.options.filterFn(data) : data)
        ),
      {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        get enabled() {
          return isAuthProxy
            ? isAuthenticated()
            : true && (props.options?.post ? !!props.params?.() : true);
        },
      }
    );

export const createWebApiQuery = webApiQuery(false);
export const createAuthProxyQuery = webApiQuery(true);
