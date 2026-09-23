import brandLogosManifest from "./brand-logos-manifest.json"

export const BRAND_LOGO_CDN_ORIGIN = "https://cdn.jsdelivr.net"
export const BRAND_LOGOS_PAGE_PATH = "/resources/brand-logos"
export const ALL_BRAND_LOGO_CATEGORY = "All categories"

const BRAND_LOGO_CDN_ROOT =
	"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src"

export type BrandLogoTheme = "light" | "dark"
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

export const BRAND_LOGO_ASSET_COUNT = brandLogos.length * 4

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

export function getBrandLogoUrl(
	id: BrandLogoId,
	theme: BrandLogoTheme = "light",
	variant: BrandLogoVariant = "icon"
) {
	const brand = getBrandLogo(id)
	return `${BRAND_LOGO_CDN_ROOT}/${theme}/colored/png/${brand.category}/${variant}/${id}.png`
}

function getLogoDimensions(variant: BrandLogoVariant) {
	return variant === "icon"
		? { width: 64, height: 64 }
		: { width: 240, height: 64 }
}

function escapeXmlText(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
}

function escapeXmlAttribute(value: string) {
	return escapeXmlText(value).replaceAll('"', "&quot;")
}

export function getBrandLogoSvgMarkup(
	id: BrandLogoId,
	variant: BrandLogoVariant,
	imageHref: string
) {
	const brand = getBrandLogo(id)
	const { width, height } = getLogoDimensions(variant)
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXmlAttribute(brand.name)} ${variant}"><image href="${escapeXmlAttribute(imageHref)}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" /></svg>`
}

export function getBrandLogoHtmlMarkup(
	id: BrandLogoId,
	theme: BrandLogoTheme,
	variant: BrandLogoVariant
) {
	const brand = getBrandLogo(id)
	const { width, height } = getLogoDimensions(variant)
	return `<img src="${getBrandLogoUrl(id, theme, variant)}" alt="${brand.name} ${variant}" width="${width}" height="${height}" />`
}

export function getBrandLogoNextImageMarkup(
	id: BrandLogoId,
	theme: BrandLogoTheme,
	variant: BrandLogoVariant
) {
	const brand = getBrandLogo(id)
	const { width, height } = getLogoDimensions(variant)
	return `<Image src="${getBrandLogoUrl(id, theme, variant)}" alt="${brand.name} ${variant}" width={${width}} height={${height}} />`
}
