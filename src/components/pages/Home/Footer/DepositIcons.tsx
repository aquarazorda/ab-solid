import { createResource, For } from 'solid-js';

const fetchDepositIcons = async () => await (await fetch('https://newstatic.adjarabet.com/static/depositIconsNewGEO.json?v=1677603562102')).json();

export const DepositIcons = () => {
	const [depositIcons] = createResource(fetchDepositIcons);

	return <div class="_s_container _s_flex _s_flex-a-center _s_flex-j-center _s_size-w-percent--25">
		<div class="_s_flex _s_flex-a-center _s_flex-j-center _s_pb-7 _s_pt-7 _s_size-h-px--20 _s_size-w-percent--25 deposite">
			<For each={depositIcons()?.list}>
				{item => <div class="_s_flex-a-center _s_flex _s_ml-2 _s_mr-2">
					<img alt="paymentIcon" src={item.img} loading="lazy" />
				</div>}
			</For>
		</div>
	</div>;
};