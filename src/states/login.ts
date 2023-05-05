import { createSignal } from "solid-js";
import { isAuthenticated } from "./user";
import { Navigator } from "@solidjs/router";

export const [loginAction, setLoginAction] = createSignal<Function>();

export const checkWithAuth = (fn: Function, navigate: Navigator) => {
  if (isAuthenticated()) {
    fn();
    return;
  }

  setLoginAction(() => fn);
  navigate("/mobile/Login");
};
