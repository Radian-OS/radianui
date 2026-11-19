"use client"

import * as React from "react"
import { useState } from "react"
import { Bar, BarChart, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import {
	PanelLeft,
	Search,
	Bell,
	UserPlus,
	RotateCw,
	Calendar,
	ChevronDown,
	ChevronsUpDown,
	Copy,
	Check,
	MoreVertical,
	SlidersHorizontal,
	ArrowUpDown,
	Columns3,
	Eye,
	Pencil,
	Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle } from "@/styles/default/ui/card"
import { Checkbox } from "@/styles/default/ui/checkbox"
import { Input } from "@/styles/default/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/styles/default/ui/tabs"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/styles/default/ui/table"
import { type ChartConfig, ChartContainer } from "@/registry/ui/chart"

// ──────────────────────────────────────────────
// Datasets matching the reference screenshot exactly
// ──────────────────────────────────────────────

const salesData = [
	{ day: "01", sales: 32 },
	{ day: "02", sales: 74 },
	{ day: "03", sales: 48 },
	{ day: "04", sales: 22 },
	{ day: "05", sales: 68 },
	{ day: "06", sales: 34 },
	{ day: "07", sales: 32 },
	{ day: "08", sales: 31 },
	{ day: "09", sales: 16 },
	{ day: "10", sales: 76 },
	{ day: "11", sales: 56 },
	{ day: "12", sales: 48 },
]

const salesConfig = {
	sales: {
		label: "sales",
		color: "var(--color-primary, #006FEE)",
	},
} satisfies ChartConfig

const trafficData = [
	{ month: "Jan", organic: 2000, paid: 5000 },
	{ month: "Feb", organic: 15000, paid: 10000 },
	{ month: "Mar", organic: 8000, paid: 12000 },
	{ month: "Apr", organic: 14000, paid: 13500 },
	{ month: "May", organic: 15500, paid: 8000 },
	{ month: "Jun", organic: 7000, paid: 9000 },
	{ month: "Jul", organic: 18000, paid: 12000 },
	{ month: "Aug", organic: 19000, paid: 9500 },
	{ month: "Sep", organic: 21000, paid: 5000 },
	{ month: "Oct", organic: 18500, paid: 12500 },
	{ month: "Nov", organic: 22500, paid: 18500 },
	{ month: "Dec", organic: 17000, paid: 11000 },
]

const trafficConfig = {
	organic: {
		label: "Organic",
		color: "var(--color-primary, #006FEE)",
	},
	paid: {
		label: "Paid Ads",
		color: "#00b8d9",
	},
} satisfies ChartConfig

// ──────────────────────────────────────────────
// Employees Dataset
// ──────────────────────────────────────────────

interface Employee {
	id: string
	name: string
	email: string
	role: string
	type: string
	gradient: string
}

const employees: Employee[] = [
	{
		id: "#4586936",
		name: "Alex Turner",
		email: "alex@acme.com",
		role: "Product Manager",
		type: "Employee",
		gradient: "from-[#3b82f6] via-[#6366f1] to-[#8b5cf6]",
	},
	{
		id: "#4586937",
		name: "Emma Davis",
		email: "emma@acme.com",
		role: "Senior Designer",
		type: "Employee",
		gradient: "from-[#ec4899] via-[#f43f5e] to-[#fb7185]",
	},
	{
		id: "#4586933",
		name: "John Smith",
		email: "john@acme.com",
		role: "Chief Technology Officer",
		type: "Employee",
		gradient: "from-[#06b6d4] via-[#0ea5e9] to-[#38bdf8]",
	},
	{
		id: "#4586932",
		name: "Kate Moore",
		email: "kate@acme.com",
		role: "Chief Executive Officer",
		type: "Employee",
		gradient: "from-[#93c5fd] via-[#a5b4fc] to-[#c4b5fd]",
	},
	{
		id: "#4586935",
		name: "Mike Wilson",
		email: "mike@acme.com",
		role: "VP of Engineering",
		type: "Employee",
		gradient: "from-[#10b981] via-[#059669] to-[#34d399]",
	},
	{
		id: "#4586934",
		name: "Sara Johnson",
		email: "sara@acme.com",
		role: "Chief Marketing Officer",
		type: "Employee",
		gradient: "from-[#2dd4bf] via-[#14b8a6] to-[#5eead4]",
	},
]

export default function Page() {
	const [activeTab, setActiveTab] = useState<"Overview" | "Sales" | "Expenses">(
		"Overview"
	)
	const [searchQuery, setSearchQuery] = useState("")
	const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
	const [sortColumn, setSortColumn] = useState<"id" | "name" | "role">("name")
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
	const [copiedId, setCopiedId] = useState<string | null>(null)

	const handleCopy = (id: string) => {
		navigator.clipboard?.writeText(id)
		setCopiedId(id)
		setTimeout(() => setCopiedId(null), 1800)
	}

	const handleToggleAll = () => {
		if (selectedEmployees.length === filteredEmployees.length) {
			setSelectedEmployees([])
		} else {
			setSelectedEmployees(filteredEmployees.map((e) => e.id))
		}
	}

	const handleToggleRow = (id: string) => {
		setSelectedEmployees((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		)
	}

	const handleSort = (column: "id" | "name" | "role") => {
		if (sortColumn === column) {
			setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
		} else {
			setSortColumn(column)
			setSortOrder("asc")
		}
	}

	const filteredEmployees = employees
		.filter(
			(emp) =>
				emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
				emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
				emp.id.includes(searchQuery)
		)
		.sort((a, b) => {
			let comp = 0
			if (sortColumn === "id") {
				comp = a.id.localeCompare(b.id)
			} else if (sortColumn === "name") {
				comp = a.name.localeCompare(b.name)
			} else if (sortColumn === "role") {
				comp = a.role.localeCompare(b.role)
			}
			return sortOrder === "asc" ? comp : -comp
		})

	return (
		<div className="dark:bg-bg text-fg min-h-screen w-full bg-[#f8f9fa] px-6 py-6 font-sans transition-colors md:px-10 md:py-8">
			<div className="mx-auto flex max-w-7xl flex-col gap-4">
				{/* ══════════════════════════════════════════════
            1. TOP NAVBAR / HEADER
        ══════════════════════════════════════════════ */}
				<header className="flex items-center justify-between">
					<div className="flex items-center gap-2.5">
						<button
							type="button"
							className="text-fg hover:text-fg/80 rounded p-1 transition-colors"
							aria-label="Toggle sidebar">
							<PanelLeft className="size-5" />
						</button>
						<h1 className="text-fg text-[20px] font-bold tracking-tight">
							Good morning, Kate
						</h1>
					</div>

					<div className="flex items-center gap-2">
						<button
							type="button"
							className="text-fg-secondary hover:text-fg hover:bg-fill2/60 flex size-8.5 items-center justify-center rounded-full transition-colors"
							aria-label="Search">
							<Search className="size-4" />
						</button>
						<button
							type="button"
							className="text-fg-secondary hover:text-fg hover:bg-fill2/60 flex size-8.5 items-center justify-center rounded-full transition-colors"
							aria-label="Notifications">
							<Bell className="size-4" />
						</button>
						<Button
							color="primary"
							variant="strong"
							size="sm"
							className="h-8.5 gap-1.5 rounded-xl px-4 text-xs font-semibold shadow-xs">
							<UserPlus className="size-4" />
							<span>Invite</span>
						</Button>
					</div>
				</header>

				{/* ══════════════════════════════════════════════
            2. TOOLBAR: TABS & ACTIONS
        ══════════════════════════════════════════════ */}
				<div className="flex flex-wrap items-center justify-between gap-3">
					{/* Segmented tabs */}
					<Tabs
						value={activeTab}
						onValueChange={(val) =>
							setActiveTab(val as "Overview" | "Sales" | "Expenses")
						}
						className="gap-0">
						<TabsList className="dark:bg-fill2/70 h-auto gap-1 rounded-xl border-0 bg-[#e4e4e7]/70 p-1">
							<TabsTrigger
								value="Overview"
								className="data-[state=active]:bg-elevation-level1 data-[state=active]:text-fg data-[state=inactive]:text-fg-secondary hover:text-fg rounded-lg border-0 px-4 py-1.5 text-xs font-medium transition-all data-[state=active]:font-semibold data-[state=active]:shadow-xs">
								Overview
							</TabsTrigger>
							<TabsTrigger
								value="Sales"
								className="data-[state=active]:bg-elevation-level1 data-[state=active]:text-fg data-[state=inactive]:text-fg-secondary hover:text-fg rounded-lg border-0 px-4 py-1.5 text-xs font-medium transition-all data-[state=active]:font-semibold data-[state=active]:shadow-xs">
								Sales
							</TabsTrigger>
							<TabsTrigger
								value="Expenses"
								className="data-[state=active]:bg-elevation-level1 data-[state=active]:text-fg data-[state=inactive]:text-fg-secondary hover:text-fg rounded-lg border-0 px-4 py-1.5 text-xs font-medium transition-all data-[state=active]:font-semibold data-[state=active]:shadow-xs">
								Expenses
							</TabsTrigger>
						</TabsList>
					</Tabs>

					{/* Secondary actions */}
					<div className="flex items-center gap-2">
						<button
							type="button"
							className="border-border/60 bg-elevation-level1 text-fg-secondary hover:text-fg flex size-8.5 items-center justify-center rounded-xl border shadow-2xs transition-colors"
							aria-label="Refresh data">
							<RotateCw className="size-3.5" />
						</button>
						<button
							type="button"
							className="border-border/60 bg-elevation-level1 text-fg hover:bg-fill1/40 flex h-8.5 items-center gap-2 rounded-xl border px-3 text-xs font-medium shadow-2xs transition-colors">
							<Calendar className="text-fg-secondary size-3.5" />
							<span>Monthly</span>
							<ChevronDown className="text-fg-tertiary size-3.5" />
						</button>
						<Button
							color="primary"
							variant="strong"
							size="sm"
							className="h-8.5 rounded-xl px-4 text-xs font-semibold shadow-xs">
							Download
						</Button>
					</div>
				</div>

				{/* ══════════════════════════════════════════════
            3. FOUR SEPARATE KPI METRIC CARDS
        ══════════════════════════════════════════════ */}
				<div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
					{/* Revenue */}
					<Card className="dark:bg-elevation-level1 rounded-xl border border-zinc-200/70 bg-white p-5 shadow-xs dark:border-zinc-800">
						<div className="flex flex-col gap-2">
							<span className="text-fg-secondary text-[14px] font-medium">
								Revenue
							</span>
							<div className="flex items-center justify-between">
								<span className="text-fg text-[24px] leading-none font-bold tracking-tight">
									$228,441
								</span>
								<span className="inline-flex items-center justify-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs leading-none font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
									↑ 3.3%
								</span>
							</div>
						</div>
					</Card>

					{/* Expenses */}
					<Card className="dark:bg-elevation-level1 rounded-xl border border-zinc-200/70 bg-white p-5 shadow-xs dark:border-zinc-800">
						<div className="flex flex-col gap-2">
							<span className="text-fg-secondary text-[14px] font-medium">
								Expenses
							</span>
							<div className="flex items-center justify-between">
								<span className="text-fg text-[24px] leading-none font-bold tracking-tight">
									$25,108
								</span>
								<span className="inline-flex items-center justify-center gap-1 rounded-full bg-rose-100 px-2.5 py-1 text-xs leading-none font-semibold text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
									↓ 3.3%
								</span>
							</div>
						</div>
					</Card>

					{/* Sales */}
					<Card className="dark:bg-elevation-level1 rounded-xl border border-zinc-200/70 bg-white p-5 shadow-xs dark:border-zinc-800">
						<div className="flex flex-col gap-2">
							<span className="text-fg-secondary text-[14px] font-medium">
								Sales
							</span>
							<div className="flex items-center justify-between">
								<span className="text-fg text-[24px] leading-none font-bold tracking-tight">
									458
								</span>
								<span className="inline-flex items-center justify-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs leading-none font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
									↑ 3.3%
								</span>
							</div>
						</div>
					</Card>

					{/* Profit */}
					<Card className="dark:bg-elevation-level1 rounded-xl border border-zinc-200/70 bg-white p-5 shadow-xs dark:border-zinc-800">
						<div className="flex flex-col gap-2">
							<span className="text-fg-secondary text-[14px] font-medium">
								Profit
							</span>
							<div className="flex items-center justify-between">
								<span className="text-fg text-[24px] leading-none font-bold tracking-tight">
									$203,133
								</span>
								<span className="inline-flex items-center justify-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs leading-none font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
									↑ 4.1%
								</span>
							</div>
						</div>
					</Card>
				</div>

				{/* ══════════════════════════════════════════════
            4. CHARTS SECTION (2 COLUMNS)
        ══════════════════════════════════════════════ */}
				<div className="grid grid-cols-1 items-start gap-x-3 gap-y-4 lg:grid-cols-2">
					{/* Card A: Sales Performance */}
					<Card className="border-border/60 bg-elevation-level1 flex flex-col gap-0 overflow-hidden rounded-2xl p-5 shadow-xs">
						<CardHeader className="flex flex-row items-center justify-between p-0 pb-3">
							<CardTitle className="text-fg text-[16px] font-bold">
								Sales Performance
							</CardTitle>
							<button
								type="button"
								className="border-border/60 bg-elevation-level1 text-fg-secondary hover:text-fg flex h-7 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium shadow-2xs transition-colors">
								<span>Last 2 weeks</span>
								<ChevronDown className="text-fg-tertiary size-3.5" />
							</button>
						</CardHeader>

						{/* Sub metrics */}
						<div className="flex items-center gap-8 pt-1 pb-4">
							<div>
								<div className="flex items-center gap-1.5">
									<span className="text-fg text-[18px] font-bold">$28,441</span>
									<span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
										↑ 3.3%
									</span>
								</div>
								<div className="text-fg-secondary text-[14px]">
									Weekly Sales
								</div>
							</div>

							<div>
								<div className="flex items-center gap-1.5">
									<span className="text-fg text-[18px] font-bold">$4,063</span>
									<span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
										↑ 3.3%
									</span>
								</div>
								<div className="text-fg-secondary text-[14px]">Daily Sales</div>
							</div>

							<div>
								<div className="flex items-center gap-1.5">
									<span className="text-fg text-[18px] font-bold">278</span>
									<span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
										↑ 3.3%
									</span>
								</div>
								<div className="text-fg-secondary text-[14px]">Total Sales</div>
							</div>
						</div>

						{/* Bar Chart with matching hover interaction */}
						<div className="pt-2">
							<ChartContainer config={salesConfig} className="h-[210px] w-full">
								<BarChart
									accessibilityLayer
									data={salesData}
									margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
									<XAxis
										dataKey="day"
										tickLine={false}
										axisLine={false}
										tickMargin={10}
										className="fill-fg-tertiary text-[11px]"
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tickMargin={10}
										domain={[0, 80]}
										ticks={[0, 20, 40, 60, 80]}
										className="fill-fg-tertiary text-[11px]"
									/>
									<Tooltip
										cursor={{ fill: "rgba(0, 0, 0, 0.04)" }}
										content={({ active, payload, label }) => {
											if (!active || !payload?.length) return null
											return (
												<div className="border-border/60 dark:bg-elevation-level1 min-w-[105px] rounded-xl border bg-white p-2.5 text-[12px] shadow-md">
													<div className="text-fg mb-1 text-[12px] font-semibold">
														{label}
													</div>
													<div className="flex items-center justify-between gap-3 text-[12px]">
														<div className="text-fg-secondary flex items-center gap-1.5 text-[12px]">
															<span className="size-2 rounded-full bg-[#006FEE]" />
															<span>sales</span>
														</div>
														<span className="text-fg text-[12px] font-bold">
															{payload[0].value}
														</span>
													</div>
												</div>
											)
										}}
									/>
									<Bar
										dataKey="sales"
										fill="var(--color-primary, #006FEE)"
										radius={[12, 12, 12, 12]}
										maxBarSize={16}
									/>
								</BarChart>
							</ChartContainer>
						</div>
					</Card>

					{/* Card B: Traffic Source with matching hover interaction */}
					<Card className="border-border/60 bg-elevation-level1 flex flex-col gap-0 overflow-hidden rounded-2xl p-5 shadow-xs">
						<CardHeader className="flex flex-row items-center justify-between p-0 pb-3">
							<CardTitle className="text-fg text-[16px] font-bold">
								Traffic Source
							</CardTitle>
							<div className="flex items-center gap-3">
								<div className="flex items-center gap-2.5 text-xs">
									<div className="flex items-center gap-1.5">
										<span className="size-2 rounded-full bg-[#006FEE]" />
										<span className="text-fg-secondary text-[12px]">
											Organic
										</span>
									</div>
									<div className="flex items-center gap-1.5">
										<span className="size-2 rounded-full bg-[#00b8d9]" />
										<span className="text-fg-secondary text-[12px]">
											Paid Ads
										</span>
									</div>
								</div>
								<button
									type="button"
									className="text-fg-secondary hover:text-fg bg-fill2/50 flex size-7 items-center justify-center rounded-full transition-colors"
									aria-label="More options">
									<MoreVertical className="size-3.5" />
								</button>
							</div>
						</CardHeader>

						{/* Sub metric */}
						<div className="pt-1 pb-4">
							<div className="text-fg text-[18px] font-bold tracking-tight">
								231,856
							</div>
							<div className="text-fg-secondary text-[14px]">Sessions</div>
						</div>

						{/* Line Chart */}
						<div className="pt-2">
							<ChartContainer
								config={trafficConfig}
								className="h-[210px] w-full">
								<LineChart
									accessibilityLayer
									data={trafficData}
									margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
									<XAxis
										dataKey="month"
										tickLine={false}
										axisLine={false}
										tickMargin={10}
										className="fill-fg-tertiary text-[11px]"
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tickMargin={10}
										ticks={[0, 5000, 10000, 20000]}
										tickFormatter={(val) =>
											val === 0 ? "0" : `${val / 1000}k`
										}
										className="fill-fg-tertiary text-[11px]"
									/>
									<Tooltip
										cursor={{
											stroke: "#a1a1aa",
											strokeWidth: 1,
											strokeDasharray: "3 3",
										}}
										content={({ active, payload, label }) => {
											if (!active || !payload?.length) return null
											return (
												<div className="border-border/60 dark:bg-elevation-level1 min-w-[125px] rounded-xl border bg-white p-2.5 text-[12px] shadow-md">
													<div className="text-fg mb-1.5 text-[12px] font-semibold">
														{label}
													</div>
													<div className="flex flex-col gap-1 text-[12px]">
														<div className="flex items-center justify-between gap-3 text-[12px]">
															<div className="text-fg-secondary flex items-center gap-1.5 text-[12px]">
																<span className="size-2 rounded-full bg-[#006FEE]" />
																<span>Organic</span>
															</div>
															<span className="text-fg text-[12px] font-bold">
																{payload[0]?.value}
															</span>
														</div>
														<div className="flex items-center justify-between gap-3 text-[12px]">
															<div className="text-fg-secondary flex items-center gap-1.5 text-[12px]">
																<span className="size-2 rounded-full bg-[#00b8d9]" />
																<span>Paid Ads</span>
															</div>
															<span className="text-fg text-[12px] font-bold">
																{payload[1]?.value}
															</span>
														</div>
													</div>
												</div>
											)
										}}
									/>
									<Line
										dataKey="organic"
										type="linear"
										stroke="var(--color-primary, #006FEE)"
										strokeWidth={2}
										dot={false}
										activeDot={{
											r: 4,
											fill: "#006FEE",
											stroke: "#ffffff",
											strokeWidth: 1.5,
										}}
									/>
									<Line
										dataKey="paid"
										type="linear"
										stroke="#00b8d9"
										strokeWidth={2}
										dot={false}
										activeDot={{
											r: 4,
											fill: "#00b8d9",
											stroke: "#ffffff",
											strokeWidth: 1.5,
										}}
									/>
								</LineChart>
							</ChartContainer>
						</div>
					</Card>
				</div>

				{/* ══════════════════════════════════════════════
            5. ALL EMPLOYEES DATA TABLE
        ══════════════════════════════════════════════ */}
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-3">
						{/* Section Header */}
						<div className="flex items-center gap-2 px-1">
							<h2 className="text-fg text-[16px] font-bold">All Employees</h2>
							<Badge
								color="neutral"
								variant="soft"
								size="sm"
								style={{ borderRadius: "9999px" }}
								className="text-fg-secondary rounded-full px-2 font-semibold">
								32
							</Badge>
						</div>

						{/* Controls bar */}
						<div className="flex flex-wrap items-center justify-between gap-3 px-1">
							<div className="flex items-center gap-2">
								<button
									type="button"
									className="border-border/60 bg-elevation-level1 text-fg hover:bg-fill1/40 flex h-8 items-center gap-1.5 rounded-xl border px-3 text-xs font-medium shadow-2xs transition-colors">
									<SlidersHorizontal className="text-fg-secondary size-3.5" />
									<span>Filter</span>
								</button>
								<button
									type="button"
									className="border-border/60 bg-elevation-level1 text-fg hover:bg-fill1/40 flex h-8 items-center gap-1.5 rounded-xl border px-3 text-xs font-medium shadow-2xs transition-colors">
									<ArrowUpDown className="text-fg-secondary size-3.5" />
									<span>Sort</span>
								</button>
								<button
									type="button"
									className="border-border/60 bg-elevation-level1 text-fg hover:bg-fill1/40 flex h-8 items-center gap-1.5 rounded-xl border px-3 text-xs font-medium shadow-2xs transition-colors">
									<Columns3 className="text-fg-secondary size-3.5" />
									<span>Columns</span>
								</button>
							</div>

							<div className="relative w-full max-w-xs sm:w-60">
								<Search className="text-fg-tertiary absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
								<Input
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Search..."
									className="border-border/60 bg-elevation-level1 placeholder:text-fg-tertiary h-8 rounded-xl pr-3 pl-8.5 text-xs shadow-2xs"
								/>
							</div>
						</div>
					</div>

					{/* Table Container */}
					<Card className="border-border/60 bg-elevation-level1 gap-0 overflow-hidden rounded-2xl p-0 shadow-xs">
						<Table>
							<TableHeader className="border-border/60 border-b">
								<TableRow className="border-border/60 dark:bg-fill1/40 border-b bg-[#f8f9fa] hover:bg-transparent">
									<TableHead className="w-12 py-3.5 pr-2 pl-6">
										<Checkbox
											checked={
												selectedEmployees.length === filteredEmployees.length &&
												filteredEmployees.length > 0
													? true
													: selectedEmployees.length > 0
														? "indeterminate"
														: false
											}
											onCheckedChange={handleToggleAll}
											size="md"
										/>
									</TableHead>
									<TableHead
										onClick={() => handleSort("id")}
										className="dark:text-fg-secondary hover:text-fg cursor-pointer px-4 py-3.5 text-[14px] font-medium text-zinc-500 transition-colors select-none">
										<div className="flex items-center gap-1.5">
											<span>Worker ID</span>
											<ChevronsUpDown className="dark:text-fg-tertiary size-3.5 text-zinc-400" />
										</div>
									</TableHead>
									<TableHead
										onClick={() => handleSort("name")}
										className="dark:text-fg-secondary hover:text-fg cursor-pointer px-4 py-3.5 text-[14px] font-medium text-zinc-500 transition-colors select-none">
										<div className="flex items-center gap-1.5">
											<span>Member</span>
											<ChevronsUpDown className="dark:text-fg-tertiary size-3.5 text-zinc-400" />
										</div>
									</TableHead>
									<TableHead
										onClick={() => handleSort("role")}
										className="dark:text-fg-secondary hover:text-fg cursor-pointer px-4 py-3.5 text-[14px] font-medium text-zinc-500 transition-colors select-none">
										<div className="flex items-center gap-1.5">
											<span>Role</span>
											<ChevronsUpDown className="dark:text-fg-tertiary size-3.5 text-zinc-400" />
										</div>
									</TableHead>
									<TableHead className="dark:text-fg-secondary px-4 py-3.5 text-[14px] font-medium text-zinc-500">
										Worker Type
									</TableHead>
									<TableHead className="dark:text-fg-secondary py-3.5 pr-6 text-right text-[14px] font-medium text-zinc-500">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredEmployees.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={6}
											className="text-fg-secondary py-8 text-center text-sm">
											No employees found matching &quot;{searchQuery}&quot;
										</TableCell>
									</TableRow>
								) : (
									filteredEmployees.map((emp) => {
										const isSelected = selectedEmployees.includes(emp.id)
										const isCopied = copiedId === emp.id
										return (
											<TableRow
												key={emp.id}
												data-state={isSelected ? "selected" : undefined}
												className={`border-border/40 border-b transition-colors last:border-b-0 ${
													isSelected ? "bg-fill1/50" : "hover:bg-fill1/30"
												}`}>
												{/* Checkbox */}
												<TableCell className="w-12 pr-2 pl-6">
													<Checkbox
														checked={isSelected}
														onCheckedChange={() => handleToggleRow(emp.id)}
														size="md"
													/>
												</TableCell>

												{/* Worker ID with Copy action */}
												<TableCell className="px-4 font-mono text-[14px] text-zinc-800 dark:text-zinc-200">
													<div className="flex items-center gap-2">
														<span>{emp.id}</span>
														<button
															type="button"
															onClick={() => handleCopy(emp.id)}
															className="hover:text-fg rounded p-0.5 text-zinc-400 transition-colors"
															title="Copy Worker ID">
															{isCopied ? (
																<Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
															) : (
																<Copy className="size-3.5" />
															)}
														</button>
													</div>
												</TableCell>

												{/* Member with Gradient Avatar */}
												<TableCell className="px-4">
													<div className="flex items-center gap-3">
														<div
															className={`size-8.5 rounded-full bg-gradient-to-tr ${emp.gradient} shrink-0 shadow-2xs`}
														/>
														<div className="flex flex-col">
															<span className="text-[14px] leading-tight font-semibold text-zinc-800 dark:text-zinc-200">
																{emp.name}
															</span>
															<span className="text-[12px] leading-tight text-zinc-400">
																{emp.email}
															</span>
														</div>
													</div>
												</TableCell>

												{/* Role */}
												<TableCell className="px-4 text-[14px] font-normal text-zinc-700 dark:text-zinc-300">
													{emp.role}
												</TableCell>

												{/* Worker Type */}
												<TableCell className="px-4 text-[14px] font-normal text-zinc-700 dark:text-zinc-300">
													{emp.type}
												</TableCell>

												{/* Actions: Eye, Pencil, Trash */}
												<TableCell className="pr-6 text-right">
													<div className="flex items-center justify-end gap-2">
														<button
															type="button"
															className="flex size-7.5 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
															aria-label="View employee">
															<Eye className="size-3.5" />
														</button>
														<button
															type="button"
															className="flex size-7.5 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
															aria-label="Edit employee">
															<Pencil className="size-3.5" />
														</button>
														<button
															type="button"
															className="flex size-7.5 items-center justify-center rounded-full bg-rose-50 text-rose-500 transition-colors hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40"
															aria-label="Delete employee">
															<Trash2 className="size-3.5" />
														</button>
													</div>
												</TableCell>
											</TableRow>
										)
									})
								)}
							</TableBody>
						</Table>
					</Card>
				</div>
			</div>
		</div>
	)
}
