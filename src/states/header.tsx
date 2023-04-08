import { onCleanup, onMount } from "solid-js";
import { createStore } from "solid-js/store";

export const [mobileHeaderState, setMobileHeaderState] = createStore({
  navOpen: true,
  isTransparent: false,
  navBlocked: false,
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
