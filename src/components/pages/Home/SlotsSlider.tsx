import { createResource, For } from 'solid-js';
import { A } from 'solid-start';

const fetchGameData = async () => await (await fetch('https://webapi-personal.adjarabet.com/getLikegames_proxy?device=0&domain=.com&quantity=20&tag=slots&period=7')).json();

export const SlotsSlider = () => {
	const [slides] = createResource(fetchGameData);

	return <div class="_s_mt-5">
		<div class="_s_mb-5 _s_mt-none _s_overflow-hidden _s_position-relative _s_size-h-percent--25 _s_lg-pl-2-5 _s_lg-pr-2-5">
			<div class="_s_flex _s_flex-a-center _s_p-3">
				<div class="_s_icon _s_icon-md _s_color-primary-8 _s_adj-star" />
				<A href="/">
					<span class="_s_label _s_label-md _s_label-t-u _s_z-1">
          კვირის ყველაზე მოწონებული თამაშები
					</span>
				</A>
			</div>
			<div class="_swiper-reset _s_b-radius-sm _s_flex _s_position-relative _s_size-h-percent--25 _s_z-1 _s_lg-overflow-hidden _s_size-h-min-px--30">
				{/* <swiper-container slides-per-view='7' slides-per-group={7} space-between={20}>
					<For each={slides()?.list}>
						{(slide) => <swiper-slide lazy={true}>
							<div class="_s_cursor-pointer _s_display-f _s_overflow-hidden">
								<div class="_s_size-w-percent--25 _s_flex _s_overflow-hidden _s_pl-1 _s_pr-1 _s_lg-pl-none _s_lg-pr-none">
									<img alt={slide.gameId} loading="lazy" class="_s_size-w-percent--25 _s_flex _s_b-radius-sm _s_lg-b-radius-none" src={`https://newstatic.adjarabet.com/static/images/common/${slide.gameId}_en.jpg`} />
								</div>
							</div>
						</swiper-slide>}
					</For>
				</swiper-container> */}
				<div class="_s_b-radius-full _s_color-rgba-bg-primary-0-0--7 _s_cursor-pointer _s_icon _s_icon-xl _s_mr-none _s_position-absolute _s_position-minus-l-px--7 _s_position-t-px--10 _s_z-1">
					<i class="_s_icon _s_icon-sm _s_adj-arrow-left _s_mr-none" />
				</div>
				<div class="_s_cursor-pointer _s_mr-none _s_icon _s_icon-xl _s_position-absolute _s_position-t-px--10 _s_position-minus-r-px--5 _s_b-radius-full _s_color-rgba-bg-primary-0-0--7 _s_z-1">
					<i class="_s_icon _s_icon-sm _s_adj-arrow-right _s_ml-none" />
				</div>
			</div>
		</div>
	</div>;
};

export default SlotsSlider;