"use client"

import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/styles/default/ui/button"

interface TourActionButtonsProps {
	onStartSetup: () => void
	onPrevStep: () => void
	onNextStep: () => void
	isFirstStep: boolean
	isLastStep: boolean
}

export function TourActionButtons({
	onStartSetup,
	onPrevStep,
	onNextStep,
	isFirstStep,
	isLastStep,
}: TourActionButtonsProps) {
	return (
		<div className="flex flex-wrap items-center gap-3 pt-2">
			<Button
				type="button"
				variant="strong"
				color="neutral"
				size="40"
				className="px-5 font-semibold shadow-xs"
				onClick={onStartSetup}>
				Start your setup
			</Button>

			<div className="flex items-center gap-2">
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="40"
					className="px-3.5 text-xs font-medium"
					onClick={onPrevStep}
					disabled={isFirstStep}
					aria-label="Previous step">
					<ChevronLeft className="mr-1.5 size-4" />
					Previous
				</Button>
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="40"
					className="px-3.5 text-xs font-medium"
					onClick={onNextStep}
					disabled={isLastStep}
					aria-label="Next step">
					Next
					<ChevronRight className="ml-1.5 size-4" />
				</Button>
			</div>
		</div>
	)
}
