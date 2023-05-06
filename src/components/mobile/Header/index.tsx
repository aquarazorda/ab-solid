import { A } from "solid-start";
import { Navigation } from "./Navigation";
import { Show, createEffect } from "solid-js";
import { RightSideHeader } from "./RightSide";
import { useHeader } from "~/states/header";
import { useLanguage } from "~/utils/language";

export const Header = () => {
  const [t] = useLanguage();
  const [header, { toggleNav }] = useHeader();
  const toggle = () => !header.navBlocked && toggleNav();

  createEffect(() => {
    if (header.navBlocked) {
      toggleNav(false);
    }
  });

  return (
    <Show when={!header.hidden}>
      <div class="_s_flex _s_size-w-percent--25 _s_flex-d-column _s_position-relative">
        <div
          class="_s_position-t-px--0 _s_position-l-px--0 _s_z-6 _s_size-w-percent--25 _s_size-w-min-percent--25 
          _s_flex-shrink-0"
        >
          <div class="_s_transition-0--3 _s_size-h-min-px--10">
            <div
              class="_s_position-relative _s_flex _s_flex-a-center _s_flex-j-between _s_size-w-min-percent--25 
                _s_size-h-min-px--15 _s_pt-2 _s_pb-2 _s_color-bg-primary-4"
            >
              <div class="_s_position-relative _s_z-1 _s_pl-7 _s_pl-5 _s_pr-5 _s_flex _s_col _s_col-4 _s_flex-j-start">
                <A
                  data-id="mobile-header-main"
                  class="_s_label _s_label-md _s_label-t-u _s_aitem-opacity-0 _s_position-relative 
                  _s_transition-0--3 _s_a-color"
                  href="/mobile"
                  aria-label={t("__lang__main")}
                  end={true}
                >
                  {t("__lang__main")}
                </A>
              </div>
              <div
                class="_s_display-f _s_flex-j-center _s_flex-a-center _s_position-absolute _s_z-1 _s_aitem-opacity-0"
                style={{ "margin-left": "47%" }}
              >
                <div
                  data-id="mobile-ab-logo"
                  class="_s_size-w-px--8 _s_size-h-px--8 _s_size-w-min-px--8 _s_size-h-min-px--8 
                  _s_position-relative _s_cursor-pointer _s_bg-img-logoSm _s_bg-position-center _s_bg-no-repeat _s_bg-size-full"
                  onClick={toggle}
                />
              </div>
              <RightSideHeader />
            </div>
          </div>
          <Show when={header.navOpen}>
            <Navigation />
          </Show>
        </div>
      </div>
    </Show>
  );
};
