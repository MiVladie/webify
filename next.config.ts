import type { NextConfig } from 'next';

import { NAME, PROD } from '@/lib/constants';

const nextConfig: NextConfig = {
	reactCompiler: true,
	output: 'export',
	basePath: PROD ? `/${NAME}` : '',
	assetPrefix: '',
	sassOptions: {
		includePaths: ['@/styles']
	}
};

export default nextConfig;
