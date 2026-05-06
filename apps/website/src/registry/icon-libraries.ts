export const ICON_LIBRARIES = ["lucide", "hugeicons"] as const

export type IconLibrary = (typeof ICON_LIBRARIES)[number]

export const ICON_SLOTS = [
	"dropdown",
	"scrollUp",
	"scrollDown",
	"chevron",
	"separator",
	"previous",
	"next",
	"previous",
	"next",
	"submenu",
	"more",
	"plus",
	"check",
] as const

export type IconSlot = (typeof ICON_SLOTS)[number]

export const ICON_LIBRARY_LABELS: Record<IconLibrary, string> = {
	lucide: "Lucide",
	hugeicons: "Hugeicons",
}
