import { Accessor, onCleanup } from "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      clickOutside: () => false | void;
    }
  }
}

export default function clickOutside(el: Element, accessor: Accessor<any>) {
  const onClick = (e: any) => !el?.contains(e?.target) && accessor()?.();
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}
