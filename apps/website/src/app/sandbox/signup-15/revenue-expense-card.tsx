"use client"

import React, { useState } from "react"

const X_TICKS = [
	{ label: "1", x: 42 },
	{ label: "3", x: 67 },
	{ label: "5", x: 95 },
	{ label: "7", x: 124 },
	{ label: "9", x: 151 },
	{ label: "11", x: 181 },
	{ label: "13", x: 212 },
	{ label: "15", x: 245 },
	{ label: "17", x: 276 },
	{ label: "19", x: 308 },
	{ label: "21", x: 342 },
	{ label: "23", x: 374 },
	{ label: "25", x: 406 },
	{ label: "27", x: 440 },
	{ label: "29", x: 473 },
	{ label: "31", x: 508 },
]

const Y_TICKS = [
	{ label: "$50k", y: 12 },
	{ label: "$40k", y: 32 },
	{ label: "$30k", y: 52 },
	{ label: "$20k", y: 72 },
	{ label: "$10k", y: 92 },
	{ label: "$0", y: 112 },
]

const GREEN_POINTS: [number, number][] = [
	[41.9, 70.4],
	[67.4, 56.0],
	[95.0, 59.0],
	[123.5, 51.0],
	[151.2, 55.0],
	[181.0, 47.6],
	[212.2, 54.0],
	[245.0, 51.0],
	[276.2, 42.0],
	[308.4, 49.6],
	[341.8, 49.0],
	[373.6, 43.6],
	[406.2, 50.0],
	[439.9, 43.6],
	[473.0, 50.4],
	[508.0, 46.0],
]

const RED_POINTS: [number, number][] = [
	[41.5, 90.4],
	[67.4, 87.2],
	[95.4, 89.0],
	[123.6, 82.4],
	[151.1, 83.0],
	[181.4, 79.6],
	[212.5, 83.6],
	[245.3, 81.0],
	[276.4, 83.6],
	[308.6, 86.4],
	[341.5, 81.6],
	[373.5, 85.0],
	[406.5, 81.6],
	[439.8, 81.6],
	[472.6, 84.8],
	[508.0, 81.6],
]

export function RevenueExpenseCard() {
	const [activeRange, setActiveRange] = useState<"7D" | "30D" | "3M" | "1Y">(
		"30D"
	)

	const greenPath = GREEN_POINTS.map(([x, y], i) =>
		i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
	).join(" ")
	const redPath = RED_POINTS.map(([x, y], i) =>
		i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
	).join(" ")

	return (
		<div className="w-full rounded-2xl border border-neutral-200/90 bg-white px-4 pt-3.5 pb-2 shadow-[0_12px_36px_rgba(0,0,0,0.07),0_2px_8px_rgba(0,0,0,0.03)] sm:px-5 sm:pt-4 sm:pb-2.5">
			{/* Header: Title, Legend, and Segmented Range Controls */}
			<div className="flex items-start justify-between gap-3">
				<div>
					<h3 className="text-xs font-bold tracking-tight text-neutral-900 sm:text-[13px]">
						Revenue vs. Expenses
					</h3>
					<div className="mt-1 flex items-center gap-3 text-[10.5px] font-medium text-neutral-600">
						<div className="flex items-center gap-1">
							<span className="size-2 rounded-[2px] bg-[#22C55E]" />
							<span className="text-neutral-700">Revenue</span>
						</div>
						<div className="flex items-center gap-1">
							<span className="size-2 rounded-[2px] bg-[#EF4444]" />
							<span className="text-neutral-700">Expenses</span>
						</div>
					</div>
				</div>

				{/* Range Tabs: 7D, 30D, 3M, 1Y */}
				<div className="flex items-center rounded-lg border border-neutral-200/90 bg-white p-0.5 text-[10px] font-semibold text-neutral-600">
					{(["7D", "30D", "3M", "1Y"] as const).map((range) => (
						<button
							key={range}
							type="button"
							onClick={() => setActiveRange(range)}
							className={`rounded-md px-1.5 py-0.5 transition-colors ${
								activeRange === range
									? "bg-neutral-100 font-bold text-neutral-900 shadow-xs"
									: "text-neutral-600 hover:text-neutral-900"
							}`}>
							{range}
						</button>
					))}
				</div>
			</div>

			{/* SVG Chart matching reference with compact height */}
			<div className="mt-1.5 w-full">
				<svg
					viewBox="0 0 526 138"
					className="h-auto w-full select-none"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					{/* Horizontal Grid Lines */}
					{Y_TICKS.map((tick) => (
						<line
							key={`grid-${tick.label}`}
							x1="40"
							y1={tick.y}
							x2="515"
							y2={tick.y}
							stroke="#E5E7EB"
							strokeWidth="1"
						/>
					))}

					{/* Y-Axis Labels */}
					{Y_TICKS.map((tick) => (
						<text
							key={`y-${tick.label}`}
							x="34"
							y={tick.y + 3.5}
							textAnchor="end"
							fill="#9CA3AF"
							fontSize="10"
							fontWeight="500"
							fontFamily="system-ui, -apple-system, sans-serif">
							{tick.label}
						</text>
					))}

					{/* X-Axis Labels */}
					{X_TICKS.map((tick) => (
						<text
							key={`x-${tick.label}`}
							x={tick.x}
							y="130"
							textAnchor="middle"
							fill="#9CA3AF"
							fontSize="10"
							fontWeight="500"
							fontFamily="system-ui, -apple-system, sans-serif">
							{tick.label}
						</text>
					))}

					{/* Expenses Line (Dashed Red) */}
					<path
						d={redPath}
						stroke="#EF4444"
						strokeWidth="1.75"
						strokeDasharray="4 3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					{/* Expenses Points */}
					{RED_POINTS.map(([x, y], idx) => (
						<circle key={`red-${idx}`} cx={x} cy={y} r="3" fill="#EF4444" />
					))}

					{/* Revenue Line (Solid Green) */}
					<path
						d={greenPath}
						stroke="#22C55E"
						strokeWidth="1.75"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					{/* Revenue Points */}
					{GREEN_POINTS.map(([x, y], idx) => (
						<circle key={`green-${idx}`} cx={x} cy={y} r="3" fill="#22C55E" />
					))}
				</svg>
			</div>
		</div>
	)
}
