import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { match } from "ts-pattern";
import { setFooterState } from "~/mobile/components/Footer";
import { mobileHeaderState } from "~/mobile/components/Header";
import { mountSportsbook } from "~/utils/sportsbook";

export default function MobileSportsbook() {
  const [height, setHeight] = createSignal("400px");
  mountSportsbook();

  onMount(() => {
    createEffect(() => {
      match(mobileHeaderState.navOpen)
        .with(false, () => setHeight(window.innerHeight - 60 + "px"))
        .otherwise(() => setHeight(window.innerHeight - 124 + "px"));
    });

    setFooterState("hidden", true);
  });

  onCleanup(() => {
    setFooterState("hidden", false);
  });

  return <div class="_s_color-bg-primary-6 _s_flex isMobile" id="sng-sportsbook" style={{ height: height() }} />;
}
