import { For, Show } from "solid-js";
import { useSearchParams } from "solid-start";
import { SlotsFilter } from "~/types/slots";
import MobileSearchBox from "./SearchBox";
import { useLanguage } from "~/utils/language";

type Props = {
  categories: SlotsFilter[];
};

const SlotsCategoryNavigation = (props: Props) => {
  const [search, setSearchParams] = useSearchParams<{ category: string }>();
  const [, { locale }] = useLanguage();

  const onClick = (id: number) => {
    setSearchParams({ category: search.category === String(id) ? "" : String(id) });
  };

  return (
    <div class="_s_overflow-x-scroll _s_scroll-0 _s_mb-4 _s_pt-2">
      <div class="_s_flex _s_color-bg-primary-5">
        <MobileSearchBox />
        <For each={props.categories}>
          {(subItem, idx) => (
            <div
              classList={{ "_s_a-color _s_a-b": subItem.id === Number(search.category) }}
              class="_s_flex _s_flex-a-center _s_color-bg-primary-5"
            >
              <a
                onClick={() => onClick(subItem.id)}
                data-id={subItem?.name[locale()] + "-lobby"}
                data-filter-active={subItem?.id === Number(search.category) || undefined}
                class="_s_mr-1 _s_flex _s_flex-a-center _s_pl-1 _s_pr-1 _s_pt-3 _s_pb-3 _s_position-relative"
              >
                <Show when={subItem.new}>
                  <span
                    class="_s_flex _s_flex-j-center _s_position-absolute _s_position-l-percent--0 
                    _s_position-minus-t-px--2 _s_size-w-percent--25"
                  >
                    <span
                      class="_s_b-radius-sm _s_color-bg-primary-3 _s_pl-1 _s_pr-1 _s_label-xs 
                      _s_color-primary-1 _s_size-h-px--3 _s_label-t-u"
                    >
                      New
                    </span>
                  </span>
                </Show>
                <span
                  class={`_s_icon _s_icon-xs _s_ml-none _s_mr-1 _s_color-primary-8 _s_aitem-color-primary-1 _s_adj-${subItem?.icon}`}
                />
                <span class="_s_label _s_label-xs _s_white-space-nowrap _s_color-primary-8 _s_aitem-color-primary-1">
                  {subItem.name[locale()]}
                </span>
                <span
                  class="_s_size-w-percent--25 _s_bd-solid _s_bw-2 _s_b-transparent 
                  _s_aitem-b-primary-2 _s_position-absolute _s_position-b-px--0 _s_position-l-percent--0"
                />
              </a>
              <Show when={idx() !== props.categories.length - 1}>
                <span class="_s_ml-1 _s_mr-1 _s_size-h-px--2 _s_bw-1 _s_bl-solid _s_bl-primary-8 _s_opacity-0--5" />
              </Show>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default SlotsCategoryNavigation;
