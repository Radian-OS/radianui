"use client"

import React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Card } from "@/styles/default/ui/card"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/styles/default/ui/carousel"

const TESTIMONIALS = [
	{
		id: 1,
		quote:
			"I landed four paid gigs within a week of signing up, which is more than I've ever had from LinkedIn. I've been recommending it to everyone I know since!",
		author: "Ben Garnett",
		role: "Product Designer, Austin TX",
	},
	{
		id: 2,
		quote:
			"The speed and visual polish here is unreal. We replaced three disconnected SaaS tools within 48 hours and cut our team onboarding time in half.",
		author: "Sophia Martinez",
		role: "VP of Product, San Francisco CA",
	},
	{
		id: 3,
		quote:
			"As a solo builder, having this level of production-grade precision gave our launch instant credibility. Customers constantly praise our interface.",
		author: "Marcus Vance",
		role: "Founder & Architect, Oslo Norway",
	},
	{
		id: 4,
		quote:
			"Every block feels deliberate, tactile, and exceptionally crafted. It has completely transformed the speed at which our engineering team delivers.",
		author: "Elena Rostova",
		role: "Lead Frontend Engineer, Berlin DE",
	},
]

export function LoginFeatureCard() {
	return (
		<Card className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border-0 bg-neutral-950 p-0 text-white shadow-xl dark:bg-neutral-950">
			{/* Ambient Video Background Layer from Google Flow */}
			<div className="absolute inset-0 overflow-hidden">
				<video
					src="/sandbox/signup-14/flow-ambient-visual.mp4"
					poster="/sandbox/signup-14/flow-ambient-poster.jpg"
					autoPlay
					loop
					muted
					playsInline
					className="h-full w-full object-cover object-center"
				/>

				{/* Subtle cinematic gradient vignette for crisp testimonial readability */}
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />
			</div>

			{/* Bottom Testimonial Section with Carousel Controls */}
			<div className="relative z-10 mt-auto flex flex-col gap-5 p-6 sm:p-8">
				<Carousel opts={{ loop: true }} className="relative w-full">
					<CarouselContent>
						{TESTIMONIALS.map((testimonial) => (
							<CarouselItem key={testimonial.id}>
								<div className="flex flex-col gap-4 pr-24 sm:pr-28">
									<p className="text-base leading-snug font-medium text-white drop-shadow-md sm:text-lg xl:text-xl">
										&ldquo;{testimonial.quote}&rdquo;
									</p>

									<div className="flex flex-col gap-0.5 pt-1">
										<span className="text-sm font-semibold text-white drop-shadow-sm sm:text-base">
											{testimonial.author}
										</span>
										<span className="text-xs text-white/75 drop-shadow-sm sm:text-sm">
											{testimonial.role}
										</span>
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>

					{/* Navigation Controls using Radian OS Carousel Buttons */}
					<div className="absolute right-0 bottom-0 flex shrink-0 items-center gap-2.5">
						<CarouselPrevious
							variant="outline"
							size="lg"
							className="static size-10 translate-y-0 rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-xs transition-all hover:border-white/50 hover:bg-white/20 active:scale-95"
							aria-label="Previous testimonial">
							<ArrowLeft className="size-4.5 stroke-[1.75]" />
						</CarouselPrevious>
						<CarouselNext
							variant="outline"
							size="lg"
							className="static size-10 translate-y-0 rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-xs transition-all hover:border-white/50 hover:bg-white/20 active:scale-95"
							aria-label="Next testimonial">
							<ArrowRight className="size-4.5 stroke-[1.75]" />
						</CarouselNext>
					</div>
				</Carousel>
			</div>
		</Card>
	)
}
