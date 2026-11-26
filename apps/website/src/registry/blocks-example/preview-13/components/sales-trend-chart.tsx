"use client"

import * as React from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button, IconButton } from "@/components/ui/button"
import { IconSlot } from "@/registry/icon/icon-library"
import { Card } from "@/registry/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

import { CHART_GRID_COLUMNS } from "./data"

type SalesPeriod = "Weekly" | "Monthly" | "Yearly"

interface GridCol {
	month: string
	existing: number
	newUsers: number
}

interface PeriodViewConfig {
	totalRevenue: string
	defaultColIndex: number
	yLabels: string[]
	axisLabels: { name: string; colIndex: number }[]
	columns: GridCol[]
	formatTooltipTitle: (label: string) => string
	formatNewUser: (col: GridCol, colIdx: number) => string
	formatExistingUser: (col: GridCol, colIdx: number) => string
}

const WEEKLY_COLS: GridCol[] = [
	// MON (8)
	{ month: "MON", existing: 2, newUsers: 3 },
	{ month: "MON", existing: 3, newUsers: 4 },
	{ month: "MON", existing: 4, newUsers: 5 },
	{ month: "MON", existing: 3, newUsers: 4 },
	{ month: "MON", existing: 5, newUsers: 4 },
	{ month: "MON", existing: 4, newUsers: 6 },
	{ month: "MON", existing: 2, newUsers: 5 },
	{ month: "MON", existing: 3, newUsers: 4 },
	// TUE (8)
	{ month: "TUE", existing: 4, newUsers: 6 },
	{ month: "TUE", existing: 6, newUsers: 5 },
	{ month: "TUE", existing: 5, newUsers: 7 },
	{ month: "TUE", existing: 7, newUsers: 6 },
	{ month: "TUE", existing: 6, newUsers: 5 },
	{ month: "TUE", existing: 4, newUsers: 6 },
	{ month: "TUE", existing: 3, newUsers: 5 },
	{ month: "TUE", existing: 5, newUsers: 4 },
	// WED (8)
	{ month: "WED", existing: 5, newUsers: 6 },
	{ month: "WED", existing: 7, newUsers: 7 },
	{ month: "WED", existing: 8, newUsers: 6 },
	{ month: "WED", existing: 6, newUsers: 8 },
	{ month: "WED", existing: 5, newUsers: 7 },
	{ month: "WED", existing: 4, newUsers: 6 },
	{ month: "WED", existing: 6, newUsers: 5 },
	{ month: "WED", existing: 5, newUsers: 4 },
	// THU (9) - default col 27
	{ month: "THU", existing: 6, newUsers: 7 },
	{ month: "THU", existing: 8, newUsers: 8 },
	{ month: "THU", existing: 7, newUsers: 9 },
	{ month: "THU", existing: 8, newUsers: 11 },
	{ month: "THU", existing: 9, newUsers: 9 },
	{ month: "THU", existing: 7, newUsers: 8 },
	{ month: "THU", existing: 6, newUsers: 7 },
	{ month: "THU", existing: 5, newUsers: 6 },
	{ month: "THU", existing: 4, newUsers: 5 },
	// FRI (9)
	{ month: "FRI", existing: 7, newUsers: 6 },
	{ month: "FRI", existing: 9, newUsers: 8 },
	{ month: "FRI", existing: 10, newUsers: 9 },
	{ month: "FRI", existing: 8, newUsers: 7 },
	{ month: "FRI", existing: 6, newUsers: 7 },
	{ month: "FRI", existing: 7, newUsers: 5 },
	{ month: "FRI", existing: 5, newUsers: 6 },
	{ month: "FRI", existing: 4, newUsers: 5 },
	{ month: "FRI", existing: 3, newUsers: 4 },
	// SAT (8)
	{ month: "SAT", existing: 4, newUsers: 5 },
	{ month: "SAT", existing: 3, newUsers: 4 },
	{ month: "SAT", existing: 5, newUsers: 5 },
	{ month: "SAT", existing: 4, newUsers: 6 },
	{ month: "SAT", existing: 3, newUsers: 4 },
	{ month: "SAT", existing: 2, newUsers: 5 },
	{ month: "SAT", existing: 3, newUsers: 3 },
	{ month: "SAT", existing: 2, newUsers: 4 },
	// SUN (8)
	{ month: "SUN", existing: 2, newUsers: 3 },
	{ month: "SUN", existing: 3, newUsers: 4 },
	{ month: "SUN", existing: 2, newUsers: 5 },
	{ month: "SUN", existing: 4, newUsers: 4 },
	{ month: "SUN", existing: 3, newUsers: 5 },
	{ month: "SUN", existing: 4, newUsers: 3 },
	{ month: "SUN", existing: 2, newUsers: 4 },
	{ month: "SUN", existing: 3, newUsers: 3 },
]

