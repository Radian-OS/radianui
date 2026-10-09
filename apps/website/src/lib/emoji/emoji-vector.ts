import type * as HarfBuzz from "harfbuzzjs"
import type { EmojiData } from "./emoji-data"
import { exportColrSvg } from "./emoji-colr-svg"

let renderer: Promise<{ hb: typeof HarfBuzz; font: HarfBuzz.Font }> | undefined
const svgExports = new Map<string, Promise<string>>()

function loadRenderer() {
	if (!renderer)
		renderer = (async () => {
			// Serve the upstream ESM/WASM directly: its runtime locates WASM beside the module.
			const moduleUrl = "/fonts/emoji/harfbuzz/index.mjs"
			const [hb, response] = await Promise.all([
				import(/* webpackIgnore: true */ moduleUrl) as Promise<typeof HarfBuzz>,
				fetch("/fonts/emoji/Noto-COLRv1.ttf"),
			])
			if (!response.ok) throw new Error("Could not load vector emoji font")
			const blob = new hb.Blob(await response.arrayBuffer())
			return { hb, font: new hb.Font(new hb.Face(blob)) }
		})().catch((error) => {
			renderer = undefined
			throw error
		})
	return renderer
}

/** Export original COLRv1 paths and gradients; no embedded raster images or tracing. */
export function getEmojiVectorSvg(emoji: EmojiData): Promise<string> {
	const cached = svgExports.get(emoji.emoji)
	if (cached) return cached
	const result = loadRenderer()
		.then(({ hb, font }) =>
			centerVisibleArtwork(exportColrSvg(hb, font, emoji.emoji, emoji.name))
		)
		.catch((error) => {
			svgExports.delete(emoji.emoji)
			throw error
		})
	svgExports.set(emoji.emoji, result)
	return result
}

/** Rasterize only to measure bounds; the exported artwork remains vector paths. */
async function centerVisibleArtwork(markup: string) {
	const url = URL.createObjectURL(new Blob([markup], { type: "image/svg+xml" }))
	try {
		const image = new Image()
		await new Promise<void>((resolve, reject) => {
			image.onload = () => resolve()
			image.onerror = () => reject(new Error("Could not measure vector emoji"))
			image.src = url
		})
		const canvas = document.createElement("canvas")
		canvas.width = canvas.height = 512
		const context = canvas.getContext("2d", { willReadFrequently: true })
		if (!context) throw new Error("Could not measure vector emoji")
		context.drawImage(image, 0, 0)
		const pixels = context.getImageData(0, 0, 512, 512).data
		let left = 512,
			top = 512,
			right = -1,
			bottom = -1
		for (let y = 0; y < 512; y++)
			for (let x = 0; x < 512; x++) {
				if (pixels[(y * 512 + x) * 4 + 3] < 32) continue
				left = Math.min(left, x)
				right = Math.max(right, x)
				top = Math.min(top, y)
				bottom = Math.max(bottom, y)
			}
		if (right < left) throw new Error("Vector emoji has no visible artwork")
		const parsed = new DOMParser().parseFromString(markup, "image/svg+xml")
		const artwork = Array.from(parsed.documentElement.children).find(
			(node) => node.localName === "g"
		)!
		const dx = 256 - (left + right + 1) / 2
		const dy = 256 - (top + bottom + 1) / 2
		artwork.setAttribute(
			"transform",
			`translate(${dx} ${dy}) ${artwork.getAttribute("transform")}`
		)
		return new XMLSerializer().serializeToString(parsed.documentElement)
	} finally {
		URL.revokeObjectURL(url)
	}
}
