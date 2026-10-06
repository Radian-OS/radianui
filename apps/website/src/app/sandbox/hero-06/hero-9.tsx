"use client"

import React, { useState } from "react"
import { Card } from "@/styles/default/ui/card"
import { HeroHeader } from "./hero-header"
import { HeroActions } from "./hero-actions"
import { HeroTabs } from "./hero-tabs"
import { HeroPreview } from "./hero-preview"

export function Hero9() {
	const [activeTab, setActiveTab] = useState("workflows")

	return (
		<section className="relative flex w-full flex-col items-center px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-10 sm:gap-14">
				{/* Top row: Header (left) & Actions/Ratings (right) */}
				<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
					<HeroHeader />
					<HeroActions />
				</div>

				{/* Bottom: Tabbed Console Showcase Container */}
				<Card className="border-border bg-card w-full gap-0 overflow-hidden rounded-2xl p-0 shadow-xl">
					<HeroTabs activeTab={activeTab} onTabChange={setActiveTab} />
					<HeroPreview />
				</Card>
			</div>
		</section>
	)
}
