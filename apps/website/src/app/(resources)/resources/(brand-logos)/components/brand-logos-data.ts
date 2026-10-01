import brandLogosManifest from "./brand-logos-manifest.json"

export const BRAND_LOGO_CDN_ORIGIN = "https://cdn.jsdelivr.net"
export const BRAND_LOGOS_PAGE_PATH = "/resources/brand-logos"
export const ALL_BRAND_LOGO_CATEGORY = "All categories"

const BRAND_LOGO_CDN_ROOT =
	"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src"

export type BrandLogoTheme = "light" | "dark"
export type BrandLogoColorway = "colored" | "neutral"
export type BrandLogoVariant = "icon" | "wordmark"
export type BrandLogoId = string
export type BrandLogoCategorySlug = string

export interface BrandLogoCategory {
	slug: BrandLogoCategorySlug
	label: string
	count: number
	brands: readonly BrandLogoId[]
}

export interface BrandLogo {
	id: BrandLogoId
	name: string
	category: BrandLogoCategorySlug
	categoryLabel: string
	aliases: readonly string[]
}

const brandNameOverrides: Record<string, string> = {
	"amazon-pay": "Amazon Pay",
	"american-express": "American Express",
	"android-studio": "Android Studio",
	"apple-intelligence": "Apple Intelligence",
	"apple-pay": "Apple Pay",
	aws: "AWS",
	"aws-dynamodb": "AWS DynamoDB",
	"aws-lambda": "AWS Lambda",
	"cash-app": "Cash App",
	chatgpt: "ChatGPT",
	circleci: "CircleCI",
	cloudflare: "Cloudflare",
	cockroachdb: "CockroachDB",
	cpp: "C++",
	"digital-ocean": "DigitalOcean",
	dotnet: ".NET",
	github: "GitHub",
	"github-copilot": "GitHub Copilot",
	gitlab: "GitLab",
	go: "Go",
	"google-bigquery": "Google BigQuery",
	"google-cloud": "Google Cloud",
	"google-deepmind": "Google DeepMind",
	"google-drive": "Google Drive",
	"google-pay": "Google Pay",
	"google-workspace": "Google Workspace",
	graphql: "GraphQL",
	groq: "Groq",
	hp: "HP",
	"hugging-face": "Hugging Face",
	jcb: "JCB",
	lg: "LG",
	linkedin: "LinkedIn",
	mariadb: "MariaDB",
	mastercard: "Mastercard",
	"meta-ai": "Meta AI",
	"microsoft-365": "Microsoft 365",
	"microsoft-azure": "Microsoft Azure",
	"mistral-ai": "Mistral AI",
	mongodb: "MongoDB",
	mysql: "MySQL",
	nestjs: "NestJS",
	nextjs: "Next.js",
	npm: "npm",
	nuxtjs: "Nuxt",
	nvidia: "NVIDIA",
	okta: "Okta",
	openai: "OpenAI",
	paypal: "PayPal",
	payu: "PayU",
	php: "PHP",
	postgresql: "PostgreSQL",
	postmarketos: "postmarketOS",
	"product-hunt": "Product Hunt",
	r: "R",
	react: "React",
	reddit: "Reddit",
	shopify: "Shopify",
	sqlite: "SQLite",
	"stack-overflow": "Stack Overflow",
	"tailwind-css": "Tailwind CSS",
	tiktok: "TikTok",
	"travis-ci": "Travis CI",
	twilio: "Twilio",
	typescript: "TypeScript",
	"vs-code": "Visual Studio Code",
	vue: "Vue.js",
	"wechat-pay": "WeChat Pay",
	x: "X",
	xcode: "Xcode",
	xiaomi: "Xiaomi",
	youtube: "YouTube",
}

const brandAliases: Record<string, readonly string[]> = {
	anthropic: ["ai"],
	bitbucket: ["atlassian", "git"],
	canva: ["design"],
	chatgpt: ["openai", "ai", "gpt"],
	claude: ["anthropic", "ai"],
	figma: ["design"],
	framer: ["design", "website"],
	gemini: ["google", "ai"],
	github: ["git", "code"],
	gitlab: ["git", "code"],
	"google-deepmind": ["google", "ai"],
	nextjs: ["next", "vercel", "react"],
	npm: ["node", "package manager"],
	openai: ["chatgpt", "ai"],
	react: ["javascript", "framework"],
	"stack-overflow": ["developer", "code"],
	"tailwind-css": ["css", "framework"],
	vue: ["vuejs", "javascript", "framework"],
}

function formatBrandLogoName(id: string) {
	return (
		brandNameOverrides[id] ??
		id
			.split("-")
			.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
			.join(" ")
	)
}

export const brandLogoCategories: readonly BrandLogoCategory[] =
	brandLogosManifest.categories.map((category) => ({
		slug: category.slug,
		label: category.label,
		count: category.count,
		brands: category.brands,
	}))

export const brandLogos: readonly BrandLogo[] = brandLogoCategories.flatMap(
	(category) =>
		category.brands.map((id) => ({
			id,
			name: formatBrandLogoName(id),
			category: category.slug,
			categoryLabel: category.label,
			aliases: brandAliases[id] ?? [],
		}))
)

export const BRAND_LOGO_ASSET_COUNT = brandLogos.length * 8

const brandLogosById = new Map<BrandLogoId, BrandLogo>(
	brandLogos.map((brand) => [brand.id, brand])
)

