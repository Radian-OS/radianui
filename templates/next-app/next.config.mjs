/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "radianui.com",
			},
			{
				protocol: "https",
				hostname: "dev.radianos.com",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
		],
	},
}

export default nextConfig
