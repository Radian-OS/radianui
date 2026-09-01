import type { CSSProperties } from "react"
import { AVATAR_SHADOW_MAP } from "./avatar-shadow-map"
import { SOLID_COLORS } from "./tone-filter-data"

export const AVATAR_BLEND_OPACITY = 0.15

export const SOLID_COLOR_MAP: Record<string, string> = Object.fromEntries(
	SOLID_COLORS.map((c) => {
		const match = c.className.match(/bg-\[(#[0-9a-fA-F]+)\]/i)
		return [c.id, match ? match[1] : "#FFFFFF"]
	})
)

const IMAGE_BACKGROUND_TONE_MAP: Record<string, string> = {
	Amber: "Amber/100",
	Blue: "Blue/100",
	Cyan: "Teal/100",
	"Dark Orchid": "Dark-Orchid/100",
	Emerald: "Emerald/100",
	Fuchsia: "Magenta/100",
	Green: "Green/100",
	Grey: "Cool-Gray/L94%",
	"Light Blue": "Light-Blue/100",
	Magenta: "Magenta/100",
	Neon: "Neon/100",
	Orange: "Orange/100",
	Purple: "Purple/100",
	Red: "Red/100",
	Rose: "Rose/100",
	Teal: "Teal/100",
	"Violet Blue": "Violet-Blue/100",
	White: "Cool-Gray/L100%",
	Yellow: "Yellow/100",
}

export function getImageBackgroundTint(tone: string): string | undefined {
	if (!tone.startsWith("http") && !tone.startsWith("/")) return undefined

	const filename = tone.split("/").pop()?.split("?")[0] ?? ""
	const imageName = filename
		.replace(/^(IMG|Grad)-/, "")
		.replace(/\.[^.]+$/, "")
		.replace(/%20/gi, " ")

	const matchingTone = IMAGE_BACKGROUND_TONE_MAP[imageName]
	return matchingTone ? SOLID_COLOR_MAP[matchingTone] : undefined
}

export type GradientDef = {
	from?: string
	to?: string
	base?: string
	overlayFrom?: string
	overlayTo?: string
}

export const SHEEN_OVERLAY = {
	overlayFrom: "rgba(255, 255, 255, 0)",
	overlayTo: "rgba(36, 46, 66, 0.16)",
} as const

export const GRADIENT_MAP: Record<string, GradientDef> = Object.fromEntries(
	Object.entries(SOLID_COLOR_MAP).map(([id, hex]) => [
		`grad-${id}`,
		{ base: hex, ...SHEEN_OVERLAY },
	])
)

export function getToneStyle(tone: string): CSSProperties {
	if (tone === "none") {
		return { backgroundColor: "transparent" }
	}
	if (SOLID_COLOR_MAP[tone]) {
		return { backgroundColor: SOLID_COLOR_MAP[tone] }
	}
	const gradient = GRADIENT_MAP[tone]
	if (gradient) {
		if (gradient.base) {
			return {
				backgroundColor: gradient.base,
				backgroundImage: `linear-gradient(180deg, ${gradient.overlayFrom} 0%, ${gradient.overlayTo} 100%)`,
			}
		}
		return {
			background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
		}
	}
	if (tone.startsWith("grad-custom:")) {
		const parts = tone.split(":")
		return {
			background: `linear-gradient(135deg, ${parts[1]}, ${parts[2]})`,
		}
	}
	if (tone.startsWith("radian:")) {
		const colorName = tone.slice("radian:".length)
		return { backgroundColor: `var(--color-${colorName}-focus)` }
	}
	if (tone.startsWith("#")) {
		return { backgroundColor: tone }
	}
	if (tone.startsWith("http") || tone.startsWith("/")) {
		return {
			backgroundImage: `url(${tone})`,
			backgroundSize: "104% 104%",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
		}
	}
	return {}
}

/**
 * Resolves a `radian:<name>` tone to an actual color string by reading
 * the computed value of the CSS custom property from the DOM.
 * Falls back to a light gray when running server-side or if the variable is empty.
 */
export function resolveRadianColor(tone: string): string {
	if (!tone.startsWith("radian:")) return ""
	const colorName = tone.slice("radian:".length)
	if (typeof window === "undefined") return "#f3f4f6"
	const resolved = getComputedStyle(document.documentElement)
		.getPropertyValue(`--color-${colorName}-focus`)
		.trim()
	return resolved || "#f3f4f6"
}

export const AVATARS = Array.from(
	{ length: 216 },
	(_, i) =>
		`https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.1/packages/avatars/src/${i + 1}.png`
)

// Maps each category to the avatar numbers (1-indexed) that belong to it.
// "all" is handled separately and shows every avatar.
export const CATEGORY_AVATAR_MAP: Record<string, number[]> = {
	professional: [
		9, 11, 22, 27, 31, 32, 40, 41, 48, 52, 71, 72, 78, 79, 80, 83, 85, 89, 90,
		91, 92, 93, 100, 101, 105, 118, 125, 132, 133, 136, 139, 142, 144, 156, 158,
		169, 173, 182, 195, 196, 202, 208, 210, 214,
	],
	casual: [
		1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24,
		25, 26, 28, 29, 30, 33, 34, 35, 36, 37, 38, 39, 42, 43, 44, 45, 46, 47, 49,
		50, 51, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
		70, 73, 74, 75, 76, 77, 81, 82, 84, 86, 87, 88, 94, 95, 96, 97, 98, 99, 102,
		103, 104, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 119,
		120, 121, 122, 123, 124, 126, 127, 128, 129, 130, 131, 134, 135, 137, 138,
		140, 141, 143, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 157,
		159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 170, 171, 172, 174, 175,
		176, 177, 178, 179, 180, 181, 183, 184, 185, 186, 187, 188, 189, 190, 191,
		192, 193, 194, 197, 198, 199, 200, 201, 204, 206, 209, 211, 212, 213, 215,
		216,
	],
	male: [
		1, 3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 21, 23, 24, 26, 29, 31, 34, 35, 38,
		39, 42, 45, 46, 50, 51, 53, 55, 56, 57, 59, 61, 63, 67, 68, 70, 71, 72, 73,
		74, 76, 77, 78, 81, 87, 94, 100, 102, 103, 104, 105, 107, 108, 113, 115,
		116, 117, 118, 119, 120, 124, 125, 126, 127, 128, 129, 130, 133, 135, 136,
		137, 142, 144, 145, 146, 149, 150, 151, 155, 159, 160, 162, 164, 165, 166,
		167, 169, 174, 180, 183, 185, 186, 187, 188, 190, 194, 195, 198, 199, 200,
	],
	female: [
		2, 5, 7, 9, 11, 13, 15, 17, 19, 22, 25, 27, 28, 30, 32, 33, 36, 37, 40, 43,
		44, 47, 49, 52, 54, 58, 60, 62, 64, 65, 66, 69, 75, 79, 80, 82, 84, 85, 86,
		88, 89, 90, 91, 92, 93, 95, 96, 97, 98, 99, 101, 106, 109, 110, 111, 112,
		114, 121, 122, 123, 131, 132, 134, 138, 139, 140, 141, 143, 147, 148, 152,
		153, 154, 156, 157, 161, 163, 168, 170, 171, 172, 173, 175, 176, 177, 178,
		179, 181, 184, 189, 191, 192, 193, 196, 197,
	],
}

/**
 * Builds useful, unique alternative text from the metadata associated with an
 * avatar. Keep this in one place so filtered and customized avatars retain the
 * same identity while their background description changes.
 */
export function getAvatarAltText(avatarNumber: number, tone: string): string {
	const style = CATEGORY_AVATAR_MAP.professional.includes(avatarNumber)
		? "professional"
		: "casual"
	const presentation = CATEGORY_AVATAR_MAP.female.includes(avatarNumber)
		? "female"
		: "male"

	let background = "neutral background"
	if (tone === "none") {
		background = "transparent background"
	} else if (tone.startsWith("#")) {
		background = `${tone} background`
	} else if (tone.startsWith("radian:")) {
		background = `${tone.slice("radian:".length).replaceAll("-", " ")} background`
	} else if (tone.startsWith("http") || tone.startsWith("/")) {
		const filename = tone.split("/").pop()?.split("?")[0] ?? "custom"
		const name = filename
			.replace(/^(IMG|Grad)-/, "")
			.replace(/\.[^.]+$/, "")
			.replace(/%20/gi, " ")
		background = `${name} background`
	} else if (tone !== "neutral") {
		background = `${tone.replace(/^grad-/, "").replaceAll("/", " ")} background`
	}

	return `${style[0].toUpperCase()}${style.slice(1)} ${presentation} UI avatar illustration ${avatarNumber} on a ${background}`
}

export function randomHexColor(): string {
	return `#${Math.floor(Math.random() * 0xffffff)
		.toString(16)
		.padStart(6, "0")}`
}

const SOLID_COLOR_VALUES = Object.values(SOLID_COLOR_MAP)

export function randomSolidMapColor(): string {
	return SOLID_COLOR_VALUES[
		Math.floor(Math.random() * SOLID_COLOR_VALUES.length)
	]
}

/**
 * Simple in-memory cache for fetched image data URLs.
 * Avoids re-fetching the same CDN image on repeated copy operations.
 */
const imageDataUrlCache = new Map<string, string>()

/**
 * Fetches an image URL and returns its data URL (base64).
 * Uses an in-memory cache to avoid redundant network requests.
 */
async function fetchImageAsDataUrl(url: string): Promise<string> {
	const cached = imageDataUrlCache.get(url)
	if (cached) return cached

	const res = await fetch(url)
	const buffer = await res.arrayBuffer()
	const contentType = res.headers.get("content-type") || "image/png"

	// Convert ArrayBuffer to base64 in chunks to avoid call stack limits
	const bytes = new Uint8Array(buffer)
	let binary = ""
	const chunkSize = 8192
	for (let i = 0; i < bytes.length; i += chunkSize) {
		binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize))
	}
	const base64 = btoa(binary)
	const dataUrl = `data:${contentType};base64,${base64}`

	imageDataUrlCache.set(url, dataUrl)
	return dataUrl
}

export async function generateEditableSvg(
	tone: string,
	src: string,
	avatarIndex?: number
): Promise<string> {
	const size = 1024

	// Kick off avatar & shadow fetch in parallel
	const avatarPromise = fetchImageAsDataUrl(src).catch(() => "")
	const shadowSrc =
		typeof avatarIndex === "number" && tone !== "none"
			? AVATAR_SHADOW_MAP[avatarIndex]
			: undefined
	const shadowPromise = shadowSrc
		? fetchImageAsDataUrl(shadowSrc).catch(() => "")
		: Promise.resolve("")

	// --- 1. Determine SVG root fill & child background element ---------------
	let bgElement = ""
	if (SOLID_COLOR_MAP[tone]) {
		bgElement = `<path id="background" data-locked="true" locked="true" d="M0 0h${size}v${size}H0z" fill="${SOLID_COLOR_MAP[tone]}" />`
	} else if (GRADIENT_MAP[tone]) {
		const g = GRADIENT_MAP[tone]
		if (g.base) {
			bgElement = `<defs><linearGradient id="bg-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${size}"><stop offset="0%" stop-color="#ffffff" stop-opacity="0" /><stop offset="100%" stop-color="#242e42" stop-opacity="0.16" /></linearGradient></defs><g id="background"><path data-locked="true" locked="true" d="M0 0h${size}v${size}H0z" fill="${g.base}" /><path data-locked="true" locked="true" d="M0 0h${size}v${size}H0z" fill="url(#bg-grad)" pointer-events="none" /></g>`
		} else {
			bgElement = `<defs><linearGradient id="bg-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${size}" y2="${size}"><stop offset="0%" stop-color="${g.from}" /><stop offset="100%" stop-color="${g.to}" /></linearGradient></defs><path id="background" data-locked="true" locked="true" d="M0 0h${size}v${size}H0z" fill="url(#bg-grad)" />`
		}
	} else if (tone.startsWith("grad-custom:")) {
		const parts = tone.split(":")
		bgElement = `<defs><linearGradient id="bg-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${size}" y2="${size}"><stop offset="0%" stop-color="${parts[1]}" /><stop offset="100%" stop-color="${parts[2]}" /></linearGradient></defs><path id="background" data-locked="true" locked="true" d="M0 0h${size}v${size}H0z" fill="url(#bg-grad)" />`
	} else if (tone.startsWith("#")) {
		bgElement = `<path id="background" data-locked="true" locked="true" d="M0 0h${size}v${size}H0z" fill="${tone}" />`
	} else if (tone.startsWith("radian:")) {
		const color = resolveRadianColor(tone)
		bgElement = `<path id="background" data-locked="true" locked="true" d="M0 0h${size}v${size}H0z" fill="${color}" />`
	} else if (tone.startsWith("http") || tone.startsWith("/")) {
		try {
			const base64 = await fetchImageAsDataUrl(tone)
			bgElement = `<image id="background" data-locked="true" locked="true" href="${base64}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid slice" />`
		} catch {
			bgElement = `<path id="background" data-locked="true" locked="true" d="M0 0h${size}v${size}H0z" fill="#f3f4f6" />`
		}
	}

	// --- 2. Await avatar & shadow data URLs ----------------------------------
	const avatarDataUrl = await avatarPromise
	if (!avatarDataUrl) return ""
	const shadowDataUrl = await shadowPromise

	// --- 3. Assemble SVG: Background → shadow (hard-light) → avatar ----------
	return [
		`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`,
		bgElement ? `<!-- Background Layer -->\n${bgElement}` : "",
		shadowDataUrl
			? `<image id="shadow" data-locked="true" locked="true" style="mix-blend-mode:hard-light" href="${shadowDataUrl}" width="${size}" height="${size}" />`
			: "",
		`<image id="avatar" data-locked="true" locked="true" href="${avatarDataUrl}" width="${size}" height="${size}" />`,
		`</svg>`,
	].join("\n")
}

/**
 * Picks a random avatar, generates an editable SVG with the given background
 * tone, and copies it to the clipboard as text so it can be pasted in Figma.
 * Returns the avatar image URL and index on success, or `null` on failure.
 *
 * @param tone - The background tone to apply. Defaults to `"none"` (transparent).
 */
export async function copyRandomAvatar(
	tone: string = "none"
): Promise<{ src: string; index: number } | null> {
	const avatarIndex = Math.floor(Math.random() * AVATARS.length)
	const src = AVATARS[avatarIndex]

	// Create the ClipboardItem synchronously (required by Safari) with a
	// deferred Promise for the actual blob content.
	const svgBlobPromise = generateEditableSvg(tone, src, avatarIndex).then(
		(svg) => {
			if (!svg) throw new Error("SVG generation failed")
			return new Blob([svg], { type: "text/plain" })
		}
	)

	try {
		await navigator.clipboard.write([
			new ClipboardItem({ "text/plain": svgBlobPromise }),
		])
		return { src, index: avatarIndex }
	} catch {
		// Fallback for browsers that don't support Promise in ClipboardItem
		try {
			const svg = await generateEditableSvg(tone, src, avatarIndex)
			if (!svg) return null
			await navigator.clipboard.writeText(svg)
			return { src, index: avatarIndex }
		} catch {
			return null
		}
	}
}
