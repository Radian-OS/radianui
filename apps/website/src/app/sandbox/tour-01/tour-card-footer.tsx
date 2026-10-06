"use client"

import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { CardFooter } from "@/styles/default/ui/card"

interface TourCardFooterProps {
	isFirstStep: boolean
	isLastStep: boolean
	onPrev: () => void
	onNext: () => void
}

export function TourCardFooter({
	isFirstStep,
	isLastStep,
	onPrev,
	onNext,
}: TourCardFooterProps) {
	return (
		<CardFooter className="border-border/60 flex items-center justify-between border-t p-5 sm:p-6">
			<Button
				type="button"
				variant="ghost"
				color="neutral"
				size="36"
				className="text-fg-secondary hover:text-fg disabled:text-fg-disabled gap-1.5 px-3 text-xs font-medium"
				onClick={onPrev}
				disabled={isFirstStep}>
				<ChevronLeft className="size-4" />
				Previous
			</Button>

			<Button
				type="button"
				variant="outline"
				color="neutral"
				size="36"
				className="hover:bg-elevation-level1/40 gap-1.5 rounded-lg px-4 text-xs font-medium shadow-xs"
				onClick={onNext}>
				{isLastStep ? "Finish" : "Next"}
				<ChevronRight className="size-4" />
			</Button>
		</CardFooter>
	)
}
