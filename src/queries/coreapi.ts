import { P } from "ts-pattern";

export type CoreApiAction = keyof typeof coreApiActionMap;
export type CoreApiDataType<T extends CoreApiAction> = P.infer<
  typeof coreApiActionMap[T]["schema"]
>;
export type CoreApiResponseType<T extends CoreApiAction> = P.infer<
  typeof coreApiActionMap[T]["responseSchema"]
>;

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
};
