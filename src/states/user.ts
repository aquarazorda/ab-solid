import { createEffect, createMemo, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { createUserData, isSessionActive } from "~/queries/user";
import { User } from "~/types/user";
import { cookies } from "./cookie";

export const [user, setUser] = createStore<User>({} as User);

export const initializeUser = () => {
  onMount(() => {
    const UserID = cookies.get().userId;
    if (UserID) setUser({ UserID: Number(UserID) });

    createEffect(() => {
      const session = isSessionActive();

      if (session()) {
        createUserData();
        return;
      }
    });
  });
};

export const isAuthenticated = createMemo(() => !!user && !!user?.UserID);

export const setUserData = (data: Partial<User>) => {
  if (data.UserID) {
    cookies.set("userId", String(data.UserID));
    setUser(data);
  } else {
    cookies.remove("userId");
  }
};

export const logOut = (byUser?: boolean) => {
  cookies.remove("userId");
  setTimeout(() =>
    setUser({
      UserID: 0,
    })
  );
  if (byUser) {
    // todo
  }
};
