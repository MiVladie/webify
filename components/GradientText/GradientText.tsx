import { ReactNode } from 'react';

import { clsx } from '@/lib/style';

import classes from './GradientText.module.scss';

interface GradientTextProps {
	children: ReactNode;
	className?: string;
}

const GradientText = ({ children, className }: GradientTextProps) => (
	<span className={clsx(classes.Content, className)}>{children}</span>
);

export default GradientText;
