"use client"

import * as React from "react"
import { useState } from "react"
import {
	Area,
	CartesianGrid,
	ComposedChart,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	ReferenceLine,
} from "recharts"
import {
	Home,
	ClipboardCheck,
	BarChart3,
	CheckCircle2,
	ShieldCheck,
	AlertTriangle,
	Building2,
	FolderArchive,
	Users,
	Link2,
	Terminal,
	Headphones,
	Settings,
	Search,
	Calendar,
	SlidersHorizontal,
	Share2,
	Bell,
	Clock,
	MoreHorizontal,
	ChevronDown,
	ChevronsUpDown,
	ChevronRight,
	FileSpreadsheet,
	Check,
	PanelLeftClose,
} from "lucide-react"

import { Button, IconButton } from "@/components/ui/button"
import { Badge } from "@/styles/default/ui/badge"
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/styles/default/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Input } from "@/styles/default/ui/input"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	useSidebar,
} from "@/styles/default/ui/sidebar"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/styles/default/ui/table"
import { cn } from "@/lib/utils"

// ──────────────────────────────────────────────
// Zippy Brand Logo Component
// ──────────────────────────────────────────────
function ZippyLogo({ className = "size-6" }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}>
			<rect
				width="32"
				height="32"
				rx="8"
				fill="var(--color-primary, #4F46E5)"
			/>
			{/* Four pill petals intersecting */}
			<rect x="8" y="12" width="16" height="8" rx="4" fill="white" />
			<rect x="12" y="8" width="8" height="16" rx="4" fill="white" />
		</svg>
	)
}

// ──────────────────────────────────────────────
// Donut Progress Chart with Patterned Track
// ──────────────────────────────────────────────
interface DonutProgressProps {
	percentage: number
	color: string
	id: string
	size?: number
	strokeWidth?: number
}

