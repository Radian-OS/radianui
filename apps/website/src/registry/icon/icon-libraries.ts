import { ICON_SLOT_REPLACEMENTS } from "@/registry/icon/icon-slot"

export const ICON_LIBRARIES = ["lucide", "hugeicons"] as const

export type IconLibrary = (typeof ICON_LIBRARIES)[number]

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
