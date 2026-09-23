"use client"

import React from "react"
import { Briefcase, Building2, Code2, Globe, Palette } from "lucide-react"
import { Card, CardContent } from "@/styles/default/ui/card"
import { EXPERIENCES, type ExperienceItem } from "./types"

export function ExperienceSection() {
	const renderCompanyIcon = (id: string) => {
		switch (id) {
			case "launchpad":
				return <Globe className="text-info size-4" />
			case "bottle":
				return <Building2 className="text-warning size-4" />
			case "personal-projects":
				return <Code2 className="text-success size-4" />
			case "transtech":
				return <Palette className="text-error size-4" />
			default:
				return <Briefcase className="text-fg-secondary size-4" />
		}
	}

	return (
		<div className="flex flex-col gap-4 pt-4">
			<h2 className="heading-5 text-fg">Experience</h2>

			<div className="flex flex-col gap-4">
				{EXPERIENCES.map((exp: ExperienceItem) => (
					<Card
						key={exp.id}
						className="border-border/70 bg-elevation-level1/20 rounded-2xl border p-5 shadow-xs">
						<CardContent className="flex flex-col gap-4 p-0">
							{/* Company header & Role */}
							<div className="flex flex-col gap-1">
								<div className="flex items-center gap-2">
									{renderCompanyIcon(exp.id)}
									<span className="text-fg text-sm font-bold">
										{exp.company}
									</span>
									{exp.isCurrent && (
										<span className="bg-info size-1.5 rounded-full shadow-xs" />
									)}
								</div>

								<div className="flex flex-wrap items-center gap-2 text-xs">
									<span className="text-fg font-semibold">{exp.role}</span>
									<span className="text-fg-tertiary">•</span>
									<span className="text-fg-secondary">{exp.typePeriod}</span>
								</div>
							</div>

							{/* Bullet Points */}
							<ul className="text-fg-secondary flex list-disc flex-col gap-2 pl-4 text-xs leading-relaxed">
								{exp.bullets.map((bullet, idx) => (
									<li key={idx}>{bullet}</li>
								))}
							</ul>

							{/* Skill Badges */}
							<div className="flex flex-wrap gap-1.5 pt-1">
								{exp.skills.map((skill) => (
									<span
										key={skill}
										className="border-border/60 bg-elevation-level1/50 text-fg-secondary rounded-md border px-2 py-0.5 text-[10px] font-medium">
										{skill}
									</span>
								))}
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}
