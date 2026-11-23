"use client"

import React, { useState, useRef } from "react"
import { motion } from "motion/react"
import { IconSlot } from "@/registry/icon/icon-library"
import RadianLogo from "@/registry/blocks-example/signup/components/radian-logo"
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
	SidebarSeparator,
	SidebarTrigger,
} from "@/registry/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Button, IconButton } from "@/components/ui/button"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Badge } from "@/components/ui/badge"
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/registry/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/ui/table"

export type AuditStatus =
	| "Upcoming"
	| "In Audits"
	| "Completed"
	| "Awaiting Report"

export interface SlaMetricItem {
	id: string
	title: string
	value: number
	chartValue?: number
	displayValue: string
	description: string
	descriptionLines?: [string, string, string]
	badgeLabel: string
	badgeColor: "success" | "warning" | "info"
	ringColor: string
	trackColor?: string
}

export interface ProgressDataPoint {
	date: string
	rate?: number
	projectedRate?: number
}

export interface AuditItem {
	id: string
	title: string
	status: AuditStatus
	statusColor: "info" | "warning" | "success" | "neutral"
	dateRange: string
}

export interface ReportItem {
	id: string
	title: string
	description: string
	createdBy: string
	charts: string[]
	lastModified: string
}

export const SLA_METRICS: SlaMetricItem[] = [
	{
		id: "by-due-date",
		title: "Remediated by due date",
		value: 93,
		chartValue: 62,
		displayValue: "93%",
		description: "36 of 521 task done by due date, +27% vs last month.",
		badgeLabel: "Exellent",
		badgeColor: "success",
		ringColor: "var(--color-success)",
	},
	{
		id: "past-due-date",
		title: "Remediated past due date",
		value: 14,
		chartValue: 14,
		displayValue: "14%",
		description: "36 of 521 task done past due date, -18% vs last month.",
		badgeLabel: "Average",
		badgeColor: "warning",
		ringColor: "var(--color-warning)",
	},
	{
		id: "without-due-date",
		title: "Remediated without due date",
		value: 3,
		chartValue: 7,
		displayValue: "3%",
		description: "483 of 521 task completed, +27% compared to last month.",
		badgeLabel: "Good",
		badgeColor: "info",
		ringColor: "var(--color-info)",
	},
]

export const PROGRESS_DATA: ProgressDataPoint[] = [
	{ date: "Feb 1", rate: 11 },
	{ date: "Feb 2", rate: 11 },
	{ date: "Feb 3", rate: 11 },
	{ date: "Feb 4", rate: 11 },
	{ date: "Feb 5", rate: 35 },
	{ date: "Feb 5.5", rate: 46 },
	{ date: "Feb 6", rate: 43, projectedRate: 43 },
	{ date: "Feb 10", projectedRate: 52 },
	{ date: "Feb 14", projectedRate: 43 },
	{ date: "Feb 20", projectedRate: 57 },
	{ date: "Feb 22", projectedRate: 57 },
	{ date: "Feb 24", projectedRate: 68 },
	{ date: "Feb 28", projectedRate: 75 },
]

export const AUDIT_ITEMS: AuditItem[] = [
	{
		id: "audit-1",
		title: "SOC 2 Type II - Infrastructure & Cloud Controls",
		status: "Upcoming",
		statusColor: "info",
		dateRange: "Mar 21, 2026 - Apr 12, 2026",
	},
	{
		id: "audit-2",
		title: "SOC 2 Type II - Security & Access Review",
		status: "In Audits",
		statusColor: "warning",
		dateRange: "Mar 21, 2026 - Apr 12, 2026",
	},
	{
		id: "audit-3",
		title: "SOC 2 Type II - Data Protection Assessment",
		status: "Completed",
		statusColor: "success",
		dateRange: "Mar 21, 2026 - Apr 12, 2026",
	},
	{
		id: "audit-4",
		title: "SOC 2 Type II - Vendor Risk Evaluation",
		status: "Upcoming",
		statusColor: "info",
		dateRange: "Mar 21, 2026 - Apr 12, 2026",
	},
]

