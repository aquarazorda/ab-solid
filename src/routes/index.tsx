import { unstable_island } from 'solid-start';
// import { MainSlider } from '~/pages/Home/MainSlider';
// import { SlotsSlider } from '~/pages/Home/SlotsSlider';
// import { Widgets } from '~/pages/Home/Widgets';

const MainSlider = unstable_island(() => import('../pages/Home/MainSlider'));
const Widgets = unstable_island(() => import('../pages/Home/Widgets'));
const SlotsSlider = unstable_island(() => import('../pages/Home/SlotsSlider'));

export default function Home() {
	

	return (
		<div class="_s_size-w-percent--25 _s_container _s_color-bg-primary-0 _s_lg-color-bg-transparent ng-star-inserted">
			<MainSlider />
			<Widgets />
			<SlotsSlider />
		</div>
	);
}
