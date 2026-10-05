"use client"

import React from "react"
import Image from "next/image"
import { TestimonialCard } from "./testimonial-card"

export function ShowcaseGrid() {
	return (
		<div className="w-full">
			<div className="no-scrollbar flex h-[380px] gap-6 overflow-x-auto md:grid md:grid-cols-3">
				{/* Column 1: Dark Testimonial Card */}
				<div className="h-full w-[340px] shrink-0 md:w-auto">
					<TestimonialCard />
				</div>

				{/* Column 2: Brand Lifestyle Image */}
				<div className="border-border relative h-full w-[340px] shrink-0 overflow-hidden rounded-xl border shadow-xs md:w-auto">
					<Image
						src="https://images.shadcnspace.com/assets/hero-img/hero-21-img-1.webp"
						alt="Brand project"
						fill
						sizes="(max-width: 768px) 340px, 33vw"
						className="size-full object-cover"
					/>
				</div>

				{/* Column 3: Digital Product Artwork Image */}
				<div className="border-border relative h-full w-[340px] shrink-0 overflow-hidden rounded-xl border shadow-xs md:w-auto">
					<Image
						src="https://images.shadcnspace.com/assets/hero-img/hero-21-img-2.webp"
						alt="Creative work"
						fill
						sizes="(max-width: 768px) 340px, 33vw"
						className="size-full object-cover"
					/>
				</div>
			</div>
		</div>
	)
}
