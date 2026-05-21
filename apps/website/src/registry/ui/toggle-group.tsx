"use client"

import * as React from "react"
import {
	ToggleGroupItem as ToggleGroupItemPrimitive,
	ToggleGroup as ToggleGroupPrimitive,
} from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { toggleVariants } from "@/registry/ui/toggle"

const ToggleGroupContext = React.createContext<
	VariantProps<typeof toggleVariants> & {
		spacing?: number
		orientation?: "horizontal" | "vertical"
	}
>({
	size: "36",
	variant: "outline",
	spacing: 0,
	orientation: "horizontal",
})

function ToggleGroup({
	className,
	variant = "outline",
	size = "36",
	spacing = 0,
	orientation = "horizontal",
	children,
	...props
}: React.ComponentProps<typeof ToggleGroupPrimitive> &
	VariantProps<typeof toggleVariants> & {
		spacing?: number
		orientation?: "horizontal" | "vertical"
	}) {
	return (
		<ToggleGroupPrimitive
			data-slot="toggle-group"
			data-spacing={spacing}
			data-orientation={orientation}
			className={cn(
				"group/toggle-group flex w-fit items-center",
				orientation === "vertical" ? "flex-col items-stretch" : "flex-row",
				spacing > 0 ? `gap-${spacing}` : "gap-0",
				"rounded-lg",
				className
			)}
			{...props}>
			<ToggleGroupContext.Provider
				value={{ variant, size, spacing, orientation }}>
				{children}
			</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive>
	)
}

function ToggleGroupItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof ToggleGroupItemPrimitive>) {
	const { variant, size, spacing, orientation } =
		React.useContext(ToggleGroupContext)

	return (
		<ToggleGroupItemPrimitive
			data-slot="toggle-group-item"
			className={cn(
				toggleVariants({ variant, size }),
				"shrink-0 focus:z-10 focus-visible:z-10",

				// ── spacing=0: flush joined group ──
				spacing === 0 && [
					"rounded-none",

					// horizontal rounding for first/last
					orientation === "horizontal" && [
						"first:rounded-l-md last:rounded-r-md",
						// outline: collapse duplicate borders
						variant === "outline" && "border-l-0 first:border-l",
					],

					// vertical rounding for first/last
					orientation === "vertical" && [
						"first:rounded-t-md last:rounded-b-md",
						variant === "outline" && "border-t-0 first:border-t",
					],
				],

				className
			)}
			{...props}>
			{children}
		</ToggleGroupItemPrimitive>
	)
}

export { ToggleGroup, ToggleGroupItem }
