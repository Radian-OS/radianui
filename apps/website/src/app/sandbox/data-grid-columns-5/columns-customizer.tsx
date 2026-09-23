"use client"

import React from "react"
import { Columns3 } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"

export interface VisibleColumns {
	company: boolean
	owner: boolean
	stage: boolean
	arr: boolean
	categories: boolean
	health: boolean
}

interface ColumnsCustomizerProps {
	columns: VisibleColumns
	onChange: (columns: VisibleColumns) => void
}

export function ColumnsCustomizer({
	columns,
	onChange,
}: ColumnsCustomizerProps) {
	const toggleColumn = (key: keyof VisibleColumns) => {
		onChange({
			...columns,
			[key]: !columns[key],
		})
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="32"
					className="border-border/70 bg-elevation-level1/20 gap-2 text-xs font-medium">
					<Columns3 className="size-3.5" />
					<span>Columns</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-40 text-xs">
				<DropdownMenuCheckboxItem
					checked={columns.company}
					onCheckedChange={() => toggleColumn("company")}>
					Company
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={columns.owner}
					onCheckedChange={() => toggleColumn("owner")}>
					Owner
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={columns.stage}
					onCheckedChange={() => toggleColumn("stage")}>
					Stage
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={columns.arr}
					onCheckedChange={() => toggleColumn("arr")}>
					ARR
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={columns.categories}
					onCheckedChange={() => toggleColumn("categories")}>
					Categories
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={columns.health}
					onCheckedChange={() => toggleColumn("health")}>
					Health
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
