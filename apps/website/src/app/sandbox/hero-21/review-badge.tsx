"use client"

import React from "react"
import { Star } from "lucide-react"
import Image from "next/image"

interface Reviewer {
	name: string
	imageSrc: string
}

const reviewers: Reviewer[] = [
	{
		name: "Alex",
		imageSrc: "https://images.shadcnspace.com/assets/profiles/rough.webp",
	},
	{
		name: "Jessica",
		imageSrc: "https://images.shadcnspace.com/assets/profiles/jessica.webp",
	},
	{
		name: "Albert",
		imageSrc: "https://images.shadcnspace.com/assets/profiles/albert.webp",
	},
	{
		name: "Linda",
		imageSrc: "https://images.shadcnspace.com/assets/profiles/linda.webp",
	},
	{
		name: "Tom",
		imageSrc: "https://images.shadcnspace.com/assets/profiles/tom.webp",
	},
]

export function ReviewBadge() {
	return (
		<div className="inline-flex flex-col items-center gap-3 sm:flex-row">
			{/* Overlapping Avatar Stack */}
			<div className="flex items-center -space-x-2">
				{reviewers.map((reviewer, index) => (
					<div
						key={reviewer.name}
						className="border-background shadow-xs relative size-9 overflow-hidden rounded-full border-2 transition-transform duration-200 hover:z-10 hover:scale-110"
						style={{ zIndex: reviewers.length - index }}>
						<Image
							src={reviewer.imageSrc}
							alt={reviewer.name}
							width={36}
							height={36}
							className="size-full object-cover"
						/>
					</div>
				))}
			</div>

			{/* Rating Text with Star */}
			<div className="flex items-center gap-1.5">
				<Star className="text-warning size-3.5 fill-current" />
				<p className="text-foreground text-xs font-medium sm:text-sm">
					<span className="text-foreground font-bold">4.6</span> Rate by 18,000+
					Reviews
				</p>
			</div>
		</div>
	)
}
