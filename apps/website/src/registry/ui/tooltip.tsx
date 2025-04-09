"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

type TooltipContext = Pick<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, "align" | "side"> & {
	withArrow?: boolean
}

const TooltipContext = React.createContext<TooltipContext | null>(null)

const useTooltipContext = () => {
	const context = React.useContext(TooltipContext)
	if (!context) throw new Error("useTooltipContext must be used within <Tooltip />")
	return context
}

const TooltipWrapper = ({ children }: { children: React.ReactNode }) => (
	<TooltipPrimitive.Provider>{children}</TooltipPrimitive.Provider>
)

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root> & TooltipContext

const Tooltip = ({ align = "center", side = "top", withArrow = false, children, ...props }: TooltipProps) => {
	return (
		<TooltipWrapper>
			<TooltipContext.Provider value={{ align, side, withArrow }}>
				<TooltipPrimitive.Root {...props} >
					{children}
				</TooltipPrimitive.Root>
			</TooltipContext.Provider>
		</TooltipWrapper>
	)
}
Tooltip.displayName = TooltipPrimitive.Root.displayName

const TooltipTrigger = TooltipPrimitive.Trigger
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content>
const TooltipContent = ({ className, sideOffset = 10, children, ...props }: TooltipContentProps) => {
	const { align, side, withArrow } = useTooltipContext()

	return (
		<TooltipPrimitive.Content
			align={align}
			side={side}
			sideOffset={sideOffset}
			className={cn(
				"relative",
				"dark:bg-white bg-black dark:text-black text-white px-2 py-1 text-xs text-center",
				// Base animations
				"animate-in fade-in-20 zoom-in-95",
				// Side-specific slide animations
				side === "top" ? "slide-in-from-bottom-2" :
					side === "bottom" ? "slide-in-from-top-2" :
						side === "left" ? "slide-in-from-right-2" :
							"slide-in-from-left-2", // right side

				// Open state animations
				"data-[state=open]:animate-in data-[state=open]:fade-in-20 data-[state=open]:zoom-in-95",
				side === "top" ? "data-[state=open]:slide-in-from-bottom-2" :
					side === "bottom" ? "data-[state=open]:slide-in-from-top-2" :
						side === "left" ? "data-[state=open]:slide-in-from-right-2" :
							"data-[state=open]:slide-in-from-left-2", // right side

				// Closed state animations
				"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
				side === "top" ? "data-[state=closed]:slide-out-to-bottom-2" :
					side === "bottom" ? "data-[state=closed]:slide-out-to-top-2" :
						side === "left" ? "data-[state=closed]:slide-out-to-right-2" :
							"data-[state=closed]:slide-out-to-left-2", // right side

				// Timing control
				"data-[state=open]:duration-300",
				"data-[state=closed]:duration-400",

				// Transform origin
				"origin-[var(--radix-tooltip-content-transform-origin)]",

				// Base styles
				"z-50 rounded-md shadow-md outline-hidden",
				className
			)}
			{...props}
		>
			{children}
			{
				withArrow && <TooltipPrimitive.Arrow
					offset={10}
					className={cn(
						"z-60 h-2 w-4 fill-black dark:fill-white absolute top-[-2px]",
						{
							"left-1/2 -translate-x-1/2": align === "center",
							"-translate-x-full": align === "start" && (side === "top" || side === "right"),
							"translate-x-2": align === "end" && side === "top",
							" -translate-x-3.5": align === "end" && side === "left",

						}
					)}

				/>
			}
		</TooltipPrimitive.Content >
	)
}
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent }