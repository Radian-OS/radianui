"use client"

import React from "react"
import Image from "next/image"
import { TestimonialCard } from "./testimonial-card"

interface ShowcaseImageItem {
	src: string
	alt: string
	title: string
}

const showcaseImages: ShowcaseImageItem[] = [
	{
		src: "https://images.shadcnspace.com/assets/hero-img/hero-21-img-1.webp",
		alt: "Brand project and lifestyle showcase",
		title: "Brand Strategy Experience",
	},
	{
		src: "https://images.shadcnspace.com/assets/hero-img/hero-21-img-2.webp",
		alt: "Creative work and crypto investment showcase",
		title: "Digital Product Design",
	},
]

export function ShowcaseGrid() {
	return (
		<div className="mx-auto w-full max-w-7xl">
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{/* Column 1: Testimonial Card */}
				<div className="col-span-1">
					<TestimonialCard />
				</div>

				{/* Column 2 & 3: Showcase Image Cards */}
				{showcaseImages.map((item) => (
					<div
						key={item.src}
						className="border-border bg-fill2 shadow-xs group relative h-[320px] overflow-hidden rounded-2xl border sm:h-[380px]">
						<Image
							src={item.src}
							alt={item.alt}
							fill
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
							className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
						/>
						{/* Subtle overlay gradient on hover */}
						<div className="from-background/40 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					</div>
				))}
			</div>
		</div>
	)
}
