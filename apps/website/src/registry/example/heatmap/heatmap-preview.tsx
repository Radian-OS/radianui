"use client"

import * as React from "react"
import CalendarHeatmap from "react-calendar-heatmap"
import "react-calendar-heatmap/dist/styles.css"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"
import { cn } from "@/lib/utils"

type HeatmapValue = {
	date: string
	count: number
	level: 0 | 1 | 2 | 3 | 4
}

// 7 rows x 12 two-hour intervals
function generateHeatmapData(): HeatmapValue[] {
	const pattern: (0 | 1 | 2 | 3 | 4)[][] = [
		[0, 0, 0, 0, 1, 2, 2, 4, 3, 2, 1, 0],
		[0, 0, 0, 0, 1, 2, 3, 4, 3, 2, 1, 0],
		[0, 0, 0, 0, 1, 2, 3, 4, 3, 2, 1, 0],
		[0, 0, 0, 0, 1, 2, 4, 4, 3, 2, 1, 0],
		[0, 0, 0, 0, 1, 2, 3, 3, 2, 2, 1, 0],
		[0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 0, 0],
		[0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 0, 0],
	]

	const baseDate = new Date("2026-01-04")
	const values: HeatmapValue[] = []

	for (let w = 0; w < 12; w++) {
		for (let d = 0; d < 7; d++) {
			const dayOffset = w * 7 + d
			const currentDate = new Date(baseDate)
			currentDate.setDate(baseDate.getDate() + dayOffset)
			const dateStr = currentDate.toISOString().split("T")[0]

			const jsDay = currentDate.getDay()
			const rowIdx = jsDay === 0 ? 6 : jsDay - 1
			const colIdx = w

			const level = pattern[rowIdx][colIdx]

			let baseCount = 0
			if (level === 4) baseCount = 138 + ((rowIdx * 7 + colIdx * 3) % 19)
			else if (level === 3) baseCount = 92 + ((rowIdx * 5 + colIdx * 4) % 15)
			else if (level === 2) baseCount = 54 + ((rowIdx * 4 + colIdx * 2) % 12)
			else if (level === 1) baseCount = 24 + ((rowIdx * 3 + colIdx) % 8)
			else baseCount = 4 + ((rowIdx + colIdx) % 4)

			values.push({
				date: dateStr,
				count: baseCount,
				level,
			})
		}
	}

	return values
}

const GUTTER_SIZE = 2.5
const SQUARE_SIZE = 10

export default function HeatmapPreview() {
	const values = React.useMemo(() => generateHeatmapData(), [])

	return (
		<div className="[&_rect:hover]:stroke-primary [&_text]:fill-fg-secondary w-full max-w-2xl overflow-x-auto p-4 [&_rect]:transition-all [&_rect]:duration-150 [&_rect:hover]:stroke-[0.8px] [&_rect:hover]:opacity-85 [&_text]:text-[10px]">
			<CalendarHeatmap
				startDate={new Date("2026-01-04")}
				endDate={new Date("2026-03-28")}
				values={values}
				gutterSize={GUTTER_SIZE}
				classForValue={(value) => {
					if (!value || value.level === 0) {
						return "fill-alpha"
					}
					switch (value.level) {
						case 1:
							return "fill-primary/25"
						case 2:
							return "fill-primary/50"
						case 3:
							return "fill-primary/75"
						case 4:
						default:
							return "fill-primary"
					}
				}}
				transformDayElement={(element: any, value, index) => {
					const date = new Date(value?.date || "2026-01-04")
					const jsDay = date.getDay()
					const rowIdx = jsDay === 0 ? 6 : jsDay - 1
					const targetY = rowIdx * (SQUARE_SIZE + GUTTER_SIZE)

					return (
						<Tooltip key={value?.date || index}>
							<TooltipTrigger asChild>
								{React.cloneElement(element, {
									y: targetY,
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
										{value?.count?.toLocaleString()} active users
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
	)
}
