"use client"

import React from "react"
import { TestimonialHeader } from "./testimonial-header"
import { TestimonialSlider } from "./testimonial-slider"
import { LogoStrip } from "./logo-strip"

export default function Testimonial02Page() {
	return (
		<main className="bg-bg min-h-screen w-full py-12 sm:py-16 lg:py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
				{/* Top Header */}
				<TestimonialHeader />

				{/* Testimonial Showcase Slider */}
				<div className="pt-10 sm:pt-14">
					<TestimonialSlider />
				</div>

				{/* Divider */}
				<div className="border-border my-14 w-full border-t sm:my-20" />

				{/* Logo Strip / Social Proof */}
				<LogoStrip />
			</div>
		</main>
	)
}
