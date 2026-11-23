"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { IconSlot } from "@/registry/icon/icon-library"
import type { IconSlot as IconSlotName } from "@/registry/icon/icon-libraries"

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
} from "@/registry/ui/chart"
import { Scatter, ScatterChart, XAxis, YAxis } from "recharts"
import { Button, IconButton } from "@/registry/ui/button"
import { Badge } from "@/registry/ui/badge"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/registry/ui/breadcrumb"
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/ui/card"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/registry/ui/sidebar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import RadianLogo from "@/registry/blocks-example/signup/components/radian-logo"
import { cn } from "@/lib/utils"

// ──────────────────────────────────────────────
// Datasets
// ──────────────────────────────────────────────

interface ReplacementItem {
	id: string
	time: string
	original: string
	replacement: string
	avatar: number
	match: string
}

const REPLACEMENTS: ReplacementItem[] = [
	{
		id: "rep-1",
		time: "10:00 AM",
		original: "Marguerite Holloway",
		replacement: "Marisol Quintanar",
		avatar: 1,
		match: "94%",
	},
	{
		id: "rep-2",
		time: "1:00 PM",
		original: "Walter Dombrowski",
		replacement: "Emil Haddad",
		avatar: 2,
		match: "91%",
	},
	{
		id: "rep-3",
		time: "4:00 PM",
		original: "Eunice Trammell",
		replacement: "Bronagh Kelleher",
		avatar: 3,
		match: "89%",
	},
]

interface StatMetric {
	label: string
	value: string
	unit: string
	subtext: string
	dotColor?: string
	bars: number[]
}

const STAT_METRICS: StatMetric[] = [
	{
		label: "SCHEDULED TODAY",
		value: "48",
		unit: "visits",
		subtext: "14 caregivers on shift",
		bars: [40, 50, 70, 95, 60, 45, 80],
	},
	{
		label: "COVERED",
		value: "45",
		unit: "of 48",
		subtext: "3 need a caregiver",
		dotColor: "bg-rose-500",
		bars: [45, 60, 80, 100, 70, 50, 85],
	},
	{
		label: "IN PROGRESS",
		value: "3",
		unit: "live now",
		subtext: "6 completed, EVV verified",
		dotColor: "bg-emerald-500",
		bars: [25, 35, 50, 70, 35, 25, 40],
	},
	{
		label: "AT RISK",
		value: "1",
		unit: "running late",
		subtext: "Davi Monteiro, ETA 9:18 AM",
		dotColor: "bg-amber-500",
		bars: [15, 20, 25, 45, 20, 15, 20],
	},
]