export const REPORT_ITEMS: ReportItem[] = [
	{
		id: "report-1",
		title: "Project overview",
		description:
			"Gain a top level view of your compliance and security program.",
		createdBy: "Radian",
		charts: ["Tests", "Risk"],
		lastModified: "January 12, 2026",
	},
	{
		id: "report-2",
		title: "Vendor risk evaluation",
		description:
			"Review security postures and risk assessments for all active vendors.",
		createdBy: "Radian",
		charts: ["Vendor", "Security"],
		lastModified: "February 04, 2026",
	},
	{
		id: "report-3",
		title: "Access control audit",
		description:
			"Quarterly review of role-based permissions and privileged accounts.",
		createdBy: "Radian",
		charts: ["Audit", "IAM"],
		lastModified: "February 18, 2026",
	},
	{
		id: "report-4",
		title: "Data protection assessment",
		description:
			"Comprehensive analysis of encrypted storage and backup retention policies.",
		createdBy: "Radian",
		charts: ["Risk", "Storage"],
		lastModified: "March 01, 2026",
	},
]

export default function Preview11Page() {
	const [activeItem, setActiveItem] = useState("Reports")

	return (
		<div className="bg-bg text-fg font-body h-screen w-full overflow-hidden">
			<SidebarProvider
				defaultOpen
				defaultWidth="15rem"
				className="flex h-screen w-full overflow-hidden">
				<div className="flex h-screen w-full overflow-hidden">
					<Sidebar
						collapsible="none"
						className="border-border/60 bg-fill1/40 w-60 shrink-0 border-r select-none"
						style={
							{
								"--color-sidebar":
									"color-mix(in srgb, var(--color-fill1) 40%, transparent)",
							} as React.CSSProperties
						}>
						{/* Brand Header */}
						<SidebarHeader className="flex h-14 flex-row items-center justify-between px-4">
							<div className="flex items-center gap-2.5">
								<RadianLogo width={22} height={22} />
								<span className="font-heading text-sidebar-fg text-sm font-semibold tracking-tight">
									Radian
								</span>
							</div>

							{/* Collapse Icon Button */}
							<IconButton
								variant="outline"
								color="neutral"
								size="sm"
								className="border-border/70 bg-bg text-fg-secondary hover:bg-fill1/60 hover:text-fg size-7 shadow-none"
								aria-label="Collapse sidebar">
								<IconSlot slot="arrow-left-line" className="size-3.5" />
							</IconButton>
						</SidebarHeader>

						<SidebarContent className="space-y-1 px-2 py-2">
							{/* Top Core Navigation */}
							<SidebarGroup className="p-0">
								<SidebarGroupContent>
									<SidebarMenu>
										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeItem === "Home"}
												onClick={() => setActiveItem("Home")}>
												<IconSlot slot="home" className="size-4" />
												<span>Home</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeItem === "Reports"}
												onClick={() => setActiveItem("Reports")}>
												<IconSlot slot="dashboard" className="size-4" />
												<span>Reports</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>

							{/* Subtle Divider Line */}
							<SidebarSeparator className="my-2" />

							{/* Compliance & Management Section */}
							<SidebarGroup className="p-0">
								<SidebarGroupContent>
									<SidebarMenu>
										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeItem === "Compliance"}
												onClick={() => setActiveItem("Compliance")}>
												<IconSlot slot="badge-check" className="size-4" />
												<span>Compliance</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeItem === "Trust center"}
												onClick={() => setActiveItem("Trust center")}>
												<IconSlot slot="lock" className="size-4" />
												<span>Trust center</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeItem === "Risk"}
												onClick={() => setActiveItem("Risk")}>
												<IconSlot slot="alert" className="size-4" />
												<span>Risk</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeItem === "Vendor"}
												onClick={() => setActiveItem("Vendor")}>
												<IconSlot slot="store" className="size-4" />
												<span>Vendor</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeItem === "Assets"}
												onClick={() => setActiveItem("Assets")}>
												<IconSlot slot="box" className="size-4" />
												<span>Assets</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeItem === "Teams"}
												onClick={() => setActiveItem("Teams")}>
												<IconSlot slot="users" className="size-4" />
												<span>Teams</span>
											</SidebarMenuButton>
											<SidebarMenuSub className="border-border/60 my-1 ml-5 space-y-0.5 border-l pl-2">
												<SidebarMenuSubItem>
													<SidebarMenuSubButton
														size="sm"
														className="text-sm font-medium"
														isActive={activeItem === "Project manager"}
														onClick={() => setActiveItem("Project manager")}>
														<span>Project manager</span>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
												<SidebarMenuSubItem>
													<SidebarMenuSubButton
														size="sm"
														className="text-sm font-medium"
														isActive={activeItem === "Developer"}
														onClick={() => setActiveItem("Developer")}>
														<span>Developer</span>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
												<SidebarMenuSubItem>
													<SidebarMenuSubButton
														size="sm"
														className="text-sm font-medium"
														isActive={activeItem === "Quality assurance"}
														onClick={() => setActiveItem("Quality assurance")}>
														<span>Quality assurance</span>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											</SidebarMenuSub>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												size="sm"
												isActive={activeItem === "Integrations"}
												onClick={() => setActiveItem("Integrations")}>
												<IconSlot slot="link" className="size-4" />
												<span>Integrations</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						</SidebarContent>

						{/* Footer Utility Section */}
						<SidebarFooter className="border-border/50 mt-auto border-t p-2">
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton
										size="sm"
										isActive={activeItem === "API"}
										onClick={() => setActiveItem("API")}>
										<IconSlot slot="git-branch" className="size-4" />
										<span>API</span>
									</SidebarMenuButton>
								</SidebarMenuItem>

								<SidebarMenuItem>
									<SidebarMenuButton
										size="sm"
										isActive={activeItem === "Help Center"}
										onClick={() => setActiveItem("Help Center")}>
										<IconSlot slot="headphones" className="size-4" />
										<span>Help Center</span>
									</SidebarMenuButton>
								</SidebarMenuItem>

								<SidebarMenuItem>
									<SidebarMenuButton
										size="sm"
										isActive={activeItem === "Settings"}
										onClick={() => setActiveItem("Settings")}>
										<IconSlot slot="setting" className="size-4" />
										<span>Settings</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarFooter>
					</Sidebar>

					<SidebarInset className="bg-bg flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
						<header className="border-border/60 bg-fill1/40 sticky top-0 z-20 flex w-full shrink-0 items-center justify-between border-b px-[24px] py-[12px] backdrop-blur-md">
							{/* Left controls: Sidebar trigger on mobile, Search, Date Range Filter */}
							<div className="flex items-center gap-2 sm:gap-3">
								<SidebarTrigger
									variant="ghost"
									color="neutral"
									size="sm"
									className="md:hidden"
								/>

								<InputWrapper
									size="sm"
									className="border-border/80 bg-fill1/40 w-44 sm:w-64">
									<IconSlot slot="search" className="text-fg-tertiary size-4" />
									<Input placeholder="Search...." className="text-xs" />
								</InputWrapper>

								<Button
									variant="outline"
									color="neutral"
									size="sm"
									className="text-fg-secondary border-border/80 bg-bg hover:bg-fill1/60 hover:text-fg hidden h-8 gap-1.5 text-xs font-normal shadow-none sm:inline-flex">
									<IconSlot slot="calendar" className="size-3.5" />
									<span>Last 30 days</span>
									<IconSlot
										slot="chevrons-up-down"
										className="text-fg-tertiary size-3"
									/>
								</Button>

								<IconButton
									variant="outline"
									color="neutral"
									size="sm"
									className="border-border/80 bg-bg text-fg-secondary hover:bg-fill1/60 hover:text-fg size-8 shadow-none"
									aria-label="Filter">
									<IconSlot slot="settings-2" className="size-3.5" />
								</IconButton>
							</div>

							{/* Right actions: Share, Notifications, Help, User Avatar */}
							<div className="flex items-center gap-2">
								<Button
									variant="strong"
									color="neutral"
									size="sm"
									className="bg-fg text-bg h-8 gap-1.5 px-3 text-xs font-medium hover:opacity-90">
									<IconSlot slot="external-link" className="size-3.5" />
									<span>Share</span>
								</Button>

								<IconButton
									variant="ghost"
									color="neutral"
									size="sm"
									className="text-fg-secondary relative size-8"
									aria-label="Notifications">
									<IconSlot slot="bell" className="size-4" />
									<span className="bg-primary ring-bg absolute top-1.5 right-1.5 size-1.5 rounded-full ring-2" />
								</IconButton>

								<IconButton
									variant="ghost"
									color="neutral"
									size="sm"
									className="text-fg-secondary size-8"
									aria-label="Help">
									<IconSlot slot="help-circle" className="size-4" />
								</IconButton>

								<div className="pl-1">
									<Avatar
										size="sm"
										rounded="circle"
										className="border-border size-8 shrink-0 overflow-hidden border">
										<AvatarImage
											src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/2.png"
											alt="User avatar"
											className="size-full object-cover"
										/>
										<AvatarFallback className="text-xs font-semibold">
											JD
										</AvatarFallback>
									</Avatar>
								</div>
							</div>
						</header>

						<main className="bg-bg flex-1 overflow-y-auto px-[24px] pt-[24px] pb-[24px]">
							<div className="flex w-full flex-col gap-[16px]">
								{/* Top Metric Cards */}
								<section className="flex flex-col gap-[24px]">
									{/* Header title & actions */}
									<div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
										<div>
											<h2 className="font-heading text-fg text-[18px] leading-snug font-semibold">
												Program task completion rate within SLA over the last 30
												days
											</h2>
											<p className="text-fg-secondary text-[14px]">
												How ofter you remediated items within SLA
											</p>
										</div>
										<div className="flex items-center gap-1.5 self-start sm:self-auto">
											<IconButton
												variant="outline"
												color="neutral"
												size="sm"
												className="border-border/70 bg-bg text-fg-secondary hover:bg-fill1/60 hover:text-fg size-7 shadow-none"
												aria-label="History">
												<IconSlot slot="clock" className="size-3.5" />
											</IconButton>
											<IconButton
												variant="outline"
												color="neutral"
												size="sm"
												className="border-border/70 bg-bg text-fg-secondary hover:bg-fill1/60 hover:text-fg size-7 shadow-none"
												aria-label="More options">
												<IconSlot slot="threeDot" className="size-3.5" />
											</IconButton>
										</div>
									</div>

									{/* Metric cards grid: column gap 12px, row gap 16px */}
									<div className="grid grid-cols-1 gap-x-[12px] gap-y-[16px] md:grid-cols-3">
										{SLA_METRICS.map((metric) => (
											<MetricDonutCard key={metric.id} metric={metric} />
										))}
									</div>
								</section>

								{/* Middle Row: Framework Progress Area Chart & Audits List */}
								<div className="grid grid-cols-1 gap-x-[12px] gap-y-[16px] lg:grid-cols-2">
									<FrameworkProgressChart />
									<AuditsCard />
								</div>

								{/* Bottom Row: Reports Overview Table */}
								<ReportsCard />
							</div>
						</main>
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	)
}