function DonutProgress({
	percentage,
	color,
	id,
	size = 80,
	strokeWidth = 10,
}: DonutProgressProps) {
	const radius = (size - strokeWidth) / 2
	const circumference = 2 * Math.PI * radius
	const strokeDashoffset = circumference - (percentage / 100) * circumference

	return (
		<div className="relative shrink-0" style={{ width: size, height: size }}>
			<svg className="size-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
				<defs>
					<pattern
						id={`hatch-pattern-${id}`}
						width="6"
						height="6"
						patternTransform="rotate(45 0 0)"
						patternUnits="userSpaceOnUse">
						<line
							x1="0"
							y1="0"
							x2="0"
							y2="6"
							stroke="currentColor"
							strokeWidth="1.5"
							className="text-fill3 dark:text-fill2"
						/>
					</pattern>
				</defs>

				{/* Striped / hatched remainder track */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke={`url(#hatch-pattern-${id})`}
					strokeWidth={strokeWidth}
				/>

				{/* Smooth base ring */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke="currentColor"
					strokeWidth={strokeWidth}
					className="text-fill2/40 dark:text-fill2/20"
				/>

				{/* Colored progress arc */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke={color}
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap="round"
					className="transition-all duration-700 ease-out"
				/>
			</svg>
		</div>
	)
}

// ──────────────────────────────────────────────
// Framework Progress Chart Dataset
// ──────────────────────────────────────────────
const frameworkProgressData = [
	{ date: "Feb 1", actual: 20, projected: 20 },
	{ date: "Feb 6", actual: 43, projected: 43 },
	{ date: "Feb 10", actual: null, projected: 40 },
	{ date: "Feb 14", actual: null, projected: 38 },
	{ date: "Feb 20", actual: null, projected: 50 },
	{ date: "Feb 24", actual: null, projected: 65 },
	{ date: "Feb 28", actual: null, projected: 75 },
]

// ──────────────────────────────────────────────
// Audits Dataset
// ──────────────────────────────────────────────
interface AuditItem {
	id: string
	title: string
	status: "Upcoming" | "In Audits" | "Awaiting Report" | "Completed"
	dateRange: string
}

const auditItems: AuditItem[] = [
	{
		id: "audit-1",
		title: "SOC 2 Type II - Infrastructure & Cloud Controls",
		status: "Upcoming",
		dateRange: "Mar 21, 2026 - Apr 12, 2026",
	},
	{
		id: "audit-2",
		title: "SOC 2 Type II - Security & Access Review",
		status: "In Audits",
		dateRange: "Mar 21, 2026 - Apr 12, 2026",
	},
	{
		id: "audit-3",
		title: "SOC 2 Type II - Data Protection Assessment",
		status: "Completed",
		dateRange: "Mar 21, 2026 - Apr 12, 2026",
	},
	{
		id: "audit-4",
		title: "SOC 2 Type II - Vendor Risk Evaluation",
		status: "Upcoming",
		dateRange: "Mar 21, 2026 - Apr 12, 2026",
	},
]

// ──────────────────────────────────────────────
// Reports Dataset
// ──────────────────────────────────────────────
interface ReportItem {
	id: string
	title: string
	subtitle: string
	createdBy: string
	charts: string[]
	lastModified: string
}

const reportsData: ReportItem[] = [
	{
		id: "rep-1",
		title: "Project overview",
		subtitle: "Gain a top level view of your compliance and security program.",
		createdBy: "Zippy",
		charts: ["Tests", "Risk"],
		lastModified: "January 12, 2026",
	},
	{
		id: "rep-2",
		title: "Annual SOC 2 Compliance Report",
		subtitle:
			"Annual assessment of infrastructure and internal security controls.",
		createdBy: "Zippy",
		charts: ["Compliance", "Audit"],
		lastModified: "February 04, 2026",
	},
	{
		id: "rep-3",
		title: "Vendor Security Assessment",
		subtitle:
			"Quarterly evaluation of third-party vendors and critical dependencies.",
		createdBy: "Zippy",
		charts: ["Vendor", "Risk"],
		lastModified: "March 10, 2026",
	},
]

const DATE_RANGE_OPTIONS = [
	"Today",
	"Yesterday",
	"Last 7 days",
	"Last 30 days",
	"Last 90 days",
	"This month",
	"Last month",
	"Custom range",
]

// ──────────────────────────────────────────────
// Sidebar Navigation Component
// ──────────────────────────────────────────────
function AppSidebar({
	activeNav,
	setActiveNav,
}: {
	activeNav: string
	setActiveNav: (name: string) => void
}) {
	const { toggleSidebar } = useSidebar()
	const [teamsExpanded, setTeamsExpanded] = useState(true)

	return (
		<Sidebar
			variant="sidebar"
			collapsible="icon"
			className="border-border/60 bg-elevation-level1 border-r transition-[width] duration-300">
			{/* Brand Header */}
			<SidebarHeader className="border-border/40 flex h-14 items-center justify-between border-b px-3 py-2">
				<div className="flex items-center gap-2.5 px-1">
					<ZippyLogo className="size-6 shrink-0" />
					<span className="font-heading text-fg text-base font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
						Zippy
					</span>
				</div>
				<IconButton
					variant="ghost"
					color="neutral"
					size="xs"
					onClick={toggleSidebar}
					className="text-fg-secondary hover:text-fg size-7 cursor-pointer group-data-[collapsible=icon]:hidden"
					aria-label="Toggle sidebar">
					<PanelLeftClose className="size-4" />
				</IconButton>
			</SidebarHeader>

			<SidebarContent className="no-scrollbar overflow-x-hidden overflow-y-auto px-2 py-3">
				{/* Top Core Navigation */}
				<SidebarGroup className="p-0">
					<SidebarMenu className="gap-1">
						<SidebarMenuItem>
							<SidebarMenuButton
								size="sm"
								isActive={activeNav === "Home"}
								onClick={() => setActiveNav("Home")}
								className={cn(
									"h-8.5 rounded-lg text-[14px]",
									activeNav === "Home" &&
										"bg-fill2 dark:bg-elevation-level2 font-medium"
								)}>
								<Home className="size-4" />
								<span>Home</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton
								size="sm"
								isActive={activeNav === "Test"}
								onClick={() => setActiveNav("Test")}
								className={cn(
									"h-8.5 rounded-lg text-[14px]",
									activeNav === "Test" &&
										"bg-fill2 dark:bg-elevation-level2 font-medium"
								)}>
								<ClipboardCheck className="size-4" />
								<span>Test</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton
								size="sm"
								isActive={activeNav === "Reports"}
								onClick={() => setActiveNav("Reports")}
								className={cn(
									"h-8.5 rounded-lg text-[14px]",
									activeNav === "Reports" &&
										"bg-fill2 dark:bg-elevation-level2 text-fg font-medium"
								)}>
								<BarChart3 className="size-4" />
								<span>Reports</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>

				{/* Compliance & Operations Group */}
				<SidebarGroup className="p-0 pt-4">
					<SidebarMenu className="gap-1">
						<SidebarMenuItem>
							<SidebarMenuButton
								size="sm"
								isActive={activeNav === "Compliance"}
								onClick={() => setActiveNav("Compliance")}
								className={cn(
									"h-8.5 rounded-lg text-[14px]",
									activeNav === "Compliance" &&
										"bg-fill2 dark:bg-elevation-level2 font-medium"
								)}>
								<CheckCircle2 className="size-4" />
								<span>Compliance</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton
								size="sm"
								isActive={activeNav === "Trust center"}
								onClick={() => setActiveNav("Trust center")}
								className={cn(
									"h-8.5 rounded-lg text-[14px]",
									activeNav === "Trust center" &&
										"bg-fill2 dark:bg-elevation-level2 font-medium"
								)}>
								<ShieldCheck className="size-4" />
								<span>Trust center</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton
								size="sm"
								isActive={activeNav === "Risk"}
								onClick={() => setActiveNav("Risk")}
								className={cn(
									"h-8.5 rounded-lg text-[14px]",
									activeNav === "Risk" &&
										"bg-fill2 dark:bg-elevation-level2 font-medium"
								)}>
								<AlertTriangle className="size-4" />
								<span>Risk</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton
								size="sm"
								isActive={activeNav === "Vendor"}
								onClick={() => setActiveNav("Vendor")}
								className={cn(
									"h-8.5 rounded-lg text-[14px]",
									activeNav === "Vendor" &&
										"bg-fill2 dark:bg-elevation-level2 font-medium"
								)}>
								<Building2 className="size-4" />
								<span>Vendor</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton
								size="sm"
								isActive={activeNav === "Assets"}
								onClick={() => setActiveNav("Assets")}
								className={cn(
									"h-8.5 rounded-lg text-[14px]",
									activeNav === "Assets" &&
										"bg-fill2 dark:bg-elevation-level2 font-medium"
								)}>
								<FolderArchive className="size-4" />
								<span>Assets</span>
							</SidebarMenuButton>
						</SidebarMenuItem>

						{/* Teams with Submenu */}
						<SidebarMenuItem>
							<SidebarMenuButton
								size="sm"
								onClick={() => setTeamsExpanded(!teamsExpanded)}
								className="h-8.5 justify-between rounded-lg text-[14px]">
								<div className="flex items-center gap-2">
									<Users className="size-4" />
									<span>Teams</span>
								</div>
								<ChevronDown
									className={cn(
										"size-3.5 transition-transform duration-200 group-data-[collapsible=icon]:hidden",
										teamsExpanded && "rotate-180"
									)}
								/>
							</SidebarMenuButton>

							{teamsExpanded && (
								<SidebarMenuSub className="border-border/60 ml-5.5 border-l pl-2 group-data-[collapsible=icon]:hidden">
									<SidebarMenuSubItem>
										<SidebarMenuSubButton className="text-fg-secondary hover:text-fg h-7 cursor-pointer rounded-md text-xs">
											<span>Project manager</span>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
									<SidebarMenuSubItem>
										<SidebarMenuSubButton className="text-fg-secondary hover:text-fg h-7 cursor-pointer rounded-md text-xs">
											<span>Developer</span>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
									<SidebarMenuSubItem>
										<SidebarMenuSubButton className="text-fg-secondary hover:text-fg h-7 cursor-pointer rounded-md text-xs">
											<span>Quality assurance</span>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								</SidebarMenuSub>
							)}
						</SidebarMenuItem>

						<SidebarMenuItem>
							<SidebarMenuButton
								size="sm"
								isActive={activeNav === "Integrations"}
								onClick={() => setActiveNav("Integrations")}
								className={cn(
									"h-8.5 rounded-lg text-[14px]",
									activeNav === "Integrations" &&
										"bg-fill2 dark:bg-elevation-level2 font-medium"
								)}>
								<Link2 className="size-4" />
								<span>Integrations</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>

			{/* Sidebar Footer */}
			<SidebarFooter className="border-border/40 border-t p-2">
				<SidebarMenu className="gap-1">
					<SidebarMenuItem>
						<SidebarMenuButton
							size="sm"
							isActive={activeNav === "API"}
							onClick={() => setActiveNav("API")}
							className="text-fg-secondary hover:text-fg h-8.5 rounded-lg text-[14px]">
							<Terminal className="size-4" />
							<span>API</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="sm"
							isActive={activeNav === "Help Center"}
							onClick={() => setActiveNav("Help Center")}
							className="text-fg-secondary hover:text-fg h-8.5 rounded-lg text-[14px]">
							<Headphones className="size-4" />
							<span>Help Center</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="sm"
							isActive={activeNav === "Settings"}
							onClick={() => setActiveNav("Settings")}
							className="text-fg-secondary hover:text-fg h-8.5 rounded-lg text-[14px]">
							<Settings className="size-4" />
							<span>Settings</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}

// ──────────────────────────────────────────────
// Main Dashboard Page Component
// ──────────────────────────────────────────────
export default function Preview11Page() {
	const [activeNav, setActiveNav] = useState("Reports")
	const [dateRange, setDateRange] = useState("Last 30 days")
	const [searchQuery, setSearchQuery] = useState("")
	const [auditFilter, setAuditFilter] = useState<string>("All")

	const filteredAudits =
		auditFilter === "All"
			? auditItems
			: auditItems.filter((item) => item.status === auditFilter)

	return (
		<SidebarProvider className="bg-bg text-fg min-h-screen w-full">
			{/* ══════════════════════════════════════════════
          1. APPLICATION SIDEBAR
      ══════════════════════════════════════════════ */}
			<AppSidebar activeNav={activeNav} setActiveNav={setActiveNav} />

			{/* ══════════════════════════════════════════════
          2. MAIN CONTENT INSET
      ══════════════════════════════════════════════ */}
			<SidebarInset className="bg-bg-subtle dark:bg-bg flex min-h-screen w-full flex-1 flex-col overflow-y-auto font-sans">
				{/* Top Header Bar */}
				<header className="bg-elevation-level1 border-border/60 sticky top-0 z-10 flex h-14 items-center justify-between border-b px-6 py-2">
					{/* Search & Date Filter Controls */}
					<div className="flex items-center gap-2.5">
						<div className="relative w-48 sm:w-64">
							<Search className="text-fg-tertiary absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
							<Input
								placeholder="Search...."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="border-border/60 bg-bg placeholder:text-fg-tertiary h-8.5 rounded-xl pr-3 pl-8 text-xs shadow-2xs"
							/>
						</div>

						{/* Date Range Dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									color="neutral"
									size="sm"
									className="border-border/60 bg-bg text-fg h-8.5 cursor-pointer gap-2 rounded-xl px-3 text-xs font-medium shadow-2xs">
									<Calendar className="text-fg-secondary size-3.5" />
									<span>{dateRange}</span>
									<ChevronsUpDown className="text-fg-tertiary size-3.5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="start"
								sideOffset={4}
								className="border-border/80 w-44 rounded-2xl border p-1.5 shadow-lg">
								{DATE_RANGE_OPTIONS.map((range) => (
									<DropdownMenuItem
										key={range}
										onClick={() => setDateRange(range)}
										className={cn(
											"cursor-pointer justify-between rounded-lg px-3 py-1.5 text-xs",
											dateRange === range && "bg-fill1 text-fg font-medium"
										)}>
										<span>{range}</span>
										{dateRange === range && (
											<Check className="text-primary size-3.5" />
										)}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>

						{/* Filter Icon Button */}
						<IconButton
							variant="outline"
							color="neutral"
							size="sm"
							className="border-border/60 bg-bg h-8.5 w-8.5 rounded-xl"
							aria-label="Filter">
							<SlidersHorizontal className="size-3.5" />
						</IconButton>
					</div>

					{/* Right Top Actions */}
					<div className="flex items-center gap-3">
						<Button
							color="neutral"
							variant="strong"
							size="sm"
							className="bg-fg text-bg hover:bg-fg/90 h-8.5 gap-1.5 rounded-xl px-3.5 text-xs font-medium shadow-xs">
							<Share2 className="size-3.5" />
							<span>Share</span>
						</Button>

						<IconButton
							variant="ghost"
							color="neutral"
							size="sm"
							className="rounded-full"
							aria-label="Notifications">
							<Bell className="size-4" />
						</IconButton>

						<Avatar
							size="sm"
							rounded="circle"
							className="border-border cursor-pointer border">
							<AvatarImage
								src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/8.png"
								alt="User Avatar"
							/>
							<AvatarFallback className="text-xs font-semibold">
								AM
							</AvatarFallback>
						</Avatar>
					</div>
				</header>

				{/* Main Dashboard Body Container */}
				<main className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6 md:p-8">
					{/* ══════════════════════════════════════════════
              SECTION 1: TITLE & TOP SLA HEADER
          ══════════════════════════════════════════════ */}
					<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h1 className="heading-5 text-fg">
								Program task completion rate within SLA over the last 30 days
							</h1>
							<p className="text-fg-secondary mt-1 text-sm">
								How often you remediated items within SLA
							</p>
						</div>

						<div className="flex items-center gap-2 pt-2 sm:pt-0">
							<IconButton
								variant="outline"
								color="neutral"
								size="sm"
								className="border-border/60 bg-elevation-level1 h-8.5 w-8.5 rounded-xl"
								aria-label="History">
								<Clock className="size-3.5" />
							</IconButton>
							<IconButton
								variant="outline"
								color="neutral"
								size="sm"
								className="border-border/60 bg-elevation-level1 h-8.5 w-8.5 rounded-xl"
								aria-label="More options">
								<MoreHorizontal className="size-3.5" />
							</IconButton>
						</div>
					</div>

					{/* ══════════════════════════════════════════════
              SECTION 2: 3 KPI DONUT CARDS
          ══════════════════════════════════════════════ */}
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						{/* Card 1: Remediated by due date */}
						<Card className="border-border/60 bg-elevation-level1 flex flex-col justify-between rounded-2xl p-5 shadow-xs">
							<div className="flex items-start justify-between gap-4">
								<div className="flex flex-col gap-1">
									<span className="text-fg-secondary text-sm font-medium">
										Remediated by due date
									</span>
									<span className="text-fg mt-2 text-3xl font-bold tracking-tight">
										93%
									</span>
									<p className="text-fg-tertiary mt-1 text-xs leading-relaxed">
										36 of 521 task done by due date, +27% vs last month.
									</p>
								</div>
								<DonutProgress
									id="due-date"
									percentage={93}
									color="var(--color-success, #10b981)"
								/>
							</div>

							<div className="mt-4">
								<Badge
									color="success"
									variant="soft"
									size="sm"
									className="rounded-md font-medium">
									Exellent
								</Badge>
							</div>
						</Card>

						{/* Card 2: Remediated past due date */}
						<Card className="border-border/60 bg-elevation-level1 flex flex-col justify-between rounded-2xl p-5 shadow-xs">
							<div className="flex items-start justify-between gap-4">
								<div className="flex flex-col gap-1">
									<span className="text-fg-secondary text-sm font-medium">
										Remediated past due date
									</span>
									<span className="text-fg mt-2 text-3xl font-bold tracking-tight">
										14%
									</span>
									<p className="text-fg-tertiary mt-1 text-xs leading-relaxed">
										36 of 521 task done past due date, -18% vs last month.
									</p>
								</div>
								<DonutProgress
									id="past-due"
									percentage={14}
									color="var(--color-warning, #f59e0b)"
								/>
							</div>

							<div className="mt-4">
								<Badge
									color="warning"
									variant="soft"
									size="sm"
									className="rounded-md font-medium">
									Average
								</Badge>
							</div>
						</Card>

						{/* Card 3: Remediated without due date */}
						<Card className="border-border/60 bg-elevation-level1 flex flex-col justify-between rounded-2xl p-5 shadow-xs">
							<div className="flex items-start justify-between gap-4">
								<div className="flex flex-col gap-1">
									<span className="text-fg-secondary text-sm font-medium">
										Remediated without due date
									</span>
									<span className="text-fg mt-2 text-3xl font-bold tracking-tight">
										3%
									</span>
									<p className="text-fg-tertiary mt-1 text-xs leading-relaxed">
										483 of 521 task completed, +27% compared to last month.
									</p>
								</div>
								<DonutProgress
									id="without-due"
									percentage={3}
									color="var(--color-primary, #4F46E5)"
								/>
							</div>

							<div className="mt-4">
								<Badge
									color="info"
									variant="soft"
									size="sm"
									className="rounded-md font-medium">
									Good
								</Badge>
							</div>
						</Card>
					</div>

					{/* ══════════════════════════════════════════════
              SECTION 3: MIDDLE ROW (CHART & AUDITS)
          ══════════════════════════════════════════════ */}
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
						{/* Left: Framework progress Area/Line Chart */}
						<Card className="border-border/60 bg-elevation-level1 flex flex-col rounded-2xl p-6 shadow-xs lg:col-span-7">
							<CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
								<CardTitle className="heading-6 text-fg">
									Framework progress
								</CardTitle>
								<IconButton
									variant="outline"
									color="neutral"
									size="xs"
									className="border-border/60 bg-bg h-7 w-7 rounded-lg"
									aria-label="Framework options">
									<ChevronDown className="size-3.5" />
								</IconButton>
							</CardHeader>

							<CardContent className="p-0 pt-2">
								<div className="h-[280px] w-full">
									<ResponsiveContainer width="100%" height="100%">
										<ComposedChart
											data={frameworkProgressData}
											margin={{ top: 24, right: 16, left: -20, bottom: 0 }}>
											<defs>
												<linearGradient
													id="frameworkGradient"
													x1="0"
													y1="0"
													x2="0"
													y2="1">
													<stop
														offset="5%"
														stopColor="var(--color-primary, #6366f1)"
														stopOpacity={0.25}
													/>
													<stop
														offset="95%"
														stopColor="var(--color-primary, #6366f1)"
														stopOpacity={0.0}
													/>
												</linearGradient>
											</defs>

											<CartesianGrid
												vertical={false}
												strokeDasharray="3 3"
												className="stroke-border/40"
											/>

											<XAxis
												dataKey="date"
												tickLine={false}
												axisLine={false}
												tickMargin={12}
												className="fill-fg-tertiary text-[12px]"
											/>

											<YAxis
												domain={[0, 100]}
												ticks={[0, 20, 40, 60, 80, 100]}
												tickFormatter={(val) => `${val}%`}
												tickLine={false}
												axisLine={false}
												tickMargin={12}
												className="fill-fg-tertiary text-[12px]"
											/>

											<Tooltip
												content={({ active, payload }) => {
													if (!active || !payload?.length) return null
													const val = payload[0]?.value
													return (
														<div className="border-border/60 dark:bg-elevation-level2 rounded-xl border bg-white px-3 py-1.5 text-xs shadow-md">
															<span className="text-fg font-semibold">
																{val}% progress
															</span>
														</div>
													)
												}}
											/>

											{/* Solid Area curve from Feb 1 to Feb 6 */}
											<Area
												type="monotone"
												dataKey="actual"
												stroke="var(--color-primary, #6366f1)"
												strokeWidth={2.5}
												fill="url(#frameworkGradient)"
											/>

											{/* Vertical guide line at Feb 6 */}
											<ReferenceLine
												x="Feb 6"
												stroke="var(--color-primary, #6366f1)"
												strokeDasharray="3 3"
												label={{
													value: "43%",
													position: "top",
													fill: "var(--color-primary, #6366f1)",
													fontSize: 12,
													fontWeight: 600,
													className: "rounded-full bg-primary/10 px-2 py-0.5",
												}}
											/>

											{/* Projected dashed line after Feb 6 */}
											<Line
												type="monotone"
												dataKey="projected"
												stroke="var(--color-primary, #6366f1)"
												strokeWidth={2}
												strokeDasharray="4 4"
												dot={{
													r: 4,
													fill: "var(--color-primary, #6366f1)",
													stroke: "var(--color-elevation-level1, #ffffff)",
													strokeWidth: 2,
												}}
											/>
										</ComposedChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
						</Card>

						{/* Right: Audits as of today List */}
						<Card className="border-border/60 bg-elevation-level1 flex flex-col rounded-2xl p-6 shadow-xs lg:col-span-5">
							<CardHeader className="flex flex-row items-center justify-between p-0 pb-3">
								<CardTitle className="heading-6 text-fg">
									Audits as of today
								</CardTitle>
								<div className="flex items-center gap-1.5">
									<IconButton
										variant="outline"
										color="neutral"
										size="xs"
										className="border-border/60 bg-bg h-7 w-7 rounded-lg"
										aria-label="Audit history">
										<Clock className="size-3.5" />
									</IconButton>
									<IconButton
										variant="outline"
										color="neutral"
										size="xs"
										className="border-border/60 bg-bg h-7 w-7 rounded-lg"
										aria-label="Audit filter">
										<SlidersHorizontal className="size-3.5" />
									</IconButton>
								</div>
							</CardHeader>

							{/* Segmented Filter Tabs */}
							<div className="bg-fill1/60 dark:bg-fill2/40 mb-4 flex flex-wrap items-center gap-1 rounded-xl p-1">
								{(
									[
										"All",
										"Upcoming",
										"In Audits",
										"Awaiting Report",
										"Completed",
									] as const
								).map((tab) => (
									<button
										key={tab}
										type="button"
										onClick={() => setAuditFilter(tab)}
										className={cn(
											"cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
											auditFilter === tab
												? "bg-elevation-level1 text-fg shadow-xs"
												: "text-fg-secondary hover:text-fg"
										)}>
										{tab}
									</button>
								))}
							</div>

							{/* Audits Items List */}
							<div className="flex flex-col gap-2.5">
								{filteredAudits.map((item) => (
									<div
										key={item.id}
										className="border-border/50 hover:bg-fill1/40 flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-colors">
										<div className="flex items-center gap-3">
											{/* Icon Container */}
											<div className="bg-fill2/80 dark:bg-fill2/50 flex size-9 shrink-0 items-center justify-center rounded-lg">
												<BarChart3 className="text-fg-secondary size-4" />
											</div>

											{/* Info */}
											<div className="flex flex-col gap-1">
												<span className="text-fg text-xs leading-tight font-semibold">
													{item.title}
												</span>
												<div className="flex items-center gap-2 text-xs">
													{item.status === "Upcoming" && (
														<span className="flex items-center gap-1 font-medium text-sky-600 dark:text-sky-400">
															<span className="size-1.5 rounded-full bg-sky-500" />
															Upcoming
														</span>
													)}
													{item.status === "In Audits" && (
														<span className="flex items-center gap-1 font-medium text-amber-600 dark:text-amber-400">
															<span className="size-1.5 rounded-full bg-amber-500" />
															In Audits
														</span>
													)}
													{item.status === "Completed" && (
														<span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
															<span className="size-1.5 rounded-full bg-emerald-500" />
															Completed
														</span>
													)}
													<span className="text-fg-tertiary flex items-center gap-1">
														<Calendar className="size-3" />
														{item.dateRange}
													</span>
												</div>
											</div>
										</div>

										<ChevronRight className="text-fg-tertiary size-4 shrink-0" />
									</div>
								))}
							</div>
						</Card>
					</div>

					{/* ══════════════════════════════════════════════
              SECTION 4: REPORTS TABLE
          ══════════════════════════════════════════════ */}
					<Card className="border-border/60 bg-elevation-level1 gap-0 overflow-hidden rounded-2xl p-0 shadow-xs">
						<CardHeader className="border-border/60 flex flex-row items-center justify-between border-b px-6 py-4">
							<CardTitle className="heading-6 text-fg">Reports</CardTitle>
							<IconButton
								variant="outline"
								color="neutral"
								size="sm"
								className="border-border/60 bg-bg h-8 w-8 rounded-xl"
								aria-label="Filter reports">
								<SlidersHorizontal className="size-3.5" />
							</IconButton>
						</CardHeader>

						<div className="overflow-x-auto">
							<Table>
								<TableHeader className="border-border/60 bg-bg-subtle/50 dark:bg-fill1/20 border-b">
									<TableRow className="border-border/60 border-b hover:bg-transparent">
										<TableHead className="text-fg-secondary px-6 py-3 text-xs font-medium">
											Reports
										</TableHead>
										<TableHead className="text-fg-secondary px-6 py-3 text-xs font-medium">
											Created by
										</TableHead>
										<TableHead className="text-fg-secondary px-6 py-3 text-xs font-medium">
											Charts
										</TableHead>
										<TableHead className="text-fg-secondary px-6 py-3 text-xs font-medium">
											Last modified
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{reportsData.map((report) => (
										<TableRow
											key={report.id}
											className="border-border/60 hover:bg-fill1/30 border-b transition-colors">
											{/* Report Title & Subtitle */}
											<TableCell className="px-6 py-4">
												<div className="flex items-center gap-3">
													<div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
														<FileSpreadsheet className="size-4.5" />
													</div>
													<div className="flex flex-col">
														<span className="text-fg text-sm font-semibold">
															{report.title}
														</span>
														<span className="text-fg-tertiary text-xs">
															{report.subtitle}
														</span>
													</div>
												</div>
											</TableCell>

											{/* Created By with Logo */}
											<TableCell className="px-6 py-4">
												<div className="flex items-center gap-2">
													<ZippyLogo className="size-4.5 shrink-0" />
													<span className="text-fg text-sm font-medium">
														{report.createdBy}
													</span>
												</div>
											</TableCell>

											{/* Charts Badges */}
											<TableCell className="px-6 py-4">
												<div className="flex items-center gap-1.5">
													{report.charts.map((chart) => (
														<Badge
															key={chart}
															color="neutral"
															variant="soft"
															size="sm"
															className="rounded-md font-medium">
															{chart}
														</Badge>
													))}
												</div>
											</TableCell>

											{/* Last Modified */}
											<TableCell className="text-fg-secondary px-6 py-4 text-xs">
												{report.lastModified}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</Card>
				</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
