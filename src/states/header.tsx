import { cookieStorage } from "@solid-primitives/storage";
import { onCleanup, onMount } from "solid-js";
import { createStore } from "solid-js/store";

export const [mobileHeaderState, setMobileHeaderState] = createStore({
  navOpen: true,
  navBlocked: false,
  showBalance: false,
  accountLayerOpen: false,
  hidden: false,
});

export const blockSubNav = () => {
  const wasOpen = mobileHeaderState.navOpen;

  onMount(() => {
    setMobileHeaderState("navBlocked", true);
  });

  onCleanup(() => {
    setMobileHeaderState("navBlocked", false);
    setMobileHeaderState("navOpen", wasOpen);
  });
};

export const setShowBalance = (value: boolean) => {
  setMobileHeaderState("showBalance", value);
  cookieStorage.setItem("showBalance", String(value), {
    path: "/",
  });
};

export const toggleAccountLayer = () => {
  setMobileHeaderState("accountLayerOpen", (op) => !op);
};
