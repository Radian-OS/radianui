export interface NavItem {
	value: string
	label: string
	href?: string
}

export interface Reviewer {
	id: string
	name: string
	avatarUrl: string
	initials: string
}

export interface BrandLogo {
	id: string
	name: string
	src: string
	darkSrc?: string
}

export interface HeroData {
	badgeText: string
	title: string
	description: string
	rating: number
	ratingText: string
}
