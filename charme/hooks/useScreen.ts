import { useEffect, useState } from 'react';

const useScreen = () => {
	const [width, setWidth] = useState<number>(typeof window === 'undefined' ? 0 : window.innerWidth);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		function handleResize() {
			setWidth(window.innerWidth);
		}

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return {
		isMobile: width < 1280,
		width
	};
};

export default useScreen;
