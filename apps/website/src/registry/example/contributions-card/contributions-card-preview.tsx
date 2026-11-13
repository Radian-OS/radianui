"use client"

import * as React from "react"
import CalendarHeatmap from "react-calendar-heatmap"
import "react-calendar-heatmap/dist/styles.css"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"
import { cn } from "@/lib/utils"

type ContributionValue = {
	date: string
	count: number
	level: 1 | 2 | 3 | 4 | 5
}

// Deterministic activity data distributed across the year
function generateContributions(): ContributionValue[] {
	const values: ContributionValue[] = []
	const baseDate = new Date("2026-01-01")

	const highSpots = new Set([
		"3-1",
		"3-2",
		"3-5",
		"4-0",
		"4-3",
		"7-1",
		"7-2",
		"8-3",
		"8-4",
		"8-6",
		"10-2",
		"11-0",
		"11-3",
		"11-5",
		"12-1",
		"12-4",
		"15-2",
		"16-1",
		"16-4",
		"17-3",
		"20-1",
		"20-5",
		"21-2",
		"22-0",
		"22-4",
		"23-3",
		"24-1",
		"24-5",
		"27-0",
		"27-4",
		"28-2",
		"29-1",
		"29-5",
		"30-3",
		"33-2",
		"34-1",
		"34-4",
		"35-0",
		"35-5",
		"38-1",
		"38-4",
		"39-2",
		"39-5",
		"40-3",
		"43-0",
		"43-4",
		"44-2",
		"44-5",
		"45-1",
		"48-2",
		"49-0",
		"49-3",
		"50-1",
		"50-4",
		"51-2",
		"51-5",
	])

	const mediumSpots = new Set([
		"2-2",
		"4-1",
		"4-5",
		"5-3",
		"6-2",
		"9-1",
		"10-5",
		"12-2",
		"13-4",
		"14-1",
		"17-1",
		"18-3",
		"19-2",
		"21-5",
		"25-2",
		"26-4",
		"28-0",
		"31-2",
		"32-4",
		"36-2",
		"37-4",
		"41-1",
		"42-3",
		"46-2",
		"47-4",
		"49-5",
		"51-0",
	])

	const lowSpots = new Set([
		"1-3",
		"2-5",
		"5-1",
		"6-4",
		"8-1",
		"13-2",
		"15-5",
		"18-1",
		"21-0",
		"23-5",
		"26-1",
		"31-5",
		"36-5",
		"41-4",
		"46-5",
		"47-1",
	])

	for (let w = 0; w < 52; w++) {
		for (let d = 0; d < 7; d++) {
			const dayIndex = w * 7 + d
			const currentDate = new Date(baseDate)
			currentDate.setDate(baseDate.getDate() + dayIndex)
			const dateStr = currentDate.toISOString().split("T")[0]

			const key = `${w}-${d}`
			if (highSpots.has(key)) {
				const level: 4 | 5 = (w + d) % 2 === 0 ? 5 : 4
				values.push({ date: dateStr, count: level === 5 ? 22 : 15, level })
			} else if (mediumSpots.has(key)) {
				const level: 2 | 3 = (w + d) % 2 === 0 ? 3 : 2
				values.push({ date: dateStr, count: level === 3 ? 9 : 5, level })
			} else if (lowSpots.has(key)) {
				values.push({ date: dateStr, count: 2, level: 1 })
			}
		}
	}

	return values
}

export default function ContributionsCardPreview() {
	const values = React.useMemo(() => generateContributions(), [])

	return (
		<div className="w-full overflow-x-auto p-4">
			<div className="[&_rect:hover]:stroke-primary [&_text]:fill-fg-secondary min-w-[1000px] [&_rect]:transition-all [&_rect]:duration-150 [&_rect:hover]:stroke-[0.8px] [&_rect:hover]:opacity-85 [&_text]:text-[10px]">
				<CalendarHeatmap
					startDate={new Date("2026-01-01")}
					endDate={new Date("2026-12-31")}
					values={values}
					gutterSize={2}
					classForValue={(value) => {
						if (!value || !value.count) {
							return "fill-alpha"
						}
						switch (value.level) {
							case 1:
								return "fill-primary/20"
							case 2:
								return "fill-primary/40"
							case 3:
								return "fill-primary/65"
							case 4:
								return "fill-primary/85"
							case 5:
							default:
								return "fill-primary"
						}
					}}
					transformDayElement={(element: any, value, index) => {
						return (
							<Tooltip key={value?.date || index}>
								<TooltipTrigger asChild>
									{React.cloneElement(element, {
										rx: 2.5,
										ry: 2.5,
										className: cn(
											element.props.className,
											"cursor-pointer focus:outline-none"
										),
									})}
								</TooltipTrigger>
								<TooltipContent
									side="top"
									sideOffset={6}
									withArrow
									className="text-xs">
									<div className="flex flex-col gap-0.5">
										<span className="text-white-inverse font-semibold">
											{value?.count
												? `${value.count} contributions`
												: "No contributions"}
										</span>
										<span className="text-[11px] text-neutral-400">
											{value?.date
												? new Date(value.date).toLocaleDateString("en-US", {
														month: "short",
														day: "numeric",
														year: "numeric",
													})
												: "No date"}
										</span>
									</div>
								</TooltipContent>
							</Tooltip>
						)
					}}
				/>
			</div>
		</div>
	)
}
