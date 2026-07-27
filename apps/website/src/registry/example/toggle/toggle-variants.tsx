"use client"

import { Toggle } from "@/registry/ui/toggle"

export default function ToggleVariants() {
	return (
		<div className="flex flex-wrap items-center gap-2">
			<Toggle variant="outline" aria-label="Toggle italic">
				Outline
			</Toggle>
			<Toggle variant="ghost" aria-label="Toggle bold">
				Ghost
			</Toggle>
		</div>
	)
}
