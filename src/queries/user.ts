import { useUser } from "~/states/user";
import { createCoreApiFetchFn, createCoreApiQuery } from "./coreapi/utils";
import { coreApiActionMap } from "./coreapi";
import { User } from "~/types/user";

export const isSessionActive = async (userID?: number) => {
  if (!userID) return false;

  const actionData = coreApiActionMap(() => undefined)["sessionActive"];
  const data = await createCoreApiFetchFn<"sessionActive">(actionData)({
    userID,
  });

  if (data?.StatusCode === 10) {
    // return await createUserData(userID, setUserData);
    return true;
  }

  return false;
};

export const createUserData = async (userID?: number, setUser?: (data?: User) => void) => {
  if (!userID || !setUser) return false;

  const actionData = coreApiActionMap(() => undefined)["getUserInfo"];

  const data = await createCoreApiFetchFn(actionData)({
    userID,
  });

  if (data?.StatusCode === 10) {
    setUser(data);
    return true;
  }

  return false;
};

export const getUserBalance = () => {
  const [userAcc] = useUser();
  const user = userAcc();

  if (!user)
    return {
      BalanceAmount: -1,
    };

  return createCoreApiQuery("getBalance", () => ({
    currencyID: user.PreferredCurrencyID,
    userID: user.UserID,
  }));
};
