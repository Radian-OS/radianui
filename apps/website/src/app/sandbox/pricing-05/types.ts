export interface PricingPlan {
	id: string
	name: string
	price: string
	period: string
	description: string
	isPopular?: boolean
	badgeText?: string
	buttonText: string
	buttonHref: string
	featuresTitle: string
	features: string[]
}

export interface PartnerLogo {
	name: string
	colorClass: string
}
