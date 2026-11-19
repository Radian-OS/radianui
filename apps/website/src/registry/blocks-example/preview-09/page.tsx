"use client"

import * as React from "react"
import { useState } from "react"
import {
	Area,
	AreaChart,
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"
import {
	BarChart3,
	Sparkles,
	RotateCw,
	Calendar,
	ChevronDown,
	SlidersHorizontal,
	CircleDollarSign,
	Layers,
	ArrowUp,
	TrendingUp,
	TrendingDown,
	Clock,
	History,
	CalendarDays,
	CalendarRange,
	CalendarCheck,
	CalendarClock,
	Sliders,
	ArrowLeftRight,
	GitCompare,
	Ban,
	DollarSign,
	Euro,
	PoundSterling,
	IndianRupee,
	Coins,
	Leaf,
	Megaphone,
	Share2,
	Mail,
	Link2,
	Compass,
	Check,
} from "lucide-react"

import { Button } from "@/styles/default/ui/button"
import { Card } from "@/styles/default/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// ──────────────────────────────────────────────
// Datasets matching the reference screenshots
// ──────────────────────────────────────────────

// 30-day sales data summing to exactly $168,920 ($3.6k – $7.9k/day)
const salesOverTimeData = [
	{ date: "Jul 1", current: 3600, compare: 4200 },
	{ date: "Jul 2", current: 4100, compare: 4400 },
	{ date: "Jul 3", current: 3900, compare: 4300 },
	{ date: "Jul 4", current: 5600, compare: 4500 },
	{ date: "Jul 5", current: 4700, compare: 4600 },
	{ date: "Jul 6", current: 5100, compare: 4700 },
	{ date: "Jul 7", current: 5900, compare: 4800 },
	{ date: "Jul 8", current: 6200, compare: 4900 },
	{ date: "Jul 9", current: 5400, compare: 4800 },
	{ date: "Jul 10", current: 6700, compare: 5100 },
	{ date: "Jul 11", current: 6000, compare: 5000 },
	{ date: "Jul 12", current: 6800, compare: 5200 },
	{ date: "Jul 13", current: 6500, compare: 5100 },
	{ date: "Jul 14", current: 7900, compare: 5300 },
	{ date: "Jul 15", current: 7100, compare: 5200 },
	{ date: "Jul 16", current: 7500, compare: 5400 },
	{ date: "Jul 17", current: 5700, compare: 5300 },
	{ date: "Jul 18", current: 6100, compare: 5100 },
	{ date: "Jul 19", current: 4700, compare: 4900 },
	{ date: "Jul 20", current: 5200, compare: 5000 },
	{ date: "Jul 21", current: 3700, compare: 4800 },
	{ date: "Jul 22", current: 4200, compare: 4700 },
	{ date: "Jul 23", current: 4600, compare: 4900 },
	{ date: "Jul 24", current: 5700, compare: 5100 },
	{ date: "Jul 25", current: 6300, compare: 5200 },
	{ date: "Jul 26", current: 5900, compare: 5000 },
	{ date: "Jul 27", current: 7100, compare: 5300 },
	{ date: "Jul 28", current: 6200, compare: 5100 },
	{ date: "Jul 29", current: 5600, compare: 4900 },
	{ date: "Jul 30", current: 4920, compare: 4700 },
]

// Average Order Value dataset (Jul 1 – Jul 30, 2026)
const aovData = [
	{ date: "Jul 1", aov: 126 },
	{ date: "Jul 3", aov: 132 },
	{ date: "Jul 5", aov: 138 },
	{ date: "Jul 7", aov: 144 },
	{ date: "Jul 9", aov: 140 },
	{ date: "Jul 11", aov: 147 },
	{ date: "Jul 13", aov: 152 },
	{ date: "Jul 15", aov: 158 },
	{ date: "Jul 17", aov: 150 },
	{ date: "Jul 19", aov: 139 },
	{ date: "Jul 21", aov: 136 },
	{ date: "Jul 23", aov: 145 },
	{ date: "Jul 25", aov: 151 },
	{ date: "Jul 27", aov: 162 },
	{ date: "Jul 29", aov: 148 },
	{ date: "Jul 30", aov: 143 },
]

// Sales by channel donut dataset (themed with primary color opacities)
const salesChannelData = [
	{ name: "Online Store", value: 45, opacity: 1 },
	{ name: "Marketplace", value: 25, opacity: 0.75 },
	{ name: "Social Media", value: 18, opacity: 0.5 },
	{ name: "Retail / POS", value: 12, opacity: 0.3 },
]

// Sales breakdown mathematically summing to $168,920:
// Net sales ($157,550) = Gross ($172,400) - Discounts ($11,200) - Reversals ($3,650)
// Total sales ($168,920) = Net ($157,550) + Shipping ($8,240) - Return fees ($1,480) + Taxes ($4,610)
const salesBreakdown = [
	{ name: "Gross sales", amount: "$172,400", trend: "up" },
	{ name: "Discounts", amount: "$11,200", trend: "down" },
	{ name: "Sales reversals", amount: "$3,650", trend: "down" },
	{ name: "Net sales", amount: "$157,550", trend: "up" },
	{ name: "Shipping charges", amount: "$8,240", trend: "up" },
	{ name: "Return fees", amount: "$1,480", trend: "down" },
	{ name: "Taxes", amount: "$4,610", trend: "up" },
	{ name: "Total sales", amount: "$168,920", trend: "up" },
]

// ──────────────────────────────────────────────
// Mini Sparkline Components
// ──────────────────────────────────────────────

function MiniBarChart({ bars }: { bars: number[] }) {
	return (
		<div className="flex h-6 shrink-0 items-end gap-[3px]">
			{bars.map((h, i) => (
				<div
					key={i}
					style={{ height: `${h}%` }}
					className="w-[7px] shrink-0 rounded-[1.5px] bg-zinc-200 transition-colors dark:bg-zinc-800"
				/>
			))}
		</div>
	)
}

function WaveUp() {
	return <TrendingUp className="size-4 shrink-0 text-emerald-500" />
}

function WaveDown() {
	return <TrendingDown className="size-4 shrink-0 text-rose-500" />
}

function DashFlat() {
	return (
		<span className="inline-block h-[2px] w-6 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
	)
}

const DATE_RANGE_OPTIONS = [
	{ label: "Today", value: "Today", icon: Clock },
	{ label: "Yesterday", value: "Yesterday", icon: History },
	{ label: "Last 7 days", value: "Last 7 days", icon: CalendarDays },
	{ label: "Last 30 days", value: "Last 30 days", icon: CalendarRange },
	{ label: "Last 90 days", value: "Last 90 days", icon: CalendarCheck },
	{ label: "This month", value: "This month", icon: Calendar },
	{ label: "Last month", value: "Last month", icon: CalendarClock },
	{ label: "Custom range", value: "Custom range", icon: Sliders },
]

const COMPARE_OPTIONS = [
	{ label: "Previous period", value: "Previous period", icon: ArrowLeftRight },
	{ label: "Previous year", value: "Previous year", icon: CalendarRange },
	{
		label: "Same period last year",
		value: "Same period last year",
		icon: GitCompare,
	},
	{ label: "No comparison", value: "No comparison", icon: Ban },
]

const CURRENCY_OPTIONS = [
	{ label: "USD ($)", value: "USD", icon: DollarSign },
	{ label: "EUR (€)", value: "EUR", icon: Euro },
	{ label: "GBP (£)", value: "GBP", icon: PoundSterling },
	{ label: "NPR (Rs)", value: "NPR", icon: Coins },
	{ label: "INR (₹)", value: "INR", icon: IndianRupee },
]

const CHANNEL_OPTIONS = [
	{ label: "All channels", value: "All channels", icon: Layers },
	{ label: "Organic", value: "Organic", icon: Leaf },
	{ label: "Paid", value: "Paid", icon: Megaphone },
	{ label: "Social", value: "Social", icon: Share2 },
	{ label: "Email", value: "Email", icon: Mail },
	{ label: "Referral", value: "Referral", icon: Link2 },
	{ label: "Direct", value: "Direct", icon: Compass },
]

export default function Page() {
	const [channel, setChannel] = useState("All channels")
	const [timeRange, setTimeRange] = useState("Last 30 days")
	const [compareOption, setCompareOption] = useState("Previous period")
	const [currency, setCurrency] = useState("USD")

	const activeTimeRange =
		DATE_RANGE_OPTIONS.find((opt) => opt.value === timeRange) ||
		DATE_RANGE_OPTIONS[3]
	const TimeRangeIcon = activeTimeRange.icon

	const activeCompare =
		COMPARE_OPTIONS.find((opt) => opt.value === compareOption) ||
		COMPARE_OPTIONS[0]
	const CompareIcon = activeCompare.icon

	const activeCurrency =
		CURRENCY_OPTIONS.find((opt) => opt.value === currency) ||
		CURRENCY_OPTIONS[0]
	const CurrencyIcon = activeCurrency.icon

	const activeChannel =
		CHANNEL_OPTIONS.find((opt) => opt.value === channel) || CHANNEL_OPTIONS[0]
	const ChannelIcon = activeChannel.icon

	return (
		<div className="dark:bg-bg text-fg bg-bg-subtle min-h-screen w-full px-6 py-6 font-sans transition-colors md:px-10 md:py-8">
			<div className="mx-auto flex max-w-7xl flex-col gap-4">
				{/* ══════════════════════════════════════════════
            1. TOP NAVBAR / HEADER & 2. TOOLBAR
        ══════════════════════════════════════════════ */}
				<div className="flex flex-col gap-6">
					<header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-6">
						<div className="flex items-center gap-2.5">
							<div className="text-fg-secondary dark:bg-fill2 flex size-7 items-center justify-center rounded-lg bg-zinc-100">
								<BarChart3 className="size-4" />
							</div>
							<h1 className="heading-5 text-fg">Analytics</h1>
						</div>

						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								color="neutral"
								size="sm"
								className="border-border/60 bg-elevation-level1 text-fg hover:bg-fill1/40 h-8.5 gap-1.5 rounded-xl px-3 text-[14px] font-medium shadow-2xs">
								<Sparkles className="text-fg-secondary size-3.5" />
								<span>Accounts</span>
							</Button>
							<Button
								variant="outline"
								color="neutral"
								size="sm"
								className="border-border/60 bg-elevation-level1 text-fg hover:bg-fill1/40 h-8.5 gap-1.5 rounded-xl px-3 text-[14px] font-medium shadow-2xs">
								<RotateCw className="text-fg-secondary size-3.5" />
								<span>Refresh</span>
							</Button>
							<Button
								color="primary"
								variant="strong"
								size="sm"
								className="h-8.5 rounded-xl px-4 text-[14px] font-semibold shadow-xs">
								Save as report
							</Button>
						</div>
					</header>

					{/* ══════════════════════════════════════════════
            2. TOOLBAR / FILTER ROW
        ══════════════════════════════════════════════ */}
					<div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-6">
						<div className="flex flex-wrap items-center gap-2">
							{/* Date range dropdown */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										color="neutral"
										size="sm"
										className="border-border/60 bg-elevation-level1 text-fg hover:bg-fill1/40 h-8 cursor-pointer gap-1.5 rounded-xl px-3 text-[14px] font-medium shadow-2xs">
										<TimeRangeIcon className="text-fg-secondary size-3.5" />
										<span>{timeRange}</span>
										<ChevronDown className="text-fg-tertiary size-3.5" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="start"
									className="border-border/80 w-52 rounded-2xl border p-1.5 shadow-lg">
									{DATE_RANGE_OPTIONS.map((opt) => {
										const Icon = opt.icon
										const isSelected = timeRange === opt.value
										return (
											<DropdownMenuItem
												key={opt.value}
												onClick={() => setTimeRange(opt.value)}
												className={cn(
													"cursor-pointer justify-between gap-2.5 rounded-lg px-3 py-2 text-[14px]",
													isSelected && "bg-fill1 text-fg font-medium"
												)}>
												<div className="flex items-center gap-2.5">
													<Icon className="text-fg-secondary size-4 shrink-0" />
													<span>{opt.label}</span>
												</div>
												{isSelected && (
													<Check className="text-primary size-4 shrink-0" />
												)}
											</DropdownMenuItem>
										)
									})}
								</DropdownMenuContent>
							</DropdownMenu>

							{/* Compare dropdown */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										color="neutral"
										size="sm"
										className="border-border/60 bg-elevation-level1 text-fg hover:bg-fill1/40 h-8 cursor-pointer gap-1.5 rounded-xl px-3 text-[14px] font-medium shadow-2xs">
										<CompareIcon className="text-fg-secondary size-3.5" />
										<span>{compareOption}</span>
										<ChevronDown className="text-fg-tertiary size-3.5" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="start"
									className="border-border/80 w-56 rounded-2xl border p-1.5 shadow-lg">
									{COMPARE_OPTIONS.map((opt) => {
										const Icon = opt.icon
										const isSelected = compareOption === opt.value
										return (
											<DropdownMenuItem
												key={opt.value}
												onClick={() => setCompareOption(opt.value)}
												className={cn(
													"cursor-pointer justify-between gap-2.5 rounded-lg px-3 py-2 text-[14px]",
													isSelected && "bg-fill1 text-fg font-medium"
												)}>
												<div className="flex items-center gap-2.5">
													<Icon className="text-fg-secondary size-4 shrink-0" />
													<span>{opt.label}</span>
												</div>
												{isSelected && (
													<Check className="text-primary size-4 shrink-0" />
												)}
											</DropdownMenuItem>
										)
									})}
								</DropdownMenuContent>
							</DropdownMenu>

							{/* Currency dropdown */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										color="neutral"
										size="sm"
										className="border-border/60 bg-elevation-level1 text-fg hover:bg-fill1/40 h-8 cursor-pointer gap-1.5 rounded-xl px-3 text-[14px] font-medium shadow-2xs">
										<CurrencyIcon className="text-fg-secondary size-3.5" />
										<span>{currency}</span>
										<ChevronDown className="text-fg-tertiary size-3.5" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="start"
									className="border-border/80 w-48 rounded-2xl border p-1.5 shadow-lg">
									{CURRENCY_OPTIONS.map((opt) => {
										const Icon = opt.icon
										const isSelected = currency === opt.value
										return (
											<DropdownMenuItem
												key={opt.value}
												onClick={() => setCurrency(opt.value)}
												className={cn(
													"cursor-pointer justify-between gap-2.5 rounded-lg px-3 py-2 text-[14px]",
													isSelected && "bg-fill1 text-fg font-medium"
												)}>
												<div className="flex items-center gap-2.5">
													<Icon className="text-fg-secondary size-4 shrink-0" />
													<span>{opt.label}</span>
												</div>
												{isSelected && (
													<Check className="text-primary size-4 shrink-0" />
												)}
											</DropdownMenuItem>
										)
									})}
								</DropdownMenuContent>
							</DropdownMenu>

							{/* Channels dropdown */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										color="neutral"
										size="sm"
										className="border-border/60 bg-elevation-level1 text-fg hover:bg-fill1/40 h-8 cursor-pointer gap-1.5 rounded-xl px-3 text-[14px] font-medium shadow-2xs">
										<ChannelIcon className="text-fg-secondary size-3.5" />
										<span>{channel}</span>
										<ChevronDown className="text-fg-tertiary size-3.5" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="start"
									className="border-border/80 w-52 rounded-2xl border p-1.5 shadow-lg">
									{CHANNEL_OPTIONS.map((opt) => {
										const Icon = opt.icon
										const isSelected = channel === opt.value
										return (
											<DropdownMenuItem
												key={opt.value}
												onClick={() => setChannel(opt.value)}
												className={cn(
													"cursor-pointer justify-between gap-2.5 rounded-lg px-3 py-2 text-[14px]",
													isSelected && "bg-fill1 text-fg font-medium"
												)}>
												<div className="flex items-center gap-2.5">
													<Icon className="text-fg-secondary size-4 shrink-0" />
													<span>{opt.label}</span>
												</div>
												{isSelected && (
													<Check className="text-primary size-4 shrink-0" />
												)}
											</DropdownMenuItem>
										)
									})}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						{/* Manage Metrics */}
						<Button
							variant="outline"
							color="neutral"
							size="sm"
							className="border-border/60 bg-elevation-level1 text-fg hover:bg-fill1/40 h-8 gap-1.5 rounded-xl px-3 text-[14px] font-medium shadow-2xs">
							<SlidersHorizontal className="text-fg-secondary size-3.5" />
							<span>Manage Metrics</span>
						</Button>
					</div>
				</div>

				{/* ══════════════════════════════════════════════
            3. FOUR KPI METRIC CARDS (Text and bars aligned to bottom)
        ══════════════════════════════════════════════ */}
				<div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
					{/* Card 1: Gross Sales */}
					<Card className="border-border/60 dark:bg-elevation-level1 rounded-2xl border bg-white p-5 shadow-xs transition-colors">
						<div className="flex flex-col gap-3">
							<div className="flex items-center">
								<span className="text-[14px] font-normal text-zinc-500 dark:text-zinc-400">
									Gross Sales
								</span>
							</div>
							<div className="flex items-end justify-between">
								<div className="flex items-baseline gap-1.5">
									<span className="text-fg text-[24px] leading-none font-bold tracking-tight">
										$168,920
									</span>
									<span className="inline-flex items-center text-[12px] leading-none font-medium text-emerald-600 dark:text-emerald-400">
										+47%
									</span>
								</div>
								<MiniBarChart bars={[35, 45, 55, 65, 75, 85, 100]} />
							</div>
						</div>
					</Card>

					{/* Card 2: Returning customer rate */}
					<Card className="border-border/60 dark:bg-elevation-level1 rounded-2xl border bg-white p-5 shadow-xs transition-colors">
						<div className="flex flex-col gap-3">
							<div className="flex items-center">
								<span className="text-[14px] font-normal text-zinc-500 dark:text-zinc-400">
									Returning customer rate
								</span>
							</div>
							<div className="flex items-end justify-between">
								<div className="flex items-baseline gap-1.5">
									<span className="text-fg text-[24px] leading-none font-bold tracking-tight">
										27%
									</span>
									<span className="inline-flex items-center text-[12px] leading-none font-medium text-rose-500 dark:text-rose-400">
										-23%
									</span>
								</div>
								<MiniBarChart bars={[95, 85, 75, 65, 60, 45, 35]} />
							</div>
						</div>
					</Card>

					{/* Card 3: Order fulfilled */}
					<Card className="border-border/60 dark:bg-elevation-level1 rounded-2xl border bg-white p-5 shadow-xs transition-colors">
						<div className="flex flex-col gap-3">
							<div className="flex items-center">
								<span className="text-[14px] font-normal text-zinc-500 dark:text-zinc-400">
									Order fulfilled
								</span>
							</div>
							<div className="flex items-end justify-between">
								<div className="flex items-baseline gap-1.5">
									<span className="text-fg text-[24px] leading-none font-bold tracking-tight">
										54
									</span>
									<span className="inline-flex items-center text-[12px] leading-none font-medium text-emerald-600 dark:text-emerald-400">
										+47%
									</span>
								</div>
								<MiniBarChart bars={[40, 55, 45, 70, 65, 85, 95]} />
							</div>
						</div>
					</Card>

					{/* Card 4: Orders */}
					<Card className="border-border/60 dark:bg-elevation-level1 rounded-2xl border bg-white p-5 shadow-xs transition-colors">
						<div className="flex flex-col gap-3">
							<div className="flex items-center">
								<span className="text-[14px] font-normal text-zinc-500 dark:text-zinc-400">
									Orders
								</span>
							</div>
							<div className="flex items-end justify-between">
								<div className="flex items-baseline gap-1.5">
									<span className="text-fg text-[24px] leading-none font-bold tracking-tight">
										62
									</span>
									<span className="inline-flex items-center text-[12px] leading-none font-medium text-rose-500 dark:text-rose-400">
										-23%
									</span>
								</div>
								<MiniBarChart bars={[85, 95, 70, 75, 50, 45, 40]} />
							</div>
						</div>
					</Card>
				</div>

				{/* ══════════════════════════════════════════════
            4. MIDDLE SECTION: TOTAL SALES OVER TIME & BREAKDOWN
        ══════════════════════════════════════════════ */}
				<div className="grid grid-cols-1 items-stretch gap-x-3 gap-y-4 lg:grid-cols-12">
					{/* Left: Total sales over time (2 lines: current + compare) */}
					<Card className="border-border/60 dark:bg-elevation-level1 flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-6 shadow-xs lg:col-span-8">
						<div className="flex flex-col gap-3.5">
							<div>
								<h2 className="text-[14px] font-normal text-zinc-500 dark:text-zinc-400">
									Total sales over time
								</h2>
							</div>

							<div>
								<span className="text-fg text-[24px] font-bold tracking-tight">
									$168,920
								</span>
							</div>

							{/* Main Chart */}
							<div className="h-[250px] w-full">
								<ResponsiveContainer width="100%" height="100%">
									<LineChart
										data={salesOverTimeData}
										margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
										<CartesianGrid
											vertical={false}
											stroke="currentColor"
											className="text-zinc-200/50 dark:text-zinc-800/80"
										/>
										<XAxis
											dataKey="date"
											tickLine={false}
											axisLine={false}
											tickMargin={10}
											ticks={["Jul 1", "Jul 7", "Jul 14", "Jul 21", "Jul 28"]}
											tick={({
												x,
												y,
												textAnchor,
												payload,
											}: {
												x?: number | string
												y?: number | string
												textAnchor?: "inherit" | "start" | "middle" | "end"
												payload?: { value?: string }
											}) => {
												const isJul1 = payload?.value === "Jul 1"
												return (
													<text
														x={
															typeof x === "number" ? x + (isJul1 ? 12 : 0) : x
														}
														y={y}
														dy="0.71em"
														textAnchor={textAnchor}
														className="fill-zinc-400 text-[14px] dark:fill-zinc-500">
														{payload?.value}
													</text>
												)
											}}
											className="fill-zinc-400 text-[14px] dark:fill-zinc-500"
										/>
										<YAxis
											tickLine={false}
											axisLine={false}
											tickMargin={10}
											domain={[0, 10000]}
											ticks={[0, 2000, 4000, 6000, 8000, 10000]}
											tickFormatter={(val) =>
												val === 0 ? "0" : `${val / 1000}k`
											}
											tick={{ fontSize: 14 }}
											className="fill-zinc-400 text-[14px] dark:fill-zinc-500"
										/>
										<Tooltip
											content={({ active, payload, label }) => {
												if (!active || !payload?.length) return null
												return (
													<div className="border-border/60 dark:bg-elevation-level1 flex min-w-[145px] flex-col gap-1.5 rounded-xl border bg-white p-2.5 text-[12px] shadow-md">
														<div className="text-fg text-[12px] font-semibold">
															{label}
														</div>
														<div className="flex flex-col gap-1 text-[12px]">
															<div className="flex items-center justify-between gap-3 text-[12px]">
																<div className="text-fg-secondary flex items-center gap-1.5 text-[12px]">
																	<span
																		className="size-2 rounded-full"
																		style={{
																			backgroundColor:
																				"var(--color-primary, #006FEE)",
																		}}
																	/>
																	<span>Jul 1 – Jul 30, 2026</span>
																</div>
																<span className="text-fg text-[12px] font-bold">
																	${payload[1]?.value?.toLocaleString()}
																</span>
															</div>
															<div className="flex items-center justify-between gap-3 text-[12px]">
																<div className="text-fg-secondary flex items-center gap-1.5 text-[12px]">
																	<span className="size-2 rounded-full bg-zinc-500" />
																	<span>Jun 1 – Jun 30, 2026</span>
																</div>
																<span className="text-fg text-[12px] font-bold">
																	${payload[0]?.value?.toLocaleString()}
																</span>
															</div>
														</div>
													</div>
												)
											}}
										/>
										<Line
											dataKey="compare"
											type="linear"
											stroke="var(--color-fg-tertiary, #64748b)"
											strokeWidth={1.25}
											strokeDasharray="2 2"
											dot={false}
										/>
										<Line
											dataKey="current"
											type="linear"
											stroke="var(--color-primary, #006FEE)"
											strokeWidth={2}
											dot={false}
											activeDot={{
												r: 4,
												fill: "var(--color-primary, #006FEE)",
												stroke: "var(--color-elevation-level1, #ffffff)",
												strokeWidth: 1.5,
											}}
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
						</div>

						{/* Legend */}
						<div className="text-fg-secondary flex items-center justify-center gap-6 pt-3 text-[12px]">
							<div className="flex items-center gap-2">
								<span
									className="size-2 rounded-full"
									style={{ backgroundColor: "var(--color-primary, #006FEE)" }}
								/>
								<span className="text-[12px]">Jul 1 – Jul 30, 2026</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="size-2 rounded-full bg-zinc-500" />
								<span className="text-[12px]">Jun 1 – Jun 30, 2026</span>
							</div>
						</div>
					</Card>

					{/* Right: Total sales breakdown (Zebra Striped Rows matched to card height) */}
					<Card className="border-border/60 dark:bg-elevation-level1 flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-6 shadow-xs lg:col-span-4">
						<div className="pb-1">
							<h2 className="text-[14px] font-normal text-zinc-500 dark:text-zinc-400">
								Total sales breakdown
							</h2>
						</div>

						<div className="flex flex-1 flex-col justify-between pt-1">
							{salesBreakdown.map((item, index) => (
								<div
									key={index}
									className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-[14px] transition-colors ${
										index % 2 === 1
											? "bg-zinc-100/80 dark:bg-zinc-800/40"
											: "bg-transparent"
									}`}>
									<span className="text-fg text-[14px] font-medium">
										{item.name}
									</span>
									<div className="flex items-center gap-3">
										<span className="text-fg w-18 text-right text-[14px] font-semibold tabular-nums">
											{item.amount}
										</span>
										<div className="flex w-7 items-center justify-end">
											{item.trend === "up" && <WaveUp />}
											{item.trend === "down" && <WaveDown />}
											{item.trend === "flat" && <DashFlat />}
										</div>
									</div>
								</div>
							))}
						</div>
					</Card>
				</div>

				{/* ══════════════════════════════════════════════
            5. BOTTOM SECTION: AVERAGE ORDER VALUE & SALES BY CHANNEL
        ══════════════════════════════════════════════ */}
				<div className="grid grid-cols-1 items-stretch gap-x-3 gap-y-4 lg:grid-cols-12">
					{/* Card 1: Average Order Value (Area Chart with Full Grid, Axis Labels, Tooltip) */}
					<Card className="border-border/60 dark:bg-elevation-level1 flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-6 pb-4 shadow-xs lg:col-span-8">
						<div className="flex flex-col gap-2">
							{/* Header */}
							<div className="flex items-start justify-between">
								<div className="flex flex-col">
									<h2 className="heading-6 text-fg">Average Order Value</h2>
									<span className="text-[14px] text-zinc-400 dark:text-zinc-500">
										Jul 1 – Jul 30, 2026
									</span>
								</div>
								<div className="flex flex-col items-end">
									<span className="text-fg text-[24px] leading-none font-bold tracking-tight">
										$142.80
									</span>
									<span className="flex items-center gap-0.5 pt-1 text-[12px] font-medium text-emerald-600 dark:text-emerald-400">
										<ArrowUp className="size-3" />
										4.2% vs last month
									</span>
								</div>
							</div>

							{/* Chart Container */}
							<div className="h-[185px] w-full pt-1">
								<ResponsiveContainer width="100%" height="100%">
									<AreaChart
										data={aovData}
										margin={{ top: 8, right: 10, left: -20, bottom: 0 }}>
										<defs>
											<linearGradient id="aovGlow" x1="0" y1="0" x2="0" y2="1">
												<stop
													offset="0%"
													stopColor="var(--color-primary, #006FEE)"
													stopOpacity={0.25}
												/>
												<stop
													offset="100%"
													stopColor="var(--color-primary, #006FEE)"
													stopOpacity={0.0}
												/>
											</linearGradient>
										</defs>
										<CartesianGrid
											vertical={false}
											stroke="currentColor"
											className="text-zinc-100 dark:text-zinc-800/60"
										/>
										<XAxis
											dataKey="date"
											tickLine={false}
											axisLine={false}
											tickMargin={10}
											ticks={["Jul 1", "Jul 30"]}
											padding={{ left: 10, right: 10 }}
											tick={{ fontSize: 14 }}
											className="fill-zinc-400 text-[14px] dark:fill-zinc-500"
										/>
										<YAxis
											tickLine={false}
											axisLine={false}
											tickMargin={10}
											domain={[100, 175]}
											ticks={[100, 125, 150, 175]}
											tickFormatter={(val) => `$${val}`}
											tick={{ fontSize: 14 }}
											className="fill-zinc-400 text-[14px] dark:fill-zinc-500"
										/>
										<Tooltip
											content={({ active, payload, label }) => {
												if (!active || !payload?.length) return null
												const val = payload[0].value as number
												return (
													<div className="border-border/80 dark:bg-elevation-level2 rounded-xl border bg-white px-3 py-1.5 shadow-md">
														<div className="text-[11px] text-zinc-400 dark:text-zinc-500">
															{label}
														</div>
														<div className="flex items-center gap-2 pt-0.5">
															<div className="flex items-center gap-1">
																<span
																	className="size-2 rounded-full"
																	style={{
																		backgroundColor:
																			"var(--color-primary, #006FEE)",
																	}}
																/>
																<span className="text-fg text-[13px] font-bold">
																	${val.toFixed(2)}
																</span>
															</div>
															<span className="flex items-center text-[12px] font-semibold text-emerald-600 dark:text-emerald-400">
																<ArrowUp className="size-3" /> 4.2%
															</span>
														</div>
													</div>
												)
											}}
										/>
										<Area
											type="monotone"
											dataKey="aov"
											stroke="var(--color-primary, #006FEE)"
											strokeWidth={2}
											fill="url(#aovGlow)"
											dot={false}
										/>
									</AreaChart>
								</ResponsiveContainer>
							</div>
						</div>
					</Card>

					{/* Card 2: Sales by Channel (Donut Chart + Legend) */}
					<Card className="border-border/60 dark:bg-elevation-level1 flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-6 pb-4 shadow-xs lg:col-span-4">
						{/* Header */}
						<div className="flex items-start justify-between">
							<div className="flex flex-col">
								<h2 className="heading-6 text-fg">Sales by Channel</h2>
								<span className="text-[14px] text-zinc-400 dark:text-zinc-500">
									Total sales broken down by channel
								</span>
							</div>
							<span className="text-[12px] font-medium text-emerald-600 dark:text-emerald-400">
								+ 42.7%
							</span>
						</div>

						{/* Donut and Legend Body */}
						<div className="flex flex-1 items-center justify-around gap-4 py-2">
							{/* Donut Ring with Centered Text */}
							<div className="relative flex size-[160px] shrink-0 items-center justify-center">
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={salesChannelData}
											cx="50%"
											cy="50%"
											innerRadius={52}
											outerRadius={72}
											paddingAngle={3}
											cornerRadius={4}
											dataKey="value"
											stroke="none"
											startAngle={90}
											endAngle={-270}>
											{salesChannelData.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill="var(--color-primary, #006FEE)"
													fillOpacity={entry.opacity}
												/>
											))}
										</Pie>
									</PieChart>
								</ResponsiveContainer>
								<div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
									<span className="text-fg text-[20px] leading-none font-bold tracking-tight">
										$168.9k
									</span>
									<span className="pt-1 text-[12px] text-zinc-400 dark:text-zinc-500">
										Total
									</span>
								</div>
							</div>

							{/* Legend */}
							<div className="flex flex-col gap-2.5 pr-2">
								{salesChannelData.map((item) => (
									<div key={item.name} className="flex items-center gap-2.5">
										<span
											className="size-2 shrink-0 rounded-[2px]"
											style={{
												backgroundColor: "var(--color-primary, #006FEE)",
												opacity: item.opacity,
											}}
										/>
										<span className="text-[14px] font-medium text-zinc-600 dark:text-zinc-300">
											{item.name}
										</span>
									</div>
								))}
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	)
}