export function FrameworkProgressChart() {
	const svgRef = useRef<SVGSVGElement>(null)
	const [activePointIndex, setActivePointIndex] = useState<number>(1) // Default to Feb 6 (43%)
	const [isHovered, setIsHovered] = useState<boolean>(false)

	// Y-axis grid coordinates spanning full chart height (0% to 100%)
	const gridLines = [
		{ label: "100%", y: 28 },
		{ label: "80%", y: 76 },
		{ label: "60%", y: 124 },
		{ label: "40%", y: 172 },
		{ label: "20%", y: 220 },
		{ label: "0%", y: 268 },
	]

	// Key dates with rates and coordinates
	const datePoints = [
		{ label: "Feb 1", x: 45, y: 241.6, rate: 11 },
		{ label: "Feb 6", x: 115, y: 164.8, rate: 43 },
		{ label: "Feb 10", x: 180, y: 143.2, rate: 52 },
		{ label: "Feb 14", x: 245, y: 164.8, rate: 43 },
		{ label: "Feb 20", x: 325, y: 131.2, rate: 57 },
		{ label: "Feb 24", x: 400, y: 104.8, rate: 68 },
		{ label: "Feb 28", x: 475, y: 88.0, rate: 75 },
	]

	// Milestone dots on projection curve
	const projectionDots = [
		{ x: 180, y: 143.2 },
		{ x: 245, y: 164.8 },
		{ x: 325, y: 131.2 },
		{ x: 360, y: 131.2 },
		{ x: 400, y: 104.8 },
		{ x: 475, y: 88.0 },
	]

	const activePoint = datePoints[activePointIndex] ?? datePoints[1]

	const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
		if (!svgRef.current) return
		const rect = svgRef.current.getBoundingClientRect()
		const mouseX = ((e.clientX - rect.left) / rect.width) * 500
		let closestIndex = 0
		let minDiff = Infinity
		datePoints.forEach((pt, i) => {
			const diff = Math.abs(pt.x - mouseX)
			if (diff < minDiff) {
				minDiff = diff
				closestIndex = i
			}
		})
		setActivePointIndex(closestIndex)
		setIsHovered(true)
	}

	const handlePointerLeave = () => {
		setIsHovered(false)
		setActivePointIndex(1) // Return to Feb 6 milestone
	}

	return (
		<Card className="bg-fill1/40 border-border/70 flex h-full flex-col gap-0 overflow-hidden rounded-xl p-0 py-0 shadow-none">
			<CardHeader className="border-border/60 flex items-center justify-between gap-0 border-b px-5 py-4">
				<CardTitle className="font-heading text-fg text-[16px] leading-normal font-semibold">
					Framework progress
				</CardTitle>
				<CardAction>
					<IconButton
						variant="outline"
						color="neutral"
						size="sm"
						className="border-border/70 bg-bg text-fg-secondary hover:bg-fill1/60 hover:text-fg size-7 shadow-none"
						aria-label="Expand options">
						<IconSlot slot="down" className="size-3.5" />
					</IconButton>
				</CardAction>
			</CardHeader>

			<CardContent className="flex flex-1 flex-col p-0 px-4 pt-3 pb-4">
				<div className="relative flex h-full min-h-[300px] flex-1 select-none">
					<svg
						ref={svgRef}
						viewBox="0 0 500 300"
						onPointerMove={handlePointerMove}
						onPointerLeave={handlePointerLeave}
						className="size-full cursor-crosshair overflow-visible"
						preserveAspectRatio="none">
						<defs>
							<linearGradient
								id="frameworkSolidFill"
								x1="0"
								y1="0"
								x2="0"
								y2="1">
								<stop
									offset="0%"
									stopColor="var(--color-primary)"
									stopOpacity={0.25}
								/>
								<stop
									offset="100%"
									stopColor="var(--color-primary)"
									stopOpacity={0.01}
								/>
							</linearGradient>
						</defs>

						{/* Horizontal grid lines */}
						{gridLines.map((grid) => (
							<g key={grid.label}>
								<line
									x1="32"
									y1={grid.y}
									x2="495"
									y2={grid.y}
									stroke="var(--color-border)"
									strokeWidth="1"
									strokeDasharray="3 3"
									opacity={0.65}
								/>
								<text
									x="26"
									y={grid.y + 4}
									textAnchor="end"
									fill="var(--color-fg-secondary)"
									fontSize="11"
									fontWeight="400">
									{grid.label}
								</text>
							</g>
						))}

						{/* X-axis date labels */}
						{datePoints.map((date, i) => {
							const isCurrent = i === activePointIndex
							return (
								<text
									key={date.label}
									x={date.x}
									y="290"
									textAnchor="middle"
									fill={
										isCurrent
											? "var(--color-primary)"
											: "var(--color-fg-secondary)"
									}
									fontSize="11"
									fontWeight={isCurrent ? "600" : "400"}
									className="transition-colors duration-150">
									{date.label}
								</text>
							)
						})}

						{/* Shaded area under the entire curve */}
						<path
							d="M 45 268 L 45 241.6 L 90 241.6 C 98 241.6, 102 152.8, 106 152.8 C 110 152.8, 112 164.8, 115 164.8 L 150 164.8 C 162 164.8, 172 143.2, 180 143.2 C 205 143.2, 220 164.8, 245 164.8 C 272 164.8, 298 131.2, 325 131.2 L 360 131.2 C 375 131.2, 388 104.8, 400 104.8 C 420 104.8, 445 94, 458 92 C 465 90, 470 88, 475 88 C 482 88, 488 92, 495 92 L 495 268 Z"
							fill="url(#frameworkSolidFill)"
						/>

						{/* Historical solid curve */}
						<path
							d="M 45 241.6 L 90 241.6 C 98 241.6, 102 152.8, 106 152.8 C 110 152.8, 112 164.8, 115 164.8"
							fill="none"
							stroke="var(--color-primary)"
							strokeWidth="2"
							strokeLinecap="round"
						/>

						{/* Projected dashed curve */}
						<path
							d="M 115 164.8 L 150 164.8 C 162 164.8, 172 143.2, 180 143.2 C 205 143.2, 220 164.8, 245 164.8 C 272 164.8, 298 131.2, 325 131.2 L 360 131.2 C 375 131.2, 388 104.8, 400 104.8 C 420 104.8, 445 94, 458 92 C 465 90, 470 88, 475 88 C 482 88, 488 92, 495 92"
							fill="none"
							stroke="var(--color-primary)"
							strokeWidth="2"
							strokeDasharray="4 4"
							strokeLinecap="round"
						/>

						{/* Milestone dots */}
						{projectionDots.map((dot, index) => (
							<circle
								key={`proj-dot-${index}`}
								cx={dot.x}
								cy={dot.y}
								r="4.5"
								fill="var(--color-primary)"
								stroke="var(--color-bg)"
								strokeWidth="2"
							/>
						))}

						{/* Interactive active indicator line and callout */}
						<g pointerEvents="none">
							{/* Vertical dashed line from bottom (y=268) up to curve point */}
							<motion.line
								initial={false}
								animate={{
									x1: activePoint.x,
									y1: 268,
									x2: activePoint.x,
									y2: activePoint.y,
								}}
								transition={{ type: "spring", stiffness: 450, damping: 35 }}
								stroke="var(--color-primary)"
								strokeWidth="1.5"
								strokeDasharray="3 3"
							/>

							{/* Outer glowing halo ring on the active point */}
							<motion.circle
								initial={false}
								animate={{
									cx: activePoint.x,
									cy: activePoint.y,
									r: isHovered ? 9 : 6.5,
								}}
								transition={{ type: "spring", stiffness: 450, damping: 35 }}
								fill="var(--color-primary)"
								opacity="0.2"
							/>

							{/* Active milestone dot on the curve */}
							<motion.circle
								initial={false}
								animate={{
									cx: activePoint.x,
									cy: activePoint.y,
								}}
								transition={{ type: "spring", stiffness: 450, damping: 35 }}
								r="4.5"
								fill="var(--color-primary)"
								stroke="var(--color-bg)"
								strokeWidth="2"
							/>

							{/* Vertical solid line from milestone point up to callout badge */}
							<motion.line
								initial={false}
								animate={{
									x1: activePoint.x,
									y1: activePoint.y,
									x2: activePoint.x,
									y2: 48,
								}}
								transition={{ type: "spring", stiffness: 450, damping: 35 }}
								stroke="var(--color-primary)"
								strokeWidth="1.5"
							/>

							{/* Callout Pill Badge showing exact percentage */}
							<motion.g
								initial={false}
								animate={{
									x: activePoint.x,
									y: 36,
								}}
								transition={{ type: "spring", stiffness: 450, damping: 35 }}>
								<rect
									x="-19"
									y="-11"
									width="38"
									height="22"
									rx="6"
									fill="var(--color-primary-accent)"
									stroke="var(--color-primary-border)"
									strokeWidth="1"
								/>
								<text
									x="0"
									y="3.5"
									textAnchor="middle"
									fill="var(--color-primary-text)"
									fontSize="11"
									fontWeight="600">
									{activePoint.rate}%
								</text>
							</motion.g>
						</g>
					</svg>
				</div>
			</CardContent>
		</Card>
	)
}

