import { Show, createSignal } from "solid-js";
import { useConfig } from "~/config";
import { JackpotsData } from "~/data/jackpots";

type JackpotsCounterType = "EGT_MOBILE_NEW_SLOTS" | "EGT_DESKTOP_NEW_SLOTS";

type Props = {
  type: JackpotsCounterType;
};

const JackpotsComponent = (props: Props) => {
  const [isLoaded, setLoaded] = createSignal(false);
  const { domain } = useConfig();

  return (
    <>
      <div
        class="_s_flex _s_flex-j-center _s_overflow-hidden _s_mb-3 _s_scroll-0 _s_pl-4 _s_pr-4"
        classList={{ "_s_display-n": !isLoaded() }}
      >
        <div class="_s_position-relative">
          <img
            alt={JackpotsData[props.type][domain].title}
            src={JackpotsData[props.type][domain].img}
            class="_s_size-w-percent--25"
          />
          <iframe
            onLoad={() => setLoaded(true)}
            title={JackpotsData[props.type][domain].title}
            src={JackpotsData[props.type][domain].src}
            class="_s_position-absolute _s_position-t-px--0 _s_position-l-px--0 _s_size-h-percent--25 _s_bw-none 
            _s_size-w-percent--25 _s_b-transparent"
          />
        </div>
      </div>
      <Show when={!isLoaded()}>
        <div class="_s_pl-4 _s_pr-4 _s_mb-3">
          <div class="_s_size-w-percent--25 _s_size-h-px--12 _s_color-bg-primary-5 _s_b-radius-md" />
        </div>
      </Show>
    </>
  );
};

export default JackpotsComponent;
