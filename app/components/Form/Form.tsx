import React from 'react';

interface Props {
	children?: React.ReactNode;
	onSubmit?: () => void;
	className?: string;
}

const Form = ({ children, onSubmit, className }: Props) => {
	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		onSubmit?.();
	}

	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();

			onSubmit?.();
		}
	}

	return (
		<form className={className} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
			{children}
		</form>
	);
};

export default Form;
