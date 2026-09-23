"use client"

import React from "react"
import { FileText, Filter, MoreVertical, Settings2 } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { Input } from "@/styles/default/ui/input"
import { ColumnsCustomizer, type VisibleColumns } from "./columns-customizer"

interface CompaniesToolbarProps {
	searchQuery: string
	onSearchChange: (query: string) => void
	columns: VisibleColumns
	onColumnsChange: (columns: VisibleColumns) => void
	onOpenFilter?: () => void
	onOpenSettings?: () => void
}

export function CompaniesToolbar({
	searchQuery,
	onSearchChange,
	columns,
	onColumnsChange,
	onOpenFilter,
	onOpenSettings,
}: CompaniesToolbarProps) {
	return (
		<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			{/* Left: Compound search pill & Filter button */}
			<div className="flex flex-1 flex-wrap items-center gap-2">
				{/* Compound Search Box */}
				<div className="border-border/80 bg-elevation-level1/20 focus-within:border-border flex h-8 w-full max-w-sm items-center rounded-lg border px-2.5 transition-colors">
					<div className="text-foreground border-border/60 flex items-center gap-1.5 border-r pr-2 text-xs font-medium">
						<FileText className="text-fg-tertiary size-3.5" />
						<span>Company</span>
					</div>

					<span className="text-fg-tertiary px-2 text-xs">contains</span>

					<Input
						type="text"
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						placeholder="Search companies..."
						className="h-7 border-0 bg-transparent px-1 text-xs shadow-none focus-visible:ring-0 focus-visible:outline-none"
					/>

					<button
						type="button"
						aria-label="Filter options"
						className="text-fg-tertiary hover:text-foreground shrink-0 transition-colors">
						<MoreVertical className="size-3.5" />
					</button>
				</div>

				{/* Filter Button */}
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="32"
					onClick={onOpenFilter}
					className="border-border/70 bg-elevation-level1/20 gap-1.5 text-xs font-medium">
					<Filter className="size-3.5" />
					<span>Filter</span>
				</Button>
			</div>

			{/* Right: Columns customizer & Settings */}
			<div className="flex items-center gap-2">
				<ColumnsCustomizer columns={columns} onChange={onColumnsChange} />

				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="32"
					onClick={onOpenSettings}
					className="border-border/70 bg-elevation-level1/20 gap-1.5 text-xs font-medium">
					<Settings2 className="size-3.5" />
					<span>Settings</span>
				</Button>
			</div>
		</div>
	)
}