const YEARLY_COLS: GridCol[] = [
	// 2020 (9)
	{ month: "2020", existing: 2, newUsers: 3 },
	{ month: "2020", existing: 2, newUsers: 4 },
	{ month: "2020", existing: 3, newUsers: 4 },
	{ month: "2020", existing: 3, newUsers: 5 },
	{ month: "2020", existing: 4, newUsers: 4 },
	{ month: "2020", existing: 3, newUsers: 5 },
	{ month: "2020", existing: 4, newUsers: 5 },
	{ month: "2020", existing: 3, newUsers: 6 },
	{ month: "2020", existing: 4, newUsers: 5 },
	// 2021 (10)
	{ month: "2021", existing: 4, newUsers: 6 },
	{ month: "2021", existing: 5, newUsers: 5 },
	{ month: "2021", existing: 4, newUsers: 7 },
	{ month: "2021", existing: 6, newUsers: 6 },
	{ month: "2021", existing: 5, newUsers: 7 },
	{ month: "2021", existing: 6, newUsers: 7 },
	{ month: "2021", existing: 5, newUsers: 8 },
	{ month: "2021", existing: 7, newUsers: 6 },
	{ month: "2021", existing: 6, newUsers: 7 },
	{ month: "2021", existing: 5, newUsers: 7 },
	// 2022 (10)
	{ month: "2022", existing: 6, newUsers: 7 },
	{ month: "2022", existing: 7, newUsers: 8 },
	{ month: "2022", existing: 6, newUsers: 9 },
	{ month: "2022", existing: 8, newUsers: 7 },
	{ month: "2022", existing: 7, newUsers: 8 },
	{ month: "2022", existing: 8, newUsers: 8 },
	{ month: "2022", existing: 7, newUsers: 9 },
	{ month: "2022", existing: 9, newUsers: 7 },
	{ month: "2022", existing: 8, newUsers: 8 },
	{ month: "2022", existing: 7, newUsers: 9 },
	// 2023 (10)
	{ month: "2023", existing: 8, newUsers: 9 },
	{ month: "2023", existing: 9, newUsers: 8 },
	{ month: "2023", existing: 8, newUsers: 10 },
	{ month: "2023", existing: 9, newUsers: 9 },
	{ month: "2023", existing: 10, newUsers: 8 },
	{ month: "2023", existing: 8, newUsers: 10 },
	{ month: "2023", existing: 9, newUsers: 9 },
	{ month: "2023", existing: 10, newUsers: 9 },
	{ month: "2023", existing: 9, newUsers: 10 },
	{ month: "2023", existing: 8, newUsers: 9 },
	// 2024 (10) - default col 43
	{ month: "2024", existing: 9, newUsers: 10 },
	{ month: "2024", existing: 10, newUsers: 10 },
	{ month: "2024", existing: 9, newUsers: 11 },
	{ month: "2024", existing: 11, newUsers: 10 },
	{ month: "2024", existing: 10, newUsers: 11 },
	{ month: "2024", existing: 11, newUsers: 10 },
	{ month: "2024", existing: 10, newUsers: 11 },
	{ month: "2024", existing: 12, newUsers: 9 },
	{ month: "2024", existing: 10, newUsers: 10 },
	{ month: "2024", existing: 9, newUsers: 11 },
	// 2025 (9)
	{ month: "2025", existing: 10, newUsers: 11 },
	{ month: "2025", existing: 11, newUsers: 11 },
	{ month: "2025", existing: 10, newUsers: 12 },
	{ month: "2025", existing: 12, newUsers: 10 },
	{ month: "2025", existing: 11, newUsers: 11 },
	{ month: "2025", existing: 12, newUsers: 10 },
	{ month: "2025", existing: 11, newUsers: 11 },
	{ month: "2025", existing: 10, newUsers: 12 },
	{ month: "2025", existing: 11, newUsers: 11 },
]