interface MetricDonutCardProps {
	metric: SlaMetricItem
}

export function MetricDonutCard({ metric }: MetricDonutCardProps) {
	const radius = 34
	const circumference = 2 * Math.PI * radius
	const chartValue = metric.chartValue ?? metric.value
	const strokeDash = (chartValue / 100) * circumference

	return (
		<Card className="bg-fill1/40 border-border/70 flex flex-col gap-0 overflow-hidden rounded-xl p-0 py-0 shadow-none">
			<CardHeader className="border-border/60 gap-0 border-b px-5 pt-3 pb-3! [.border-b]:pb-3">
				<CardTitle className="font-heading text-fg text-[14px] leading-normal font-semibold">
					{metric.title}
				</CardTitle>
			</CardHeader>

			<CardContent className="flex flex-1 items-center justify-between gap-4 p-6">
				<div className="flex min-w-0 flex-1 flex-col justify-between self-stretch py-0.5">
					<div>
						<div className="font-heading text-fg text-[24px] leading-tight font-semibold">
							{metric.displayValue}
						</div>
						<p className="text-fg-secondary mt-2 text-[14px] leading-[19px]">
							{metric.description}
						</p>
					</div>

					<div className="mt-3.5">
						<Badge variant="soft" color={metric.badgeColor} size="sm">
							{metric.badgeLabel}
						</Badge>
					</div>
				</div>

				{/* Chunky Donut Chart */}
				<div className="relative size-[88px] shrink-0">
					<svg viewBox="0 0 88 88" className="size-full -rotate-90">
						<circle
							cx="44"
							cy="44"
							r={radius}
							fill="none"
							stroke="var(--color-fill3)"
							strokeWidth="14"
						/>
						<circle
							cx="44"
							cy="44"
							r={radius}
							fill="none"
							stroke={metric.ringColor}
							strokeWidth="14"
							strokeDasharray={`${strokeDash} ${circumference}`}
							strokeDashoffset={0}
						/>
					</svg>
				</div>
			</CardContent>
		</Card>
	)
}

