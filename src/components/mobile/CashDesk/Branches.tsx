import { useI18n } from "@solid-primitives/i18n";
import { For, createEffect, createMemo } from "solid-js";
import { useRouteData, useSearchParams } from "solid-start";
import { CashdeskMobileRouteData } from "~/routes/mobile/(footer)/cashDesk";
import { BranchAddress } from "./data";

const Branch = (props: BranchAddress) => {
  const [t] = useI18n();

  return (
    <div
      class="_s_b-primary-7 _s_b-radius-md _s_b-solid _s_bw-1 _s_color-bg-primary-6 _s_flex 
  _s_flex-a-start _s_flex-d-column _s_flex-j-between _s_lg-mb-3 _s_mb-2 _s_overflow-hidden 
  _s_pt-5 _s_size-h-min-px--37 _s_size-w-max-percent--25"
    >
      <span class="_s_label _s_label-md _s_label-primary-8 _s_m-down-sm _s_mb-7 _s_p-down-xs _s_pl-5 _s_pr-5">
        {t(`_lang_add_title_${props.id}`)}
      </span>
      <span class="_s_color-primary-8 _s_label _s_m-down-sm _s_mb-7 _s_p-down-xs _s_pl-5 _s_pr-5">
        {t(`_lang_add_address_${props.id}`)}
      </span>
      <div class="_s_color-bg-primary-7 _s_flex _s_pb-3 _s_pl-5 _s_pr-5 _s_pt-3 _s_size-w-percent--25">
        <div class="_s_col-6 _s_flex _s_flex-a-center">
          <span class="_s_adj-time _s_icon _s_icon-sm _s_ml-none _s_mr-2" />
          <div class="_s_label _s_label-xs">
            <span class="_s_color-primary-8 _s_mr-1">{t("_lang_working_hours")}</span>
            {props.byTags.alwaysOpen && <div>24/7</div>}
          </div>
        </div>
        <a
          tabIndex={0}
          class="_s_col-6 _s_flex _s_flex-a-center _s_flex-j-end"
          href={`https://maps.google.com?saddr=Current+Location&amp;daddr=${props.location.lat},${props.location.lng}`}
        >
          <div class="_s_flex _s_flex-a-center _s_flex-j-end">
            <span class="_s_adj-location _s_icon _s_icon-sm _s_ml-none _s_mr-2" />
            <span class="_s_color-primary-8 _s_label _s_label-d-underline _s_label-xs">
              {t("_lang_see_on_map")}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

export const CashdeskBranches = () => {
  const branches = useRouteData<CashdeskMobileRouteData>();
  const [searchParams] = useSearchParams();

  const filtered = createMemo(() => {
    const city = Number(searchParams?.city) || 1;
    const alwaysOpen = JSON.parse(searchParams?.alwaysOpen || "false") || false;

    return branches()?.filter(
      (branch) => branch.byTags.city === city && branch.byTags.alwaysOpen === alwaysOpen
    );
  });

  return (
    <div
      class="_s_b-radius-md _s_color-bg-transparent _s_flex _s_lg-color-bg-primary-6 _s_md-pl-5 
  _s_md-pr-5 _s_pb-5 _s_pl-none _s_pr-none _s_pt-5"
    >
      <div class="_s_lg-size-w-px--110 _s_size-w-percent--25">
        <div
          class="_s_lg-size-h-max-px--197 _s_lg-size-w-px--110 _s_overflow-y-auto _s_pr-2 
        _s_scroll _s_scroll-sm _s_size-h-max-px--117 _s_size-w-percent--25"
        >
          <div class="_s_flex _s_size-w-percent--25 _s_flex-d-column">
            <For each={filtered()}>{Branch}</For>
          </div>
        </div>
      </div>
    </div>
  );
};
