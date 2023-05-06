import { createResource, For, onMount } from "solid-js";
import { useLanguage } from "~/utils/language";

const fetchBanners = async () =>
  await (
    await fetch("https://newstatic.adjarabet.com/static/widgetsCarouselData.json?v=1677603423")
  ).json();

export const Widgets = () => {
  const [banners] = createResource(fetchBanners);
  const [t] = useLanguage();

  return (
    <div class="_s_display-b _s_overflow-hidden _s_lg-pl-2-5 _s_position-relative _s_lg-pr-2-5 _s_size-h-px--87 _s_z-2">
      <div class="_s_position-relative _s_overflow-hidden _s_z-1 _s_display-b _s_size-h-percent--25">
        <div class="_s_display-b _s_overflow-hidden _s_position-relative _s_size-h-px--87 _s_z-2 _s_mb-5">
          {/* <swiper-container
					ref={swiper}
					slides-per-view="3.3"
					space-between="20"
					loop={true}
					class="_s_size-h-px--96 _s_lg-size-h-px--109"
				>
					<For each={banners()?.list} >
						{banner =>
							<swiper-slide lazy={true}>
								<div class="_s_overflow-hidden _s_display-i-b _s_size-h-px--87 _s_size-w-percent--25">
									<div class="_s_size-h-percent--25">
										<div class="_s_color-bg-primary-6 _s_mb-2 _s_mt-none _s_position-relative _s_overflow-hidden _s_size-h-percent--25">
											<div class="_s_flex _s_flex-d-column _s_position-relative _s_size-h-percent--25 _s_b-radius-sm _s_z-1 _s_h-color">
												<div class="_s_flex _s_flex-a-center _s_p-3">
													<i class="_s_adj-star _s_color-primary-8 _s_icon _s_icon-md" />
													<span class="_s_z-1 _s_label _s_label-md _s_label-t-u _s_cursor-pointer">
														{t(banner.title.langId)}
													</span>
												</div>
												<div class="_s_flex _s_flex-wrap _s_position-relative _s_size-h-percent--25 _s_flex-j-center _s_cursor-pointer">
													<div class="_s_flex _s_flex-a-start _s_flex-j-center _s_size-w-percent--25">
														<img alt={t(banner.title.langId)} class="_s_flex _s_flex-a-center _s_flex-j-center" src={`https://newstatic.adjarabet.com/static/${banner.img}_ka.jpg`} loading='lazy' />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</swiper-slide>
						}
					</For>
				</swiper-container> */}
          <div class="_s_cursor-pointer _s_ml-none _s_icon _s_icon-xl _s_position-absolute _s_position-t-px--41 _s_position-minus-l-px--5 _s_b-radius-full _s_color-rgba-bg-primary-0-0--7 _s_z-3">
            <i class="_s_icon _s_icon-sm _s_adj-arrow-left _s_mr-none" />
          </div>
          <div class="_s_cursor-pointer _s_mr-none _s_icon _s_icon-xl _s_position-absolute _s_position-t-px--41 _s_position-minus-r-px--5 _s_b-radius-full _s_color-rgba-bg-primary-0-0--7 _s_z-3">
            <i class="_s_icon _s_icon-sm _s_adj-arrow-right _s_ml-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widgets;
