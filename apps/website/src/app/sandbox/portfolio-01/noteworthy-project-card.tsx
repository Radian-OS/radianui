"use client"

import React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/styles/default/ui/card"
import type { NoteworthyProject } from "./types"

interface NoteworthyProjectCardProps {
	project: NoteworthyProject
}

export function NoteworthyProjectCard({ project }: NoteworthyProjectCardProps) {
	return (
		<Card className="border-border bg-card hover:border-alpha hover:bg-fill1 gap-0 overflow-hidden rounded-2xl border p-0 shadow-xl transition-all duration-300">
			{/* Top Banner Artwork */}
			<div className="bg-fill2 relative aspect-video w-full overflow-hidden">
				<Image
					src={project.imageSrc}
					alt={project.title}
					width={450}
					height={260}
					className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</div>

			{/* Card Body */}
			<CardContent className="flex flex-col gap-3 p-6">
				<h4 className="text-fg text-lg font-bold">{project.title}</h4>

				<p className="text-fg-secondary text-xs leading-relaxed sm:text-sm">
					{project.description}
				</p>

				{/* Tech Tags in Emerald Text */}
				<div className="flex flex-wrap items-center gap-3 pt-2">
					{project.tags.map((tag) => (
						<span
							key={tag}
							className="text-success font-mono text-xs font-semibold">
							{tag}
						</span>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
