export enum DocsSeoCategory {
	Components = "components",
	GettingStarted = "getting-started",
	Installation = "installation",
	Fundamentals = "fundamentals",
	Default = "default",
}

export type DocsPageMeta = {
	slug: string
	section?: string
	title: string
	description?: string
	content?: string
}

export type GeneratedSeoMeta = {
	title: string
	description: string
}

export const DOCS_SEO_CONFIG = {
	brandName: "Radian UI",
	limits: {
		titleWarning: 60,
		descriptionMin: 140,
		descriptionMax: 155,
	},
	descriptionPadding: [
		"Follow the recommended patterns.",
		"Explore practical examples.",
		"Learn how to customize it.",
		"Ready for production use.",
		"Start building.",
		"Learn more.",
	],
	categories: {
		[DocsSeoCategory.Components]: {
			title: "{pageName} — Open Source React/Tailwind Component | {brandName}",
			fallbackSummary:
				"{pageName} provides an accessible interface element for common user interactions",
			descriptionClosing:
				"Open source React and Tailwind CSS, copy-paste ready and easy to customize.",
		},
		[DocsSeoCategory.GettingStarted]: {
			title: "{pageName} — Getting Started Guide | {brandName}",
			descriptionClosing:
				"Use this guide to understand Radian UI workflows, setup, and tooling for a reliable project.",
			pages: {
				introduction: {
					title: "Radian UI — React/Tailwind Component Library",
				},
				installation: {
					title: "Install Radian UI — React/Tailwind Setup Guide | Radian UI",
				},
				cli: {
					title:
						"Radian UI CLI — Install Components via Command Line | Radian UI",
				},
				figma: {
					title: "Radian UI Figma Kit — Design System File | Radian UI",
				},
				changelog: {
					title: "Changelog | Radian UI",
				},
				"llms.txt": {
					title: "llms.txt for Radian UI — AI-Ready Documentation | Radian UI",
				},
			},
		},
		[DocsSeoCategory.Installation]: {
			title: "Install Radian UI in {frameworkName} | {brandName}",
			manualTitle: "Manual Installation — Radian UI Without CLI | {brandName}",
			frameworkNames: {
				next: "Next.js",
				vite: "Vite",
			},
			frameworkDescription:
				"Install and configure Radian UI in {frameworkName} with Tailwind CSS, utilities, and copy-paste components for projects.",
			manualDescription:
				"Install Radian UI manually without the CLI, including Tailwind CSS, utilities, and copy-paste component files.",
			descriptionClosing: "Supports npm, pnpm, yarn, and bun.",
		},
		[DocsSeoCategory.Fundamentals]: {
			title: "{pageName} — Radian UI Design System | {brandName}",
			descriptionClosing:
				"Use Radian UI foundations for accessible, consistent product interfaces.",
			problemStatements: {
				colors:
					"Create consistent interfaces with accessible contrast, semantic tokens, and reusable color roles across light and dark themes.",
				typography:
					"Keep type hierarchy readable and responsive with consistent font sizes, weights, line heights, and styles across products.",
				iconography:
					"Represent actions and concepts clearly with consistent, accessible icons that improve recognition across interfaces.",
				theme:
					"Keep visual styles consistent while customizing colors, modes, and design tokens across design and development.",
				"theme/nextjs":
					"Add accessible dark mode to Next.js while keeping theme state, system preferences, and Radian UI design tokens synchronized.",
				"theme/vite":
					"Add accessible dark mode to Vite while keeping theme state, system preferences, and Radian UI design tokens synchronized.",
			},
		},
		[DocsSeoCategory.Default]: {
			title: "{pageName} | {brandName}",
			descriptionClosing:
				"Use this Radian UI documentation with practical guidance, examples, and implementation details for your project.",
		},
	},
} as const

type TemplateValues = {
	pageName: string
	brandName: string
	frameworkName?: string
}

const ROOT_GETTING_STARTED_PAGES = new Set([
	"introduction",
	"installation",
	"cli",
	"figma",
	"changelog",
	"llms.txt",
])

const KNOWN_SECTIONS = new Set<DocsSeoCategory>([
	DocsSeoCategory.Components,
	DocsSeoCategory.GettingStarted,
	DocsSeoCategory.Installation,
	DocsSeoCategory.Fundamentals,
])

function fillTemplate(template: string, values: TemplateValues) {
	return template.replace(
		/\{(pageName|brandName|frameworkName)\}/g,
		(_, key) => {
			return values[key as keyof TemplateValues] ?? ""
		}
	)
}

function normalizeSlug(slug: string) {
	return slug
		.trim()
		.replace(/^https?:\/\/[^/]+/i, "")
		.replace(/^\/?docs\/?/i, "")
		.replace(/^\/+|\/+$/g, "")
		.replace(/\/index$/i, "")
		.toLowerCase()
}

