"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
	Calendar,
	FileText,
	Bell,
	Users,
	UserCheck,
	ShieldCheck,
	BarChart3,
	HelpCircle,
	Settings,
	ChevronsUpDown,
	Search,
	Plus,
	Check,
	ChevronRight,
	Clock,
	MapPin,
	Sparkles,
	Phone,
	PanelLeft,
	Inbox,
	ChevronDown,
	Layers,
} from "lucide-react"

import { Button, IconButton } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/registry/ui/card"
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
} from "@/registry/ui/sidebar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
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

interface TimelineSlot {
	time: string
	label: string
	completed: number
	atRisk: number
	needsCover: number
	covered: number
	total: number
	assignedName?: string
}

const TIMELINE_DATA: TimelineSlot[] = [
	{
		time: "7A",
		label: "7:00 AM",
		completed: 4,
		atRisk: 0,
		needsCover: 0,
		covered: 0,
		total: 4,
	},
	{
		time: "8A",
		label: "8:00 AM",
		completed: 5,
		atRisk: 0,
		needsCover: 0,
		covered: 0,
		total: 5,
	},
	{
		time: "9A",
		label: "9:00 AM",
		completed: 3,
		atRisk: 1,
		needsCover: 0,
		covered: 3,
		total: 7,
	},
	{
		time: "10A",
		label: "10:00 AM",
		completed: 0,
		atRisk: 1,
		needsCover: 1,
		covered: 7,
		total: 9,
		assignedName: "Marguerite Holloway",
	},
	{
		time: "11A",
		label: "11:00 AM",
		completed: 0,
		atRisk: 0,
		needsCover: 1,
		covered: 5,
		total: 6,
	},
	{
		time: "12P",
		label: "12:00 PM",
		completed: 0,
		atRisk: 0,
		needsCover: 0,
		covered: 5,
		total: 5,
	},
	{
		time: "1P",
		label: "1:00 PM",
		completed: 0,
		atRisk: 0,
		needsCover: 1,
		covered: 4,
		total: 5,
	},
	{
		time: "2P",
		label: "2:00 PM",
		completed: 0,
		atRisk: 0,
		needsCover: 1,
		covered: 5,
		total: 6,
	},
	{
		time: "3P",
		label: "3:00 PM",
		completed: 0,
		atRisk: 0,
		needsCover: 0,
		covered: 6,
		total: 6,
	},
	{
		time: "4P",
		label: "4:00 PM",
		completed: 0,
		atRisk: 0,
		needsCover: 1,
		covered: 5,
		total: 6,
	},
	{
		time: "5P",
		label: "5:00 PM",
		completed: 0,
		atRisk: 0,
		needsCover: 0,
		covered: 9,
		total: 9,
	},
	{
		time: "6P",
		label: "6:00 PM",
		completed: 0,
		atRisk: 0,
		needsCover: 0,
		covered: 4,
		total: 4,
	},
]

interface AlertItem {
	id: string
	title: string
	subtext: string
	icon: React.ElementType
	iconColor: string
	action: string
	hasPhone?: boolean
}

