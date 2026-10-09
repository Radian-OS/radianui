export interface NavItem {
	name: string
	href: string
	isActive?: boolean
}

export interface ModelItem {
	id: string
	label: string
	tag: string
	icon: React.ComponentType<{ className?: string }>
	image?: string
}

export interface Hero37Props {
	badge?: string
	heading?: string
	description?: string
	primaryCta?: {
		label: string
		href: string
	}
	secondaryCta?: {
		label: string
	}
	videoUrl?: string
	items?: ModelItem[]
}
