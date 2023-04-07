import { useI18n } from "@solid-primitives/i18n";
import { For, Index, createMemo } from "solid-js";
import { createSlider } from "solid-slider";
import "solid-slider/slider.css";
import { A, useRouteData } from "solid-start";
import { HomeMobileData } from "~/routes/mobile/(index)";
import { createStaticUrl } from "~/utils/string";

export const HomeSlider = () => {
  const { slidersData } = useRouteData<HomeMobileData>();
  const [t, { locale }] = useI18n();

  const [slider, { current, moveTo }] = createSlider({
    loop: true,
    slides: {
      perView: 1,
      origin: "center",
      spacing: 0,
    },
  });

  const slides = createMemo(() =>
    slidersData()
      ?.filter(
        ({ byTags, segments }) =>
          (byTags.empty && !segments?.length) || byTags.visitor
      )
      .sort(
        (slide1, slide2) =>
          (slide1.byTags?.visitor?.order ?? slide1.byTags?.empty?.order) -
          (slide2.byTags?.visitor?.order ?? slide2.byTags?.empty?.order)
      )
  );

  return (
    <div data-id="home-main-slider" class="_s_position-relative">
      <div class="_s_size-h-px--90 _s_lg-size-h-px--109 _s_flex">
        <div use:slider>
          <For each={slides()}>
            {(slide) => (
              <div
                class="desktop _s_display-i-f _s_overflow-hidden _s_position-relative _s_size-w-percent--25 _s_size-h-percent--25 _s_lg-b-radius-sm ng-star-inserted"
                data-id={t(slide.title.langId)}
              >
                <div class="_s_size-w-percent--25 _s_cursor-pointer">
                  <div class="_s_flex _s_flex-j-center _s_size-h-percent--25">
                    <A
                      class="_s_size-w-percent--25 _s_size-h-percent--25 _s_flex _s_flex-a-center _s_flex-j-center _s_color-bg-primary-0"
                      data-id={`slider-item-offer-link${slide.id}`}
                      href={slide.route || "/"}
                    >
                      <img
                        class="swiper-lazy _s_lg-size-w-percent--25 _s_size-max-h-px--90 _s_size-h-percent--25 swiper-lazy-loaded"
                        src={createStaticUrl(
                          `/mbanners/${slide.id}_${locale()}.jpg`
                        )}
                        data-id={t(slide.title.langId)}
                      />
                    </A>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
      <div data-id="swiper-paginator-wrapper">
        <div
          id="swiper_pagination"
          data-id="swiper-paginator-container"
          class="_s_position-absolute _s_z-5 _s_pl-1 _s_pr-1 _s_position-b-px--1 _s_lg-position-b-px--5 _s_position-l-percent--50 _s_transform-translateX-minus-percent--50 _s_flex _s_flex-j-center _s_a-color swiper-pagination-clickable bullets swiper-pagination-horizontal"
        >
          <Index each={slides()}>
            {(_, idx) => (
              <span
                onClick={() => moveTo(idx)}
                classList={{
                  "_s_a-color _s_aitem-color-primary-1": current() === idx,
                }}
                class="_s_icon _s_adj-minus-large _s_ml-none _s_mr-none _s_cursor-pointer _s_color-rgba-primary-1-0--3 _s_icon-md"
              />
            )}
          </Index>
        </div>
      </div>
    </div>
  );
};
