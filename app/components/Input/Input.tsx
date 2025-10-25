'use client';

import { clsx } from '@/app/lib/style';

import classes from './Input.module.scss';

const Input = ({
	className,
	inputClassName,
	name,
	placeholder,
	value,
	onChange,
	onBlur,
	onFocus,
	autofocus,
	disabled
}: any) => {
	const props = {
		className: clsx(classes.Input, inputClassName),
		name: name,
		placeholder: placeholder || 'Type something..',
		value: value,
		onChange: (e: any) => onChange(e.target.value, name),
		onBlur: () => onBlur?.(name),
		onFocus: () => onFocus?.(name),
		disabled: disabled,
		autoFocus: autofocus
	};

	return (
		<div className={clsx(classes.Wrapper, className)}>
			<textarea {...props} />
		</div>
	);
};

export default Input;
