"use client"

import * as React from "react"
import { useState } from "react"
import {
	Bar,
	BarChart,
	CartesianGrid,
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"
import { IconSlot } from "@/registry/icon/icon-library"

import { Button, IconButton } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle } from "@/styles/default/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Checkbox } from "@/styles/default/ui/checkbox"
import { Input } from "@/styles/default/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/styles/default/ui/table"
import { type ChartConfig, ChartContainer } from "@/registry/ui/chart"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import { cn } from "@/lib/utils"

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
	{ month: "Sep", organic: 20000, paid: 5000 },
	{ month: "Oct", organic: 18500, paid: 12500 },
	{ month: "Nov", organic: 20000, paid: 18500 },
	{ month: "Dec", organic: 17000, paid: 11000 },
]

const trafficConfig = {
	organic: {
		label: "Organic",
		color: "var(--color-primary, #006FEE)",
	},
	paid: {
		label: "Paid Ads",
		color: "var(--color-info, #00b8d9)",
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
	avatarId: number
}

const employees: Employee[] = [
	{
		id: "#4586936",
		name: "Alex Turner",
		email: "alex@acme.com",
		role: "Product Manager",
		type: "Employee",
		avatarId: 1,
	},
	{
		id: "#4586937",
		name: "Emma Davis",
		email: "emma@acme.com",
		role: "Senior Designer",
		type: "Employee",
		avatarId: 2,
	},
	{
		id: "#4586933",
		name: "John Smith",
		email: "john@acme.com",
		role: "Chief Technology Officer",
		type: "Employee",
		avatarId: 3,
	},
	{
		id: "#4586932",
		name: "Kate Moore",
		email: "kate@acme.com",
		role: "Chief Executive Officer",
		type: "Employee",
		avatarId: 4,
	},
	{
		id: "#4586935",
		name: "Mike Wilson",
		email: "mike@acme.com",
		role: "VP of Engineering",
		type: "Employee",
		avatarId: 5,
	},
	{
		id: "#4586934",
		name: "Sara Johnson",
		email: "sara@acme.com",
		role: "Chief Marketing Officer",
		type: "Employee",
		avatarId: 8,
	},
]

const PERIOD_OPTIONS = [
	{ label: "Daily", value: "Daily", slot: "clock" as const },
	{ label: "Weekly", value: "Weekly", slot: "calendar" as const },
	{ label: "Monthly", value: "Monthly", slot: "calendar" as const },
	{ label: "Quarterly", value: "Quarterly", slot: "calendar-check" as const },
	{ label: "Yearly", value: "Yearly", slot: "calendar-clock" as const },
	{ label: "All time", value: "All time", slot: "clock" as const },
]

const SALES_RANGE_OPTIONS = [
	{ label: "Today", value: "Today", slot: "clock" as const },
	{ label: "Yesterday", value: "Yesterday", slot: "clock" as const },
	{ label: "Last 7 days", value: "Last 7 days", slot: "calendar" as const },
	{ label: "Last 2 weeks", value: "Last 2 weeks", slot: "calendar" as const },
	{ label: "Last 30 days", value: "Last 30 days", slot: "calendar" as const },
	{
		label: "Last 90 days",
		value: "Last 90 days",
		slot: "calendar-check" as const,
	},
	{ label: "This month", value: "This month", slot: "calendar" as const },
	{ label: "Last month", value: "Last month", slot: "calendar-clock" as const },
	{ label: "Custom range", value: "Custom range", slot: "settings-2" as const },
]

export default function Page() {
	const [activeTab, setActiveTab] = useState<"Overview" | "Sales" | "Expenses">(
		"Overview"
	)
	const [period, setPeriod] = useState("Monthly")
	const [salesRange, setSalesRange] = useState("Last 2 weeks")
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

	const activePeriod =
		PERIOD_OPTIONS.find((opt) => opt.value === period) || PERIOD_OPTIONS[2]

	return (
		<div className="dark:bg-bg text-fg bg-bg-subtle font-body min-h-screen w-full px-6 py-6 transition-colors md:px-10 md:py-8">
			<div className="mx-auto flex max-w-7xl flex-col gap-4">
				{/* ══════════════════════════════════════════════
            1. TOP NAVBAR / HEADER
        ══════════════════════════════════════════════ */}
				<header className="flex items-center justify-between">
					<div className="flex items-center gap-2.5">
						<h1 className="heading-5 text-fg">Good morning, Kate</h1>
					</div>

					<div className="flex items-center gap-2">
						<IconButton
							variant="ghost"
							color="neutral"
							size="sm"
							aria-label="Search">
							<IconSlot slot="search" className="size-4" />
						</IconButton>
						<IconButton
							variant="ghost"
							color="neutral"
							size="sm"
							aria-label="Notifications">
							<IconSlot slot="bell" className="size-4" />
						</IconButton>
						<Button
							color="primary"
							variant="strong"
							size="sm"
							className="gap-1.5">
							<IconSlot slot="user" className="size-4" />
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
						}>
						<TabsList>
							<TabsTrigger value="Overview">Overview</TabsTrigger>
							<TabsTrigger value="Sales">Sales</TabsTrigger>
							<TabsTrigger value="Expenses">Expenses</TabsTrigger>
						</TabsList>
					</Tabs>

					{/* Secondary actions */}
					<div className="flex items-center gap-2">
						<IconButton
							variant="outline"
							color="neutral"
							size="sm"
							aria-label="Refresh data">
							<IconSlot slot="repeat" className="size-3.5" />
						</IconButton>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									color="neutral"
									size="sm"
									className="gap-2">
									<IconSlot
										slot={activePeriod.slot}
										className="text-fg-secondary size-3.5"
									/>
									<span>{period}</span>
									<IconSlot slot="down" className="text-fg-tertiary size-3.5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="start"
								sideOffset={4}
								className="w-44 p-1.5 shadow-lg">
								{PERIOD_OPTIONS.map((opt) => {
									const isSelected = period === opt.value
									return (
										<DropdownMenuItem
											key={opt.value}
											onClick={() => setPeriod(opt.value)}
											className={cn(
												"cursor-pointer justify-between gap-2.5 px-3 py-2 text-[14px]",
												isSelected && "bg-fill1 text-fg font-medium"
											)}>
											<div className="flex items-center gap-2.5">
												<IconSlot
													slot={opt.slot}
													className="text-fg-secondary size-4 shrink-0"
												/>
												<span>{opt.label}</span>
											</div>
											{isSelected && (
												<IconSlot
													slot="check"
													className="text-primary size-4 shrink-0"
												/>
											)}
										</DropdownMenuItem>
									)
								})}
							</DropdownMenuContent>
						</DropdownMenu>
						<Button color="primary" variant="strong" size="sm">
							Download
						</Button>
					</div>
				</div>

				{/* ══════════════════════════════════════════════
            3. FOUR SEPARATE KPI METRIC CARDS
        ══════════════════════════════════════════════ */}
				<div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
					{/* Revenue */}
					<Card className="p-6">
						<div className="flex flex-col gap-2">
							<span className="text-fg-secondary text-[14px] font-medium">
								Revenue
							</span>
							<div className="flex items-end justify-between">
								<span className="text-fg text-[20px] leading-none font-bold tracking-tight">
									$228,441
								</span>
								<Badge color="success" variant="soft" size="sm">
									↑ 3.3%
								</Badge>
							</div>
						</div>
					</Card>

					{/* Expenses */}
					<Card className="p-6">
						<div className="flex flex-col gap-2">
							<span className="text-fg-secondary text-[14px] font-medium">
								Expenses
							</span>
							<div className="flex items-end justify-between">
								<span className="text-fg text-[20px] leading-none font-bold tracking-tight">
									$25,108
								</span>
								<Badge color="error" variant="soft" size="sm">
									↓ 3.3%
								</Badge>
							</div>
						</div>
					</Card>

					{/* Sales */}
					<Card className="p-6">
						<div className="flex flex-col gap-2">
							<span className="text-fg-secondary text-[14px] font-medium">
								Sales
							</span>
							<div className="flex items-end justify-between">
								<span className="text-fg text-[20px] leading-none font-bold tracking-tight">
									458
								</span>
								<Badge color="success" variant="soft" size="sm">
									↑ 4.1%
								</Badge>
							</div>
						</div>
					</Card>

					{/* Profit */}
					<Card className="p-6">
						<div className="flex flex-col gap-2">
							<span className="text-fg-secondary text-[14px] font-medium">
								Profit
							</span>
							<div className="flex items-end justify-between">
								<span className="text-fg text-[20px] leading-none font-bold tracking-tight">
									$203,133
								</span>
								<Badge color="success" variant="soft" size="sm">
									↑ 3.3%
								</Badge>
							</div>
						</div>
					</Card>
				</div>

				{/* ══════════════════════════════════════════════
            4. CHARTS SECTION (2 COLUMNS)
        ══════════════════════════════════════════════ */}
				<div className="grid grid-cols-1 items-start gap-x-3 gap-y-4 lg:grid-cols-2">
					{/* Card A: Sales Performance */}
					<Card className="flex flex-col gap-0 overflow-hidden p-6">
						<CardHeader className="flex flex-row items-center justify-between p-0 pb-3">
							<CardTitle className="heading-6 text-fg">
								Sales Performance
							</CardTitle>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										color="neutral"
										size="sm"
										className="gap-1.5">
										<span>{salesRange}</span>
										<IconSlot
											slot="down"
											className="text-fg-tertiary size-3.5"
										/>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="start"
									sideOffset={4}
									className="w-52 p-1.5 shadow-lg">
									{SALES_RANGE_OPTIONS.map((opt) => {
										const isSelected = salesRange === opt.value
										return (
											<DropdownMenuItem
												key={opt.value}
												onClick={() => setSalesRange(opt.value)}
												className={cn(
													"cursor-pointer justify-between gap-2.5 px-3 py-2 text-[14px]",
													isSelected && "bg-fill1 text-fg font-medium"
												)}>
												<div className="flex items-center gap-2.5">
													<IconSlot
														slot={opt.slot}
														className="text-fg-secondary size-4 shrink-0"
													/>
													<span>{opt.label}</span>
												</div>
												{isSelected && (
													<IconSlot
														slot="check"
														className="text-primary size-4 shrink-0"
													/>
												)}
											</DropdownMenuItem>
										)
									})}
								</DropdownMenuContent>
							</DropdownMenu>
						</CardHeader>

						{/* Sub metrics */}
						<div className="flex items-center gap-8 pt-1 pb-4">
							<div>
								<div className="flex items-center gap-1.5">
									<span className="text-fg text-[16px] font-bold">$28,441</span>
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
									<span className="text-fg text-[16px] font-bold">$4,063</span>
									<span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
										↑ 3.3%
									</span>
								</div>
								<div className="text-fg-secondary text-[14px]">Daily Sales</div>
							</div>

							<div>
								<div className="flex items-center gap-1.5">
									<span className="text-fg text-[16px] font-bold">278</span>
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
									margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
									<CartesianGrid vertical={false} />
									<XAxis
										dataKey="day"
										tickLine={false}
										axisLine={false}
										tickMargin={10}
										tick={{ fontSize: 14 }}
										className="fill-fg-tertiary text-[14px]"
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tickMargin={10}
										domain={[0, 80]}
										ticks={[0, 20, 40, 60, 80]}
										tick={{ fontSize: 14 }}
										className="fill-fg-tertiary text-[14px]"
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
															<span className="size-2 rounded-full bg-[var(--color-primary,#006FEE)]" />
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
					<Card className="flex flex-col gap-0 overflow-hidden p-6">
						<CardHeader className="flex flex-row items-center justify-between p-0 pb-3">
							<CardTitle className="heading-6 text-fg">
								Traffic Source
							</CardTitle>
							<div className="flex items-center gap-3">
								<div className="flex items-center gap-2.5 text-xs">
									<div className="flex items-center gap-1.5">
										<span className="size-2 rounded-full bg-[var(--color-primary,#006FEE)]" />
										<span className="text-fg-secondary text-[14px]">
											Organic
										</span>
									</div>
									<div className="flex items-center gap-1.5">
										<span className="size-2 rounded-full bg-[var(--color-info,#00b8d9)]" />
										<span className="text-fg-secondary text-[14px]">
											Paid Ads
										</span>
									</div>
								</div>
								<IconButton
									variant="ghost"
									color="neutral"
									size="xs"
									aria-label="More options">
									<IconSlot slot="ellipsis-vertical" className="size-3.5" />
								</IconButton>
							</div>
						</CardHeader>

						{/* Sub metric */}
						<div className="pt-1 pb-4">
							<div className="text-fg text-[16px] font-bold tracking-tight">
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
									margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
									<CartesianGrid vertical={false} />
									<XAxis
										dataKey="month"
										tickLine={false}
										axisLine={false}
										tickMargin={10}
										tick={{ fontSize: 14 }}
										className="fill-fg-tertiary text-[14px]"
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tickMargin={10}
										domain={[0, 20000]}
										ticks={[0, 5000, 10000, 15000, 20000]}
										tickFormatter={(val) =>
											val === 0 ? "0" : `${val / 1000}k`
										}
										tick={{ fontSize: 14 }}
										className="fill-fg-tertiary text-[14px]"
									/>
									<Tooltip
										cursor={{
											stroke: "var(--color-border, #a1a1aa)",
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
																<span className="size-2 rounded-full bg-[var(--color-primary,#006FEE)]" />
																<span>Organic</span>
															</div>
															<span className="text-fg text-[12px] font-bold">
																{payload[0]?.value}
															</span>
														</div>
														<div className="flex items-center justify-between gap-3 text-[12px]">
															<div className="text-fg-secondary flex items-center gap-1.5 text-[12px]">
																<span className="size-2 rounded-full bg-[var(--color-info,#00b8d9)]" />
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
											fill: "var(--color-primary, #006FEE)",
											stroke: "var(--color-elevation-level1, #ffffff)",
											strokeWidth: 1.5,
										}}
									/>
									<Line
										dataKey="paid"
										type="linear"
										stroke="var(--color-info, #00b8d9)"
										strokeWidth={2}
										dot={false}
										activeDot={{
											r: 4,
											fill: "var(--color-info, #00b8d9)",
											stroke: "var(--color-elevation-level1, #ffffff)",
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
				<div className="mt-2 flex flex-col gap-4">
					<div className="flex flex-col gap-3">
						{/* Section Header */}
						<div className="flex items-center gap-2 px-1">
							<h2 className="heading-6 text-fg">All Employees</h2>
							<Badge color="neutral" variant="soft" size="sm">
								32
							</Badge>
						</div>

						{/* Controls bar */}
						<div className="flex flex-wrap items-center justify-between gap-3 px-1">
							<div className="flex items-center gap-2">
								<Button variant="outline" color="neutral" size="sm">
									<IconSlot slot="settings-2" className="size-4" />
									Filter
								</Button>
								<Button variant="outline" color="neutral" size="sm">
									<IconSlot slot="chevrons-up-down" className="size-4" />
									Sort
								</Button>
								<Button variant="outline" color="neutral" size="sm">
									<IconSlot slot="shapes" className="size-4" />
									Columns
								</Button>
							</div>

							<div className="relative w-full max-w-xs sm:w-60">
								<IconSlot
									slot="search"
									className="text-fg-tertiary absolute top-1/2 left-3 size-3.5 -translate-y-1/2"
								/>
								<Input
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Search..."
									size="sm"
									className="pl-8.5"
								/>
							</div>
						</div>
					</div>

					{/* Table Container */}
					<Card className="gap-0 overflow-hidden p-0">
						<Table>
							<TableHeader className="border-border/60 border-b">
								<TableRow className="border-border/60 dark:bg-fill1/40 bg-bg-subtle border-b hover:bg-transparent">
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
											<IconSlot
												slot="chevrons-up-down"
												className="dark:text-fg-tertiary size-3.5 text-zinc-400"
											/>
										</div>
									</TableHead>
									<TableHead
										onClick={() => handleSort("name")}
										className="dark:text-fg-secondary hover:text-fg cursor-pointer px-4 py-3.5 text-[14px] font-medium text-zinc-500 transition-colors select-none">
										<div className="flex items-center gap-1.5">
											<span>Member</span>
											<IconSlot
												slot="chevrons-up-down"
												className="dark:text-fg-tertiary size-3.5 text-zinc-400"
											/>
										</div>
									</TableHead>
									<TableHead
										onClick={() => handleSort("role")}
										className="dark:text-fg-secondary hover:text-fg cursor-pointer px-4 py-3.5 text-[14px] font-medium text-zinc-500 transition-colors select-none">
										<div className="flex items-center gap-1.5">
											<span>Role</span>
											<IconSlot
												slot="chevrons-up-down"
												className="dark:text-fg-tertiary size-3.5 text-zinc-400"
											/>
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
														<IconButton
															variant="ghost"
															color="neutral"
															size="xs"
															onClick={() => handleCopy(emp.id)}
															className="text-fg-tertiary hover:text-fg size-6"
															title="Copy Worker ID">
															{isCopied ? (
																<IconSlot
																	slot="check"
																	className="size-3.5 text-emerald-600 dark:text-emerald-400"
																/>
															) : (
																<IconSlot
																	slot="file-text"
																	className="size-3.5"
																/>
															)}
														</IconButton>
													</div>
												</TableCell>

												{/* Member with Avatar */}
												<TableCell className="px-4">
													<div className="flex items-center gap-3">
														<Avatar
															size="sm"
															rounded="circle"
															className="border-border shrink-0 border">
															<AvatarImage
																src={`https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/${emp.avatarId}.png`}
																alt={emp.name}
															/>
															<AvatarFallback className="text-xs font-semibold">
																{emp.name
																	.split(" ")
																	.map((n) => n[0])
																	.join("")}
															</AvatarFallback>
														</Avatar>
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
														<IconButton
															variant="soft"
															color="neutral"
															size="xs"
															aria-label="View employee">
															<IconSlot slot="eye" className="size-3.5" />
														</IconButton>
														<IconButton
															variant="soft"
															color="neutral"
															size="xs"
															aria-label="Edit employee">
															<IconSlot slot="pencil" className="size-3.5" />
														</IconButton>
														<IconButton
															variant="soft"
															color="error"
															size="xs"
															aria-label="Delete employee">
															<IconSlot slot="trash" className="size-3.5" />
														</IconButton>
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
