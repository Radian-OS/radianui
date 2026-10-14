import type { BrandCompany, UntitledPricingPlan } from "./pricing-types"

export const UNTITLED_PLANS: UntitledPricingPlan[] = [
	{
		id: "basic",
		name: "Basic plan",
		monthlyPrice: "$10",
		annualPrice: "$8",
		period: "per user\nper month",
		description: "Basic features for up to 10 users.",
		buttonText: "Get started",
		featuresHeadline: "Everything in our free plan plus....",
		features: [
			"Access to basic features",
			"Basic reporting and analytics",
			"Up to 10 individual users",
			"20GB individual data each user",
		],
	},
	{
		id: "business",
		name: "Business plan",
		monthlyPrice: "$20",
		annualPrice: "$16",
		period: "per user\nper month",
		description: "Basic features for up to 20 users.",
		buttonText: "Get started",
		isPopular: true,
		badgeText: "Popular",
		featuresHeadline: "Everything in Basic plus....",
		features: [
			"200+ integrations",
			"Advanced reporting and analytics",
			"Up to 20 individual users",
			"40GB individual data each user",
		],
	},
	{
		id: "enterprise",
		name: "Enterprise plan",
		monthlyPrice: "$40",
		annualPrice: "$32",
		period: "per user\nper month",
		description: "Advanced features + unlimited users.",
		buttonText: "Get started",
		featuresHeadline: "Everything in Business plus....",
		features: [
			"Advanced custom fields",
			"Audit log and data history",
			"Unlimited individual users",
			"Unlimited individual data",
		],
	},
]

export const REVIEW_AVATARS = [
	{
		name: "Sarah Chen",
		url: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/1.png",
		initials: "SC",
	},
	{
		name: "Alex Johnson",
		url: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/2.png",
		initials: "AJ",
	},
	{
		name: "Elena Rostova",
		url: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/3.png",
		initials: "ER",
	},
	{
		name: "Marcus Miller",
		url: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/4.png",
		initials: "MM",
	},
	{
		name: "David Kim",
		url: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/8.png",
		initials: "DK",
	},
]

export const TRUSTED_COMPANIES: BrandCompany[] = [
	{
		name: "Claude",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/ai/wordmark/claude.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/ai/wordmark/claude.svg",
	},
	{
		name: "OpenAI",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/ai/wordmark/openai.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/ai/wordmark/openai.svg",
	},
	{
		name: "Linear",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/productivity-work/wordmark/linear.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/productivity-work/wordmark/linear.svg",
	},
	{
		name: "Slack",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/productivity-work/wordmark/slack.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/productivity-work/wordmark/slack.svg",
	},
	{
		name: "Discord",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/social-content/wordmark/discord.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/social-content/wordmark/discord.svg",
	},
	{
		name: "GitHub",
		lightSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/development/wordmark/github.svg",
		darkSrc:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/development/wordmark/github.svg",
	},
]
