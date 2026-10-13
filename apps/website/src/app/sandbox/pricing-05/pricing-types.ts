export interface PricingFeature {
	text: string
}

export interface UntitledPricingPlan {
	id: string
	name: string
	monthlyPrice: string
	annualPrice: string
	period: string
	description: string
	buttonText: string
	isPopular?: boolean
	badgeText?: string
	featuresHeadline: string
	features: string[]
}

export type BillingCycle = "monthly" | "annual"

export interface BrandCompany {
	name: string
	lightSrc: string
	darkSrc: string
}
