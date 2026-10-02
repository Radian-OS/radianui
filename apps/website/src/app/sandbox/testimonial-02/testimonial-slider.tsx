"use client"

import React, { useState } from "react"
import { TESTIMONIALS_DATA } from "./types"
import { TestimonialCard } from "./testimonial-card"

export function TestimonialSlider() {
	const [currentIndex, setCurrentIndex] = useState(0)

	function handlePrev() {
		setCurrentIndex((prev) =>
			prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1
		)
	}

	function handleNext() {
		setCurrentIndex((prev) =>
			prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1
		)
	}

	const currentTestimonial = TESTIMONIALS_DATA[currentIndex]

	return (
		<div className="w-full">
			<TestimonialCard
				testimonial={currentTestimonial}
				onPrev={handlePrev}
				onNext={handleNext}
				hasPrev={true}
				hasNext={true}
			/>
		</div>
	)
}