const SALES_TREND_VIEWS: Record<SalesPeriod, PeriodViewConfig> = {
	Weekly: {
		totalRevenue: "$5,480",
		defaultColIndex: 27,
		yLabels: ["12k", "10k", "8k", "6k", "4k", "2k", "0k"],
		axisLabels: [
			{ name: "MON", colIndex: 3.5 },
			{ name: "TUE", colIndex: 11.5 },
			{ name: "WED", colIndex: 19.5 },
			{ name: "THU", colIndex: 28 },
			{ name: "FRI", colIndex: 37 },
			{ name: "SAT", colIndex: 45.5 },
			{ name: "SUN", colIndex: 53.5 },
		],
		columns: WEEKLY_COLS,
		formatTooltipTitle: (label) =>
			`${label.charAt(0) + label.slice(1).toLowerCase()}, Nov 2025`,
		formatNewUser: (col) => `${(col.newUsers * 0.55).toFixed(1)}k`,
		formatExistingUser: (col) => `${(col.existing * 0.65).toFixed(1)}k`,
	},
	Monthly: {
		totalRevenue: "$20,320",
		defaultColIndex: 27,
		yLabels: ["60k", "50k", "40k", "30k", "20k", "10k", "0k"],
		axisLabels: [
			{ name: "JAN", colIndex: 2 },
			{ name: "FEB", colIndex: 7 },
			{ name: "MAR", colIndex: 12 },
			{ name: "APR", colIndex: 17 },
			{ name: "MAY", colIndex: 22 },
			{ name: "JUN", colIndex: 27 },
			{ name: "JUL", colIndex: 32 },
			{ name: "AUG", colIndex: 37 },
			{ name: "SEP", colIndex: 42 },
			{ name: "OCT", colIndex: 47 },
			{ name: "NOV", colIndex: 51.5 },
			{ name: "DEC", colIndex: 55.5 },
		],
		columns: CHART_GRID_COLUMNS,
		formatTooltipTitle: (label) =>
			`${label.charAt(0) + label.slice(1).toLowerCase()} 2025`,
		formatNewUser: (col, colIdx) =>
			colIdx === 27 ? "38k" : `${Math.round(col.newUsers * 3.5)}k`,
		formatExistingUser: (col, colIdx) =>
			colIdx === 27 ? "18k" : `${Math.round(col.existing * 4)}k`,
	},
	Yearly: {
		totalRevenue: "$248,640",
		defaultColIndex: 43,
		yLabels: ["600k", "500k", "400k", "300k", "200k", "100k", "0k"],
		axisLabels: [
			{ name: "2020", colIndex: 4 },
			{ name: "2021", colIndex: 13.5 },
			{ name: "2022", colIndex: 23.5 },
			{ name: "2023", colIndex: 33.5 },
			{ name: "2024", colIndex: 43.5 },
			{ name: "2025", colIndex: 53 },
		],
		columns: YEARLY_COLS,
		formatTooltipTitle: (label) => `FY ${label}`,
		formatNewUser: (col) => `${Math.round(col.newUsers * 28)}k`,
		formatExistingUser: (col) => `${Math.round(col.existing * 26)}k`,
	},
}

const Y_POSITIONS = [14, 44, 74, 104, 134, 164, 197]

