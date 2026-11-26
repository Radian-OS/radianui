"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Badge } from "@/components/ui/badge"
import { IconButton } from "@/components/ui/button"
import { IconSlot } from "@/registry/icon/icon-library"
import { Card } from "@/registry/ui/card"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
} from "@/registry/ui/chart"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

type AcquisitionTab = "Sessions" | "Signups"

const ACQUISITION_DATA: Record<
	AcquisitionTab,
	{
		headline: string
		change: string
		organic: string
		paid: string
		points: { date: string; value: number }[]
	}
> = {
	Sessions: {
		headline: "110,400",
		change: "+14.2%",
		organic: "72,760",
		paid: "37,640",
		points: [
			{ date: "Nov 1", value: 3650 },
			{ date: "Nov 5", value: 5200 },
			{ date: "Nov 10", value: 5450 },
			{ date: "Nov 15", value: 4120 },
			{ date: "Nov 20", value: 4280 },
			{ date: "Nov 25", value: 4460 },
			{ date: "Nov 30", value: 4320 },
		],
	},
	Signups: {
		headline: "18,920",
		change: "+9.8%",
		organic: "12,480",
		paid: "6,440",
		points: [
			{ date: "Nov 1", value: 540 },
			{ date: "Nov 5", value: 790 },
			{ date: "Nov 10", value: 860 },
			{ date: "Nov 15", value: 684 },
			{ date: "Nov 20", value: 730 },
			{ date: "Nov 25", value: 760 },
			{ date: "Nov 30", value: 745 },
		],
	},
}

const chartConfig = {
	value: {
		label: "Sessions",
		color: "var(--color-primary)",
	},
} satisfies ChartConfig

export function RevenueBreakdownCard() {
	const [activeTab, setActiveTab] = React.useState<AcquisitionTab>("Sessions")
	const data = ACQUISITION_DATA[activeTab]

	return (
		<Card className="bg-fill1 border-border/70 flex min-w-0 flex-1 flex-col justify-between gap-0 overflow-hidden p-0.5 shadow-2xs">
			{/* Outer Card Top Header */}
			<div className="flex items-center justify-between gap-2 px-3 pt-1.5 pb-1.5">
				<div className="font-heading text-fg-secondary flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
					<span>ACQUISITION OVERVIEW</span>
					<Tooltip>
						<TooltipTrigger asChild>
							<button
								type="button"
								className="text-fg-secondary hover:text-fg inline-flex cursor-pointer items-center transition-colors"
								aria-label="Acquisition overview info">
								<IconSlot slot="info" className="size-4" />
							</button>
						</TooltipTrigger>
						<TooltipContent withArrow>
							Total sessions and signups across organic and paid channels
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
			<Card className="bg-elevation-level1 border-border/60 flex min-w-0 flex-1 flex-col justify-between gap-5 border p-4 shadow-2xs">
				{/* Headline Metric & Badge */}
				<div className="flex items-center gap-2">
					<span className="font-heading text-fg text-lg leading-none font-bold tracking-tight tabular-nums">
						{data.headline}
					</span>
					<Badge color="success" className="leading-none">
						{data.change}
					</Badge>
				</div>

				{/* Sessions / Signups Toggle Tabs */}
				<Tabs
					value={activeTab}
					onValueChange={(val) => setActiveTab(val as AcquisitionTab)}>
					<TabsList variant="default" className="w-full">
						{(["Sessions", "Signups"] as const).map((tab) => (
							<TabsTrigger key={tab} value={tab} className="flex-1">
								{tab}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>

				{/* Smooth Area Chart with Reference Callout */}
				<div className="relative mt-3 flex min-h-[200px] flex-1 flex-col">
					<ChartContainer
						config={chartConfig}
						className="min-h-[200px] w-full flex-1">
						<AreaChart
							accessibilityLayer
							data={data.points}
							margin={{ top: 18, right: 8, left: 8, bottom: 0 }}>
							<defs>
								<linearGradient id="acqGradient" x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="0%"
										stopColor="var(--color-primary)"
										stopOpacity={0.18}
									/>
									<stop
										offset="100%"
										stopColor="var(--color-primary)"
										stopOpacity={0.03}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="date"
								ticks={["Nov 1", "Nov 15", "Nov 30"]}
								interval={0}
								padding={{ left: 0, right: 0 }}
								tickLine={false}
								axisLine={false}
								tickMargin={10}
								tick={(props: {
									x?: number | string
									y?: number | string
									payload?: { value?: string }
								}) => {
									const value = props.payload?.value ?? ""
									const anchor =
										value === "Nov 1"
											? "start"
											: value === "Nov 30"
												? "end"
												: "middle"
									return (
										<text
											x={props.x}
											y={Number(props.y ?? 0) + 10}
											textAnchor={anchor}
											fill="currentColor"
											fontSize={12}
											className="fill-fg-tertiary">
											{value}
										</text>
									)
								}}
							/>
							<YAxis hide domain={[0, "dataMax + 2200"]} />
							<ChartTooltip
								cursor={{ stroke: "var(--color-border)", strokeWidth: 1 }}
								content={({ active, payload }) => {
									if (!active || !payload?.length) return null
									const point = payload[0]?.payload as
										| { date: string; value: number }
										| undefined
									if (!point) return null

									return (
										<div className="border-border bg-elevation-level1 pointer-events-none rounded-md border px-2.5 py-1.5 whitespace-nowrap shadow-md">
											<div className="text-fg-tertiary text-xs leading-tight">
												{point.date}, 2025
											</div>
											<div className="text-fg mt-0.5 text-xs font-semibold tabular-nums">
												{point.value.toLocaleString()}{" "}
												{activeTab === "Sessions" ? "sessions" : "signups"}
											</div>
										</div>
									)
								}}
							/>
							<Area
								dataKey="value"
								type="monotone"
								stroke="var(--color-primary)"
								strokeWidth={1.75}
								fill="url(#acqGradient)"
								dot={false}
								activeDot={{
									r: 4.5,
									fill: "var(--color-elevation-level1)",
									stroke: "var(--color-primary)",
									strokeWidth: 2,
								}}
							/>
						</AreaChart>
					</ChartContainer>
				</div>

				{/* Clean Bottom Summary Bar */}
				<div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-3 text-sm">
					<div className="text-fg-secondary flex items-center gap-1.5">
						<span className="bg-primary size-2.5 rounded-xs" />
						<span>
							Organic:{" "}
							<span className="text-fg font-semibold tabular-nums">
								{data.organic}
							</span>
						</span>
					</div>
					<span className="text-border">|</span>
					<div className="text-fg-secondary flex items-center gap-1.5">
						<span className="bg-fg-tertiary/60 size-2.5 rounded-xs" />
						<span>
							Paid:{" "}
							<span className="text-fg font-semibold tabular-nums">
								{data.paid}
							</span>
						</span>
					</div>
				</div>
			</Card>
		</Card>
	)
}
