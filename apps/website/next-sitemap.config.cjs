const isPublic = process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === "PROD"

module.exports = {
	siteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL,
	generateRobotsTxt: true,
	exclude: ["/api/*", "/blocks/*", "/themer", "/view/*"],
	additionalPaths: async () => {
		const { default: emojiGroups } = await import(
			"unicode-emoji-json/data-by-group.json",
			{ with: { type: "json" } }
		)

		return emojiGroups.flatMap((group) =>
			group.emojis.map((emoji) => ({
				loc: `/resources/emoji/${emoji.slug}`,
			}))
		)
	},
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				disallow: isPublic ? "" : "/",
			},
		],
	},
}
