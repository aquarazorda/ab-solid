import { useLanguage } from "~/utils/language";
import { Show, createSignal, onMount } from "solid-js";
import { useSearchParams } from "solid-start";
import { debounce } from "@solid-primitives/scheduled";

const MobileSearchBox = () => {
  const [t] = useLanguage();
  const [search, setSearch] = useSearchParams<{ text: string }>();
  const [isOpen, setIsOpen] = createSignal(false);

  onMount(() => {
    if (search.text) {
      setIsOpen(true);
    }
  });

  const onInput = debounce((e: Event) => {
    const target = e.target as HTMLInputElement;
    setSearch({ ...search, text: target.value });
  }, 400);

  const onClose = () => {
    setIsOpen(false);
    setSearch({ ...search, text: "" });
  };

  return (
    <div>
      <div
        class="_s_mr-1 _s_size-h-percent--25"
        classList={{ "_s_size-w-px--45": isOpen(), "_s_size-h-px--10 _s_b-radius-sm": !isOpen() }}
      >
        <Show when={isOpen()}>
          <div class="_s_flex-a-center _s_color-bg-primary-7 _s_size-h-percent--25 _s_pl-3 _s_b-radius-sm _s_flex">
            <span class="_s_icon _s_icon-xs _s_ml-none _s_mr-1 _s_color-primary-8 _s_adj-search" />
            <input
              class="_s_size-w-percent--25 _s_color-bg-transparent _s_b-transparent _s_color-primary-8"
              onInput={onInput}
              value={search.text || ""}
            />
            <button
              type="button"
              class="_s_icon _s_b-transparent _s_adj-error _s_ml-1"
              onClick={onClose}
            />
          </div>
        </Show>
        <Show when={!isOpen()}>
          <div
            class="_s_pl-4 _s_flex-a-center _s_size-h-percent--25 _s_flex"
            onClick={() => setIsOpen(true)}
          >
            <span class="_s_icon _s_icon-xs _s_ml-none _s_mr-1 _s_color-primary-8 _s_adj-search" />
            <span class="_s_label _s_label-xs _s_white-space-nowrap _s_color-primary-8">
              {t("_lang_button_search")}
            </span>
            <span class="_s_ml-2 _s_color-primary-8 _s_label-xs _s_opacity-0--5">|</span>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default MobileSearchBox;
