import { useConfig } from "~/config";
import {
  CoreApiAction,
  CoreApiActionData,
  CoreApiDataType,
  CoreApiQuery,
  CoreApiQueryOptions,
  CoreApiResponseType,
  coreApiActionMap,
} from ".";
import { isMatching } from "ts-pattern";
import { CreateMutationOptions, createMutation, createQuery } from "@tanstack/solid-query";
import { checkResponse } from "../common";
import { useUser } from "~/states/user";

export const createCoreApiFetchFn = <T extends CoreApiAction>(
  actionData: CoreApiActionData<T>,
  logOut?: () => void
) => {
  const { coreApiPath } = useConfig();

  return async (data: CoreApiDataType<T>) => {
    if (!isMatching(actionData.schema, data)) {
      console.error("CoreApiFetchFn: Schema mismatch", actionData.default.req, data);
      return {};
    }

    const formData = new URLSearchParams();
    Object.entries({ ...(actionData.default ? actionData.default : {}), ...data }).forEach(
      ([key, value]) => {
        formData.append(key, String(value));
      }
    );

    return await fetch(`${coreApiPath}/${actionData.path}`, {
      method: actionData.method,
      body: formData.toString(),
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
      },
    }).then(checkResponse(logOut)<CoreApiResponseType<T>>);
  };
};

export const createCoreApiQuery = <T extends CoreApiQuery>(
  action: T,
  data: () => CoreApiDataType<T>,
  options?: CoreApiQueryOptions<T>
) => {
  const [user] = useUser();
  const actionData: CoreApiActionData<T> = coreApiActionMap(user)[action];
  const queryFn = createCoreApiFetchFn(actionData);

  return createQuery<
    undefined | CoreApiResponseType<T>,
    unknown,
    undefined | CoreApiResponseType<T>
  >(actionData.queryKey, () => queryFn(data()), {
    get enabled() {
      return actionData.enabled ? actionData.enabled() : true;
    },
    // eslint-disable-next-line
    // @ts-ignore
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
    ...(actionData?.queryOptions ? actionData.queryOptions : {}),
    ...options,
  });
};

export const createCoreApiMutation = <T extends CoreApiAction>(
  action: T,
  options?:
    | Omit<
        CreateMutationOptions<
          undefined | CoreApiResponseType<T>,
          unknown,
          CoreApiDataType<T>,
          unknown
        >,
        "mutationFn"
      >
    | undefined
) => {
  const [user] = useUser();
  const actionData = coreApiActionMap(user)[action];
  const mutationFn = createCoreApiFetchFn(actionData);

  const { mutateAsync } = createMutation(mutationFn, options);

  return mutateAsync;
};

export const createCreateCoreApiFetch = <T extends CoreApiAction>(
  action: T,
  data: CoreApiDataType<T>
) => {
  const [user] = useUser();
  const actionData = coreApiActionMap(user)[action];
  return createCoreApiFetchFn(actionData)(data);
};
