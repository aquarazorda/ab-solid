import { setUserData, user } from "~/states/user";
import { createCoreApiQuery } from "./coreapi/utils";
import { createMemo } from "solid-js";

// export const createLoginMutation = () => {
//   const mutation = createCoreApiMutation('logIn', {
//     onSuccess
//   })
// };

export const isSessionActive = () => {
  if (!user.UserID) return () => false;
  const query = createCoreApiQuery(
    "sessionActive",
    {
      userID: user.UserID,
    },
    {
      staleTime: 1000 * 60 * 5,
      onSuccess: (data) => {
        if (data?.StatusCode === 10) {
          return true;
        }

        setUserData({});
        return false;
      },
    }
  );

  const isActive = createMemo(() => query.data && query.data.StatusCode === 10);

  return isActive;
};

export const createUserData = () => {
  if (!user.UserID) return;

  return createCoreApiQuery(
    "getUserInfo",
    {
      userID: user.UserID,
    },
    {
      staleTime: 1000 * 60 * 5,
      onSuccess: (data) => {
        if (data?.StatusCode === 10) {
          setUserData(data);
          return true;
        }

        setUserData({});
        return false;
      },
    }
  );
};
