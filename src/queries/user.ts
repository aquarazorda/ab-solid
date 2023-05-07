import { useUser } from "~/states/user";
import { createCoreApiFetchFn, createCoreApiQuery } from "./coreapi/utils";
import { coreApiActionMap } from "./coreapi";

export const isSessionActive$ = async (userID?: number) => {
  if (!userID) return;

  const actionData = coreApiActionMap(() => undefined)["sessionActive"];
  const data = await createCoreApiFetchFn<"sessionActive">(actionData)({
    userID,
  });

  if (data?.StatusCode === 10) {
    return await createUserData(userID);
  }
};

export const createUserData = async (userID?: number) => {
  if (!userID) return;

  const actionData = coreApiActionMap(() => undefined)["getUserInfo"];

  const data = await createCoreApiFetchFn<"getUserInfo">(actionData)({
    userID,
  });

  if (data?.StatusCode === 10) {
    return data;
  }
};

export const getUserBalance = () => {
  const [user] = useUser();

  return createCoreApiQuery("getBalance", () => ({
    currencyID: user()?.PreferredCurrencyID,
    userID: user()?.UserID,
  }));
};
