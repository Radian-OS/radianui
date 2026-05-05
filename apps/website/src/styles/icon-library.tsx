"use client"

import * as React from "react"
import {
	Add01Icon,
	ArrowDown01Icon,
	ArrowLeft01Icon,
	ArrowRight01Icon,
	ArrowUp01Icon,
	MoreHorizontalIcon,
	UnfoldMoreIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	type LucideIcon,
	MoreHorizontal,
	Plus,
} from "lucide-react"
import type { IconLibrary, IconSlot } from "@/registry/icon-libraries"

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
		"select.dropdown": createLucideIcon(ChevronDown),
		"select.scrollUp": createLucideIcon(ChevronUp),
		"select.scrollDown": createLucideIcon(ChevronDown),
		"accordion.chevron": createLucideIcon(ChevronDown),
		"breadcrumb.separator": createLucideIcon(ChevronRight),
		"calendar.previous": createLucideIcon(ChevronLeft),
		"calendar.next": createLucideIcon(ChevronRight),
		"carousel.previous": createLucideIcon(ChevronLeft),
		"carousel.next": createLucideIcon(ChevronRight),
		"dropdown.submenu": createLucideIcon(ChevronRight),
		"common.more": createLucideIcon(MoreHorizontal),
		"common.plus": createLucideIcon(Plus),
	},
	hugeicons: {
		"select.dropdown": createHugeiconsIcon(UnfoldMoreIcon),
		"select.scrollUp": createHugeiconsIcon(ArrowUp01Icon),
		"select.scrollDown": createHugeiconsIcon(ArrowDown01Icon),
		"accordion.chevron": createHugeiconsIcon(ArrowDown01Icon),
		"breadcrumb.separator": createHugeiconsIcon(ArrowRight01Icon),
		"calendar.previous": createHugeiconsIcon(ArrowLeft01Icon),
		"calendar.next": createHugeiconsIcon(ArrowRight01Icon),
		"carousel.previous": createHugeiconsIcon(ArrowLeft01Icon),
		"carousel.next": createHugeiconsIcon(ArrowRight01Icon),
		"dropdown.submenu": createHugeiconsIcon(ArrowRight01Icon),
		"common.more": createHugeiconsIcon(MoreHorizontalIcon),
		"common.plus": createHugeiconsIcon(Add01Icon),
	},
} satisfies Record<IconLibrary, Record<IconSlot, ThemedIconComponent>>

export const ThemedIcon = React.forwardRef<
	SVGSVGElement,
	ThemedIconProps & { slot: IconSlot }
>(({ slot, ...props }, ref) => {
	const iconLibrary = useIconLibrary()
	const Icon = iconComponents[iconLibrary][slot]

	return <Icon ref={ref} {...props} />
})

ThemedIcon.displayName = "ThemedIcon"

export function createIconSlot(slot: IconSlot) {
	const IconSlotComponent = React.forwardRef<SVGSVGElement, ThemedIconProps>(
		(props, ref) => <ThemedIcon ref={ref} slot={slot} {...props} />
	)

	IconSlotComponent.displayName = `IconSlot(${slot})`
	return IconSlotComponent
}

export const SelectDropdownIcon = createIconSlot("select.dropdown")
export const SelectScrollUpIcon = createIconSlot("select.scrollUp")
export const SelectScrollDownIcon = createIconSlot("select.scrollDown")
export const AccordionChevronIcon = createIconSlot("accordion.chevron")
export const BreadcrumbSeparatorIcon = createIconSlot("breadcrumb.separator")
export const CalendarPreviousIcon = createIconSlot("calendar.previous")
export const CalendarNextIcon = createIconSlot("calendar.next")
export const CarouselPreviousIcon = createIconSlot("carousel.previous")
export const CarouselNextIcon = createIconSlot("carousel.next")
export const DropdownSubmenuIcon = createIconSlot("dropdown.submenu")
export const MoreIcon = createIconSlot("common.more")
export const PlusIcon = createIconSlot("common.plus")
