"use client"

import React from "react"
import { Button } from "@/styles/default/ui/button"
import { CardHeader, CardTitle } from "@/styles/default/ui/card"

interface TourCardHeaderProps {
	currentStepNumber: number
	totalSteps: number
	onSkip: () => void
}

export function TourCardHeader({
	currentStepNumber,
	totalSteps,
	onSkip,
}: TourCardHeaderProps) {
	return (
		<CardHeader className="border-border/60 flex flex-row items-center justify-between border-b p-6">
			<div className="flex flex-col gap-0.5">
				<CardTitle className="text-foreground text-base font-semibold">
					Product Tour
				</CardTitle>
				<span className="text-fg-secondary text-xs font-normal">
					Step {currentStepNumber} of {totalSteps}
				</span>
			</div>

			<Button
				type="button"
				variant="ghost"
				color="neutral"
				size="28"
				className="text-fg-secondary hover:text-foreground text-xs font-medium transition-colors"
				onClick={onSkip}>
				Skip Tour
			</Button>
		</CardHeader>
	)
}
