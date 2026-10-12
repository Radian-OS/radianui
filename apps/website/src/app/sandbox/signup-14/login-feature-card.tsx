"use client"

import React, { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { IconButton } from "@/styles/default/ui/button"
import { Card } from "@/styles/default/ui/card"

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
	const [currentIndex, setCurrentIndex] = useState(0)
	const [direction, setDirection] = useState(1)

	const handlePrev = () => {
		setDirection(-1)
		setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))
	}

	const handleNext = () => {
		setDirection(1)
		setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))
	}

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
				<div className="relative min-h-[90px] overflow-hidden">
					<AnimatePresence mode="wait" initial={false}>
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, x: direction * 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: direction * -20 }}
							transition={{ duration: 0.28, ease: "easeInOut" }}
							className="flex flex-col gap-4">
							<p className="text-base leading-snug font-medium text-white drop-shadow-md sm:text-lg xl:text-xl">
								&ldquo;{TESTIMONIALS[currentIndex].quote}&rdquo;
							</p>

							<div className="flex items-end justify-between gap-4 pt-1">
								<div className="flex flex-col gap-0.5">
									<span className="text-sm font-semibold text-white drop-shadow-sm sm:text-base">
										{TESTIMONIALS[currentIndex].author}
									</span>
									<span className="text-xs text-white/75 drop-shadow-sm sm:text-sm">
										{TESTIMONIALS[currentIndex].role}
									</span>
								</div>

								{/* Navigation Controls using Radian OS IconButton */}
								<div className="flex shrink-0 items-center gap-2.5">
									<IconButton
										type="button"
										variant="outline"
										size="40"
										onClick={handlePrev}
										className="size-10 rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-xs transition-all hover:border-white/50 hover:bg-white/20 active:scale-95"
										aria-label="Previous testimonial">
										<ArrowLeft className="size-4.5 stroke-[1.75]" />
									</IconButton>
									<IconButton
										type="button"
										variant="outline"
										size="40"
										onClick={handleNext}
										className="size-10 rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-xs transition-all hover:border-white/50 hover:bg-white/20 active:scale-95"
										aria-label="Next testimonial">
										<ArrowRight className="size-4.5 stroke-[1.75]" />
									</IconButton>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</Card>
	)
}
