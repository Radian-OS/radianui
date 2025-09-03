"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>

type TooltipTriggerProps = React.ComponentProps<typeof TooltipPrimitive.Trigger>

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content> & {
	withArrow?: boolean
}

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

function TooltipContent({ className, align = "center", side = "top", withArrow = false, sideOffset = 4, children, ...props }: TooltipContentProps) {
	return (
		<TooltipPrimitive.Content
			align={align}
			side={side}
			sideOffset={sideOffset}
			className={cn(
				"animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 rounded-md bg-black px-2 py-1 text-center text-xs leading-5 text-white shadow-md dark:bg-white dark:text-black",
				className
			)}
			{...props}>
			{children}
			{withArrow && (
				<TooltipPrimitive.Arrow className="-translate-y-0.5" asChild>
					<svg xmlns="http://www.w3.org/2000/svg" width={12} height={7} viewBox="0 0 12 7" fill="none" className="rotate-180">
						<path d="M4.8 0.469182C5.46274 -0.156394 6.53726 -0.156394 7.2 0.469182L12 5L0 5L4.8 0.469182Z" className="fill-black dark:fill-white" />
					</svg>
				</TooltipPrimitive.Arrow>
			)}
		</TooltipPrimitive.Content>
	)
}
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent }
