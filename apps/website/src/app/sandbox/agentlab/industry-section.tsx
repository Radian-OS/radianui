"use client"

import React from "react"
import Image from "next/image"

interface IndustryItem {
	title: string
	description: string
	imageUrl: string
}

const industries: IndustryItem[] = [
	{
		title: "Finance",
		description:
			"Automate account inquiries and fraud detection while maintaining SOC 2 compliance.",
		imageUrl:
			"https://framerusercontent.com/images/AQbPdqKasj6Mg3iV4jMK95WPRCM.png",
	},
	{
		title: "Healthcare",
		description:
			"Patient scheduling, prescription refills, and care coordination with full HIPAA compliance standards.",
		imageUrl:
			"https://framerusercontent.com/images/SmH4euiZ3JokwWRNyZrJQyLtlLY.png",
	},
	{
		title: "E-commerce",
		description:
			"Handle order tracking, returns processing, and product recommendations at scale during peak seasons.",
		imageUrl:
			"https://framerusercontent.com/images/wdhlHkmmD4nzkOj8GrECeEq108.png",
	},
	{
		title: "Education",
		description:
			"Student enrollment support and course recommendations for modern learning platforms.",
		imageUrl:
			"https://framerusercontent.com/images/JQzWA4NShfz9Wnr2WD5YRTj9A.png",
	},
	{
		title: "Enterprise",
		description:
			"IT helpdesk automation, employee onboarding workflows, and internal request management at scale.",
		imageUrl:
			"https://framerusercontent.com/images/pdhZaMaOSIzBG5FaYTQR034OyRk.png",
	},
	{
		title: "Insurance",
		description:
			"Claims status updates, policy inquiries, and document collection with secure data handling protocols.",
		imageUrl:
			"https://framerusercontent.com/images/sGnTnbdWuAoVaLMV90SkJYNLAWM.png",
	},
]

export function AgentlabIndustrySection() {
	return (
		<section className="border-border/60 bg-bg border-t py-24 md:py-32">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Category Badge */}
				<div className="border-border/80 bg-fill2/70 text-fg-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider">
					<span className="text-primary font-bold">—</span>
					<span>INDUSTRY</span>
				</div>

				{/* Section Heading (Rule 13: heading-2) */}
				<h2 className="heading-2 text-fg mt-4 font-serif text-3xl font-normal leading-[1.2] tracking-tight sm:text-4xl md:text-5xl">
					Solutions Across Every Sector
				</h2>

				{/* 3x2 Grid (Rule 18: mapped array) */}
				<div className="divide-border/60 border-border/60 mt-14 grid grid-cols-1 divide-y border-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
					{industries.map((item, idx) => (
						<div
							key={item.title}
							className={`hover:bg-fill1/50 group p-8 transition-colors ${
								idx >= 3 ? "sm:border-border/60 sm:border-t" : ""
							}`}>
							{/* Icon Square */}
							<div className="bg-primary/10 shadow-xs relative mb-6 size-20 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-105">
								<Image
									src={item.imageUrl}
									alt={item.title}
									fill
									sizes="80px"
									className="object-contain p-2"
								/>
							</div>

							<h3 className="heading-4 text-fg font-serif text-xl font-normal sm:text-2xl">
								{item.title}
							</h3>
							<p className="text-fg-secondary mt-3 text-xs leading-relaxed sm:text-sm">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
