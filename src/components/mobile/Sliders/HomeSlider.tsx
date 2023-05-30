import { Accessor, For, Index, createEffect, createSignal, on, onCleanup, onMount } from "solid-js";
import { createSlider } from "solid-slider";
import { A, useRouteData } from "solid-start";
import { BannerData } from "~/types/banner";

import "./HomeSlider.css";
import { useLanguage } from "~/utils/language";

export const homePageSliderFilterFn = (slides: BannerData[]) =>
  slides
    ?.filter(({ byTags, segments }) => (byTags.empty && !segments?.length) || byTags.visitor)
    .sort(
      (slide1, slide2) =>
        (slide1.byTags?.visitor?.order ?? slide1.byTags?.empty?.order) -
        (slide2.byTags?.visitor?.order ?? slide2.byTags?.empty?.order)
    );

export const MainSlider = () => {
  const { slides } = useRouteData<{ slides: Accessor<BannerData[]> }>();
  const [t, { locale }] = useLanguage();
  const [loaded, setLoaded] = createSignal<Record<number, boolean>>({ [0]: true });

  const [slider, { current, next, moveTo }] = createSlider({
    loop: true,
    slides: {
      perView: 1,
      origin: "center",
      spacing: 8,
    },
  });

  createEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);

    onCleanup(() => clearInterval(interval));
  });

  onMount(() => setLoaded({ [0]: true }));

  createEffect(
    on(current, () => {
      setLoaded((l) => ({ ...l, [current() + 1]: true }));
    })
  );

  return (
    <div data-id="home-main-slider" class="_s_lg-pl-2-5 _s_lg-pr-2-5">
      <div class="_s_flex _s_size-h-min-px--50 _s_size-h-px--50 _s_mb-2 _s_mt-2 _s_position-relative">
        <div use:slider class="_s_size-w-percent--25 _s_flex">
          <For each={slides?.()}>
            {(slide, idx) => {
              const [imgLoaded, setImgLoaded] = createSignal(false);

              return (
                <div
                  class="_s_display-f _s_size-h-percent-25 _s_size-w-percent--25"
                  data-id={t(slide.title?.langId)}
                >
                  <div
                    class="_s_size-h-px--50 _s_display-i-f _s_position-relative _s_size-w-percent--25 
                    _s_size-h-percent--25 _s_b-radius-md"
                  >
                    <div class="_s_size-w-percent--25 _s_cursor-pointer">
                      <div class="_s_flex _s_flex-j-center _s_size-h-percent--25">
                        <A
                          class="_s_size-w-percent--25 _s_overflow-hidden _s_size-h-percent--25 _s_flex _s_flex-a-end 
                        _s_flex-j-center _s_color-bg-primary-0 _s_b-radius-md"
                          data-id={`slider-item-offer-link${slide.id}`}
                          href={slide.route || "/"}
                          aria-label={slide.name}
                        >
                          <img
                            class="swiper-lazy _s_b-radius-md"
                            src={
                              loaded()[idx()]
                                ? "https://static-stagingcms.adjaradev.com/desktop/cms-nova/img" +
                                  `/mbanners/${slide.id}_${locale()}.webp`
                                : ""
                            }
                            data-id={slide.name}
                            alt={slide.name}
                            style={{ height: "155%" }}
                            onLoad={() => setImgLoaded(true)}
                          />
                        </A>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
        <div data-id="swiper-paginator-container" class="owl-dots">
          <Index each={slides?.()}>
            {(_, idx) => (
              <span
                onClick={() => moveTo(idx)}
                classList={{
                  active: current() === idx,
                }}
                class="owl-dot"
              />
            )}
          </Index>
        </div>
      </div>
    </div>
  );
};