type HeatmapPoint = {
	day: string
	dayIndex: number
	hour: string
	hourIndex: number
	users: number
	level: 0 | 1 | 2 | 3 | 4
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const HOURS = [
	"00",
	"02",
	"04",
	"06",
	"08",
	"10",
	"12",
	"14",
	"16",
	"18",
	"20",
	"22",
]

function generateHeatmapData(): HeatmapPoint[] {
	const pattern: (0 | 1 | 2 | 3 | 4)[][] = [
		[0, 0, 0, 0, 1, 2, 2, 4, 3, 2, 1, 0],
		[0, 0, 0, 0, 1, 2, 3, 4, 3, 2, 1, 0],
		[0, 0, 0, 0, 1, 2, 3, 4, 3, 2, 1, 0],
		[0, 0, 0, 0, 1, 2, 4, 4, 3, 2, 1, 0],
		[0, 0, 0, 0, 1, 2, 3, 3, 2, 2, 1, 0],
		[0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 0, 0],
		[0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 0, 0],
	]

	const data: HeatmapPoint[] = []

	for (let d = 0; d < DAYS.length; d++) {
		for (let h = 0; h < HOURS.length; h++) {
			const level = pattern[d][h]
			let baseCount = 0
			if (level === 4) baseCount = 138 + ((d * 7 + h * 3) % 19)
			else if (level === 3) baseCount = 92 + ((d * 5 + h * 4) % 15)
			else if (level === 2) baseCount = 54 + ((d * 4 + h * 2) % 12)
			else if (level === 1) baseCount = 24 + ((d * 3 + h) % 8)
			else baseCount = 4 + ((d + h) % 4)

			data.push({
				day: DAYS[d],
				dayIndex: d,
				hour: HOURS[h],
				hourIndex: h,
				users: baseCount,
				level,
			})
		}
	}

	return data
}

const chartConfig = {
	users: {
		label: "Active Users",
		color: "var(--color-primary)",
	},
} satisfies ChartConfig

const renderHeatmapCell = (props: unknown) => {
	const { cx, cy, payload } = props as {
		cx?: number
		cy?: number
		payload?: HeatmapPoint
	}
	if (cx == null || cy == null) return null

	const width = 32
	const height = 20
	const rx = 4
	const level = payload?.level ?? 0

	const fillClass =
		level === 0
			? "fill-fill2"
			: level === 1
				? "fill-primary/25"
				: level === 2
					? "fill-primary/50"
					: level === 3
						? "fill-primary/75"
						: "fill-primary"

	return (
		<rect
			x={cx - width / 2}
			y={cy - height / 2}
			width={width}
			height={height}
			rx={rx}
			ry={rx}
			className={cn(
				fillClass,
				"hover:stroke-primary cursor-pointer hover:stroke-[1.5px] hover:opacity-90 focus:outline-none"
			)}
		/>
	)
}

interface AlertItem {
	id: string
	title: string
	subtext: string
	iconSlot: IconSlotName
	iconColor: string
	action: string
	hasPhone?: boolean
}

const NEEDS_ATTENTION: AlertItem[] = [
	{
		id: "na-1",
		title: "Running 18 min late",
		subtext: "Davi to Cornelius V. · ETA 9:18",
		iconSlot: "clock",
		iconColor: "text-warning bg-warning/15 dark:bg-warning/25",
		action: "Reassign",
		hasPhone: true,
	},
	{
		id: "na-2",
		title: "EVV location not verified",
		subtext: "Hiwot at Josephine Varga · 8:34 AM",
		iconSlot: "pin",
		iconColor: "text-error bg-error/15 dark:bg-error/25",
		action: "Review",
	},
	{
		id: "na-3",
		title: "Visit note overdue",
		subtext: "Abena · Ignatius Rourke, ended 8:30",
		iconSlot: "file-text",
		iconColor: "text-primary bg-primary/15 dark:bg-primary/25",
		action: "Remind",
	},
]

interface LiveVisitItem {
	id: string
	name: string
	client: string
	ends: string
	progress: number
	avatar: number
}

const LIVE_VISITS: LiveVisitItem[] = [
	{
		id: "lv-1",
		name: "Marisol Quintanar",
		client: "Thelma Radcliffe · arrived 7:27 AM",
		ends: "ENDS 9:00",
		progress: 8,
		avatar: 1,
	},
	{
		id: "lv-2",
		name: "Noemi Castellano",
		client: "Edmund Tolliver · arrived 7:58 AM",
		ends: "ENDS 9:30",
		progress: 5,
		avatar: 2,
	},
	{
		id: "lv-3",
		name: "Hiwot Bekele",
		client: "Josephine Varga · clocked in 8:34 AM",
		ends: "ENDS 10:00",
		progress: 2,
		avatar: 8,
	},
]

const SERVICE_AREAS = [
	{ name: "Wauwatosa", count: 14, color: "bg-indigo-500" },
	{ name: "Bay View", count: 12, color: "bg-blue-500" },
	{ name: "Shorewood", count: 9, color: "bg-sky-400" },
	{ name: "West Allis", count: 13, color: "bg-violet-500" },
]

export default function Preview12Page() {
	const [activeNav, setActiveNav] = useState("Dashboard")
	const [selectedArea, setSelectedArea] = useState("All service areas")
	const [approvedVisits, setApprovedVisits] = useState<Set<string>>(new Set())
	const heatmapData = React.useMemo(() => generateHeatmapData(), [])

	return (
		<div className="text-fg font-body bg-sidebar h-screen w-full overflow-hidden">
			<SidebarProvider
				defaultOpen
				defaultWidth="16rem"
				className="flex h-screen w-full overflow-hidden bg-transparent">
				<div className="flex h-screen w-full overflow-hidden bg-transparent">
					{/* ══════════════════════════════════════════════
              SIDEBAR
          ══════════════════════════════════════════════ */}
					<Sidebar
						collapsible="none"
						className="flex w-64 shrink-0 flex-col justify-between border-0 bg-transparent p-3 select-none">
						{/* Workspace Brand Header Card */}
						<SidebarHeader className="space-y-2 p-0">
							<Card className="border-border/50 bg-elevation-level1 flex flex-row items-center justify-between gap-0 p-2.5 shadow-2xs">
								<div className="flex min-w-0 items-center gap-2.5">
									<RadianLogo
										width={32}
										height={32}
										className="size-8 shrink-0 shadow-xs"
									/>
									<div className="flex flex-col truncate text-left">
										<span className="font-heading text-fg text-sm leading-tight font-bold tracking-tight">
											Visitly
										</span>
										<span className="text-fg-secondary truncate text-[11px] leading-tight">
											Thistledown Home Care
										</span>
									</div>
								</div>

								<IconButton
									variant="ghost"
									color="neutral"
									size="xs"
									className="text-fg-secondary size-6 shrink-0"
									aria-label="Switch organization">
									<IconSlot slot="chevrons-up-down" className="size-3.5" />
								</IconButton>
							</Card>

							{/* Quick Search Card */}
							<button
								type="button"
								className="border-border/50 bg-elevation-level1 hover:bg-fill1/60 text-fg flex h-9 w-full cursor-pointer items-center justify-between rounded-lg border px-3 text-sm shadow-2xs transition-colors select-none">
								<div className="text-fg-tertiary flex items-center gap-2">
									<IconSlot slot="search" className="size-3.5 shrink-0" />
									<span>Search</span>
								</div>
								<kbd className="border-border/60 bg-fill2 text-fg-secondary rounded px-1.5 py-0.5 font-mono text-[10px]">
									⌘K
								</kbd>
							</button>
						</SidebarHeader>

						{/* Sidebar Navigation */}
						<SidebarContent className="space-y-3 overflow-y-auto px-0 py-2">
							{/* Operations Group */}
							<SidebarGroup className="p-0">
								<SidebarGroupLabel className="text-fg-tertiary px-2 text-[10px] font-semibold tracking-wider uppercase opacity-75">
									Operations
								</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu className="gap-0.5">
										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeNav === "Dashboard"}
												onClick={() => setActiveNav("Dashboard")}
												className={cn(
													"h-9 px-2.5 text-sm font-medium transition-all",
													activeNav === "Dashboard"
														? "text-fg bg-elevation-level1 border-border/50 border font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg hover:bg-fill1/60"
												)}>
												<IconSlot slot="dashboard" className="size-4" />
												<span>Dashboard</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeNav === "Schedule"}
												onClick={() => setActiveNav("Schedule")}
												className={cn(
													"h-9 px-2.5 text-sm font-medium transition-all",
													activeNav === "Schedule"
														? "text-fg bg-elevation-level1 font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg hover:bg-fill1/60"
												)}>
												<IconSlot slot="calendar" className="size-4" />
												<span>Schedule</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeNav === "Visits"}
												onClick={() => setActiveNav("Visits")}
												className={cn(
													"h-9 px-2.5 text-sm font-medium transition-all",
													activeNav === "Visits"
														? "text-fg bg-elevation-level1 font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg hover:bg-fill1/60"
												)}>
												<IconSlot slot="file-text" className="size-4" />
												<span>Visits</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeNav === "Alerts"}
												onClick={() => setActiveNav("Alerts")}
												className={cn(
													"h-9 px-2.5 text-sm font-medium transition-all",
													activeNav === "Alerts"
														? "text-fg bg-elevation-level1 font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg hover:bg-fill1/60"
												)}>
												<IconSlot slot="bell" className="size-4" />
												<span>Alerts</span>
												<Badge
													color="error"
													variant="strong"
													size="sm"
													className="bg-error text-error-fg ml-auto flex size-4.5 items-center justify-center rounded-full p-0 text-[10px] font-bold">
													4
												</Badge>
											</SidebarMenuButton>
										</SidebarMenuItem>
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>

							{/* People Group */}
							<SidebarGroup className="p-0">
								<SidebarGroupLabel className="text-fg-tertiary px-2 text-[10px] font-semibold tracking-wider uppercase opacity-75">
									People
								</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu className="gap-0.5">
										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeNav === "Caregivers"}
												onClick={() => setActiveNav("Caregivers")}
												className={cn(
													"h-9 px-2.5 text-sm font-medium transition-all",
													activeNav === "Caregivers"
														? "text-fg bg-elevation-level1 font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg hover:bg-fill1/60"
												)}>
												<IconSlot slot="users" className="size-4" />
												<span>Caregivers</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeNav === "Clients"}
												onClick={() => setActiveNav("Clients")}
												className={cn(
													"h-9 px-2.5 text-sm font-medium transition-all",
													activeNav === "Clients"
														? "text-fg bg-elevation-level1 border-border/50 border font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg hover:bg-fill1/60"
												)}>
												<IconSlot slot="home" className="size-4" />
												<span>Clients</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>

							{/* Compliance Group */}
							<SidebarGroup className="p-0">
								<SidebarGroupLabel className="text-fg-tertiary px-2 text-[10px] font-semibold tracking-wider uppercase opacity-75">
									Compliance
								</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu className="gap-0.5">
										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeNav === "EVV"}
												onClick={() => setActiveNav("EVV")}
												className={cn(
													"h-9 px-2.5 text-sm font-medium transition-all",
													activeNav === "EVV"
														? "text-fg bg-elevation-level1 font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg hover:bg-fill1/60"
												)}>
												<IconSlot slot="badge-check" className="size-4" />
												<span>EVV</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeNav === "Reports"}
												onClick={() => setActiveNav("Reports")}
												className={cn(
													"h-9 px-2.5 text-sm font-medium transition-all",
													activeNav === "Reports"
														? "text-fg bg-elevation-level1 font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg hover:bg-fill1/60"
												)}>
												<IconSlot slot="bar-chart" className="size-4" />
												<span>Reports</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>

							{/* Service Areas Group */}
							<SidebarGroup className="p-0">
								<div className="flex items-center justify-between px-2 pb-0.5">
									<span className="text-fg-tertiary text-[10px] font-semibold tracking-wider uppercase opacity-75">
										Service Areas
									</span>
									<button
										type="button"
										className="text-fg-tertiary hover:text-fg transition-colors"
										aria-label="Add service area">
										<IconSlot slot="plus" className="size-3.5" />
									</button>
								</div>
								<SidebarGroupContent>
									<SidebarMenu className="gap-0.5">
										{SERVICE_AREAS.map((area) => (
											<SidebarMenuItem key={area.name}>
												<SidebarMenuButton
													size="sm"
													isActive={activeNav === area.name}
													onClick={() => setActiveNav(area.name)}
													className={cn(
														"h-9 px-2.5 text-sm font-medium transition-all",
														activeNav === area.name
															? "text-fg bg-elevation-level1 font-semibold shadow-2xs"
															: "text-fg-secondary hover:text-fg hover:bg-fill1/60"
													)}>
													<span
														className={cn(
															"size-2 shrink-0 rounded-xs",
															area.color
														)}
													/>
													<span className="truncate">{area.name}</span>
													<span className="text-fg-tertiary ml-auto text-xs font-normal">
														{area.count}
													</span>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						</SidebarContent>

						{/* Footer Section */}
						<SidebarFooter className="mt-auto space-y-2 p-0 pt-2">
							<SidebarMenu className="gap-0.5">
								<SidebarMenuItem>
									<SidebarMenuButton
										size="sm"
										isActive={activeNav === "Help"}
										onClick={() => setActiveNav("Help")}
										className={cn(
											"h-9 px-2.5 text-sm font-medium transition-all",
											activeNav === "Help"
												? "text-fg bg-elevation-level1 font-semibold shadow-2xs"
												: "text-fg-secondary hover:text-fg hover:bg-fill1/60"
										)}>
										<IconSlot slot="help-circle" className="size-4" />
										<span>Help and support</span>
									</SidebarMenuButton>
								</SidebarMenuItem>

								<SidebarMenuItem>
									<SidebarMenuButton
										size="sm"
										isActive={activeNav === "Settings"}
										onClick={() => setActiveNav("Settings")}
										className={cn(
											"h-9 px-2.5 text-sm font-medium transition-all",
											activeNav === "Settings"
												? "text-fg bg-elevation-level1 font-semibold shadow-2xs"
												: "text-fg-secondary hover:text-fg hover:bg-fill1/60"
										)}>
										<IconSlot slot="setting" className="size-4" />
										<span>Settings</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>

							{/* User Profile Card */}
							<Card className="border-border/50 bg-elevation-level1 flex flex-row items-center justify-between gap-0 p-2.5 shadow-2xs">
								<div className="flex min-w-0 items-center gap-2.5">
									<Avatar
										size="sm"
										rounded="circle"
										className="border-border shrink-0 border">
										<AvatarImage
											src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/8.png"
											alt="Nizam"
										/>
										<AvatarFallback>NZ</AvatarFallback>
									</Avatar>
									<div className="flex flex-col truncate text-left">
										<span className="font-heading text-fg truncate text-sm leading-tight font-semibold">
											Nizam
										</span>
										<span className="text-fg-secondary truncate text-xs leading-tight">
											Care coordinator
										</span>
									</div>
								</div>
								<IconButton
									variant="ghost"
									color="neutral"
									size="xs"
									className="text-fg-secondary size-6 shrink-0"
									aria-label="User switch">
									<IconSlot slot="chevrons-up-down" className="size-3.5" />
								</IconButton>
							</Card>
						</SidebarFooter>
					</Sidebar>

					{/* ══════════════════════════════════════════════
              MAIN DASHBOARD INSET (FLOATING WHITE CARD PANEL)
          ══════════════════════════════════════════════ */}
					<SidebarInset className="h-screen min-w-0 flex-1 overflow-hidden bg-transparent p-2.5 pl-0 md:p-3 md:pl-0">
						<div className="bg-elevation-level1 border-border/50 flex h-full w-full flex-col overflow-hidden rounded-xl border shadow-2xs">
							{/* ── Top Bar (Fixed at top with bottom border) ── */}
							<header className="border-border/60 flex h-14 shrink-0 items-center justify-between border-b px-5 md:px-7">
								<div className="flex h-8 items-center gap-2">
									<SidebarTrigger className="text-fg-secondary hover:text-fg size-8" />
									<Breadcrumb className="flex items-center">
										<BreadcrumbList className="flex items-center gap-1.5 text-xs">
											<BreadcrumbItem className="inline-flex items-center">
												<BreadcrumbLink
													href="#"
													className="text-fg-secondary hover:text-fg transition-colors">
													Operations
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator className="text-fg-tertiary inline-flex items-center [&>svg]:size-3" />
											<BreadcrumbItem className="inline-flex items-center">
												<BreadcrumbPage className="text-fg font-semibold">
													Dashboard
												</BreadcrumbPage>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>
								</div>

								<div className="flex h-8 items-center gap-2 sm:gap-2.5">
									{/* Date Status Pill */}
									<div className="border-border/70 bg-fill1/70 text-fg-secondary flex h-8 items-center gap-1.5 rounded-full border px-3 text-[11px] font-semibold tracking-wider uppercase shadow-2xs">
										<span className="bg-success size-1.5 animate-pulse rounded-full" />
										<span>MON, OCT 5 · 8:46 AM</span>
									</div>

									{/* Action Icons */}
									<IconButton
										variant="outline"
										color="neutral"
										size="sm"
										className="border-border/70 bg-elevation-level1 size-8 shadow-2xs"
										aria-label="Inbox">
										<IconSlot slot="inbox" className="size-3.5" />
									</IconButton>

									<IconButton
										variant="outline"
										color="neutral"
										size="sm"
										className="border-border/70 bg-elevation-level1 relative size-8 shadow-2xs"
										aria-label="Alerts">
										<IconSlot slot="bell" className="size-3.5" />
										<span className="bg-error ring-bg absolute top-1.5 right-1.5 size-1.5 rounded-full ring-2" />
									</IconButton>

									{/* Area Dropdown */}
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="outline"
												color="neutral"
												size="sm"
												className="border-border/70 bg-elevation-level1 h-8 gap-1.5 text-xs font-medium shadow-2xs">
												<span>{selectedArea}</span>
												<IconSlot
													slot="down"
													className="text-fg-secondary size-3.5"
												/>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" className="w-44">
											<DropdownMenuItem
												onClick={() => setSelectedArea("All service areas")}>
												All service areas
											</DropdownMenuItem>
											{SERVICE_AREAS.map((a) => (
												<DropdownMenuItem
													key={a.name}
													onClick={() => setSelectedArea(a.name)}>
													{a.name}
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>

									{/* New Visit Primary CTA */}
									<Button
										variant="strong"
										color="primary"
										size="sm"
										className="h-8 gap-1.5 text-xs font-semibold shadow-xs">
										<IconSlot slot="plus" className="size-3.5" />
										<span>New visit</span>
									</Button>
								</div>
							</header>

							{/* ── Scrollable Dashboard Content ── */}
							<div className="flex flex-1 flex-col gap-6 overflow-y-auto p-5 md:p-7">
								{/* ── Greeting Header ── */}
								<div>
									<h1 className="font-heading text-fg text-2xl font-bold tracking-tight">
										Good morning, Nizam
									</h1>
									<p className="text-fg-secondary mt-0.5 text-sm">
										Monday, Oct 5 · 45 of 48 visits are covered. 3 need a
										caregiver, the first at 10:00 AM.
									</p>
								</div>

								{/* ── Hero Call-out Replacement Banner ── */}
								<Card className="from-primary via-primary to-primary-hover text-primary-fg relative shrink-0 overflow-hidden border-none bg-gradient-to-r p-6 shadow-md">
									{/* Gradient highlight overlays connected to themer */}
									<div className="bg-primary-hover/40 pointer-events-none absolute -top-20 -right-20 size-80 rounded-full blur-3xl" />
									<div className="to-primary-fg/10 pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent" />

									<div className="relative z-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
										{/* Left Callout Details */}
										<div className="flex flex-col gap-3 lg:col-span-6">
											<div>
												<Badge
													variant="outline"
													color="neutral"
													size="sm"
													className="border-primary-fg/20 bg-primary-fg/15 text-primary-fg inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-xs">
													<IconSlot
														slot="smartphone"
														className="text-primary-fg/90 size-3"
													/>
													<span>CALL-OUT · 8:31 AM</span>
												</Badge>
											</div>

											<div>
												<h2 className="font-heading text-primary-fg text-lg leading-snug font-bold tracking-tight">
													Desmond Okonjo called out sick.
													<br />3 visits need cover today.
												</h2>
												<p className="text-primary-fg/80 mt-1 text-sm leading-normal">
													Visitly matched a replacement for each visit. Approve
													them and the day rebuilds itself.
												</p>
											</div>

											<div className="flex flex-wrap items-center gap-2.5 pt-1">
												<Button
													variant="strong"
													color="neutral"
													size="sm"
													className="bg-primary-fg text-primary hover:bg-primary-fg/90 h-8.5 gap-1.5 px-3.5 text-xs font-semibold shadow-xs">
													<span>Review replacements</span>
													<IconSlot
														slot="right"
														className="text-primary size-3.5"
													/>
												</Button>
												<Button
													variant="outline"
													color="neutral"
													size="sm"
													className="border-primary-fg/20 bg-primary-fg/10 text-primary-fg hover:bg-primary-fg/20 h-8.5 px-3.5 text-xs font-medium shadow-none">
													See Desmond&apos;s day
												</Button>
											</div>
										</div>

										{/* Right Suggested Replacements */}
										<div className="flex flex-col gap-2 lg:col-span-6">
											<div className="text-primary-fg/90 mb-0.5 flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase">
												<IconSlot
													slot="sparkles"
													className="text-primary-fg/90 size-3"
												/>
												<span>SUGGESTED REPLACEMENTS</span>
											</div>

											<div className="flex flex-col gap-2">
												{REPLACEMENTS.map((item) => (
													<div
														key={item.id}
														className="border-primary-fg/15 bg-primary-fg/10 hover:bg-primary-fg/15 flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-xs backdrop-blur-xs transition-colors">
														<div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
															<span className="text-primary-fg/90 w-16 shrink-0 font-mono text-[11px] font-semibold">
																{item.time}
															</span>
															<span className="text-primary-fg truncate text-xs font-semibold">
																{item.original}
															</span>
															<IconSlot
																slot="right"
																className="text-primary-fg/50 size-3 shrink-0"
															/>
															<div className="flex min-w-0 items-center gap-2">
																<Avatar
																	size="2xs"
																	rounded="circle"
																	className="border-primary-fg/30 size-5 shrink-0 border">
																	<AvatarImage
																		src={`https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/${item.avatar}.png`}
																		alt={item.replacement}
																	/>
																	<AvatarFallback className="text-fg text-[9px] font-semibold">
																		{item.replacement.slice(0, 2)}
																	</AvatarFallback>
																</Avatar>
																<span className="text-primary-fg truncate text-xs font-medium">
																	{item.replacement}
																</span>
															</div>
														</div>

														<span className="text-primary-fg/90 shrink-0 pl-2 text-xs font-semibold">
															{item.match}
														</span>
													</div>
												))}
											</div>
										</div>
									</div>
								</Card>

								{/* ── 4 Stat Cards Row ── */}
								<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
									{STAT_METRICS.map((stat) => (
										<Card
											key={stat.label}
											className="border-border/60 bg-fill1/60 flex flex-col justify-between border p-1.5 shadow-2xs dark:bg-zinc-900/60">
											{/* Top Elevated White Panel */}
											<div className="border-border/50 bg-elevation-level1 flex flex-col justify-between gap-3 rounded-lg border p-3.5 shadow-2xs">
												<span className="text-fg-secondary text-[10px] font-semibold tracking-wider uppercase select-none">
													{stat.label}
												</span>
												<div className="flex items-end justify-between gap-2">
													<div className="flex items-baseline gap-1.5">
														<span className="font-heading text-fg text-2xl font-bold tracking-tight">
															{stat.value}
														</span>
														<span className="text-fg-secondary text-xs font-medium">
															{stat.unit}
														</span>
													</div>

													{/* Mini Sparkline Chart - Consistent width and spacing across all cards */}
													<div className="flex h-8 items-end gap-[3.5px] pb-0.5">
														{stat.bars.map((bar, i) => (
															<div
																key={i}
																style={{ height: `${bar}%` }}
																className="bg-primary/50 dark:bg-primary/70 hover:bg-primary w-[2.5px] rounded-full transition-all hover:brightness-110"
															/>
														))}
													</div>
												</div>
											</div>

											{/* Bottom Subtext Row on soft card base */}
											<div className="text-fg-secondary flex items-center px-3 py-2 text-[11px] leading-none font-medium">
												{stat.dotColor && (
													<span
														className={cn(
															"mr-1.5 size-1.5 shrink-0 rounded-full",
															stat.dotColor
														)}
													/>
												)}
												<span>{stat.subtext}</span>
											</div>
										</Card>
									))}
								</div>

								{/* ── Lower Section (Coverage & Timeline + Right Alerts/Live) ── */}
								<div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
									{/* Left: Heatmap Chart (lg:col-span-7) */}
									<Card className="border-border/60 bg-elevation-level1 flex h-full flex-col justify-between border shadow-2xs lg:col-span-7">
										<CardHeader className="pb-3">
											<CardTitle className="flex items-baseline gap-2">
												<span className="font-heading text-fg text-2xl font-bold tracking-tight">
													1,890
												</span>
												<span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500">
													+5.2%
												</span>
											</CardTitle>
											<CardDescription>Active users</CardDescription>
											<CardAction>
												<div className="border-border bg-fill1 text-fg flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium">
													<IconSlot
														slot="calendar"
														className="text-fg-secondary size-3.5"
													/>
													<span>Last 7 days</span>
												</div>
											</CardAction>
										</CardHeader>
										<CardContent className="p-0">
											<div className="w-full overflow-x-auto pb-2">
												<div className="min-w-[500px] px-4">
													<ChartContainer
														config={chartConfig}
														className="aspect-auto h-[260px] w-full">
														<ScatterChart
															margin={{
																top: 58,
																right: 10,
																bottom: 0,
																left: 0,
															}}>
															<XAxis
																type="number"
																dataKey="hourIndex"
																domain={[-0.5, 11.5]}
																ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
																tickFormatter={(val) => HOURS[val] ?? ""}
																interval={0}
																tickLine={false}
																axisLine={false}
																tick={{
																	fontSize: 11,
																	fill: "var(--color-fg-secondary)",
																}}
															/>
															<YAxis
																type="number"
																dataKey="dayIndex"
																domain={[-0.5, 6.5]}
																ticks={[0, 1, 2, 3, 4, 5, 6]}
																tickFormatter={(val) => DAYS[val] ?? ""}
																width={36}
																interval={0}
																tickLine={false}
																axisLine={false}
																tick={{
																	fontSize: 11,
																	fill: "var(--color-fg-secondary)",
																}}
																reversed
															/>
															<ChartTooltip
																cursor={false}
																offset={0}
																isAnimationActive={false}
																animationDuration={0}
																allowEscapeViewBox={{ x: true, y: true }}
																content={({ active, payload }) => {
																	if (!active || !payload?.length) return null
																	const item = payload[0]?.payload as
																		| HeatmapPoint
																		| undefined
																	if (!item) return null

																	return (
																		<div className="border-border bg-bg pointer-events-none min-w-32 -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
																			<div className="flex flex-col gap-0.5">
																				<span className="text-fg font-semibold">
																					{item.users.toLocaleString()} active
																					users
																				</span>
																				<span className="text-fg-tertiary text-[11px]">
																					{item.day} at {item.hour}:00
																				</span>
																			</div>
																		</div>
																	)
																}}
															/>
															<Scatter
																data={heatmapData}
																shape={renderHeatmapCell}
																isAnimationActive={false}
															/>
														</ScatterChart>
													</ChartContainer>
												</div>
											</div>
										</CardContent>
										<CardFooter className="text-fg-secondary justify-end gap-1.5 border-t py-3 text-xs">
											<span>Less</span>
											<span className="bg-fill2 size-3 rounded-[3px]" />
											<span className="bg-primary/25 size-3 rounded-[3px]" />
											<span className="bg-primary/50 size-3 rounded-[3px]" />
											<span className="bg-primary/75 size-3 rounded-[3px]" />
											<span className="bg-primary size-3 rounded-[3px]" />
											<span>More</span>
										</CardFooter>
									</Card>

									{/* Right Column: Needs Attention + Live Visits (lg:col-span-5) */}
									<div className="flex h-full flex-col justify-between gap-4 lg:col-span-5">
										{/* Needs Attention Card */}
										<Card className="border-border/60 bg-fill1/60 flex flex-1 flex-col gap-2 border p-2.5 shadow-2xs dark:bg-zinc-900/60">
											{/* Header row on tinted base (tightened gap to white card) */}
											<div className="flex items-center justify-between px-1.5 pt-0.5 pb-0.5">
												<div className="flex items-center gap-1.5">
													<IconSlot
														slot="alert"
														className="text-fg-secondary size-3.5"
													/>
													<span className="text-fg-secondary text-xs font-semibold tracking-wider uppercase">
														Needs Attention
													</span>
													<span className="bg-error text-error-fg flex size-5 items-center justify-center rounded-full text-[10px] font-bold">
														3
													</span>
												</div>
												<Button
													variant="ghost"
													color="neutral"
													size="xs"
													className="text-fg-secondary hover:text-fg h-6 gap-0.5 px-1.5 text-xs font-semibold">
													<span>All alerts</span>
													<IconSlot slot="right" className="size-3" />
												</Button>
											</div>

											{/* Inner Elevated White Card (generous row spacing) */}
											<div className="border-border/50 bg-elevation-level1 divide-border/40 flex flex-1 flex-col justify-between divide-y overflow-hidden rounded-lg border shadow-2xs">
												{NEEDS_ATTENTION.map((item) => (
													<div
														key={item.id}
														className="hover:bg-fill1/40 flex flex-1 items-center justify-between px-4 py-4 transition-colors sm:py-4.5">
														<div className="flex min-w-0 items-center gap-3">
															<div
																className={cn(
																	"flex size-9 shrink-0 items-center justify-center rounded-lg",
																	item.iconColor
																)}>
																<IconSlot
																	slot={item.iconSlot}
																	className="size-4.5"
																/>
															</div>
															<div className="flex flex-col truncate">
																<span className="text-fg truncate text-[13px] leading-tight font-semibold">
																	{item.title}
																</span>
																<span className="text-fg-secondary mt-0.5 truncate text-xs leading-tight">
																	{item.subtext}
																</span>
															</div>
														</div>

														<div className="flex shrink-0 items-center gap-1.5 pl-2">
															{item.hasPhone && (
																<IconButton
																	variant="outline"
																	color="neutral"
																	size="sm"
																	aria-label="Call caregiver">
																	<IconSlot
																		slot="smartphone"
																		className="size-3.5"
																	/>
																</IconButton>
															)}
															<Button
																variant="outline"
																color="neutral"
																size="sm">
																{item.action}
															</Button>
														</div>
													</div>
												))}
											</div>
										</Card>

										{/* Live Visits Card */}
										<Card className="border-border/60 bg-fill1/60 flex flex-1 flex-col gap-2 border p-2.5 shadow-2xs dark:bg-zinc-900/60">
											{/* Header row on tinted base (tightened gap to white card) */}
											<div className="flex items-center justify-between px-1.5 pt-0.5 pb-0.5">
												<div className="flex items-center gap-1.5">
													<IconSlot
														slot="blocks"
														className="text-fg-secondary size-3.5"
													/>
													<span className="text-fg-secondary text-xs font-semibold tracking-wider uppercase">
														Live Visits
													</span>
												</div>
												<div className="border-border/60 bg-elevation-level1 text-fg-secondary flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-2xs">
													<span className="bg-success size-1.5 rounded-full" />
													<span>3 in progress</span>
												</div>
											</div>

											{/* Inner Elevated White Card (generous row spacing) */}
											<div className="border-border/50 bg-elevation-level1 divide-border/40 flex flex-1 flex-col justify-between divide-y overflow-hidden rounded-lg border shadow-2xs">
												{LIVE_VISITS.map((visit) => (
													<div
														key={visit.id}
														className="hover:bg-fill1/40 flex flex-1 items-center justify-between px-4 py-4 transition-colors sm:py-4.5">
														<div className="flex min-w-0 items-center gap-3">
															<Avatar
																size="sm"
																rounded="circle"
																className="border-border size-9 shrink-0 border">
																<AvatarImage
																	src={`https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/${visit.avatar}.png`}
																	alt={visit.name}
																/>
																<AvatarFallback className="text-xs font-semibold">
																	{visit.name.slice(0, 2)}
																</AvatarFallback>
															</Avatar>
															<div className="flex flex-col truncate">
																<span className="text-fg truncate text-[13px] leading-tight font-semibold">
																	{visit.name}
																</span>
																<span className="text-fg-secondary mt-0.5 truncate text-xs leading-tight">
																	{visit.client}
																</span>
															</div>
														</div>

														<div className="flex shrink-0 flex-col items-end gap-1.5 pl-2">
															<span className="text-fg-secondary font-mono text-[11px] font-semibold tracking-wider">
																{visit.ends}
															</span>
															<div className="flex items-center gap-[3px]">
																{Array.from({ length: 10 }).map((_, i) => (
																	<span
																		key={i}
																		className={cn(
																			"h-2 w-2.5 rounded-[1.5px]",
																			i < visit.progress
																				? "bg-primary"
																				: "bg-fill2"
																		)}
																	/>
																))}
															</div>
														</div>
													</div>
												))}
											</div>
										</Card>
									</div>
								</div>
							</div>
						</div>
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	)
}
