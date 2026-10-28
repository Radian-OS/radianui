interface ResourceItem {
	title: string
	description: string
	comingSoon?: boolean
	lightUrl: string
	darkUrl: string
	link?: string
}

export const resources: ResourceItem[] = [
	{
		title: "UI Avatars",
		description:
			"Create and personalize user pictures for your interface designs.",
		comingSoon: false,
		lightUrl: "/media/assets-page/avatars-light.png",
		darkUrl: "/media/assets-page/avatars-dark.png",
		link: "avatar",
	},
	{
		title: "Country Flags",
		description:
			"Over 250 flags from different nations in rectangular and circular shapes.",
		comingSoon: false,
		lightUrl: "/media/assets-page/flags-light.png",
		darkUrl: "/media/assets-page/flags-dark.png",
		link: "flags",
	},
	{
		title: "Emojis",
		description:
			"Browse 1,900+ Unicode emojis with copy-ready text and code snippets.",
		comingSoon: false,
		lightUrl: "/media/assets-page/emojis-light.png",
		darkUrl: "/media/assets-page/emojis-dark.png",
		link: "emoji",
	},
	{
		title: "Popular Brand Logos",
		description:
			"Brand icons and wordmarks in SVG, with PNG export and light and dark variants.",
		comingSoon: true,
		lightUrl: "/media/assets-page/popular-brands-light.png",
		darkUrl: "/media/assets-page/popular-brands-dark.png",
	},
	{
		title: "Credit Cards",
		description:
			"Top credit card logos offered in light and dark color schemes.",
		comingSoon: true,
		lightUrl: "/media/assets-page/credit-cards-light.png",
		darkUrl: "/media/assets-page/credit-cards-dark.png",
	},
	{
		title: "File Format Icons",
		description:
			"More than 20 common file type icons, each with three design options.",
		comingSoon: true,
		lightUrl: "/media/assets-page/files-light.png",
		darkUrl: "/media/assets-page/files-dark.png",
	},
	{
		title: "Logo Generator",
		description:
			"Design your own logo using customizable simple shapes and colors.",
		comingSoon: true,
		lightUrl: "/media/assets-page/logos-light.png",
		darkUrl: "/media/assets-page/logos-dark.png",
	},
	{
		title: "Realistic Credit Card",
		description:
			"A realistic credit card design featuring a sleek, modern aesthetic.",
		comingSoon: true,
		lightUrl: "/media/assets-page/union-pay-light.png",
		darkUrl: "/media/assets-page/union-pay-dark.png",
	},
]
