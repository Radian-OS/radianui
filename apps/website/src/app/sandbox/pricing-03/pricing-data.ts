import type { FeatureCategory, PricingPlan } from "./pricing-types"

export const PRICING_PLANS: PricingPlan[] = [
	{
		id: "free",
		name: "Free",
		description: "Great for solo founders",
		monthlyPrice: "$0",
		annualPrice: "$0",
		pricePeriodMonthly: "per month",
		pricePeriodAnnual: "per year",
		buttonText: "Start for Free",
		buttonVariant: "strong",
		featuresHeader: "Get started with",
		features: [
			"Unlimited members",
			"All interface components",
			"Full user support",
			"2 admins",
			"Free",
			"Free",
		],
	},
	{
		id: "basic",
		name: "Basic",
		badge: "Popular",
		description: "Great for small teams",
		monthlyPrice: "$15",
		annualPrice: "$10",
		pricePeriodMonthly: "per month",
		pricePeriodAnnual: "per year",
		buttonText: "Get Started",
		buttonVariant: "strong",
		featuresHeader: "Get started with",
		features: [
			"Unlimited members",
			"All interface components",
			"Full user support",
			"4 admins",
			"Free",
			"Free",
		],
	},
	{
		id: "business",
		name: "Business",
		description: "Great for business and large teams",
		monthlyPrice: "$20",
		annualPrice: "$15",
		pricePeriodMonthly: "per month",
		pricePeriodAnnual: "per year",
		buttonText: "Start for Free",
		buttonVariant: "strong",
		featuresHeader: "Get started with",
		features: [
			"Unlimited members",
			"All interface components",
			"Full user support",
			"8 admins",
			"Free",
			"Free",
		],
	},
	{
		id: "enterprise",
		name: "Enterprise",
		description: "Customer tailored enterprise grade",
		monthlyPrice: "Custom",
		annualPrice: "Custom",
		isCustomPrice: true,
		buttonText: "Contact us",
		buttonVariant: "outline",
		featuresHeader: "Get started with",
		features: [
			"Unlimited members",
			"All interface components",
			"Full user support",
			"Unlimited admins",
			"Free",
			"Free",
		],
	},
]

export const FEATURE_CATEGORIES: FeatureCategory[] = [
	{
		category: "Core Features",
		features: [
			{
				name: "Ready-to-use UI Components",
				values: {
					free: "Limited Access",
					basic: "Full Access",
					business: "Full Access",
					enterprise: "Customizable Access",
				},
			},
			{
				name: "Customizable Themes",
				values: {
					free: "Basic",
					basic: "Standard",
					business: "Advanced",
					enterprise: "Full Customization",
				},
			},
			{
				name: "Integration with React",
				values: { free: true, basic: true, business: true, enterprise: true },
			},
			{
				name: "Integration with TypeScript",
				values: { free: true, basic: true, business: true, enterprise: true },
			},
			{
				name: "Integration with Tailwind CSS",
				values: { free: true, basic: true, business: true, enterprise: true },
			},
			{
				name: "Integration with shadcn/ui",
				values: { free: true, basic: true, business: true, enterprise: true },
			},
			{
				name: "Code Snippet Library",
				values: {
					free: "Limited Access",
					basic: "Standard",
					business: "Advanced",
					enterprise: "Full Access",
				},
			},
		],
	},
	{
		category: "Collaboration Tools",
		features: [
			{
				name: "Team Members",
				values: {
					free: "Limited Access",
					basic: "5 members",
					business: "10 members",
					enterprise: "Custom",
				},
			},
			{
				name: "Shared Design Libraries",
				values: {
					free: "Basic",
					basic: true,
					business: true,
					enterprise: true,
				},
			},
			{
				name: "Component Version Control",
				values: {
					free: true,
					basic: "Basic",
					business: "Advanced",
					enterprise: "Advanced",
				},
			},
		],
	},
	{
		category: "Support & Maintenance",
		features: [
			{
				name: "Documentation Access",
				values: {
					free: "Limited Access",
					basic: "Standard",
					business: "Advanced",
					enterprise: "Priority Support",
				},
			},
			{
				name: "Email Support",
				values: {
					free: "Basic",
					basic: "Standard Support",
					business: "24/7 Support",
					enterprise: "Dedicated Support",
				},
			},
			{
				name: "Custom Component Requests",
				values: {
					free: true,
					basic: "Limited",
					business: "Standard",
					enterprise: "Full Access",
				},
			},
		],
	},
	{
		category: "Performance & Scalability",
		features: [
			{
				name: "Component Load Optimization",
				values: {
					free: "Basic",
					basic: "Standard",
					business: "Advanced",
					enterprise: "Custom Optimization",
				},
			},
			{
				name: "Scalability for Large Projects",
				values: {
					free: "-",
					basic: "Basic",
					business: "Advanced",
					enterprise: "Full Scalability",
				},
			},
			{
				name: "Custom Hosting Integration",
				values: {
					free: "-",
					basic: "-",
					business: "Standard",
					enterprise: "Full Customization",
				},
			},
		],
	},
	{
		category: "Security & Compliance",
		features: [
			{
				name: "Best Security",
				values: {
					free: true,
					basic: true,
					business: true,
					enterprise: "Custom Security",
				},
			},
			{
				name: "Role-Based Access Control",
				values: {
					free: "-",
					basic: "Basic",
					business: "Advanced",
					enterprise: "Custom",
				},
			},
			{
				name: "Compliance with Industry Standards",
				values: {
					free: true,
					basic: true,
					business: true,
					enterprise: "Custom Compliance",
				},
			},
		],
	},
]
