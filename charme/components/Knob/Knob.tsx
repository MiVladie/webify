'use client';

import { useEffect, useState } from 'react';
import { clsx } from '@/lib/style';

import classes from './Knob.module.scss';

interface Props {
	icon: React.ReactNode;
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
}

const Knob = ({ icon, disabled, onClick, className }: Props) => {
	const [clicked, setClicked] = useState<boolean>(false);

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		if (clicked && !disabled) {
			timeout = setTimeout(() => {
				setClicked(false);
			}, 500);
		}

		return () => clearTimeout(timeout);
	}, [clicked, disabled]);

	function handleClick() {
		if (disabled) {
			return;
		}

		setClicked(true);

		onClick?.();
	}

	return (
		<div
			className={clsx(classes.Knob, { [classes.Disabled]: !!disabled }, className)}
			onClick={handleClick}
			role='button'>
			<i
				className={clsx(classes.Icon, {
					[classes.IconReady]: !clicked,
					[classes.IconClicked]: clicked
				})}>
				{icon}
			</i>
		</div>
	);
};

export default Knob;
