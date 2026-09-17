"use client"

import React, { useState } from "react"
import {
	Filter,
	Layers,
	LayoutGrid,
	List,
	SlidersHorizontal,
} from "lucide-react"
import { Button, IconButton } from "@/styles/default/ui/button"

export function BoardHeader() {
	const [activeTab, setActiveTab] = useState("issues")
	const [viewMode, setViewMode] = useState<"board" | "list">("board")

	const tabs = [
		{ id: "overview", label: "Overview" },
		{ id: "updates", label: "Updates" },
		{ id: "issues", label: "Issues" },
	]

	return (
		<div className="border-border/60 bg-bg flex h-11 w-full items-center justify-between border-b px-4 transition-colors">
			{/* Left: View Tabs */}
			<div className="flex items-center gap-1 sm:gap-2">
				{tabs.map((tab) => (
					<Button
						key={tab.id}
						variant="ghost"
						color={activeTab === tab.id ? "primary" : "neutral"}
						size="28"
						onClick={() => setActiveTab(tab.id)}
						className={`rounded-md px-2.5 text-xs font-medium transition-colors ${
							activeTab === tab.id
								? "bg-elevation-level1 text-fg font-semibold shadow-xs"
								: "text-fg-muted hover:text-fg"
						}`}>
						{tab.label}
					</Button>
				))}

				<IconButton
					type="button"
					variant="ghost"
					color="neutral"
					size="28"
					aria-label="Stacked view"
					className="text-fg-muted hover:text-fg ml-0.5">
					<Layers className="size-3.5" />
				</IconButton>
			</div>

			{/* Right: Board controls (Filter, Display, View Toggle) */}
			<div className="flex items-center gap-1">
				<IconButton
					type="button"
					variant="ghost"
					color="neutral"
					size="28"
					aria-label="Filter issues"
					className="text-fg-muted hover:text-fg">
					<Filter className="size-3.5" />
				</IconButton>

				<IconButton
					type="button"
					variant="ghost"
					color="neutral"
					size="28"
					aria-label="Display options"
					className="text-fg-muted hover:text-fg">
					<SlidersHorizontal className="size-3.5" />
				</IconButton>

				<div className="bg-border/60 mx-1 h-3.5 w-px" />

				<IconButton
					type="button"
					variant="ghost"
					color={viewMode === "board" ? "primary" : "neutral"}
					size="28"
					aria-label="Kanban board view"
					onClick={() => setViewMode("board")}
					className={
						viewMode === "board"
							? "bg-elevation-level1 text-fg"
							: "text-fg-muted hover:text-fg"
					}>
					<LayoutGrid className="size-3.5" />
				</IconButton>

				<IconButton
					type="button"
					variant="ghost"
					color={viewMode === "list" ? "primary" : "neutral"}
					size="28"
					aria-label="List view"
					onClick={() => setViewMode("list")}
					className={
						viewMode === "list"
							? "bg-elevation-level1 text-fg"
							: "text-fg-muted hover:text-fg"
					}>
					<List className="size-3.5" />
				</IconButton>
			</div>
		</div>
	)
}
