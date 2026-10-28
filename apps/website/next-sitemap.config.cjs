const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://radianui.com"

const isPublic = process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === "PROD"

module.exports = {
	siteUrl,
	generateRobotsTxt: true,
	exclude: ["/api/*", "/blocks/*", "/themer", "/view/*"],
	// Resource detail pages can render on demand and be absent from prerender-manifest.
	// The image sitemap already discovers only the resource routes shipped in this build.
	additionalPaths: async (config) => {
		const xml = readFileSync(
			join(process.cwd(), "public/resources/image-sitemap.xml"),
			"utf8"
		)
		const paths = new Set(
			Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), ([, loc]) =>
				new URL(loc).pathname
			)
		)
		return Promise.all(
			Array.from(paths, (path) => config.transform(config, path))
		)
	},
	robotsTxtOptions: {
		additionalSitemaps: [`${siteUrl}/resources/image-sitemap.xml`],
		policies: [
			{
				userAgent: "*",
				disallow: isPublic ? "" : "/",
			},
		],
	},
}
const { readFileSync } = require("node:fs")
const { join } = require("node:path")

