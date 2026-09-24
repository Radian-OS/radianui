"use client"

import React from "react"
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/styles/default/ui/table"
import { CourseTableRow } from "./course-table-row"
import type { CourseItem } from "./types"

export type SortField = "title" | "pathCount" | "score" | "completion"
export type SortOrder = "asc" | "desc"

interface CourseTableProps {
	courses: CourseItem[]
	sortField: SortField | null
	sortOrder: SortOrder
	onSort: (field: SortField) => void
}

export function CourseTable({
	courses,
	sortField,
	sortOrder,
	onSort,
}: CourseTableProps) {
	const renderSortIcon = (field: SortField) => {
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
						{/* Course Column */}
						<TableHead
							onClick={() => onSort("title")}
							className="text-fg-secondary hover:text-fg cursor-pointer text-xs font-semibold select-none">
							<div className="flex items-center gap-1.5">
								<span>Course</span>
								{renderSortIcon("title")}
							</div>
						</TableHead>

						{/* Tags Column */}
						<TableHead className="text-fg-secondary text-xs font-semibold">
							<div className="flex items-center gap-1.5">
								<span>Tags</span>
								<ChevronsUpDown className="text-fg-tertiary size-3.5" />
							</div>
						</TableHead>

						{/* Path Column */}
						<TableHead
							onClick={() => onSort("pathCount")}
							className="text-fg-secondary hover:text-fg cursor-pointer text-xs font-semibold select-none">
							<div className="flex items-center gap-1.5">
								<span>Path</span>
								{renderSortIcon("pathCount")}
							</div>
						</TableHead>

						{/* Score Column */}
						<TableHead
							onClick={() => onSort("score")}
							className="text-fg-secondary hover:text-fg cursor-pointer text-xs font-semibold select-none">
							<div className="flex items-center gap-1.5">
								<span>Score</span>
								{renderSortIcon("score")}
							</div>
						</TableHead>

						{/* Assigned Column */}
						<TableHead className="text-fg-secondary text-xs font-semibold">
							<div className="flex items-center gap-1.5">
								<span>Assigned</span>
								<ChevronsUpDown className="text-fg-tertiary size-3.5" />
							</div>
						</TableHead>

						{/* Completion Column */}
						<TableHead
							onClick={() => onSort("completion")}
							className="text-fg-secondary hover:text-fg cursor-pointer text-xs font-semibold select-none">
							<div className="flex items-center gap-1.5">
								<span>Completion</span>
								{renderSortIcon("completion")}
							</div>
						</TableHead>

						{/* Actions Column */}
						<TableHead className="w-10" />
					</TableRow>
				</TableHeader>

				<TableBody>
					{courses.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={7}
								className="text-fg-tertiary py-12 text-center text-xs">
								No courses match the current filters.
							</TableCell>
						</TableRow>
					) : (
						courses.map((course) => (
							<CourseTableRow key={course.id} course={course} />
						))
					)}
				</TableBody>
			</Table>
		</div>
	)
}
