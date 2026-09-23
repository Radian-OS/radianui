"use client"

import React from "react"
import { NOTEWORTHY_PROJECTS } from "./types"
import { NoteworthyProjectCard } from "./noteworthy-project-card"

export function NoteworthyProjectsSection() {
	return (
		<section className="flex flex-col gap-8 py-20">
			<h3 className="heading-3 text-center text-white">
				Other Noteworthy Projects
			</h3>

			<div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-2">
				{NOTEWORTHY_PROJECTS.map((project) => (
					<NoteworthyProjectCard key={project.id} project={project} />
				))}
			</div>
		</section>
	)
}
