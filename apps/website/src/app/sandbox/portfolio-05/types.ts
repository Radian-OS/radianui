export type NavTab = "about" | "resume" | "portfolio" | "blog" | "contact"

export interface ContactInfo {
	label: string
	value: string
	iconName: "mail" | "phone" | "calendar" | "map-pin"
	href?: string
}

export interface ServiceItem {
	id: string
	title: string
	description: string
	iconName: "design" | "dev" | "mobile" | "camera"
}

export interface TestimonialItem {
	id: string
	name: string
	avatarUrl: string
	content: string
}

export interface ClientItem {
	id: string
	name: string
	subtitle: string
}

export const CONTACT_ITEMS: ContactInfo[] = [
	{
		label: "EMAIL",
		value: "richard@example.com",
		iconName: "mail",
		href: "mailto:richard@example.com",
	},
	{
		label: "PHONE",
		value: "+1 (213) 352-2795",
		iconName: "phone",
		href: "tel:+12133522795",
	},
	{
		label: "BIRTHDAY",
		value: "June 23, 1982",
		iconName: "calendar",
	},
	{
		label: "LOCATION",
		value: "Sacramento, California, USA",
		iconName: "map-pin",
	},
]

export const SERVICES: ServiceItem[] = [
	{
		id: "design",
		title: "Web Design",
		description:
			"The most modern and high-quality design made at a professional level.",
		iconName: "design",
	},
	{
		id: "dev",
		title: "Web Development",
		description: "High-quality development of sites at the professional level.",
		iconName: "dev",
	},
	{
		id: "mobile",
		title: "Mobile Apps",
		description:
			"Professional development of applications for iOS and Android.",
		iconName: "mobile",
	},
	{
		id: "camera",
		title: "Photography",
		description:
			"I make high-quality photos of any category at a professional level.",
		iconName: "camera",
	},
]

export const TESTIMONIALS: TestimonialItem[] = [
	{
		id: "daniel",
		name: "Daniel Lewis",
		avatarUrl: "/sandbox/placeholder.svg",
		content:
			"Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of client.",
	},
	{
		id: "jessica",
		name: "Jessica Miller",
		avatarUrl: "/sandbox/placeholder.svg",
		content:
			"Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of client.",
	},
]

export const CLIENTS: ClientItem[] = [
	{
		id: "ransom",
		name: "RANSOM & WILDER",
		subtitle: "Top Quality Interior Design",
	},
	{
		id: "bigenough",
		name: "BIG ENOUGH",
		subtitle: "Live Your Life",
	},
	{
		id: "cara",
		name: "CARA INDOORS",
		subtitle: "Unique Furniture Design",
	},
	{
		id: "authentic",
		name: "AUTHENTIC",
		subtitle: "Collection Regular Fit",
	},
]

export const NAV_TABS: { id: NavTab; label: string }[] = [
	{ id: "about", label: "About" },
	{ id: "resume", label: "Resume" },
	{ id: "portfolio", label: "Portfolio" },
	{ id: "blog", label: "Blog" },
	{ id: "contact", label: "Contact" },
]
