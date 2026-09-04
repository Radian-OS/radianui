"use client"

import React, { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/styles/default/ui/button"

interface TestimonialItem {
	id: string
	companyName: string
	logoUrl: string
	headline: string
	quote: string
	authorName: string
	authorRole: string
	avatarUrl: string
}

const testimonials: TestimonialItem[] = [
	{
		id: "zenzap",
		companyName: "ZenZap",
		logoUrl:
			"https://framerusercontent.com/images/yg73mxfKVqYxGdl9PXd5goIE.svg",
		headline:
			"The orchestration layer simplifies complex workflows and makes easier to manage.",
		quote:
			"AgentLab brings much-needed structure to AI automation workflows. The orchestration layer is rock solid, giving our engineering team complete peace of mind while scaling our agent fleets.",
		authorName: "Marcus Vance",
		authorRole: "VP of Engineering, ZenZap",
		avatarUrl:
			"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
	},
	{
		id: "sparkle",
		companyName: "Sparkle",
		logoUrl:
			"https://framerusercontent.com/images/6Fbv7vEmmB0WPOWiVDEZNhoZ0.svg",
		headline: "Deployed our first 10 production agents in less than two weeks.",
		quote:
			"We cut customer support resolution times by 65% in the first month alone. The guardrails and fallback mechanisms are unmatched.",
		authorName: "Elena Rostova",
		authorRole: "Head of Operations, Sparkle",
		avatarUrl:
			"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
	},
	{
		id: "craftgram",
		companyName: "Craftgram",
		logoUrl:
			"https://framerusercontent.com/images/0tQJ7SlKdpCZUVbUjxOEy57XRhA.svg",
		headline:
			"Automated our entire multi-step lead enrichment pipeline without writing glue code.",
		quote:
			"AgentLab saved our team hundreds of hours each sprint. The pre-built agent logic and instant CRM sync let us launch faster than ever.",
		authorName: "David Chen",
		authorRole: "Chief Technology Officer, Craftgram",
		avatarUrl:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
	},
	{
		id: "pulse",
		companyName: "Pulse",
		logoUrl:
			"https://framerusercontent.com/images/hsbt5NG4UUe3LO7ERSFGv8A0PrA.svg",
		headline:
			"99.9% uptime SLA and real-time observability across all AI tasks.",
		quote:
			"As an enterprise fintech company, security and audit logs are non-negotiable. AgentLab checked every compliance box from day one.",
		authorName: "Sarah Jenkins",
		authorRole: "Director of Product, Pulse",
		avatarUrl:
			"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
	},
]

export function AgentlabTestimonialsSection() {
	const [activeTab, setActiveTab] = useState<string>("zenzap")

	const activeTestimonial =
		testimonials.find((t) => t.id === activeTab) || testimonials[0]

	return (
		<section className="bg-black-inverse text-white-inverse relative overflow-hidden py-24 md:py-32">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Top Header */}
				<div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
					<div>
						<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
							<span className="text-primary font-bold">—</span>
							<span>TESTIMONIALS</span>
						</div>
						<h2 className="heading-2 mt-4 font-serif text-3xl font-normal leading-[1.2] tracking-tight text-white sm:text-4xl md:text-5xl">
							What People Are Saying
						</h2>
					</div>

					<Button
						variant="outline"
						color="neutral"
						size="36"
						className="gap-2 border-white/20 bg-transparent text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10">
						<ArrowUpRight className="size-4" />
						<span>SEE ALL CASE STUDIES</span>
					</Button>
				</div>

				{/* Brand Tabs (Rule 18: mapped array) */}
				<div className="mt-14 grid grid-cols-2 border border-white/10 sm:grid-cols-4">
					{testimonials.map((item) => {
						const isSelected = activeTab === item.id
						return (
							<button
								key={item.id}
								type="button"
								onClick={() => setActiveTab(item.id)}
								className={`flex h-16 items-center justify-center border-b-2 px-4 transition-all ${
									isSelected
										? "border-primary bg-white/10"
										: "border-transparent bg-white/5 opacity-60 hover:opacity-100"
								}`}>
								<Image
									src={item.logoUrl}
									alt={item.companyName}
									width={80}
									height={22}
									className="h-5 w-auto object-contain brightness-0 invert"
								/>
							</button>
						)
					})}
				</div>

				{/* Active Testimonial Showcase */}
				<div className="mt-8 grid grid-cols-1 gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 lg:grid-cols-12 lg:gap-12 lg:p-12">
					{/* Left Quote Graphic */}
					<div className="lg:col-span-7">
						<h3 className="heading-3 font-serif text-2xl font-normal leading-[1.25] text-white sm:text-3xl md:text-4xl">
							&ldquo;{activeTestimonial.headline}&rdquo;
						</h3>
					</div>

					{/* Right Author Meta */}
					<div className="flex flex-col justify-between border-t border-white/10 pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
						<div className="flex items-center gap-4">
							<div className="relative size-14 overflow-hidden rounded-full border border-white/20">
								<Image
									src={activeTestimonial.avatarUrl}
									alt={activeTestimonial.authorName}
									fill
									sizes="56px"
									className="object-cover"
								/>
							</div>
							<div>
								<div className="text-sm font-bold text-white">
									{activeTestimonial.authorName}
								</div>
								<div className="text-xs text-white/60">
									{activeTestimonial.authorRole}
								</div>
							</div>
						</div>

						<p className="mt-6 text-xs leading-relaxed text-white/70 sm:text-sm">
							{activeTestimonial.quote}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
