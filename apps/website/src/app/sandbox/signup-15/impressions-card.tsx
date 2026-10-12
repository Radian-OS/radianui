"use client"

import React from "react"
import { Eye, ArrowDownRight } from "lucide-react"
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/styles/default/ui/card"

interface BarData {
	date: string
	value: number
	heightPercent: number
}

const BAR_DATA: BarData[] = [
	{ date: "29 Dec", value: 290, heightPercent: (290 / 400) * 100 },
	{ date: "30 Dec", value: 230, heightPercent: (230 / 400) * 100 },
	{ date: "31 Dec", value: 350, heightPercent: (350 / 400) * 100 },
	{ date: "01 Jan", value: 145, heightPercent: (145 / 400) * 100 },
	{ date: "02 Jan", value: 250, heightPercent: (250 / 400) * 100 },
	{ date: "03 Jan", value: 65, heightPercent: (65 / 400) * 100 },
	{ date: "04 Jan", value: 185, heightPercent: (185 / 400) * 100 },
]

const Y_AXIS_TICKS = [400, 300, 200, 100, 0]

export function ImpressionsCard() {
	return (
		/* Outer Acrylic Translucent Glass Rim ("Transparent Border") */
		<div className="relative rounded-[28px] border border-white/75 bg-white/45 p-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.6)] backdrop-blur-xl sm:p-2.5">
			<Card className="w-full gap-5 rounded-[20px] border border-neutral-100/90 bg-white p-6 text-neutral-900 shadow-xs">
				{/* Card Header: Eye Icon + Title on Left, Metric + Trend on Right */}
				<CardHeader className="flex flex-row items-center justify-between p-0">
					{/* Left: Icon & Title */}
					<div className="flex items-center gap-3">
						<div className="flex size-10 items-center justify-center rounded-full bg-[#EEF2FF] text-[#3154F5]">
							<Eye className="size-5 stroke-[2.2]" />
						</div>
						<CardTitle className="text-base font-semibold tracking-tight text-neutral-900">
							Impressions
						</CardTitle>
					</div>

					{/* Right: Total Value + Trend Indicator */}
					<div className="flex items-baseline gap-2 text-right">
						<span className="text-xl font-bold tracking-tight text-neutral-900">
							43,105
						</span>
						<span className="inline-flex items-center text-xs font-semibold text-rose-500">
							<ArrowDownRight className="mr-0.5 size-3.5 stroke-[2.5]" />
							34.08%
						</span>
					</div>
				</CardHeader>

				{/* Card Content: Bar Chart with Axis Labels & Dashed Grid Lines */}
				<CardContent className="p-0 pt-2">
					<div className="relative flex h-[190px] w-full">
						{/* Y-Axis Labels */}
						<div className="flex h-[155px] flex-col justify-between pr-3 text-right text-[11px] font-normal text-neutral-400 select-none">
							{Y_AXIS_TICKS.map((tick) => (
								<span key={`y-axis-${tick}`} className="leading-none">
									{tick}
								</span>
							))}
						</div>

						{/* Chart Grid & Bars Container */}
						<div className="relative flex-1">
							{/* Horizontal Subtle Dashed Grid Lines */}
							<div className="pointer-events-none absolute inset-x-0 top-0 flex h-[155px] flex-col justify-between">
								{Y_AXIS_TICKS.map((tick) => (
									<div
										key={`grid-${tick}`}
										className="w-full border-b border-dashed border-neutral-100"
									/>
								))}
							</div>

							{/* Bars Flex Container */}
							<div className="relative flex h-[155px] items-end justify-between px-3">
								{BAR_DATA.map((bar) => (
									<div
										key={`bar-${bar.date}`}
										className="group flex flex-col items-center">
										{/* Tooltip on Hover */}
										<div className="pointer-events-none mb-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
											<span className="rounded bg-neutral-900 px-1.5 py-0.5 text-[10px] font-medium text-white shadow-xs">
												{bar.value}
											</span>
										</div>

										{/* Vertical Bar */}
										<div
											style={{ height: `${bar.heightPercent}%` }}
											className="w-5 rounded-t-lg bg-[#3154F5] shadow-xs transition-all duration-300 group-hover:brightness-110 sm:w-6"
										/>
									</div>
								))}
							</div>

							{/* X-Axis Dates */}
							<div className="mt-3 flex justify-between px-2 text-[11px] font-medium text-neutral-400 select-none">
								{BAR_DATA.map((bar) => (
									<span
										key={`x-axis-${bar.date}`}
										className="w-8 text-center sm:w-10">
										{bar.date}
									</span>
								))}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
