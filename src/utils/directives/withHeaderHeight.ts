import { createEffect } from "solid-js";
import { match } from "ts-pattern";
import { mobileHeaderState } from "~/states/header";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      withHeaderHeight: boolean;
    }
  }
}

export default function withHeaderHeight(el: HTMLElement, use: boolean) {
  createEffect(() => {
    if (!use) return;
    match(mobileHeaderState.navOpen)
      .with(false, () => (el.style.height = window.innerHeight - 60 + "px"))
      .otherwise(() => (el.style.height = window.innerHeight - 124 + "px"));
  });
}
