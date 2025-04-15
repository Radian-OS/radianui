"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { cn } from "@/lib/utils"

type HoverCardContext = Pick<React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>, "align" | "side"> & { withArrow?: boolean }

const HoverCardContext = React.createContext<HoverCardContext | null>(null)

const useHoverCardContext = () => {
	const context = React.use(HoverCardContext)
	if (!context) throw new Error("useHoverCardContext must be used within <HoverCard/>")
	return context
}

type HoverCardProps = React.ComponentProps<typeof HoverCardPrimitive.Root> & HoverCardContext
const HoverCard = ({ align = "center", side = "bottom", withArrow = false, children, ...props }: HoverCardProps) => {
	return (
		<HoverCardContext.Provider value={{ align, side, withArrow }}>
			<HoverCardPrimitive.Root openDelay={400} data-slot="hover-card" {...props}>
				{children}
			</HoverCardPrimitive.Root>
		</HoverCardContext.Provider>
	)
}
HoverCard.displayName = HoverCardPrimitive.Root.displayName

const HoverCardTrigger = HoverCardPrimitive.Trigger
HoverCardTrigger.displayName = HoverCardPrimitive.Trigger.displayName

type HoverCardContentProps = React.ComponentProps<typeof HoverCardPrimitive.Content>
const HoverCardContent = ({ className, sideOffset = 6, children, ...props }: HoverCardContentProps) => {
	const { align, side, withArrow } = useHoverCardContext()

	return (
		<HoverCardPrimitive.Content
			data-slot="hover-card-content"
			align={align}
			side={side}
			sideOffset={sideOffset}
			className={cn(
				"bg-bg-base text-text data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 rounded-md border p-4 shadow-md outline-hidden",
				className
			)}
			{...props}>
			{children}
			{withArrow && <HoverCardPrimitive.Arrow className="fill-bg-1 z-50" />}
		</HoverCardPrimitive.Content>
	)
}
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardContent, HoverCardTrigger }
