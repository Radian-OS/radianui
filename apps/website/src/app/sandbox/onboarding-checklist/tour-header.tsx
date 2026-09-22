"use client"

import React from "react"

export function TourHeader() {
	return (
		<div className="flex flex-col gap-3">
			<h1 className="heading-2 text-foreground">Guided from the first login</h1>
			<p className="text-fg-secondary max-w-xl text-base sm:text-lg">
				A five step checklist walks you from empty workspace to first campaign.
				Most teams finish it before their coffee does.
			</p>
		</div>
	)
}
