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
	LayoutGrid,
	Home,
	Flag,
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

type BlockStatus = "covered" | "completed" | "needsCover" | "atRisk" | null

interface HalfHourColumn {
	id: string
	time: string
	label: string
	covered: number
	needsCover: number
	assignedName?: string
	isPeak?: boolean
	cells: BlockStatus[]
}

const COVERAGE_DATA: HalfHourColumn[] = [
	// 7A
	{
		id: "7:00",
		time: "7:00 AM",
		label: "7A",
		covered: 6,
		needsCover: 0,
		cells: [
			"completed",
			"completed",
			"completed",
			"completed",
			"completed",
			"completed",
			null,
			null,
			null,
			null,
		],
	},
	{
		id: "7:30",
		time: "7:30 AM",
		label: "",
		covered: 6,
		needsCover: 0,
		cells: [
			"completed",
			"completed",
			"completed",
			"completed",
			"completed",
			"completed",
			null,
			null,
			null,
			null,
		],
	},
	// 8A
	{
		id: "8:00",
		time: "8:00 AM",
		label: "8A",
		covered: 7,
		needsCover: 0,
		cells: [
			"completed",
			"completed",
			"completed",
			"completed",
			"completed",
			"completed",
			"completed",
			null,
			null,
			null,
		],
	},
	{
		id: "8:30",
		time: "8:30 AM",
		label: "",
		covered: 7,
		needsCover: 0,
		cells: [
			"completed",
			"completed",
			"completed",
			"completed",
			"completed",
			"completed",
			"completed",
			null,
			null,
			null,
		],
	},
	// 9A
	{
		id: "9:00",
		time: "9:00 AM",
		label: "9A",
		covered: 3,
		needsCover: 0,
		cells: [
			"covered",
			"covered",
			"covered",
			null,
			null,
			null,
			null,
			null,
			null,
			null,
		],
	},
	{
		id: "9:30",
		time: "9:30 AM",
		label: "",
		covered: 5,
		needsCover: 0,
		cells: [
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"atRisk",
			null,
			null,
			null,
			null,
		],
	},
	// 10A
	{
		id: "10:00",
		time: "10:00 AM",
		label: "10A",
		covered: 6,
		needsCover: 0,
		cells: [
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"atRisk",
			null,
			null,
			null,
		],
	},
	{
		id: "10:30",
		time: "10:00 AM",
		label: "",
		covered: 8,
		needsCover: 1,
		assignedName: "Marguerite Holloway",
		isPeak: true,
		cells: [
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"atRisk",
			"needsCover",
			null,
		],
	},
	// 11A
	{
		id: "11:00",
		time: "11:00 AM",
		label: "11A",
		covered: 5,
		needsCover: 1,
		cells: [
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"needsCover",
			null,
			null,
			null,
			null,
		],
	},
	{
		id: "11:30",
		time: "11:30 AM",
		label: "",
		covered: 4,
		needsCover: 1,
		cells: [
			"covered",
			"covered",
			"covered",
			"covered",
			"needsCover",
			null,
			null,
			null,
			null,
			null,
		],
	},
	// 12P
	{
		id: "12:00",
		time: "12:00 PM",
		label: "12P",
		covered: 5,
		needsCover: 1,
		cells: [
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"needsCover",
			null,
			null,
			null,
			null,
		],
	},
	{
		id: "12:30",
		time: "12:30 PM",
		label: "",
		covered: 5,
		needsCover: 0,
		cells: [
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			null,
			null,
			null,
			null,
			null,
		],
	},
	// 1P
	{
		id: "1:00",
		time: "1:00 PM",
		label: "1P",
		covered: 4,
		needsCover: 1,
		cells: [
			"covered",
			"covered",
			"covered",
			"needsCover",
			"covered",
			null,
			null,
			null,
			null,
			null,
		],
	},
	{
		id: "1:30",
		time: "1:30 PM",
		label: "",
		covered: 4,
		needsCover: 0,
		cells: [
			"covered",
			"covered",
			"covered",
			"covered",
			null,
			null,
			null,
			null,
			null,
			null,
		],
	},
	// 2P
	{
		id: "2:00",
		time: "2:00 PM",
		label: "2P",
		covered: 5,
		needsCover: 1,
		cells: [
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"needsCover",
			null,
			null,
			null,
			null,
		],
	},
	{
		id: "2:30",
		time: "2:30 PM",
		label: "",
		covered: 5,
		needsCover: 0,
		cells: [
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			null,
			null,
			null,
			null,
			null,
		],
	},
	// 3P
	{
		id: "3:00",
		time: "3:00 PM",
		label: "3P",
		covered: 7,
		needsCover: 0,
		cells: [
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			null,
			null,
			null,
		],
	},
	{
		id: "3:30",
		time: "3:30 PM",
		label: "",
		covered: 7,
		needsCover: 0,
		cells: [
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			null,
			null,
			null,
		],
	},
	// 4P
	{
		id: "4:00",
		time: "4:00 PM",
		label: "4P",
		covered: 7,
		needsCover: 0,
		cells: [
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			null,
			null,
			null,
		],
	},
	{
		id: "4:30",
		time: "4:30 PM",
		label: "",
		covered: 7,
		needsCover: 0,
		cells: [
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			null,
			null,
			null,
		],
	},
	// 5P
	{
		id: "5:00",
		time: "5:00 PM",
		label: "5P",
		covered: 8,
		needsCover: 1,
		cells: [
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"covered",
			"needsCover",
			null,
		],
	},
	{
		id: "5:30",
		time: "5:30 PM",
		label: "",
		covered: 4,
		needsCover: 1,
		cells: [
			"covered",
			"covered",
			"covered",
			"covered",
			"needsCover",
			null,
			null,
			null,
			null,
			null,
		],
	},
	// 6P
	{
		id: "6:00",
		time: "6:00 PM",
		label: "6P",
		covered: 4,
		needsCover: 0,
		cells: [
			"covered",
			"covered",
			"covered",
			"covered",
			null,
			null,
			null,
			null,
			null,
			null,
		],
	},
	{
		id: "6:30",
		time: "6:30 PM",
		label: "",
		covered: 3,
		needsCover: 0,
		cells: [
			"covered",
			"covered",
			"covered",
			null,
			null,
			null,
			null,
			null,
			null,
			null,
		],
	},
]

