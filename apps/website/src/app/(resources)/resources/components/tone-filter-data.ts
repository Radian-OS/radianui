export interface SolidColor {
	id: string
	className: string
}

export interface RadianColor {
	id: string
	label: string
	variable: string
}

export type ColorMode = "static" | "radian"

export interface ToneFilterDropdownProps {
	value: string
	onChange: (value: string) => void
	colorMode?: ColorMode
}

export const SOLID_COLORS: SolidColor[] = [
	{ id: "Cool-Gray/L100%", className: "bg-[#FFFFFF]" },
	{ id: "Cool-Gray/L94%", className: "bg-[#EEEFF1]" },
	{ id: "Red/100", className: "bg-[#FDD8D8]" },
	{ id: "Orange/100", className: "bg-[#FFE4D6]" },
	{ id: "Amber/100", className: "bg-[#FFEBC2]" },
	{ id: "Yellow/100", className: "bg-[#FFF3B8]" },
	{ id: "Neon/100", className: "bg-[#E7FFB8]" },
	{ id: "Green/100", className: "bg-[#D1FAD1]" },
	{ id: "Emerald/100", className: "bg-[#D1FADF]" },
	{ id: "Teal/100", className: "bg-[#BCFFEE]" },
	{ id: "Light-Blue/100", className: "bg-[#D1E6FA]" },
	{ id: "Blue/100", className: "bg-[#DCDFF9]" },
	{ id: "Violet-Blue/100", className: "bg-[#E5DFFB]" },
	{ id: "Purple/100", className: "bg-[#E9DFFB]" },
	{ id: "Dark-Orchid/100", className: "bg-[#F3DBFF]" },
	{ id: "Magenta/100", className: "bg-[#FBDAF0]" },
	{ id: "Rose/100", className: "bg-[#FBDAE5]" },
]

export const RADIAN_COLORS: RadianColor[] = [
	{ id: "radian:red", label: "Red", variable: "--color-red-focus" },
	{ id: "radian:orange", label: "Orange", variable: "--color-orange-focus" },
	{ id: "radian:amber", label: "Amber", variable: "--color-amber-focus" },
	{ id: "radian:yellow", label: "Yellow", variable: "--color-yellow-focus" },
	{ id: "radian:neon", label: "Neon", variable: "--color-neon-focus" },
	{ id: "radian:green", label: "Green", variable: "--color-green-focus" },
	{ id: "radian:emerald", label: "Emerald", variable: "--color-emerald-focus" },
	{ id: "radian:teal", label: "Teal", variable: "--color-teal-focus" },
	{ id: "radian:cyan", label: "Cyan", variable: "--color-cyan-focus" },
	{
		id: "radian:light-blue",
		label: "Light Blue",
		variable: "--color-light-blue-focus",
	},
	{ id: "radian:blue", label: "Blue", variable: "--color-blue-focus" },
	{
		id: "radian:violet-blue",
		label: "Violet Blue",
		variable: "--color-violet-blue-focus",
	},
	{ id: "radian:purple", label: "Purple", variable: "--color-purple-focus" },
	{
		id: "radian:dark-orchid",
		label: "Dark Orchid",
		variable: "--color-dark-orchid-focus",
	},
	{ id: "radian:fuchsia", label: "Fuchsia", variable: "--color-fuchsia-focus" },
	{ id: "radian:magenta", label: "Magenta", variable: "--color-magenta-focus" },
	{ id: "radian:rose", label: "Rose", variable: "--color-rose-focus" },
	{ id: "radian:neutral", label: "Neutral", variable: "--color-neutral-focus" },
]

const CDN_BASE_URL =
	"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/avatars-background/src"

export const CDN_COLOR_NAMES = [
	"Amber",
	"Blue",
	"Cyan",
	"Dark%20Orchid",
	"Emerald",
	"Fuchsia",
	"Green",
	"Grey",
	"Light%20Blue",
	"Magenta",
	"Neon",
	"Orange",
	"Purple",
	"Red",
	"Rose",
	"Teal",
	"Violet%20Blue",
	"White",
	"Yellow",
]

export function getCdnColorDisplayName(cdnName: string): string {
	return decodeURIComponent(cdnName)
}

export const GRADIENT_COLOR_NAMES = CDN_COLOR_NAMES.filter(
	(color) => color !== "Emerald"
)

export const GRADIENT_IMAGES = GRADIENT_COLOR_NAMES.map(
	(color) => `${CDN_BASE_URL}/Grad-${color}.png`
)

export const BACKGROUNDS = CDN_COLOR_NAMES.map(
	(color) => `${CDN_BASE_URL}/IMG-${color}.png`
)

export function formatColorName(id: string): string {
	return id
		.replace(/\/.*$/, "")
		.split("-")
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(" ")
}

export type ActiveInfo =
	| { type: "solid"; label: string; swatch: SolidColor }
	| { type: "gradient-img"; label: string; swatch: string }
	| { type: "background"; label: string; swatch: string }
	| { type: "radian"; label: string; swatch: RadianColor | null }
	| { type: "special"; label: string; swatch: null }
	| {
			type: "gradient"
			label: string
			swatch: { id: string; from: string; to: string }
	  }
	| { type: "custom-hex"; label: string; swatch: string }
	| { type: "none"; label: string; swatch: null }

export function getActiveInfo(value: string): ActiveInfo {
	const solidMatch = SOLID_COLORS.find((c) => c.id === value)
	if (solidMatch) {
		return {
			label: formatColorName(solidMatch.id),
			type: "solid",
			swatch: solidMatch,
		}
	}

	const gradIdx = GRADIENT_IMAGES.indexOf(value)
	if (gradIdx !== -1) {
		return {
			label: `Gradient ${getCdnColorDisplayName(GRADIENT_COLOR_NAMES[gradIdx])}`,
			type: "gradient-img",
			swatch: GRADIENT_IMAGES[gradIdx],
		}
	}

	const bgIdx = BACKGROUNDS.indexOf(value)
	if (bgIdx !== -1) {
		return {
			label: `Background ${getCdnColorDisplayName(CDN_COLOR_NAMES[bgIdx])}`,
			type: "background",
			swatch: BACKGROUNDS[bgIdx],
		}
	}

	if (value.startsWith("radian:")) {
		const match = RADIAN_COLORS.find((c) => c.id === value) ?? null
		return {
			label: match?.label ?? "Radian Color",
			type: "radian",
			swatch: match,
		}
	}

	if (value === "custom-color") {
		return { label: "Custom Color", type: "special", swatch: null }
	}

	if (value.startsWith("grad-custom:")) {
		const parts = value.split(":")
		return {
			label: "Random Gradient",
			type: "gradient",
			swatch: { id: value, from: parts[1], to: parts[2] },
		}
	}

	if (value.startsWith("#")) {
		return { label: "Custom Color", type: "custom-hex", swatch: value }
	}

	if (value === "pick-color") {
		return { label: "Random Color", type: "special", swatch: null }
	}

	if (value === "pick-gradient") {
		return { label: "Random Gradient", type: "special", swatch: null }
	}

	if (value === "pick-background") {
		return { label: "Random Background", type: "special", swatch: null }
	}

	if (value === "upload-background") {
		return { label: "Upload Background", type: "special", swatch: null }
	}

	if (value === "none") {
		return { label: "None", type: "none", swatch: null }
	}

	return { label: "Neutral", type: "none", swatch: null }
}
