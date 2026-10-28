"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import {
	Activity,
	AlertCircle,
	ArrowRight,
	ArrowUpRight,
	Check,
	CheckCircle2,
	ChevronDown,
	Clock,
	Copy,
	Cpu,
	Database,
	ExternalLink,
	HardDrive,
	Key,
	Layers,
	Maximize2,
	MoreHorizontal,
	Network,
	Play,
	Plus,
	RefreshCw,
	Search,
	Send,
	Settings2,
	Shield,
	ShieldCheck,
	Sliders,
	Sparkles,
	Terminal,
	TrendingUp,
	Users,
	Zap,
} from "lucide-react"

import { Button, IconButton } from "@/styles/default/ui/button"
import { Badge, BadgeDot } from "@/styles/default/ui/badge"
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/styles/default/ui/card"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarIndicator,
} from "@/styles/default/ui/avatar"
import {
	Banner,
	BannerDescription,
	BannerIcon,
} from "@/styles/default/ui/banner"
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
	NavigationMenuContent,
} from "@/registry/ui/navigation-menu"
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from "@/styles/default/ui/tabs"
import { Input, InputWrapper } from "@/styles/default/ui/input"
import { TextArea } from "@/styles/default/ui/text-area"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/styles/default/ui/select"
import { Slider } from "@/styles/default/ui/slider"
import { Switch } from "@/styles/default/ui/switch"
import { Progress } from "@/styles/default/ui/progress"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/styles/default/ui/tooltip"

interface AgentItem {
	id: string
	name: string
	role: string
	model: string
	status: "running" | "optimizing" | "standby"
	throughput: string
	latency: string
	memory: string
	avatar: string
	initials: string
}

const AGENTS: AgentItem[] = [
	{
		id: "ag-01",
		name: "Nexus-Synthesizer",
		role: "Multi-modal Cognitive Core",
		model: "Claude 3.7 Sonnet",
		status: "running",
		throughput: "1,240 tok/s",
		latency: "58ms",
		memory: "6.4 GB",
		avatar:
			"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
		initials: "NS",
	},
	{
		id: "ag-02",
		name: "CodePulse Orchestrator",
		role: "Automated Microservice Refactor",
		model: "DeepSeek R1",
		status: "running",
		throughput: "940 tok/s",
		latency: "74ms",
		memory: "4.8 GB",
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
		initials: "CP",
	},
	{
		id: "ag-03",
		name: "Sentinel-Defense",
		role: "Vulnerability & RAG Guardrail",
		model: "GPT-4o Security",
		status: "optimizing",
		throughput: "410 tok/s",
		latency: "32ms",
		memory: "2.1 GB",
		avatar:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
		initials: "SD",
	},
	{
		id: "ag-04",
		name: "VectorStream Indexer",
		role: "Distributed Graph Extraction",
		model: "Llama 3.3 70B",
		status: "standby",
		throughput: "120 tok/s",
		latency: "112ms",
		memory: "1.2 GB",
		avatar:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
		initials: "VI",
	},
]

const TELEMETRY_LOGS = [
	{
		id: "log-1",
		action: "Dispatched fine-tuned LoRA weights",
		cluster: "us-east-h100-node4",
		user: "Elena Rostova",
		time: "2m ago",
		badgeColor: "success" as const,
		badgeText: "Synced",
	},
	{
		id: "log-2",
		action: "Auto-rebalanced kv-cache allocation",
		cluster: "eu-central-v100-node1",
		user: "System Daemon",
		time: "8m ago",
		badgeColor: "info" as const,
		badgeText: "Optimized",
	},
	{
		id: "log-3",
		action: "Anomaly intercepted: token spike +340%",
		cluster: "ap-southeast-edge",
		user: "Sentinel-Defense",
		time: "14m ago",
		badgeColor: "warning" as const,
		badgeText: "Mitigated",
	},
]

