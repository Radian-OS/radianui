"use client"

import { Badge } from "@/registry/ui/badge"
import React from "react"

const tagRow1 = [
	"Analyze feedback",
	"Enhance experience",
	"Streamline processes",
	"Educate users",
	"Offer support",
	"Implement IT support",
	"Help customers",
	"Resolve issues",
]

const tagRow2 = [
	"Generate copy",
	"Streamline processes",
	"Summarize emails",
	"Prepare for calls",
	"Implement IT support",
	"Help customers",
	"Enhance experience",
	"Sync database",
]

export function AgentlabMultiModelSection() {
	return (
		<section className="bg-black-inverse text-white-inverse relative overflow-hidden py-20 md:py-28">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Two Column Header */}
				<div className="border-border grid grid-cols-1 gap-12 border-b pb-16 md:grid-cols-2 md:gap-16">
					<div>
						<h3 className="heading-3 text-white-inverse font-serif">
							Multi Model AI
						</h3>
						<p className="text-white-inverse/60 mt-3 text-sm leading-relaxed sm:text-base">
							Route tasks intelligently to the right AI model — GPT, Claude,
							DALL-E, or ElevenLabs — based on task type, latency targets, and
							performance goals.
						</p>
					</div>

					<div>
						<h3 className="heading-3 text-white-inverse font-serif">
							Integration
						</h3>
						<p className="text-white-inverse/60 mt-3 text-sm leading-relaxed sm:text-base">
							Connect AgentLab to the tools your team already uses — CRMs,
							support desks, communication hubs, and databases — with native
							integrations in just clicks.
						</p>
					</div>
				</div>

				{/* Animated / Styled Pill Marquee (Rule 18: mapped array) */}
				<div className="mt-14 flex flex-col gap-3.5 overflow-hidden">
					<div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
						{tagRow1.map((tag, idx) => (
							<Badge key={`r1-${idx}`}>{tag}</Badge>
						))}
					</div>

					<div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
						{tagRow2.map((tag, idx) => (
							<Badge key={`r2-${idx}`}>{tag}</Badge>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
