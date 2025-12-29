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
					// Referrer Policy - controls what info is sent when users click external links
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					// HSTS - forces HTTPS, prevents downgrade attacks
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains",
					},
					// Prevents MIME type sniffing
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					// Prevents your site from being embedded in iframes (clickjacking protection)
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					// XSS Protection (legacy but still good to have)
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					// CSP - Balanced security without breaking functionality
					// Loose enough for real-world use, tight enough to pass SEO audits
					{
						key: "Content-Security-Policy",
						value: [
							"default-src 'self' https:",
							// Scripts: allow inline + eval (Next.js, PostHog, analytics need this)
							"script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
							// Styles: allow inline (Tailwind, styled-components need this)
							"style-src 'self' 'unsafe-inline' https:",
							// Images: allow everything (CDNs, remote images, data URIs)
							"img-src 'self' data: blob: https:",
							// Fonts: allow everything
							"font-src 'self' data: https:",
							// AJAX/WebSockets: allow all HTTPS (PostHog, APIs, CDNs)
							"connect-src 'self' https: wss:",
							// Frames: allow HTTPS iframes (for embeds like YouTube, Loom, etc.)
							"frame-src 'self' https:",
							// Media: allow all HTTPS
							"media-src 'self' https:",
							// Objects: block plugins (Flash, Java)
							"object-src 'none'",
							// Base URI: lock down to prevent injection
							"base-uri 'self'",
							// Form actions: allow your domain + HTTPS (for external form submissions if needed)
							"form-action 'self' https:",
						].join("; "),
					},
					// Permissions Policy - controls browser features
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
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
}
export default withBundleAnalyzer(withContentlayer(nextConfig))
