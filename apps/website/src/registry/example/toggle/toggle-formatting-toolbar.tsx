"use client"

import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"

export default function ToggleFormattingToolbar() {
	return (
		<div className="border-border bg-bg flex items-center justify-center gap-1 rounded-md border p-1">
			<Toggle variant="ghost" size="32" aria-label="Toggle bold">
				<BoldIcon />
			</Toggle>
			<Toggle
				defaultPressed
				variant="ghost"
				size="32"
				aria-label="Toggle italic">
				<ItalicIcon />
			</Toggle>
			<Toggle variant="ghost" size="32" aria-label="Toggle underline">
				<UnderlineIcon />
			</Toggle>
		</div>
	)
}
