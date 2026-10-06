"use client"

import React, { useState } from "react"
import { ChecklistCard } from "./checklist-card"
import { TourActionButtons } from "./tour-action-buttons"
import { TourFeaturesList } from "./tour-features-list"
import { TourHeader } from "./tour-header"
import { INITIAL_STEPS } from "./types"

export function OnboardingChecklistView() {
	const [steps] = useState(INITIAL_STEPS)
	// Initial state matches the screenshot: 3 of 5 done, step 4 ("campaign") is active
	const [activeStepId, setActiveStepId] = useState<string>("campaign")
	const [completedStepIds, setCompletedStepIds] = useState<string[]>([
		"workspace",
		"channel",
		"contacts",
	])

	const activeIndex = steps.findIndex((s) => s.id === activeStepId)
	const currentIndex = activeIndex >= 0 ? activeIndex : 0

	const handleSelectStep = (stepId: string) => {
		setActiveStepId(stepId)
	}

	const handleNextStep = () => {
		if (currentIndex < steps.length - 1) {
			const currentId = steps[currentIndex].id
			// Mark current step as completed if moving forward
			if (!completedStepIds.includes(currentId)) {
				setCompletedStepIds((prev) => [...prev, currentId])
			}
			setActiveStepId(steps[currentIndex + 1].id)
		}
	}

	const handlePrevStep = () => {
		if (currentIndex > 0) {
			setActiveStepId(steps[currentIndex - 1].id)
		}
	}

	const handleResumeStep = () => {
		const currentId = steps[currentIndex].id
		if (!completedStepIds.includes(currentId)) {
			setCompletedStepIds((prev) => [...prev, currentId])
		}
		if (currentIndex < steps.length - 1) {
			setActiveStepId(steps[currentIndex + 1].id)
		}
	}

	const handleResetTour = () => {
		setActiveStepId("campaign")
		setCompletedStepIds(["workspace", "channel", "contacts"])
	}

	const handleStartSetup = () => {
		// If on first step or resetting
		setActiveStepId(steps[0].id)
		setCompletedStepIds([])
	}

	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-12 px-6 py-12 sm:py-20 lg:flex-row lg:items-center lg:gap-16">
			{/* Left Column: Heading, Value Props, and Tour Action Buttons */}
			<div className="flex w-full flex-1 flex-col gap-8 lg:max-w-xl">
				<TourHeader />
				<TourFeaturesList />
				<TourActionButtons
					onStartSetup={handleStartSetup}
					onPrevStep={handlePrevStep}
					onNextStep={handleNextStep}
					isFirstStep={currentIndex === 0}
					isLastStep={currentIndex === steps.length - 1}
				/>
			</div>

			{/* Right Column: Onboarding Checklist Card */}
			<div className="flex w-full flex-1 justify-center lg:justify-end">
				<ChecklistCard
					steps={steps}
					activeStepId={activeStepId}
					completedStepIds={completedStepIds}
					onSelectStep={handleSelectStep}
					onNextStep={handleNextStep}
					onPrevStep={handlePrevStep}
					onResetTour={handleResetTour}
					onResumeStep={handleResumeStep}
				/>
			</div>
		</div>
	)
}
