import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { cn } from "@/lib/utils"

type HoverCardProps = React.ComponentProps<typeof HoverCardPrimitive.Root>
type HoverCardTriggerProps = React.ComponentProps<
	typeof HoverCardPrimitive.Trigger
>
type HoverCardContentProps = React.ComponentProps<
	typeof HoverCardPrimitive.Content
>

function HoverCard({ children, ...props }: HoverCardProps) {
	return (
		<HoverCardPrimitive.Root openDelay={400} data-slot="hover-card" {...props}>
			{children}
		</HoverCardPrimitive.Root>
	)
}

HoverCard.displayName = HoverCardPrimitive.Root.displayName

function HoverCardTrigger({ ...props }: HoverCardTriggerProps) {
	return (
		<HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
	)
}
HoverCardTrigger.displayName = HoverCardPrimitive.Trigger.displayName

function HoverCardContent({
	className,
	sideOffset = 8,
	children,
	...props
}: HoverCardContentProps) {
	return (
		<HoverCardPrimitive.Content
			data-slot="hover-card-content"
			className={cn(
				"bg-bg text-fg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-soft z-50 w-64 rounded-lg border p-4 shadow-md outline-hidden",
				className
			)}
			sideOffset={sideOffset}
			{...props}>
			{children}
		</HoverCardPrimitive.Content>
	)
}
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardContent, HoverCardTrigger }