export function getBrandLogo(id: BrandLogoId) {
	const brand = brandLogosById.get(id)
	if (!brand) throw new Error(`Missing brand logo metadata for ${id}`)
	return brand
}

export function getBrandLogoFromSlug(slug: string) {
	return brandLogosById.get(slug.toLowerCase()) ?? null
}

export function getBrandLogoPagePath(id: BrandLogoId) {
	return `${BRAND_LOGOS_PAGE_PATH}/${id}`
}

export function getBrandLogoSearchTerms(id: BrandLogoId) {
	const brand = getBrandLogo(id)
	return [brand.id, brand.name, brand.categoryLabel, ...brand.aliases]
}

export function getLogoDimensions(variant: BrandLogoVariant) {
	return variant === "icon"
		? { width: 24, height: 24 }
		: { width: 180, height: 48 }
}

export function getBrandLogoSvgUrl(
	id: BrandLogoId,
	theme: BrandLogoTheme = "light",
	colorway: BrandLogoColorway = "colored",
	variant: BrandLogoVariant = "icon"
) {
	const brand = getBrandLogo(id)
	return `${BRAND_LOGO_CDN_ROOT}/${theme}/${colorway}/${brand.category}/${variant}/${brand.id}.svg`
}

export function getBrandLogoUrl(
	id: BrandLogoId,
	theme: BrandLogoTheme = "light",
	colorwayOrVariant: BrandLogoColorway | BrandLogoVariant = "colored",
	maybeVariant: BrandLogoVariant = "icon"
): string {
	const colorway: BrandLogoColorway =
		colorwayOrVariant === "icon" || colorwayOrVariant === "wordmark"
			? "colored"
			: colorwayOrVariant
	const variant: BrandLogoVariant =
		colorwayOrVariant === "icon" || colorwayOrVariant === "wordmark"
			? colorwayOrVariant
			: maybeVariant
	return getBrandLogoSvgUrl(id, theme, colorway, variant)
}

export function getBrandLogoHtmlMarkup(
	id: BrandLogoId,
	theme: BrandLogoTheme = "light",
	colorway: BrandLogoColorway = "colored",
	variant: BrandLogoVariant = "icon"
) {
	const brand = getBrandLogo(id)
	const { width, height } = getLogoDimensions(variant)
	return `<img src="${getBrandLogoSvgUrl(id, theme, colorway, variant)}" alt="${brand.name} ${variant}" width="${width}" height="${height}" />`
}

export function getBrandLogoNextImageMarkup(
	id: BrandLogoId,
	theme: BrandLogoTheme = "light",
	colorway: BrandLogoColorway = "colored",
	variant: BrandLogoVariant = "icon"
) {
	const brand = getBrandLogo(id)
	const { width, height } = getLogoDimensions(variant)
	return `<Image src="${getBrandLogoSvgUrl(id, theme, colorway, variant)}" alt="${brand.name} ${variant}" width={${width}} height={${height}} />`
}

const PRIVACY_SENSITIVE_BRAND_IDS = new Set<string>([
	"amplitude",
	"datadog",
	"hotjar",
	"intercom",
	"klaviyo",
	"mailchimp",
	"mixpanel",
	"optimizely",
	"sentry",
])

const dynamicFallbackBrands = new Set<string>()

if (typeof window !== "undefined") {
	try {
		const stored = JSON.parse(
			window.sessionStorage.getItem("radian-fallback-brands") || "[]"
		) as string[]
		for (const id of stored) {
			dynamicFallbackBrands.add(id)
		}
	} catch {
		// Ignore storage errors
	}
}

export function registerBrandLogoFallback(id: BrandLogoId) {
	dynamicFallbackBrands.add(id)
	if (typeof window !== "undefined") {
		try {
			const existing = JSON.parse(
				window.sessionStorage.getItem("radian-fallback-brands") || "[]"
			) as string[]
			if (!existing.includes(id)) {
				window.sessionStorage.setItem(
					"radian-fallback-brands",
					JSON.stringify([...existing, id])
				)
			}
		} catch {
			// Ignore storage access errors
		}
	}
}

export function isBrandLogoFallbackRequired(id: BrandLogoId) {
	return PRIVACY_SENSITIVE_BRAND_IDS.has(id) || dynamicFallbackBrands.has(id)
}

export function getBrandLogoFallbackUrl(
	id: BrandLogoId,
	theme: BrandLogoTheme = "light",
	colorway: BrandLogoColorway = "colored",
	variant: BrandLogoVariant = "icon"
) {
	const brand = getBrandLogo(id)
	const path = `src/${theme}/${colorway}/${brand.category}/${variant}/${brand.id}.svg`
	const token =
		typeof btoa === "function"
			? btoa(path)
			: Buffer.from(path).toString("base64")
	return `/api/brand-logos?token=${encodeURIComponent(token)}`
}

export function getBrandLogoDisplayUrl(
	id: BrandLogoId,
	theme: BrandLogoTheme = "light",
	colorway: BrandLogoColorway = "colored",
	variant: BrandLogoVariant = "icon"
) {
	// Privacy-sensitive brands are commonly blocked by ad blockers / privacy filters
	// when their name appears in a third-party CDN URL. Using the proxy URL avoids that.
	return isBrandLogoFallbackRequired(id)
		? getBrandLogoFallbackUrl(id, theme, colorway, variant)
		: getBrandLogoSvgUrl(id, theme, colorway, variant)
}
