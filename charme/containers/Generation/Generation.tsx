import { useEffect, useState } from 'react';
import { PROMPT_LOADING_FEEDBACK } from '@/lib/data';
import { getRandomInt } from '@/lib/optimization';
import { clsx } from '@/lib/style';

import classes from './Generation.module.scss';

interface Props {
	prompt?: string;
	onData?: () => void;
	onAnimationEnd?: () => void;
	className?: string;
}

const randomIndex = getRandomInt(0, PROMPT_LOADING_FEEDBACK.length - 1);

const Generation = ({ prompt, onData, onAnimationEnd, className }: Props) => {
	const [step, setStep] = useState<number>(0);

	const [ready, setReady] = useState<boolean>(false);
	const [done, setDone] = useState<boolean>(false);

	const [index, setIndex] = useState<number>(0);

	useEffect(() => {
		if (prompt == undefined) {
			return;
		}

		const timeout1 = setTimeout(() => setStep(1), 5000);
		const timeout2 = setTimeout(() => setStep(2), 10000);
		const timeout3 = setTimeout(() => setStep(3), 15000);
		const timeout4 = setTimeout(() => setStep(4), 20000);
		const timeout5 = setTimeout(() => setStep(5), 25000);

		return () => {
			clearTimeout(timeout1);
			clearTimeout(timeout2);
			clearTimeout(timeout3);
			clearTimeout(timeout4);
			clearTimeout(timeout5);
		};
	}, [prompt]);

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
			onData?.();

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

	if (prompt == undefined || (!ready && !done)) {
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
