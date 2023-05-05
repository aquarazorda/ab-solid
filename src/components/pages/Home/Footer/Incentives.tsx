import { For } from 'solid-js';
import { A } from '@solidjs/router';

const incentiveData = [
	{ url: 'https://www.iniciativa.ge/', img: 'images/footer/initiative_en.svg' },
	{ url: 'https://www.adjarabetawards.com/', img: 'images/footer/adjarabet_awards_en.svg' },
	{ url: 'http://martetamashi.ge/', img: 'images/footer/rule_your_games_en.svg' },
	{ url: 'https://www.adjarabetawards.com/', img: 'images/footer/moedani_en.svg' },
];

export const Incentives = () => {


	return <div class="_s_bt-primary-7 _s_bt-solid _s_bw-1 _s_flex _s_flex-a-center _s_flex-j-center _s_p-5 _s_size-w-percent--25">
		<For each={incentiveData}>
			{item => <div class="_s_pr-7">
				<A href={item.url}><img alt="name" loading="lazy" src={`https://newstatic.adjarabet.com/static/${item.img}`} /></A>
			</div>}
		</For>
	</div>;
};