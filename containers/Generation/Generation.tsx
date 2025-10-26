import { useEffect, useState } from 'react';
import { PROMPT_LOADING_FEEDBACK } from '@/lib/constants';
import { getRandomInt } from '@/lib/optimization';
import { clsx } from '@/lib/style';

import classes from './Generation.module.scss';

interface Props {
	step?: number;
	onAnimationEnd?: () => void;
	className?: string;
}

const randomIndex = getRandomInt(0, PROMPT_LOADING_FEEDBACK.length - 1);

const Generation = ({ step, onAnimationEnd, className }: Props) => {
	const [ready, setReady] = useState<boolean>(false);
	const [done, setDone] = useState<boolean>(false);

	const [index, setIndex] = useState<number>(0);

	useEffect(() => {
		if (step == undefined) {
			return;
		}

		// Initial pop up
		if (step === 0) {
			const timeout = setTimeout(() => {
				setReady(true);
			}, 500);

			return () => clearTimeout(timeout);
		}

		// Pop out & pop in after delay
		setDone(true);

		// Last pop up
		if (step === PROMPT_LOADING_FEEDBACK[randomIndex].length) {
			const timeout = setTimeout(() => {
				onAnimationEnd?.();
			}, 1500);

			return () => clearTimeout(timeout);
		}

		const timeout = setTimeout(() => {
			setDone(false);
			setReady(true);

			setIndex((prevIndex) => prevIndex + 1);
		}, 1500);

		return () => clearTimeout(timeout);
	}, [step]);

	if (step == undefined || (!ready && !done)) {
		return null;
	}

	return (
		<div className={clsx(classes.Generation, { [classes.GenerationDone]: done }, className)}>
			<h1 className={clsx(classes.Title, { [classes.TitleReady]: ready, [classes.TitleDone]: done })}>
				{PROMPT_LOADING_FEEDBACK[randomIndex][index]}
			</h1>
		</div>
	);
};

export default Generation;
