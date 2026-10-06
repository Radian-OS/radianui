export interface HeroTab {
	id: string
	label: string
}

export const HERO_TABS: HeroTab[] = [
	{ id: "overview", label: "Overview" },
	{ id: "components", label: "Components" },
	{ id: "workflows", label: "Workflows" },
	{ id: "integrations", label: "Integrations" },
	{ id: "templates", label: "Templates" },
	{ id: "docs", label: "Docs" },
]

export interface HeroActionsData {
	rating: number
	ratingText: string
	reviewsText: string
	reviewsCount: string
	cursorUrl: string
	figmaUrl: string
}

export const HERO_ACTIONS_DATA: HeroActionsData = {
	rating: 4.5,
	ratingText: "4.5 · 13.9k Ratings",
	reviewsText: "reviews",
	reviewsCount: "27",
	cursorUrl: "https://cursor.com",
	figmaUrl: "https://figma.com",
}
