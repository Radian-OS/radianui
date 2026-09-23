"use client"

import React from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { Input } from "@/styles/default/ui/input"
import { ImportExportDropdown } from "./import-export-dropdown"

interface UsersTableToolbarProps {
	searchQuery: string
	onSearchChange: (query: string) => void
	onOpenFilter?: () => void
}

export function UsersTableToolbar({
	searchQuery,
	onSearchChange,
	onOpenFilter,
}: UsersTableToolbarProps) {
	return (
		<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			{/* Left: Search Input */}
			<div className="relative w-full sm:w-80">
				<Search className="text-fg-tertiary absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
				<Input
					type="text"
					value={searchQuery}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder="Search"
					className="border-border/70 bg-elevation-level1/20 h-8 pl-9 text-xs"
				/>
			</div>

			{/* Right: Actions */}
			<div className="flex items-center gap-2">
				<ImportExportDropdown />

				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="32"
					onClick={onOpenFilter}
					className="border-border/70 bg-elevation-level1/20 gap-2 text-xs font-medium">
					<SlidersHorizontal className="size-3.5" />
					<span>Filter</span>
					<span className="bg-foreground text-background flex size-4 items-center justify-center rounded-full text-[10px] font-bold">
						1
					</span>
				</Button>
			</div>
		</div>
	)
}
