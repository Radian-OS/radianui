export interface BrandLogo {
	name: string
	domain: string
}

export const BRAND_LOGOS: BrandLogo[] = [
	{ name: "Vercel", domain: "vercel.com" },
	{ name: "n8n", domain: "n8n.io" },
	{ name: "supabase", domain: "supabase.com" },
	{ name: "stripe", domain: "stripe.com" },
	{ name: "GitHub", domain: "github.com" },
	{ name: "OpenAI", domain: "openai.com" },
	{ name: "bolt", domain: "bolt.new" },
	{ name: "PayPal", domain: "paypal.com" },
]

export interface Hero12Data {
	badgeText: string
	badgeHref: string
	titlePrefix: string
	titleHighlight: string
	description: string
	primaryCtaText: string
	primaryCtaHref: string
	secondaryCtaText: string
	secondaryCtaHref: string
}

export const HERO_12_DATA: Hero12Data = {
	badgeText: "Meet 485+ Blocks in ReUI Pro",
	badgeHref: "https://reui.io",
	titlePrefix: "Modern shadcn/ui",
	titleHighlight: "made for MCP",
	description:
		"A design-led shadcn/ui platform with production-ready blocks, MCP tools, reusable patterns, and a curated registry for building polished interfaces faster.",
	primaryCtaText: "Explore Blocks",
	primaryCtaHref: "https://reui.io",
	secondaryCtaText: "Choose Plan",
	secondaryCtaHref: "https://reui.io/pricing",
}
