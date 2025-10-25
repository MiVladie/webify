'use client';

import { clsx } from '@/lib/style';

import classes from './Knob.module.scss';

interface Props {
	icon: React.ReactNode;
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
}

const Knob = ({ icon, disabled, onClick, className }: Props) => (
	<div
		className={clsx(classes.Knob, { [classes.Disabled]: !!disabled }, className)}
		onClick={() => (!disabled ? onClick?.() : null)}
		role='button'>
		<i className={classes.Icon}>{icon}</i>
	</div>
);

export default Knob;
