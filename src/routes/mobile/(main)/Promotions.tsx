import { useLanguage } from "~/utils/language";
import { For, createMemo, createSignal } from "solid-js";
import { useRouteData, useSearchParams } from "solid-start";
import { DescriptionPage } from "~/components/mobile/DescriptionPage";
import { PromoEmptyContainer } from "~/components/mobile/Promos/EmptyContainer";
import { PromoItem } from "~/components/mobile/Promos/PromoItem";
import { promoFilters } from "~/data/promos";
import { createStaticResource } from "~/queries/static";
import { Promotion } from "~/types/promos";

export const routeData = () => {
  const [searchParams] = useSearchParams();
  const [promos] = createStaticResource<Promotion[]>("promotions");
  const filtered = createMemo(() =>
    promos()?.filter(
      ({ promoType, category }) =>
        promoType === "public" && (!searchParams.filter || category === searchParams.filter)
    )
  );

  return filtered;
};

export default function PromotionsMobile() {
  const [t] = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const filtered = useRouteData<typeof routeData>();
  const [clicked, setClicked] = createSignal<number>();

  const onClick = (idx: number) => () => {
    setClicked(clicked() === idx ? undefined : idx);
  };

  return (
    <DescriptionPage title={t("__lang__promos")}>
      <div class="_s_container _s_pt-7 _s_lg-pl-2 _s_pl-5 _s_lg-pr-2 _s_pr-5">
        <div class="_s_mb-8 _s_flex _s_scroll-0 _s_overflow-x-scroll">
          <For each={promoFilters}>
            {({ name, langKey }, idx) => (
              <button
                class="_s_btn-sm _s_pl-4 _s_pr-4 _s_mr-2 _s_cursor-pointer _s_b-radius-xxl _s_bw-1 
            _s_b-solid _s_b-transparent"
                classList={{
                  "_s_color-bg-primary-7":
                    (idx() === 0 && !searchParams.filter) || searchParams.filter === name,
                  "_s_color-rgba-bg-primary-7-0--3":
                    !(idx() === 0 && !searchParams.filter) && searchParams.filter !== name,
                }}
                onClick={() => setSearchParams({ filter: idx() === 0 ? undefined : name })}
              >
                <span class="_s_label">{t(langKey)}</span>
              </button>
            )}
          </For>
        </div>
        <div class="_s_overflow-hidden _s_position-relative _s_flex _s_flex-d-column _s_gap-2">
          <For each={filtered?.()} fallback={<PromoEmptyContainer filter={searchParams.filter} />}>
            {(promo, idx) => (
              <PromoItem promo={promo} onClick={onClick(idx())} clicked={clicked() === idx()} />
            )}
          </For>
        </div>
      </div>
    </DescriptionPage>
  );
}
