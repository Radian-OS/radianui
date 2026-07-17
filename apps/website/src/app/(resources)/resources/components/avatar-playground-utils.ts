import type { CSSProperties } from "react"

export const SOLID_COLOR_MAP: Record<string, string> = {
	"Cool-Gray/L100%": "#FFFFFF",
	"Cool-Gray/L94%": "#EEEFF1",
	"Red/200": "#FFB2B2",
	"Orange/200": "#FFC9AD",
	"Amber/200": "#FFDD99",
	"Yellow/200": "#FFEA85",
	"Neon/200": "#D6FF85",
	"Green/200": "#B5F7B5",
	"Emerald/200": "#B1FBCA",
	"Teal/200": "#A3FFE8",
	"Light-Blue/200": "#C5E0FC",
	"Blue/200": "#C8CCF9",
	"Violet-Blue/200": "#D0C5FC",
	"Purple/200": "#D9C5FC",
	"Dark-Orchid/200": "#EBC2FF",
	"Magenta/200": "#F9C8E9",
	"Rose/200": "#FBBBD1",
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
	if (tone.startsWith("#")) {
		return { backgroundColor: tone }
	}
	if (tone.startsWith("http") || tone.startsWith("/")) {
		return {
			backgroundImage: `url(${tone})`,
			backgroundSize: "fill",
			backgroundPosition: "center",
		}
	}
	return {}
}

export const AVATARS = Array.from(
	{ length: 200 },
	(_, i) =>
		`https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/avatars/src/${i + 1}.png`
)

// Maps each category to the avatar numbers (1-indexed) that belong to it.
// "all" is handled separately and shows every avatar.
export const CATEGORY_AVATAR_MAP: Record<string, number[]> = {
	professional: [4, 6, 7, 8],
	casual: [1, 2, 3, 5],
	male: [1, 3, 4, 6, 8, 10, 12, 14],
	female: [2, 5, 7, 9, 11, 13],
	animated: [45, 78, 96],
}

export function randomHexColor(): string {
	return `#${Math.floor(Math.random() * 0xffffff)
		.toString(16)
		.padStart(6, "0")}`
}

export async function generateEditableSvg(
	tone: string,
	src: string
): Promise<string> {
	const size = 512

	// Build SVG background element
	let bgElement = ""
	if (SOLID_COLOR_MAP[tone]) {
		bgElement = `<rect width="${size}" height="${size}" fill="${SOLID_COLOR_MAP[tone]}" />`
	} else if (GRADIENT_MAP[tone]) {
		const g = GRADIENT_MAP[tone]
		if (g.base) {
			bgElement = `<defs><linearGradient id="bg-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0" /><stop offset="100%" stop-color="#242e42" stop-opacity="0.16" /></linearGradient></defs><rect width="${size}" height="${size}" fill="${g.base}" /><rect width="${size}" height="${size}" fill="url(#bg-grad)" />`
		} else {
			bgElement = `<defs><linearGradient id="bg-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${g.from}" /><stop offset="100%" stop-color="${g.to}" /></linearGradient></defs><rect width="${size}" height="${size}" fill="url(#bg-grad)" />`
		}
	} else if (tone.startsWith("grad-custom:")) {
		const parts = tone.split(":")
		bgElement = `<defs><linearGradient id="bg-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${parts[1]}" /><stop offset="100%" stop-color="${parts[2]}" /></linearGradient></defs><rect width="${size}" height="${size}" fill="url(#bg-grad)" />`
	} else if (tone.startsWith("#")) {
		bgElement = `<rect width="${size}" height="${size}" fill="${tone}" />`
	} else if (tone.startsWith("http") || tone.startsWith("/")) {
		// Embed background image as base64
		try {
			const res = await fetch(tone)
			const blob = await res.blob()
			const base64 = await new Promise<string>((resolve) => {
				const reader = new FileReader()
				reader.onloadend = () => resolve(reader.result as string)
				reader.readAsDataURL(blob)
			})
			bgElement = `<image href="${base64}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid slice" />`
		} catch {
			bgElement = `<rect width="${size}" height="${size}" fill="#f3f4f6" />`
		}
	}

	// Embed avatar as base64
	let avatarDataUrl = ""
	try {
		const res = await fetch(src)
		const blob = await res.blob()
		avatarDataUrl = await new Promise<string>((resolve) => {
			const reader = new FileReader()
			reader.onloadend = () => resolve(reader.result as string)
			reader.readAsDataURL(blob)
		})
	} catch {
		return ""
	}

	return [
		`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`,
		`<!-- Background Layer (editable in Figma) -->`,
		`<g id="background">`,
		bgElement || `<rect width="${size}" height="${size}" fill="#ffffff" />`,
		`</g>`,
		`<!-- Avatar Layer -->`,
		`<g id="avatar">`,
		`<image href="${avatarDataUrl}" width="${size}" height="${size}" />`,
		`</g>`,
		`</svg>`,
	].join("\n")
}
