import { For } from 'solid-js';
import { A } from '@solidjs/router';

const infoData = [
	{title: 'ჩვენს შესახებ', url: 'javascript:void(0)'},
	{title: 'წესები', url: 'javascript:void(0)'},
	{title: 'გადახდის მეთოდები', url: 'javascript:void(0)'},
	{title: 'კონფიდენციალურობა', url: 'javascript:void(0)'},
	{title: 'კონტაქტი', url: 'javascript:void(0)'},
	{title: 'ხშირად დასმული კითხვები', url: 'javascript:void(0)'},
	{title: 'სალაროები', url: 'javascript:void(0)'},
];

export const InfoArea = () => {

	return <div class="_s_bd-primary-7 _s_bd-solid _s_bt-primary-7 _s_bt-solid _s_bw-1 _s_flex _s_flex-a-center _s_flex-j-center _s_p-5">
		<For each={infoData}>
			{item => <div class="_s_flex _s_flex-a-center _s_flex-d-column _s_pb-1 _s_pl-2 _s_pr-2 _s_pt-1">
				<A href="/" class="_s_color-primary-8">
					<span class="_s_aitem-color-primary-1 _s_label _s_color-primary-8 _s_label-a-center _s_flex-j-center _s_label-sm _s_white-space-nowrap">{item.title}</span>
				</A>
			</div>}
		</For>
	</div>;
};