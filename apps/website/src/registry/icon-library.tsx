"use client"

import * as React from "react"
import {
	Add01Icon,
	ArrowDown01Icon,
	ArrowLeft01Icon,
	ArrowRight01Icon,
	ArrowUp01Icon,
	CheckListIcon,
	MoreHorizontalIcon,
	UnfoldMoreIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import {
	Check,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	type LucideIcon,
	MoreHorizontal,
	Plus,
} from "lucide-react"
import type {
	IconLibrary,
	IconSlot as IconSlotName,
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

const iconComponents = {
	lucide: {
		dropdown: createLucideIcon(ChevronDown),
		scrollUp: createLucideIcon(ChevronUp),
		scrollDown: createLucideIcon(ChevronDown),
		chevron: createLucideIcon(ChevronDown),
		separator: createLucideIcon(ChevronRight),
		previous: createLucideIcon(ChevronLeft),
		next: createLucideIcon(ChevronRight),
		submenu: createLucideIcon(ChevronRight),
		more: createLucideIcon(MoreHorizontal),
		plus: createLucideIcon(Plus),
		check: createLucideIcon(Check),
	},
	hugeicons: {
		dropdown: createHugeiconsIcon(UnfoldMoreIcon),
		scrollUp: createHugeiconsIcon(ArrowUp01Icon),
		scrollDown: createHugeiconsIcon(ArrowDown01Icon),
		chevron: createHugeiconsIcon(ArrowDown01Icon),
		separator: createHugeiconsIcon(ArrowRight01Icon),
		previous: createHugeiconsIcon(ArrowLeft01Icon),
		next: createHugeiconsIcon(ArrowRight01Icon),
		submenu: createHugeiconsIcon(ArrowRight01Icon),
		more: createHugeiconsIcon(MoreHorizontalIcon),
		plus: createHugeiconsIcon(Add01Icon),
		check: createHugeiconsIcon(CheckListIcon),
	},
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
