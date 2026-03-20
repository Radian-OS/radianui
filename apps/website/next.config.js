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
				source: "/_next/static/:path*", // Static assets (JS, CSS, images)
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=2592000, immutable",
					},
				],
			},
			{
				source: "/docs/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/:path*", // HTML pages and other
				headers: [
					// {
					// 	key: "Referrer-Policy",
					// 	value: "strict-origin-when-cross-origin",
					// },
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
					// {
					// 	key: "X-Content-Type-Options",
					// 	value: "nosniff",
					// },
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
					{
						key: "Cache-Control",
						value: "public, max-age=60, stale-while-revalidate=30",
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
			{
				source: "/figma",
				destination: "/docs/getting-started/figma",
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
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "www.google.com",
				pathname: "/s2/favicons/**",
			},
			{
				protocol: "https",
				hostname: "authjs.dev",
				pathname: "/img/providers/**",
			},
			{
				protocol: "https",
				hostname: "cdn.jsdelivr.net",
				pathname: "/gh/devicons/**",
			},
			{
				protocol: "https",
				hostname: "radianos.com",
			},
			{
				protocol: "https",
				hostname: "images.pexels.com",
			},
			{
				protocol: "https",
				hostname: "img.freepik.com",
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
	compress: false, // Let cloudflare handle the compression,
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				fs: false,
				path: false,
			}
		}
		return config
	},
}
export default withBundleAnalyzer(withContentlayer(nextConfig))
