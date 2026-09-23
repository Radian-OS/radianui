"use client"

import React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/styles/default/ui/button"

interface ProjectsTableHeaderProps {
	onAddProject?: () => void
}

export function ProjectsTableHeader({
	onAddProject,
}: ProjectsTableHeaderProps) {
	return (
		<div className="flex items-center justify-between">
			<h1 className="heading-4 text-foreground">Project</h1>

			<Button
				type="button"
				variant="strong"
				color="primary"
				size="32"
				onClick={onAddProject}
				className="gap-1.5 text-xs font-semibold">
				<Plus className="size-4" />
				<span>Add project</span>
			</Button>
		</div>
	)
}
