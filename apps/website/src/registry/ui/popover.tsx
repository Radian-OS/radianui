"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"

type PopoverContext = Pick<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, "align" | "side" | "sideOffset">

type PopoverProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> &
	Pick<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, "align" | "side" | "sideOffset">

type PopoverContentProps = Omit<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, "align" | "side">

const PopoverContext = React.createContext<PopoverContext | null>(null)

function usePopoverContext() {
	const context = React.use(PopoverContext)
	if (!context) throw new Error("usePopoverContext must be used within <Popover/>")
	return context
}

function Popover({ align = "start", side = "bottom", sideOffset = 4, children, ...props }: PopoverProps) {
	return (
		<PopoverPrimitive.Root {...props}>
			<PopoverContext.Provider value={{ align, side, sideOffset }}>
				{children}
			</PopoverContext.Provider>
		</PopoverPrimitive.Root>
	)
}
Popover.displayName = PopoverPrimitive.Root.displayName

const PopoverTrigger = PopoverPrimitive.Trigger

function PopoverContent({ className, ...props }: PopoverContentProps) {
	const { align, side, sideOffset } = usePopoverContext()
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				data-slot="popover-content"
				align={align}
				side={side}
				sideOffset={sideOffset}
				className={cn(
					"text-fg1 bg-bg1 outline-hidden z-50 w-72 rounded-md border p-4 shadow-md",
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
					"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
					className
				)}
				{...props}
			/>
		</PopoverPrimitive.Portal>
	)
}
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverContent, PopoverTrigger }
