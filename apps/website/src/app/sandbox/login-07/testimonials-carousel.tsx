"use client"

import React from "react"
import { TestimonialCard } from "./testimonial-card"
import { TESTIMONIALS, type TestimonialItem } from "./types"

interface TestimonialsCarouselProps {
	testimonials?: TestimonialItem[]
}

export function TestimonialsCarousel({
	testimonials = TESTIMONIALS,
}: TestimonialsCarouselProps) {
	return (
		<div className="w-full overflow-hidden py-1">
			<div className="group -ml-[185px] flex w-max gap-5">
				<div
					className="animate-marquee-left flex shrink-0 gap-5 group-hover:[animation-play-state:paused]"
					style={{ "--marquee-duration": "35s" } as React.CSSProperties}>
					{testimonials.map((item) => (
						<TestimonialCard key={`track1-${item.id}`} testimonial={item} />
					))}
				</div>
				<div
					className="animate-marquee-left flex shrink-0 gap-5 group-hover:[animation-play-state:paused]"
					style={{ "--marquee-duration": "35s" } as React.CSSProperties}>
					{testimonials.map((item) => (
						<TestimonialCard key={`track2-${item.id}`} testimonial={item} />
					))}
				</div>
			</div>
		</div>
	)
}
