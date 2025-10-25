import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'webify';

const nextConfig: NextConfig = {
	reactCompiler: true,
	output: 'export',
	basePath: isProd ? `/${repoName}` : '',
	assetPrefix: isProd ? `/${repoName}/` : ''
};

export default nextConfig;
