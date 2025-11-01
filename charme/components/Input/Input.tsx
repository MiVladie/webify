'use client';

import { clsx } from '@/lib/style';

import classes from './Input.module.scss';

interface Props<T> {
	name: T;
	placeholder?: string;
	value?: string;
	onChange?: (value: string, name: T) => void;
	onBlur?: (name: T) => void;
	onFocus?: (name: T) => void;
	autofocus?: boolean;
	disabled?: boolean;
	suffix?: React.ReactNode;
	className?: string;
	inputClassName?: string;
}

const Input = <T extends string | undefined>({
	name,
	placeholder,
	value,
	onChange,
	onBlur,
	onFocus,
	autofocus,
	disabled,
	suffix,
	className,
	inputClassName
}: Props<T>) => {
	const props = {
		className: clsx(classes.Input, inputClassName),
		name: name,
		placeholder: placeholder || 'Type something..',
		value: value,
		onChange: (e: any) => onChange?.(e.target.value, name),
		onBlur: () => onBlur?.(name),
		onFocus: () => onFocus?.(name),
		disabled: disabled,
		autoFocus: autofocus
	};

	return (
		<div className={clsx(classes.Wrapper, { [classes.Disabled]: !!disabled }, className)}>
			<textarea {...props} />

			{suffix && <div className={classes.Suffix}>{suffix}</div>}
		</div>
	);
};

export default Input;
