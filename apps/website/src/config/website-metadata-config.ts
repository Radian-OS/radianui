const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://radianui.com"

export const websiteMetadata = {
	name: "Radian UI",
	organizationName: "Radian OS",
	url: websiteUrl,
	xHandle: "@radian_os",
	keywords: [
		// Core technologies (for broad discovery)
		"React",
		"Next.js",
		"Tailwind CSS",
		"TypeScript",

		// Core value propositions (long-tail keywords)
		"React component library",
		"Tailwind CSS components",
		"Next.js UI components",
		"open source design system",
		"pre-made React blocks",
		"TypeScript UI library",
		"responsive component library",
		"accessible React components",
		"modern UI kit",

		// Brand, CLI & Domain
		// Main brand
		"RadianUI", // CLI name
		"radianui", // CLI command (lowercase)
	],
	ogImage: `${websiteUrl}/og/static-og.png`,
}
