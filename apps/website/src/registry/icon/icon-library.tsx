"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import type {
	IconLibrary,
	IconSlot as IconSlotName,
} from "@/registry/icon/icon-libraries"
import { LUCIDE_ICON_MAP } from "./maps/lucide"

export type ThemedIconProps = Omit<
	React.SVGProps<SVGSVGElement>,
	"strokeWidth"
> & {
	size?: string | number
	strokeWidth?: number
}

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

// In-memory cache for dynamically loaded icon maps
let hugeiconsMap: Record<IconSlotName, IconSvgElement> | null = null
let hugeiconsPromise: Promise<Record<IconSlotName, IconSvgElement>> | null =
	null

function loadHugeicons(): Promise<Record<IconSlotName, IconSvgElement>> {
	if (hugeiconsMap) return Promise.resolve(hugeiconsMap)
	if (!hugeiconsPromise) {
		hugeiconsPromise = import("./maps/hugeicons").then((mod) => {
			hugeiconsMap = mod.HUGEICONS_ICON_MAP
			return mod.HUGEICONS_ICON_MAP
		})
	}
	return hugeiconsPromise
}

type PhosphorIconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>
let phosphorMap: Record<IconSlotName, PhosphorIconComponent> | null = null
let phosphorPromise: Promise<
	Record<IconSlotName, PhosphorIconComponent>
> | null = null

function loadPhosphor(): Promise<Record<IconSlotName, PhosphorIconComponent>> {
	if (phosphorMap) return Promise.resolve(phosphorMap)
	if (!phosphorPromise) {
		phosphorPromise = import("./maps/phosphor").then((mod) => {
			phosphorMap = mod.PHOSPHOR_ICON_MAP as unknown as Record<
				IconSlotName,
				PhosphorIconComponent
			>
			return phosphorMap
		})
	}
	return phosphorPromise
}

export const IconSlot = React.forwardRef<
	SVGSVGElement,
	ThemedIconProps & { slot: IconSlotName }
>(({ slot, strokeWidth, ...props }, ref) => {
	const iconLibrary = useIconLibrary()
	const [, forceUpdate] = React.useReducer((x) => x + 1, 0)

	React.useEffect(() => {
		if (iconLibrary === "hugeicons" && !hugeiconsMap) {
			loadHugeicons().then(() => forceUpdate())
		}
		if (iconLibrary === "phosphor" && !phosphorMap) {
			loadPhosphor().then(() => forceUpdate())
		}
	}, [iconLibrary])

	if (iconLibrary === "hugeicons" && hugeiconsMap) {
		const hugeIcon = hugeiconsMap[slot]
		if (hugeIcon) {
			return (
				<HugeiconsIcon
					ref={ref}
					icon={hugeIcon}
					strokeWidth={strokeWidth}
					{...props}
				/>
			)
		}
	}

	if (iconLibrary === "phosphor" && phosphorMap) {
		const PhosphorComponent = phosphorMap[slot]
		if (PhosphorComponent) {
			return <PhosphorComponent ref={ref} {...props} />
		}
	}

	const LucideComponent = LUCIDE_ICON_MAP[slot]
	if (LucideComponent) {
		return <LucideComponent ref={ref} strokeWidth={strokeWidth} {...props} />
	}

	return null
})

IconSlot.displayName = "IconSlot"

export function createIconSlot(slot: IconSlotName) {
	const IconSlotComponent = React.forwardRef<SVGSVGElement, ThemedIconProps>(
		(props, ref) => <IconSlot ref={ref} slot={slot} {...props} />
	)
	IconSlotComponent.displayName = `IconSlot(${slot})`
	return IconSlotComponent
}
