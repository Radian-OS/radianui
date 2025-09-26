"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>

type TooltipTriggerProps = React.ComponentProps<typeof TooltipPrimitive.Trigger>

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content> & VariantProps<typeof tooltipContentVariants> & { withArrow?: boolean }

const tooltipContentVariants = cva(
	"animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 rounded-md max-w-70 px-2 py-1.5 text-[13px]/4 shadow-md shadow-black/5 [&_p]:m-0 [&_p]:leading-4",
	{
		variants: {
			theme: {
				light: "bg-elevation-level1 text-fg-secondary border border-border",
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
			<TooltipPrimitive.Root data-slot="tooltip" {...props}>
				{children}
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	)
}
Tooltip.displayName = TooltipPrimitive.Root.displayName

function TooltipTrigger(props: TooltipTriggerProps) {
	return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName

function TooltipContent({ align = "center", side = "top", sideOffset = 4, theme = "default", withArrow = false, children, className, ...props }: TooltipContentProps) {
	return (
		<TooltipPrimitive.Content
			data-slot="tooltip-content"
			data-theme={theme}
			align={align}
			side={side}
			sideOffset={sideOffset}
			className={cn(tooltipContentVariants({ theme }), className)}
			{...props}>
			{children}
			{withArrow && (
				<TooltipPrimitive.Arrow
					data-slot="tooltip-arrow"
					data-theme={theme}
					width={12}
					height={7}
					className="data-[theme=light]:fill-elevation-level1 -mt-0.5 rounded-md data-[theme=default]:fill-black data-[theme=light]:drop-shadow-[0_1px_0_var(--color-border)] data-[theme=default]:dark:fill-white"
				/>
			)}
		</TooltipPrimitive.Content>
	)
}
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent }
