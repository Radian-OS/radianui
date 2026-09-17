"use client"

import React, { useState } from "react"
import { SidebarProvider } from "@/styles/default/ui/sidebar"
import { BoardHeader } from "./board-header"
import { BottomBar } from "./bottom-bar"
import { CreateIssueDialog } from "./create-issue-dialog"
import { HiddenColumnsSidebar } from "./hidden-columns-sidebar"
import { KanbanColumn } from "./kanban-column"
import { Sidebar } from "./sidebar"
import { TopHeader } from "./top-header"
import type { ColumnData, Issue, IssueStatus } from "./types"

const initialIssues: Issue[] = [
	// Todo Column
	{
		id: "AS-12",
		title: "Create alignment summary document",
		status: "todo",
		priority: "medium",
		createdDate: "Mar 31",
		tags: [{ label: "Documentation", dotColorClass: "bg-amber-500" }],
	},
	{
		id: "AS-10",
		title: "Define success metrics (KPIs)",
		status: "todo",
		priority: "high",
		dueDate: "Apr 8",
		createdDate: "Mar 31",
		tags: [
			{ label: "Analytics", dotColorClass: "bg-blue-500" },
			{ label: "Feature", dotColorClass: "bg-purple-500" },
		],
	},

	// In Progress Column
	{
		id: "AS-11",
		title: "Create user personas (internal users)",
		status: "in_progress",
		priority: "medium",
		createdDate: "Mar 31",
		tags: [
			{ label: "Research", dotColorClass: "bg-emerald-500" },
			{ label: "UX", dotColorClass: "bg-cyan-500" },
		],
	},
	{
		id: "AS-9",
		title: "Define problem statement & hypothesis",
		status: "in_progress",
		priority: "high",
		dueDate: "Apr 7",
		createdDate: "Mar 31",
		tags: [{ label: "Feature", dotColorClass: "bg-purple-500" }],
	},

	// Done Column
	{
		id: "AS-20",
		parentTitle: "Conduct stakeholder interviews (P...",
		title: "Create stakeholder insight summary",
		status: "done",
		priority: "medium",
		createdDate: "Mar 31",
		tags: [{ label: "UX", dotColorClass: "bg-cyan-500" }],
	},
	{
		id: "AS-19",
		parentTitle: "Conduct stakeholder interviews (P...",
		title: "Take notes & record key insights",
		status: "done",
		priority: "medium",
		createdDate: "Mar 31",
		tags: [{ label: "UX", dotColorClass: "bg-cyan-500" }],
	},
	{
		id: "AS-18",
		parentTitle: "Conduct stakeholder interviews (P...",
		title: "Conduct UX Designer interviews",
		status: "done",
		priority: "medium",
		createdDate: "Mar 31",
		tags: [{ label: "UX", dotColorClass: "bg-cyan-500" }],
	},
	{
		id: "AS-17",
		parentTitle: "Conduct stakeholder interviews (P...",
		title: "Conduct PM interviews",
		status: "done",
		priority: "medium",
		createdDate: "Mar 31",
		tags: [{ label: "UX", dotColorClass: "bg-cyan-500" }],
	},
	{
		id: "AS-16",
		parentTitle: "Conduct stakeholder interviews (P...",
		title: "Schedule interview sessions",
		status: "done",
		priority: "medium",
		createdDate: "Mar 31",
		tags: [{ label: "UX", dotColorClass: "bg-cyan-500" }],
	},
	{
		id: "AS-15",
		parentTitle: "Conduct stakeholder interviews (P...",
		title: "Prepare interview questions",
		status: "done",
		priority: "medium",
		createdDate: "Mar 31",
		tags: [{ label: "UX", dotColorClass: "bg-cyan-500" }],
	},
	{
		id: "AS-14",
		parentTitle: "Conduct stakeholder interviews (P...",
		title: "Identify participant criteria and screener",
		status: "done",
		priority: "medium",
		createdDate: "Mar 30",
		tags: [{ label: "Research", dotColorClass: "bg-emerald-500" }],
	},
	{
		id: "AS-13",
		parentTitle: "Conduct stakeholder interviews (P...",
		title: "Draft interview discussion guide",
		status: "done",
		priority: "medium",
		createdDate: "Mar 30",
		tags: [{ label: "Documentation", dotColorClass: "bg-amber-500" }],
	},
	{
		id: "AS-8",
		parentTitle: "Conduct stakeholder interviews (P...",
		title: "Review analytics funnel drop-offs",
		status: "done",
		priority: "high",
		createdDate: "Mar 29",
		tags: [{ label: "Analytics", dotColorClass: "bg-blue-500" }],
	},
	{
		id: "AS-7",
		parentTitle: "Conduct stakeholder interviews (P...",
		title: "Audit existing user journey maps",
		status: "done",
		priority: "low",
		createdDate: "Mar 28",
		tags: [{ label: "UX", dotColorClass: "bg-cyan-500" }],
	},
	{
		id: "AS-6",
		parentTitle: "Conduct stakeholder interviews (P...",
		title: "Consolidate telemetry findings",
		status: "done",
		priority: "medium",
		createdDate: "Mar 28",
		tags: [{ label: "Research", dotColorClass: "bg-emerald-500" }],
	},
]

