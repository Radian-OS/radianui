import type { CSSProperties } from "react"

export const SOLID_COLOR_MAP: Record<string, string> = {
	"Cool-Gray/L100%": "#FFFFFF",
	"Cool-Gray/L94%": "#EEEFF1",
	"Red/100": "#FDD8D8",
	"Orange/100": "#FFE4D6",
	"Amber/100": "#FFEBC2",
	"Yellow/100": "#FFF3B8",
	"Neon/100": "#E7FFB8",
	"Green/100": "#D1FAD1",
	"Emerald/100": "#D1FADF",
	"Teal/100": "#BCFFEE",
	"Light-Blue/100": "#D1E6FA",
	"Blue/100": "#DCDFF9",
	"Violet-Blue/100": "#E5DFFB",
	"Purple/100": "#E9DFFB",
	"Dark-Orchid/100": "#F3DBFF",
	"Magenta/100": "#FBDAF0",
	"Rose/100": "#FBDAE5",
}

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
		.replace(/^IMG-/, "")
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
			backgroundSize: "100% 100%",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
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
