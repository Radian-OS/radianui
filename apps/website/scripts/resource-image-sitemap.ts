import { existsSync, readdirSync, statSync, readFileSync } from "node:fs"
import { join, resolve, relative, sep } from "node:path"
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

const absoluteUrl = (path: string) =>
	new URL(path, `${websiteMetadata.url}/`).toString()
const imageExtension = /\.(?:svg|png|jpe?g|webp|avif|gif)$/i

function filesIn(directory: string): string[] {
	if (!existsSync(directory)) return []
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const path = join(directory, entry.name)
		return entry.isDirectory() ? filesIn(path) : entry.isFile() ? [path] : []
	})
}

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

export interface ResourceImageSitemapOptions {
	publicDirectory?: string
	appDirectory?: string
}

export function generateResourceImageSitemap(
	options: ResourceImageSitemapOptions = {}
) {
	const publicDirectory = resolve(
		options.publicDirectory ?? join(process.cwd(), "public")
	)
	const appDirectory = resolve(
		options.appDirectory ?? join(process.cwd(), "src/app")
	)
	const routes = filesIn(appDirectory)
		.filter((path) => /(?:^|[/\\])page\.(?:tsx|ts|jsx|js)$/.test(path))
		.map((path) =>
			relative(appDirectory, path)
				.split(sep)
				.slice(0, -1)
				.filter((part) => !part.startsWith("(") && !part.startsWith("@"))
				.join("/")
		)
	const pageExists = (path: string) =>
		routes.some((route) => {
			const parts = path.replace(/^\//, "").split("/")
			const segments = route.split("/")
			return (
				parts.length === segments.length &&
				segments.every(
					(segment, index) =>
						segment === parts[index] || /^\[[^\]]+\]$/.test(segment)
				)
			)
		})
	const localImageExists = (image: string) => {
		const url = new URL(image, `${websiteMetadata.url}/`)
		if (url.origin !== new URL(websiteMetadata.url).origin) return true // Published external resource catalogs.
		const path = resolve(
			publicDirectory,
			`.${decodeURIComponent(url.pathname)}`
		)
		return (
			path.startsWith(`${publicDirectory}${sep}`) &&
			existsSync(path) &&
			statSync(path).isFile()
		)
	}
	const entries: Array<{ path: string; images: string[] }> = []
	const availableResources = resources.filter(
		(resource) => !resource.link || pageExists(`/resources/${resource.link}`)
	)
	const previews = availableResources.flatMap((resource) => [
		resource.lightUrl,
		resource.darkUrl,
	])
	entries.push(
		{ path: "/resources", images: previews },
		{ path: "/docs/getting-started/resources", images: previews }
	)
	for (const resource of availableResources) {
		if (!resource.link || resource.comingSoon) continue
		const images = filesIn(join(publicDirectory, resource.link))
			.filter((path) => imageExtension.test(path))
			.map((path) => `/${relative(publicDirectory, path).split(sep).join("/")}`)
		entries.push({
			path: `/resources/${resource.link}`,
			images: [resource.lightUrl, resource.darkUrl, ...images],
		})
	}
	if (pageExists("/resources/avatar"))
		entries.push({
			path: "/resources/avatar",
			images: [
				...AVATARS,
				...AVATARS.map((_, index) => getAvatarUrl(index, true)),
				...BACKGROUNDS,
				...GRADIENT_IMAGES,
				...AVATAR_SHADOW_MAP,
			],
		})
	if (pageExists("/resources/flags")) {
		entries.push({
			path: "/resources/flags",
			images: flagNames.map(getFlagSvgUrl),
		})
		for (const name of flagNames)
			if (pageExists(getFlagPagePath(name)))
				entries.push({
					path: getFlagPagePath(name),
					images: [getFlagSvgUrl(name)],
				})
	}
	// The catalog contains metadata only; every logo image is served by jsDelivr.
	if (pageExists("/resources/brand-logos")) {
		const catalogPath = join(
			appDirectory,
			"(resources)/resources/(brand-logos)/components/brand-logos-catalog.json"
		)
		if (existsSync(catalogPath)) {
			const catalog = JSON.parse(readFileSync(catalogPath, "utf8")) as {
				categories: { slug: string; brands: string[] }[]
			}
			for (const category of catalog.categories) {
				for (const brand of category.brands) {
					const images = ["icon", "wordmark"].map(
						(variant) =>
							`https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/colored/${category.slug}/${variant}/${brand}.svg`
					)
					entries.push({ path: "/resources/brand-logos", images: [images[0]] })
					const path = `/resources/brand-logos/${brand}`
					if (pageExists(path)) entries.push({ path, images })
				}
			}
		}
	}
	const pages = new Map<string, Set<string>>()
	for (const { path, images } of entries) {
		const urls = pages.get(path) ?? new Set<string>()
		for (const image of images)
			if (localImageExists(image)) urls.add(absoluteUrl(image))
		if (urls.size) pages.set(path, urls)
	}
	const urls = Array.from(pages).flatMap(([path, images]) => {
		const list = Array.from(images)
		const chunks: string[] = []
		for (let offset = 0; offset < list.length; offset += 1000)
			chunks.push(
				`<url><loc>${escapeXml(absoluteUrl(path))}</loc>${list
					.slice(offset, offset + 1000)
					.map(
						(image) =>
							`<image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`
					)
					.join("")}</url>`
			)
		return chunks
	})
	return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls.join("")}</urlset>`
}
