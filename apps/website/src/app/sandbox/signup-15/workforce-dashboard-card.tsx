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
				<div className="relative rounded-[22px] border border-white/20 bg-white/10 p-1.5 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md">
					<Card className="w-full gap-3 rounded-[18px] border-0 bg-white p-3.5 text-neutral-900 shadow-sm sm:p-4">
						{/* Header Bar */}
						<CardHeader className="flex flex-row items-center justify-between p-0">
							{/* Left: Title */}
							<CardTitle className="text-sm font-bold tracking-tight text-neutral-900">
								Dashboard
							</CardTitle>

							{/* Right: Team Avatars + Add Member Button */}
							<div className="flex items-center gap-2">
								{/* Overlapping Avatar Cluster */}
								<div className="flex -space-x-2">
									<Avatar
										size="xs"
										rounded="circle"
										className="border-2 border-white shadow-2xs">
										<AvatarImage
											src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
											alt="Sarah"
										/>
										<AvatarFallback className="text-[8.5px]">S</AvatarFallback>
									</Avatar>
									<Avatar
										size="xs"
										rounded="circle"
										className="border-2 border-white shadow-2xs">
										<AvatarImage
											src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
											alt="Alex"
										/>
										<AvatarFallback className="text-[8.5px]">A</AvatarFallback>
									</Avatar>
									<Avatar
										size="xs"
										rounded="circle"
										className="border-2 border-white shadow-2xs">
										<AvatarImage
											src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80"
											alt="Elena"
										/>
										<AvatarFallback className="text-[8.5px]">E</AvatarFallback>
									</Avatar>
									<Badge
										variant="soft"
										color="primary"
										size="sm"
										className="h-6 rounded-full border-2 border-white px-1.5 text-[8.5px] font-bold shadow-2xs">
										+2
									</Badge>
								</div>

								{/* Add members button using canonical Button */}
								<Button
									variant="soft"
									color="primary"
									size="xs"
									className="h-6 rounded-md px-2 text-[9.5px] font-semibold text-blue-700">
									Add members +
								</Button>
							</div>
						</CardHeader>

						{/* Top Metrics Section (2 KPI Cards using canonical Card & Badge) */}
						<div className="grid grid-cols-2 gap-2.5 pt-0.5">
							{/* KPI 1: Productive Time / Day */}
							<Card className="gap-1 rounded-xl border border-neutral-100 bg-neutral-50/60 p-2.5 shadow-2xs">
								<span className="text-[9.5px] font-medium text-neutral-400">
									Productive Time / Day
								</span>

								<div className="flex items-end justify-between">
									<div>
										<div className="text-base font-bold tracking-tight text-neutral-900">
											12.4 hr
										</div>
										<Badge
											variant="soft"
											color="green"
											size="sm"
											className="mt-0.5 h-4 gap-0.5 px-1.5 text-[8px] font-semibold">
											<Check className="size-2.5 stroke-[2.5]" />
											+23% last week
										</Badge>
									</div>

									{/* Sparkline Wave with 23% Crest */}
									<div className="relative h-7 w-20">
										<div className="absolute -top-1.5 right-4 text-[7.5px] font-bold text-blue-600">
											23%
										</div>
										<svg
											viewBox="0 0 100 30"
											className="h-full w-full overflow-visible">
											<defs>
												<linearGradient
													id="sparkline-fill"
													x1="0"
													y1="0"
													x2="0"
													y2="1">
													<stop
														offset="0%"
														stopColor="#3b82f6"
														stopOpacity="0.3"
													/>
													<stop
														offset="100%"
														stopColor="#3b82f6"
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
												stroke="#3b82f6"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											<circle cx="60" cy="10" r="2.5" fill="#3b82f6" />
										</svg>
									</div>
								</div>
							</Card>

							{/* KPI 2: Focused Time */}
							<Card className="gap-1 rounded-xl border border-neutral-100 bg-neutral-50/60 p-2.5 shadow-2xs">
								<span className="text-[9.5px] font-medium text-neutral-400">
									Focused Time
								</span>

								<div className="flex items-end justify-between">
									<div>
										<div className="text-base font-bold tracking-tight text-neutral-900">
											8.5 hr
										</div>
										<Badge
											variant="soft"
											color="green"
											size="sm"
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
								<span className="text-xs font-bold text-neutral-900">
									Team&apos;s Utilization
								</span>
							</div>

							<Table className="w-full text-[9px]">
								<TableHeader>
									<TableRow className="border-b border-neutral-100 text-[8.5px] text-neutral-400 hover:bg-transparent">
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
									<TableRow className="border-b border-neutral-50 hover:bg-neutral-50/60">
										<TableCell className="p-1.5 font-medium">
											<div className="flex items-center gap-1.5">
												<div className="flex size-4.5 items-center justify-center rounded-full bg-blue-500 text-[8px] font-bold text-white">
													M
												</div>
												<span className="font-semibold text-neutral-800">
													Marketing
												</span>
											</div>
										</TableCell>
										<TableCell className="p-1.5 text-center">
											<Badge
												variant="soft"
												color="red"
												size="sm"
												className="h-4 gap-0.5 px-1.5 text-[7.5px]">
												<Flag className="size-2 fill-current" /> HIGH
											</Badge>
										</TableCell>
										<TableCell className="p-1.5 text-center text-neutral-600">
											40%
										</TableCell>
										<TableCell className="p-1.5 text-center text-neutral-600">
											20%
										</TableCell>
										<TableCell className="p-1.5 text-right">
											<div className="flex items-center justify-end gap-1.5">
												<Progress
													value={80}
													className="h-1.5 w-12 bg-neutral-100"
													indicatorClassName="bg-blue-600"
												/>
												<span className="text-[8px] font-medium text-neutral-500">
													18h
												</span>
											</div>
										</TableCell>
									</TableRow>

									{/* Customer Success */}
									<TableRow className="border-b border-neutral-50 hover:bg-neutral-50/60">
										<TableCell className="p-1.5 font-medium">
											<div className="flex items-center gap-1.5">
												<div className="flex size-4.5 items-center justify-center rounded-full bg-amber-500 text-[8px] font-bold text-white">
													C
												</div>
												<span className="font-semibold text-neutral-800">
													Support
												</span>
											</div>
										</TableCell>
										<TableCell className="p-1.5 text-center">
											<Badge
												variant="soft"
												color="green"
												size="sm"
												className="h-4 gap-0.5 px-1.5 text-[7.5px]">
												<Flag className="size-2 fill-current" /> MED
											</Badge>
										</TableCell>
										<TableCell className="p-1.5 text-center text-neutral-600">
											25%
										</TableCell>
										<TableCell className="p-1.5 text-center text-neutral-600">
											30%
										</TableCell>
										<TableCell className="p-1.5 text-right">
											<div className="flex items-center justify-end gap-1.5">
												<Progress
													value={55}
													className="h-1.5 w-12 bg-neutral-100"
													indicatorClassName="bg-blue-600"
												/>
												<span className="text-[8px] font-medium text-neutral-500">
													12h
												</span>
											</div>
										</TableCell>
									</TableRow>

									{/* Dev Team */}
									<TableRow className="border-b border-neutral-50 hover:bg-neutral-50/60">
										<TableCell className="p-1.5 font-medium">
											<div className="flex items-center gap-1.5">
												<div className="flex size-4.5 items-center justify-center rounded-full bg-rose-500 text-[8px] font-bold text-white">
													D
												</div>
												<span className="font-semibold text-neutral-800">
													Engineering
												</span>
											</div>
										</TableCell>
										<TableCell className="p-1.5 text-center">
											<Badge
												variant="soft"
												color="neutral"
												size="sm"
												className="h-4 gap-0.5 px-1.5 text-[7.5px]">
												<Flag className="size-2 fill-current" /> LOW
											</Badge>
										</TableCell>
										<TableCell className="p-1.5 text-center text-neutral-600">
											02%
										</TableCell>
										<TableCell className="p-1.5 text-center text-neutral-600">
											60%
										</TableCell>
										<TableCell className="p-1.5 text-right">
											<div className="flex items-center justify-end gap-1.5">
												<Progress
													value={40}
													className="h-1.5 w-12 bg-neutral-100"
													indicatorClassName="bg-blue-600"
												/>
												<span className="text-[8px] font-medium text-neutral-500">
													8h
												</span>
											</div>
										</TableCell>
									</TableRow>

									{/* Design Team */}
									<TableRow className="border-0 hover:bg-neutral-50/60">
										<TableCell className="p-1.5 font-medium">
											<div className="flex items-center gap-1.5">
												<div className="flex size-4.5 items-center justify-center rounded-full bg-purple-500 text-[8px] font-bold text-white">
													P
												</div>
												<span className="font-semibold text-neutral-800">
													Design Team
												</span>
											</div>
										</TableCell>
										<TableCell className="p-1.5 text-center">
											<Badge
												variant="soft"
												color="neutral"
												size="sm"
												className="h-4 gap-0.5 px-1.5 text-[7.5px]">
												<Flag className="size-2 fill-current" /> LOW
											</Badge>
										</TableCell>
										<TableCell className="p-1.5 text-center text-neutral-600">
											05%
										</TableCell>
										<TableCell className="p-1.5 text-center text-neutral-600">
											65%
										</TableCell>
										<TableCell className="p-1.5 text-right">
											<div className="flex items-center justify-end gap-1.5">
												<Progress
													value={65}
													className="h-1.5 w-12 bg-neutral-100"
													indicatorClassName="bg-blue-600"
												/>
												<span className="text-[8px] font-medium text-neutral-500">
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
					<div className="relative rounded-[20px] border border-white/30 bg-white/15 p-1 shadow-[0_20px_45px_-8px_rgba(0,0,0,0.4)] backdrop-blur-md">
						<Card className="w-full gap-2.5 rounded-[16px] border-0 bg-white p-3 text-neutral-900 shadow-sm">
							{/* Modal Header */}
							<CardHeader className="flex flex-row items-center justify-between p-0">
								<CardTitle className="text-xs font-bold text-neutral-900">
									Add Member
								</CardTitle>
								<Button
									variant="ghost"
									color="neutral"
									size="xs"
									className="size-5 rounded-full p-0 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
									aria-label="Close modal">
									<X className="size-3 stroke-[2.5]" />
								</Button>
							</CardHeader>

							{/* Invite Email & Role Row using canonical Input & Button */}
							<div className="pt-0.5">
								<span className="text-[8.5px] font-medium text-neutral-400">
									Email
								</span>
								<div className="mt-1 flex items-center gap-1.5">
									<div className="relative flex-1">
										<Input
											size="xs"
											readOnly
											defaultValue="rafiqur51@gmail.com"
											className="h-7 rounded-md border-neutral-200 bg-neutral-50/70 px-2 pr-11 text-[9px] text-neutral-800"
										/>
										<span className="pointer-events-none absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-0.5 text-[8px] font-medium text-neutral-500">
											Viewer <ChevronDown className="size-2 text-neutral-400" />
										</span>
									</div>

									{/* Send Invite Button using canonical Button */}
									<Button
										variant="strong"
										color="primary"
										size="xs"
										className="h-7 shrink-0 rounded-md px-2.5 text-[8.5px] font-semibold text-white shadow-2xs">
										Invite
									</Button>
								</div>
							</div>

							{/* Members List using canonical Avatar & Badge */}
							<div className="flex flex-col gap-2 pt-0.5">
								<span className="text-[8.5px] font-medium text-neutral-400">
									Members
								</span>

								{/* Member 1: Leslie Alexander */}
								<div className="flex items-center justify-between text-[9px]">
									<div className="flex items-center gap-2">
										<Avatar size="xs" rounded="circle">
											<AvatarImage
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80"
												alt="Leslie"
											/>
											<AvatarFallback className="text-[8px]">L</AvatarFallback>
										</Avatar>
										<div>
											<div className="flex items-center gap-1 font-semibold text-neutral-900">
												Leslie Alexander
												<Badge
													variant="soft"
													color="purple"
													size="sm"
													className="h-3.5 px-1 text-[7px]">
													You
												</Badge>
											</div>
											<div className="text-[8px] text-neutral-400">
												sanders.alex@example.com
											</div>
										</div>
									</div>
									<div className="flex items-center gap-1 text-[8.5px]">
										<span className="flex items-center gap-0.5 font-medium text-neutral-700">
											Owner <ChevronDown className="size-2 text-neutral-400" />
										</span>
									</div>
								</div>

								{/* Member 2: Courtney Henry */}
								<div className="flex items-center justify-between text-[9px]">
									<div className="flex items-center gap-2">
										<Avatar size="xs" rounded="circle">
											<AvatarImage
												src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80"
												alt="Courtney"
											/>
											<AvatarFallback className="text-[8px]">C</AvatarFallback>
										</Avatar>
										<div>
											<div className="font-semibold text-neutral-900">
												Courtney Henry
											</div>
											<div className="text-[8px] text-neutral-400">
												ced.boss@example.com
											</div>
										</div>
									</div>
									<div className="flex items-center gap-1 text-[8.5px]">
										<span className="flex items-center gap-0.5 font-medium text-neutral-700">
											Editor <ChevronDown className="size-2 text-neutral-400" />
										</span>
									</div>
								</div>

								{/* Member 3: Robert Fox */}
								<div className="flex items-center justify-between text-[9px]">
									<div className="flex items-center gap-2">
										<Avatar size="xs" rounded="circle">
											<AvatarImage
												src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80"
												alt="Robert"
											/>
											<AvatarFallback className="text-[8px]">R</AvatarFallback>
										</Avatar>
										<div>
											<div className="font-semibold text-neutral-900">
												Robert Fox
											</div>
											<div className="text-[8px] text-neutral-400">
												robert.fox@example.com
											</div>
										</div>
									</div>
									<div className="flex items-center gap-1 text-[8.5px]">
										<span className="flex items-center gap-0.5 font-medium text-neutral-700">
											Editor <ChevronDown className="size-2 text-neutral-400" />
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
