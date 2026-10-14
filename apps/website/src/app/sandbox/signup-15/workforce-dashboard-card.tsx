"use client"

import React from "react"
import { ChevronDown, X, Flag, Check } from "lucide-react"
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/styles/default/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"
import { Input } from "@/styles/default/ui/input"
import { Progress } from "@/styles/default/ui/progress"
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "@/styles/default/ui/table"

export function WorkforceDashboardCard() {
	return (
		<div className="relative mx-auto w-[440px] max-w-full sm:w-[470px]">
			{/* Main Mockup Stage Container */}
			<div className="relative w-full">
				{/* 1. Main Dashboard Card */}
				<div className="border-border/30 bg-fill1-alpha relative rounded-[22px] border p-1.5 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md">
					<Card className="border-border bg-card text-fg w-full gap-3 rounded-[18px] border p-3.5 shadow-sm sm:p-4">
						{/* Header Bar */}
						<CardHeader className="flex flex-row items-center justify-between p-0">
							{/* Left: Title */}
							<CardTitle className="text-fg text-sm font-bold tracking-tight">
								Dashboard
							</CardTitle>

							{/* Right: Team Avatars + Add Member Button */}
							<div className="flex items-center gap-2">
								{/* Overlapping Avatar Cluster */}
								<div className="flex -space-x-2">
									<Avatar
										size="24"
										rounded="circle"
										className="border-card border-2 shadow-2xs">
										<AvatarImage
											src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/1.png"
											alt="Sarah"
										/>
										<AvatarFallback className="text-[8.5px]">S</AvatarFallback>
									</Avatar>
									<Avatar
										size="24"
										rounded="circle"
										className="border-card border-2 shadow-2xs">
										<AvatarImage
											src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/2.png"
											alt="Alex"
										/>
										<AvatarFallback className="text-[8.5px]">A</AvatarFallback>
									</Avatar>
									<Avatar
										size="24"
										rounded="circle"
										className="border-card border-2 shadow-2xs">
										<AvatarImage
											src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/3.png"
											alt="Elena"
										/>
										<AvatarFallback className="text-[8.5px]">E</AvatarFallback>
									</Avatar>
									<Badge
										variant="soft"
										color="primary"
										size="20"
										className="border-card h-6 rounded-full border-2 px-1.5 text-[8.5px] font-bold shadow-2xs">
										+2
									</Badge>
								</div>

								{/* Add members button using canonical Button */}
								<Button
									variant="soft"
									color="primary"
									size="28"
									className="h-6 rounded-md px-2 text-[9.5px] font-semibold">
									Add members +
								</Button>
							</div>
						</CardHeader>

						{/* Top Metrics Section (2 KPI Cards using canonical Card & Badge) */}
						<div className="grid grid-cols-2 gap-2.5 pt-0.5">
							{/* KPI 1: Productive Time / Day */}
							<Card className="border-border bg-fill1 gap-1 rounded-xl border p-2.5 shadow-2xs">
								<span className="text-fg-tertiary text-[9.5px] font-medium">
									Productive Time / Day
								</span>

								<div className="flex items-end justify-between">
									<div>
										<div className="text-fg text-base font-bold tracking-tight">
											12.4 hr
										</div>
										<Badge
											variant="soft"
											color="success"
											size="20"
											className="mt-0.5 h-4 gap-0.5 px-1.5 text-[8px] font-semibold">
											<Check className="size-2.5 stroke-[2.5]" />
											+23% last week
										</Badge>
									</div>

									{/* Sparkline Wave with 23% Crest */}
									<div className="relative h-7 w-20">
										<div className="text-primary absolute -top-1.5 right-4 text-[7.5px] font-bold">
											23%
										</div>
										<svg
											viewBox="0 0 100 30"
											className="text-primary h-full w-full overflow-visible">
											<defs>
												<linearGradient
													id="sparkline-fill"
													x1="0"
													y1="0"
													x2="0"
													y2="1">
													<stop
														offset="0%"
														stopColor="var(--color-primary)"
														stopOpacity="0.3"
													/>
													<stop
														offset="100%"
														stopColor="var(--color-primary)"
														stopOpacity="0"
													/>
												</linearGradient>
											</defs>
											<path
												d="M0,22 C20,20 40,26 60,10 C75,0 85,16 100,6 L100,30 L0,30 Z"
												fill="url(#sparkline-fill)"
											/>
											<path
												d="M0,22 C20,20 40,26 60,10 C75,0 85,16 100,6"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<circle cx="60" cy="10" r="2.5" fill="currentColor" />
										</svg>
									</div>
								</div>
							</Card>

							{/* KPI 2: Focused Time */}
							<Card className="border-border bg-fill1 gap-1 rounded-xl border p-2.5 shadow-2xs">
								<span className="text-fg-tertiary text-[9.5px] font-medium">
									Focused Time
								</span>

								<div className="flex items-end justify-between">
									<div>
										<div className="text-fg text-base font-bold tracking-tight">
											8.5 hr
										</div>
										<Badge
											variant="soft"
											color="success"
											size="20"
											className="mt-0.5 h-4 gap-0.5 px-1.5 text-[8px] font-semibold">
											<Check className="size-2.5 stroke-[2.5]" />
											+18% last week
										</Badge>
									</div>
								</div>
							</Card>
						</div>

						{/* Team's Utilization Table Section using canonical Table components */}
						<CardContent className="p-0 pt-0.5">
							<div className="mb-1.5 flex items-center justify-between">
								<span className="text-fg text-xs font-bold">
									Team&apos;s Utilization
								</span>
							</div>

							<Table className="w-full text-[9px]">
								<TableHeader>
									<TableRow className="border-border text-fg-tertiary border-b text-[8.5px] hover:bg-transparent">
										<TableHead className="h-6 px-1.5 py-0 font-medium">
											Team Name
										</TableHead>
										<TableHead className="h-6 px-1.5 py-0 text-center font-medium">
											Utilization
										</TableHead>
										<TableHead className="h-6 px-1.5 py-0 text-center font-medium">
											Over
										</TableHead>
										<TableHead className="h-6 px-1.5 py-0 text-center font-medium">
											Under
										</TableHead>
										<TableHead className="h-6 px-1.5 py-0 text-right font-medium">
											Activity
										</TableHead>
									</TableRow>
								</TableHeader>

								<TableBody>
									{/* Marketing */}
									<TableRow className="border-border/50 hover:bg-fill1-alpha border-b">
										<TableCell className="p-1.5 font-medium">
											<div className="flex items-center gap-1.5">
												<div className="bg-primary text-primary-fg flex size-4.5 items-center justify-center rounded-full text-[8px] font-bold">
													M
												</div>
												<span className="text-fg font-semibold">Marketing</span>
											</div>
										</TableCell>
										<TableCell className="p-1.5 text-center">
											<Badge
												variant="soft"
												color="error"
												size="20"
												className="h-4 gap-0.5 px-1.5 text-[7.5px]">
												<Flag className="size-2 fill-current" /> HIGH
											</Badge>
										</TableCell>
										<TableCell className="text-fg-secondary p-1.5 text-center">
											40%
										</TableCell>
										<TableCell className="text-fg-secondary p-1.5 text-center">
											20%
										</TableCell>
										<TableCell className="p-1.5 text-right">
											<div className="flex items-center justify-end gap-1.5">
												<Progress
													value={80}
													className="bg-fill2 h-1.5 w-12"
													indicatorClassName="bg-primary"
												/>
												<span className="text-fg-tertiary text-[8px] font-medium">
													18h
												</span>
											</div>
										</TableCell>
									</TableRow>

									{/* Customer Success */}
									<TableRow className="border-border/50 hover:bg-fill1-alpha border-b">
										<TableCell className="p-1.5 font-medium">
											<div className="flex items-center gap-1.5">
												<div className="bg-warning text-warning-fg flex size-4.5 items-center justify-center rounded-full text-[8px] font-bold">
													C
												</div>
												<span className="text-fg font-semibold">Support</span>
											</div>
										</TableCell>
										<TableCell className="p-1.5 text-center">
											<Badge
												variant="soft"
												color="success"
												size="20"
												className="h-4 gap-0.5 px-1.5 text-[7.5px]">
												<Flag className="size-2 fill-current" /> MED
											</Badge>
										</TableCell>
										<TableCell className="text-fg-secondary p-1.5 text-center">
											25%
										</TableCell>
										<TableCell className="text-fg-secondary p-1.5 text-center">
											30%
										</TableCell>
										<TableCell className="p-1.5 text-right">
											<div className="flex items-center justify-end gap-1.5">
												<Progress
													value={55}
													className="bg-fill2 h-1.5 w-12"
													indicatorClassName="bg-primary"
												/>
												<span className="text-fg-tertiary text-[8px] font-medium">
													12h
												</span>
											</div>
										</TableCell>
									</TableRow>

									{/* Dev Team */}
									<TableRow className="border-border/50 hover:bg-fill1-alpha border-b">
										<TableCell className="p-1.5 font-medium">
											<div className="flex items-center gap-1.5">
												<div className="bg-info text-info-fg flex size-4.5 items-center justify-center rounded-full text-[8px] font-bold">
													D
												</div>
												<span className="text-fg font-semibold">
													Engineering
												</span>
											</div>
										</TableCell>
										<TableCell className="p-1.5 text-center">
											<Badge
												variant="soft"
												color="neutral"
												size="20"
												className="h-4 gap-0.5 px-1.5 text-[7.5px]">
												<Flag className="size-2 fill-current" /> LOW
											</Badge>
										</TableCell>
										<TableCell className="text-fg-secondary p-1.5 text-center">
											02%
										</TableCell>
										<TableCell className="text-fg-secondary p-1.5 text-center">
											60%
										</TableCell>
										<TableCell className="p-1.5 text-right">
											<div className="flex items-center justify-end gap-1.5">
												<Progress
													value={40}
													className="bg-fill2 h-1.5 w-12"
													indicatorClassName="bg-primary"
												/>
												<span className="text-fg-tertiary text-[8px] font-medium">
													8h
												</span>
											</div>
										</TableCell>
									</TableRow>

									{/* Design Team */}
									<TableRow className="hover:bg-fill1-alpha border-0">
										<TableCell className="p-1.5 font-medium">
											<div className="flex items-center gap-1.5">
												<div className="bg-primary/80 text-primary-fg flex size-4.5 items-center justify-center rounded-full text-[8px] font-bold">
													P
												</div>
												<span className="text-fg font-semibold">
													Design Team
												</span>
											</div>
										</TableCell>
										<TableCell className="p-1.5 text-center">
											<Badge
												variant="soft"
												color="neutral"
												size="20"
												className="h-4 gap-0.5 px-1.5 text-[7.5px]">
												<Flag className="size-2 fill-current" /> LOW
											</Badge>
										</TableCell>
										<TableCell className="text-fg-secondary p-1.5 text-center">
											05%
										</TableCell>
										<TableCell className="text-fg-secondary p-1.5 text-center">
											65%
										</TableCell>
										<TableCell className="p-1.5 text-right">
											<div className="flex items-center justify-end gap-1.5">
												<Progress
													value={65}
													className="bg-fill2 h-1.5 w-12"
													indicatorClassName="bg-primary"
												/>
												<span className="text-fg-tertiary text-[8px] font-medium">
													14h
												</span>
											</div>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>

				{/* 2. Overlapping "Add Member" Modal Dialog using canonical components */}
				<div className="absolute top-[18%] -right-3 z-20 w-[240px] translate-y-[120px] sm:-right-6 sm:w-[255px]">
					<div className="border-border/30 bg-fill1-alpha relative rounded-[20px] border p-1 shadow-[0_20px_45px_-8px_rgba(0,0,0,0.4)] backdrop-blur-md">
						<Card className="border-border bg-card text-fg w-full gap-2.5 rounded-[16px] border p-3 shadow-sm">
							{/* Modal Header */}
							<CardHeader className="flex flex-row items-center justify-between p-0">
								<CardTitle className="text-fg text-xs font-bold">
									Add Member
								</CardTitle>
								<Button
									variant="ghost"
									color="neutral"
									size="28"
									className="text-fg-tertiary hover:bg-fill1-alpha hover:text-fg size-5 rounded-full p-0"
									aria-label="Close modal">
									<X className="size-3 stroke-[2.5]" />
								</Button>
							</CardHeader>

							{/* Invite Email & Role Row using canonical Input & Button */}
							<div className="pt-0.5">
								<span className="text-fg-tertiary text-[8.5px] font-medium">
									Email
								</span>
								<div className="mt-1 flex items-center gap-1.5">
									<div className="relative flex-1">
										<Input
											size="28"
											readOnly
											defaultValue="rafiqur51@gmail.com"
											className="border-border bg-fill1 text-fg h-7 rounded-md px-2 pr-11 text-[9px]"
										/>
										<span className="text-fg-secondary pointer-events-none absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-0.5 text-[8px] font-medium">
											Viewer <ChevronDown className="text-fg-tertiary size-2" />
										</span>
									</div>

									{/* Send Invite Button using canonical Button */}
									<Button
										variant="strong"
										color="primary"
										size="28"
										className="h-7 shrink-0 rounded-md px-2.5 text-[8.5px] font-semibold shadow-2xs">
										Invite
									</Button>
								</div>
							</div>

							{/* Members List using canonical Avatar & Badge */}
							<div className="flex flex-col gap-2 pt-0.5">
								<span className="text-fg-tertiary text-[8.5px] font-medium">
									Members
								</span>

								{/* Member 1: Leslie Alexander */}
								<div className="flex items-center justify-between text-[9px]">
									<div className="flex items-center gap-2">
										<Avatar size="24" rounded="circle">
											<AvatarImage
												src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/4.png"
												alt="Leslie"
											/>
											<AvatarFallback className="text-[8px]">L</AvatarFallback>
										</Avatar>
										<div>
											<div className="text-fg flex items-center gap-1 font-semibold">
												Leslie Alexander
												<Badge
													variant="soft"
													color="primary"
													size="20"
													className="h-3.5 px-1 text-[7px]">
													You
												</Badge>
											</div>
											<div className="text-fg-tertiary text-[8px]">
												sanders.alex@example.com
											</div>
										</div>
									</div>
									<div className="flex items-center gap-1 text-[8.5px]">
										<span className="text-fg-secondary flex items-center gap-0.5 font-medium">
											Owner <ChevronDown className="text-fg-tertiary size-2" />
										</span>
									</div>
								</div>

								{/* Member 2: Courtney Henry */}
								<div className="flex items-center justify-between text-[9px]">
									<div className="flex items-center gap-2">
										<Avatar size="24" rounded="circle">
											<AvatarImage
												src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/5.png"
												alt="Courtney"
											/>
											<AvatarFallback className="text-[8px]">C</AvatarFallback>
										</Avatar>
										<div>
											<div className="text-fg font-semibold">
												Courtney Henry
											</div>
											<div className="text-fg-tertiary text-[8px]">
												ced.boss@example.com
											</div>
										</div>
									</div>
									<div className="flex items-center gap-1 text-[8.5px]">
										<span className="text-fg-secondary flex items-center gap-0.5 font-medium">
											Editor <ChevronDown className="text-fg-tertiary size-2" />
										</span>
									</div>
								</div>

								{/* Member 3: Robert Fox */}
								<div className="flex items-center justify-between text-[9px]">
									<div className="flex items-center gap-2">
										<Avatar size="24" rounded="circle">
											<AvatarImage
												src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/6.png"
												alt="Robert"
											/>
											<AvatarFallback className="text-[8px]">R</AvatarFallback>
										</Avatar>
										<div>
											<div className="text-fg font-semibold">Robert Fox</div>
											<div className="text-fg-tertiary text-[8px]">
												robert.fox@example.com
											</div>
										</div>
									</div>
									<div className="flex items-center gap-1 text-[8.5px]">
										<span className="text-fg-secondary flex items-center gap-0.5 font-medium">
											Editor <ChevronDown className="text-fg-tertiary size-2" />
										</span>
									</div>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}
