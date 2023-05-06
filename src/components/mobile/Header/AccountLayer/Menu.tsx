import { For, Show, Suspense } from "solid-js";
import { A } from "solid-start";
import { createStaticResource } from "~/queries/static";
import { useHeader } from "~/states/header";
import { useUser } from "~/states/user";
import { useLanguage } from "~/utils/language";

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
  const [t] = useLanguage();
  const [menuData] = createStaticResource<MenuData>("headerMobileSubNavListOPTGEL"); // TODO
  const [, { logOut }] = useUser();
  const [, { toggleAccountLayer }] = useHeader();

  return (
    <Suspense>
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
      <div class="_s_position-absolute _s_position-b-percent--0 _s_position-l-percent--0 _s_col-12 _s_bt-solid _s_bt-primary-7 _s_bw-1">
        <div
          class="_s_color-bg-primary-6 _s_flex _s_flex-a-center _s_pl-5 _s_pr-5 _s_pt-3 _s_pb-3 _s_cursor-pointer"
          onClick={() => {
            logOut(true);
            toggleAccountLayer(false);
          }}
        >
          <span class="_s_adj-logout _s_color-primary-8 _s_icon _s_icon-sm _s_ml-none _s_mr-3" />
          <span class="_s_label _s_label-sm _s_color-primary-8 _s_cursor-pointer">
            {t("_lang_login_button_log_out")}
          </span>
        </div>
      </div>
    </Suspense>
  );
};
