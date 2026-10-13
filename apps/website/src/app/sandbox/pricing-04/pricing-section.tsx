"use client"

import React from "react"
import { Plus } from "lucide-react"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/styles/default/ui/tabs"
import { PRICING_DATA } from "./pricing-data"
import { PricingGrid } from "./pricing-grid"
import { PricingHero } from "./pricing-hero"
import { PricingNav } from "./pricing-nav"

export function PricingSection() {
	return (
		<section className="bg-bg relative min-h-screen w-full py-4 sm:py-8">
			{/* Outer Blueprint Container with 4 Corner Crosshairs */}
			<div className="border-border/40 bg-bg relative mx-auto max-w-7xl border pb-16 shadow-xs">
				{/* Top-Left Corner Plus Marker */}
				<span
					aria-hidden="true"
					className="text-fg-tertiary absolute -top-2.5 -left-2.5 flex size-5 items-center justify-center">
					<Plus className="size-3 stroke-[2]" />
				</span>

				{/* Top-Right Corner Plus Marker */}
				<span
					aria-hidden="true"
					className="text-fg-tertiary absolute -top-2.5 -right-2.5 flex size-5 items-center justify-center">
					<Plus className="size-3 stroke-[2]" />
				</span>

				{/* Bottom-Left Corner Plus Marker */}
				<span
					aria-hidden="true"
					className="text-fg-tertiary absolute -bottom-2.5 -left-2.5 flex size-5 items-center justify-center">
					<Plus className="size-3 stroke-[2]" />
				</span>

				{/* Bottom-Right Corner Plus Marker */}
				<span
					aria-hidden="true"
					className="text-fg-tertiary absolute -right-2.5 -bottom-2.5 flex size-5 items-center justify-center">
					<Plus className="size-3 stroke-[2]" />
				</span>

				{/* Top Navigation Bar */}
				<PricingNav />

				<div className="px-4 sm:px-8">
					{/* Hero Section */}
					<PricingHero />

					{/* Segmented Tabs Switcher */}
					<Tabs defaultValue="studio" className="w-full">
						<div className="my-8 flex justify-center">
							<TabsList>
								<TabsTrigger value="studio">Studio</TabsTrigger>
								<TabsTrigger value="dub">DUB</TabsTrigger>
								<TabsTrigger value="api">API</TabsTrigger>
							</TabsList>
						</div>

						{/* Studio Plan Cards */}
						<TabsContent value="studio" className="mt-0">
							<PricingGrid plans={PRICING_DATA.studio} />
						</TabsContent>

						{/* DUB Plan Cards */}
						<TabsContent value="dub" className="mt-0">
							<PricingGrid plans={PRICING_DATA.dub} />
						</TabsContent>

						{/* API Plan Cards */}
						<TabsContent value="api" className="mt-0">
							<PricingGrid plans={PRICING_DATA.api} />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</section>
	)
}
