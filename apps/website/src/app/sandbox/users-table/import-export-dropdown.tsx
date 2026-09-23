"use client"

import React from "react"
import {
	ArrowDownUp,
	ChevronDown,
	Download,
	FileSpreadsheet,
	Upload,
} from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"

interface ImportExportDropdownProps {
	onExportCSV?: () => void
	onExportExcel?: () => void
	onImport?: () => void
}

export function ImportExportDropdown({
	onExportCSV,
	onExportExcel,
	onImport,
}: ImportExportDropdownProps) {
	return (
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
	)
}
