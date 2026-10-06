"use client"

import React from "react"
import { Card, CardContent } from "@/styles/default/ui/card"
import { TourCardFooter } from "./tour-card-footer"
import { TourCardHeader } from "./tour-card-header"
import { TourStepContent } from "./tour-step-content"
import { TourStepDots } from "./tour-step-dots"
import { TourStepPreview } from "./tour-step-preview"
import type { TourStep } from "./types"

interface ProductTourCardProps {
	step: TourStep
	totalSteps: number
	currentStepIndex: number
	onSkip: () => void
	onPrev: () => void
	onNext: () => void
	onSelectStep: (index: number) => void
}

export function ProductTourCard({
	step,
	totalSteps,
	currentStepIndex,
	onSkip,
	onPrev,
	onNext,
	onSelectStep,
}: ProductTourCardProps) {
	return (
		<Card className="border-border/80 bg-card w-full max-w-xl rounded-2xl border p-0 shadow-xl">
			{/* Card Header */}
			<TourCardHeader
				currentStepNumber={step.stepNumber}
				totalSteps={totalSteps}
				onSkip={onSkip}
			/>

			{/* Main Content: Preview & Description */}
			<CardContent className="flex flex-col gap-5 p-6">
				<TourStepPreview step={step} />
				<TourStepContent step={step} />
			</CardContent>

			{/* Pagination Dots Row */}
			<div className="border-border/60 border-t py-2">
				<TourStepDots
					totalSteps={totalSteps}
					currentStepIndex={currentStepIndex}
					onSelectStep={onSelectStep}
				/>
			</div>

			{/* Footer: Previous & Next Controls */}
			<TourCardFooter
				isFirstStep={currentStepIndex === 0}
				isLastStep={currentStepIndex === totalSteps - 1}
				onPrev={onPrev}
				onNext={onNext}
			/>
		</Card>
	)
}
