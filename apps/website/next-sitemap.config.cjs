/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL,
	generateRobotsTxt: true,
	...(process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === "DEV" && {
		robotsTxtOptions: {
			policies: [
				{
					userAgent: "*",
					disallow: "/",
				},
			],
		},
	}),
}
