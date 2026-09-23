"use client"

import React from "react"
import Image from "next/image"
import { Badge } from "@/styles/default/ui/badge"
import type { FeaturedProject } from "./types"

interface FeaturedProjectCardProps {
	project: FeaturedProject
}

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
	return (
		<div
			className={`flex flex-col items-center gap-8 lg:gap-12 ${
				project.reverseLayout ? "lg:flex-row-reverse" : "lg:flex-row"
			}`}>
			{/* Project Image Preview */}
			<div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl lg:w-1/2">
				<Image
					src={project.imageSrc}
					alt={project.title}
					width={600}
					height={380}
					className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</div>

			{/* Project Details */}
			<div className="flex w-full flex-col items-start gap-4 lg:w-1/2">
				<span className="font-mono text-3xl font-bold text-neutral-500 sm:text-4xl">
					{project.number}
				</span>

				<h3 className="heading-3 text-white">{project.title}</h3>

				<p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
					{project.description}
				</p>

				{/* Tech Tags using canonical Radian OS Badge */}
				<div className="flex flex-wrap gap-2 pt-2">
					{project.tags.map((tag) => (
						<Badge
							key={tag}
							variant="soft"
							color="neutral"
							size="24"
							className="rounded-md border border-white/10 bg-neutral-800/80 font-mono text-xs text-neutral-300">
							{tag}
						</Badge>
					))}
				</div>

				{/* Action Links (Strictly No Underlines) */}
				<div className="flex items-center gap-6 pt-2">
					<a
						href={project.liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1 font-mono text-sm font-semibold text-white transition-colors hover:text-emerald-400">
						Live Site &rarr;
					</a>
					<a
						href={project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1 font-mono text-sm font-semibold text-white transition-colors hover:text-emerald-400">
						Github &rarr;
					</a>
				</div>
			</div>
		</div>
	)
}
