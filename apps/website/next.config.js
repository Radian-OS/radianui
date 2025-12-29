import bundleAnalyzer from "@next/bundle-analyzer"
import { withContentlayer } from "next-contentlayer2"

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
})

const nextConfig = {
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Cache-Control",
						value: "public, max-age=2592000, s-maxage=5184000, stale-while-revalidate=59",
					},
				],
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
	async redirects() {
		return [
			{
				source: "/documentation",
				destination: "/docs/getting-started/introduction",
				permanent: true,
			},
			{
				source: "/docs/components",
				destination: "/docs/components/accordion",
				permanent: true,
			},
			{
				source: "/components",
				destination: "/docs/components/accordion",
				permanent: true,
			},
		]
	},
	skipTrailingSlashRedirect: true,
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	images: {
		minimumCacheTTL: 86400,
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
	env: {
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
	},
	experimental: {
		optimizePackageImports: ["lucide-react"],
	},
	compress: false,
}
export default withBundleAnalyzer(withContentlayer(nextConfig))
