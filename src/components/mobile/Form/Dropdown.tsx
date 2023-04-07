import { For, splitProps } from "solid-js";
import { SelectProps } from "./types";
import { useI18n } from "@solid-primitives/i18n";

export const Dropdown = (props: SelectProps) => {
  const [, selectProps] = splitProps(props, ["value", "class", "options", "label", "error"]);
  const [t] = useI18n();

  return (
    <div class={props.class}>
      <select id={props.name} class="_s_size-w-percent--25 _s_pt-2 _s_input" {...selectProps}>
        <For each={props.options}>{(item) => <option value={item.value}>{t(item.title.langId)}</option>}</For>
      </select>
      <span
        class="_s_position-absolute _s_position-r-percent--0 _s_position-t-percent--0 
        _s_pt-4 _s_pointer-event-none"
      >
        <span class="_s_icon _s_icon-sm _s_adj-arrow-down _s_color-primary-8" />
      </span>
    </div>
  );
};
