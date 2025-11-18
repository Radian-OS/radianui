"use client"

import React, { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Button, IconButton } from "@/registry/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/ui/collapsible"
import { Divider } from "@/registry/ui/divider"
import { Progress } from "@/registry/ui/progress"
import { Spinner } from "@/registry/ui/spinner"

type TaskStatus = "completed" | "in-progress" | "queued"

type Task = {
	id: string
	title: string
	status: TaskStatus
	progress?: number
	statusLabel?: string
	statusLink?: string
}

type TaskItemProps = {
	task: Task
}

type TaskListProps = {
	tasks: Task[]
}

const MOCK_TASKS: Task[] = [
	{
		id: "1",
		title: "Design System Structure Drafted",
		status: "completed",
		statusLabel: "View Artifact",
		statusLink: "#",
	},
	{
		id: "2",
		title: "Generate Responsive Grid Tokens",
		status: "completed",
	},
	{
		id: "3",
		title: "Review Color Contrast & Accessibility",
		status: "completed",
		statusLabel: "In Progress",
	},
	{
		id: "4",
		title: "Compile Component Documentation",
		status: "completed",
	},
	{
		id: "5",
		title: "Style Guide Generation",
		status: "in-progress",
		progress: 32,
	},
	{
		id: "6",
		title: "Automated Hand-off to Dev (32%)",
		status: "queued",
		statusLabel: "Queued",
	},
]

function TaskItem({ task }: TaskItemProps) {
	const renderStatusIndicator = () => {
		if (task.status === "queued") {
			return <span className="size-5 flex-shrink-0" />
		}
		if (task.status === "in-progress" && task.progress !== undefined) {
			return <Spinner variant="activity" className="text-primary size-5 flex-shrink-0" />
		}
		return <Check className="size-5 flex-shrink-0" />
	}

	const renderStatusContent = () => {
		// Progress indicator
		if (task.progress !== undefined) {
			return (
				<div className="flex items-center gap-2">
					<span className="text-primary font-medium">{task.progress}%</span>
					<Progress value={task.progress} className="w-20" />
				</div>
			)
		}

		// Link button
		if (task.statusLabel && task.statusLink) {
			return (
				<Button variant={"link"} color={task.status === "completed" ? "primary" : "neutral"} asChild>
					<Link href={task.statusLink}>{task.statusLabel}</Link>
				</Button>
			)
		}

		// Plain label
		if (task.statusLabel) {
			return <span className="font-medium">{task.statusLabel}</span>
		}

		return null
	}

	return (
		<li className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				{renderStatusIndicator()}
				<span className={cn(task.progress !== undefined && "text-fg font-medium")}>{task.title}</span>
			</div>
			{renderStatusContent()}
		</li>
	)
}

function TaskList({ tasks }: TaskListProps) {
	return (
		<div className="text-fg-secondary flex flex-col gap-4 p-4 text-sm">
			<div className="flex gap-1">
				<span>Completed Assets & Modules</span>
				<Badge variant="soft" color="neutral" className="rounded-full">
					1/2 Resolved
				</Badge>
			</div>
			<ul className="space-y-3">
				{tasks.map((task) => (
					<TaskItem key={task.id} task={task} />
				))}
			</ul>
		</div>
	)
}

type CollapsibleHeaderProps = {
	title: string
	subtitle: string
	isOpen: boolean
}

function CollapsibleHeader({ title, subtitle, isOpen }: CollapsibleHeaderProps) {
	return (
		<div className="flex items-center gap-3 p-4">
			<div className="flex flex-1 flex-col gap-1">
				<span className="font-semibold">{title}</span>
				<span className="text-fg-secondary text-sm">{subtitle}</span>
			</div>
			<CollapsibleTrigger asChild>
				<IconButton variant="outline" color="neutral" size="32">
					<ChevronDown className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
				</IconButton>
			</CollapsibleTrigger>
		</div>
	)
}

export default function ProjectCollapsible() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen} className="max-w-115 border-soft shadow-xs w-full rounded-xl border transition-all duration-200">
			<CollapsibleHeader title="Design Project: Radian OS 3.0" subtitle="Status: 84% Complete (2 Dependencies Active)" isOpen={isOpen} />
			<CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
				<Divider className="border-soft-alpha" />
				<TaskList tasks={MOCK_TASKS} />
			</CollapsibleContent>
		</Collapsible>
	)
}
