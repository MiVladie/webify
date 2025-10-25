import { ReactNode } from 'react';

import { clsx } from '@/lib/style';

import classes from './GradientText.module.scss';

interface GradientTextProps {
	children: ReactNode;
	className?: string;
	colors?: string[];
	animationSpeed?: number;
	showBorder?: boolean;
}

export default function GradientText({
	children,
	className = '',
	colors = ['#6a0dad', '#9b59b6', '#d291bc', '#7f5fc5', '#6a0dad'],
	animationSpeed = 8,
	showBorder = false
}: GradientTextProps) {
	const gradientStyle = {
		backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
		animationDuration: `${animationSpeed}s`
	};

	return (
		<div className={clsx(classes.Text, className)} style={{ display: 'inline-block' }}>
			{showBorder && <div className={classes.Overlay} style={gradientStyle}></div>}

			<span className={classes.Content} style={gradientStyle}>
				{children}
			</span>
		</div>
	);
}
