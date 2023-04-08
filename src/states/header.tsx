import { createStore } from "solid-js/store";

export const [mobileHeaderState, setMobileHeaderState] = createStore({
  navOpen: true,
  isTransparent: false,
});
