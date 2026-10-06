"use client"

import React from "react"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/styles/default/ui/card"
import { ChecklistStepItem } from "./checklist-step-item"
import type { ChecklistStep, StepStatus } from "./types"

interface ChecklistCardProps {
	steps: ChecklistStep[]
	activeStepId: string
	completedStepIds: string[]
	onSelectStep: (id: string) => void
	onNextStep: () => void
	onPrevStep: () => void
	onResetTour: () => void
	onResumeStep: () => void
}

export function ChecklistCard({
	steps,
	activeStepId,
	completedStepIds,
	onSelectStep,
	onNextStep,
	onPrevStep,
	onResetTour,
	onResumeStep,
}: ChecklistCardProps) {
	const activeIndex = steps.findIndex((s) => s.id === activeStepId)
	const currentActiveIndex = activeIndex >= 0 ? activeIndex : 0
	const completedCount = completedStepIds.length
	const progressPercent = Math.round((completedCount / steps.length) * 100)

	const getStepStatus = (stepId: string): StepStatus => {
		if (completedStepIds.includes(stepId)) {
			return "completed"
		}
		if (stepId === activeStepId) {
			return "active"
		}
		return "pending"
	}

	return (
		<Card className="border-border/80 bg-card relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl sm:p-7">
			{/* Card Header with Counter and Progress Bar */}
			<CardHeader className="flex flex-col gap-3 p-0 pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-fg text-sm font-semibold sm:text-base">
						Getting started
					</CardTitle>
					<span className="text-fg-secondary text-xs font-medium sm:text-sm">
						{completedCount} of {steps.length} done
					</span>
				</div>

				{/* Progress bar */}
				<div className="bg-border/40 relative h-1.5 w-full overflow-hidden rounded-full">
					<div
						className="bg-fg h-full rounded-full transition-all duration-300 ease-out"
						style={{ width: `${progressPercent}%` }}
					/>
				</div>
			</CardHeader>

			{/* Checklist steps list */}
			<CardContent className="flex flex-col gap-1.5 p-0 pt-2">
				{steps.map((step) => (
					<ChecklistStepItem
						key={step.id}
						step={step}
						status={getStepStatus(step.id)}
						onSelectStep={onSelectStep}
						onResume={onResumeStep}
					/>
				))}
			</CardContent>

			{/* Card Footer with Next and Previous tour controls */}
			<CardFooter className="border-border/60 mt-2 flex items-center justify-between border-t p-0 pt-4">
				<Button
					type="button"
					variant="ghost"
					color="neutral"
					size="28"
					className="text-fg-secondary hover:text-fg text-xs"
					onClick={onResetTour}>
					<RotateCcw className="mr-1.5 size-3.5" />
					Reset
				</Button>

				<div className="flex items-center gap-2">
					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="32"
						className="px-3 text-xs font-medium"
						onClick={onPrevStep}
						disabled={currentActiveIndex === 0}>
						<ChevronLeft className="mr-1 size-3.5" />
						Previous
					</Button>
					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="32"
						className="px-3 text-xs font-medium"
						onClick={onNextStep}
						disabled={currentActiveIndex === steps.length - 1}>
						Next
						<ChevronRight className="ml-1 size-3.5" />
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
}
