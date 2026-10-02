"use client"

import React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import type { TestimonialItem } from "./types"

interface TestimonialCardProps {
	testimonial: TestimonialItem
	onPrev: () => void
	onNext: () => void
	hasPrev?: boolean
	hasNext?: boolean
}

export function TestimonialCard({
	testimonial,
	onPrev,
	onNext,
	hasPrev = true,
	hasNext = true,
}: TestimonialCardProps) {
	return (
		<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
			{/* Left Column: Quote Icon + Content */}
			<div className="flex flex-col gap-6 sm:flex-row sm:gap-10 lg:col-span-8 lg:pe-8">
				<div className="flex shrink-0 items-start pt-1">
					<Image
						src="https://images.shadcnspace.com/assets/svgs/icon-quote.svg"
						alt="quote icon"
						width={40}
						height={32}
						unoptimized
						className="h-8 w-auto shrink-0 dark:hidden"
					/>
					<Image
						src="https://images.shadcnspace.com/assets/svgs/icon-quote-white.svg"
						alt="quote icon"
						width={40}
						height={32}
						unoptimized
						className="hidden h-8 w-auto shrink-0 dark:block"
					/>
				</div>

				<div className="flex flex-col gap-8 sm:gap-12">
					<p className="text-fg-secondary text-xl leading-relaxed font-normal sm:text-2xl lg:text-[28px] lg:leading-[1.4]">
						{testimonial.quote}
					</p>

					<div className="flex flex-col">
						<p className="text-fg text-base font-semibold">
							{testimonial.author}
						</p>
						<p className="text-fg-secondary text-sm">{testimonial.role}</p>
					</div>
				</div>
			</div>

			{/* Right Column: Author Image + Carousel Navigation */}
			<div className="relative mx-auto w-full max-w-md sm:max-w-none lg:col-span-4">
				<div className="border-border/60 bg-fill1 relative aspect-4/3 w-full overflow-hidden rounded-2xl border shadow-sm sm:aspect-square">
					<Image
						src={testimonial.imageSrc}
						alt={testimonial.imageAlt}
						width={500}
						height={500}
						unoptimized
						className="h-full w-full object-cover transition-opacity duration-300"
					/>

					{/* Navigation Buttons Overlay */}
					<div className="absolute top-1/2 right-4 flex -translate-y-1/2 items-center gap-1.5 sm:gap-2">
						<Button
							type="button"
							variant="outline"
							color="neutral"
							size="28"
							onClick={onPrev}
							disabled={!hasPrev}
							className="bg-bg/85 hover:bg-bg size-8 rounded-full p-0 shadow-sm backdrop-blur-md"
							aria-label="Previous testimonial">
							<ChevronLeft className="size-4" />
						</Button>
						<Button
							type="button"
							variant="outline"
							color="neutral"
							size="28"
							onClick={onNext}
							disabled={!hasNext}
							className="bg-bg/85 hover:bg-bg size-8 rounded-full p-0 shadow-sm backdrop-blur-md"
							aria-label="Next testimonial">
							<ChevronRight className="size-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
