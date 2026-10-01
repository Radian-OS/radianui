import type {
	BrandLogoColorway,
	BrandLogoId,
	BrandLogoTheme,
	BrandLogoVariant,
} from "./brand-logos-data"
import {
	getBrandLogoFallbackUrl,
	getBrandLogoSvgUrl,
	getLogoDimensions,
} from "./brand-logos-data"

const svgCache = new Map<string, Promise<string>>()

function getCacheKey(
	id: BrandLogoId,
	theme: BrandLogoTheme,
	colorway: BrandLogoColorway,
	variant: BrandLogoVariant
) {
	return `${id}:${theme}:${colorway}:${variant}`
}

const SVG_STORAGE_PREFIX = "radian-brand-svg:"

export async function fetchBrandLogoSvg(
	id: BrandLogoId,
	theme: BrandLogoTheme = "light",
	colorway: BrandLogoColorway = "colored",
	variant: BrandLogoVariant = "icon"
): Promise<string> {
	const key = getCacheKey(id, theme, colorway, variant)
	const cached = svgCache.get(key)
	if (cached) return cached

	if (typeof window !== "undefined") {
		try {
			const persisted = window.sessionStorage.getItem(
				`${SVG_STORAGE_PREFIX}${key}`
			)
			if (persisted && /^\s*<svg\b/i.test(persisted)) {
				const resolved = Promise.resolve(persisted)
				svgCache.set(key, resolved)
				return resolved
			}
		} catch {
			// Storage access might fail in restricted contexts
		}
	}

	const cdnUrl = getBrandLogoSvgUrl(id, theme, colorway, variant)
	const fallbackUrl = getBrandLogoFallbackUrl(id, theme, colorway, variant)

	const svgPromise = (async () => {
		try {
			const response = await fetch(cdnUrl)
			if (response.ok) {
				const svg = await response.text()
				if (/^\s*<svg\b/i.test(svg)) {
					const trimmed = svg.trim()
					try {
						window.sessionStorage.setItem(
							`${SVG_STORAGE_PREFIX}${key}`,
							trimmed
						)
					} catch {
						// Quota exceeded
					}
					return trimmed
				}
			}
		} catch {
			// Ignore CDN failure and proceed to safe proxy fallback
		}

		const fallbackResponse = await fetch(fallbackUrl)
		if (!fallbackResponse.ok) {
			throw new Error(`Could not fetch ${id} SVG (${fallbackResponse.status})`)
		}
		const svg = await fallbackResponse.text()
		if (!/^\s*<svg\b/i.test(svg)) {
			throw new Error(`Invalid SVG response for ${id}`)
		}
		const trimmed = svg.trim()
		try {
			window.sessionStorage.setItem(`${SVG_STORAGE_PREFIX}${key}`, trimmed)
		} catch {
			// Quota exceeded
		}
		return trimmed
	})()

	svgCache.set(key, svgPromise)
	svgPromise.catch(() => svgCache.delete(key))
	return svgPromise
}

export function loadSvgImage(svg: string) {
	return new Promise<{ image: HTMLImageElement; objectUrl: string }>(
		(resolve, reject) => {
			const objectUrl = URL.createObjectURL(
				new Blob([svg], { type: "image/svg+xml" })
			)
			const image = new Image()

			image.onload = () => resolve({ image, objectUrl })
			image.onerror = () => {
				URL.revokeObjectURL(objectUrl)
				reject(new Error("Could not render logo SVG to image"))
			}
			image.src = objectUrl
		}
	)
}

export async function renderBrandLogoPng(
	id: BrandLogoId,
	theme: BrandLogoTheme = "light",
	colorway: BrandLogoColorway = "colored",
	variant: BrandLogoVariant = "icon",
	scale = 4
): Promise<Blob> {
	const svg = await fetchBrandLogoSvg(id, theme, colorway, variant)
	const { image, objectUrl } = await loadSvgImage(svg)

	try {
		const dimensions = getLogoDimensions(variant)
		const width = Math.round(dimensions.width * scale)
		const height = Math.round(dimensions.height * scale)

		const canvas = document.createElement("canvas")
		canvas.width = width
		canvas.height = height

		const context = canvas.getContext("2d")
		if (!context) throw new Error("Canvas context is not available")

		context.imageSmoothingEnabled = true
		context.imageSmoothingQuality = "high"
		context.drawImage(image, 0, 0, width, height)

		return await new Promise<Blob>((resolve, reject) => {
			canvas.toBlob((blob) => {
				if (blob) resolve(blob)
				else reject(new Error("Could not export logo PNG"))
			}, "image/png")
		})
	} finally {
		URL.revokeObjectURL(objectUrl)
	}
}

export function downloadBlob(blob: Blob, filename: string) {
	const objectUrl = URL.createObjectURL(blob)
	const link = document.createElement("a")
	link.href = objectUrl
	link.download = filename
	document.body.appendChild(link)
	link.click()
	link.remove()
	window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
}
