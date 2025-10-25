import type { NextConfig } from 'next';

import { NAME, PROD } from '@/lib/constants';

const nextConfig: NextConfig = {
	reactCompiler: true,
	output: 'export',
	basePath: PROD ? `/${NAME}` : '',
	assetPrefix: '',
	sassOptions: {
		includePaths: ['@/styles']
	},
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js'
			}
		}
	}
};

export default nextConfig;
