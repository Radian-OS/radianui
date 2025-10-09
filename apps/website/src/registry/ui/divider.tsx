"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"

export type DividerProps = React.ComponentProps<typeof SeparatorPrimitive.Root>

function Divider({ className, orientation = "horizontal", decorative = true, ...props }: DividerProps) {
	return (
		<SeparatorPrimitive.Root
			data-slot="divider"
			decorative={decorative}
			orientation={orientation}
			className={cn(
				"bg-soft shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
				className
			)}
			{...props}
		/>
	)
}

export { Divider }
