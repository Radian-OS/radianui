export const websiteMetadata = {
	name: "Radian",
	url: process.env.NEXT_PUBLIC_WEBSITE_URL!,
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
		"Radian", // Main brand
		"RadianUI", // CLI name
		"radianui", // CLI command (lowercase)
		"RadianOS", // Domain brand
		"Radianos", // Domain variation
	],
	ogImage: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/og/static-og.png`,
}
