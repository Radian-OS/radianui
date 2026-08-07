import { createMDX } from "fumadocs-mdx/next"

/** @type {import('next').NextConfig} */
const withBundleAnalyzer =
	process.env.ANALYZE === "true"
		? (await import("@next/bundle-analyzer")).default({ enabled: true })
		: (config) => config

const nextConfig = {
	async headers() {
		const headers = [
			{
				source: "/_next/static/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/:path*.(svg|ico|png|jpg|jpeg|webp|woff|woff2)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/static/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=2592000, immutable",
					},
				],
			},
			{
				source: "/blocks/:path*",
				headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
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

		// Cache-Control is useful in production but breaks Next's dev cache/HMR
		// behavior. Keep security and CORS headers active in both environments.
		return process.env.NODE_ENV === "production"
			? headers
			: headers
					.map((route) => ({
						...route,
						headers: route.headers.filter(
							(header) => header.key !== "Cache-Control"
						),
					}))
					.filter((route) => route.headers.length > 0)
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
		minimumCacheTTL: 864000,
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
				hostname: "cdn.jsdelivr.net",
				pathname: "/gh/Radian-os/**",
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
	experimental: {
		optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
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
const withMDX = createMDX()
export default withBundleAnalyzer(withMDX(nextConfig))
