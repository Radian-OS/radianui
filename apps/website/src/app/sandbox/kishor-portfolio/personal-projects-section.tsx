"use client"

import React from "react"
import Link from "next/link"
import { Gamepad2, Link2, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"
import { PERSONAL_PROJECTS, type PersonalProject } from "./types"

export function PersonalProjectsSection() {
	const renderBadge = (project: PersonalProject) => {
		if (project.badgeLetter) {
			return <span>{project.badgeLetter}</span>
		}
		if (project.badgeIcon === "wallet") {
			return <Wallet className="size-3.5" />
		}
		if (project.badgeIcon === "game") {
			return <Gamepad2 className="size-3.5" />
		}
		return null
	}

	return (
		<div className="flex flex-col gap-3.5 pt-2">
			<h2 className="heading-5 text-foreground">Personal projects</h2>

			<div className="divide-border/60 border-border/70 bg-elevation-level1/10 flex flex-col divide-y rounded-xl border">
				{PERSONAL_PROJECTS.map((project) => (
					<Link
						key={project.id}
						href={project.url}
						target="_blank"
						rel="noreferrer"
						className="group hover:bg-elevation-level1/30 flex items-center justify-between p-3.5 transition-colors">
						<div className="flex items-center gap-3">
							<div
								className={cn(
									"flex size-7 shrink-0 items-center justify-center rounded-md border text-xs font-bold",
									project.badgeColorClass
								)}>
								{renderBadge(project)}
							</div>
							<div className="flex flex-col">
								<span className="text-foreground group-hover:text-primary text-xs font-semibold transition-colors">
									{project.title}
								</span>
								<span className="text-fg-secondary text-[11px]">
									{project.date}
								</span>
							</div>
						</div>
						<Link2 className="text-fg-tertiary group-hover:text-foreground size-4 transition-colors" />
					</Link>
				))}
			</div>
		</div>
	)
}
