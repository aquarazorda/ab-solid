import { useI18n } from "@solid-primitives/i18n";
import { Show, createMemo } from "solid-js";
import { A } from "solid-start";
import { match } from "ts-pattern";
import { Promotion } from "~/types/promos";
import { createStaticUrl } from "~/utils/string";
type PromoItemProps = {
  promo: Promotion;
  onClick: () => void;
  clicked: boolean;
};

export const PromoItem = (props: PromoItemProps) => {
  const [t, { locale }] = useI18n();

  const text = createMemo(() =>
    match(locale())
      .with("en", () => ({
        description: props.promo.descriptionEn,
        title: props.promo.titleEn,
      }))
      .with("ru", () => ({
        description: props.promo.descriptionRu,
        title: props.promo.titleRu,
      }))
      .otherwise(() => ({
        description: props.promo.description,
        title: props.promo.title,
      }))
  );

  return (
    <div
      class="_s_flex _s_flex-a-center _s_flex-j-center _s_size-w-percent--25 
          _s_size-h-percent--25 _s_position-relative"
      onClick={() => props.onClick()}
    >
      <img
        alt="test"
        class="_s_size-w-percent--25"
        src={createStaticUrl(`/images/promotions/${props.promo.id}mobile_${locale()}.jpg`)}
      />
      <div
        class="_s_lg-pl-6 _s_pl-4 _s_lg-pr-6 _s_pr-4 _s_lg-pb-6 _s_pb-4 
          _s_position-absolute _s_transition-0--3 
          _s_hitem-opacity-1 _s_size-h-percent--25 _s_flex _s_flex-d-column _s_flex-j-end
          _s_gradient-from-bottom"
        classList={{
          "_s_opacity-0": !props.clicked,
        }}
      >
        <h4 class="_s_label _s_label-md _s_mt-none _s_mb-1 _s_label-t-u">{text().title}</h4>
        <span class="_s_label _s_label-xs _s_color-primary-8 _s_mb-3">{text().description}</span>
        <Show when={props.clicked}>
          <A
            class="_s_btn _s_btn-sm _s_btn-positive _s_size-w-percent--25"
            data-id="promotions-item-public-57"
            href={"/mobile/" + props.promo.promoLink}
          >
            <span class="_s_label _s_label-t-u">{t("_lang_promotion_page_tab_apply")}</span>
          </A>
        </Show>
      </div>
    </div>
  );
};