export default function Preview06Page() {
	const [activeTab, setActiveTab] = useState("fleet")
	const [temperature, setTemperature] = useState([0.7])
	const [maxTokens, setMaxTokens] = useState([2048])
	const [autoScale, setAutoScale] = useState(true)
	const [guardrails, setGuardrails] = useState(true)
	const [copiedKey, setCopiedKey] = useState(false)
	const [selectedModel, setSelectedModel] = useState("claude-3-7")
	const [promptInput, setPromptInput] = useState(
		"Synthesize performance logs across our distributed GPU clusters. Highlight potential bottlenecks, memory latency anomalies, and recommend automated shard allocation configurations."
	)
	const [isGenerating, setIsGenerating] = useState(false)
	const [completionResult, setCompletionResult] = useState<string | null>(
		"Cluster Analysis Summary: Throughput is nominal across 98.4% of tensor cores. Shard #14 exhibits 12ms p99 cache contention during batch merges. Recommended action: Elevate kv-cache priority on node pool US-East and enable dynamic speculative decoding."
	)

	const handleCopy = () => {
		setCopiedKey(true)
		setTimeout(() => setCopiedKey(false), 2000)
	}

	const handleRunInference = () => {
		setIsGenerating(true)
		setCompletionResult(null)
		setTimeout(() => {
			setCompletionResult(
				`Generated Inference Output (${selectedModel}): Analyzed ${promptInput.length} character prompt vector. Execution completed in 68ms with zero safety anomalies detected. Dynamic speculative decoding enabled across active clusters.`
			)
			setIsGenerating(false)
		}, 1200)
	}

	return (
		<div className="bg-bg text-fg min-h-screen font-sans antialiased">
			{/* Top Platform Announcement */}
			<Banner
				variant="strong"
				color="primary"
				className="border-b"
				data-themer-id="announcement-banner">
				<BannerIcon>
					<Sparkles className="size-4 shrink-0" />
				</BannerIcon>
				<BannerDescription className="flex items-center gap-2">
					<span className="font-medium">Radian Fleet v3.4 Engine online:</span>{" "}
					<span>
						4.2x faster autonomous reasoning & zero-data-leakage architecture.
					</span>
					<span className="text-primary-foreground hidden font-semibold sm:inline">
						Explore cluster release notes →
					</span>
				</BannerDescription>
			</Banner>

			{/* Global Navigation Bar */}
			<header className="border-border/60 bg-bg/95 sticky top-0 z-40 w-full border-b backdrop-blur-md">
				<div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
					<div className="flex items-center gap-6">
						{/* Brand Logo */}
						<div className="flex items-center gap-2.5">
							<div className="bg-primary flex size-7 items-center justify-center rounded-lg text-white shadow-sm">
								<Zap className="size-4" />
							</div>
							<span className="font-heading text-fg text-base font-semibold tracking-tight">
								SYNAPSE<span className="text-primary">.OS</span>
							</span>
						</div>

						{/* Registry Navigation Menu */}
						<NavigationMenu viewport={false} className="hidden md:flex">
							<NavigationMenuList className="gap-1">
								<NavigationMenuItem>
									<NavigationMenuTrigger className="text-fg-secondary hover:text-fg bg-transparent text-sm font-medium transition-colors">
										Autonomous Fleet
									</NavigationMenuTrigger>
									<NavigationMenuContent className="border-border bg-bg min-w-[280px] rounded-lg border p-3 shadow-lg">
										<div className="flex flex-col gap-2">
											<div className="hover:bg-fill1 rounded-md p-2 transition-colors">
												<div className="text-fg text-sm font-medium">
													Active Swarms
												</div>
												<div className="text-fg-secondary text-xs">
													Orchestrate multi-agent clusters
												</div>
											</div>
											<div className="hover:bg-fill1 rounded-md p-2 transition-colors">
												<div className="text-fg text-sm font-medium">
													Distributed Nodes
												</div>
												<div className="text-fg-secondary text-xs">
													Edge compute & GPU pool status
												</div>
											</div>
											<div className="hover:bg-fill1 rounded-md p-2 transition-colors">
												<div className="text-fg text-sm font-medium">
													Model Routing
												</div>
												<div className="text-fg-secondary text-xs">
													Cost and latency optimization rules
												</div>
											</div>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuTrigger className="text-fg-secondary hover:text-fg bg-transparent text-sm font-medium transition-colors">
										Playground & Studio
									</NavigationMenuTrigger>
									<NavigationMenuContent className="border-border bg-bg min-w-[280px] rounded-lg border p-3 shadow-lg">
										<div className="flex flex-col gap-2">
											<div className="hover:bg-fill1 rounded-md p-2 transition-colors">
												<div className="text-fg text-sm font-medium">
													Cognitive Workbench
												</div>
												<div className="text-fg-secondary text-xs">
													Interactive prompt & vector evaluation
												</div>
											</div>
											<div className="hover:bg-fill1 rounded-md p-2 transition-colors">
												<div className="text-fg text-sm font-medium">
													Fine-Tuning Hub
												</div>
												<div className="text-fg-secondary text-xs">
													Dataset management and LoRA jobs
												</div>
											</div>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuLink
										href="#"
										className="text-fg-secondary hover:text-fg rounded-md px-3 py-1.5 text-sm font-medium transition-colors">
										Observability
									</NavigationMenuLink>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuLink
										href="#"
										className="text-fg-secondary hover:text-fg rounded-md px-3 py-1.5 text-sm font-medium transition-colors">
										Documentation
									</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					{/* Right Actions */}
					<div className="flex items-center gap-3">
						<div className="hidden items-center gap-2 sm:flex">
							<Select defaultValue="prod-us">
								<SelectTrigger className="h-8 w-44 text-xs font-medium">
									<SelectValue placeholder="Select Cluster" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="prod-us">
										US-East-1 (Production)
									</SelectItem>
									<SelectItem value="prod-eu">
										EU-Central-1 (Frankfurt)
									</SelectItem>
									<SelectItem value="edge-asia">
										Tokyo-Edge-03 (Low Latency)
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<IconButton
							size="lg"
							variant="outline"
							color="neutral"
							aria-label="Refresh">
							<RefreshCw className="size-3.5" />
						</IconButton>

						<div className="relative">
							<IconButton
								size="lg"
								variant="outline"
								color="neutral"
								aria-label="Settings">
								<Settings2 className="size-3.5" />
							</IconButton>
							<span className="bg-primary absolute top-1 right-1 size-2 rounded-full ring-2 ring-white" />
						</div>

						{/* Canonical Avatar Component */}
						<Avatar size="sm" rounded="circle" className="border-border border">
							<AvatarImage
								src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
								alt="Elena Rostova"
							/>
							<AvatarFallback>ER</AvatarFallback>
							<AvatarIndicator className="bg-success size-2 rounded-full" />
						</Avatar>
					</div>
				</div>
			</header>

			{/* Main Workspace */}
			<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				{/* Header Section */}
				<div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
					<div className="space-y-1">
						<div className="flex items-center gap-2">
							<Badge color="primary" variant="soft" size="sm">
								<BadgeDot /> Production Fleet
							</Badge>
							<span className="text-fg-tertiary text-xs">/</span>
							<span className="text-fg-secondary text-xs">
								Cluster: us-east-h100
							</span>
						</div>
						<h1 className="heading-2 font-heading">Neural Fleet Operations</h1>
						<p className="text-fg-secondary text-sm">
							Real-time cognitive orchestrations, cross-model load distribution,
							and edge vector cache telemetry.
						</p>
					</div>

					<div className="flex flex-wrap items-center gap-3">
						<Button variant="outline" color="neutral" size="md">
							<Sliders className="size-4" />
							Cluster Config
						</Button>
						<Button color="primary" size="md">
							<Plus className="size-4" />
							Deploy New Swarm
						</Button>
					</div>
				</div>

				{/* High-Impact KPI Stat Grid */}
				<div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{/* Stat 1 */}
					<Card className="border-border/80">
						<CardContent className="p-5">
							<div className="flex items-center justify-between">
								<span className="text-fg-secondary text-xs font-medium">
									Active Swarms
								</span>
								<div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-lg">
									<Network className="size-4" />
								</div>
							</div>
							<div className="mt-3 flex items-baseline gap-2">
								<span className="font-heading text-2xl font-semibold tracking-tight">
									48 / 50
								</span>
								<Badge color="success" size="sm" variant="soft">
									+12.4%
								</Badge>
							</div>
							<div className="text-fg-tertiary mt-2 flex items-center justify-between text-xs">
								<span>Cluster quota</span>
								<span>96% assigned</span>
							</div>
							<Progress value={96} className="mt-2 h-1.5" />
						</CardContent>
					</Card>

					{/* Stat 2 */}
					<Card className="border-border/80">
						<CardContent className="p-5">
							<div className="flex items-center justify-between">
								<span className="text-fg-secondary text-xs font-medium">
									Realtime Throughput
								</span>
								<div className="bg-info/10 text-info flex size-8 items-center justify-center rounded-lg">
									<Zap className="size-4" />
								</div>
							</div>
							<div className="mt-3 flex items-baseline gap-2">
								<span className="font-heading text-2xl font-semibold tracking-tight">
									62.4k
								</span>
								<span className="text-fg-secondary text-xs font-medium">
									tok/sec
								</span>
								<Badge color="primary" size="sm" variant="soft">
									P99: 58ms
								</Badge>
							</div>
							<div className="text-fg-tertiary mt-2 flex items-center justify-between text-xs">
								<span>Speculative decoding</span>
								<span className="text-success font-medium">Active</span>
							</div>
							<Progress value={78} className="mt-2 h-1.5" />
						</CardContent>
					</Card>

					{/* Stat 3 */}
					<Card className="border-border/80">
						<CardContent className="p-5">
							<div className="flex items-center justify-between">
								<span className="text-fg-secondary text-xs font-medium">
									GPU Memory Footprint
								</span>
								<div className="bg-warning/10 text-warning flex size-8 items-center justify-center rounded-lg">
									<Cpu className="size-4" />
								</div>
							</div>
							<div className="mt-3 flex items-baseline gap-2">
								<span className="font-heading text-2xl font-semibold tracking-tight">
									84.2%
								</span>
								<Badge color="warning" size="sm" variant="soft">
									Optimal
								</Badge>
							</div>
							<div className="text-fg-tertiary mt-2 flex items-center justify-between text-xs">
								<span>KV-Cache load</span>
								<span>673 / 800 GB</span>
							</div>
							<Progress value={84.2} className="mt-2 h-1.5" />
						</CardContent>
					</Card>

					{/* Stat 4 */}
					<Card className="border-border/80">
						<CardContent className="p-5">
							<div className="flex items-center justify-between">
								<span className="text-fg-secondary text-xs font-medium">
									Cost Efficiency Ratio
								</span>
								<div className="bg-success/10 text-success flex size-8 items-center justify-center rounded-lg">
									<TrendingUp className="size-4" />
								</div>
							</div>
							<div className="mt-3 flex items-baseline gap-2">
								<span className="font-heading text-2xl font-semibold tracking-tight">
									$0.0019
								</span>
								<span className="text-fg-secondary text-xs">/ 1k tokens</span>
							</div>
							<div className="text-fg-tertiary mt-2 flex items-center justify-between text-xs">
								<span>Model auto-routed</span>
								<span className="text-primary font-medium">Multi-Engine</span>
							</div>
							<Progress value={38} className="mt-2 h-1.5" />
						</CardContent>
					</Card>
				</div>

				{/* Primary Tabs Navigation */}
				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className="space-y-6">
					<div className="border-border flex items-center justify-between border-b pb-1">
						<TabsList>
							<TabsTrigger value="fleet">
								<Network className="mr-1.5 size-4" />
								Active Agent Fleet
							</TabsTrigger>
							<TabsTrigger value="workbench">
								<Sparkles className="mr-1.5 size-4" />
								Cognitive Workbench
							</TabsTrigger>
							<TabsTrigger value="telemetry">
								<Activity className="mr-1.5 size-4" />
								Telemetry & Security
							</TabsTrigger>
						</TabsList>

						<div className="hidden items-center gap-2 sm:flex">
							<Badge color="neutral" size="md" variant="outline">
								<span className="font-mono text-xs">TLS 1.3 Strict</span>
							</Badge>
							<Badge color="success" size="md" variant="soft">
								<BadgeDot /> Distributed Mesh OK
							</Badge>
						</div>
					</div>

					{/* Tab 1: Agent Fleet */}
					<TabsContent value="fleet" className="space-y-6">
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
							{/* Left 8 cols: Swarm Agent Directory */}
							<div className="space-y-6 lg:col-span-8">
								<Card>
									<CardHeader className="flex flex-row items-center justify-between">
										<div>
											<CardTitle className="font-heading text-base font-semibold">
												Autonomous Agents In Execution
											</CardTitle>
											<CardDescription>
												Autonomous workers actively processing customer request
												pipelines.
											</CardDescription>
										</div>
										<div className="flex items-center gap-2">
											<InputWrapper className="w-48">
												<Search className="text-fg-tertiary size-3.5" />
												<Input
													placeholder="Filter swarms..."
													className="h-8 text-xs"
												/>
											</InputWrapper>
										</div>
									</CardHeader>

									<CardContent className="p-0">
										<div className="divide-border divide-y">
											{AGENTS.map((agent) => (
												<div
													key={agent.id}
													className="hover:bg-fill1/60 flex flex-col gap-4 p-4 transition-colors sm:flex-row sm:items-center sm:justify-between">
													<div className="flex items-center gap-3.5">
														<Avatar
															size="lg"
															rounded="circle"
															className="border-border border">
															<AvatarImage
																src={agent.avatar}
																alt={agent.name}
															/>
															<AvatarFallback>{agent.initials}</AvatarFallback>
															<AvatarIndicator
																className={`size-2.5 rounded-full ${
																	agent.status === "running"
																		? "bg-success"
																		: agent.status === "optimizing"
																			? "bg-warning"
																			: "bg-fg-tertiary"
																}`}
															/>
														</Avatar>
														<div>
															<div className="flex items-center gap-2">
																<span className="text-fg text-sm font-semibold">
																	{agent.name}
																</span>
																<Badge
																	size="sm"
																	color={
																		agent.status === "running"
																			? "success"
																			: agent.status === "optimizing"
																				? "warning"
																				: "neutral"
																	}
																	variant="soft">
																	{agent.status}
																</Badge>
															</div>
															<p className="text-fg-secondary text-xs">
																{agent.role}
															</p>
														</div>
													</div>

													<div className="flex flex-wrap items-center gap-4 text-xs">
														<div className="flex flex-col">
															<span className="text-fg-tertiary text-[11px]">
																Model
															</span>
															<span className="text-fg font-medium">
																{agent.model}
															</span>
														</div>

														<div className="flex flex-col">
															<span className="text-fg-tertiary text-[11px]">
																Throughput
															</span>
															<span className="text-fg font-mono font-medium">
																{agent.throughput}
															</span>
														</div>

														<div className="flex flex-col">
															<span className="text-fg-tertiary text-[11px]">
																P99 Latency
															</span>
															<span className="text-fg font-mono font-medium">
																{agent.latency}
															</span>
														</div>

														<div className="flex items-center gap-1.5">
															<Button
																variant="outline"
																color="neutral"
																size="lg">
																Inspect
															</Button>
															<DropdownMenu>
																<DropdownMenuTrigger asChild>
																	<IconButton
																		size="lg"
																		variant="ghost"
																		color="neutral"
																		aria-label="Agent options">
																		<MoreHorizontal className="size-4" />
																	</IconButton>
																</DropdownMenuTrigger>
																<DropdownMenuContent align="end">
																	<DropdownMenuItem>
																		Pause Worker
																	</DropdownMenuItem>
																	<DropdownMenuItem>
																		Drain Queue
																	</DropdownMenuItem>
																	<DropdownMenuItem>
																		Reassign Model
																	</DropdownMenuItem>
																</DropdownMenuContent>
															</DropdownMenu>
														</div>
													</div>
												</div>
											))}
										</div>
									</CardContent>

									<CardFooter className="border-border bg-fill1/40 flex items-center justify-between border-t px-4 py-3">
										<span className="text-fg-secondary text-xs">
											Showing 4 of 48 distributed workers across 6 node regions
										</span>
										<Button variant="link" color="primary" size="lg">
											View All Agents
											<ArrowRight className="size-3.5" />
										</Button>
									</CardFooter>
								</Card>

								{/* Shard Memory Allocation Chart Simulation */}
								<Card>
									<CardHeader>
										<div className="flex items-center justify-between">
											<div>
												<CardTitle className="font-heading text-base font-semibold">
													Cluster GPU Tensor Allocation
												</CardTitle>
												<CardDescription>
													Real-time memory distribution across distributed
													accelerators.
												</CardDescription>
											</div>
											<Badge color="primary" size="sm" variant="soft">
												Auto-Balancing ON
											</Badge>
										</div>
									</CardHeader>
									<CardContent className="space-y-4">
										<div>
											<div className="text-fg-secondary mb-1.5 flex justify-between text-xs">
												<span className="text-fg font-medium">
													H100 Node Pool US-East-1 (64 Cores)
												</span>
												<span className="font-mono">88.4% Allocated</span>
											</div>
											<Progress value={88.4} className="h-2" />
										</div>

										<div>
											<div className="text-fg-secondary mb-1.5 flex justify-between text-xs">
												<span className="text-fg font-medium">
													H100 Node Pool EU-Central-1 (32 Cores)
												</span>
												<span className="font-mono">72.1% Allocated</span>
											</div>
											<Progress value={72.1} className="h-2" />
										</div>

										<div>
											<div className="text-fg-secondary mb-1.5 flex justify-between text-xs">
												<span className="text-fg font-medium">
													Speculative Cache Pool (NVMe Gen5)
												</span>
												<span className="font-mono">46.5% Allocated</span>
											</div>
											<Progress value={46.5} className="h-2" />
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Right 4 cols: Swarm Control Panel */}
							<div className="space-y-6 lg:col-span-4">
								<Card>
									<CardHeader>
										<CardTitle className="font-heading text-base font-semibold">
											Cluster Governance
										</CardTitle>
										<CardDescription>
											Dynamic auto-scaling policies & zero-retention compliance.
										</CardDescription>
									</CardHeader>

									<CardContent className="space-y-5">
										<div className="flex items-center justify-between">
											<div className="space-y-0.5">
												<div className="text-fg text-sm font-medium">
													Elastic Auto-scale
												</div>
												<div className="text-fg-secondary text-xs">
													Spawn micro-workers when latency &gt; 80ms
												</div>
											</div>
											<Switch
												checked={autoScale}
												onCheckedChange={setAutoScale}
											/>
										</div>

										<div className="flex items-center justify-between">
											<div className="space-y-0.5">
												<div className="text-fg text-sm font-medium">
													Zero-Data Retention
												</div>
												<div className="text-fg-secondary text-xs">
													Purge prompt vectors immediately post-run
												</div>
											</div>
											<Switch
												checked={guardrails}
												onCheckedChange={setGuardrails}
											/>
										</div>

										<div className="border-border border-t pt-4">
											<div className="mb-2 flex items-center justify-between text-xs">
												<span className="text-fg-secondary font-medium">
													Temperature Limit
												</span>
												<span className="text-fg font-mono font-bold">
													{temperature[0]}
												</span>
											</div>
											<Slider
												value={temperature}
												onValueChange={setTemperature}
												min={0}
												max={1}
												step={0.05}
											/>
										</div>

										<div className="border-border border-t pt-4">
											<div className="mb-2 flex items-center justify-between text-xs">
												<span className="text-fg-secondary font-medium">
													Max Context Token Window
												</span>
												<span className="text-fg font-mono font-bold">
													{maxTokens[0]} tok
												</span>
											</div>
											<Slider
												value={maxTokens}
												onValueChange={setMaxTokens}
												min={512}
												max={8192}
												step={256}
											/>
										</div>
									</CardContent>

									<CardFooter className="border-border border-t p-4">
										<Button color="primary" variant="strong" className="w-full">
											Deploy Policy Changes
										</Button>
									</CardFooter>
								</Card>

								{/* API Key Credentials Card */}
								<Card>
									<CardHeader>
										<div className="flex items-center justify-between">
											<CardTitle className="font-heading text-base font-semibold">
												Cluster API Gateway
											</CardTitle>
											<ShieldCheck className="text-success size-4" />
										</div>
										<CardDescription>
											Authenticated gateway key for internal RPC endpoints.
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-3">
										<div className="bg-fill1 border-border flex items-center justify-between rounded-lg border p-2.5">
											<div className="flex items-center gap-2 overflow-hidden">
												<Key className="text-fg-tertiary size-4 shrink-0" />
												<span className="truncate font-mono text-xs">
													syn_live_9a7f3e82••••••••••
												</span>
											</div>
											<Button
												size="lg"
												variant="ghost"
												color="neutral"
												onClick={handleCopy}>
												{copiedKey ? (
													<Check className="text-success size-3" />
												) : (
													<Copy className="size-3" />
												)}
											</Button>
										</div>
										<div className="text-fg-tertiary flex items-center justify-between text-[11px]">
											<span>Rate Limit: 25,000 req/min</span>
											<span className="text-success font-medium">Active</span>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</TabsContent>

					{/* Tab 2: Cognitive Workbench */}
					<TabsContent value="workbench" className="space-y-6">
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
							<div className="space-y-6 lg:col-span-7">
								<Card>
									<CardHeader>
										<div className="flex items-center justify-between">
											<CardTitle className="font-heading text-base font-semibold">
												Interactive Prompt Synthesizer
											</CardTitle>
											<Badge color="primary" size="sm" variant="soft">
												Inference Lab
											</Badge>
										</div>
										<CardDescription>
											Send synthetic instructions and evaluate real-time
											multi-model reasoning.
										</CardDescription>
									</CardHeader>

									<CardContent className="space-y-4">
										<div className="space-y-2">
											<label className="text-fg text-xs font-semibold">
												Select Model Backend
											</label>
											<Select
												value={selectedModel}
												onValueChange={setSelectedModel}>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Choose LLM" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="claude-3-7">
														Anthropic Claude 3.7 Sonnet (Hybrid Reasoning)
													</SelectItem>
													<SelectItem value="gpt-4o">
														OpenAI GPT-4o (High Throughput)
													</SelectItem>
													<SelectItem value="deepseek-r1">
														DeepSeek R1 (Open Reasoning Benchmark)
													</SelectItem>
													<SelectItem value="llama-3-3">
														Meta Llama 3.3 70B (Private VPC)
													</SelectItem>
												</SelectContent>
											</Select>
										</div>

										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<label className="text-fg text-xs font-semibold">
													Inference Directive / Prompt
												</label>
												<span className="text-fg-tertiary text-xs">
													{promptInput.length} chars
												</span>
											</div>
											<TextArea
												rows={6}
												value={promptInput}
												onChange={(e) => setPromptInput(e.target.value)}
												placeholder="Enter prompt directive..."
												className="font-mono text-xs leading-relaxed"
											/>
										</div>

										<div className="flex flex-wrap items-center justify-between gap-3 pt-2">
											<div className="flex items-center gap-2">
												<Badge color="neutral" size="sm">
													Temp: {temperature[0]}
												</Badge>
												<Badge color="neutral" size="sm">
													Top-P: 0.95
												</Badge>
												<Badge color="neutral" size="sm">
													Max: {maxTokens[0]} tok
												</Badge>
											</div>

											<Button
												color="primary"
												size="md"
												onClick={handleRunInference}
												disabled={isGenerating}>
												{isGenerating ? (
													<RefreshCw className="size-4 animate-spin" />
												) : (
													<Sparkles className="size-4" />
												)}
												Execute Inference
											</Button>
										</div>
									</CardContent>
								</Card>
							</div>

							<div className="space-y-6 lg:col-span-5">
								<Card className="flex h-full flex-col">
									<CardHeader>
										<div className="flex items-center justify-between">
											<CardTitle className="font-heading text-base font-semibold">
												Streamed Response Terminal
											</CardTitle>
											<div className="flex items-center gap-1.5">
												<span className="bg-success size-2 rounded-full" />
												<span className="text-fg-secondary font-mono text-xs">
													200 OK
												</span>
											</div>
										</div>
										<CardDescription>
											Direct low-latency cognitive output stream.
										</CardDescription>
									</CardHeader>

									<CardContent className="flex flex-1 flex-col">
										<div className="bg-fill1/80 border-border flex flex-1 flex-col rounded-lg border p-4 font-mono text-xs">
											{isGenerating ? (
												<div className="flex flex-1 flex-col items-center justify-center gap-3 py-12">
													<div className="border-primary size-8 animate-spin rounded-full border-2 border-t-transparent" />
													<span className="text-fg-secondary text-xs">
														Processing neural weights...
													</span>
												</div>
											) : completionResult ? (
												<motion.div
													initial={{ opacity: 0, y: 4 }}
													animate={{ opacity: 1, y: 0 }}
													className="space-y-3">
													<div className="text-fg-secondary border-border flex items-center justify-between border-b pb-2 text-[11px]">
														<span>Tokens: 148</span>
														<span>Latency: 68ms</span>
													</div>
													<p className="text-fg leading-relaxed">
														{completionResult}
													</p>
												</motion.div>
											) : (
												<div className="text-fg-tertiary flex flex-1 items-center justify-center">
													Ready to execute prompt.
												</div>
											)}
										</div>
									</CardContent>

									<CardFooter className="border-border flex items-center justify-between border-t p-4">
										<span className="text-fg-tertiary text-xs">
											Auto-logged to internal telemetry
										</span>
										<Button variant="outline" color="neutral" size="lg">
											<Copy className="size-3.5" />
											Copy Output
										</Button>
									</CardFooter>
								</Card>
							</div>
						</div>
					</TabsContent>

					{/* Tab 3: Telemetry & Security */}
					<TabsContent value="telemetry" className="space-y-6">
						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="font-heading text-base font-semibold">
											System Audit & Cluster Telemetry Stream
										</CardTitle>
										<CardDescription>
											Cryptographically verified audit trail across all agent
											actions.
										</CardDescription>
									</div>
									<Button variant="outline" color="neutral" size="lg">
										Export Audit Log (.JSONL)
									</Button>
								</div>
							</CardHeader>
							<CardContent className="p-0">
								<div className="divide-border divide-y">
									{TELEMETRY_LOGS.map((log) => (
										<div
											key={log.id}
											className="hover:bg-fill1/60 flex items-center justify-between p-4 transition-colors">
											<div className="flex items-center gap-3">
												<div className="bg-fill2 flex size-8 items-center justify-center rounded-lg">
													<Shield className="text-primary size-4" />
												</div>
												<div>
													<div className="text-fg text-sm font-medium">
														{log.action}
													</div>
													<div className="text-fg-tertiary flex items-center gap-2 text-xs">
														<span>{log.cluster}</span>
														<span>•</span>
														<span>Initiated by {log.user}</span>
													</div>
												</div>
											</div>

											<div className="flex items-center gap-3">
												<Badge color={log.badgeColor} size="sm" variant="soft">
													{log.badgeText}
												</Badge>
												<span className="text-fg-tertiary text-xs">
													{log.time}
												</span>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	)
}