export function SalesTrendChart() {
	const [activeTab, setActiveTab] = useState<SalesPeriod>("Monthly")
	const [hoveredCol, setHoveredCol] = useState<number | null>(null)

	const view = SALES_TREND_VIEWS[activeTab]
	const columns = view.columns

	const yTicks = view.yLabels.map((label, idx) => ({
		label,
		y: Y_POSITIONS[idx],
	}))

	// Grid layout constants
	const totalRows = 23
	const gridStartX = 46
	const colStep = 8.15
	const cellW = 6.6
	const cellH = 6.6
	const rowStep = 8.1
	const baselineY = 194 // row 0 y-position

	// Active column position and tooltip coordinates
	const activeColIndex = hoveredCol ?? view.defaultColIndex
	const activeCol = columns[activeColIndex] || columns[view.defaultColIndex]

	const activeX = gridStartX + activeColIndex * colStep + cellW / 2
	const activeTotalHeight = activeCol.existing + activeCol.newUsers
	const activeY = baselineY - Math.max(activeTotalHeight, 2) * rowStep
	const isRightSide = activeColIndex > 32

	const months = view.axisLabels.map((item) => ({
		name: item.name,
		x: gridStartX + item.colIndex * colStep + cellW / 2,
	}))

	const monthDots = months.slice(0, -1).map((m, idx) => ({
		id: `dot-${idx}`,
		x: (m.x + months[idx + 1].x) / 2,
	}))

	return (
		<Card className="bg-elevation-negative flex min-w-0 flex-1 flex-col justify-between gap-0 overflow-hidden border-0 p-0.5 shadow-none">
			{/* Outer Card Top Header */}
			<div className="flex items-center justify-between px-3 pt-1.5 pb-1.5">
				<div className="font-heading text-fg-secondary flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
					<span>SALES TREND</span>
					<Tooltip>
						<TooltipTrigger asChild>
							<button
								type="button"
								className="text-fg-secondary hover:text-fg inline-flex cursor-pointer items-center transition-colors"
								aria-label="Sales trend info">
								<IconSlot slot="info" className="size-4" />
							</button>
						</TooltipTrigger>
						<TooltipContent withArrow>
							Monthly comparison of new vs. existing user revenue
						</TooltipContent>
					</Tooltip>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<IconButton
							variant="ghost"
							color="neutral"
							aria-label="More options">
							<IconSlot slot="threeDot" />
						</IconButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="center" className="w-40">
						<DropdownMenuItem>
							<IconSlot slot="file-text" />
							Export report
						</DropdownMenuItem>
						<DropdownMenuItem>
							<IconSlot slot="setting" />
							Chart settings
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Inner White Box Container */}
			<Card className="bg-elevation-level1 border-border/60 flex min-w-0 flex-1 flex-col justify-between border p-4 shadow-none">
				{/* Subheader: Revenue, Legend & Capsule Tabs */}
				<div className="flex flex-wrap items-center justify-between gap-3">
					{/* Left: Total Revenue */}
					<div className="flex items-baseline gap-2">
						<span className="text-fg-tertiary text-sm">Total Revenue :</span>
						<span className="heading-5 text-fg">{view.totalRevenue}</span>
					</div>

					{/* Middle: Legend */}
					<div className="text-fg-secondary font-body flex items-center gap-4 text-xs font-medium">
						<div className="flex items-center gap-1.5">
							<span className="bg-fill2 size-2 rounded-xs" />
							<span className="text-[12px] tracking-wider uppercase">
								NEW USER
							</span>
						</div>
						<div className="flex items-center gap-1.5">
							<span className="bg-primary size-2 rounded-xs" />
							<span className="text-[12px] tracking-wider uppercase">
								EXISTING USER
							</span>
						</div>
					</div>

					{/* Right: Radian Segmented Tabs Component */}
					<Tabs
						value={activeTab}
						onValueChange={(val) => {
							setActiveTab(val as SalesPeriod)
							setHoveredCol(null)
						}}>
						<TabsList variant="default">
							{(["Weekly", "Monthly", "Yearly"] as const).map((tab) => (
								<TabsTrigger key={tab} value={tab}>
									{tab}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				</div>

				{/* ── Main Chart Area with Waffle Grid ── */}
				<div className="relative mt-3 w-full min-w-0 [scrollbar-width:none] overflow-x-auto py-1 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
					<div className="relative min-w-[530px] pb-2">
						<svg
							viewBox="0 0 535 220"
							className="aspect-[535/220] h-auto w-full overflow-visible select-none"
							onMouseLeave={() => setHoveredCol(null)}>
							{/* Y-Axis Tick Dots & Dotted Lines */}
							{yTicks.map((tick) => (
								<g key={tick.label} className="text-fg-tertiary opacity-70">
									<circle cx="31" cy={tick.y} r="1.5" fill="currentColor" />
									<line
										x1="32"
										y1={tick.y}
										x2="43"
										y2={tick.y}
										stroke="currentColor"
										strokeWidth="1"
										strokeDasharray="1.5 1.5"
									/>
								</g>
							))}

							{/* 58 Columns x 23 Rows Waffle Grid */}
							{columns.map((col, cIdx) => {
								const colX = gridStartX + cIdx * colStep

								return (
									<g
										key={cIdx}
										className="cursor-pointer"
										onMouseEnter={() => setHoveredCol(cIdx)}>
										{Array.from({ length: totalRows }).map((_, rIdx) => {
											const cellY = baselineY - rIdx * rowStep
											const isExisting = rIdx < col.existing
											const isNewUser =
												!isExisting && rIdx < col.existing + col.newUsers

											let fillClass = "fill-fill1-alpha"
											let fillStyle: React.CSSProperties | undefined

											if (isExisting) {
												fillClass = "fill-primary"
												fillStyle = { fill: "var(--color-primary)" }
											} else if (isNewUser) {
												fillClass = "fill-fill2"
											}

											return (
												<rect
													key={rIdx}
													x={colX}
													y={cellY}
													width={cellW}
													height={cellH}
													rx="1.2"
													className={cn(
														fillClass,
														"transition-opacity hover:opacity-100"
													)}
													style={fillStyle}
												/>
											)
										})}
									</g>
								)
							})}

							{/* Full-height invisible hover zones for seamless scrubbing */}
							{columns.map((_, cIdx) => (
								<rect
									key={`hit-${cIdx}`}
									x={gridStartX + cIdx * colStep - (colStep - cellW) / 2}
									y="10"
									width={colStep}
									height="188"
									fill="transparent"
									className="cursor-pointer"
									onMouseEnter={() => setHoveredCol(cIdx)}
								/>
							))}

							{/* Vertical Dashed Guideline at active column */}
							<line
								x1={activeX}
								y1="10"
								x2={activeX}
								y2="197"
								stroke="currentColor"
								strokeWidth="1"
								strokeDasharray="2.5 2.5"
								className="text-fg-secondary/50 pointer-events-none"
							/>

							{/* Target Crosshair Marker */}
							<circle
								cx={activeX}
								cy={activeY}
								r="3.5"
								fill="var(--color-elevation-level1)"
								stroke="currentColor"
								strokeWidth="1.5"
								className="text-fg pointer-events-none"
							/>
							<circle
								cx={activeX}
								cy={activeY}
								r="1.2"
								fill="currentColor"
								className="text-fg pointer-events-none"
							/>
						</svg>

						{/* Y-Axis HTML Labels (strictly 12px, left-aligned with Total Revenue) */}
						{yTicks.map((tick) => (
							<span
								key={tick.label}
								className="text-fg-tertiary pointer-events-none absolute text-[12px] leading-none font-normal select-none"
								style={{
									left: "0%",
									top: `${(tick.y / 220) * 100}%`,
									transform: "translate(0, -15%)",
								}}>
								{tick.label}
							</span>
						))}

						{/* X-Axis HTML Month Labels (strictly 12px, unaffected by SVG scaling/stretching) */}
						{months.map((m) => (
							<span
								key={m.name}
								className={cn(
									"pointer-events-none absolute text-[12px] leading-none transition-colors select-none",
									m.name === activeCol.month
										? "text-fg font-bold"
										: "text-fg-tertiary font-normal"
								)}
								style={{
									left: `${(m.x / 535) * 100}%`,
									top: `${(210 / 220) * 100}%`,
									transform: "translate(-50%, -50%)",
								}}>
								{m.name}
							</span>
						))}
						{monthDots.map((d) => (
							<span
								key={d.id}
								className="text-fg-tertiary/70 pointer-events-none absolute text-[12px] leading-none font-normal select-none"
								style={{
									left: `${(d.x / 535) * 100}%`,
									top: `${(210 / 220) * 100}%`,
									transform: "translate(-50%, -50%)",
								}}>
								•
							</span>
						))}

						{/* Interactive Tooltip Card at Active Column */}
						<div
							className="border-border/80 bg-elevation-level2/95 pointer-events-none absolute z-20 min-w-44 rounded-lg border p-1 text-xs shadow-xl backdrop-blur-md transition-all duration-75"
							style={{
								left: `${(activeX / 535) * 100}%`,
								top: `${(activeY / 220) * 100}%`,
								transform: isRightSide
									? "translate(-108%, -50%)"
									: "translate(12px, -50%)",
							}}>
							<div className="border-border/70 bg-fill1/60 text-fg-secondary rounded-md border px-2.5 py-1.5 font-medium">
								{view.formatTooltipTitle(activeCol.month)}
							</div>
							<div className="flex flex-col gap-2 px-2.5 py-2 text-xs">
								<div className="text-fg-secondary flex items-center justify-between gap-4">
									<span className="flex items-center gap-1.5">
										<span className="bg-fill2 size-1.5 rounded-full" />
										<span>New User</span>
									</span>
									<span className="text-fg font-semibold tabular-nums">
										{view.formatNewUser(activeCol, activeColIndex)}
									</span>
								</div>
								<div className="text-fg-secondary flex items-center justify-between gap-4">
									<span className="flex items-center gap-1.5">
										<span className="bg-primary size-1.5 rounded-full" />
										<span>Existing User</span>
									</span>
									<span className="text-fg font-semibold tabular-nums">
										{view.formatExistingUser(activeCol, activeColIndex)}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</Card>
	)
}
