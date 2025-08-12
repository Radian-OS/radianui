"use client"

import * as React from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"

export function CodeCollapsibleWrapper({ className, children, ...props }: React.ComponentProps<typeof Collapsible>) {
	const [isOpened, setIsOpened] = React.useState(false)

	return (
		<Collapsible open={isOpened} onOpenChange={setIsOpened} className={cn("group/collapsible relative", className)} {...props}>
			<CollapsibleTrigger asChild>
				<div className="absolute -top-9 right-9 z-10 flex items-center">
					<Button variant="ghost" color="neutral" size="28">
						{isOpened ? "Show Less" : "Show More"}
					</Button>
					<Divider orientation="vertical" className="mx-1.5 !h-4" />
				</div>
			</CollapsibleTrigger>
			<CollapsibleContent forceMount className="relative overflow-hidden data-[state=closed]:max-h-60">
				{children}
			</CollapsibleContent>
			<CollapsibleTrigger className="from-bg-base/70 to-bg-base text-fg-tertiary absolute inset-x-0 bottom-0 flex h-20 items-center justify-center rounded-b-lg bg-gradient-to-b text-sm group-data-[state=open]/collapsible:hidden">
				{isOpened ? "Show Less" : "Show More"}
			</CollapsibleTrigger>
		</Collapsible>
	)
}
