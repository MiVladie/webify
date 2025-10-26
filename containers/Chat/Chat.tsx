'use client';

import { useEffect, useState } from 'react';

import { clsx } from '@/lib/style';
import { PROMPT_PLACEHOLDER_IDEAS } from '@/lib/data';

import Form from '@/components/Form/Form';
import Input from '@/components/Input/Input';
import GradientText from '@/components/GradientText/GradientText';
import Knob from '@/components/Knob/Knob';
import useForm from '@/hooks/useForm';
import useTyping from '@/hooks/useTyping';

import Arrow from '@/public/icons/arrow.svg';

import classes from './Chat.module.scss';

export type PromptFields = {
	prompt: string;
};

interface Props {
	onPrompt?: (fields: PromptFields) => void;
	onAnimationEnd?: () => void;
	className?: string;
}

const Chat = ({ onPrompt, onAnimationEnd, className }: Props) => {
	const [prompted, setPrompted] = useState<boolean>(false);

	const { values, handleChange, handleFocus, handleBlur, handleSubmit } = useForm<PromptFields>({
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

	const placeholder = useTyping({ data: PROMPT_PLACEHOLDER_IDEAS, active: !values.prompt });

	function handlePrompt(fields: PromptFields) {
		setPrompted(true);

		onPrompt?.(fields);
	}

	useEffect(() => {
		if (!prompted) {
			return;
		}

		let timeout = setTimeout(() => onAnimationEnd?.(), 2500);

		return () => clearTimeout(timeout);
	}, [prompted]);

	return (
		<div className={clsx(classes.Chat, { [classes.ChatPrompted]: prompted }, className)}>
			<div className={clsx(classes.Wrapper, { [classes.WrapperPrompted]: prompted })}>
				<h1
					className={clsx(classes.Title, {
						[classes.TitleReady]: !prompted,
						[classes.TitlePrompted]: prompted
					})}>
					What are we&nbsp;
					<GradientText>building</GradientText>&nbsp;today?
				</h1>
			</div>

			<Form onSubmit={handleSubmit} className={classes.Form}>
				<Input
					name='prompt'
					placeholder={'A ' + placeholder}
					value={values.prompt}
					disabled={prompted}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					autofocus
					className={clsx({ [classes.InputReady]: !prompted, [classes.InputPrompted]: prompted })}
					suffix={<Knob icon={<Arrow />} onClick={handleSubmit} disabled={!values.prompt || prompted} />}
				/>
			</Form>
		</div>
	);
};

export default Chat;
