"use client"

import React, { useState } from "react"
import { Button } from "@/registry/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/ui/collapsible"

export default function CollapsiblePreview() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="w-full max-w-lg">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<div className="space-y-2">
					<p className="text-muted-foreground text-sm">
						RadianOS is a modern design system and component library built with React and TypeScript. It provides a comprehensive set of accessible, customizable components for
						building beautiful user interfaces.
					</p>
					<CollapsibleContent>
						<p className="text-muted-foreground text-sm">
							Our components are built with accessibility in mind, following WAI-ARIA guidelines and best practices. They are fully customizable with CSS variables and support dark
							mode out of the box. Whether you are building a simple landing page or a complex dashboard, RadianOS has the components you need to create exceptional user
							experiences.
						</p>
					</CollapsibleContent>
					<CollapsibleTrigger asChild>
						<Button className="text-[13px]" variant="link">
							{isOpen ? "Show less" : "Show more"}
						</Button>
					</CollapsibleTrigger>
				</div>
			</Collapsible>
		</div>
	)
}
