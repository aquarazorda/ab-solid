import { onCleanup, onMount } from "solid-js";
import { setFooterState } from "~/components/mobile/Footer";
import withHeaderHeight from "~/utils/directives/withHeaderHeight";
import { mountSportsbook } from "~/utils/sportsbook";

false && withHeaderHeight;

export default function MobileSportsbook() {
  mountSportsbook();

  onMount(() => {
    setFooterState("hidden", true);
  });

  onCleanup(() => {
    setFooterState("hidden", false);
  });

  return (
    <div class="_s_color-bg-primary-6 _s_flex isMobile" id="sng-sportsbook" use:withHeaderHeight />
  );
}
