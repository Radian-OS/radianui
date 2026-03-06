"use client"

import React, { useState } from "react"
import { Button } from "@/registry/ui/button"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/ui/collapsible"

export default function CollapsibleText() {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="w-[500px] text-sm/6">
			<p>
				RadianOS is a modern design system and component library built with
				React and TypeScript. It provides a comprehensive set of accessible,
				customizable components for building beautiful user interfaces.
			</p>
			{!isOpen && <p>...</p>}
			<CollapsibleContent>
				<br />
				<p>
					Our components are built with accessibility in mind, following
					WAI-ARIA guidelines and best practices. They are fully customizable
					with CSS variables and support dark mode out of the box. Whether you
					are building a simple landing page or a complex dashboard, RadianOS
					has the components you need to create exceptional user experiences.
				</p>
			</CollapsibleContent>
			<CollapsibleTrigger className="mt-2" asChild>
				<Button variant="link" color="primary">
					{isOpen ? "Show Less" : "Show More"}
				</Button>
			</CollapsibleTrigger>
		</Collapsible>
	)
}
