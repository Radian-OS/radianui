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
						key: "Content-Security-Policy",
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://us-assets.i.posthog.com https://us.i.posthog.com https://analytics.ahrefs.com https://static.cloudflareinsights.com",
							"script-src-elem 'self' 'unsafe-inline' https://us-assets.i.posthog.com https://us.i.posthog.com https://analytics.ahrefs.com https://static.cloudflareinsights.com",
							"font-src 'self' data: https://fonts.gstatic.com",
							"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
							"img-src 'self' data: https: blob:",
							"connect-src 'self' https://us.i.posthog.com https://us-assets.i.posthog.com https://analytics.ahrefs.com https://cloudflareinsights.com",
							"frame-src 'self'",
							"object-src 'none'",
							"base-uri 'self'",
							"form-action 'self'",
							"frame-ancestors 'none'",
							"upgrade-insecure-requests",
						].join("; "),
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
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
	compress: false, // Let cloudflare handle the compression
}
export default withBundleAnalyzer(withContentlayer(nextConfig))
