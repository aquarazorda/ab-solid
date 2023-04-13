import { useConfig } from "~/config";
import {
  CoreApiAction,
  CoreApiActionData,
  CoreApiDataType,
  CoreApiQuery,
  CoreApiQueryData,
  CoreApiResponseType,
  coreApiActionMap,
} from ".";
import { isMatching } from "ts-pattern";
import {
  CreateMutationOptions,
  CreateQueryOptions,
  createMutation,
  createQuery,
} from "@tanstack/solid-query";

const createCoreApiFetchFn = <T extends CoreApiAction>(actionData: CoreApiActionData<T>) => {
  const { coreApiPath } = useConfig();

  return async (data: CoreApiDataType<T>) => {
    if (!isMatching(actionData.schema, data)) {
      return undefined;
    }

    const formData = new URLSearchParams();
    Object.entries({ ...(actionData.default ? actionData.default : {}), ...data }).forEach(
      ([key, value]) => {
        formData.append(key, String(value));
      }
    );

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
};

export const createCoreApiQuery = <T extends CoreApiQuery>(
  action: T,
  data: CoreApiDataType<T>,
  options?: Omit<
    CreateQueryOptions<
      undefined | CoreApiResponseType<T>,
      unknown,
      undefined | CoreApiResponseType<T>,
      CoreApiQueryData["queryKey"]
    >,
    "queryKey" | "queryFn" | "initialData" | "enabled"
  > & {
    initialData?: () => undefined;
  }
) => {
  const actionData: CoreApiActionData<T> = coreApiActionMap[action];
  const queryFn = createCoreApiFetchFn(actionData);

  return createQuery<
    undefined | CoreApiResponseType<T>,
    unknown,
    undefined | CoreApiResponseType<T>
  >(
    actionData.queryKey,
    () => queryFn(data),
    // eslint-disable-next-line
    // @ts-ignore
    {
      get enabled() {
        return actionData.enabled ? actionData.enabled() : true;
      },
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      ...actionData.queryOptions,
      ...options,
    }
  );
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
  const actionData = coreApiActionMap[action];
  const mutationFn = createCoreApiFetchFn(actionData);

  const { mutateAsync } = createMutation(mutationFn, options);

  return mutateAsync;
};

export const createCreateCoreApiFetch = <T extends CoreApiAction>(
  action: T,
  data: CoreApiDataType<T>
) => {
  const actionData = coreApiActionMap[action];
  return createCoreApiFetchFn(actionData)(data);
};
