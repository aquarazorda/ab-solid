import { For } from "solid-js";
import { createArrFromNum } from "~/utils/common";
type Props = {
  count: number;
};

const MobileGameWidgetLoader = (props: Props) => (
  <For each={createArrFromNum(props.count)}>
    {() => (
      <div class="_s_mb-4 _s_pl-5 _s_overflow-hidden">
        <div class="_s_flex _s_flex-j-between _s_pr-5">
          <div class="_s_size-w-px--20 _s_size-h-px--5 _s_color-bg-primary-5 _s_b-radius-md _s_mb-2" />
          <div class="_s_size-w-px--12 _s_size-h-px--5 _s_color-bg-primary-5 _s_b-radius-md _s_mb-2" />
        </div>
        <div class="_s_pb-4 _s_flex">
          <For each={createArrFromNum(3)}>
            {() => (
              <div
                class="_s_flex-shrink-0 _s_mr-2 _s_color-bg-primary-5 _s_b-radius-md"
                style={{ width: "150px", height: "150px" }}
              />
            )}
          </For>
        </div>
        <div class="_s_bd-solid _s_bw-1 _s_bd-primary-5 _s_size-w-max-percent--25 _s_ml-5 _s_mr-5" />
      </div>
    )}
  </For>
);

export default MobileGameWidgetLoader;
