export interface TimelineItem {
	year: string
	highlight?: string
	description: string
}

export interface BlogPost {
	id: string
	title: string
	date: string
	tags: string[]
	iconType: "lightning" | "doc" | "disk"
}

export interface ShelfItem {
	id: string
	title: string
	count: number
	description: string
}

export interface SeriesItem {
	id: string
	title: string
	description: string
	iconType: "js" | "dom" | "wordpress" | "review" | "redesign"
}

export interface ProjectItem {
	id: string
	year: string
	title: string
	description: string
	articleUrl?: string
	demoUrl?: string
	sourceUrl?: string
}

export const TIMELINE_ITEMS: TimelineItem[] = [
	{
		year: "1998–2006",
		description:
			"Geocities kid, forum-goer, gamer, lover of obscure '80s bands.",
	},
	{
		year: "2007–2014",
		highlight: "Professional chef",
		description:
			"Culinary degree, 60-hour weeks in Chicago kitchens, line cook to chef-manager by 22.",
	},
	{
		year: "2014–2020",
		highlight: "Career change",
		description:
			"Unpaid intern by day, cook by night, then junior dev to senior engineer. Wrote everything down along the way.",
	},
	{
		year: "2021–now",
		highlight: "Principal software engineer",
		description:
			"Building design systems, setting technical direction, shipping features, and still documenting: 177 posts, 40+ publications, and 20,000+ stars on GitHub.",
	},
]

export const LATEST_POSTS: BlogPost[] = [
	{
		id: "echarts-react",
		title: "Enabling Apache ECharts in React for Data Visualization",
		date: "March 31",
		tags: ["#javascript", "#react", "#data-visualization"],
		iconType: "lightning",
	},
	{
		id: "year-in-review-2024",
		title: "Year in Review: 2024",
		date: "March 27",
		tags: ["#meta", "#year-in-review"],
		iconType: "doc",
	},
	{
		id: "redesign-v7",
		title: "Redesign: Version 7.0",
		date: "December 1",
		tags: ["#meta", "#redesign"],
		iconType: "disk",
	},
	{
		id: "shortcut-hook",
		title: "Creating a Keyboard Shortcut Hook in React (Deep Dive)",
		date: "October 19",
		tags: ["#javascript", "#react", "#caching"],
		iconType: "lightning",
	},
]

export const SHELVES: ShelfItem[] = [
	{
		id: "fundamentals",
		title: "Fundamentals",
		count: 12,
		description:
			"The guides I wished I had when I was learning how to code. I used to call them the missing instruction manuals of the web. These articles were all game changers for my understanding on topics such as version control, the command line, React, the DOM, and more.",
	},
	{
		id: "deep-dives",
		title: "Deep dives",
		count: 8,
		description:
			"As my work became more advanced, I started documenting more advanced topics like authorization and authentication, data-driven design, build tools, and architecture.",
	},
	{
		id: "reinventing-the-wheel",
		title: "Reinventing the wheel",
		count: 8,
		description:
			"It's not always necessary, but I like taking things apart to understand how they work. Here are some games and applications I've built.",
	},
	{
		id: "off-the-clock",
		title: "Off the clock",
		count: 4,
		description:
			"Occasionally I'll write about things that aren't related to programming. So far, you'll find an ode to the lore of Animorphs, a writeup on my Keyboard Accordion, and everything I learned building my first PC.",
	},
]

export const SERIES: SeriesItem[] = [
	{
		id: "how-to-code-js",
		title: "How to Code in JavaScript",
		description:
			"A course on the fundamentals of the JavaScript language, from syntax and data types to objects, loops, and functions. Originally written for DigitalOcean.",
		iconType: "js",
	},
	{
		id: "understanding-dom",
		title: "Understanding the DOM",
		description:
			"Learn how to communicate with a web browser by understanding, traversing, and making changes to the Document Object Model. Originally written for DigitalOcean.",
		iconType: "dom",
	},
	{
		id: "wordpress-scratch",
		title: "WordPress from Scratch",
		description:
			"The post that started it all for this website! This is a three part series on setting up and customizing a WordPress site from the ground up.",
		iconType: "wordpress",
	},
	{
		id: "year-review",
		title: "Year in Review",
		description:
			"A retrospective on life, work, and goals at the end of each year.",
		iconType: "review",
	},
	{
		id: "redesigns",
		title: "Redesigns of this website",
		description: "This site gets tweaked a lot. Read about it!",
		iconType: "redesign",
	},
]

export const PROJECTS: ProjectItem[] = [
	{
		id: "accordion",
		year: "2022",
		title: "Keyboard Accordion",
		description: "Play the accordion online!",
		articleUrl: "#",
		demoUrl: "#",
		sourceUrl: "#",
	},
	{
		id: "takenote",
		year: "2020",
		title: "TakeNote",
		description: "Open source notes app",
		articleUrl: "#",
		demoUrl: "#",
		sourceUrl: "#",
	},
	{
		id: "chip8",
		year: "2019",
		title: "Chip8",
		description: "Retro game emulator",
		articleUrl: "#",
		demoUrl: "#",
		sourceUrl: "#",
	},
	{
		id: "sokoban",
		year: "2021",
		title: "Sokoban",
		description: "Web-based Sokoban",
		articleUrl: "#",
		demoUrl: "#",
		sourceUrl: "#",
	},
	{
		id: "new-moon",
		year: "2015",
		title: "New Moon",
		description: "Your new favorite theme",
		demoUrl: "#",
		sourceUrl: "#",
	},
	{
		id: "snek",
		year: "2019",
		title: "Snek",
		description: "A terminal-based Snake",
		articleUrl: "#",
		sourceUrl: "#",
	},
]
