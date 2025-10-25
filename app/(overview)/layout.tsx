import type { Metadata } from 'next';

import { geist } from '@/app/lib/fonts';

import '@/app/styles/main.scss';

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
