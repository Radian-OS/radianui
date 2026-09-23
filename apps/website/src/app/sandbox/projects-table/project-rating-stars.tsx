"use client"

import React from "react"
import { Star } from "lucide-react"

interface ProjectRatingStarsProps {
	rating: number
}

export function ProjectRatingStars({ rating }: ProjectRatingStarsProps) {
	return (
		<div className="flex items-center gap-0.5">
			{[1, 2, 3, 4, 5].map((starIndex) => {
				const isFilled = starIndex <= rating
				return (
					<Star
						key={starIndex}
						className={`size-3 ${
							isFilled ? "fill-blue-500 text-blue-500" : "text-muted/30"
						}`}
					/>
				)
			})}
		</div>
	)
}
