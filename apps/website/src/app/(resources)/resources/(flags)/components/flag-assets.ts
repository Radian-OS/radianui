import type { FlagName, FlagShape, FlagSize } from "./flags-data"
import { FLAG_SVG_VIEW_BOX, getFlagSvgUrl, getFlagViewBox } from "./flags-data"

const svgCache = new Map<FlagName, Promise<string>>()

export async function fetchFlagSvg(name: FlagName) {
	const cachedSvg = svgCache.get(name)
	if (cachedSvg) return cachedSvg

	const svgPromise = fetch(getFlagSvgUrl(name)).then(async (response) => {
		if (!response.ok) {
			throw new Error(`Could not fetch ${name} flag (${response.status})`)
		}

		const svg = await response.text()
		if (!/^\s*<svg\b/i.test(svg)) {
			throw new Error(`Invalid SVG response for ${name}`)
		}

		return svg.trim()
	})

	svgCache.set(name, svgPromise)
	svgPromise.catch(() => svgCache.delete(name))
	return svgPromise
}

function createRoundSvg(name: FlagName, source: string) {
	const match = source.match(/^\s*<svg\b([^>]*)>([\s\S]*)<\/svg>\s*$/i)
	if (!match) throw new Error(`Invalid SVG source for ${name}`)

	const [, rawAttributes, contents] = match
	const attributes = rawAttributes.replace(
		/\s(?:width|height|viewBox)=(['"])[^'"]*\1/gi,
		""
	)
	const [x, y, width, height] = getFlagViewBox(name, "round")
	const centerX = x + width / 2
	const centerY = y + height / 2
	const clipId = `radian-${name}-round-clip`

	return `<svg${attributes} width="${FLAG_SVG_VIEW_BOX[2]}" height="${FLAG_SVG_VIEW_BOX[3]}" viewBox="${x} ${y} ${width} ${height}"><defs><clipPath id="${clipId}"><circle cx="${centerX}" cy="${centerY}" r="${width / 2}" /></clipPath></defs><g clip-path="url(#${clipId})">${contents}</g></svg>`
}

export async function getFlagSvgMarkup(
	name: FlagName,
	shape: FlagShape = "flat"
) {
	const source = await fetchFlagSvg(name)
	return shape === "round" ? createRoundSvg(name, source) : source
}

function loadSvg(svg: string) {
	return new Promise<{ image: HTMLImageElement; objectUrl: string }>(
		(resolve, reject) => {
			const objectUrl = URL.createObjectURL(
				new Blob([svg], { type: "image/svg+xml" })
			)
			const image = new Image()

			image.onload = () => resolve({ image, objectUrl })
			image.onerror = () => {
				URL.revokeObjectURL(objectUrl)
				reject(new Error("Could not render flag SVG"))
			}
			image.src = objectUrl
		}
	)
}

export async function renderFlagPng(
	name: FlagName,
	shape: FlagShape,
	size: FlagSize
) {
	const svg = await getFlagSvgMarkup(name, shape)
	const { image, objectUrl } = await loadSvg(svg)

	try {
		const canvas = document.createElement("canvas")
		canvas.width = size
		canvas.height = size

		const context = canvas.getContext("2d")
		if (!context) throw new Error("Canvas is not available")

		context.drawImage(image, 0, 0, size, size)

		return await new Promise<Blob>((resolve, reject) => {
			canvas.toBlob((blob) => {
				if (blob) resolve(blob)
				else reject(new Error("Could not create PNG"))
			}, "image/png")
		})
	} finally {
		URL.revokeObjectURL(objectUrl)
	}
}
