"use client"

import React from "react"
import { FEATURED_PROJECTS } from "./types"
import { FeaturedProjectCard } from "./featured-project-card"

export function FeaturedProjectsSection() {
	return (
		<section id="projects" className="flex flex-col gap-10 py-20">
			<div className="flex flex-col gap-3">
				<span className="text-success font-mono text-xs font-bold tracking-widest uppercase">
					MY PROJECTS
				</span>

				<h2 className="heading-2 text-fg">Some Things I Built</h2>

				<p className="text-fg-secondary max-w-2xl text-sm leading-relaxed sm:text-base">
					I like to stay busy and always have a project in the works. Take a
					look at some of the applications I&apos;ve have built
				</p>
			</div>

			{/* List of Featured Projects */}
			<div className="flex flex-col gap-20 pt-6 sm:gap-28">
				{FEATURED_PROJECTS.map((project) => (
					<FeaturedProjectCard key={project.id} project={project} />
				))}
			</div>
		</section>
	)
}
