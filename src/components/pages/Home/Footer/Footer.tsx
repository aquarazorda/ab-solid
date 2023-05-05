import { DepositIcons } from './DepositIcons';
import { Incentives } from './Incentives';
import { InfoArea } from './InfoArea';


export const Footer = () => {
	

	return <div class="_s_z-2">
		<div class="_s_position-relative _s_z-3 _s_color-bg-primary-6">
			<DepositIcons />
			<Incentives />
			<InfoArea /> 
		</div>
	</div>;
};