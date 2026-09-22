"use client"

import React, { useState } from "react"
import { HelpCircle, History, Send, X } from "lucide-react"
import { Button, IconButton } from "@/styles/default/ui/button"

export function BottomBar() {
	const [filterHidden, setFilterHidden] = useState(true)

	return (
		<footer className="border-border/60 bg-bg text-fg-secondary sticky bottom-0 z-30 flex h-9 w-full items-center justify-between border-t px-3 text-xs transition-colors select-none">
			{/* Left: Help icon */}
			<div className="flex items-center">
				<IconButton
					type="button"
					variant="ghost"
					color="neutral"
					size="28"
					aria-label="Help and resources"
					className="text-fg-secondary hover:text-fg">
					<HelpCircle className="size-4" />
				</IconButton>
			</div>

			{/* Center: Filter state */}
			{filterHidden ? (
				<div className="flex items-center gap-2">
					<span className="text-fg-tertiary">1 issue hidden by filters</span>
					<button
						type="button"
						onClick={() => setFilterHidden(false)}
						className="text-fg flex cursor-pointer items-center gap-1 font-medium transition-colors hover:underline">
						<span>Clear Filters</span>
						<X className="size-3.5" />
					</button>
				</div>
			) : (
				<div className="text-fg-tertiary">No active filters</div>
			)}

			{/* Right: Ask Linear & History */}
			<div className="flex items-center gap-1.5">
				<Button
					type="button"
					variant="ghost"
					color="neutral"
					size="28"
					className="text-fg-secondary hover:text-fg flex items-center gap-1.5 px-2 text-xs font-medium">
					<Send className="size-3.5 -rotate-45" />
					<span>Ask Linear</span>
				</Button>

				<IconButton
					type="button"
					variant="ghost"
					color="neutral"
					size="28"
					aria-label="Recent issue history"
					className="text-fg-secondary hover:text-fg">
					<History className="size-4" />
				</IconButton>
			</div>
		</footer>
	)
}
