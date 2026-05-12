"use client"

import * as React from "react"
import {
	Add01Icon,
	AlertCircleIcon,
	ArrowDown01Icon,
	ArrowLeft01Icon,
	ArrowRight01Icon,
	ArrowUp01Icon,
	Cancel01Icon,
	Car03Icon,
	CircleIcon,
	Coffee02Icon,
	CreditCardIcon,
	EyeIcon,
	LockPasswordIcon,
	Logout01Icon,
	Mail01Icon,
	MinusSignIcon,
	More01Icon,
	MoreHorizontalIcon,
	PanelLeftIcon,
	Search01Icon,
	Setting07Icon,
	ShoppingCart02Icon,
	Tick01Icon,
	Tv01Icon,
	User02Icon,
	ViewOffSlashIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import {
	AlertCircle,
	Car,
	Check,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	Circle,
	Coffee,
	CreditCard,
	Eye,
	EyeOff,
	GripVerticalIcon,
	Lock,
	LogOut,
	type LucideIcon,
	Mail,
	Minus,
	MoreHorizontal,
	PanelLeft,
	Plus,
	Search,
	Settings,
	ShoppingCart,
	Tv,
	User,
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
	Car,
	Coffee,
	ShoppingCart,
	Tv,
	CreditCard,
	Eye,
	AlertCircle,
	Mail,
	EyeOff,
	Lock,
	User,
	LogOut,
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
	Car03Icon,
	Coffee02Icon,
	ShoppingCart02Icon,
	Tv01Icon,
	CreditCardIcon,
	Mail01Icon,
	User02Icon,
	Logout01Icon,
	LockPasswordIcon,
	ViewOffSlashIcon,
	AlertCircleIcon,
	EyeIcon,
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
