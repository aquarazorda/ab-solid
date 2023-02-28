import { A } from 'solid-start'

export const Auth = () => {

  return <div class="_s_flex authorization__interface _s_position-relative _s_ml-auto">
    <form class="_s_flex">
      <div class="_s_aitem-scroll-scrolled-none _s_flex _s_flex-a-start">
        <div class="_s_flex _s_position-relative _s_mr-2">
          <div class="_s_position-relative is-editable form-content-wrapper">
            <input class="_s_size-w-px--57 _s_input _s_input-sm _s_input-transparent _s_b-primary-7 _s_bw-1 _s_b-solid _s_pt-2 ng-dirty ng-valid ng-touched" />
            <span class="here-insert-newLabel-class _s_pt-1 _s_position-absolute _s_position-l-percent--0 _s_position-t-px--0 _s_label _s_label-xs _s_pl-2 _s_transition-0--3 _s_white-space-nowrap _s_color-primary-8 _s_pointer-event-none">
              სახელი
            </span>
          </div>
          <A href="/" class="_s_color-primary-8 _s_h-color _s_bw-l-1 _s_bl-solid _s_bl-primary-7 _s_position-absolute _s_flex-a-center _s_flex _s_position-r-px--0 _s_position-t-px--0 _s_size-h-percent--25 _s_h-display">
            <span class="_s_color-primary-8 _s_hitem-color-primary-1 _s_icon _s_icon-xs _s_adj-forget _s_cursor-pointer" />
            <div class="_s_position-absolute _s_position-r-px--0 _s_position-t-percent--25 _s_z-3 _s_mt-1 _s_hitem-display-f _s_display-n">
              <div class="_s_p-1 _s_b-radius-sm _s_color-bg-primary-8">
                <span class="_s_label _s_white-space-nowrap _s_label-xs _s_color-primary-5 _s_pt-1 _s_pb-1 _s_pl-2 _s_pr-2">
                  აღდგენა
                </span>
              </div>
            </div>
          </A>
        </div>
        <div class="_s_flex _s_position-relative">
          <div class="_s_position-relative">
            <input class="_s_size-w-px--57 _s_input _s_input-sm _s_input-transparent _s_b-primary-7 _s_bw-1 _s_b-solid _s_b-radius-br-none _s_b-radius-tr-none _s_pt-2 ng-dirty ng-valid ng-touched" type="password" />
            <span class="here-insert-newLabel-class _s_pt-1 _s_position-absolute _s_position-l-percent--0 _s_position-t-px--0 _s_label _s_label-xs _s_pl-2 _s_transition-0--3 _s_white-space-nowrap _s_color-primary-8 _s_pointer-event-none">
              პაროლი
            </span>
          </div>
          <A href="/" class="_s_color-primary-8 _s_h-color _s_bw-l-1 _s_bl-solid _s_bl-primary-7 _s_position-absolute _s_flex-a-center _s_flex _s_position-r-px--0 _s_position-t-px--0 _s_size-h-percent--25 _s_h-display">
            <span class="_s_color-primary-8 _s_hitem-color-primary-1 _s_icon _s_icon-xs _s_adj-forget _s_cursor-pointer" />
            <div class="_s_position-absolute _s_position-r-px--0 _s_position-t-percent--25 _s_z-3 _s_mt-1 _s_hitem-display-f _s_display-n">
              <div class="_s_p-1 _s_b-radius-sm _s_color-bg-primary-8">
                <span class="_s_label _s_white-space-nowrap _s_label-xs _s_color-primary-5 _s_pt-1 _s_pb-1 _s_pl-2 _s_pr-2">აღდგენა</span>
              </div>
            </div>
          </A>
        </div>
        <A href="/" class="_s_color-rgba-bg-primary-5-0--9 _s_color-primary-8 _s_b-radius-tr-sm _s_b-radius-br-sm _s_bw-1 _s_b-solid _s_b-primary-7 _s_size-h-percent--25 _s_position-relative _s_flex-a-center _s_flex _s_cursor-pointer _s_h-display">
          <div class="_s_position-absolute _s_position-r-px--0 _s_position-t-percent--25 _s_z-3 _s_mt-1 _s_hitem-display-f _s_display-n">
            <div class="_s_label _s_white-space-nowrap _s_label-xs _s_color-primary-5 _s_pt-1 _s_pb-1 _s_pl-2 _s_pr-2">
              <span class="_s_label _s_white-space-nowrap _s_label-xs _s_color-primary-5 _s_pt-1 _s_pb-1 _s_pl-2 _s_pr-2">
                შესვლა SMS-ით
              </span>
            </div>
          </div>
          <span class="_s_icon _s_adj-mobile-phone _s_color-primary-8 _s_h-color _s_hitem-color-primary-1" />
        </A>
      </div>
      <div class="_s_flex _s_ml-5">
        <button class="_s_btn _s_btn-sm _s_btn-positive _s_pl-5 _s_pr-5 _s_mb-none">
          <span class="_s_label _s_label-t-u">შესვლა</span>
        </button>
      </div>
    </form>
    <button class="_s_btn _s_btn-sm _s_btn-negative _s_pl-5 _s_pr-5 _s_ml-2 _s_mb-none">
      <span class="_s_label _s_label-t-u">რეგისტრაცია</span>
    </button>
  </div>
}