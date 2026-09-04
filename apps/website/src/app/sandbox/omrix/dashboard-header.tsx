"use client"

import React from "react"
import { Bell, Plus, Search } from "lucide-react"
import { Button } from "@/styles/default/ui/button"

export function OmrixDashboardHeader() {
	return (
		<div className="border-border/60 flex flex-wrap items-center justify-between gap-3 border-b px-6 py-4">
			{/* Header Title */}
			<h2 className="heading-6 text-foreground text-base font-bold">
				Dashboard Overview
			</h2>

			{/* Actions Row */}
			<div className="flex flex-1 items-center justify-end gap-2.5 sm:flex-initial">
				{/* Search Bar */}
				<div className="bg-fill1/70 border-border/70 relative flex h-8 w-full min-w-[140px] items-center rounded-lg border px-2.5 sm:w-56">
					<Search className="text-fg-tertiary mr-2 size-3.5 shrink-0" />
					<input
						type="text"
						placeholder="Search..."
						readOnly
						className="text-foreground placeholder:text-fg-tertiary w-full bg-transparent text-xs focus:outline-none"
					/>
				</div>

				{/* New Workflow Button */}
				<Button
					variant="strong"
					color="primary"
					size="32"
					className="shadow-xs gap-1 rounded-lg px-3 text-xs font-semibold">
					<Plus className="size-3.5" />
					<span>New Workflow</span>
				</Button>

				{/* Notifications Bell */}
				<Button
					variant="outline"
					color="neutral"
					size="32"
					className="relative size-8 rounded-lg p-0"
					aria-label="Notifications">
					<Bell className="size-3.5" />
					<span className="bg-error ring-background absolute -right-0.5 -top-0.5 size-2 rounded-full ring-2" />
				</Button>
			</div>
		</div>
	)
}
