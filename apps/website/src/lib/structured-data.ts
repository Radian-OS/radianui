import type { JsonLdObject } from "@/components/seo/json-ld"
import { websiteMetadata } from "@/config/website-metadata-config"

const configuredSiteUrl =
	websiteMetadata.url ||
	process.env.NEXT_PUBLIC_WEBSITE_URL ||
	"https://radianos.com"

export const siteUrl = configuredSiteUrl.replace(/\/+$/, "")
export const organizationId = `${siteUrl}/#organization`
export const websiteId = `${siteUrl}/#website`

export function absoluteUrl(path = "/") {
	return new URL(path, `${siteUrl}/`).toString()
}

export function getPublisherSchema(): JsonLdObject {
	return {
		"@type": "Organization",
		"@id": organizationId,
		name: websiteMetadata.name,
		url: absoluteUrl("/"),
		logo: {
			"@type": "ImageObject",
			url: absoluteUrl("/android-chrome-192x192.png"),
			width: 192,
			height: 192,
		},
	}
}

export function getBreadcrumbSchema(
	items: Array<{ name: string; item?: string }>
): JsonLdObject {
	return {
		"@type": "BreadcrumbList",
		itemListElement: items.map(({ name, item }, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name,
			...(item ? { item } : {}),
		})),
	}
}

export function getHomepageStructuredData(): JsonLdObject {
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": organizationId,
				name: websiteMetadata.name,
				alternateName: "Radian UI",
				url: absoluteUrl("/"),
				logo: {
					"@type": "ImageObject",
					url: absoluteUrl("/android-chrome-192x192.png"),
					width: 192,
					height: 192,
				},
				sameAs: [
					"https://github.com/Radian-os/radianos",
					"https://x.com/radian_os",
					"https://www.youtube.com/@RadianOS",
				],
			},
			{
				"@type": "WebSite",
				"@id": websiteId,
				name: websiteMetadata.name,
				alternateName: "Radian UI",
				url: absoluteUrl("/"),
				publisher: { "@id": organizationId },
				inLanguage: "en",
			},
			{
				"@type": "SoftwareSourceCode",
				"@id": `${siteUrl}/#software`,
				name: websiteMetadata.name,
				description:
					"Open-source React component library and design system built with Tailwind CSS.",
				url: absoluteUrl("/"),
				codeRepository: "https://github.com/Radian-os/radianos",
				programmingLanguage: ["TypeScript", "JavaScript"],
				runtimePlatform: ["React", "Next.js", "Web"],
				license: "https://github.com/Radian-os/radianos/blob/main/LICENSE.md",
				isAccessibleForFree: true,
				author: { "@id": organizationId },
			},
		],
	}
}

export function getDocStructuredData({
	title,
	description,
	url,
}: {
	title: string
	description: string
	url: string
}): JsonLdObject {
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "TechArticle",
				"@id": `${url}#article`,
				headline: title,
				description,
				url,
				mainEntityOfPage: {
					"@type": "WebPage",
					"@id": url,
				},
				publisher: getPublisherSchema(),
				inLanguage: "en",
			},
			getBreadcrumbSchema([
				{ name: "Home", item: absoluteUrl("/") },
				{
					name: "Documentation",
					item: absoluteUrl("/docs/getting-started/introduction"),
				},
				{ name: title },
			]),
		],
	}
}

export function getAvatarResourceStructuredData(): JsonLdObject {
	const url = absoluteUrl("/resources/avatar")
	const description =
		"A free collection of production-ready UI avatars for React, Figma, dashboards, and design systems."

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": ["CollectionPage", "ImageGallery"],
				"@id": `${url}#collection`,
				name: "Free UI Avatar Pack for React and Figma",
				description,
				url,
				isAccessibleForFree: true,
				publisher: getPublisherSchema(),
				primaryImageOfPage: {
					"@type": "ImageObject",
					url: absoluteUrl("/avatar/header-2.jpg"),
				},
				inLanguage: "en",
			},
			getBreadcrumbSchema([
				{ name: "Home", item: absoluteUrl("/") },
				{
					name: "Resources",
					item: absoluteUrl("/docs/getting-started/resources"),
				},
				{ name: "UI Avatars" },
			]),
		],
	}
}

export function getBlogIndexStructuredData({
	posts,
}: {
	posts: Array<{ title: string; url: string }>
}): JsonLdObject {
	const url = absoluteUrl("/blog")

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Blog",
				"@id": `${url}#blog`,
				name: "Radian Blog",
				description:
					"Product updates, technical guides, and design system insights from the Radian team.",
				url,
				publisher: getPublisherSchema(),
				inLanguage: "en",
				blogPost: posts.map((post) => ({
					"@type": "BlogPosting",
					headline: post.title,
					url: post.url,
				})),
			},
			getBreadcrumbSchema([
				{ name: "Home", item: absoluteUrl("/") },
				{ name: "Blog" },
			]),
		],
	}
}

export function getBlogPostStructuredData({
	title,
	description,
	url,
	image,
	datePublished,
	authors,
}: {
	title: string
	description: string
	url: string
	image: string
	datePublished: string
	authors: Array<{ name: string; url?: string }>
}): JsonLdObject {
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "BlogPosting",
				"@id": `${url}#article`,
				headline: title,
				description,
				url,
				mainEntityOfPage: {
					"@type": "WebPage",
					"@id": url,
				},
				image,
				datePublished,
				author: authors.map((author) => ({
					"@type": "Person",
					name: author.name,
					...(author.url ? { url: author.url } : {}),
				})),
				publisher: getPublisherSchema(),
				inLanguage: "en",
			},
			getBreadcrumbSchema([
				{ name: "Home", item: absoluteUrl("/") },
				{ name: "Blog", item: absoluteUrl("/blog") },
				{ name: title },
			]),
		],
	}
}
