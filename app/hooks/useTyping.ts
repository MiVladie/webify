import { useState, useEffect } from 'react';
import { getRandomInt } from '@/app/lib/optimization';

interface Props {
	data: string[];
	active?: boolean;
	typingSpeed?: number;
	deletingSpeed?: number;
	beforePauseTime?: number;
	afterPauseTime?: number;
}

const useTyping = ({
	data,
	active = true,
	typingSpeed = 2,
	deletingSpeed = 3,
	beforePauseTime = 2,
	afterPauseTime = 1
}: Props) => {
	const [placeholder, setPlaceholder] = useState('');
	const [sentenceIndex, setSentenceIndex] = useState(getRandomInt(0, data.length - 1));
	const [charIndex, setCharIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const currentSentence = data[sentenceIndex];

		let timeout: NodeJS.Timeout;

		if (!active) {
			return;
		}

		if (!isDeleting && charIndex < currentSentence.length) {
			// Typing
			timeout = setTimeout(() => {
				setPlaceholder(currentSentence.slice(0, charIndex + 1));
				setCharIndex(charIndex + 1);
			}, 100 / typingSpeed);
		} else if (!isDeleting && charIndex === currentSentence.length) {
			// Pause after typing
			timeout = setTimeout(() => setIsDeleting(true), beforePauseTime * 1000);
		} else if (isDeleting && charIndex > 0) {
			// Deleting
			timeout = setTimeout(() => {
				setPlaceholder(currentSentence.slice(0, charIndex - 1));
				setCharIndex(charIndex - 1);
			}, 100 / deletingSpeed);
		} else if (isDeleting && charIndex === 0) {
			// Move to next sentence
			timeout = setTimeout(() => {
				setIsDeleting(false);
				setSentenceIndex(getRandomInt(0, data.length - 1));
			}, afterPauseTime * 1000);
		}

		return () => clearTimeout(timeout);
	}, [
		active,
		charIndex,
		isDeleting,
		sentenceIndex,
		data,
		typingSpeed,
		deletingSpeed,
		beforePauseTime,
		afterPauseTime
	]);

	useEffect(() => {
		if (!active) {
			setPlaceholder('');
			setSentenceIndex(getRandomInt(0, data.length - 1));
			setCharIndex(0);
			setIsDeleting(false);
		}
	}, [active]);

	return placeholder;
};

export default useTyping;
