"use client"

import React from "react"
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"
import { Checkbox } from "@/styles/default/ui/checkbox"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/styles/default/ui/table"
import { ProjectsTableRow } from "./projects-table-row"
import type { ProjectItem } from "./types"

export type ProjectSortField =
	| "name"
	| "category"
	| "progress"
	| "deadline"
	| "rating"
export type SortOrder = "asc" | "desc"

interface ProjectsTableProps {
	projects: ProjectItem[]
	selectedIds: string[]
	onToggleSelect: (id: string) => void
	onToggleSelectAll: () => void
	sortField: ProjectSortField | null
	sortOrder: SortOrder
	onSort: (field: ProjectSortField) => void
}

export function ProjectsTable({
	projects,
	selectedIds,
	onToggleSelect,
	onToggleSelectAll,
	sortField,
	sortOrder,
	onSort,
}: ProjectsTableProps) {
	const allSelected =
		projects.length > 0 && selectedIds.length === projects.length

	const renderSortIcon = (field: ProjectSortField) => {
		if (sortField !== field) {
			return <ChevronsUpDown className="text-fg-tertiary size-3.5" />
		}
		if (sortOrder === "asc") {
			return <ArrowUp className="text-fg size-3.5" />
		}
		return <ArrowDown className="text-fg size-3.5" />
	}

	return (
		<div className="border-border/70 bg-card/40 w-full overflow-hidden rounded-xl border">
			<Table>
				<TableHeader>
					<TableRow className="border-border/70 bg-elevation-level1/10 hover:bg-elevation-level1/10 border-b">
						{/* Master Select All Checkbox */}
						<TableHead className="w-10 py-3 pr-1 pl-4">
							<Checkbox
								size="sm"
								checked={allSelected}
								onCheckedChange={onToggleSelectAll}
								aria-label="Select all projects"
							/>
						</TableHead>

						{/* Name */}
						<TableHead
							onClick={() => onSort("name")}
							className="text-fg-secondary hover:text-fg cursor-pointer text-xs font-semibold select-none">
							<div className="flex items-center gap-1.5">
								<span>Name</span>
								{renderSortIcon("name")}
							</div>
						</TableHead>

						{/* Tags */}
						<TableHead className="text-fg-secondary text-xs font-semibold select-none">
							<div className="flex items-center gap-1.5">
								<span>Tags</span>
								<ChevronsUpDown className="text-fg-tertiary size-3.5" />
							</div>
						</TableHead>

						{/* Assignee */}
						<TableHead className="text-fg-secondary text-xs font-semibold select-none">
							<div className="flex items-center gap-1.5">
								<span>Assignee</span>
								<ChevronsUpDown className="text-fg-tertiary size-3.5" />
							</div>
						</TableHead>

						{/* Progress */}
						<TableHead
							onClick={() => onSort("progress")}
							className="text-fg-secondary hover:text-fg cursor-pointer text-xs font-semibold select-none">
							<div className="flex items-center gap-1.5">
								<span>Progress</span>
								{renderSortIcon("progress")}
							</div>
						</TableHead>

						{/* Deadline */}
						<TableHead
							onClick={() => onSort("deadline")}
							className="text-fg-secondary hover:text-fg cursor-pointer text-xs font-semibold select-none">
							<div className="flex items-center gap-1.5">
								<span>Deadline</span>
								{renderSortIcon("deadline")}
							</div>
						</TableHead>

						{/* Rating */}
						<TableHead
							onClick={() => onSort("rating")}
							className="text-fg-secondary hover:text-fg cursor-pointer pr-4 text-xs font-semibold select-none">
							<div className="flex items-center gap-1.5">
								<span>Rating</span>
								{renderSortIcon("rating")}
							</div>
						</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{projects.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={7}
								className="text-fg-tertiary py-12 text-center text-xs">
								No projects found matching your search.
							</TableCell>
						</TableRow>
					) : (
						projects.map((project) => (
							<ProjectsTableRow
								key={project.id}
								project={project}
								isSelected={selectedIds.includes(project.id)}
								onToggleSelect={onToggleSelect}
							/>
						))
					)}
				</TableBody>
			</Table>
		</div>
	)
}