function getSlugParts(slug: string) {
	const normalized = normalizeSlug(slug)
	return normalized ? normalized.split("/").filter(Boolean) : []
}

function detectCategory(page: DocsPageMeta): DocsSeoCategory {
	const parts = getSlugParts(page.slug)
	const pathSection = (parts[0] || "").toLowerCase()
	const declaredSection = (page.section || "").toLowerCase()
	const section = KNOWN_SECTIONS.has(pathSection as DocsSeoCategory)
		? pathSection
		: declaredSection

	if (section === "components") return DocsSeoCategory.Components
	if (section === "installation") return DocsSeoCategory.Installation
	if (section === "fundamentals") return DocsSeoCategory.Fundamentals
	if (section === "getting-started") return DocsSeoCategory.GettingStarted
	if (parts.length <= 1 && ROOT_GETTING_STARTED_PAGES.has(parts[0])) {
		return DocsSeoCategory.GettingStarted
	}

	return DocsSeoCategory.Default
}

function normalizeText(value: string) {
	return value
		.replace(/\s+/g, " ")
		.replace(/\s+([,.;:!?])/g, "$1")
		.trim()
}

function stripEndingPunctuation(value: string) {
	return value.replace(/[.!?,;:\s]+$/g, "")
}

function asSentence(value: string) {
	const normalized = stripEndingPunctuation(normalizeText(value))
	return normalized ? `${normalized}.` : ""
}

function truncateAtWord(value: string, maxLength: number) {
	if (value.length <= maxLength) return value

	const slice = value.slice(0, maxLength + 1)
	const lastSpace = slice.lastIndexOf(" ")
	const truncated = slice.slice(0, lastSpace > 0 ? lastSpace : maxLength)

	return stripEndingPunctuation(truncated)
}

function truncateLead(value: string, maxLength: number) {
	if (value.length <= maxLength) return value

	const slice = value.slice(0, maxLength + 1)
	const clauseBoundary = Math.max(
		slice.lastIndexOf(","),
		slice.lastIndexOf(";"),
		slice.lastIndexOf(":")
	)

	if (clauseBoundary >= Math.floor(maxLength * 0.55)) {
		return stripEndingPunctuation(slice.slice(0, clauseBoundary))
	}

	return `${truncateAtWord(value, maxLength - 1)}…`
}

