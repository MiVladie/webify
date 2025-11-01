'use client';

import { useState } from 'react';

import { clsx } from '@/lib/style';

import LightRays from '@/components/LightRays/LightRays';
import LiquidEther from '@/components/LiquidEther/LiquidEther';
import Silk from '@/components/Silk/Silk';
import Chat, { PromptFields } from '@/containers/Chat/Chat';
import Generation from '@/containers/Generation/Generation';
import Preview from '@/containers/Preview/Preview';

import classes from './Page.module.scss';

export default function Home() {
	const [step, setStep] = useState<number>(0);

	const [prompt, setPrompt] = useState<string>();
	const [data, setData] = useState<any>(false);

	function handlePrompt({ prompt }: PromptFields) {
		setPrompt(prompt);

		setStep(1);
	}

	function handleGenerate() {
		setStep(2);
	}

	function handleData() {
		setData('abc');

		setStep(3);
	}

	function handlePreview() {
		setStep(4);
	}

	return (
		<main className={classes.Home}>
			{step < 2 && (
				<>
					<LightRays
						className={clsx(classes.Background, step === 0 ? classes.Ready : classes.DoneDelay)}
						raysOrigin='top-center'
						raysColor='#777777'
						raysSpeed={0.25}
						lightSpread={0.8}
						rayLength={4}
						mouseInfluence={0.05}
						noiseAmount={0.1}
						distortion={0.05}
						followMouse
					/>

					<Chat onPrompt={handlePrompt} onAnimationEnd={handleGenerate} className={classes.Focus} />
				</>
			)}

			{step >= 2 && step < 4 && (
				<>
					<LiquidEther
						className={clsx(classes.Background, step === 2 ? classes.Ready : classes.Done)}
						cursorSize={150}
						iterationsPoisson={8}
					/>

					<Generation
						prompt={prompt}
						onData={handleData}
						onAnimationEnd={handlePreview}
						className={classes.Focus}
					/>
				</>
			)}

			{step >= 4 && (
				<>
					<Silk className={clsx(classes.Background, classes.Ready)} speed={5} color='#100614' />

					<Preview className={classes.Focus} />
				</>
			)}
		</main>
	);
}
