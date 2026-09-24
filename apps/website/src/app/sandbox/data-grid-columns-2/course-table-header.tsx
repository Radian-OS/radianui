"use client"

import React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/styles/default/ui/button"

interface CourseTableHeaderProps {
	publishedCount: number
	draftCount: number
	onAddCourse?: () => void
}

export function CourseTableHeader({
	publishedCount,
	draftCount,
	onAddCourse,
}: CourseTableHeaderProps) {
	return (
		<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex flex-col gap-1">
				<h1 className="heading-4 text-fg">Course Catalog</h1>
				<p className="text-fg-secondary flex items-center gap-1.5 text-xs">
					<span>{publishedCount} published</span>
					<span>•</span>
					<span>{draftCount} draft</span>
				</p>
			</div>

			<Button
				type="button"
				variant="strong"
				color="primary"
				size="32"
				onClick={onAddCourse}
				className="gap-1.5 text-xs font-semibold">
				<Plus className="size-4" />
				<span>Add course</span>
			</Button>
		</div>
	)
}
