import { ICON_SLOT_REPLACEMENTS } from "@/registry/icon/icon-slot"

export const ICON_LIBRARIES = [
	"lucide",
	"hugeicons",
	"phosphor",
	"tabler",
	"heroicons",
] as const

export type IconLibrary = (typeof ICON_LIBRARIES)[number]

export type IconSlot = (typeof ICON_SLOT_REPLACEMENTS)[number]["slot"]

export type LucideIconName =
	(typeof ICON_SLOT_REPLACEMENTS)[number]["lucideIcon"]

export type HugeiconsIconName =
	(typeof ICON_SLOT_REPLACEMENTS)[number]["hugeiconsIcon"]

export type PhosphorIconName =
	(typeof ICON_SLOT_REPLACEMENTS)[number]["phosphorIcon"]

export type TablerIconName =
	(typeof ICON_SLOT_REPLACEMENTS)[number]["tablerIcon"]

export type HeroiconsIconName =
	(typeof ICON_SLOT_REPLACEMENTS)[number]["heroiconsIcon"]

export const ICON_SLOTS = ICON_SLOT_REPLACEMENTS.map(
	({ slot }) => slot
) as IconSlot[]

export const ICON_LIBRARY_LABELS: Record<IconLibrary, string> = {
	lucide: "Lucide",
	hugeicons: "Hugeicons",
	phosphor: "Phosphor",
	tabler: "Tabler",
	heroicons: "Heroicons",
}
