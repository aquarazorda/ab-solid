import { createResource, For } from 'solid-js';

const fetchSlides = async () => await fetch('https://newstatic.adjarabet.com/static/allSlidersData.json?v=1677591304')
	.then(res => res.json())
	.then(data => data.filter((item: any) => 
		item.byTags 
    && item.byTags.empty 
    && !item.segments?.length
    && Object.keys(item.byTags).length === 1
	))
	.then(data => data.sort((a: any, b: any) => a.byTags.empty.order - b.byTags.empty.order));

export const MainSlider = () => {
	const [slides] = createResource(fetchSlides);

	return <div class="_s_lg-pl-2-5 _s_lg-pr-2-5">
		<div class="_s_position-relative _s_lg-mb-5 _s_lg-mt-5 _s_lg-overflow-hidden">
			{/* <swiper-container autoplay={true} class="main-swiper _s_size-h-px--90 _s_lg-size-h-px--109 swiper swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden ng-star-inserted">
				<For each={slides()}>
					{slide => <swiper-slide lazy={true}>
						<div class="desktop _s_display-i-f _s_overflow-hidden _s_position-relative _s_size-w-percent--25 _s_size-h-percent--25 _s_lg-b-radius-sm">
							<div class="_s_size-w-percent--25 _s_cursor-pointer _s_flex _s_flex-j-center">
								<div class="_s_size-w-percent--25 _s_size-h-percent--25 _s_flex _s_flex-a-center _s_flex-j-center _s_color-bg-primary-0">
									<img alt={slide.name} class="swiper-lazy _s_lg-size-w-percent--25 swiper-lazy-loaded" src={`https://newstatic.adjarabet.com/static${slide.img}`} loading="lazy" />
								</div>
								<div class="_s_flex _s_flex-a-center _s_position-absolute _s_position-b-px--4 _s_position-l-px--0 _s_lg-position-b-px--6 _s_pl-5 _s_pr-5 _s_size-w-percent--25 _s_z-2" />
							</div>
						</div>
					</swiper-slide>}
				</For>
			</swiper-container> */}
			<div class="swiper-paginator-wrapper">
				<div class="_s_position-absolute _s_z-5 _s_pl-1 _s_pr-1 _s_position-b-px--1 _s_lg-position-b-px--5 _s_position-l-percent--50 _s_transform-translateX-minus-percent--50 _s_flex _s_flex-j-center _s_a-color" />
				<div class="_s_cursor-pointer _s_ml-none _s_icon _s_icon-xl _s_position-absolute _s_position-t-px--48 _s_position-minus-l-px--5 _s_b-radius-full _s_color-rgba-bg-primary-0-0--7 _s_z-3 ng-star-inserted">
					<span class="_s_icon _s_icon-sm _s_adj-arrow-left _s_mr-none " />
				</div>
				<div class="_s_cursor-pointer _s_mr-none _s_icon _s_icon-xl _s_position-absolute _s_position-t-px--48 _s_position-minus-r-px--5 _s_b-radius-full _s_color-rgba-bg-primary-0-0--7 _s_z-3 ng-star-inserted">
					<span class="_s_icon _s_icon-sm _s_adj-arrow-right _s_ml-none" />
				</div>
			</div>
		</div>
	</div>;
};

export default MainSlider;