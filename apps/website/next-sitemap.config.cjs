const isPublic = process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === "PROD"

module.exports = {
	siteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL,
	generateRobotsTxt: true,
	exclude: ["/api/*", "/blocks/*", "/themer", "/view/*"],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				disallow: isPublic ? "" : "/",
			},
		],
	},
}
