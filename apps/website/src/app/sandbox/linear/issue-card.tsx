"use client"

import React from "react"
import {
	BarChart2,
	Calendar,
	CheckCircle2,
	Circle,
	CircleDot,
	Sparkles,
} from "lucide-react"
import type { Issue } from "./types"

interface IssueCardProps {
	issue: Issue
}

export function IssueCard({ issue }: IssueCardProps) {
	const renderStatusIcon = () => {
		switch (issue.status) {
			case "todo":
				return <Circle className="text-fg-tertiary size-4 shrink-0" />
			case "in_progress":
				return <CircleDot className="text-warning size-4 shrink-0" />
			case "done":
				return <CheckCircle2 className="text-primary size-4 shrink-0" />
			default:
				return <Circle className="text-fg-tertiary size-4 shrink-0" />
		}
	}

	return (
		<div className="bg-bg hover:border-border group border-border/60 relative flex flex-col gap-2.5 rounded-lg border p-3.5 shadow-xs transition-all hover:shadow-sm">
			{/* Top Header Row: ID, Parent Breadcrumb, AI/Sparkles */}
			<div className="text-fg-secondary flex items-center justify-between text-xs">
				<div className="flex items-center gap-1.5 truncate">
					<span className="font-medium">{issue.id}</span>
					{issue.parentTitle && (
						<>
							<span className="text-fg-tertiary">›</span>
							<span className="text-fg-secondary truncate">
								{issue.parentTitle}
							</span>
						</>
					)}
				</div>
				<button
					type="button"
					aria-label="Issue AI actions"
					className="text-fg-tertiary hover:text-fg opacity-0 transition-opacity group-hover:opacity-100">
					<Sparkles className="size-3.5" />
				</button>
			</div>

			{/* Issue Title with Status Indicator */}
			<div className="flex items-start gap-2.5">
				<div className="mt-0.5">{renderStatusIcon()}</div>
				<h4 className="text-fg text-sm leading-snug font-medium">
					{issue.title}
				</h4>
			</div>

			{/* Badges / Metadata row */}
			<div className="flex flex-wrap items-center gap-1.5 pt-1">
				{/* Priority Icon */}
				<div className="text-fg-tertiary flex size-5 items-center justify-center rounded">
					<BarChart2 className="size-3.5 rotate-90" />
				</div>

				{/* Due Date if any */}
				{issue.dueDate && (
					<div className="bg-fill1 border-border text-fg-secondary inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs">
						<Calendar className="text-warning size-3" />
						<span>{issue.dueDate}</span>
					</div>
				)}

				{/* Tag Pills */}
				{issue.tags.map((tag) => (
					<div
						key={tag.label}
						className="bg-fill1 border-border text-fg-secondary inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-normal">
						<span
							className={`size-1.5 shrink-0 rounded-full ${tag.dotColorClass}`}
						/>
						<span>{tag.label}</span>
					</div>
				))}
			</div>

			{/* Footer: Created date */}
			<div className="text-fg-tertiary pt-0.5 text-[11px]">
				Created {issue.createdDate}
			</div>
		</div>
	)
}
