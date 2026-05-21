"use client"

import { BoldIcon, ItalicIcon } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"

export default function ToggleVariants() {
	return (
		<div className="flex flex-wrap items-center gap-2">
			<Toggle variant="outline" aria-label="Toggle italic">
				<ItalicIcon />
				Italic
			</Toggle>
			<Toggle variant="ghost" aria-label="Toggle bold">
				<BoldIcon />
				Bold
			</Toggle>
		</div>
	)
}
