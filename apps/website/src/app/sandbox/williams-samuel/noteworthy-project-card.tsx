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
		<Card className="gap-0 overflow-hidden rounded-2xl border-white/10 bg-neutral-900/60 p-0 shadow-xl transition-all duration-300 hover:border-white/20 hover:bg-neutral-900">
			{/* Top Banner Artwork */}
			<div className="relative aspect-video w-full overflow-hidden bg-neutral-800">
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
				<h4 className="text-lg font-bold text-white">{project.title}</h4>

				<p className="text-xs leading-relaxed text-neutral-400 sm:text-sm">
					{project.description}
				</p>

				{/* Tech Tags in Emerald Text */}
				<div className="flex flex-wrap items-center gap-3 pt-2">
					{project.tags.map((tag) => (
						<span
							key={tag}
							className="font-mono text-xs font-semibold text-emerald-400">
							{tag}
						</span>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
