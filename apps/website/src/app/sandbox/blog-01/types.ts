export interface BlogAuthor {
	name: string
	role: string
	date: string
	readTime: string
	avatarUrl: string
	bio: string
}

export interface ArticleSection {
	id: string
	title: string
	paragraphs: string[]
}

export interface ReadNextCard {
	id: string
	category: string
	readTime: string
	title: string
	description: string
	href: string
}

export const BLOG_AUTHOR: BlogAuthor = {
	name: "Mira Stone",
	role: "Product Lead",
	date: "May 30, 2026",
	readTime: "6 min read",
	avatarUrl: "/sandbox/placeholder.svg",
	bio: "Mira writes product updates for teams using Cadence to plan launches, review boards, and keep release work moving.",
}

export const ARTICLE_TITLE = "What's New in Cadence 3.2"
export const ARTICLE_SUBTITLE =
	"A rebuilt board engine and saved views that remember how your team actually works."
export const ARTICLE_LEAD =
	"Cadence 3.2 focuses on the everyday planning details that make large boards feel faster, clearer, and easier to review with a team."

export const ARTICLE_SECTIONS: ArticleSection[] = [
	{
		id: "engine",
		title: "A Faster Board Engine",
		paragraphs: [
			"The new board engine keeps large product workspaces responsive when teams add more lanes, owners, filters, and linked tasks. Dragging a card now updates the immediate surface first, then reconciles the deeper workspace state in the background.",
			"That change removes the pause teams felt on heavier boards without hiding important status changes. Cards still show their owner, due date, and priority signals, but the board no longer makes every movement feel expensive.",
		],
	},
	{
		id: "views",
		title: "Saved Views That Stay Useful",
		paragraphs: [
			"Saved views now remember grouping, visible fields, sort order, and filter combinations. A launch lead can keep a risk-first view, while an engineering lead can preserve a dependency view against the same board.",
			"Each view also stores a short description, so teammates know why it exists before they switch into it. The result is less setup at the start of a weekly review and fewer duplicate boards created for one-off meetings.",
		],
	},
	{
		id: "quality",
		title: "Release Quality Work",
		paragraphs: [
			"Cadence 3.2 also includes smaller fixes around keyboard focus, card density, and activity timestamps. These are not headline features, but they make the product feel steadier during daily planning.",
			"We focused on changes that compound over a week of real use: fewer waits, fewer resets, clearer views, and less time explaining where the important work lives.",
		],
	},
]

export const ARTICLE_TOPICS = ["Release Notes", "Boards", "Saved Views"]

export const READ_NEXT_CARDS: ReadNextCard[] = [
	{
		id: "latency",
		category: "Engineering",
		readTime: "8 min read",
		title: "Cutting Cold Start Latency",
		description:
			"How the platform team tightened startup paths for larger workspaces.",
		href: "#",
	},
	{
		id: "colors",
		category: "Design Systems",
		readTime: "6 min read",
		title: "Rethinking Our Color System",
		description:
			"A compact contrast pass for badges, boards, and status-heavy views.",
		href: "#",
	},
]
