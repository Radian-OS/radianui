import {
	brandLogoCover,
	brandLogoUseCasePreviews,
} from "@/app/(resources)/resources/(brand-logos)/components/brand-logo-previews"
import brandLogosManifest from "@/app/(resources)/resources/(brand-logos)/components/brand-logos-manifest.generated.json"
import type {
	BrandLogoTheme,
	BrandLogoColorway,
	BrandLogoVariant,
} from "@/app/(resources)/resources/(brand-logos)/components/brand-logos-data"
import { resources } from "@/config/resource-previews"
import { AVATAR_SHADOW_MAP } from "@/constants/avatar-shadow-map"
import { BACKGROUNDS, GRADIENT_IMAGES } from "@/constants/tone-filter-data"
import { AVATARS, getAvatarUrl } from "@/constants/avatar-playground-utils"
import { websiteMetadata } from "@/config/website-metadata-config"

import {
	flagNames,
	getFlagPagePath,
	getFlagSvgUrl,
} from "@/app/(resources)/resources/(flags)/components/flags-data"
import {
	brandLogos,
	getBrandLogoPagePath,
	getBrandLogoSvgUrl,
} from "@/app/(resources)/resources/(brand-logos)/components/brand-logos-data"

const absoluteUrl = (path: string) =>
	new URL(path, `${websiteMetadata.url}/`).toString()

function escapeXml(value: string) {
	return value.replace(
		/[<>&"']/g,
		(character) =>
			({
				"<": "&lt;",
				">": "&gt;",
				"&": "&amp;",
				'"': "&quot;",
				"'": "&apos;",
			})[character]!
	)
}

export function generateResourceImageSitemap() {
	const previews = resources.flatMap((resource) => [
		resource.lightUrl,
		resource.darkUrl,
	])
	const entries: Array<{ path: string; images: string[] }> = [
		{ path: "/resources", images: previews },
		{ path: "/docs/getting-started/resources", images: previews },
		...resources
			.filter((resource) => resource.link)
			.map((resource) => ({
				path: `/resources/${resource.link}`,
				images: [resource.lightUrl, resource.darkUrl],
			})),
		{
			path: "/resources/avatar",
			images: [
				...AVATARS,
				...AVATARS.map((_, index) => getAvatarUrl(index, true)),
				...BACKGROUNDS,
				...GRADIENT_IMAGES,
				...AVATAR_SHADOW_MAP,
			],
		},
		{
			path: "/resources/flags",
			images: flagNames.map((name) => getFlagSvgUrl(name)),
		},
		{
			path: "/resources/brand-logos",
			images: [
				brandLogoCover.light,
				brandLogoCover.dark,
				...brandLogoUseCasePreviews.flatMap((preview) => [
					preview.light,
					preview.dark,
				]),
				...brandLogos.map((brand) =>
					getBrandLogoSvgUrl(brand.id, "light", "colored", "icon")
				),
			],
		},
		...flagNames.map((name) => ({
			path: getFlagPagePath(name),
			images: [getFlagSvgUrl(name)],
		})),
		...brandLogos.map((brand) => ({
			path: getBrandLogoPagePath(brand.id),
			images: brandLogosManifest.themes.flatMap((theme) =>
				brandLogosManifest.colorways.flatMap((colorway) =>
					brandLogosManifest.variants.map((variant) =>
						getBrandLogoSvgUrl(
							brand.id,
							theme as BrandLogoTheme,
							colorway as BrandLogoColorway,
							variant as BrandLogoVariant
						)
					)
				)
			),
		})),
	]
	const pages = new Map<string, Set<string>>()
	for (const { path, images } of entries) {
		const urls = pages.get(path) ?? new Set<string>()
		for (const image of images) urls.add(absoluteUrl(image))
		pages.set(path, urls)
	}
	// Image sitemaps allow up to 1,000 images per URL entry.
	const urls = Array.from(pages).flatMap(([path, images]) => {
		const list = Array.from(images)
		const chunks: string[] = []
		for (let offset = 0; offset < list.length; offset += 1000) {
			chunks.push(
				`<url><loc>${escapeXml(absoluteUrl(path))}</loc>${list
					.slice(offset, offset + 1000)
					.map(
						(image) =>
							`<image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`
					)
					.join("")}</url>`
			)
		}
		return chunks
	})
	return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls.join("")}</urlset>`
}
