export interface FeatureItem {
	id: string
	label: string
}

export interface HeroContentData {
	eyebrow: string
	heading: string
	features: FeatureItem[]
}

export interface ActionCardData {
	titleLine1: string
	titleLine2: string
	secondaryButtonText: string
	secondaryButtonHref: string
	primaryButtonText: string
	primaryButtonHref: string
}

export interface CTA08Data {
	bgImage: string
	hero: HeroContentData
	action: ActionCardData
}
