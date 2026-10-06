export type FilterCategory =
	| "All"
	| "Product Updates"
	| "Personal Finance"
	| "Industry News"
	| "Case Studies"

export interface Author {
	name: string
	avatarUrl: string
	initials: string
	role?: string
}

export interface Article {
	id: string
	title: string
	excerpt: string
	category: Exclude<FilterCategory, "All">
	date: string
	readTime?: string
	author: Author
	imageUrl: string
	slug: string
}

export interface NewsletterFormValues {
	email: string
}

export interface NavItem {
	title: string
	href: string
	items?: {
		title: string
		href: string
		description: string
	}[]
}

export interface FooterColumn {
	title: string
	links: {
		label: string
		href: string
	}[]
}
