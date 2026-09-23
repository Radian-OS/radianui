"use client"

import React from "react"
import { ProjectsTableView } from "./projects-table-view"

export default function ProjectsTablePage() {
	return (
		<main className="bg-background text-foreground flex min-h-screen w-full items-center justify-center p-4 sm:p-8 lg:p-12">
			<div className="w-full max-w-6xl">
				<ProjectsTableView />
			</div>
		</main>
	)
}
