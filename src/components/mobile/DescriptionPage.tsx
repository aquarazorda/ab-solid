import { JSX } from "solid-js";

type Props = {
  title: string;
  inner?: string;
  class?: string;
  children?: JSX.Element;
};

export const DescriptionPage = (props: Props) => (
  <div class="_s_container _s_flex _s_flex-wrap _s_mb-5 _s_size-w-percent--25">
    <div class="_s_size-w-percent--25">
      <span
        class="_s_label _s_label-md _s_color-primary-1 _s_bd-primary-7 _s_bd-solid _s_bw-1 _s_color-bg-primary-4 
        _s_flex _s_flex-a-center _s_p-5"
      >
        {props.title}
      </span>
    </div>
    {props.inner && (
      <div
        class={`_s_pl-5 _s_pr-5 _s_color-primary-8 _s_label _s_flex-d-column _s_flex-a-start ${props.class}`}
        innerHTML={props.inner} // eslint-disable-line
      />
    )}
    {props.children}
  </div>
);