const FILTER_TABS: (AuditStatus | "All")[] = [
	"All",
	"Upcoming",
	"In Audits",
	"Awaiting Report",
	"Completed",
]

export function AuditsCard() {
	const [activeTab, setActiveTab] = useState<AuditStatus | "All">("All")

	const filteredAudits =
		activeTab === "All"
			? AUDIT_ITEMS
			: AUDIT_ITEMS.filter((audit) => audit.status === activeTab)

	return (
		<Card className="bg-fill1/40 border-border/70 flex h-full flex-col gap-0 overflow-hidden rounded-xl p-0 py-0 shadow-none">
			<CardHeader className="border-border/60 flex items-center justify-between gap-0 border-b px-5 py-4">
				<CardTitle className="font-heading text-fg text-[16px] leading-normal font-semibold">
					Audits as of today
				</CardTitle>
				<CardAction className="flex items-center gap-1.5">
					<IconButton
						variant="outline"
						color="neutral"
						size="sm"
						className="border-border/70 bg-bg text-fg-secondary hover:bg-fill1/60 hover:text-fg size-7 shadow-none"
						aria-label="Audit history">
						<IconSlot slot="clock" className="size-3.5" />
					</IconButton>
					<IconButton
						variant="outline"
						color="neutral"
						size="sm"
						className="border-border/70 bg-bg text-fg-secondary hover:bg-fill1/60 hover:text-fg size-7 shadow-none"
						aria-label="Audit filter">
						<IconSlot slot="settings-2" className="size-3.5" />
					</IconButton>
				</CardAction>
			</CardHeader>

			<CardContent className="flex flex-1 flex-col justify-between gap-4 p-5 pt-3.5">
				{/* Radian UI segmented Tabs component */}
				<Tabs
					value={activeTab}
					onValueChange={(val) => setActiveTab(val as AuditStatus | "All")}
					className="w-full">
					<TabsList width="full" variant="default">
						{FILTER_TABS.map((tab) => (
							<TabsTrigger key={tab} value={tab} className="text-xs">
								{tab}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>

				{/* Audits Item List */}
				<div className="divide-border/60 flex flex-1 flex-col justify-between divide-y">
					{filteredAudits.map((audit) => {
						const statusDotColor =
							audit.status === "Upcoming"
								? "bg-info"
								: audit.status === "In Audits"
									? "bg-warning"
									: audit.status === "Completed"
										? "bg-success"
										: "bg-primary"

						const statusTextColor =
							audit.status === "Upcoming"
								? "text-info-text"
								: audit.status === "In Audits"
									? "text-warning-text"
									: audit.status === "Completed"
										? "text-success-text"
										: "text-primary-text"

						return (
							<div
								key={audit.id}
								className="hover:bg-fill1/30 flex flex-1 items-center justify-between py-4 transition-colors">
								<div className="flex items-center gap-3">
									<div className="border-border/60 bg-fill1/60 text-fg-secondary flex size-9 shrink-0 items-center justify-center rounded-lg border">
										<IconSlot slot="bar-chart" className="size-4" />
									</div>

									<div className="flex flex-col gap-1">
										<span className="text-fg text-xs font-semibold sm:text-sm">
											{audit.title}
										</span>
										<div className="text-fg-secondary flex items-center gap-2 text-xs">
											<div className="flex items-center gap-1.5 font-medium">
												<span
													className={`size-1.5 rounded-full ${statusDotColor}`}
												/>
												<span className={statusTextColor}>{audit.status}</span>
											</div>
											<span className="text-fg-tertiary">·</span>
											<div className="text-fg-tertiary flex items-center gap-1">
												<IconSlot slot="calendar" className="size-3" />
												<span>{audit.dateRange}</span>
											</div>
										</div>
									</div>
								</div>

								<IconButton
									variant="outline"
									color="neutral"
									size="sm"
									className="border-border/60 bg-bg text-fg-secondary hover:bg-fill1/60 hover:text-fg size-7 shadow-none"
									aria-label={`View ${audit.title}`}>
									<IconSlot slot="right" className="size-3.5" />
								</IconButton>
							</div>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}

export function ReportsCard() {
	return (
		<Card className="bg-bg border-border/70 gap-0 overflow-hidden rounded-xl p-0 py-0 shadow-none">
			<CardHeader className="border-border/60 flex items-center justify-between gap-0 border-b px-5 pt-3 pb-3! [.border-b]:pb-3">
				<CardTitle className="font-heading text-fg text-[16px] leading-normal font-semibold">
					Reports
				</CardTitle>
				<CardAction>
					<IconButton
						variant="outline"
						color="neutral"
						size="sm"
						className="border-border/70 bg-bg text-fg-secondary hover:bg-fill1/60 hover:text-fg size-7 shadow-none"
						aria-label="Filter reports">
						<IconSlot slot="settings-2" className="size-3.5" />
					</IconButton>
				</CardAction>
			</CardHeader>
			<CardContent className="p-0">
				<Table>
					<TableHeader>
						<TableRow className="border-border/60 border-b">
							<TableHead className="text-fg-tertiary px-5 py-2.5 text-xs font-medium">
								Reports
							</TableHead>
							<TableHead className="text-fg-tertiary px-5 py-2.5 text-xs font-medium">
								Created by
							</TableHead>
							<TableHead className="text-fg-tertiary px-5 py-2.5 text-xs font-medium">
								Charts
							</TableHead>
							<TableHead className="text-fg-tertiary px-5 py-2.5 text-xs font-medium">
								Last modified
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="divide-border/60 divide-y">
						{REPORT_ITEMS.map((item) => (
							<TableRow
								key={item.id}
								className="border-border/60 hover:bg-fill1/40 border-b transition-colors">
								<TableCell className="px-5 py-3.5">
									<div className="flex items-center gap-3">
										<div className="bg-success-accent text-success-text flex size-9 shrink-0 items-center justify-center rounded-lg">
											<IconSlot slot="file-text" className="size-4" />
										</div>
										<div className="flex flex-col gap-0.5">
											<span className="text-fg text-sm font-semibold">
												{item.title}
											</span>
											<span className="text-fg-secondary text-xs">
												{item.description}
											</span>
										</div>
									</div>
								</TableCell>
								<TableCell className="px-5 py-3.5">
									<div className="text-fg-secondary flex items-center gap-1.5 text-xs font-medium">
										<RadianLogo width={14} height={14} />
										<span>{item.createdBy}</span>
									</div>
								</TableCell>
								<TableCell className="px-5 py-3.5">
									<div className="flex items-center gap-1.5">
										{item.charts.map((chart) => (
											<Badge
												key={chart}
												variant="soft"
												color="neutral"
												size="sm">
												{chart}
											</Badge>
										))}
									</div>
								</TableCell>
								<TableCell className="text-fg-secondary px-5 py-3.5 text-xs">
									{item.lastModified}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
