"use client"

import React from "react"
import { BarChart3, LayoutGrid, Settings2, Users } from "lucide-react"
import type { TourStep } from "./types"

interface TourStepPreviewProps {
	step: TourStep
}

export function TourStepPreview({ step }: TourStepPreviewProps) {
	const renderIcon = () => {
		switch (step.iconName) {
			case "dashboard":
				return <LayoutGrid className="size-5 stroke-[1.8]" />
			case "analytics":
				return <BarChart3 className="size-5 stroke-[1.8]" />
			case "team":
				return <Users className="size-5 stroke-[1.8]" />
			case "settings":
				return <Settings2 className="size-5 stroke-[1.8]" />
			default:
				return <LayoutGrid className="size-5 stroke-[1.8]" />
		}
	}

	return (
		<div className="border-border/70 bg-elevation-level1/20 flex h-40 w-full items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300">
			<div className="text-fg-secondary flex items-center gap-2.5 text-sm font-medium">
				{renderIcon()}
				<span>{step.previewLabel}</span>
			</div>
		</div>
	)
}
