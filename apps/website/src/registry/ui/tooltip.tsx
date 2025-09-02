"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

type TooltipContext = Pick<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, "align" | "side"> & {
	withArrow?: boolean
}
type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root> & TooltipContext

type TooltipTriggerProps = React.ComponentProps<typeof TooltipPrimitive.Trigger>

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content>

const TooltipContext = React.createContext<TooltipContext | null>(null)

function useTooltipContext() {
	const context = React.useContext(TooltipContext)
	if (!context) throw new Error("useTooltipContext must be used within <Tooltip />")
	return context
}

function Tooltip({ align = "center", side = "top", withArrow = false, children, ...props }: TooltipProps) {
	return (
		<TooltipPrimitive.Provider delayDuration={0}>
			<TooltipContext.Provider value={{ align, side, withArrow }}>
				<TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
			</TooltipContext.Provider>
		</TooltipPrimitive.Provider>
	)
}
Tooltip.displayName = TooltipPrimitive.Root.displayName

function TooltipTrigger(props: TooltipTriggerProps) {
	return <TooltipPrimitive.Trigger {...props} />
}
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName

function TooltipContent({ className, sideOffset = 6, children, ...props }: TooltipContentProps) {
	const { align, side, withArrow } = useTooltipContext()
	return (
		<TooltipPrimitive.Content
			align={align}
			side={side}
			sideOffset={sideOffset}
			className={cn(
				"outline-hidden animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 rounded-md bg-black px-2 py-1 text-center text-xs text-white shadow-md dark:bg-white dark:text-black",
				className
			)}
			{...props}>
			{children}
			{withArrow && (
				<TooltipPrimitive.Arrow
					data-align={align}
					data-side={side}
					offset={10}
					className={cn(
						"z-60 absolute top-[-2px] h-2 w-4 fill-black dark:fill-white",
						"data-[align=center]:left-1/2 data-[align=center]:-translate-x-1/2",
						"data-[align=start]:data-[side=right]:-translate-x-full",
						"data-[align=start]:data-[side=top]:-translate-x-10",
						"data-[align=start]:data-[side=left]:-translate-x-1.5",
						"data-[align=start]:data-[side=bottom]:translate-x-5",
						"data-[align=end]:data-[side=top]:translate-x-6",
						"data-[align=end]:data-[side=left]:-translate-x-4",
						"data-[align=end]:data-[side=bottom]:-translate-x-9"
					)}
				/>
			)}
		</TooltipPrimitive.Content>
	)
}
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent }
