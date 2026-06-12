"use client"

import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"

export default function ToggleFormattingToolbar() {
	return (
		<div className="border-border bg-bg flex items-center justify-center gap-1 rounded-md border p-1">
			<Toggle
				className="p-1.5"
				variant="ghost"
				size="32"
				aria-label="Toggle bold">
				<BoldIcon className="text-fg-secondary size-5" />
			</Toggle>
			<Toggle
				className="p-1.5"
				defaultPressed
				variant="ghost"
				size="32"
				aria-label="Toggle italic">
				<ItalicIcon className="text-fg-secondary size-5" />
			</Toggle>
			<Toggle
				className="p-1.5"
				variant="ghost"
				size="32"
				aria-label="Toggle underline">
				<UnderlineIcon className="text-fg-secondary size-5" />
			</Toggle>
		</div>
	)
}
