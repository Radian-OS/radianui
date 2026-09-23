"use client"

import React from "react"
import { EXPERIENCE_ITEMS } from "./types"
import { ExperienceCard } from "./experience-card"

export function ExperienceSection() {
	return (
		<section className="flex flex-col gap-6 py-8">
			{/* Pure heading utility as per AGENTS.md & claude.md */}
			<h2 className="heading-4 text-white">Work Experience</h2>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{EXPERIENCE_ITEMS.map((item) => (
					<ExperienceCard key={item.id} item={item} />
				))}
			</div>
		</section>
	)
}
