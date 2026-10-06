"use client"

import React from "react"
import { TourFeatureItem } from "./tour-feature-item"
import { TOUR_FEATURES } from "./types"

export function TourFeaturesList() {
	return (
		<div className="flex flex-col gap-6">
			{TOUR_FEATURES.map((feature) => (
				<TourFeatureItem key={feature.id} feature={feature} />
			))}
		</div>
	)
}