function extractContentSummary(content = "") {
	return normalizeText(
		content
			.replace(/^---[\s\S]*?---/, " ")
			.replace(/```[\s\S]*?```/g, " ")
			.replace(/\{\/\*[\s\S]*?\*\/\}/g, " ")
			.replace(/<[^>]+>/g, " ")
			.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
			.replace(/[`*_>#|~-]/g, " ")
	)
}

function getSummary(page: DocsPageMeta, fallback: string) {
	return normalizeText(
		page.description || extractContentSummary(page.content) || fallback
	)
}

function constrainDescription(value: string) {
	const { descriptionMin, descriptionMax } = DOCS_SEO_CONFIG.limits
	let description = normalizeText(value)
	const availablePadding = [...DOCS_SEO_CONFIG.descriptionPadding]

	while (description.length < descriptionMin && availablePadding.length > 0) {
		const availableLength = descriptionMax - description.length - 1
		const completingPaddingIndex = availablePadding.findIndex(
			(padding) =>
				padding.length <= availableLength &&
				description.length + padding.length + 1 >= descriptionMin
		)
		const fittingPaddingIndex = availablePadding.findIndex(
			(padding) => padding.length <= availableLength
		)
		const paddingIndex =
			completingPaddingIndex >= 0 ? completingPaddingIndex : fittingPaddingIndex

		if (paddingIndex < 0) break

		const [padding] = availablePadding.splice(paddingIndex, 1)
		description = `${stripEndingPunctuation(description)}. ${padding}`
	}

	if (description.length > descriptionMax) {
		description = `${truncateAtWord(description, descriptionMax - 1)}.`
	}

	return description
}

function combineDescription(lead: string, closing: string) {
	const normalizedClosing = asSentence(closing)
	const leadBudget =
		DOCS_SEO_CONFIG.limits.descriptionMax - normalizedClosing.length - 2
	const normalizedLead = truncateLead(stripEndingPunctuation(lead), leadBudget)

	return constrainDescription(
		`${asSentence(normalizedLead)} ${normalizedClosing}`
	)
}

function getPageKey(page: DocsPageMeta) {
	const parts = getSlugParts(page.slug)
	return parts.at(-1) || page.title.toLowerCase().replace(/\s+/g, "-")
}

function getFundamentalsKey(page: DocsPageMeta) {
	const parts = getSlugParts(page.slug)
	const sectionIndex = parts.indexOf("fundamentals")
	return sectionIndex >= 0
		? parts.slice(sectionIndex + 1).join("/")
		: getPageKey(page)
}

function generateComponentMeta(page: DocsPageMeta): GeneratedSeoMeta {
	const config = DOCS_SEO_CONFIG.categories[DocsSeoCategory.Components]
	const values = {
		pageName: page.title,
		brandName: DOCS_SEO_CONFIG.brandName,
	}
	const fallback = fillTemplate(config.fallbackSummary, values)

	return {
		title: fillTemplate(config.title, values),
		description: combineDescription(
			getSummary(page, fallback),
			config.descriptionClosing
		),
	}
}

function generateGettingStartedMeta(page: DocsPageMeta): GeneratedSeoMeta {
	const config = DOCS_SEO_CONFIG.categories[DocsSeoCategory.GettingStarted]
	const pageKey = getPageKey(page)
	const pageConfig = config.pages[pageKey as keyof typeof config.pages]
	const values = {
		pageName: page.title,
		brandName: DOCS_SEO_CONFIG.brandName,
	}

	return {
		title: fillTemplate(pageConfig?.title ?? config.title, values),
		description: combineDescription(
			getSummary(page, `${page.title} guidance for Radian UI`),
			config.descriptionClosing
		),
	}
}

function generateInstallationMeta(page: DocsPageMeta): GeneratedSeoMeta {
	const config = DOCS_SEO_CONFIG.categories[DocsSeoCategory.Installation]
	const pageKey = getPageKey(page)
	const isManual = pageKey === "manual"
	const frameworkName =
		config.frameworkNames[pageKey as keyof typeof config.frameworkNames] ??
		page.title.replace(/\s+Installation$/i, "")
	const values = {
		pageName: page.title,
		brandName: DOCS_SEO_CONFIG.brandName,
		frameworkName,
	}
	const lead = isManual
		? config.manualDescription
		: fillTemplate(config.frameworkDescription, values)

	return {
		title: fillTemplate(isManual ? config.manualTitle : config.title, values),
		description: combineDescription(lead, config.descriptionClosing),
	}
}

function generateFundamentalsMeta(page: DocsPageMeta): GeneratedSeoMeta {
	const config = DOCS_SEO_CONFIG.categories[DocsSeoCategory.Fundamentals]
	const fundamentalsKey = getFundamentalsKey(page)
	const problemStatement =
		config.problemStatements[
			fundamentalsKey as keyof typeof config.problemStatements
		] ??
		getSummary(page, `${page.title} creates a consistent design foundation`)
	const values = {
		pageName: page.title,
		brandName: DOCS_SEO_CONFIG.brandName,
	}

	return {
		title: fillTemplate(config.title, values),
		description: combineDescription(
			problemStatement,
			config.descriptionClosing
		),
	}
}

function generateDefaultMeta(page: DocsPageMeta): GeneratedSeoMeta {
	const config = DOCS_SEO_CONFIG.categories[DocsSeoCategory.Default]
	const values = {
		pageName: page.title,
		brandName: DOCS_SEO_CONFIG.brandName,
	}
	const title =
		page.title.trim().toLowerCase() === DOCS_SEO_CONFIG.brandName.toLowerCase()
			? DOCS_SEO_CONFIG.brandName
			: fillTemplate(config.title, values)

	return {
		title,
		description: combineDescription(
			getSummary(
				page,
				`${page.title} documentation and implementation guidance`
			),
			config.descriptionClosing
		),
	}
}

function warnAboutMetaLength(meta: GeneratedSeoMeta, slug: string) {
	const { titleWarning, descriptionMin, descriptionMax } =
		DOCS_SEO_CONFIG.limits

	if (meta.title.length > titleWarning) {
		console.warn(
			`[docs SEO] Title for "${slug}" is ${meta.title.length} characters (recommended maximum: ${titleWarning}): ${meta.title}`
		)
	}

	if (
		meta.description.length < descriptionMin ||
		meta.description.length > descriptionMax
	) {
		console.warn(
			`[docs SEO] Description for "${slug}" is ${meta.description.length} characters (required: ${descriptionMin}-${descriptionMax}).`
		)
	}
}

export function generateSeoMeta(page: DocsPageMeta): GeneratedSeoMeta {
	const category = detectCategory(page)
	let meta: GeneratedSeoMeta

	switch (category) {
		case DocsSeoCategory.Components:
			meta = generateComponentMeta(page)
			break
		case DocsSeoCategory.GettingStarted:
			meta = generateGettingStartedMeta(page)
			break
		case DocsSeoCategory.Installation:
			meta = generateInstallationMeta(page)
			break
		case DocsSeoCategory.Fundamentals:
			meta = generateFundamentalsMeta(page)
			break
		default:
			meta = generateDefaultMeta(page)
	}

	warnAboutMetaLength(meta, page.slug)
	return meta
}
