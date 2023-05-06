import { createEffect } from "solid-js";
import { match } from "ts-pattern";
import { useHeader } from "~/states/header";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      withHeaderHeight: boolean;
    }
  }
}

export default function withHeaderHeight(el: HTMLElement, use: boolean) {
  const [state] = useHeader();
  createEffect(() => {
    if (!use) return;
    match(state.navOpen)
      .with(false, () => (el.style.height = window.innerHeight - 60 + "px"))
      .otherwise(() => (el.style.height = window.innerHeight - 124 + "px"));
  });
}
