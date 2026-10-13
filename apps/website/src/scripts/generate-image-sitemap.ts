import { resources } from "@/config/resource-previews"
import { AVATARS } from "@/constants/avatar-playground-utils"
import { mkdirSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const { siteUrl } = require("../../next-sitemap.config.cjs") as {
	siteUrl: string
}
const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).toString()
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

function generateImageSitemap() {
	const previews = resources.flatMap((resource) => [
		resource.lightUrl,
		resource.darkUrl,
	])
	const entries: Array<{ path: string; images: string[] }> = [
		{ path: "/resources", images: previews },
		{ path: "/resources/avatar", images: AVATARS },
		{
			path: "/resources/flags",
			images: flagNames.map((name) => getFlagSvgUrl(name)),
		},
		{
			path: "/resources/brand-logos",
			images: brandLogos.map((brand) =>
				getBrandLogoSvgUrl(brand.id, "light", "colored", "icon")
			),
		},
		...flagNames.map((name) => ({
			path: getFlagPagePath(name),
			images: [getFlagSvgUrl(name)],
		})),
		...brandLogos.map((brand) => ({
			path: getBrandLogoPagePath(brand.id),
			images: [
				getBrandLogoSvgUrl(brand.id, "light", "colored", "icon"),
				getBrandLogoSvgUrl(brand.id, "light", "colored", "wordmark"),
			],
		})),
	]
	const pages = new Map<string, Set<string>>()
	for (const { path, images } of entries) {
		const urls = pages.get(path) ?? new Set<string>()
		for (const image of images) urls.add(absoluteUrl(image))
		pages.set(path, urls)
	}
	const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${Array.from(pages, ([path, images]) => `<url><loc>${escapeXml(absoluteUrl(path))}</loc>${Array.from(images, (image) => `<image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`).join("")}</url>`).join("")}</urlset>`
	mkdirSync("public/resources", { recursive: true })
	writeFileSync("public/resources/image-sitemap.xml", xml)
	console.log(`Generated resource image sitemap for ${siteUrl}`)
}

generateImageSitemap()
