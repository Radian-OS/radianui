export const ICON_LIBRARIES = ["lucide", "hugeicons"] as const

export type IconLibrary = (typeof ICON_LIBRARIES)[number]

export const ICON_SLOTS = [
	"select.dropdown",
	"select.scrollUp",
	"select.scrollDown",
	"accordion.chevron",
	"breadcrumb.separator",
	"calendar.previous",
	"calendar.next",
	"carousel.previous",
	"carousel.next",
	"dropdown.submenu",
	"common.more",
	"common.plus",
] as const

export type IconSlot = (typeof ICON_SLOTS)[number]

export const ICON_LIBRARY_LABELS: Record<IconLibrary, string> = {
	lucide: "Lucide",
	hugeicons: "Hugeicons",
}
