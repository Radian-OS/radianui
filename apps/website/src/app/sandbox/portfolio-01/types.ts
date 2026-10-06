export interface NavItem {
	label: string
	href: string
}

export interface SocialLink {
	name: string
	url: string
	domain: string
}

export interface FeaturedProject {
	id: string
	number: string
	title: string
	description: string
	tags: string[]
	liveUrl: string
	githubUrl: string
	imageSrc: string
	reverseLayout?: boolean
}

export interface NoteworthyProject {
	id: string
	title: string
	description: string
	tags: string[]
	liveUrl: string
	githubUrl: string
	imageSrc: string
}

export const NAV_ITEMS: NavItem[] = [
	{ label: "About", href: "#about" },
	{ label: "Skills", href: "#skills" },
	{ label: "Projects", href: "#projects" },
	{ label: "Contact", href: "#contact" },
]

export const SOCIAL_LINKS: SocialLink[] = [
	{ name: "Twitter", url: "https://twitter.com", domain: "x.com" },
	{ name: "LinkedIn", url: "https://linkedin.com", domain: "linkedin.com" },
	{ name: "GitHub", url: "https://github.com", domain: "github.com" },
]

export const SKILLS_LIST = [
	"HTML & CSS",
	"Tailwind CSS",
	"SCSS",
	"Javascript (ES6+)",
	"Typescript",
	"React Js",
	"Styled Component",
	"Next Js",
	"Svelte/SvelteKit",
	"Git",
	"React Native",
]

export const FEATURED_PROJECTS: FeaturedProject[] = [
	{
		id: "lavidluxe",
		number: "01",
		title: "Lavidluxe Clothings",
		description:
			"An ecommerce store for Lavidluxe clothings. Lavidluxe is a premium bespoke and ready-to-wear brand that provides high-quality yet affordable female and male wears, hoodies and joggers co-ord sets, luxury handmade unisex footwear and bags.",
		tags: [
			"Next Js",
			"Tailwind CSS",
			"Tanstack Query",
			"Sanity CMS",
			"Paystack",
			"Nodemailer",
			"Zustand and jotai",
		],
		liveUrl: "#",
		githubUrl: "#",
		imageSrc: "/sandbox/placeholder.svg",
		reverseLayout: false,
	},
	{
		id: "the-movieflix",
		number: "02",
		title: "The MovieFlix",
		description:
			"View trending, popular etc movies/tv series before deciding on what to watch 😜 . With similar & recommended movies/tv series, you can add movies to your wishlist.",
		tags: [
			"React Js",
			"SWR (useSWR)",
			"Context Api (useContext)",
			"Firebase",
			"React Hook Form",
			"Framer Motion",
		],
		liveUrl: "#",
		githubUrl: "#",
		imageSrc: "/sandbox/placeholder.svg",
		reverseLayout: true,
	},
	{
		id: "ip-address-tracker",
		number: "03",
		title: "IP Address Tracker",
		description:
			"Track any Ip address in the world and view their current location, where the Ip was registered, timezone, and isp. It also indicates the current location of the Ip Address on a map.",
		tags: ["HTML", "CSS", "Javascript", "Chart js", "Leaflet js"],
		liveUrl: "#",
		githubUrl: "#",
		imageSrc: "/sandbox/placeholder.svg",
		reverseLayout: false,
	},
]

export const NOTEWORTHY_PROJECTS: NoteworthyProject[] = [
	{
		id: "rest-countries",
		title: "Rest Countries App",
		description:
			"Displays all the countries in the world, their population, region and capital. Search for any country and filter based on region with dark mode",
		tags: ["Svelte/SvelteKit", "Tailwind CSS"],
		liveUrl: "#",
		githubUrl: "#",
		imageSrc: "/sandbox/placeholder.svg",
	},
	{
		id: "joke-web-bot",
		title: "Joke Web Bot",
		description:
			"Web bot searches for jokes on the internet by clicking on 'get a joke button' and reads out the joke to you using the 'speechsynthesis api'.",
		tags: ["React js"],
		liveUrl: "#",
		githubUrl: "#",
		imageSrc: "/sandbox/placeholder.svg",
	},
]
