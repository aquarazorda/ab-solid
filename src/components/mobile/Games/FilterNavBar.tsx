import { useI18n } from "@solid-primitives/i18n";
import { For } from "solid-js";
import { A } from "solid-start";

export type FilterNavItem = {
  type: string;
  Name: string;
  route: string;
  remote: boolean;
  icon: string;
  New?: boolean;
};

export const FilterNavBar = (props: { navItems?: { list: FilterNavItem[] } }) => {
  const [t] = useI18n();

  return (
    <div
      data-id="mobile-filter-navigation"
      class="_s_position-relative _s_size-w-percent--25 _s_z-2 _s_color-bg-primary-7 _s_flex"
    >
      <div class="_s_icon _s_icon-xl _s_m-none _s_br-solid _s_bw-r-1 _s_br-primary-5 _s_aitem-color-bg-primary-6">
        <div
          class="_s_cursor-pointer _s_flex _s_flex-j-center _s_position-relative _s_size-h-percent--25 
          _s_size-w-percent--25 _s_flex-a-center"
        >
          <span class="_s_color-primary-8 _s_icon _s_adj-search" />
        </div>
      </div>
      <div class="_s_flex _s_flex-j-between _s_mr-5 _s_overflow-x-auto _s_overflow-y-hidden _s_scroll-0">
        <For each={props.navItems?.list}>
          {(item) => (
            <A href={item.route} activeClass="_s_a-color _s_a-b _s_a-label">
              <div class="_s_aitem-color-bg-primary-5 _s_flex _s_flex-a-center _s_pl-2 _s_pr-2 _s_size-h-percent--25">
                <span
                  class="_s_color-primary-8 _s_label _s_label-sm _s_flex-no-wrap _s_label-a-center _s_flex-j-center 
                  _s_size-h-percent--25 _s_aitem-color-primary-1 _s_white-space-nowrap"
                >
                  {t(item.Name)}
                </span>
              </div>
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