export default function LinearBoardPage() {
	const [issues, setIssues] = useState<Issue[]>(initialIssues)
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const [createDialogStatus, setCreateDialogStatus] =
		useState<IssueStatus>("todo")

	const handleOpenNewIssue = (status: string = "todo") => {
		setCreateDialogStatus(status as IssueStatus)
		setIsCreateDialogOpen(true)
	}

	const handleAddIssue = (newIssue: Issue) => {
		setIssues((prev) => [newIssue, ...prev])
	}

	const columns: ColumnData[] = [
		{
			id: "todo",
			title: "Todo",
			countDisplay: "2 / 3",
			issues: issues.filter((i) => i.status === "todo"),
		},
		{
			id: "in_progress",
			title: "In Progress",
			countDisplay: `${issues.filter((i) => i.status === "in_progress").length}`,
			issues: issues.filter((i) => i.status === "in_progress"),
		},
		{
			id: "done",
			title: "Done",
			countDisplay: `${issues.filter((i) => i.status === "done").length}`,
			issues: issues.filter((i) => i.status === "done"),
		},
	]

	return (
		<SidebarProvider defaultWidth="15rem">
			<div className="bg-bg text-fg flex h-screen w-full overflow-hidden antialiased">
				{/* Left Native Radian Sidebar */}
				<Sidebar onOpenNewIssue={() => handleOpenNewIssue("todo")} />

				{/* Right Main Content Panel */}
				<div className="flex flex-1 flex-col overflow-hidden">
					{/* Top Breadcrumb Header */}
					<TopHeader />

					{/* Board Controls & Views Header */}
					<BoardHeader />

					{/* Kanban Board Horizontal Scrollable Area */}
					<main className="flex-1 overflow-x-auto overflow-y-auto p-4 [scrollbar-width:thin] sm:p-6">
						<div className="flex min-h-full items-start gap-6 pb-6">
							{columns.map((column) => (
								<KanbanColumn
									key={column.id}
									column={column}
									onAddIssue={(status) => handleOpenNewIssue(status)}
								/>
							))}

							{/* Right Collapsible Hidden Columns Panel */}
							<HiddenColumnsSidebar />
						</div>
					</main>

					{/* Fixed Bottom Status Bar */}
					<BottomBar />
				</div>

				{/* Form-Validated Create Issue Dialog */}
				<CreateIssueDialog
					isOpen={isCreateDialogOpen}
					onClose={() => setIsCreateDialogOpen(false)}
					onAddIssue={handleAddIssue}
					defaultStatus={createDialogStatus}
				/>
			</div>
		</SidebarProvider>
	)
}
