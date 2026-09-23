"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Badge } from "@/styles/default/ui/badge"
import { Checkbox } from "@/styles/default/ui/checkbox"
import { TableCell, TableRow } from "@/styles/default/ui/table"
import { ProjectProgressBar } from "./project-progress-bar"
import { ProjectRatingStars } from "./project-rating-stars"
import type { ProjectItem } from "./types"

interface ProjectsTableRowProps {
	project: ProjectItem
	isSelected: boolean
	onToggleSelect: (id: string) => void
}

export function ProjectsTableRow({
	project,
	isSelected,
	onToggleSelect,
}: ProjectsTableRowProps) {
	return (
		<TableRow
			data-state={isSelected ? "selected" : undefined}
			className="border-border/60 hover:bg-elevation-level1/20 transition-colors">
			{/* Checkbox */}
			<TableCell className="w-10 py-3 pr-1 pl-4">
				<Checkbox
					size="sm"
					checked={isSelected}
					onCheckedChange={() => onToggleSelect(project.id)}
					aria-label={`Select ${project.name}`}
				/>
			</TableCell>

			{/* Name & Subtitle */}
			<TableCell className="py-3">
				<div className="flex flex-col">
					<span className="text-fg text-xs font-semibold">{project.name}</span>
					<span className="text-fg-tertiary text-[11px]">
						{project.category}
					</span>
				</div>
			</TableCell>

			{/* Tags */}
			<TableCell className="py-3">
				<div className="flex flex-wrap items-center gap-1.5">
					{project.tags.map((tag) => (
						<Badge
							key={tag}
							variant="soft"
							color="neutral"
							size="20"
							className="border-border/70 bg-elevation-level1/40 text-fg-secondary px-2 py-0.5 text-[11px] font-medium">
							{tag}
						</Badge>
					))}
				</div>
			</TableCell>

			{/* Assignee Avatar Stack */}
			<TableCell className="py-3">
				<div className="flex items-center -space-x-1">
					{project.assignees.map((assignee) => (
						<div key={assignee.id} className="relative">
							{assignee.avatarUrl ? (
								<Avatar
									size="20"
									rounded="circle"
									className="border-card ring-border/40 border-2 ring-1">
									<AvatarImage
										src={assignee.avatarUrl}
										alt={assignee.initials || "User"}
									/>
									<AvatarFallback className="text-[9px] font-semibold">
										{assignee.initials}
									</AvatarFallback>
								</Avatar>
							) : (
								<span className="border-card bg-elevation-level1 text-fg-secondary ring-border/40 flex size-5 items-center justify-center rounded-full border-2 text-[9px] font-bold ring-1">
									{assignee.initials}
								</span>
							)}
						</div>
					))}
				</div>
			</TableCell>

			{/* Progress */}
			<TableCell className="py-3">
				<ProjectProgressBar
					step={project.progressStep}
					total={project.progressTotal}
				/>
			</TableCell>

			{/* Deadline */}
			<TableCell className="text-fg-secondary py-3 text-xs">
				{project.deadline || ""}
			</TableCell>

			{/* Rating Stars */}
			<TableCell className="py-3 pr-4">
				<ProjectRatingStars rating={project.rating} />
			</TableCell>
		</TableRow>
	)
}
