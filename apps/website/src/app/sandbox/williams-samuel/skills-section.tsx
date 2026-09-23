"use client"

import React from "react"
import { SKILLS_LIST } from "./types"

export function SkillsSection() {
	return (
		<section id="skills" className="flex flex-col gap-6 py-20">
			<div className="flex flex-col gap-3">
				<span className="text-success font-mono text-xs font-bold tracking-widest uppercase">
					MY SKILLS
				</span>

				<h2 className="heading-2 text-fg">Technologies I Work With</h2>

				<p className="text-fg-secondary max-w-2xl text-sm leading-relaxed sm:text-base">
					I&apos;ve have taken a number of online courses, currently getting my
					hands dirty with{" "}
					<span className="text-fg font-medium">
						Flutter &amp; React Native
					</span>{" "}
					and here are a few technologies I&apos;ve been working with recently:
				</p>
			</div>

			{/* 4-Column Responsive Grid */}
			<div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3 md:grid-cols-4">
				{SKILLS_LIST.map((skill) => (
					<div
						key={skill}
						className="border-border bg-card hover:border-success-border hover:bg-fill1 flex items-center rounded-xl border px-5 py-4 transition-all duration-200 hover:shadow-lg">
						<span className="text-fg font-mono text-xs font-semibold tracking-wide sm:text-sm">
							{skill}
						</span>
					</div>
				))}
			</div>
		</section>
	)
}
