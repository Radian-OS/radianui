"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { Card, CardContent } from "@/styles/default/ui/card"
import { FEATURED_PROJECTS } from "./types"

export function FeaturedProjectsSection() {
	return (
		<div id="projects" className="flex flex-col gap-4 pt-4">
			<h2 className="heading-5 text-fg">Projects</h2>

			{/* 2x2 Projects Grid */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{FEATURED_PROJECTS.map((project) => (
					<Link key={project.id} href="#" className="group block">
						<Card className="border-border/70 bg-elevation-level1/20 hover:border-border hover:bg-elevation-level1/40 overflow-hidden rounded-2xl border p-0 shadow-xs transition-all duration-200">
							{/* Project Image Thumbnail */}
							<div className="border-border/60 bg-elevation-level1/40 relative aspect-video w-full overflow-hidden border-b">
								<Image
									src={project.imageUrl}
									alt={project.title}
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>

							{/* Card Content */}
							<CardContent className="flex flex-col gap-2.5 p-4">
								<h3 className="text-fg group-hover:text-primary line-clamp-2 text-xs font-semibold transition-colors sm:text-sm">
									{project.title}
								</h3>
								<div className="text-fg-secondary flex items-center gap-2 pt-0.5 text-[11px]">
									<span>{project.date}</span>
									<span className="border-border/60 bg-elevation-level1/50 rounded-md border px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase">
										{project.tag}
									</span>
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>

			{/* Center CTA Button */}
			<div className="flex justify-center pt-2">
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="32"
					className="rounded-full px-4 text-xs font-medium shadow-xs">
					All projects
					<ArrowRight className="ml-1 size-3.5" />
				</Button>
			</div>
		</div>
	)
}
