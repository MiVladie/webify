'use client';

import { useState } from 'react';
import { PROMPT_PLACEHOLDER_IDEAS } from '@/lib/constants';

import LightRays from '@/components/LightRays/LightRays';
import GradientText from '@/components/GradientText/GradientText';
import Input from '@/components/Input/Input';
import Form from '@/components/Form/Form';
import useForm from '@/hooks/useForm';
import useTyping from '@/hooks/useTyping';

import classes from './Page.module.scss';

export type PromptFields = {
	prompt: string;
};

export default function Home() {
	const [loading, setLoading] = useState<boolean>(false);
	const [ready, setReady] = useState<boolean>(true);

	const { values, errors, handleChange, handleFocus, handleBlur, handleSubmit, handleReset } = useForm<PromptFields>({
		initialValues: {
			prompt: ''
		},
		rules: {
			prompt: {
				required: true
			}
		},
		onSubmit: handlePrompt
	});

	const placeholder = useTyping({ data: PROMPT_PLACEHOLDER_IDEAS, active: !values.prompt && ready });

	function handlePrompt({ prompt }: PromptFields) {
		console.log({ prompt });

		handleReset();
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

			<div className={classes.Chat}>
				<div className={classes.Wrapper}>
					<h1 className={classes.Title}>
						What are we&nbsp;
						<GradientText>{' building '}</GradientText>&nbsp;today?
					</h1>
				</div>

				<Form onSubmit={handleSubmit} className={classes.Form}>
					<Input
						name='prompt'
						placeholder={'A ' + placeholder}
						value={values.prompt}
						disabled={loading}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						error={errors.prompt}
						autofocus
						className={classes.Input}
					/>
				</Form>
			</div>
		</main>
	);
}
