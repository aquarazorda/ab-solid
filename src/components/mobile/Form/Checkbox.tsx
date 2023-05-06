import { splitProps } from "solid-js";
import { CheckboxProps } from "./types";
import { setValue } from "@modular-forms/solid";
import { useLanguage } from "~/utils/language";

export const BigCheckbox = (props: CheckboxProps) => {
  const [, inputProps] = splitProps(props, ["form", "value", "label", "error"]);
  const [t] = useLanguage();

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

type RadioProps = {
  value: boolean;
  onClick: () => void;
};

export const Radio = (props: RadioProps) => {
  return (
    <div
      classList={{
        "_s_a-color _s_a-p": !props.value,
      }}
    >
      <div
        class="_s_user-select-none _s_flex _s_size-w-px--11 _s_size-h-px--6 
      _s_ml-auto _s_pl-1 _s_pr-1 _s_b-radius-xxl _s_color-bg-primary-4"
        onClick={() => props.onClick()}
      >
        {/* <input
        type="checkbox"
        name="onoffswitch"
        id="myonoffswitch"
        class="_s_display-n"
        value={Number(props.value)}
      /> */}
        <label
          for="myonoffswitch"
          class="_s_position-relative _s_aitem-pl-5 _s_transition-0--2 
        _s_flex _s_flex-a-center _s_size-w-percent--25 _s_size-h-percent--25 _s_oveflow-hidden _s_cursor-pointer _s_b-radius-xxl"
        >
          <i
            class="_s_icon _s_icon-sm _s_m-none _s_adj-circle 
        _s_color-primary-6 _s_transition-0--2 _s_position-relative _s_position-l-px--0"
            classList={{
              "_s_position-l-px--4 _s_aitem-color-primary-2": props.value,
            }}
          />
        </label>
      </div>
    </div>
  );
};
