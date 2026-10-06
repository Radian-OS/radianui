import React from "react"
import Image from "next/image"

interface TestimonialCardProps {
	brand: string
	image: string
}

export function TestimonialCard({ brand, image }: TestimonialCardProps) {
	return (
		<div className="relative aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-2xl sm:aspect-[3/4] lg:aspect-auto lg:min-h-[380px]">
			{/* Background image */}
			<Image
				src={image}
				alt={`${brand} brand visual`}
				fill
				className="object-cover"
				sizes="(max-width: 768px) 100vw, 380px"
			/>

			{/* Blue tint overlay using global CSS variables */}
			<div className="bg-blue/70 absolute inset-0 mix-blend-multiply" />

			{/* Brand name overlay */}
			<div className="absolute bottom-6 left-6 z-10">
				<span className="text-fg-inverse text-xl font-medium tracking-tight sm:text-2xl">
					{brand}
				</span>
			</div>
		</div>
	)
}
