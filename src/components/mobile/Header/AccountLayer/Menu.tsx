import { useI18n } from "@solid-primitives/i18n";
import { For, Show } from "solid-js";
import { A } from "solid-start";
import { createStaticResource } from "~/queries/static";

type MenuData = {
  list: {
    icon: string;
    title: {
      lang: boolean;
      langId: string;
    };
    event?: {
      eventMap: string;
      eventStringPointer: string[];
    };
    extras?: {
      showBalanceNotification: boolean;
    };
    route?: string;
  }[];
};

export const AccountLayerMenu = () => {
  const [t] = useI18n();
  const [menuData] = createStaticResource<MenuData>("headerMobileSubNavListOPTGEL"); // TODO

  return (
    <div class="_s_overflow-y-auto _s_scroll-sm _s_pt-2 _s_pb-2 _s_pl-5 _s_pr-5 _s_calc-height">
      <For each={menuData()?.list}>
        {(item) => (
          <>
            <Show when={item?.route}>
              <A
                href={"/mobile" + item.route}
                class="_s_flex _s_flex-a-center _s_pt-2 _s_pb-2 _s_cursor-pointer"
              >
                <span
                  class={`_s_icon _s_icon-sm _s_ml-none _s_color-primary-8 _s_mr-3 _s_adj-${item.icon}`}
                />
                <span class="_s_label _s_label-sm _s_color-primary-8 _s_cursor-pointer">
                  {t(item.title.langId)}
                </span>
              </A>
            </Show>
            <Show when={item?.event}>
              <a
                onClick={() => alert("TODO")}
                class="_s_flex _s_flex-a-center _s_pt-2 _s_pb-2 _s_cursor-pointer"
              >
                <span
                  class={`_s_icon _s_icon-sm _s_ml-none _s_color-primary-8 _s_mr-3 _s_adj-${item.icon}`}
                />
                <span class="_s_label _s_label-sm _s_color-primary-8 _s_cursor-pointer">
                  {t(item.title.langId)}
                </span>
              </a>
            </Show>
          </>
        )}
      </For>
    </div>
  );
};
