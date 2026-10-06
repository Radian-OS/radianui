"use client"

import React from "react"
import Link from "next/link"
import { Github } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { Card, CardContent } from "@/styles/default/ui/card"
import { PROJECTS } from "./types"

export function ProjectsGridSection() {
	return (
		<div id="projects" className="flex flex-col gap-4 pt-8">
			{/* Section Header */}
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2">
						<Github className="text-fg size-5" />
						<h2 className="heading-4 text-fg">Projects</h2>
					</div>
					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="28"
						className="h-6 rounded-md px-2 text-[11px] font-medium">
						All Projects
					</Button>
				</div>
				<p className="text-fg-secondary text-xs sm:text-sm">
					Open-source projects I&apos;ve worked on over the years.
				</p>
			</div>

			{/* 2x3 Project Cards Grid */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{PROJECTS.map((project) => (
					<Card
						key={project.id}
						className="border-border/70 bg-elevation-level1/20 hover:border-border hover:bg-elevation-level1/40 flex flex-col justify-between rounded-2xl border p-4 shadow-xs transition-all duration-200">
						<CardContent className="flex flex-col gap-1.5 p-0">
							<span className="text-fg-tertiary font-mono text-[11px]">
								{project.year}
							</span>
							<h3 className="text-primary hover:text-primary-hover text-sm font-bold transition-colors">
								{project.title}
							</h3>
							<p className="text-fg-secondary text-xs leading-relaxed">
								{project.description}
							</p>
						</CardContent>

						{/* Links Row */}
						<div className="flex items-center gap-3 pt-3 text-xs font-medium">
							{project.articleUrl && (
								<Link
									href={project.articleUrl}
									className="text-primary hover:text-primary-hover transition-colors">
									Article
								</Link>
							)}
							{project.demoUrl && (
								<Link
									href={project.demoUrl}
									className="text-primary hover:text-primary-hover transition-colors">
									Demo
								</Link>
							)}
							{project.sourceUrl && (
								<Link
									href={project.sourceUrl}
									className="text-primary hover:text-primary-hover transition-colors">
									Source
								</Link>
							)}
						</div>
					</Card>
				))}
			</div>
		</div>
	)
}
