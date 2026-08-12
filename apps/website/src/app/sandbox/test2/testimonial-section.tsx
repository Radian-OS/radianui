"use client"

import React, { useCallback, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { TestimonialCard } from "./testimonial-card"

const testimonials = [
	{
		quote:
			"\u201CMore than a creative agency \u2014 they felt like a true growth partner throughout the entire process.\u201D",
		name: "Rachel Kim",
		title: "Marketing Director, Recording Studio",
		brand: "d Metrix",
		image:
			"https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600&h=700&fit=crop&q=80",
	},
	{
		quote:
			"\u201CTheir design thinking transformed our digital presence and boosted our conversion rate by 3x.\u201D",
		name: "James Chen",
		title: "CEO, TechVenture Labs",
		brand: "TechVenture",
		image:
			"https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=600&h=700&fit=crop&q=80",
	},
	{
		quote:
			"\u201CIncredible attention to detail. Every pixel was intentional and every interaction felt seamless.\u201D",
		name: "Sofia Alvarez",
		title: "Head of Product, NovaBrand",
		brand: "NovaBrand",
		image:
			"https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&h=700&fit=crop&q=80",
	},
]

export function TestimonialSection() {
	const [activeIndex, setActiveIndex] = useState(0)

	const goToPrev = useCallback(() => {
		setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
	}, [])

	const goToNext = useCallback(() => {
		setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
	}, [])

	const current = testimonials[activeIndex]

	return (
		<section className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 lg:px-20 xl:px-28">
			{/* TESTIMONIALS label */}
			<p className="mb-6 text-xs font-bold uppercase tracking-[0.16em] text-[#ff4f19] sm:text-sm">
				Testimonials
			</p>

			{/* Divider */}
			<div className="mb-10 h-px w-full bg-[#e5e5e5] lg:mb-14" />

			{/* Main testimonial content */}
			<div className="mb-10 grid grid-cols-1 gap-8 lg:mb-14 lg:grid-cols-[minmax(200px,380px)_1fr] lg:gap-16">
				{/* Left column: Brand image card */}
				<TestimonialCard brand={current.brand} image={current.image} />

				{/* Right column: Quote + Author */}
				<div className="flex flex-col justify-center">
					<blockquote className="heading-2 mb-8 leading-[1.2] text-[#0a0a0a]">
						{current.quote}
					</blockquote>

					<div>
						<p className="text-base font-semibold text-[#0a0a0a]">
							{current.name}
						</p>
						<p className="mt-1 text-sm text-[#737373]">{current.title}</p>
					</div>
				</div>
			</div>

			{/* Bottom row: Description + Navigation */}
			<div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
				<p className="max-w-md text-sm leading-relaxed text-[#525252] sm:text-base">
					Real feedback from brands who trusted us to think deeper, move faster,
					and deliver work that actually performs.
				</p>

				<div className="flex shrink-0 items-center gap-3">
					<button
						onClick={goToPrev}
						aria-label="Previous testimonial"
						className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#737373] text-white transition-colors hover:bg-[#525252]">
						<ArrowLeft className="h-5 w-5" />
					</button>
					<button
						onClick={goToNext}
						aria-label="Next testimonial"
						className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#ff4f19] text-white transition-colors hover:bg-[#e5461a]">
						<ArrowRight className="h-5 w-5" />
					</button>
				</div>
			</div>
		</section>
	)
}
