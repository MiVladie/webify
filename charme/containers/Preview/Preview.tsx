'use client';

import React, { useState, useEffect } from 'react';

import { clsx } from '@/lib/style';

import Toggle, { Option } from '@/components/Toggle/Toggle';
import useScreen from '@/hooks/useScreen';

import Mobile from '@/public/icons/mobile.svg';
import Desktop from '@/public/icons/desktop.svg';

import classes from './Preview.module.scss';

const DEVICE_OPTIONS: Option[] = [
	{
		value: 1,
		icon: <Mobile />
	},
	{
		value: 2,
		icon: <Desktop />
	}
];

interface Props {
	children?: React.ReactNode;
	className?: string;
}

const Preview = ({ children, className }: Props) => {
	const [device, setDevice] = useState<number>();

	const { isMobile } = useScreen();

	useEffect(() => {
		setDevice(isMobile ? 1 : 2);
	}, []);

	function handleDevice(value: number) {
		setDevice(value);
	}

	return (
		<div className={clsx(classes.Preview, className)}>
			<div className={clsx(classes.Device, device === 1 ? classes.Mobile : classes.Desktop, className)}>
				{children}
			</div>

			<div className={classes.Controls}>
				<Toggle options={DEVICE_OPTIONS} value={device!} onSelect={handleDevice} className={classes.Devices} />
			</div>
		</div>
	);
};

export default Preview;
