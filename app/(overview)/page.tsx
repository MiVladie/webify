'use client';

import { useEffect, useState } from 'react';

import { PROMPT_PLACEHOLDER_IDEAS } from '@/lib/data';

import LightRays from '@/components/LightRays/LightRays';
import Chat, { PromptFields } from '@/containers/Chat/Chat';
import Generation from '@/containers/Generation/Generation';

import classes from './Page.module.scss';

export default function Home() {
	const [step, setStep] = useState<number>();

	useEffect(() => {
		if (step == undefined || step === PROMPT_PLACEHOLDER_IDEAS.length) {
			return;
		}

		const timeout = setTimeout(() => {
			setStep((prevStep) => (prevStep ?? 0) + 1);
		}, 5000);

		return () => clearTimeout(timeout);
	}, [step]);

	function handlePrompt({ prompt }: PromptFields) {
		console.log({ prompt });
	}

	function handleGenerate() {
		setStep(0);
	}

	function handleDisplay() {
		console.log('new website!');
	}

	return (
		<main className={classes.Home}>
			<LightRays
				className={classes.Background}
				raysOrigin='top-center'
				raysColor='#777777'
				raysSpeed={0.25}
				lightSpread={0.8}
				rayLength={2}
				mouseInfluence={0.05}
				noiseAmount={0.1}
				distortion={0.05}
				followMouse
			/>

			<Chat onPrompt={handlePrompt} onAnimationEnd={handleGenerate} className={classes.Chat} />

			<Generation step={step} onAnimationEnd={handleDisplay} />
		</main>
	);
}
