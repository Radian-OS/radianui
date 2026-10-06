"use client"

import React from "react"
import { CircleHelp, Database, RotateCcw } from "lucide-react"
import type { TourFeature } from "./types"

interface TourFeatureItemProps {
	feature: TourFeature
}

export function TourFeatureItem({ feature }: TourFeatureItemProps) {
	const renderIcon = () => {
		switch (feature.iconName) {
			case "undo":
				return <RotateCcw className="size-4.5 stroke-[2]" />
			case "database":
				return <Database className="size-4.5 stroke-[2]" />
			case "help":
				return <CircleHelp className="size-4.5 stroke-[2]" />
			default:
				return <CircleHelp className="size-4.5 stroke-[2]" />
		}
	}

	return (
		<div className="flex items-start gap-4">
			<div className="border-border/80 bg-elevation-level1/40 text-fg flex size-10 shrink-0 items-center justify-center rounded-xl border shadow-xs">
				{renderIcon()}
			</div>
			<div className="flex flex-col">
				<h3 className="text-fg text-sm font-semibold sm:text-base">
					{feature.title}
				</h3>
				<p className="text-fg-secondary mt-0.5 text-xs leading-relaxed sm:text-sm">
					{feature.description}
				</p>
			</div>
		</div>
	)
}
