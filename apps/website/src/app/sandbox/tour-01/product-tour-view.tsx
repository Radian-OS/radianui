"use client"

import React, { useState } from "react"
import { ProductTourCard } from "./product-tour-card"
import { TourCompletedCard } from "./tour-completed-card"
import { TOUR_STEPS } from "./types"

export function ProductTourView() {
	const [currentStepIndex, setCurrentStepIndex] = useState(0)
	const [isCompleted, setIsCompleted] = useState(false)

	const steps = TOUR_STEPS
	const activeStep = steps[currentStepIndex]

	const handleNext = () => {
		if (currentStepIndex < steps.length - 1) {
			setCurrentStepIndex((prev) => prev + 1)
		} else {
			setIsCompleted(true)
		}
	}

	const handlePrev = () => {
		if (currentStepIndex > 0) {
			setCurrentStepIndex((prev) => prev - 1)
		}
	}

	const handleSkip = () => {
		setIsCompleted(true)
	}

	const handleRestart = () => {
		setCurrentStepIndex(0)
		setIsCompleted(false)
	}

	const handleSelectStep = (index: number) => {
		setCurrentStepIndex(index)
	}

	return (
		<div className="flex w-full items-center justify-center p-4 sm:p-6 lg:p-8">
			{isCompleted ? (
				<TourCompletedCard onRestart={handleRestart} />
			) : (
				<ProductTourCard
					step={activeStep}
					totalSteps={steps.length}
					currentStepIndex={currentStepIndex}
					onSkip={handleSkip}
					onPrev={handlePrev}
					onNext={handleNext}
					onSelectStep={handleSelectStep}
				/>
			)}
		</div>
	)
}
