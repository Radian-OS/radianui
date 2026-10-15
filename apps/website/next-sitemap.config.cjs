const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://radianui.com"

const isPublic = process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === "PROD"

module.exports = {
	siteUrl,
	generateRobotsTxt: true,
	exclude: ["/api/*", "/blocks/*", "/themer", "/view/*"],
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
