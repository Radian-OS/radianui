"use client"

import React, { useRef } from "react"
import { motion, useAnimationFrame, useMotionValue } from "motion/react"
import { TestimonialCard } from "./testimonial-card"
import { TESTIMONIALS, type TestimonialItem } from "./types"

interface TestimonialsCarouselProps {
	testimonials?: TestimonialItem[]
}

export function TestimonialsCarousel({
	testimonials = TESTIMONIALS,
}: TestimonialsCarouselProps) {
	const x = useMotionValue(0)
	const isHovered = useRef(false)
	const trackRef = useRef<HTMLDivElement>(null)

	// Smooth infinite auto-scroll using Motion's frame loop
	useAnimationFrame((_, delta) => {
		if (isHovered.current || !trackRef.current) return
		const halfWidth = trackRef.current.scrollWidth / 2
		if (halfWidth <= 0) return

		// ~32px/s velocity matching previous marquee pace
		const current = x.get()
		let next = current - (32 * delta) / 1000

		// Seamless infinite loop: wrap around when Track 1 finishes
		if (Math.abs(next) >= halfWidth) {
			next += halfWidth
		}
		x.set(next)
	})

	return (
		<div
			className="w-full overflow-hidden py-1"
			onMouseEnter={() => {
				isHovered.current = true
			}}
			onMouseLeave={() => {
				isHovered.current = false
			}}>
			<motion.div
				ref={trackRef}
				style={{ x }}
				className="flex w-max will-change-transform">
				<div className="flex shrink-0 gap-5 pr-5">
					{testimonials.map((item) => (
						<TestimonialCard key={`track1-${item.id}`} testimonial={item} />
					))}
				</div>
				<div className="flex shrink-0 gap-5 pr-5">
					{testimonials.map((item) => (
						<TestimonialCard key={`track2-${item.id}`} testimonial={item} />
					))}
				</div>
			</motion.div>
		</div>
	)
}
