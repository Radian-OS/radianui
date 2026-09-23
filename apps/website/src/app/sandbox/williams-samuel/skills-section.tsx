"use client"

import React from "react"
import { SKILLS_LIST } from "./types"

export function SkillsSection() {
	return (
		<section id="skills" className="flex flex-col gap-6 py-20">
			<div className="flex flex-col gap-3">
				<span className="font-mono text-xs font-bold tracking-widest text-emerald-400 uppercase">
					MY SKILLS
				</span>

				<h2 className="heading-2 text-white">Technologies I Work With</h2>

				<p className="max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
					I&apos;ve have taken a number of online courses, currently getting my
					hands dirty with{" "}
					<span className="font-medium text-white">
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
						className="flex items-center rounded-xl border border-white/5 bg-neutral-900/60 px-5 py-4 transition-all duration-200 hover:border-emerald-500/30 hover:bg-neutral-900 hover:shadow-lg">
						<span className="font-mono text-xs font-semibold tracking-wide text-neutral-200 sm:text-sm">
							{skill}
						</span>
					</div>
				))}
			</div>
		</section>
	)
}
