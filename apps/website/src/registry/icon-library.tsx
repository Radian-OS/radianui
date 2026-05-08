"use client"

import * as React from "react"
import {
	Add01Icon,
	ArrowDown01Icon,
	ArrowLeft01Icon,
	ArrowRight01Icon,
	ArrowUp01Icon,
	Cancel01Icon,
	CircleIcon,
	MinusSignIcon,
	More01Icon,
	MoreHorizontalIcon,
	PanelLeftIcon,
	Search01Icon,
	Setting07Icon,
	Tick01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import {
	Check,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	Circle,
	GripVerticalIcon,
	type LucideIcon,
	Minus,
	MoreHorizontal,
	PanelLeft,
	Plus,
	Search,
	Settings,
	X,
} from "lucide-react"
import { ICON_SLOT_REPLACEMENTS } from "@/data/icon-slot"
import type {
	HugeiconsIconName,
	IconLibrary,
	IconSlot as IconSlotName,
	LucideIconName,
} from "@/lib/icon-libraries"

export type ThemedIconProps = Omit<
	React.SVGProps<SVGSVGElement>,
	"strokeWidth"
> & {
	size?: string | number
	strokeWidth?: number
}

type ThemedIconComponent = React.ForwardRefExoticComponent<
	ThemedIconProps & React.RefAttributes<SVGSVGElement>
>

const IconLibraryContext = React.createContext<IconLibrary>("lucide")

export function IconLibraryProvider({
	children,
	value,
}: {
	children: React.ReactNode
	value: IconLibrary
}) {
	return (
		<IconLibraryContext.Provider value={value}>
			{children}
		</IconLibraryContext.Provider>
	)
}

export function useIconLibrary() {
	return React.useContext(IconLibraryContext)
}

function createLucideIcon(Icon: LucideIcon): ThemedIconComponent {
	const Component = React.forwardRef<SVGSVGElement, ThemedIconProps>(
		(props, ref) => <Icon ref={ref} {...props} />
	)

	Component.displayName = `Lucide${Icon.displayName ?? Icon.name ?? "Icon"}`
	return Component
}

function createHugeiconsIcon(icon: IconSvgElement): ThemedIconComponent {
	const Component = React.forwardRef<SVGSVGElement, ThemedIconProps>(
		({ strokeWidth, ...props }, ref) => (
			<HugeiconsIcon
				ref={ref}
				icon={icon}
				strokeWidth={strokeWidth}
				{...props}
			/>
		)
	)

	Component.displayName = "HugeiconsIconSlot"
	return Component
}

const lucideIcons: Record<LucideIconName, LucideIcon> = {
	ChevronDown,
	ChevronUp,
	ChevronRight,
	ChevronLeft,
	MoreHorizontal,
	Plus,
	Check,
	X,
	Minus,
	Search,
	Circle,
	GripVerticalIcon,
	PanelLeft,
	Settings,
}

const hugeiconsIcons: Record<HugeiconsIconName, IconSvgElement> = {
	ArrowDown01Icon,
	ArrowUp01Icon,
	ArrowRight01Icon,
	ArrowLeft01Icon,
	MoreHorizontalIcon,
	Add01Icon,
	Tick01Icon,
	Cancel01Icon,
	MinusSignIcon,
	Search01Icon,
	CircleIcon,
	More01Icon,
	PanelLeftIcon,
	Setting07Icon,
}

function createIconComponents(iconLibrary: IconLibrary) {
	return Object.fromEntries(
		ICON_SLOT_REPLACEMENTS.map(({ slot, lucideIcon, hugeiconsIcon }) => {
			if (iconLibrary === "lucide") {
				return [slot, createLucideIcon(lucideIcons[lucideIcon])]
			}

			return [slot, createHugeiconsIcon(hugeiconsIcons[hugeiconsIcon])]
		})
	) as Record<IconSlotName, ThemedIconComponent>
}

const iconComponents = {
	lucide: createIconComponents("lucide"),
	hugeicons: createIconComponents("hugeicons"),
} satisfies Record<IconLibrary, Record<IconSlotName, ThemedIconComponent>>

export const IconSlot = React.forwardRef<
	SVGSVGElement,
	ThemedIconProps & { slot: IconSlotName }
>(({ slot, ...props }, ref) => {
	const iconLibrary = useIconLibrary()
	const Icon = iconComponents[iconLibrary][slot]

	return <Icon ref={ref} {...props} />
})

IconSlot.displayName = "IconSlot"

export function createIconSlot(slot: IconSlotName) {
	const IconSlotComponent = React.forwardRef<SVGSVGElement, ThemedIconProps>(
		(props, ref) => <IconSlot ref={ref} slot={slot} {...props} />
	)

	IconSlotComponent.displayName = `IconSlot(${slot})`
	return IconSlotComponent
}
