import { withContentlayer } from "next-contentlayer2"

/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/documentation",
				destination: "/documentation/introduction",
				permanent: true,
			},
			{
				source: "/documentation/components",
				destination: "/documentation/components/accordion",
				permanent: true,
			},
			{
				source: "/components",
				destination: "/documentation/components/accordion",
				permanent: true,
			},
		]
	},
	async rewrites() {
		return [
			{
				source: "/ingest/static/:path*",
				destination: "https://us-assets.i.posthog.com/static/:path*",
			},
			{
				source: "/ingest/:path*",
				destination: "https://us.i.posthog.com/:path*",
			},
			{
				source: "/ingest/decide",
				destination: "https://us.i.posthog.com/decide",
			},
		]
	},
	assetPrefix: process.env.NEXT_PUBLIC_WEBSITE_URL,
	// Add transpilePackages to handle proper transpilation in monorepo
	// transpilePackages: ['contentlayer2', 'next-contentlayer2', 'mdx-bundler'],

	skipTrailingSlashRedirect: true,
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.pixabay.com",
				port: "",
				pathname: "/photo/**",
				search: "",
			},
		],
	},
	compiler: {
		removeConsole: false,
	},
	webpack(config) {
		// Grab the existing rule that handles SVG imports
		const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"))
		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
				use: ["@svgr/webpack"],
			}
		)
		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		fileLoaderRule.exclude = /\.svg$/i
		return config
	},
	env: {
		NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
		NEXT_PUBLIC_WEBAPP_URL: process.env.NEXT_PUBLIC_WEBAPP_URL,
		NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
		NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
	},
}
export default withContentlayer(nextConfig)
