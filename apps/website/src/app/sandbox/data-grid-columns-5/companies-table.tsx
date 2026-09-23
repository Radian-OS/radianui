"use client"

import React from "react"
import {
	ArrowDown,
	ArrowUp,
	ChevronsUpDown,
	DollarSign,
	FileText,
	Hash,
	ListFilter,
	Split,
	User,
} from "lucide-react"
import { Checkbox } from "@/styles/default/ui/checkbox"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/styles/default/ui/table"
import type { VisibleColumns } from "./columns-customizer"
import { CompaniesTableRow } from "./companies-table-row"
import type { CompanyItem } from "./types"

export type SortField = "name" | "owner" | "stage" | "arrValue" | "health"
export type SortOrder = "asc" | "desc"

interface CompaniesTableProps {
	companies: CompanyItem[]
	selectedIds: string[]
	onToggleSelect: (id: string) => void
	onToggleSelectAll: () => void
	sortField: SortField | null
	sortOrder: SortOrder
	onSort: (field: SortField) => void
	columns: VisibleColumns
}

export function CompaniesTable({
	companies,
	selectedIds,
	onToggleSelect,
	onToggleSelectAll,
	sortField,
	sortOrder,
	onSort,
	columns,
}: CompaniesTableProps) {
	const allSelected =
		companies.length > 0 && selectedIds.length === companies.length

	const renderSortIcon = (field: SortField) => {
		if (sortField !== field) {
			return <ChevronsUpDown className="text-fg-tertiary size-3.5" />
		}
		if (sortOrder === "asc") {
			return <ArrowUp className="text-foreground size-3.5" />
		}
		return <ArrowDown className="text-foreground size-3.5" />
	}

	return (
		<div className="border-border/70 bg-card/40 w-full overflow-hidden rounded-xl border">
			<Table>
				<TableHeader>
					<TableRow className="border-border/70 bg-elevation-level1/10 hover:bg-elevation-level1/10 border-b">
						{/* Select All Checkbox */}
						<TableHead className="w-10 py-3 pr-1 pl-4">
							<Checkbox
								size="sm"
								checked={allSelected}
								onCheckedChange={onToggleSelectAll}
								aria-label="Select all companies"
							/>
						</TableHead>

						{/* Company */}
						{columns.company && (
							<TableHead
								onClick={() => onSort("name")}
								className="text-fg-secondary hover:text-foreground cursor-pointer text-xs font-semibold select-none">
								<div className="flex items-center gap-1.5">
									<FileText className="text-fg-tertiary size-3.5" />
									<span>Company</span>
									{renderSortIcon("name")}
								</div>
							</TableHead>
						)}

						{/* Owner */}
						{columns.owner && (
							<TableHead
								onClick={() => onSort("owner")}
								className="text-fg-secondary hover:text-foreground cursor-pointer text-xs font-semibold select-none">
								<div className="flex items-center gap-1.5">
									<User className="text-fg-tertiary size-3.5" />
									<span>Owner</span>
									{renderSortIcon("owner")}
								</div>
							</TableHead>
						)}

						{/* Stage */}
						{columns.stage && (
							<TableHead
								onClick={() => onSort("stage")}
								className="text-fg-secondary hover:text-foreground cursor-pointer text-xs font-semibold select-none">
								<div className="flex items-center gap-1.5">
									<Split className="text-fg-tertiary size-3.5" />
									<span>Stage</span>
									{renderSortIcon("stage")}
								</div>
							</TableHead>
						)}

						{/* ARR */}
						{columns.arr && (
							<TableHead
								onClick={() => onSort("arrValue")}
								className="text-fg-secondary hover:text-foreground cursor-pointer text-xs font-semibold select-none">
								<div className="flex items-center gap-1.5">
									<DollarSign className="text-fg-tertiary size-3.5" />
									<span>ARR</span>
									{renderSortIcon("arrValue")}
								</div>
							</TableHead>
						)}

						{/* Categories */}
						{columns.categories && (
							<TableHead className="text-fg-secondary text-xs font-semibold">
								<div className="flex items-center gap-1.5">
									<ListFilter className="text-fg-tertiary size-3.5" />
									<span>Categories</span>
								</div>
							</TableHead>
						)}

						{/* Health */}
						{columns.health && (
							<TableHead
								onClick={() => onSort("health")}
								className="text-fg-secondary hover:text-foreground cursor-pointer text-xs font-semibold select-none">
								<div className="flex items-center gap-1.5">
									<Hash className="text-fg-tertiary size-3.5" />
									<span>Health</span>
									{renderSortIcon("health")}
								</div>
							</TableHead>
						)}

						{/* Actions */}
						<TableHead className="w-10 pr-4" />
					</TableRow>
				</TableHeader>

				<TableBody>
					{companies.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={8}
								className="text-fg-tertiary py-12 text-center text-xs">
								No companies found matching your criteria.
							</TableCell>
						</TableRow>
					) : (
						companies.map((company) => (
							<CompaniesTableRow
								key={company.id}
								company={company}
								isSelected={selectedIds.includes(company.id)}
								onToggleSelect={onToggleSelect}
								columns={columns}
							/>
						))
					)}
				</TableBody>
			</Table>
		</div>
	)
}
