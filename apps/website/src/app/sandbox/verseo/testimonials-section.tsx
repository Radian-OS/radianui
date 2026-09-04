"use client"

import React from "react"
import { Star } from "lucide-react"
import Image from "next/image"

interface TestimonialItem {
	quote: string
	author: string
	role: string
	rating: string
	avatarUrl: string
}

const testimonials: TestimonialItem[] = [
	{
		rating: "4.9",
		quote:
			"We tested several AI writing tools, but Verseo felt the most practical. It's fast, intuitive, and fits naturally into our workflow.",
		author: "Emma Rodriguez",
		role: "Content Strategist",
		avatarUrl:
			"https://framerusercontent.com/images/DtEuMSNQCQcQFR1rext984GIaRw.png",
	},
	{
		rating: "5.0",
		quote:
			"Verseo cut our content creation time in half. What used to take hours now takes minutes, and the quality is consistently high.",
		author: "Sarah Chen",
		role: "Marketing Manager",
		avatarUrl:
			"https://framerusercontent.com/images/4kaLlUW56SgGMsgih66AyH7f7wQ.png",
	},
	{
		rating: "5.0",
		quote:
			"The biggest win for us is consistency. Every email, post, and product update sounds like it comes from the same brand voice.",
		author: "David Miller",
		role: "Startup Founder",
		avatarUrl:
			"https://framerusercontent.com/images/tX4oRkjuCY2raNTEqEBQEF3VuPw.png",
	},
]

export function VerseoTestimonialsSection() {
	return (
		<section className="py-20 md:py-28">
			<div className="mx-auto max-w-5xl px-4">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center">
					<div className="border-border/70 bg-fill1 text-fg-secondary mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold">
						<span>[</span>
						<span className="text-foreground">testimonials</span>
						<span>]</span>
					</div>

					{/* Rule 13: heading-2 */}
					<h2 className="heading-2 text-foreground max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						Loved by teams that create content every day
					</h2>

					<p className="text-fg-secondary mt-4 max-w-xl text-center text-sm leading-relaxed md:text-base">
						From marketers and founders to agencies and growing teams — Verseo
						helps people create better content faster, without sacrificing
						quality or consistency.
					</p>
				</div>

				{/* 3 Review Cards Grid (Rule 18: map) */}
				<div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
					{testimonials.map((item) => (
						<div
							key={item.author}
							className="border-border/70 bg-background/90 hover:border-primary/40 flex flex-col justify-between rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md md:p-8">
							<div>
								{/* Star Rating */}
								<div className="flex items-center gap-1.5">
									<div className="flex gap-1 text-amber-500">
										{Array.from({ length: 5 }).map((_, i) => (
											<Star
												key={i}
												className="size-3.5 fill-amber-500 text-amber-500"
											/>
										))}
									</div>
									<span className="text-foreground font-mono text-xs font-bold">
										{item.rating}
									</span>
								</div>

								{/* Quote */}
								<p className="text-fg-secondary mt-5 text-sm leading-relaxed">
									&ldquo;{item.quote}&rdquo;
								</p>
							</div>

							{/* Author Info (Rule 10: Next.js Image for portraits) */}
							<div className="border-border/40 mt-6 flex items-center gap-3 border-t pt-4">
								<div className="border-border/60 bg-fill2 relative size-10 overflow-hidden rounded-full border">
									<Image
										src={item.avatarUrl}
										alt={item.author}
										width={40}
										height={40}
										className="size-full object-cover"
									/>
								</div>
								<div>
									<div className="text-foreground text-sm font-bold">
										{item.author}
									</div>
									<div className="text-fg-tertiary text-xs">{item.role}</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
