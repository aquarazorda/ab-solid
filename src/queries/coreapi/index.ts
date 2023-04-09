import { P } from "ts-pattern";
import { user } from "~/states/user";
import { userSchema } from "~/types/user";

export type CoreApiAction = keyof typeof coreApiActionMap;
export type CoreApiActionData<T extends CoreApiAction> = typeof coreApiActionMap[T] & ActionMapItem;
export type CoreApiDataType<T extends CoreApiAction> = P.infer<
  typeof coreApiActionMap[T]["schema"]
>;
export type CoreApiResponseType<T extends CoreApiAction> = P.infer<
  typeof coreApiActionMap[T]["responseSchema"]
>;

export type HasQueryEnabled<T> = {
  [K in keyof T]: T[K] extends {
    queryKey: () => readonly any[];
    enabled: () => boolean;
  }
    ? K
    : never;
}[keyof T];

export type CoreApiQuery = HasQueryEnabled<typeof coreApiActionMap>;
export type CoreApiQueryData = CoreApiActionData<CoreApiQuery>;

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
};

type CoreApiActionMap = {
  [key: string]: ActionMapItem;
};

export const coreApiActionMap = {
  logIn: {
    method: "POST",
    path: "WebsiteService?",
    schema: {
      userIdentifier: P.string,
      password: P.string,
    },
    responseSchema: {
      StatusCode: P.number,
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
    queryKey: () => ["sessionActive", user.UserID],
    enabled: () => !!user.UserID,
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
    queryKey: () => ["getUserInfo", user.UserID],
    enabled: () => !!user.UserID,
  },
} as const satisfies CoreApiActionMap;
