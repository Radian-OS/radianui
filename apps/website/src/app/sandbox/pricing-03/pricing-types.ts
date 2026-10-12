import type { ButtonProps } from "@/styles/default/ui/button"

export type PlanId = "free" | "basic" | "business" | "enterprise"

export interface PricingPlan {
	id: PlanId
	name: string
	badge?: string
	description: string
	monthlyPrice: string
	annualPrice: string
	pricePeriodMonthly?: string
	pricePeriodAnnual?: string
	isCustomPrice?: boolean
	buttonText: string
	buttonVariant?: ButtonProps["variant"]
	featuresHeader: string
	features: string[]
}

export interface FeatureRow {
	name: string
	values: Record<PlanId, string | boolean>
}

export interface FeatureCategory {
	category: string
	features: FeatureRow[]
}
