import { cookieStorage } from "@solid-primitives/storage";
import { createEffect, createMemo, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { createUserData, isSessionActive } from "~/queries/user";
import { User } from "~/types/user";

export const [user, setUser] = createStore<User>({} as User);

export const initializeUser = () => {
  onMount(() => {
    const UserID = cookieStorage.getItem("userId");
    if (UserID) setUser({ UserID: Number(UserID) });
    const session = isSessionActive();

    createEffect(() => {
      if (session()) {
        createUserData();
        return;
      }

      cookieStorage.removeItem("userId");
    });
  });
};

export const isAuthenticated = createMemo(() => !!user?.UserID && !!user?.Name);

export const setUserData = (data: Partial<User>) => {
  setUser(data);
};

export const logOut = (byUser?: boolean) => {
  setUser({});
  cookieStorage.removeItem("userId");
  if (byUser) {
    // todo
  }
};