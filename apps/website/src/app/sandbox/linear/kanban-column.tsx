"use client"

import React from "react"
import {
	CheckCircle2,
	Circle,
	CircleDot,
	MoreHorizontal,
	Plus,
} from "lucide-react"
import { IconButton } from "@/styles/default/ui/button"
import { IssueCard } from "./issue-card"
import type { ColumnData } from "./types"

interface KanbanColumnProps {
	column: ColumnData
	onAddIssue?: (status: string) => void
}

export function KanbanColumn({ column, onAddIssue }: KanbanColumnProps) {
	const renderColumnIcon = () => {
		switch (column.id) {
			case "todo":
				return <Circle className="text-fg-muted/70 size-4 shrink-0" />
			case "in_progress":
				return (
					<CircleDot className="size-4 shrink-0 text-amber-500 dark:text-amber-400" />
				)
			case "done":
				return (
					<CheckCircle2 className="size-4 shrink-0 text-blue-500 dark:text-blue-400" />
				)
			default:
				return <Circle className="text-fg-muted/70 size-4 shrink-0" />
		}
	}

	return (
		<div className="flex w-80 shrink-0 flex-col gap-3">
			{/* Column Header */}
			<div className="flex items-center justify-between px-1">
				<div className="flex items-center gap-2">
					{renderColumnIcon()}
					<span className="text-fg text-sm font-semibold">{column.title}</span>
					<span className="text-fg-muted text-xs font-normal">
						{column.countDisplay}
					</span>
				</div>

				<div className="flex items-center gap-0.5">
					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label="Column options"
						className="text-fg-muted hover:text-fg">
						<MoreHorizontal className="size-4" />
					</IconButton>
					<IconButton
						type="button"
						variant="ghost"
						color="neutral"
						size="28"
						aria-label={`Add issue to ${column.title}`}
						onClick={() => onAddIssue?.(column.id)}
						className="text-fg-muted hover:text-fg">
						<Plus className="size-4" />
					</IconButton>
				</div>
			</div>

			{/* Column Cards List */}
			<div className="flex flex-col gap-2.5 pb-8">
				{column.issues.map((issue) => (
					<IssueCard key={issue.id} issue={issue} />
				))}
			</div>
		</div>
	)
}
