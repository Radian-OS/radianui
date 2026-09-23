"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface TourStepDotsProps {
	totalSteps: number
	currentStepIndex: number
	onSelectStep: (index: number) => void
}

export function TourStepDots({
	totalSteps,
	currentStepIndex,
	onSelectStep,
}: TourStepDotsProps) {
	return (
		<div className="flex items-center justify-center gap-1.5 py-1">
			{Array.from({ length: totalSteps }).map((_, index) => {
				const isActive = index === currentStepIndex
				return (
					<button
						key={index}
						type="button"
						aria-label={`Go to step ${index + 1}`}
						onClick={() => onSelectStep(index)}
						className={cn(
							"size-1.5 rounded-full transition-all duration-200 hover:scale-125",
							isActive
								? "bg-fg scale-110"
								: "bg-border/90 hover:bg-fg-secondary"
						)}
					/>
				)
			})}
		</div>
	)
}
