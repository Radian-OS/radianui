"use client"

import React from "react"
import Image from "next/image"
import { BookOpen, MoreHorizontal, Plus, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import { TableCell, TableRow } from "@/styles/default/ui/table"
import { CourseCompletionRing } from "./course-completion-ring"
import type { CourseCategory, CourseItem } from "./types"

interface CourseTableRowProps {
	course: CourseItem
}

export function CourseTableRow({ course }: CourseTableRowProps) {
	const renderCategoryBadge = (category: CourseCategory) => {
		switch (category) {
			case "Development":
				return (
					<Badge variant="soft" color="blue" size="20">
						Development
					</Badge>
				)
			case "Fundamental":
				return (
					<Badge variant="soft" color="amber" size="20">
						Fundamental
					</Badge>
				)
			case "Design":
				return (
					<Badge variant="soft" color="purple" size="20">
						Design
					</Badge>
				)
			case "UI/UX":
				return (
					<Badge variant="soft" color="cyan" size="20">
						UI/UX
					</Badge>
				)
		}
	}

	const renderUrgencyBadge = (urgency: CourseItem["urgency"]) => {
		if (urgency === "Urgent") {
			return (
				<Badge variant="soft" color="rose" size="20">
					Urgent
				</Badge>
			)
		}
		return (
			<Badge
				variant="soft"
				color="neutral"
				size="20"
				className="text-fg-tertiary">
				Not Urgent
			</Badge>
		)
	}

	const visibleAssignees = course.assigned.slice(0, 3)
	const extraCount = course.assigned.length - visibleAssignees.length

	return (
		<TableRow className="border-border/60 hover:bg-elevation-level1/20 transition-colors">
			{/* Course Name & Details */}
			<TableCell className="py-3">
				<div className="flex items-center gap-3">
					<div className="border-border/70 bg-elevation-level1/40 relative size-11 shrink-0 overflow-hidden rounded-lg border">
						<Image
							src={course.thumbnail}
							alt={course.title}
							width={44}
							height={44}
							className="size-full object-cover"
						/>
					</div>
					<div className="flex flex-col">
						<span className="text-foreground text-xs font-semibold">
							{course.title}
						</span>
						<span className="text-fg-tertiary text-[11px]">
							by {course.instructor} • Created {course.createdAt}
						</span>
					</div>
				</div>
			</TableCell>

			{/* Tags Column */}
			<TableCell className="py-3">
				<div className="flex flex-wrap items-center gap-1.5">
					{renderCategoryBadge(course.category)}
					{renderUrgencyBadge(course.urgency)}
				</div>
			</TableCell>

			{/* Path Column */}
			<TableCell className="py-3">
				<div className="flex items-center gap-1.5">
					<BookOpen className="text-fg-tertiary size-3.5" />
					<span className="text-foreground text-xs font-medium">
						{course.pathCount}
					</span>
				</div>
			</TableCell>

			{/* Score Column */}
			<TableCell className="py-3">
				<div className="flex items-center gap-1.5">
					<div className="flex items-center gap-0.5">
						{[1, 2, 3, 4, 5].map((starIndex) => {
							const isFilled = starIndex <= Math.round(course.score)
							return (
								<Star
									key={starIndex}
									className={`size-3 ${
										isFilled ? "fill-amber-400 text-amber-400" : "text-muted/30"
									}`}
								/>
							)
						})}
					</div>
					<span className="text-fg-secondary font-mono text-xs">
						{course.score.toFixed(1)}
					</span>
				</div>
			</TableCell>

			{/* Assigned Column */}
			<TableCell className="py-3">
				<div className="flex items-center">
					<div className="flex items-center -space-x-1.5">
						{visibleAssignees.map((assignee) => (
							<Avatar
								key={assignee.id}
								size="20"
								rounded="circle"
								className="border-card ring-border/40 border-2 ring-1">
								<AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
								<AvatarFallback className="text-[9px] font-semibold">
									{assignee.initials}
								</AvatarFallback>
							</Avatar>
						))}
						{extraCount > 0 && (
							<span className="border-card bg-elevation-level1 text-fg-secondary flex size-5 items-center justify-center rounded-full border-2 text-[9px] font-bold">
								+{extraCount}
							</span>
						)}
					</div>
					<button
						type="button"
						aria-label="Add assignee"
						className="border-border/80 text-fg-tertiary hover:border-foreground hover:text-foreground ml-1.5 flex size-5 items-center justify-center rounded-full border border-dashed transition-colors">
						<Plus className="size-2.5" />
					</button>
				</div>
			</TableCell>

			{/* Completion Column */}
			<TableCell className="py-3">
				<CourseCompletionRing percentage={course.completion} />
			</TableCell>

			{/* Actions Dropdown */}
			<TableCell className="py-3 text-right">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							type="button"
							variant="ghost"
							color="neutral"
							size="28"
							className="text-fg-tertiary hover:text-foreground size-7 p-0">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="text-xs">
						<DropdownMenuItem>Edit Course</DropdownMenuItem>
						<DropdownMenuItem>Duplicate</DropdownMenuItem>
						<DropdownMenuItem>Archive</DropdownMenuItem>
						<DropdownMenuItem className="text-error">Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	)
}
