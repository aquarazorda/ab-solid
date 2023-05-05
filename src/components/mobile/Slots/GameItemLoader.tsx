import { For } from "solid-js";
import { createArrFromNum } from "~/utils/common";

type Props = {
  count: number;
};

const MobileGameItemLoader = (props: Props) => (
  <For each={createArrFromNum(props.count)}>
    {() => (
      <div
        class="_s_size-slot-item _s_size-h-px--40 _s_color-bg-primary-5 _s_b-radius-md _s_mb-3"
        style={{ height: "160px" }}
      />
    )}
  </For>
);

export default MobileGameItemLoader;
