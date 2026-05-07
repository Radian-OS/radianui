export const ICON_LIBRARIES = ["lucide", "hugeicons"] as const

export type IconLibrary = (typeof ICON_LIBRARIES)[number]

export const ICON_SLOT_REPLACEMENTS = [
	{
		slot: "down",
		lucideIcon: "ChevronDown",
		hugeiconsIcon: "ArrowDown01Icon",
	},
	{
		slot: "up",
		lucideIcon: "ChevronUp",
		hugeiconsIcon: "ArrowUp01Icon",
	},
	{
		slot: "right",
		lucideIcon: "ChevronRight",
		hugeiconsIcon: "ArrowRight01Icon",
	},
	{
		slot: "left",
		lucideIcon: "ChevronLeft",
		hugeiconsIcon: "ArrowLeft01Icon",
	},
	{
		slot: "threeDot",
		lucideIcon: "MoreHorizontal",
		hugeiconsIcon: "MoreHorizontalIcon",
	},
	{
		slot: "plus",
		lucideIcon: "Plus",
		hugeiconsIcon: "Add01Icon",
	},
	{
		slot: "check",
		lucideIcon: "Check",
		hugeiconsIcon: "Tick01Icon",
	},
	{
		slot: "cross",
		lucideIcon: "X",
		hugeiconsIcon: "Cancel01Icon",
	},
	{
		slot: "minus",
		lucideIcon: "Minus",
		hugeiconsIcon: "MinusSignIcon",
	},
	{
		slot: "search",
		lucideIcon: "Search",
		hugeiconsIcon: "Search01Icon",
	},
	{
		slot: "circle",
		lucideIcon: "Circle",
		hugeiconsIcon: "CircleIcon",
	},
	{
		slot: "grip",
		lucideIcon: "GripVerticalIcon",
		hugeiconsIcon: "More01Icon",
	},
	{
		slot: "left-panel",
		lucideIcon: "PanelLeft",
		hugeiconsIcon: "PanelLeftIcon",
	},
] as const

export type IconSlot = (typeof ICON_SLOT_REPLACEMENTS)[number]["slot"]

export type LucideIconName =
	(typeof ICON_SLOT_REPLACEMENTS)[number]["lucideIcon"]

export type HugeiconsIconName =
	(typeof ICON_SLOT_REPLACEMENTS)[number]["hugeiconsIcon"]

export const ICON_SLOTS = ICON_SLOT_REPLACEMENTS.map(
	({ slot }) => slot
) as IconSlot[]

export const ICON_LIBRARY_LABELS: Record<IconLibrary, string> = {
	lucide: "Lucide",
	hugeicons: "Hugeicons",
}
