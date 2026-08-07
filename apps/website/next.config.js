import bundleAnalyzer from "@next/bundle-analyzer"
import { withContentlayer } from "next-contentlayer2"

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
})

const LEGACY_DOCUMENTATION_ROUTES = {
	gettingStarted: ["changelog", "cli", "figma", "installation", "introduction"],
	installation: {
		laravel: "manual",
		manual: "manual",
		next: "next",
		vite: "vite",
	},
	fundamentals: {
		colors: "colors",
		"default-theme": "theme",
		iconography: "iconography",
		typography: "typography",
	},
	components: {
		accordion: "accordion",
		alert: "alert",
		avatar: "avatar",
		badge: "badge",
		banner: "banner",
		breadcrumb: "breadcrumb",
		buttons: "button",
		calendar: "calendar",
		checkbox: "checkbox",
		"code-area": "code-area",
		"currency-amount": "currency-input",
		"date-picker": "date-picker",
		divider: "divider",
		drawer: "drawer",
		dropdown: "dropdown",
		"file-upload": "file-upload",
		forms: "form",
		"hover-card": "hover-card",
		"input-otp": "otp-field",
		inputs: "input",
		modal: "dialog",
		pagination: "pagination",
		"phone-number": "phone-number-input",
		popover: "popover",
		"progress-bar": "progress",
		"radio-group": "radio-group",
		resizable: "resizable",
		select: "select",
		skeleton: "skeleton",
		slider: "slider",
		spinner: "spinner",
		switch: "switch",
		table: "table",
		tabs: "tabs",
		"text-area": "text-area",
		toast: "sonner",
		tooltip: "tooltip",
	},
}

const legacyDocumentationRedirects = [
	...LEGACY_DOCUMENTATION_ROUTES.gettingStarted.map((slug) => ({
		source: `/documentation/${slug}`,
		destination: `/docs/getting-started/${slug}`,
		permanent: true,
	})),
	...Object.entries(LEGACY_DOCUMENTATION_ROUTES.installation).map(
		([sourceSlug, destinationSlug]) => ({
			source: `/documentation/installation/${sourceSlug}`,
			destination: `/docs/installation/${destinationSlug}`,
			permanent: true,
		})
	),
	...Object.entries(LEGACY_DOCUMENTATION_ROUTES.fundamentals).map(
		([sourceSlug, destinationSlug]) => ({
			source: `/documentation/${sourceSlug}`,
			destination: `/docs/fundamentals/${destinationSlug}`,
			permanent: true,
		})
	),
	...Object.entries(LEGACY_DOCUMENTATION_ROUTES.components).map(
		([sourceSlug, destinationSlug]) => ({
			source: `/documentation/components/${sourceSlug}`,
			destination: `/docs/components/${destinationSlug}`,
			permanent: true,
		})
	),
]

const nextConfig = {
	async headers() {
		return [
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
				source: "/documentation/components",
				destination: "/docs/components/accordion",
				permanent: true,
			},
			...legacyDocumentationRedirects,
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
export default withBundleAnalyzer(withContentlayer(nextConfig))