const NEEDS_ATTENTION: AlertItem[] = [
	{
		id: "na-1",
		title: "Running 18 min late",
		subtext: "Davi to Cornelius V. · ETA 9:18",
		icon: Clock,
		iconColor: "text-amber-500 bg-amber-500/10",
		action: "Reassign",
		hasPhone: true,
	},
	{
		id: "na-2",
		title: "EVV location not verified",
		subtext: "Hiwot at Josephine Varga · 8:34 AM",
		icon: MapPin,
		iconColor: "text-rose-500 bg-rose-500/10",
		action: "Review",
	},
	{
		id: "na-3",
		title: "Visit note overdue",
		subtext: "Abena · Ignatius Rourke, ended 8:30",
		icon: FileText,
		iconColor: "text-blue-500 bg-blue-500/10",
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
		progress: 4,
		avatar: 1,
	},
	{
		id: "lv-2",
		name: "Noemi Castellano",
		client: "Edmund Tolliver · arrived 7:58 AM",
		ends: "ENDS 9:30",
		progress: 3,
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
	const [activeTooltip, setActiveTooltip] = useState<string>("10A")

	const toggleApprove = (id: string) => {
		setApprovedVisits((prev) => {
			const next = new Set(prev)
			if (next.has(id)) next.delete(id)
			else next.add(id)
			return next
		})
	}

	return (
		<div className="dark:bg-bg text-fg bg-bg font-body h-screen w-full overflow-hidden">
			<SidebarProvider
				defaultOpen
				defaultWidth="16rem"
				className="flex h-screen w-full overflow-hidden">
				<div className="flex h-screen w-full overflow-hidden">
					{/* ══════════════════════════════════════════════
              SIDEBAR
          ══════════════════════════════════════════════ */}
					<Sidebar
						collapsible="none"
						className="border-border/60 flex w-64 shrink-0 flex-col justify-between border-r bg-[#f0f4f9] p-3 select-none dark:bg-zinc-900/80"
						style={
							{
								"--color-sidebar": "var(--color-bg-subtle, #f0f4f9)",
							} as React.CSSProperties
						}>
						{/* Workspace Brand Header Card */}
						<SidebarHeader className="space-y-2 p-0">
							<Card className="border-border/50 dark:bg-elevation-level1 flex flex-row items-center justify-between gap-0 rounded-xl bg-white p-2.5 shadow-2xs">
								<div className="flex min-w-0 items-center gap-2.5">
									<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#162032] text-white shadow-xs">
										<Check className="size-4 stroke-[3]" />
									</div>
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
									<ChevronsUpDown className="size-3.5" />
								</IconButton>
							</Card>

							{/* Quick Search Card */}
							<button
								type="button"
								className="border-border/50 dark:bg-elevation-level1 dark:hover:bg-elevation-level1/90 text-fg flex h-9 w-full cursor-pointer items-center justify-between rounded-xl border bg-white px-3 text-xs shadow-2xs transition-colors select-none hover:bg-white/90">
								<div className="text-fg-tertiary flex items-center gap-2">
									<Search className="size-3.5 shrink-0" />
									<span>Search</span>
								</div>
								<kbd className="border-border/60 bg-fill2/70 text-fg-secondary rounded px-1.5 py-0.5 font-mono text-[10px]">
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
													"h-9 rounded-xl px-2.5 text-xs font-medium transition-all",
													activeNav === "Dashboard"
														? "text-fg dark:bg-elevation-level1 bg-white font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg dark:hover:bg-elevation-level1/60 hover:bg-white/60"
												)}>
												<Layers className="size-4" />
												<span>Dashboard</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeNav === "Schedule"}
												onClick={() => setActiveNav("Schedule")}
												className={cn(
													"h-9 rounded-xl px-2.5 text-xs font-medium transition-all",
													activeNav === "Schedule"
														? "text-fg dark:bg-elevation-level1 bg-white font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg dark:hover:bg-elevation-level1/60 hover:bg-white/60"
												)}>
												<Calendar className="size-4" />
												<span>Schedule</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeNav === "Visits"}
												onClick={() => setActiveNav("Visits")}
												className={cn(
													"h-9 rounded-xl px-2.5 text-xs font-medium transition-all",
													activeNav === "Visits"
														? "text-fg dark:bg-elevation-level1 bg-white font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg dark:hover:bg-elevation-level1/60 hover:bg-white/60"
												)}>
												<FileText className="size-4" />
												<span>Visits</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeNav === "Alerts"}
												onClick={() => setActiveNav("Alerts")}
												className={cn(
													"h-9 rounded-xl px-2.5 text-xs font-medium transition-all",
													activeNav === "Alerts"
														? "text-fg dark:bg-elevation-level1 bg-white font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg dark:hover:bg-elevation-level1/60 hover:bg-white/60"
												)}>
												<Bell className="size-4" />
												<span>Alerts</span>
												<Badge
													color="error"
													variant="strong"
													size="sm"
													className="ml-auto flex size-4.5 items-center justify-center rounded-full bg-[#f43f5e] p-0 text-[10px] font-bold text-white">
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
													"h-9 rounded-xl px-2.5 text-xs font-medium transition-all",
													activeNav === "Caregivers"
														? "text-fg dark:bg-elevation-level1 bg-white font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg dark:hover:bg-elevation-level1/60 hover:bg-white/60"
												)}>
												<Users className="size-4" />
												<span>Caregivers</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeNav === "Clients"}
												onClick={() => setActiveNav("Clients")}
												className={cn(
													"h-9 rounded-xl px-2.5 text-xs font-medium transition-all",
													activeNav === "Clients"
														? "text-fg dark:bg-elevation-level1 bg-white font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg dark:hover:bg-elevation-level1/60 hover:bg-white/60"
												)}>
												<UserCheck className="size-4" />
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
													"h-9 rounded-xl px-2.5 text-xs font-medium transition-all",
													activeNav === "EVV"
														? "text-fg dark:bg-elevation-level1 bg-white font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg dark:hover:bg-elevation-level1/60 hover:bg-white/60"
												)}>
												<ShieldCheck className="size-4" />
												<span>EVV</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeNav === "Reports"}
												onClick={() => setActiveNav("Reports")}
												className={cn(
													"h-9 rounded-xl px-2.5 text-xs font-medium transition-all",
													activeNav === "Reports"
														? "text-fg dark:bg-elevation-level1 bg-white font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg dark:hover:bg-elevation-level1/60 hover:bg-white/60"
												)}>
												<BarChart3 className="size-4" />
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
										<Plus className="size-3.5" />
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
														"h-9 rounded-xl px-2.5 text-xs font-medium transition-all",
														activeNav === area.name
															? "text-fg dark:bg-elevation-level1 bg-white font-semibold shadow-2xs"
															: "text-fg-secondary hover:text-fg dark:hover:bg-elevation-level1/60 hover:bg-white/60"
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
											"h-9 rounded-xl px-2.5 text-xs font-medium transition-all",
											activeNav === "Help"
												? "text-fg dark:bg-elevation-level1 bg-white font-semibold shadow-2xs"
												: "text-fg-secondary hover:text-fg dark:hover:bg-elevation-level1/60 hover:bg-white/60"
										)}>
										<HelpCircle className="size-4" />
										<span>Help and support</span>
									</SidebarMenuButton>
								</SidebarMenuItem>

								<SidebarMenuItem>
									<SidebarMenuButton
										size="sm"
										isActive={activeNav === "Settings"}
										onClick={() => setActiveNav("Settings")}
										className={cn(
											"h-9 rounded-xl px-2.5 text-xs font-medium transition-all",
											activeNav === "Settings"
												? "text-fg dark:bg-elevation-level1 bg-white font-semibold shadow-2xs"
												: "text-fg-secondary hover:text-fg dark:hover:bg-elevation-level1/60 hover:bg-white/60"
										)}>
										<Settings className="size-4" />
										<span>Settings</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>

							{/* User Profile Card */}
							<Card className="border-border/50 dark:bg-elevation-level1 flex flex-row items-center justify-between gap-0 rounded-xl bg-white p-2.5 shadow-2xs">
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
										<span className="font-heading text-fg truncate text-xs leading-tight font-semibold">
											Nizam
										</span>
										<span className="text-fg-secondary truncate text-[11px] leading-tight">
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
									<ChevronsUpDown className="size-3.5" />
								</IconButton>
							</Card>
						</SidebarFooter>
					</Sidebar>

					{/* ══════════════════════════════════════════════
              MAIN DASHBOARD INSET
          ══════════════════════════════════════════════ */}
					<SidebarInset className="dark:bg-bg bg-bg-subtle/50 h-screen min-w-0 flex-1 overflow-y-auto px-6 py-5 transition-colors md:px-8 md:py-6">
						<div className="flex w-full flex-col gap-5">
							{/* ── Top Bar ── */}
							<header className="flex flex-wrap items-center justify-between gap-3">
								<div className="flex items-center gap-2">
									<div className="text-fg-secondary hover:text-fg flex size-7 items-center justify-center rounded-md text-xs">
										<PanelLeft className="size-4" />
									</div>
									<div className="text-fg-secondary flex items-center gap-1.5 text-xs font-medium">
										<span>Operations</span>
										<ChevronRight className="size-3" />
										<span className="text-fg font-semibold">Dashboard</span>
									</div>
								</div>

								<div className="flex items-center gap-2 sm:gap-2.5">
									{/* Date Status Pill */}
									<div className="border-border/70 bg-elevation-level1 text-fg-secondary flex h-8 items-center gap-1.5 rounded-full border px-3 text-[11px] font-semibold tracking-wider uppercase shadow-2xs">
										<span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
										<span>MON, OCT 5 · 8:46 AM</span>
									</div>

									{/* Action Icons */}
									<IconButton
										variant="outline"
										color="neutral"
										size="sm"
										className="border-border/70 bg-elevation-level1 size-8 shadow-2xs"
										aria-label="Inbox">
										<Inbox className="size-3.5" />
									</IconButton>

									<IconButton
										variant="outline"
										color="neutral"
										size="sm"
										className="border-border/70 bg-elevation-level1 relative size-8 shadow-2xs"
										aria-label="Alerts">
										<Bell className="size-3.5" />
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
												<ChevronDown className="text-fg-secondary size-3.5" />
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
										<Plus className="size-3.5" />
										<span>New visit</span>
									</Button>
								</div>
							</header>

							{/* ── Greeting Header ── */}
							<div>
								<h1 className="heading-4 text-fg">Good morning, Nizam</h1>
								<p className="text-fg-secondary mt-0.5 text-xs sm:text-sm">
									Monday, Oct 5 · 45 of 48 visits are covered. 3 need a
									caregiver, the first at 10:00 AM.
								</p>
							</div>

							{/* ── Hero Call-out Replacement Banner (Unified, no center divider line) ── */}
							<Card className="relative overflow-hidden border-none bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 p-5 text-white shadow-md">
								<div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
									{/* Left Callout Details */}
									<div className="flex flex-col gap-3 lg:col-span-6">
										<div>
											<Badge
												variant="soft"
												color="neutral"
												size="sm"
												className="border-white/20 bg-white/15 text-[10px] font-semibold tracking-wider text-white uppercase">
												CALL-OUT · 8:31 AM
											</Badge>
										</div>

										<div>
											<h2 className="heading-5 leading-snug text-white">
												Desmond Okonjo called out sick. 3 visits need cover
												today.
											</h2>
											<p className="mt-1 text-xs leading-relaxed text-blue-100/85 sm:text-sm">
												Visitly matched a replacement for each visit. Approve
												them and the day rebuilds itself.
											</p>
										</div>

										<div className="flex flex-wrap items-center gap-2 pt-1">
											<Button
												variant="strong"
												color="neutral"
												size="sm"
												className="gap-1.5 bg-white font-semibold text-zinc-900 shadow-xs hover:bg-zinc-100">
												<span>Review replacements</span>
												<ChevronRight className="size-3.5" />
											</Button>
											<Button
												variant="ghost"
												color="neutral"
												size="sm"
												className="font-medium text-blue-100 hover:bg-white/10 hover:text-white">
												See Desmond&apos;s day
											</Button>
										</div>
									</div>

									{/* Right Suggested Replacements */}
									<div className="flex flex-col gap-2 rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-xs lg:col-span-6">
										<div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-blue-200 uppercase">
											<Sparkles className="size-3 text-amber-300" />
											<span>Suggested Replacements</span>
										</div>

										<div className="flex flex-col gap-2">
											{REPLACEMENTS.map((item) => {
												const isApproved = approvedVisits.has(item.id)
												return (
													<motion.div
														key={item.id}
														whileHover={{ scale: 1.01 }}
														className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs transition-colors hover:bg-black/30">
														<div className="flex min-w-0 items-center gap-2.5">
															<span className="shrink-0 font-mono text-[11px] text-blue-200">
																{item.time}
															</span>
															<span className="max-w-[110px] truncate text-white/80 sm:max-w-none">
																{item.original}
															</span>
															<ChevronRight className="size-3 shrink-0 text-white/40" />
															<div className="flex min-w-0 items-center gap-1.5">
																<Avatar
																	size="2xs"
																	rounded="circle"
																	className="border border-white/30">
																	<AvatarImage
																		src={`https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/${item.avatar}.png`}
																		alt={item.replacement}
																	/>
																	<AvatarFallback>
																		{item.replacement.slice(0, 2)}
																	</AvatarFallback>
																</Avatar>
																<span className="truncate font-medium text-white">
																	{item.replacement}
																</span>
															</div>
														</div>

														<div className="flex shrink-0 items-center gap-2">
															<Badge
																variant="soft"
																color="info"
																size="sm"
																className="border-none bg-blue-400/20 text-[11px] font-bold text-blue-200">
																{item.match}
															</Badge>
															<Button
																variant={isApproved ? "strong" : "outline"}
																color={isApproved ? "success" : "neutral"}
																size="xs"
																onClick={() => toggleApprove(item.id)}
																className={cn(
																	"h-6 rounded-md px-2 text-[10px] font-semibold",
																	!isApproved &&
																		"border-white/30 text-white hover:bg-white/20"
																)}>
																{isApproved ? "Approved" : "Approve"}
															</Button>
														</div>
													</motion.div>
												)
											})}
										</div>
									</div>
								</div>
							</Card>

							{/* ── 4 Stat Cards Row ── */}
							<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
								{STAT_METRICS.map((stat) => (
									<Card
										key={stat.label}
										className="border-border/60 bg-elevation-level1 flex flex-col justify-between p-4 shadow-2xs">
										<div className="flex items-start justify-between">
											<div>
												<span className="text-fg-secondary text-[11px] font-semibold tracking-wider uppercase">
													{stat.label}
												</span>
												<div className="mt-1 flex items-baseline gap-1.5">
													<span className="heading-3 text-fg">
														{stat.value}
													</span>
													<span className="text-fg-secondary text-xs">
														{stat.unit}
													</span>
												</div>
											</div>

											{/* Mini Sparkline Chart */}
											<div className="flex h-7 items-end gap-[3px] pt-1">
												{stat.bars.map((bar, i) => (
													<div
														key={i}
														style={{ height: `${bar}%` }}
														className="bg-primary/70 hover:bg-primary w-[4px] rounded-xs transition-all"
													/>
												))}
											</div>
										</div>

										<div className="text-fg-secondary mt-3 flex items-center text-[11px]">
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
							<div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
								{/* Left: Coverage by Half Hour Timeline Grid (lg:col-span-8) */}
								<Card className="border-border/60 bg-elevation-level1 flex flex-col justify-between p-5 shadow-2xs lg:col-span-8">
									<div className="flex flex-col gap-4">
										{/* Card Header & Legend */}
										<div className="flex flex-wrap items-center justify-between gap-3">
											<div>
												<span className="text-fg-secondary text-[11px] font-semibold tracking-wider uppercase">
													Coverage by Half Hour
												</span>
												<div className="mt-1 flex items-baseline gap-1.5">
													<span className="heading-3 text-fg">45</span>
													<span className="text-fg-secondary text-xs">
														of 48 visits covered
													</span>
												</div>
											</div>

											{/* Legend & Hint */}
											<div className="flex flex-col items-end gap-1.5">
												<div className="text-fg-secondary flex flex-wrap items-center gap-3 text-xs">
													<div className="flex items-center gap-1.5">
														<span className="size-2.5 rounded-xs bg-blue-500" />
														<span>COVERED</span>
													</div>
													<div className="flex items-center gap-1.5">
														<span className="size-2.5 rounded-xs bg-indigo-400" />
														<span>COMPLETED</span>
													</div>
													<div className="flex items-center gap-1.5">
														<span className="size-2.5 rounded-xs bg-rose-500" />
														<span>NEEDS COVER</span>
													</div>
													<div className="flex items-center gap-1.5">
														<span className="size-2.5 rounded-xs bg-amber-400" />
														<span>AT RISK</span>
													</div>
												</div>
												<span className="text-fg-tertiary text-[11px]">
													Each square is one visit
												</span>
											</div>
										</div>

										{/* Interactive Block Matrix Chart */}
										<div className="relative overflow-x-auto pt-6 pb-2">
											{/* Current Time Indicator Line */}
											<div
												className="pointer-events-none absolute top-0 bottom-8 z-10 flex flex-col items-center"
												style={{ left: "28%" }}>
												<Badge
													variant="strong"
													color="neutral"
													size="sm"
													className="rounded-xs bg-zinc-900 px-1.5 py-0 text-[10px] font-bold text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-900">
													NOW 8:46
												</Badge>
												<div className="w-[1.5px] flex-1 border-dashed bg-zinc-400/80 dark:bg-zinc-600/80" />
											</div>

											{/* Grid Columns */}
											<div className="grid min-w-[540px] grid-cols-12 gap-2">
												{TIMELINE_DATA.map((slot) => {
													const isHovered = activeTooltip === slot.time
													return (
														<div
															key={slot.time}
															onMouseEnter={() => setActiveTooltip(slot.time)}
															className={cn(
																"flex cursor-pointer flex-col items-center rounded-md p-1 transition-all",
																isHovered && "bg-fill1/80 ring-border/80 ring-1"
															)}>
															{/* Stacked Blocks */}
															<div className="flex h-44 w-full flex-col-reverse justify-start gap-1 pb-2">
																{/* Completed Blocks */}
																{Array.from({ length: slot.completed }).map(
																	(_, idx) => (
																		<div
																			key={`comp-${idx}`}
																			className="h-3.5 w-full rounded-xs bg-indigo-400 shadow-2xs transition-colors hover:brightness-110"
																		/>
																	)
																)}
																{/* Covered Blocks */}
																{Array.from({ length: slot.covered }).map(
																	(_, idx) => (
																		<div
																			key={`cov-${idx}`}
																			className="h-3.5 w-full rounded-xs bg-blue-500 shadow-2xs transition-colors hover:brightness-110"
																		/>
																	)
																)}
																{/* Needs Cover Blocks */}
																{Array.from({ length: slot.needsCover }).map(
																	(_, idx) => (
																		<div
																			key={`nc-${idx}`}
																			className="h-3.5 w-full animate-pulse rounded-xs bg-rose-500 shadow-2xs transition-colors hover:brightness-110"
																		/>
																	)
																)}
																{/* At Risk Blocks */}
																{Array.from({ length: slot.atRisk }).map(
																	(_, idx) => (
																		<div
																			key={`ar-${idx}`}
																			className="h-3.5 w-full rounded-xs bg-amber-400 shadow-2xs transition-colors hover:brightness-110"
																		/>
																	)
																)}
															</div>

															{/* Hour Label */}
															<span className="text-fg-secondary text-[11px] font-medium">
																{slot.time}
															</span>

															{/* Floating Tooltip Callout on active column */}
															<AnimatePresence>
																{isHovered && slot.needsCover > 0 && (
																	<motion.div
																		initial={{ opacity: 0, y: 5 }}
																		animate={{ opacity: 1, y: 0 }}
																		exit={{ opacity: 0, y: 5 }}
																		className="border-border/80 bg-elevation-level1 text-fg pointer-events-none absolute -top-14 z-30 flex min-w-[170px] flex-col rounded-md border p-2 text-xs shadow-lg">
																		<span className="text-fg text-[11px] font-semibold">
																			{slot.label}
																		</span>
																		<div className="text-fg-secondary mt-1 flex items-center gap-1.5 text-[11px]">
																			<span className="size-2 rounded-xs bg-blue-500" />
																			<span>
																				Covered: {slot.covered + slot.completed}
																			</span>
																		</div>
																		<div className="flex items-center gap-1.5 text-[11px] font-medium text-rose-500">
																			<span className="size-2 rounded-xs bg-rose-500" />
																			<span>
																				Needs cover: {slot.needsCover} ·{" "}
																				{slot.assignedName || "Urgent"}
																			</span>
																		</div>
																	</motion.div>
																)}
															</AnimatePresence>
														</div>
													)
												})}
											</div>
										</div>
									</div>

									{/* Card Footer */}
									<div className="border-border/60 mt-4 flex items-center justify-between border-t pt-3">
										<span className="text-fg-secondary text-[11px] font-semibold tracking-wider uppercase">
											PEAK 10:00 AM · 9 VISITS AT ONCE
										</span>
										<Button
											variant="ghost"
											color="neutral"
											size="xs"
											className="text-primary hover:text-primary-hover gap-1 font-semibold">
											<span>Open schedule</span>
											<ChevronRight className="size-3" />
										</Button>
									</div>
								</Card>

								{/* Right Column: Needs Attention + Live Visits (lg:col-span-4) */}
								<div className="flex flex-col gap-4 lg:col-span-4">
									{/* Needs Attention Card */}
									<Card className="border-border/60 bg-elevation-level1 flex flex-col gap-3 p-4 shadow-2xs">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-1.5">
												<span className="text-fg-secondary text-[11px] font-semibold tracking-wider uppercase">
													Needs Attention
												</span>
												<Badge
													color="error"
													variant="strong"
													size="sm"
													className="size-4.5 rounded-full p-0 text-[10px] font-bold">
													3
												</Badge>
											</div>
											<Button
												variant="link"
												color="neutral"
												size="xs"
												className="text-fg-secondary hover:text-fg text-xs font-medium">
												All alerts &gt;
											</Button>
										</div>

										<div className="flex flex-col gap-2.5">
											{NEEDS_ATTENTION.map((item) => {
												const Icon = item.icon
												return (
													<div
														key={item.id}
														className="border-border/50 bg-fill1/40 hover:bg-fill1/70 flex items-center justify-between rounded-lg border p-2.5 transition-colors">
														<div className="flex min-w-0 items-center gap-2.5">
															<div
																className={cn(
																	"flex size-7 shrink-0 items-center justify-center rounded-md",
																	item.iconColor
																)}>
																<Icon className="size-3.5" />
															</div>
															<div className="flex flex-col truncate">
																<span className="text-fg truncate text-xs leading-tight font-semibold">
																	{item.title}
																</span>
																<span className="text-fg-secondary truncate text-[11px] leading-tight">
																	{item.subtext}
																</span>
															</div>
														</div>

														<Button
															variant="outline"
															color="neutral"
															size="xs"
															className="border-border/70 bg-elevation-level1 hover:bg-fill1/80 h-7 shrink-0 gap-1 text-[11px] font-medium shadow-2xs">
															{item.hasPhone && <Phone className="size-3" />}
															<span>{item.action}</span>
														</Button>
													</div>
												)
											})}
										</div>
									</Card>

									{/* Live Visits Card */}
									<Card className="border-border/60 bg-elevation-level1 flex flex-col gap-3 p-4 shadow-2xs">
										<div className="flex items-center justify-between">
											<span className="text-fg-secondary text-[11px] font-semibold tracking-wider uppercase">
												Live Visits
											</span>
											<Badge
												color="success"
												variant="soft"
												size="sm"
												className="gap-1 text-[10px] font-semibold">
												<span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
												3 in progress
											</Badge>
										</div>

										<div className="flex flex-col gap-2.5">
											{LIVE_VISITS.map((visit) => (
												<div
													key={visit.id}
													className="border-border/50 bg-fill1/40 hover:bg-fill1/70 flex items-center justify-between rounded-lg border p-2.5 transition-colors">
													<div className="flex min-w-0 items-center gap-2.5">
														<Avatar
															size="sm"
															rounded="circle"
															className="border-border border">
															<AvatarImage
																src={`https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/${visit.avatar}.png`}
																alt={visit.name}
															/>
															<AvatarFallback>
																{visit.name.slice(0, 2)}
															</AvatarFallback>
														</Avatar>
														<div className="flex flex-col truncate">
															<span className="text-fg truncate text-xs leading-tight font-semibold">
																{visit.name}
															</span>
															<span className="text-fg-secondary truncate text-[11px] leading-tight">
																{visit.client}
															</span>
														</div>
													</div>

													<div className="flex shrink-0 flex-col items-end gap-1">
														<span className="text-fg-secondary font-mono text-[10px] font-medium">
															{visit.ends}
														</span>
														<div className="flex items-center gap-1">
															{Array.from({ length: 5 }).map((_, i) => (
																<span
																	key={i}
																	className={cn(
																		"h-1.5 w-2 rounded-xs",
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
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	)
}
