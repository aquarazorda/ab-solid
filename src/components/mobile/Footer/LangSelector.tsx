import { useI18n } from "@solid-primitives/i18n";
import { For, Show, createSignal } from "solid-js";
import { useConfig } from "~/config";
import clickOutside from "~/utils/directives/clickOutside";
import { Langs, changeLang } from "~/utils/language";

export const LangSelector = () => {
  const [dropdownIsOpen, setDropdownIsOpen] = createSignal(false);
  const { domain } = useConfig();
  const [, { locale, add }] = useI18n();
  false && clickOutside;

  const onLangChange = (lang: Langs) => {
    changeLang(lang, { locale, add });
    setDropdownIsOpen(false);
  };

  return (
    <div
      use:clickOutside={() => setDropdownIsOpen(false)}
      data-id="language-changer-dropdown-mob"
      class="_s_position-relative _s_mb-7 _s_pb-7"
    >
      <div
        classList={{ "_s_a-display": dropdownIsOpen() }}
        class="_s_b-radius-tl-sm _s_b-radius-tr-sm _s_b-radius-bl-sm
      _s_b-radius-br-sm _s_size-w-percent--25
      _cs_border-radius-down _s_overflow-hidden
      _s_color-bg-primary-5 _s_position-absolute
      _s_z-2 _s_bw-1 _s_b-primary-7 _s_b-solid"
      >
        <div class="_s_overflow-hidden" onClick={() => setDropdownIsOpen((o) => !o)}>
          <For each={langList[domain]}>
            {(item) => (
              <Show when={item.value === locale()}>
                <div
                  data-id="mobile-language-change"
                  class="_s_p-2 _s_flex _s_flex-a-center _s_bd-primary-7 _s_bw-1 _s_bd-solid"
                >
                  <span class="_s_label _s_label-sm _s_color-primary-1">{item.label}</span>
                  <div class="_s_position-absolute _s_position-r-px--0 _s_flex _s_flex-a-center">
                    <span class="_s_icon _s_icon-sm _s_adj-arrow-down _s_color-primary-8" />
                  </div>
                </div>
              </Show>
            )}
          </For>
        </div>
        <For each={langList[domain]}>
          {(item) => (
            <Show when={item.value !== locale()}>
              <div
                onClick={() => onLangChange(item.value)}
                class="_s_aitem-display-b _s_display-n _cs_child"
              >
                <div class="_none-1 _s_p-3 _s_flex _s_flex-a-center _s_bd-primary-7 _s_bw-1 _s_bd-solid">
                  <span class="_s_label _s_color-primary-1 _s_label-sm english">{item.label}</span>
                </div>
              </div>
            </Show>
          )}
        </For>
      </div>
    </div>
  );
};

type LangItem = {
  value: Langs;
  label: string;
  isActive: boolean;
};

type LangList = {
  com: LangItem[];
  am: LangItem[];
};

const langList: LangList = {
  com: [
    {
      value: "en",
      label: "English",
      isActive: true,
    },
    {
      value: "ka",
      label: "ქართული",
      isActive: true,
    },
    {
      value: "ru",
      label: "Русский",
      isActive: true,
    },
  ],
  am: [
    {
      value: "en",
      label: "English",
      isActive: true,
    },
    {
      value: "hy",
      label: "Հայերեն",
      isActive: true,
    },
    {
      value: "ru",
      label: "Русский",
      isActive: true,
    },
  ],
};
