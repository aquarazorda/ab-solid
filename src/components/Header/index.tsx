import { Auth } from './Auth';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { PromoBanner } from './PromoBanner';



export const Header = () => {
	return <div class="_s_flex _s_size-w-percent--25 _s_flex-d-column">
		<div class="_s_color-bg-primary-5 _s_position-l-px--0 _s_position-t-px--0 _s_z-9 _s_size-w-percent--25 _s_mb-10 _s_position-relative">
			<PromoBanner />
			<div class="_s_size-w-percent--25 _s_size-w-min-px--225 _s_flex _s_flex-a-center _s_pl-2 _s_pr-2 _s_container">
				<div class="_s_size-w-percent--25 _s_size-w-min-px--225 _s_flex _s_flex-a-center _s_pl-2 _s_pr-2 _s_container">
					<Logo />
					<Navigation />
					<Auth />
				</div>
			</div>
		</div>
	</div>;
};