const HOURS_LIST = [
	"7A",
	"8A",
	"9A",
	"10A",
	"11A",
	"12P",
	"1P",
	"2P",
	"3P",
	"4P",
	"5P",
	"6P",
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
		iconColor:
			"text-amber-600 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300",
		action: "Reassign",
		hasPhone: true,
	},
	{
		id: "na-2",
		title: "EVV location not verified",
		subtext: "Hiwot at Josephine Varga · 8:34 AM",
		icon: MapPin,
		iconColor:
			"text-rose-600 bg-rose-100 dark:bg-rose-950/60 dark:text-rose-300",
		action: "Review",
	},
	{
		id: "na-3",
		title: "Visit note overdue",
		subtext: "Abena · Ignatius Rourke, ended 8:30",
		icon: FileText,
		iconColor:
			"text-blue-600 bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300",
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
	const [selectedColIndex, setSelectedColIndex] = useState<number>(7)

	const toggleApprove = (id: string) => {
		setApprovedVisits((prev) => {
			const next = new Set(prev)
			if (next.has(id)) next.delete(id)
			else next.add(id)
			return next
		})
	}

	return (
		<div className="text-fg font-body h-screen w-full overflow-hidden bg-[#f0f4f9] dark:bg-zinc-950">
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
						className="flex w-64 shrink-0 flex-col justify-between border-0 bg-transparent p-3 select-none"
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
														? "text-fg dark:bg-elevation-level1 border-border/50 border bg-white font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg dark:hover:bg-elevation-level1/60 hover:bg-white/60"
												)}>
												<LayoutGrid className="size-4" />
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
														? "text-fg dark:bg-elevation-level1 border-border/50 border bg-white font-semibold shadow-2xs"
														: "text-fg-secondary hover:text-fg dark:hover:bg-elevation-level1/60 hover:bg-white/60"
												)}>
												<Home className="size-4" />
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
              MAIN DASHBOARD INSET (FLOATING WHITE CARD PANEL)
          ══════════════════════════════════════════════ */}
					<SidebarInset className="h-screen min-w-0 flex-1 overflow-hidden bg-transparent p-2.5 pl-0 md:p-3 md:pl-0">
						<div className="dark:bg-elevation-level1 border-border/50 flex h-full w-full flex-col gap-6 overflow-y-auto rounded-2xl border bg-white p-5 shadow-2xs md:p-7">
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

							{/* ── Hero Call-out Replacement Banner (Unified, shrink-0 prevents flexbox collapse) ── */}
							<Card className="relative shrink-0 overflow-hidden rounded-2xl border-none bg-gradient-to-r from-[#172554] via-[#1e3a8a] to-[#2563eb] p-6 text-white shadow-md">
								<div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
									{/* Left Callout Details */}
									<div className="flex flex-col gap-3.5 lg:col-span-6">
										<div>
											<div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-xs">
												<Phone className="size-3 text-white/80" />
												<span>CALL-OUT · 8:31 AM</span>
											</div>
										</div>

										<div>
											<h2 className="font-heading text-xl leading-snug font-bold tracking-tight text-white sm:text-2xl">
												Desmond Okonjo called out sick.
												<br />3 visits need cover today.
											</h2>
											<p className="mt-1.5 text-xs leading-relaxed text-blue-100/85 sm:text-sm">
												Visitly matched a replacement for each visit. Approve
												them and the day rebuilds itself.
											</p>
										</div>

										<div className="flex flex-wrap items-center gap-2.5 pt-1">
											<Button
												variant="strong"
												color="neutral"
												size="sm"
												className="gap-1.5 rounded-xl bg-white font-semibold text-zinc-900 shadow-xs hover:bg-zinc-100">
												<span>Review replacements</span>
												<ChevronRight className="size-3.5 text-zinc-600" />
											</Button>
											<Button
												variant="outline"
												color="neutral"
												size="sm"
												className="rounded-xl border-white/20 bg-white/10 font-medium text-white shadow-none hover:bg-white/20">
												See Desmond&apos;s day
											</Button>
										</div>
									</div>

									{/* Right Suggested Replacements */}
									<div className="flex flex-col gap-2 lg:col-span-6">
										<div className="mb-0.5 flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-blue-200 uppercase">
											<Sparkles className="size-3 text-blue-200" />
											<span>SUGGESTED REPLACEMENTS</span>
										</div>

										<div className="flex flex-col gap-2">
											{REPLACEMENTS.map((item) => (
												<div
													key={item.id}
													className="flex items-center justify-between rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-xs backdrop-blur-xs transition-colors hover:bg-white/15">
													<div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
														<span className="w-16 shrink-0 font-mono text-[11px] text-blue-200">
															{item.time}
														</span>
														<span className="truncate font-medium text-white/90">
															{item.original}
														</span>
														<ChevronRight className="size-3 shrink-0 text-white/40" />
														<div className="flex min-w-0 items-center gap-2">
															<Avatar
																size="2xs"
																rounded="circle"
																className="shrink-0 border border-white/30">
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

													<span className="shrink-0 pl-2 text-xs font-semibold text-blue-200">
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
										className="border-border/60 flex flex-col justify-between rounded-2xl border bg-[#f0f4f9] p-1.5 shadow-2xs dark:bg-zinc-900/60">
										{/* Top Elevated White Panel */}
										<div className="border-border/50 dark:bg-elevation-level1 flex flex-col justify-between gap-3 rounded-xl border bg-white p-3.5 shadow-2xs">
											<span className="text-fg-tertiary text-[10px] font-semibold tracking-wider uppercase select-none">
												{stat.label}
											</span>
											<div className="flex items-end justify-between gap-2">
												<div className="flex items-baseline gap-1.5">
													<span className="font-heading text-fg text-2xl font-bold tracking-tight">
														{stat.value}
													</span>
													<span className="text-fg-secondary text-xs font-normal">
														{stat.unit}
													</span>
												</div>

												{/* Mini Sparkline Chart */}
												<div className="flex h-7 items-end gap-[3px] pb-0.5">
													{stat.bars.map((bar, i) => (
														<div
															key={i}
															style={{ height: `${bar}%` }}
															className="w-[3px] rounded-full bg-[#a5b4fc] transition-all hover:brightness-110 dark:bg-indigo-400/80"
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
							<div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
								{/* Left: Coverage by Half Hour Timeline Grid (lg:col-span-7) */}
								<Card className="border-border/60 flex flex-col justify-between rounded-2xl border bg-[#f0f4f9] p-2 shadow-2xs lg:col-span-7 dark:bg-zinc-900/60">
									{/* Top Header & Legend on tinted base */}
									<div className="flex flex-wrap items-center justify-between gap-3 px-1.5 pt-0.5 pb-1">
										<div className="text-fg-secondary flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase">
											<Calendar className="size-3.5" />
											<span>Coverage by Half Hour</span>
										</div>

										{/* Legend */}
										<div className="text-fg-secondary flex flex-wrap items-center gap-3 text-[10px] font-semibold tracking-wider">
											<div className="flex items-center gap-1.5">
												<span className="size-2 rounded-xs bg-[#3b82f6]" />
												<span>COVERED</span>
											</div>
											<div className="flex items-center gap-1.5">
												<span className="size-2 rounded-xs bg-[#9eaeff]" />
												<span>COMPLETED</span>
											</div>
											<div className="flex items-center gap-1.5">
												<span className="size-2 rounded-xs bg-[#f43f5e]" />
												<span>NEEDS COVER</span>
											</div>
											<div className="flex items-center gap-1.5">
												<span className="size-2 rounded-xs bg-[#f59e0b]" />
												<span>AT RISK</span>
											</div>
										</div>
									</div>

									{/* Inner Elevated White Card */}
									<div className="border-border/50 dark:bg-elevation-level1 flex flex-col rounded-xl border bg-white p-4 shadow-2xs">
										{/* Sub-header with Metrics & Hint */}
										<div className="flex flex-wrap items-baseline justify-between gap-2">
											<div className="flex items-baseline gap-1.5">
												<span className="heading-3 text-fg">45</span>
												<span className="text-fg-secondary text-xs">
													of 48 visits covered
												</span>
											</div>
											<span className="text-fg-tertiary text-xs">
												Each square is one visit
											</span>
										</div>

										{/* Interactive Block Matrix Chart */}
										<div className="relative overflow-x-auto pt-7 pb-2 select-none">
											{/* Current Time Indicator Line (NOW 8:46) */}
											<div
												className="pointer-events-none absolute top-0 bottom-6 z-20 flex flex-col items-center"
												style={{
													left: "calc(1.5rem + (3.53 / 24) * (100% - 1.5rem))",
												}}>
												<div className="rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-bold whitespace-nowrap text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-900">
													NOW 8:46
												</div>
												<div className="w-[1.5px] flex-1 bg-zinc-800/80 dark:bg-zinc-200/80" />
											</div>

											{/* Grid with Y-axis + 24 Columns */}
											<div className="flex min-w-[560px] items-stretch">
												{/* Y-axis labels aligned with 10 rows */}
												<div
													className="text-fg-tertiary w-6 shrink-0 pr-2 text-right font-mono text-[10px] select-none"
													style={{
														display: "grid",
														gridTemplateRows: "repeat(10, minmax(0, 1fr))",
														gap: "3px",
													}}>
													<div />
													<div className="flex items-center justify-end leading-none">
														9
													</div>
													<div />
													<div />
													<div className="flex items-center justify-end leading-none">
														6
													</div>
													<div />
													<div />
													<div className="flex items-center justify-end leading-none">
														3
													</div>
													<div />
													<div />
												</div>

												{/* 24 Half-Hour Columns */}
												<div
													className="relative flex-1"
													style={{
														display: "grid",
														gridTemplateColumns: "repeat(24, minmax(0, 1fr))",
														gap: "3px",
													}}>
													{COVERAGE_DATA.map((col, colIdx) => {
														const isSelected = selectedColIndex === colIdx
														return (
															<div
																key={col.id}
																onClick={() => setSelectedColIndex(colIdx)}
																onMouseEnter={() => setSelectedColIndex(colIdx)}
																className={cn(
																	"relative flex cursor-pointer flex-col transition-all",
																	isSelected && "z-20"
																)}>
																{/* Column selection outline */}
																{isSelected && (
																	<div className="pointer-events-none absolute -inset-[2px] z-10 rounded-md border-2 border-slate-700/80 shadow-xs dark:border-slate-300" />
																)}

																{/* 10 Vertical Cells: row 9 at top down to row 0 at bottom */}
																<div
																	className="w-full"
																	style={{
																		display: "grid",
																		gridTemplateRows:
																			"repeat(10, minmax(0, 1fr))",
																		gap: "3px",
																	}}>
																	{Array.from({ length: 10 }).map((_, r) => {
																		const rowIdx = 9 - r
																		const status = col.cells[rowIdx]
																		return (
																			<div
																				key={rowIdx}
																				className={cn(
																					"aspect-square w-full rounded-[3px] transition-colors",
																					status === "completed" &&
																						"bg-[#9eaeff] hover:brightness-110",
																					status === "covered" &&
																						"bg-[#3b82f6] hover:brightness-110",
																					status === "atRisk" &&
																						"bg-[#f59e0b] hover:brightness-110",
																					status === "needsCover" &&
																						"animate-pulse bg-[#f43f5e] hover:brightness-110",
																					status === null &&
																						"bg-[#eef2f6] dark:bg-zinc-800/40"
																				)}
																			/>
																		)
																	})}
																</div>
															</div>
														)
													})}

													{/* Floating Tooltip Callout anchored to selected column */}
													{selectedColIndex !== null && (
														<AnimatePresence>
															<motion.div
																initial={{ opacity: 0, y: 4 }}
																animate={{ opacity: 1, y: 0 }}
																exit={{ opacity: 0, y: 4 }}
																transition={{ duration: 0.15 }}
																className="border-border/70 dark:bg-elevation-level2 text-fg pointer-events-none absolute z-30 min-w-[210px] rounded-xl border bg-white/95 p-3 text-xs shadow-lg backdrop-blur-xs"
																style={{
																	left: `calc((${selectedColIndex} / 24) * 100% + 14px)`,
																	top: "16%",
																	transform:
																		selectedColIndex > 16
																			? "translateX(-110%)"
																			: "none",
																}}>
																<span className="text-fg text-xs font-semibold">
																	{COVERAGE_DATA[selectedColIndex].time}
																</span>
																<div className="mt-1.5 flex items-center justify-between text-xs">
																	<div className="flex items-center gap-1.5">
																		<span className="size-2 rounded-xs bg-[#3b82f6]" />
																		<span className="text-fg-secondary">
																			Covered
																		</span>
																	</div>
																	<span className="text-fg font-semibold">
																		{COVERAGE_DATA[selectedColIndex].covered}
																	</span>
																</div>
																{COVERAGE_DATA[selectedColIndex].needsCover >
																	0 && (
																	<div className="mt-1 flex items-center justify-between text-xs">
																		<div className="flex items-center gap-1.5">
																			<span className="size-2 rounded-xs bg-[#f43f5e]" />
																			<span className="font-medium text-[#f43f5e]">
																				Needs cover
																			</span>
																		</div>
																		<div className="flex items-center gap-1 text-xs">
																			<span className="font-bold text-[#f43f5e]">
																				{
																					COVERAGE_DATA[selectedColIndex]
																						.needsCover
																				}
																			</span>
																			{COVERAGE_DATA[selectedColIndex]
																				.assignedName && (
																				<span className="text-fg-secondary">
																					·{" "}
																					{
																						COVERAGE_DATA[selectedColIndex]
																							.assignedName
																					}
																				</span>
																			)}
																		</div>
																	</div>
																)}
															</motion.div>
														</AnimatePresence>
													)}
												</div>
											</div>

											{/* Bottom X-axis Hour Labels */}
											<div className="flex min-w-[560px] items-center pt-2">
												<div className="w-6 shrink-0" />
												<div
													className="flex-1"
													style={{
														display: "grid",
														gridTemplateColumns: "repeat(24, minmax(0, 1fr))",
														gap: "3px",
													}}>
													{HOURS_LIST.map((hr) => (
														<span
															key={hr}
															className="text-fg-secondary col-span-2 text-center text-[10px] font-medium select-none sm:text-[11px]">
															{hr}
														</span>
													))}
												</div>
											</div>
										</div>
									</div>

									{/* Card Footer on tinted base */}
									<div className="flex items-center justify-between px-1.5 pt-1.5 pb-0.5">
										<span className="text-fg-secondary text-[10px] font-semibold tracking-wider uppercase">
											PEAK 10:00 AM · 9 VISITS AT ONCE
										</span>
										<Button
											variant="ghost"
											color="neutral"
											size="xs"
											className="text-fg-secondary hover:text-fg h-6 gap-1 px-1.5 text-xs font-medium">
											<span>Open schedule</span>
											<ChevronRight className="size-3" />
										</Button>
									</div>
								</Card>

								{/* Right Column: Needs Attention + Live Visits (lg:col-span-5) */}
								<div className="flex flex-col gap-4 lg:col-span-5">
									{/* Needs Attention Card */}
									<Card className="border-border/60 flex flex-col gap-2 rounded-2xl border bg-[#f0f4f9] p-2 shadow-2xs dark:bg-zinc-900/60">
										{/* Header row on tinted base */}
										<div className="flex items-center justify-between px-1.5 pt-0.5 pb-0.5">
											<div className="flex items-center gap-1.5">
												<Flag className="text-fg-secondary size-3.5" />
												<span className="text-fg-secondary text-[11px] font-semibold tracking-wider uppercase">
													Needs Attention
												</span>
												<span className="flex size-4.5 items-center justify-center rounded-full bg-[#f43f5e] text-[10px] font-bold text-white">
													3
												</span>
											</div>
											<Button
												variant="link"
												color="neutral"
												size="xs"
												className="text-fg-secondary hover:text-fg h-auto p-0 text-xs font-medium">
												All alerts &gt;
											</Button>
										</div>

										{/* Inner Elevated White Card */}
										<div className="border-border/50 dark:bg-elevation-level1 divide-border/40 divide-y overflow-hidden rounded-xl border bg-white shadow-2xs">
											{NEEDS_ATTENTION.map((item) => {
												const Icon = item.icon
												return (
													<div
														key={item.id}
														className="hover:bg-fill1/40 flex items-center justify-between p-3 transition-colors">
														<div className="flex min-w-0 items-center gap-3">
															<div
																className={cn(
																	"flex size-8 shrink-0 items-center justify-center rounded-lg",
																	item.iconColor
																)}>
																<Icon className="size-4" />
															</div>
															<div className="flex flex-col truncate">
																<span className="text-fg truncate text-xs font-semibold">
																	{item.title}
																</span>
																<span className="text-fg-secondary truncate text-[11px]">
																	{item.subtext}
																</span>
															</div>
														</div>

														<div className="flex shrink-0 items-center gap-1.5">
															{item.hasPhone && (
																<Button
																	variant="outline"
																	color="neutral"
																	size="xs"
																	className="size-7.5 shrink-0 p-0">
																	<Phone className="size-3.5" />
																</Button>
															)}
															<Button
																variant="outline"
																color="neutral"
																size="xs"
																className="h-7.5 px-3 text-xs font-medium">
																{item.action}
															</Button>
														</div>
													</div>
												)
											})}
										</div>
									</Card>

									{/* Live Visits Card */}
									<Card className="border-border/60 flex flex-col gap-2 rounded-2xl border bg-[#f0f4f9] p-2 shadow-2xs dark:bg-zinc-900/60">
										{/* Header row on tinted base */}
										<div className="flex items-center justify-between px-1.5 pt-0.5 pb-0.5">
											<div className="flex items-center gap-1.5">
												<Layers className="text-fg-secondary size-3.5" />
												<span className="text-fg-secondary text-[11px] font-semibold tracking-wider uppercase">
													Live Visits
												</span>
											</div>
											<div className="border-border/50 dark:bg-elevation-level1 text-fg-secondary flex items-center gap-1.5 rounded-full border bg-white px-2.5 py-0.5 text-[10px] font-semibold shadow-2xs">
												<span className="size-1.5 rounded-full bg-emerald-500" />
												<span>3 in progress</span>
											</div>
										</div>

										{/* Inner Elevated White Card */}
										<div className="border-border/50 dark:bg-elevation-level1 divide-border/40 divide-y overflow-hidden rounded-xl border bg-white shadow-2xs">
											{LIVE_VISITS.map((visit) => (
												<div
													key={visit.id}
													className="hover:bg-fill1/40 flex items-center justify-between p-3 transition-colors">
													<div className="flex min-w-0 items-center gap-3">
														<Avatar
															size="sm"
															rounded="circle"
															className="border-border shrink-0 border">
															<AvatarImage
																src={`https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/${visit.avatar}.png`}
																alt={visit.name}
															/>
															<AvatarFallback className="text-[10px] font-semibold">
																{visit.name.slice(0, 2)}
															</AvatarFallback>
														</Avatar>
														<div className="flex flex-col truncate">
															<span className="text-fg truncate text-xs font-semibold">
																{visit.name}
															</span>
															<span className="text-fg-secondary truncate text-[11px]">
																{visit.client}
															</span>
														</div>
													</div>

													<div className="flex shrink-0 flex-col items-end gap-1.5 pl-2">
														<span className="text-fg-secondary font-mono text-[10px] font-semibold tracking-wider">
															{visit.ends}
														</span>
														<div className="flex items-center gap-1">
															{Array.from({ length: 10 }).map((_, i) => (
																<span
																	key={i}
																	className={cn(
																		"size-1.5 rounded-[1.5px]",
																		i < visit.progress
																			? "bg-blue-500 dark:bg-blue-400"
																			: "bg-slate-200 dark:bg-zinc-800"
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
