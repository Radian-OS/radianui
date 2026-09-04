"use client"

import React from "react"
import { TrendingUp } from "lucide-react"

interface WorkflowRow {
	name: string
	dotColor: string
	runs: string
	status: string
	statusColor: string
	lastRun: string
}

const workflowRows: WorkflowRow[] = [
	{
		name: "Lead Nurture Flow",
		dotColor: "bg-warning",
		runs: "12,483",
		status: "Active",
		statusColor: "text-success bg-success-accent border-success-border/30",
		lastRun: "2 minutes ago",
	},
	{
		name: "Invoice Sync",
		dotColor: "bg-amber",
		runs: "8,291",
		status: "Paused",
		statusColor: "text-fg-tertiary bg-fill2 border-border/40",
		lastRun: "15 minutes ago",
	},
]

export function OmrixDashboardTable() {
	return (
		<div className="border-border/60 bg-fill1/10 rounded-xl border">
			{/* Table Title */}
			<div className="border-border/60 border-b px-5 py-3.5">
				<h3 className="text-foreground text-sm font-semibold">
					Active Workflows
				</h3>
			</div>

			{/* Table Structure */}
			<div className="w-full overflow-x-auto">
				<div className="min-w-[560px]">
					{/* Table Column Headers */}
					<div className="text-fg-tertiary border-border/40 grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr] items-center border-b px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider">
						<div>Workflow Name</div>
						<div>Runs</div>
						<div>Status</div>
						<div>Trend</div>
						<div>Last Run</div>
					</div>

					{/* Table Body Rows */}
					<div className="divide-border/40 divide-y">
						{workflowRows.map((row) => (
							<div
								key={row.name}
								className="hover:bg-fill1/40 grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr] items-center px-5 py-3 text-xs transition-colors">
								{/* Name with Status Dot */}
								<div className="flex items-center gap-2">
									<span className={`size-2 rounded-full ${row.dotColor}`} />
									<span className="text-foreground font-medium">
										{row.name}
									</span>
								</div>

								{/* Runs Count */}
								<div className="text-fg-secondary font-medium">{row.runs}</div>

								{/* Status Badge */}
								<div>
									<span
										className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold ${row.statusColor}`}>
										{row.status}
									</span>
								</div>

								{/* Trend Indicator */}
								<div className="text-fg-secondary flex items-center gap-1">
									<TrendingUp className="size-3.5 opacity-70" />
								</div>

								{/* Last Run Time */}
								<div className="text-fg-tertiary text-[11px]">
									{row.lastRun}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
