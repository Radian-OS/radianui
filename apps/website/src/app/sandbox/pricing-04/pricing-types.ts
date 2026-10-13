export interface PricingPlan {
	id: string
	name: string
	badge: string
	price: string
	period: string
	description: string
	buttonText: string
	buttonVariant: "strong" | "soft" | "outline"
	buttonColor: "primary" | "neutral"
	isPopular?: boolean
	features: string[]
}

export type PricingTab = "studio" | "dub" | "api"
