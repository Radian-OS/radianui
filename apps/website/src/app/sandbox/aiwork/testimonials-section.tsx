"use client"

import React from "react"
import { Star } from "lucide-react"
import Image from "next/image"

interface TestimonialItem {
	name: string
	role: string
	company: string
	avatar: string
	quote: string
	rating: number
}

const testimonials: TestimonialItem[] = [
	{
		name: "Esther Howard",
		role: "Product Manager",
		company: "Taskway",
		avatar:
			"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face",
		quote:
			'"The system is built for our needs mainly focused on efficiency, visibility, and time savings across freight operations."',
		rating: 5,
	},
	{
		name: "Brooklyn Simmons",
		role: "Team Lead",
		company: "QuickFlow CRM",
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
		quote:
			'"This platform is perfectly aligned with our goals especially in automation and daily operational clarity for dispatchers."',
		rating: 5,
	},
	{
		name: "Ralph Edwards",
		role: "Director of Admin",
		company: "BrightPath",
		avatar:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
		quote:
			'"It’s the right solution for our business especially in automating routine tasks and saving hours every single week."',
		rating: 5,
	},
]

export function AiworkTestimonialsSection() {
	return (
		<section className="bg-fill1/20 border-border/60 border-t py-20 md:py-28">
			<div className="mx-auto max-w-5xl px-4">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center">
					<div className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold">
						<span className="bg-primary size-1.5 rounded-full" />
						<span>Testimonials</span>
					</div>

					{/* Rule 13: heading-2 */}
					<h2 className="heading-2 text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						Trusted by modern teams
					</h2>

					<p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed md:text-base">
						Our solution empowers forward-thinking teams to collaborate
						seamlessly, boost productivity, and innovate faster.
					</p>
				</div>

				{/* 3 Testimonials Grid */}
				<div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
					{testimonials.map((item) => (
						<div
							key={item.name}
							className="border-border/70 bg-fill1/50 hover:border-primary/40 flex flex-col justify-between rounded-2xl border p-6 text-center transition-all duration-300 hover:shadow-md">
							<div>
								{/* Avatar (Rule 10: Next.js Image) */}
								<div className="border-primary/20 mx-auto size-16 overflow-hidden rounded-full border-2 shadow-sm">
									<Image
										src={item.avatar}
										alt={item.name}
										width={64}
										height={64}
										className="size-full object-cover"
									/>
								</div>

								<div className="text-foreground mt-4 font-bold">
									{item.name}
								</div>
								<div className="text-fg-tertiary text-xs">
									{item.role}, {item.company}
								</div>

								{/* 5 Stars Rating */}
								<div className="mt-3 flex items-center justify-center gap-1">
									{Array.from({ length: item.rating }).map((_, i) => (
										<Star
											key={i}
											className="size-3.5 fill-amber-400 text-amber-400"
										/>
									))}
									<span className="text-foreground ml-1 text-xs font-bold">
										5.0
									</span>
								</div>

								{/* Quote */}
								<p className="text-fg-secondary mt-4 text-xs italic leading-relaxed">
									{item.quote}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
