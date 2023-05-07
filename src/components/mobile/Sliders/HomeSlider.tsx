import { Accessor, For, Index, Show, createEffect, createSignal, on, onCleanup } from "solid-js";
import { createSlider } from "solid-slider";
import { A, useRouteData } from "solid-start";
import { Loader } from "~/components/Loader";
import { BannerData } from "~/types/banner";
import { createStaticUrl } from "~/utils/string";

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
  const [loaded, setLoaded] = createSignal<Record<number, boolean>>({});

  const [slider, { current, next, moveTo }] = createSlider({
    loop: true,
    slides: {
      perView: 1.1,
      origin: "center",
      spacing: 8,
    },
  });

  createEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 3000);

    onCleanup(() => clearInterval(interval));
  });

  setLoaded({ [slides?.()?.length - 1]: true, [0]: true });

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
                          <Show when={!imgLoaded()}>
                            <div
                              class="_s_lg-size-w-percent--25 _s_size-max-h-px--90 _s_size-h-percent--25
                          _s_flex-a-center _s_position-absolute _s_flex"
                            >
                              <Loader />
                            </div>
                          </Show>
                          <Show when={loaded()[idx()]}>
                            <img
                              class="swiper-lazy _s_b-radius-md"
                              src={createStaticUrl(`/mbanners/${slide.id}_${locale()}.jpg`)}
                              data-id={slide.name}
                              alt={slide.name}
                              style={{ height: "155%" }}
                              onLoad={() => setImgLoaded(true)}
                            />
                          </Show>
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
