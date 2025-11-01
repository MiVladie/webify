import { clsx } from '@/lib/style';

import classes from './Toggle.module.scss';

export interface Option {
	value: number;
	icon: React.ReactNode;
}

interface Props {
	options: Option[];
	value: number;
	onSelect?: (value: number) => void;
	className?: string;
}

const Toggle = ({ options, value, onSelect, className }: Props) => (
	<div className={clsx(classes.Toggle, className)}>
		{options.map((option) => (
			<div
				className={clsx(classes.Option, { [classes.Selected]: option.value === value })}
				onClick={() => onSelect?.(option.value)}
				role='button'
				key={option.value}>
				<i className={classes.Icon}>{option.icon}</i>
			</div>
		))}

		<div className={classes.Circle} style={{ left: options.findIndex((o) => o.value === value) * 50 }} />
	</div>
);

export default Toggle;
