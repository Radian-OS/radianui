"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>

type TooltipTriggerProps = React.ComponentProps<typeof TooltipPrimitive.Trigger>

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content> & VariantProps<typeof tooltipContentVariants>

const tooltipContentVariants = cva(
	"animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 rounded-md px-2 py-1 text-center text-xs leading-5 shadow-md",
	{
		variants: {
			theme: {
				light: "bg-elevation-level1 text-fg-secondary",
				default: "bg-black text-white dark:bg-white dark:text-black",
			},
		},
		defaultVariants: {
			theme: "default",
		},
	}
)

function Tooltip({ children, ...props }: TooltipProps) {
	return (
		<TooltipPrimitive.Provider delayDuration={0}>
			<TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	)
}
Tooltip.displayName = TooltipPrimitive.Root.displayName

function TooltipTrigger(props: TooltipTriggerProps) {
	return <TooltipPrimitive.Trigger {...props} />
}
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName

function TooltipContent({ className, align = "center", side = "top", sideOffset = 4, children, theme = "default", ...props }: TooltipContentProps) {
	return (
		<TooltipPrimitive.Content align={align} side={side} sideOffset={sideOffset} className={cn(tooltipContentVariants({ theme }), className)} {...props}>
			{children}
		</TooltipPrimitive.Content>
	)
}
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent }
