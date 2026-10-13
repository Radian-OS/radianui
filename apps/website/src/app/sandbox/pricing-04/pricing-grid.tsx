"use client"

import React from "react"
import { Plus } from "lucide-react"
import { PricingCard } from "./pricing-card"
import type { PricingPlan } from "./pricing-types"

export interface PricingGridProps {
	plans: PricingPlan[]
}

export function PricingGrid({ plans }: PricingGridProps) {
	return (
		<div className="relative mx-auto w-full max-w-6xl">
			{/* Top Grid Border with Crosshair Markers */}
			<div className="border-border/60 relative border-t">
				{/* Top Left Marker */}
				<span
					aria-hidden="true"
					className="text-fg-tertiary absolute -top-2.5 -left-2.5 flex size-5 items-center justify-center">
					<Plus className="size-3 stroke-[2]" />
				</span>

				{/* Top First Column Divider Marker (Desktop) */}
				<span
					aria-hidden="true"
					className="text-fg-tertiary absolute -top-2.5 left-1/3 hidden size-5 -translate-x-1/2 items-center justify-center lg:flex">
					<Plus className="size-3 stroke-[2]" />
				</span>

				{/* Top Second Column Divider Marker (Desktop) */}
				<span
					aria-hidden="true"
					className="text-fg-tertiary absolute -top-2.5 left-2/3 hidden size-5 -translate-x-1/2 items-center justify-center lg:flex">
					<Plus className="size-3 stroke-[2]" />
				</span>

				{/* Top Right Marker */}
				<span
					aria-hidden="true"
					className="text-fg-tertiary absolute -top-2.5 -right-2.5 flex size-5 items-center justify-center">
					<Plus className="size-3 stroke-[2]" />
				</span>
			</div>

			{/* Cards Grid */}
			<div className="divide-border/60 border-border/60 lg:divide-border/60 grid grid-cols-1 divide-y border-x sm:divide-y md:grid-cols-2 md:divide-y-0 lg:grid-cols-3 lg:divide-x">
				{plans.map((plan) => (
					<div key={plan.id} className="relative">
						<PricingCard plan={plan} />
					</div>
				))}
			</div>

			{/* Bottom Grid Border with Crosshair Markers */}
			<div className="border-border/60 relative border-b">
				{/* Bottom Left Marker */}
				<span
					aria-hidden="true"
					className="text-fg-tertiary absolute -bottom-2.5 -left-2.5 flex size-5 items-center justify-center">
					<Plus className="size-3 stroke-[2]" />
				</span>

				{/* Bottom First Column Divider Marker (Desktop) */}
				<span
					aria-hidden="true"
					className="text-fg-tertiary absolute -bottom-2.5 left-1/3 hidden size-5 -translate-x-1/2 items-center justify-center lg:flex">
					<Plus className="size-3 stroke-[2]" />
				</span>

				{/* Bottom Second Column Divider Marker (Desktop) */}
				<span
					aria-hidden="true"
					className="text-fg-tertiary absolute -bottom-2.5 left-2/3 hidden size-5 -translate-x-1/2 items-center justify-center lg:flex">
					<Plus className="size-3 stroke-[2]" />
				</span>

				{/* Bottom Right Marker */}
				<span
					aria-hidden="true"
					className="text-fg-tertiary absolute -right-2.5 -bottom-2.5 flex size-5 items-center justify-center">
					<Plus className="size-3 stroke-[2]" />
				</span>
			</div>
		</div>
	)
}
