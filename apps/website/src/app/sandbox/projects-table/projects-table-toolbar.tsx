"use client"

import React from "react"
import {
	ArrowDownUp,
	ChevronDown,
	Download,
	FileSpreadsheet,
	Search,
	SlidersHorizontal,
	Upload,
} from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import { Input } from "@/styles/default/ui/input"

interface ProjectsTableToolbarProps {
	searchQuery: string
	onSearchChange: (query: string) => void
	onOpenFilter?: () => void
	onExportCSV?: () => void
	onExportExcel?: () => void
	onImport?: () => void
}

export function ProjectsTableToolbar({
	searchQuery,
	onSearchChange,
	onOpenFilter,
	onExportCSV,
	onExportExcel,
	onImport,
}: ProjectsTableToolbarProps) {
	return (
		<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			{/* Left: Search input */}
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

			{/* Right: Import/Export + Filter */}
			<div className="flex items-center gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							type="button"
							variant="outline"
							color="neutral"
							size="32"
							className="border-border/70 bg-elevation-level1/20 gap-1.5 text-xs font-medium">
							<ArrowDownUp className="text-fg-tertiary size-3.5" />
							<span>Import / Export</span>
							<ChevronDown className="text-fg-tertiary size-3" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-44 text-xs">
						<DropdownMenuItem onClick={onImport} className="gap-2">
							<Upload className="size-3.5" />
							<span>Import CSV</span>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={onExportCSV} className="gap-2">
							<Download className="size-3.5" />
							<span>Export CSV</span>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={onExportExcel} className="gap-2">
							<FileSpreadsheet className="size-3.5" />
							<span>Export to Excel</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="32"
					onClick={onOpenFilter}
					className="border-border/70 bg-elevation-level1/20 gap-2 text-xs font-medium">
					<SlidersHorizontal className="size-3.5" />
					<span>Filter</span>
					<span className="bg-fg text-fg-inverse flex size-4 items-center justify-center rounded-full text-[10px] font-bold">
						5
					</span>
				</Button>
			</div>
		</div>
	)
}
