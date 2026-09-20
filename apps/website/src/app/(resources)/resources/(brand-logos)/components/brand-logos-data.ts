export const BRAND_LOGO_CDN_ORIGIN = "https://cdn.jsdelivr.net"

export const BRAND_LOGOS_PAGE_PATH = "/resources/brand-logos"

const BRAND_LOGO_CDN_ROOT =
	"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src"

export const brandLogos = [
	{ id: "adobe", name: "Adobe", aliases: ["creative cloud"] },
	{ id: "angular", name: "Angular", aliases: ["framework"] },
	{ id: "anthropic", name: "Anthropic", aliases: ["ai"] },
	{ id: "bitbucket", name: "Bitbucket", aliases: ["atlassian", "git"] },
	{ id: "canva", name: "Canva", aliases: ["design"] },
	{ id: "claude", name: "Claude", aliases: ["anthropic", "ai"] },
	{ id: "figma", name: "Figma", aliases: ["design"] },
	{ id: "framer", name: "Framer", aliases: ["design", "website"] },
	{ id: "gemini", name: "Google Gemini", aliases: ["google", "ai"] },
	{ id: "github", name: "GitHub", aliases: ["git", "code"] },
	{ id: "gitlab", name: "GitLab", aliases: ["git", "code"] },
	{
		id: "google-deepmind",
		name: "Google DeepMind",
		aliases: ["google", "ai"],
	},
	{ id: "miro", name: "Miro", aliases: ["whiteboard", "design"] },
	{ id: "nextjs", name: "Next.js", aliases: ["next", "vercel", "react"] },
	{ id: "npm", name: "npm", aliases: ["node", "package manager"] },
	{ id: "openai", name: "OpenAI", aliases: ["chatgpt", "ai"] },
	{ id: "react", name: "React", aliases: ["javascript", "framework"] },
	{
		id: "stack-overflow",
		name: "Stack Overflow",
		aliases: ["developer", "code"],
	},
	{
		id: "tailwind-css",
		name: "Tailwind CSS",
		aliases: ["css", "framework"],
	},
	{ id: "vue", name: "Vue.js", aliases: ["vuejs", "javascript"] },
] as const

export type BrandLogo = (typeof brandLogos)[number]
export type BrandLogoId = BrandLogo["id"]
export type BrandLogoTheme = "light" | "dark"
export type BrandLogoVariant = "icon" | "wordmark"
export type BrandLogoFormat = "svg" | "png"

const brandLogosById = new Map<BrandLogoId, BrandLogo>(
	brandLogos.map((brand) => [brand.id, brand])
)

export function getBrandLogo(id: BrandLogoId) {
	const brand = brandLogosById.get(id)
	if (!brand) throw new Error(`Missing brand logo metadata for ${id}`)
	return brand
}

export function getBrandLogoFromSlug(slug: string) {
	return brandLogosById.get(slug.toLowerCase() as BrandLogoId) ?? null
}

export function getBrandLogoPagePath(id: BrandLogoId) {
	return `${BRAND_LOGOS_PAGE_PATH}/${id}`
}

export function getBrandLogoSearchTerms(id: BrandLogoId) {
	const brand = getBrandLogo(id)
	return [brand.id, brand.name, ...brand.aliases]
}

export function getBrandLogoUrl(
	id: BrandLogoId,
	theme: BrandLogoTheme = "light",
	variant: BrandLogoVariant = "icon",
	format: BrandLogoFormat = "svg"
) {
	const sizeFolder = format === "png" ? "/48px" : ""
	return `${BRAND_LOGO_CDN_ROOT}/${theme}/${format}${sizeFolder}/${variant}/${id}.${format}`
}

function getLogoDimensions(variant: BrandLogoVariant) {
	return variant === "icon"
		? { width: 48, height: 48 }
		: { width: 180, height: 48 }
}

export function getBrandLogoHtmlMarkup(
	id: BrandLogoId,
	theme: BrandLogoTheme,
	variant: BrandLogoVariant,
	format: BrandLogoFormat = "svg"
) {
	const brand = getBrandLogo(id)
	const { width, height } = getLogoDimensions(variant)
	return `<img src="${getBrandLogoUrl(id, theme, variant, format)}" alt="${brand.name} ${variant}" width="${width}" height="${height}" />`
}

export function getBrandLogoNextImageMarkup(
	id: BrandLogoId,
	theme: BrandLogoTheme,
	variant: BrandLogoVariant,
	format: BrandLogoFormat = "svg"
) {
	const brand = getBrandLogo(id)
	const { width, height } = getLogoDimensions(variant)
	return `<Image src="${getBrandLogoUrl(id, theme, variant, format)}" alt="${brand.name} ${variant}" width={${width}} height={${height}} />`
}
