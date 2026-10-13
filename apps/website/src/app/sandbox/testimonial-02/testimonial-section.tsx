"use client"

import React, { useCallback, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { TestimonialCard } from "./testimonial-card"
import { Divider } from "@/styles/default/ui/divider"

const testimonials = [
	{
		quote:
			"“More than a creative agency — they felt like a true growth partner throughout the entire process.”",
		name: "Rachel Kim",
		title: "Marketing Director, Recording Studio",
		brand: "d Metrix",
		image:
			"https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600&h=700&fit=crop&q=80",
	},
	{
		quote:
			"“Their design thinking transformed our digital presence and boosted our conversion rate by 3x.”",
		name: "James Chen",
		title: "CEO, TechVenture Labs",
		brand: "TechVenture",
		image:
			"https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=600&h=700&fit=crop&q=80",
	},
	{
		quote:
			"“Incredible attention to detail. Every pixel was intentional and every interaction felt seamless.”",
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
		<section className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-12 md:px-12 lg:gap-14 lg:px-20 xl:px-28">
			{/* Header: Label + Divider */}
			<div className="flex flex-col gap-6">
				<h1 className="heading-4 uppercase">Testimonials</h1>
				<Divider />
			</div>

			{/* Main testimonial content */}
			<div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
				{/* Left column: Brand image card */}
				<div className="w-full shrink-0 lg:max-w-[380px]">
					<TestimonialCard brand={current.brand} image={current.image} />
				</div>

				{/* Right column: Quote + Author */}
				<div className="flex flex-1 flex-col justify-center gap-8">
					<blockquote className="heading-2 text-fg">{current.quote}</blockquote>

					<div className="flex flex-col gap-1">
						<p className="text-fg text-base font-semibold">{current.name}</p>
						<p className="text-fg-tertiary text-sm">{current.title}</p>
					</div>
				</div>
			</div>

			{/* Bottom row: Description + Navigation */}
			<div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
				<p className="text-fg-secondary max-w-md text-sm leading-relaxed sm:text-base">
					Real feedback from brands who trusted us to think deeper, move faster,
					and deliver work that actually performs.
				</p>

				<div className="flex shrink-0 items-center gap-3">
					<button
						onClick={goToPrev}
						aria-label="Previous testimonial"
						className="bg-fill3 text-fg hover:bg-fill4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors active:scale-95">
						<ArrowLeft className="h-5 w-5" />
					</button>
					<button
						onClick={goToNext}
						aria-label="Next testimonial"
						className="bg-primary text-primary-fg hover:bg-primary-hover flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors active:scale-95">
						<ArrowRight className="h-5 w-5" />
					</button>
				</div>
			</div>
		</section>
	)
}
