"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"

type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>

type PopoverContentProps = React.ComponentProps<typeof PopoverPrimitive.Content> & { withArrow?: boolean }

type PopoverTriggerProps = React.ComponentProps<typeof PopoverPrimitive.Trigger>

function Popover({ children, ...props }: PopoverProps) {
	return <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>
}
Popover.displayName = PopoverPrimitive.Root.displayName

function PopoverTrigger({ ...props }: PopoverTriggerProps) {
	return <PopoverPrimitive.Trigger {...props} />
}
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName

function PopoverContent({ align = "center", side = "bottom", sideOffset = 4, className, withArrow = false, children, ...props }: PopoverContentProps) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				data-slot="popover-content"
				align={align}
				side={side}
				sideOffset={sideOffset}
				className={cn(
					"text-fg bg-elevation-level1 outline-hidden z-50 w-72 rounded-md border p-4 shadow-md",
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
					"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
					"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					className
				)}
				{...props}>
				{children}
				{withArrow && <PopoverPrimitive.Arrow width={10} className="fill-border" />}
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Portal>
	)
}
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverContent, PopoverTrigger }
