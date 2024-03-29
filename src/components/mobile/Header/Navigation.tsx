import { For } from "solid-js";
import { A } from "solid-start";
import { headerNavList } from "~/data/json/headerNavList";
import { useLanguage } from "~/utils/language";

const Navigation = () => {
  const [t] = useLanguage();

  return (
    <div
      data-id="mobile-header-navigation"
      class="_s_display-f _s_flex-j-between _s_scroll-0 _s_overflow-x-scroll _s_pl-2 _s_pr-2 _s_pt-2 
      _s_pb-2 _s_size-w-percent--25 _s_color-rgba-bg-primary-0-0--8"
    >
      <For each={headerNavList}>
        {(item) => (
          <A
            href={item.route === "/" ? "/mobile" : item.route}
            class="_s_flex _s_flex-a-center _s_flex-d-column _s_ml-1 _s_mr-1"
            activeClass="_s_a-color"
            aria-label={t(item.title?.langId)}
            end={item.route === "/"}
          >
            <div class="_s_flex _s_flex-d-column _s_flex-a-center _s_position-relative">
              <span
                style={{ width: "24px", height: "24px" }}
                class={`_s_color-primary-8 _s_icon _s_icon-md _s_aitem-color-primary-1 _s_mb-1 _s_adj-${item.icon}`}
              />
              <div class="_s_position-absolute _s_position-t-px--5" />
              <span class="_s_color-primary-8 _s_label _s_label-sm _s_white-space-nowrap _s_aitem-color-primary-1 _s_mt-1">
                {t(item.title?.langId)}
              </span>
            </div>
          </A>
        )}
      </For>
    </div>
  );
};

export default Navigation;
