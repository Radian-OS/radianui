"use client"

import * as React from "react"
import * as HugeiconsIcons from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import * as LucideIcons from "lucide-react"
import { type LucideIcon } from "lucide-react"
import type {
	IconLibrary,
	IconSlot as IconSlotName,
} from "@/registry/icon/icon-libraries"
import { ICON_SLOT_REPLACEMENTS } from "./icon-slot"

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

function resolveIconComponents(iconLibrary: IconLibrary) {
	return Object.fromEntries(
		ICON_SLOT_REPLACEMENTS.map(({ slot, lucideIcon, hugeiconsIcon }) => {
			if (iconLibrary === "lucide") {
				const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[
					lucideIcon
				]
				if (!Icon) {
					console.warn(
						`Lucide icon "${lucideIcon}" not found, falling back to Search`
					)
					return [slot, createLucideIcon(LucideIcons.Search)]
				}
				return [slot, createLucideIcon(Icon)]
			}

			const icon = (
				HugeiconsIcons as unknown as Record<string, IconSvgElement>
			)[hugeiconsIcon]
			if (!icon) {
				console.warn(`Hugeicons icon "${hugeiconsIcon}" not found`)
				return [slot, createLucideIcon(LucideIcons.Search)]
			}
			return [slot, createHugeiconsIcon(icon)]
		})
	) as Record<IconSlotName, ThemedIconComponent>
}

const iconComponents = {
	lucide: resolveIconComponents("lucide"),
	hugeicons: resolveIconComponents("hugeicons"),
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
		(props, ref) => <IconSlot ref={ref} {...props} slot={slot} />
	)
	IconSlotComponent.displayName = `IconSlot(${slot})`
	return IconSlotComponent
}
