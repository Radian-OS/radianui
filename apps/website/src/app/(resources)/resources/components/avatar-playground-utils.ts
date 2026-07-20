import type { CSSProperties } from "react"

export const AVATAR_BLEND_OPACITY = 0.2

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
			backgroundSize: "104% 104%",
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
	professional: [
		9, 11, 31, 32, 40, 52, 71, 72, 80, 85, 89, 90, 92, 100, 101, 110, 118, 125,
		132, 136, 139, 142, 144, 156, 173, 195,
	],
	casual: [
		1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
		24, 25, 26, 27, 28, 29, 30, 33, 34, 35, 36, 37, 38, 39, 41, 42, 43, 44, 45,
		46, 47, 48, 49, 50, 51, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65,
		66, 67, 68, 69, 70, 73, 74, 75, 76, 77, 78, 79, 81, 82, 83, 84, 86, 87, 88,
		91, 93, 94, 95, 96, 97, 98, 99, 102, 103, 104, 105, 106, 107, 108, 109, 111,
		112, 113, 114, 115, 116, 117, 119, 120, 121, 122, 123, 124, 126, 127, 128,
		129, 130, 131, 133, 134, 135, 137, 138, 140, 141, 143, 145, 146, 147, 148,
		149, 150, 151, 152, 153, 154, 155, 157, 158, 159, 160, 161, 162, 163, 164,
		165, 166, 167, 168, 169, 170, 171, 172, 174, 175, 176, 177, 178, 179, 180,
		181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 196,
		197, 198, 199, 200,
	],
	male: [
		1, 3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 21, 23, 24, 26, 29, 31, 34, 35, 38,
		39, 41, 42, 45, 46, 48, 50, 51, 53, 55, 56, 57, 59, 61, 63, 67, 68, 70, 71,
		72, 73, 74, 76, 77, 78, 81, 87, 94, 100, 102, 103, 104, 105, 107, 108, 113,
		115, 116, 117, 118, 119, 120, 124, 125, 126, 127, 128, 129, 130, 133, 135,
		136, 137, 142, 144, 145, 146, 149, 150, 151, 155, 159, 160, 162, 164, 165,
		166, 167, 169, 174, 180, 183, 185, 186, 187, 188, 190, 194, 195, 198, 199,
		200,
	],
	female: [
		2, 5, 7, 9, 11, 13, 15, 17, 19, 22, 25, 27, 28, 30, 32, 33, 36, 37, 40, 43,
		44, 47, 49, 52, 54, 58, 60, 62, 64, 65, 66, 69, 75, 79, 80, 82, 83, 84, 85,
		86, 88, 89, 90, 91, 92, 93, 95, 96, 97, 98, 99, 101, 106, 109, 110, 111,
		112, 114, 121, 122, 123, 131, 132, 134, 138, 139, 140, 141, 143, 147, 148,
		152, 153, 154, 156, 157, 158, 161, 163, 168, 170, 171, 172, 173, 175, 176,
		177, 178, 179, 181, 182, 184, 189, 191, 192, 193, 196, 197,
	],
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

export async function generateEditableSvg(
	tone: string,
	src: string
): Promise<string> {
	const size = 512
	const imageBackgroundTint = getImageBackgroundTint(tone)

	// Build SVG background element
	let bgElement = ""
	if (SOLID_COLOR_MAP[tone]) {
		bgElement = `<rect width="${size}" height="${size}" fill="${SOLID_COLOR_MAP[tone]}" />`
	} else if (GRADIENT_MAP[tone]) {
		const g = GRADIENT_MAP[tone]
		if (g.base) {
			bgElement = `<defs><linearGradient id="bg-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${size}"><stop offset="0%" stop-color="#ffffff" stop-opacity="0" /><stop offset="100%" stop-color="#242e42" stop-opacity="0.16" /></linearGradient></defs><rect width="${size}" height="${size}" fill="${g.base}" /><rect width="${size}" height="${size}" fill="url(#bg-grad)" />`
		} else {
			bgElement = `<defs><linearGradient id="bg-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${size}" y2="${size}"><stop offset="0%" stop-color="${g.from}" /><stop offset="100%" stop-color="${g.to}" /></linearGradient></defs><rect width="${size}" height="${size}" fill="url(#bg-grad)" />`
		}
	} else if (tone.startsWith("grad-custom:")) {
		const parts = tone.split(":")
		bgElement = `<defs><linearGradient id="bg-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${size}" y2="${size}"><stop offset="0%" stop-color="${parts[1]}" /><stop offset="100%" stop-color="${parts[2]}" /></linearGradient></defs><rect width="${size}" height="${size}" fill="url(#bg-grad)" />`
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

	// Keep the editable SVG visually consistent with the browser and PNG export:
	// the avatar is opaque, so the Color Burn fill has to sit above it. Figma
	// expects the layer itself at 100% opacity with a 20%-opaque color fill.
	let shadowElement = ""
	if (imageBackgroundTint) {
		shadowElement = `<rect width="${size}" height="${size}" fill="${imageBackgroundTint}" fill-opacity="${AVATAR_BLEND_OPACITY}" />`
	} else if (SOLID_COLOR_MAP[tone]) {
		shadowElement = `<rect width="${size}" height="${size}" fill="${SOLID_COLOR_MAP[tone]}" fill-opacity="${AVATAR_BLEND_OPACITY}" />`
	} else if (GRADIENT_MAP[tone]) {
		const gradient = GRADIENT_MAP[tone]
		if (gradient.base) {
			shadowElement = `<defs><linearGradient id="avatar-shadow-sheen" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${size}"><stop offset="0%" stop-color="#ffffff" stop-opacity="0" /><stop offset="100%" stop-color="#242e42" stop-opacity="0.16" /></linearGradient></defs><rect width="${size}" height="${size}" fill="${gradient.base}" fill-opacity="${AVATAR_BLEND_OPACITY}" /><rect width="${size}" height="${size}" fill="url(#avatar-shadow-sheen)" fill-opacity="${AVATAR_BLEND_OPACITY}" />`
		} else if (gradient.from && gradient.to) {
			shadowElement = `<defs><linearGradient id="avatar-shadow-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${size}" y2="${size}"><stop offset="0%" stop-color="${gradient.from}" /><stop offset="100%" stop-color="${gradient.to}" /></linearGradient></defs><rect width="${size}" height="${size}" fill="url(#avatar-shadow-grad)" fill-opacity="${AVATAR_BLEND_OPACITY}" />`
		}
	} else if (tone.startsWith("grad-custom:")) {
		const [, from, to] = tone.split(":")
		shadowElement = `<defs><linearGradient id="avatar-shadow-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${size}" y2="${size}"><stop offset="0%" stop-color="${from}" /><stop offset="100%" stop-color="${to}" /></linearGradient></defs><rect width="${size}" height="${size}" fill="url(#avatar-shadow-grad)" fill-opacity="${AVATAR_BLEND_OPACITY}" />`
	} else if (tone.startsWith("#")) {
		shadowElement = `<rect width="${size}" height="${size}" fill="${tone}" fill-opacity="${AVATAR_BLEND_OPACITY}" />`
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
		shadowElement
			? `<!-- Avatar Blend Layer --><g id="Shadow" style="mix-blend-mode:color-burn">${shadowElement}</g>`
			: "",
		`</svg>`,
	].join("\n")
}
