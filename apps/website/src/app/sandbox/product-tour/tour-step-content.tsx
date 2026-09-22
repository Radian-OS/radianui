"use client"

import React from "react"
import type { TourStep } from "./types"

interface TourStepContentProps {
	step: TourStep
}

export function TourStepContent({ step }: TourStepContentProps) {
	return (
		<div className="flex flex-col gap-1.5 text-left">
			<h2 className="heading-6 text-foreground">{step.title}</h2>
			<p className="text-fg-secondary text-sm leading-relaxed">
				{step.description}
			</p>
		</div>
	)
}
