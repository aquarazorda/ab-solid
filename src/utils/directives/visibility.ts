import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { createEffect, createSignal } from "solid-js";

export type VisibilityProps = {
  shouldObserve?: boolean;
  onObserve?: () => void;
};

export const useVisibility = (
  props: VisibilityProps & {
    threshold?: number;
    ref: () => HTMLElement | undefined;
  }
) => {
  const [wasVisible, setWasVisible] = createSignal(false);
  const useVisibilityObserver =
    props.shouldObserve && createVisibilityObserver({ threshold: props.threshold || 0.1 });
  const visible = useVisibilityObserver ? useVisibilityObserver(props.ref) : () => false;

  createEffect(() => {
    if (!wasVisible() && props.shouldObserve && props.ref() && visible()) {
      setWasVisible(true);
      props.onObserve?.();
    }
  });
};
