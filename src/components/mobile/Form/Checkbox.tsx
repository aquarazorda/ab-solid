import { splitProps } from "solid-js";
import { CheckboxProps } from "./types";
import { useI18n } from "@solid-primitives/i18n";
import { setValue } from "@modular-forms/solid";

export const BigCheckbox = (props: CheckboxProps) => {
  const [, inputProps] = splitProps(props, ["form", "value", "label", "error"]);
  const [t] = useI18n();

  return (
    <div class="_s_flex _s_gap-">
      <label class="_css_check-radio _css_check-radio--switch">
        <input {...inputProps} class="_s_display-n" id={props.name} checked={props.checked} />
        <div
          class="_s_flex _s_flex-a-center _s_flex-j-between _s_size-w-px--16 _s_size-h-px--8 
          _s_position-relative _s_cursor-pointer"
          onClick={() => setValue(props.form, props.name, !props.checked)}
        >
          <span
            class="_s_color-bg-primary-6 _s_label _s_size-w-px--8 _s_size-h-px--8 _s_flex-j-center 
              _s_b-radius-full _s_z-1"
          >
            {t("_lang_button_yes")}
          </span>
          <span
            class="_s_color-bg-primary-6 _s_label _s_size-w-px--8 _s_size-h-px--8 _s_flex-j-center 
              _s_b-radius-full _s_z-1"
          >
            {t("_lang_button_no")}
          </span>
          <span
            class="_s_color-bg-primary-3 _s_size-w-px--8 _s_size-h-px--8 _s_position-absolute _s_position-l-px--0 
            _s_transition-0--3 _s_b-radius-full _s_z-1 _s_flex _s_flex-a-center _s_flex-j-center"
            classList={{
              "_s_color-bg-primary-2 _s_position-l-px--8": props.checked,
            }}
          >
            <span class="_s_icon _s_adj-check" />
          </span>
        </div>
      </label>
    </div>
  );
};
