"use client"

import React, { useMemo, useState } from "react"
import { Card, CardContent } from "@/styles/default/ui/card"
import { Button } from "@/styles/default/ui/button"
import { ContributionCell } from "./contribution-cell"
import { YEARS_DATA, MONTHS, type ContributionDay } from "./types"

// Generate deterministic pseudo-random contribution days for a given year
function generateYearDays(year: number): ContributionDay[] {
	const days: ContributionDay[] = []
	const totalDays = 52 * 7 // 364 days

	for (let i = 0; i < totalDays; i++) {
		// Simple seeded pseudo-random formula
		const seed = Math.sin(year * 1000 + i * 17) * 10000
		const rand = seed - Math.floor(seed)

		let level: ContributionDay["level"] = 0
		let count = 0

		if (rand > 0.78) {
			level = 4
			count = Math.floor(rand * 15) + 8
		} else if (rand > 0.58) {
			level = 3
			count = Math.floor(rand * 8) + 4
		} else if (rand > 0.38) {
			level = 2
			count = Math.floor(rand * 5) + 2
		} else if (rand > 0.2) {
			level = 1
			count = 1
		}

		// Calculate approximate date string
		const monthIndex = Math.floor((i / totalDays) * 12)
		const dayNum = (i % 28) + 1
		const monthName = MONTHS[monthIndex]
		const dateStr = `${monthName} ${dayNum}, ${year}`

		days.push({
			date: dateStr,
			count,
			level,
		})
	}

	return days
}

export function ContributionGraph() {
	const [activeYear, setActiveYear] = useState<number>(2026)

	const currentYearData = useMemo(() => {
		return YEARS_DATA.find((item) => item.year === activeYear) ?? YEARS_DATA[0]
	}, [activeYear])

	const contributionDays = useMemo(() => {
		return generateYearDays(activeYear)
	}, [activeYear])

	return (
		<section className="flex flex-col gap-6 py-8">
			{/* Pure heading utility as per AGENTS.md & claude.md */}
			<h2 className="heading-4 text-fg">Contribution Graph</h2>

			<div className="flex flex-col gap-4 lg:flex-row lg:items-start">
				{/* Calendar Heatmap Container Card */}
				<Card className="border-border bg-card flex-1 overflow-x-auto p-6 shadow-xl backdrop-blur-sm">
					<CardContent className="flex min-w-[620px] flex-col gap-4 p-0">
						{/* Months Header Labels */}
						<div className="text-fg-secondary grid grid-cols-12 text-xs">
							{MONTHS.map((month) => (
								<span key={month} className="text-left font-mono">
									{month}
								</span>
							))}
						</div>

						{/* 52-week x 7-day Heatmap Grid */}
						<div
							className="grid grid-flow-col gap-1 sm:gap-1.5"
							style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}>
							{contributionDays.map((day, index) => (
								<ContributionCell key={`${activeYear}-${index}`} day={day} />
							))}
						</div>

						{/* Bottom Status Bar */}
						<div className="text-fg-secondary flex items-center justify-between pt-2 text-xs">
							<span className="font-mono">{currentYearData.label}</span>

							{/* Legend */}
							<div className="flex items-center gap-1.5 font-mono">
								<span>Less</span>
								<span className="bg-fill2 size-2.5 rounded-xs" />
								<span className="border-success-border bg-fill3 size-2.5 rounded-xs border" />
								<span className="bg-success-accent size-2.5 rounded-xs" />
								<span className="bg-success size-2.5 rounded-xs" />
								<span className="bg-success-hover size-2.5 rounded-xs" />
								<span>More</span>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Year Switcher Column */}
				<div className="flex flex-row gap-2 lg:flex-col">
					{YEARS_DATA.map((item) => {
						const isActive = item.year === activeYear
						return (
							<Button
								key={item.year}
								color={isActive ? "success" : "neutral"}
								variant={isActive ? "strong" : "soft"}
								size="36"
								onClick={() => setActiveYear(item.year)}
								className={`min-w-16 rounded-xl font-mono text-sm transition-all ${
									isActive
										? "bg-success text-success-fg hover:bg-success-hover font-bold shadow-md"
										: "border-border bg-fill1 text-fg-secondary hover:border-alpha hover:bg-fill2 hover:text-fg border"
								}`}>
								{item.year}
							</Button>
						)
					})}
				</div>
			</div>
		</section>
	)
}
