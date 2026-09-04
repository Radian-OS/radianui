"use client"

import React from "react"
import Image from "next/image"

interface ProblemCardItem {
	title: string
	description: string
	imageUrl: string
}

const problemCards: ProblemCardItem[] = [
	{
		title: "No Unified Agent Layer",
		description:
			"Fragmented tools and disconnected automations lead to chaotic task delegation, high maintenance overhead, and inconsistent outputs.",
		imageUrl:
			"https://framerusercontent.com/images/Um7kpW33X62N4GTAd2zbgaxoTdc.png",
	},
	{
		title: "Time-Consuming Tasks",
		description:
			"Repetitive, manual operations drain team bandwidth, slow down customer-facing workflows, and increase operational costs.",
		imageUrl:
			"https://framerusercontent.com/images/sNfkiiKpmA5n0lXmgjZgrZkvCk.png",
	},
	{
		title: "Zero Process Visibility",
		description:
			"Lack of centralized tracking and real-time observability leaves organizations blind to pipeline bottlenecks and silent task failures.",
		imageUrl:
			"https://framerusercontent.com/images/vBQrwmEehzRwXON1C4YwQsAp8M.png",
	},
]

export function AgentlabProblemSection() {
	return (
		<section className="bg-black-inverse text-white-inverse relative overflow-hidden py-24 md:py-32">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Category Badge */}
				<div className="flex justify-center">
					<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
						<span className="text-primary font-bold">—</span>
						<span>THE PROBLEM</span>
					</div>
				</div>

				{/* Section Heading (Rule 13: heading-2) */}
				<h2 className="heading-2 mx-auto mt-6 max-w-4xl text-center font-serif text-3xl font-normal leading-[1.2] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
					Most Organizations Operate with{" "}
					<span className="text-white/50">
						Broken Data Pipelines, Siloed Teams, and Outdated Workflows.
					</span>
				</h2>

				{/* 3 Problem Cards Grid (Rule 18: mapped array) */}
				<div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
					{problemCards.map((item) => (
						<div
							key={item.title}
							className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]">
							{/* 3D Icon Graphic */}
							<div className="relative mb-8 h-44 w-full sm:h-52">
								<Image
									src={item.imageUrl}
									alt={item.title}
									fill
									sizes="(max-width: 768px) 100vw, 33vw"
									className="object-contain object-left transition-transform duration-500 group-hover:scale-105"
								/>
							</div>

							{/* Card Content */}
							<div>
								<h3 className="heading-4 font-serif text-xl font-normal tracking-tight text-white sm:text-2xl">
									{item.title}
								</h3>
								<p className="mt-3 text-xs leading-relaxed text-white/60 sm:text-sm">
									{item.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
