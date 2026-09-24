import React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cn } from "@/lib/utils"

export type CollapsibleProps = React.ComponentProps<
	typeof CollapsiblePrimitive.Root
>

export type CollapsibleTriggerProps = React.ComponentProps<
	typeof CollapsiblePrimitive.CollapsibleTrigger
>

export type CollapsibleContentProps = React.ComponentProps<
	typeof CollapsiblePrimitive.CollapsibleContent
>

function Collapsible({ ...props }: CollapsibleProps) {
	return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({ ...props }: CollapsibleTriggerProps) {
	return (
		<CollapsiblePrimitive.CollapsibleTrigger
			data-slot="collapsible-trigger"
			{...props}
		/>
	)
}

function CollapsibleContent({
	className,
	children,
	...props
}: CollapsibleContentProps) {
	return (
		<CollapsiblePrimitive.CollapsibleContent
			data-slot="collapsible-content"
			className={cn(
				"data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden [&>figure]:mt-0!",
				className
			)}
			{...props}>
			{children}
		</CollapsiblePrimitive.CollapsibleContent>
	)
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
