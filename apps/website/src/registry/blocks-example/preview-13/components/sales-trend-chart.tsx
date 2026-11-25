"use client"

import * as React from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { IconSlot } from "@/registry/icon/icon-library"
import { Button, IconButton } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/tabs"

import { CHART_GRID_COLUMNS } from "./data"

export function SalesTrendChart() {
	const [activeTab, setActiveTab] = useState<"Weekly" | "Monthly" | "Yearly">(
		"Monthly"
	)
	const [hoveredCol, setHoveredCol] = useState<number | null>(null)

	const yTicks = [
		{ label: "60k", y: 14 },
		{ label: "50k", y: 44 },
		{ label: "40k", y: 74 },
		{ label: "30k", y: 104 },
		{ label: "20k", y: 134 },
		{ label: "10k", y: 164 },
		{ label: "0k", y: 197 },
	]

	// Grid layout constants
	const totalCols = CHART_GRID_COLUMNS.length // 58
	const totalRows = 23
	const gridStartX = 46
	const colStep = 8.15
	const cellW = 6.6
	const cellH = 6.6
	const rowStep = 8.1
	const baselineY = 194 // row 0 y-position

	// Active column position and tooltip coordinates
	const juneColIndex = 27
	const activeColIndex = hoveredCol ?? juneColIndex
	const activeCol = CHART_GRID_COLUMNS[activeColIndex] || CHART_GRID_COLUMNS[27]

	const activeX = gridStartX + activeColIndex * colStep + cellW / 2
	const activeTotalHeight = activeCol.existing + activeCol.newUsers
	const activeY = baselineY - Math.max(activeTotalHeight, 2) * rowStep
	const isRightSide = activeColIndex > 32

	const months = [
		{ name: "JAN", x: gridStartX + 2 * colStep + cellW / 2 },
		{ name: "FEB", x: gridStartX + 7 * colStep + cellW / 2 },
		{ name: "MAR", x: gridStartX + 12 * colStep + cellW / 2 },
		{ name: "APR", x: gridStartX + 17 * colStep + cellW / 2 },
		{ name: "MAY", x: gridStartX + 22 * colStep + cellW / 2 },
		{ name: "JUN", x: gridStartX + 27 * colStep + cellW / 2 },
		{ name: "JUL", x: gridStartX + 32 * colStep + cellW / 2 },
		{ name: "AUG", x: gridStartX + 37 * colStep + cellW / 2 },
		{ name: "SEP", x: gridStartX + 42 * colStep + cellW / 2 },
		{ name: "OCT", x: gridStartX + 47 * colStep + cellW / 2 },
		{ name: "NOV", x: gridStartX + 51.5 * colStep + cellW / 2 },
		{ name: "DEC", x: gridStartX + 55.5 * colStep + cellW / 2 },
	]

	const monthDots = months.slice(0, -1).map((m, idx) => ({
		id: `dot-${idx}`,
		x: (m.x + months[idx + 1].x) / 2,
	}))

	return (
		<Card className="bg-fill1 border-border/70 flex flex-1 flex-col justify-between gap-0 p-0.5 pb-1 shadow-2xs">
			{/* Outer Card Top Header */}
			<div className="flex items-center justify-between px-3 pt-1.5 pb-1.5">
				<div className="font-heading text-fg-secondary flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
					<span>SALES TREND</span>
					<IconSlot slot="info" className="text-fg-secondary size-4" />
				</div>
				<IconButton
					variant="ghost"
					color="neutral"
					size="xs"
					className="text-fg-secondary hover:text-fg size-7"
					aria-label="More options">
					<IconSlot slot="threeDot" className="text-fg-secondary size-4" />
				</IconButton>
			</div>

			{/* Inner White Box Container */}
			<Card className="bg-elevation-level1 border-border/60 flex flex-1 flex-col justify-between border p-4 shadow-2xs">
				{/* Subheader: Revenue, Legend & Capsule Tabs */}
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					{/* Left: Total Revenue */}
					<div className="flex items-baseline gap-2">
						<span className="text-fg-tertiary text-sm">Total Revenue :</span>
						<span className="font-heading text-fg text-xl font-bold tracking-tight">
							$20,320
						</span>
					</div>

					{/* Middle: Legend */}
					<div className="text-fg-secondary font-body flex items-center gap-4 text-xs font-medium">
						<div className="flex items-center gap-1.5">
							<span className="bg-fg-tertiary/60 size-2 rounded-xs" />
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
						onValueChange={(val) =>
							setActiveTab(val as "Weekly" | "Monthly" | "Yearly")
						}>
						<TabsList variant="default" className="h-7.5">
							{(["Weekly", "Monthly", "Yearly"] as const).map((tab) => (
								<TabsTrigger
									key={tab}
									value={tab}
									className="px-2.5 py-1 text-xs">
									{tab}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				</div>

				{/* ── Main Chart Area with Waffle Grid ── */}
				<div className="relative mt-3 w-full [scrollbar-width:none] overflow-x-auto py-1 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
					<div className="relative min-w-[530px] pb-2">
						<svg
							viewBox="0 0 535 220"
							className="aspect-[535/220] h-auto w-full overflow-visible select-none"
							onMouseLeave={() => setHoveredCol(null)}>
							{/* Y-Axis Tick Lines */}
							{yTicks.map((tick) => (
								<line
									key={tick.label}
									x1="33"
									y1={tick.y}
									x2="39"
									y2={tick.y}
									stroke="currentColor"
									strokeWidth="1"
									className="text-fg-tertiary opacity-60"
								/>
							))}

							{/* 58 Columns x 23 Rows Waffle Grid */}
							{CHART_GRID_COLUMNS.map((col, cIdx) => {
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

											let fillClass = "fill-fill1/80"
											let fillStyle: React.CSSProperties | undefined

											if (isExisting) {
												fillClass = "fill-primary"
												fillStyle = { fill: "var(--color-primary)" }
											} else if (isNewUser) {
												fillClass = "fill-fg-tertiary/60"
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
							{CHART_GRID_COLUMNS.map((_, cIdx) => (
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

						{/* Y-Axis HTML Labels (strictly 14px, unaffected by SVG scaling/stretching) */}
						{yTicks.map((tick) => (
							<span
								key={tick.label}
								className="text-fg-tertiary pointer-events-none absolute text-[14px] leading-none font-normal select-none"
								style={{
									left: `${(30 / 535) * 100}%`,
									top: `${(tick.y / 220) * 100}%`,
									transform: "translate(-100%, -50%)",
								}}>
								{tick.label}
							</span>
						))}

						{/* X-Axis HTML Month Labels (strictly 14px, unaffected by SVG scaling/stretching) */}
						{months.map((m) => (
							<span
								key={m.name}
								className={cn(
									"pointer-events-none absolute text-[14px] leading-none transition-colors select-none",
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
								className="text-fg-tertiary/40 pointer-events-none absolute text-[14px] leading-none font-normal select-none"
								style={{
									left: `${(d.x / 535) * 100}%`,
									top: `${(210 / 220) * 100}%`,
									transform: "translate(-50%, -50%)",
								}}>
								·
							</span>
						))}

						{/* Interactive Tooltip Card at Active Column */}
						<div
							className="border-border/80 bg-elevation-level2/95 pointer-events-none absolute z-20 min-w-36 rounded-md border p-2.5 text-xs shadow-xl backdrop-blur-md transition-all duration-75"
							style={{
								left: `${(activeX / 535) * 100}%`,
								top: `${(activeY / 220) * 100}%`,
								transform: isRightSide
									? "translate(-108%, -50%)"
									: "translate(12px, -50%)",
							}}>
							<div className="font-heading text-fg font-semibold">
								{activeCol.month.charAt(0) +
									activeCol.month.slice(1).toLowerCase()}{" "}
								2025
							</div>
							<div className="mt-1.5 flex flex-col gap-1 text-[11px]">
								<div className="text-fg-secondary flex items-center justify-between">
									<span className="flex items-center gap-1.5">
										<span className="bg-fg-tertiary/60 size-2 rounded-xs" />
										<span>New User</span>
									</span>
									<span className="text-fg font-semibold">
										{activeColIndex === 27
											? "38k"
											: `${Math.round(activeCol.newUsers * 3.5)}k`}
									</span>
								</div>
								<div className="text-fg-secondary flex items-center justify-between">
									<span className="flex items-center gap-1.5">
										<span className="bg-primary size-2 rounded-xs" />
										<span>Existing User</span>
									</span>
									<span className="text-fg font-semibold">
										{activeColIndex === 27
											? "18k"
											: `${Math.round(activeCol.existing * 4)}k`}
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
