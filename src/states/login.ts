import { createSignal } from "solid-js";

import { Navigator } from "@solidjs/router";
import { useUser } from "./user";

export const [loginAction, setLoginAction] = createSignal<Function>();

export const checkWithAuth = (fn: Function, navigate: Navigator) => {
  const [, { isAuthenticated }] = useUser();
  if (isAuthenticated()) {
    fn();
    return;
  }

  setLoginAction(() => fn);
  navigate("/mobile/Login");
};
