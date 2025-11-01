import type { Metadata } from 'next';

import { geist } from '@/lib/fonts';

import '@/styles/main.scss';

export const metadata: Metadata = {
	title: 'Webify',
	description: 'Create your dream website in minutes'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={geist.variable}>{children}</body>
		</html>
	);
}
