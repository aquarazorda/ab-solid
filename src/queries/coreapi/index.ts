import { CreateQueryOptions } from "@tanstack/solid-query";
import { Accessor } from "solid-js";
import { P } from "ts-pattern";
import { User, userSchema } from "~/types/user";

export type CoreApiAction = keyof ReturnType<typeof coreApiActionMap>;
export type CoreApiActionData<T extends CoreApiAction> = ReturnType<typeof coreApiActionMap>[T] &
  ActionMapItem;
export type CoreApiDataType<T extends CoreApiAction> = Partial<
  P.infer<ReturnType<typeof coreApiActionMap>[T]["schema"]>
>;
export type CoreApiResponseType<T extends CoreApiAction> = P.infer<
  ReturnType<typeof coreApiActionMap>[T]["responseSchema"]
>;

export type HasQueryEnabled<T> = {
  [K in keyof T]: T[K] extends {
    queryKey: () => readonly any[];
    enabled: () => boolean;
  }
    ? K
    : never;
}[keyof T];

export type CoreApiQuery = HasQueryEnabled<ReturnType<typeof coreApiActionMap>>;
export type CoreApiQueryData = CoreApiActionData<CoreApiQuery>;
export type CoreApiQueryOptions<T extends CoreApiQuery> = Omit<
  CreateQueryOptions<
    undefined | CoreApiResponseType<T>,
    unknown,
    undefined | CoreApiResponseType<T>,
    CoreApiQueryData["queryKey"]
  >,
  "queryKey" | "queryFn" | "initialData" | "enabled"
> & {
  initialData?: () => undefined;
};

type ActionMapItem = {
  method: "POST" | "GET";
  path: string;
  schema: P.Pattern<any>;
  responseSchema: P.Pattern<any>;
  default: {
    req: string;
    [key: string]: any;
  };
  queryKey?: () => readonly any[];
  enabled?: () => boolean;
  queryOptions?: CoreApiQueryOptions<CoreApiQuery>;
};

type CoreApiActionMap = {
  [key: string]: ActionMapItem;
};

export const coreApiActionMap = (user: Accessor<User | undefined>) =>
  ({
    logIn: {
      method: "POST",
      path: "WebsiteService?",
      schema: {
        userIdentifier: P.string,
        password: P.string,
      },
      responseSchema: {
        StatusCode: P.number,
        UserID: P.number,
      },
      default: {
        req: "login",
        otpDeliveryChannel: 2,
      },
    },
    logInOtp: {
      method: "POST",
      path: "WebsiteService?",
      schema: {
        userIdentifier: P.string,
        otp: P.string,
      },
      responseSchema: {
        StatusCode: P.number,
      },
      default: {
        req: "loginOtp",
        loginType: "2",
      },
    },
    sessionActive: {
      method: "POST",
      path: "WebsiteService?",
      schema: {
        userID: P.number,
      },
      responseSchema: {
        StatusCode: P.number,
      },
      default: {
        req: "isSessionActive",
      },
    },
    getUserInfo: {
      method: "POST",
      path: "WebsiteService?",
      schema: {
        userID: P.number,
      },
      responseSchema: {
        StatusCode: P.number,
        ...userSchema,
      },
      default: {
        req: "getUserInfo",
      },
    },
    getBalance: {
      method: "POST",
      path: "WebsiteService?",
      schema: {
        userID: P.number,
        currencyID: P.number,
      },
      responseSchema: {
        StatusCode: P.number,
        BalanceAmount: P.number,
        BonusAmount: P.optional(P.number),
        CurrencyID: P.number,
        LockedAmount: P.optional(P.number),
      },
      default: {
        isSingle: 0,
        req: "getBalance",
      },
      queryKey: () => ["getBalance", user()?.UserID, user()?.PreferredCurrencyID],
      enabled: () => !!user()?.UserID && !!user()?.PreferredCurrencyID,
    },
    getServiceAuthToken: {
      method: "POST",
      path: "WebsiteService?",
      schema: {
        userID: P.number,
        providerID: P.string,
      },
      responseSchema: {
        StatusCode: P.number,
        Token: P.string,
      },
      default: {
        req: "getServiceAuthToken",
      },
    },
  } as const satisfies CoreApiActionMap);
