"use client"

import React, { useEffect, useState } from "react"
import {
	Check,
	ChevronRight,
	Code,
	Copy,
	ExternalLink,
	Eye,
	FileCode,
	Folder,
	Globe,
	Monitor,
	Moon,
	Smartphone,
	Sun,
	Tablet,
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button, IconButton } from "@/styles/default/ui/button"
import { CodeArea } from "@/styles/default/ui/code-area"
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/styles/default/ui/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/styles/default/ui/tabs"

// Previews

interface FilesData {
	motion: Record<string, string>
	"beam-header": Record<string, string>
	"jambo-pricing": Record<string, string>
	"klarheit-faq": Record<string, string>
	"klarheit-testimonial": Record<string, string>
}

interface PlaygroundClientProps {
	files: FilesData
}

type PreviewKey =
	"motion" | "faq" | "beam-header" | "jambo-pricing" | "testimonials"
type ViewMode = "preview" | "code"
type DeviceSize = "desktop" | "tablet" | "mobile"

const referenceUrls: Record<PreviewKey, string> = {
	motion: "https://www.flowbase.co/preview/jambo-logo-01",
	faq: "https://www.flowbase.co/preview/klarheit-faq-02",
	"beam-header": "https://www.flowbase.co/preview/beam-header-01",
	"jambo-pricing": "https://www.flowbase.co/preview/jambo-pricing-01",
	testimonials: "https://www.flowbase.co/preview/klarheit-testimonial-02",
}

const previewRoutes: Record<PreviewKey, string> = {
	motion: "/sandbox/motion",
	faq: "/sandbox/klarheit-faq",
	testimonials: "/sandbox/klarheit-testimonial",
	"beam-header": "/sandbox/beam-header",
	"jambo-pricing": "/sandbox/jambo-pricing",
}

export function PlaygroundClient({ files }: PlaygroundClientProps) {
	// Sidebar state
	const [activeComponent, setActiveComponent] = useState<PreviewKey>("motion")
	const [activeFile, setActiveFile] = useState<string>("logo-section.tsx")

	// View mode state
	const [viewMode, setViewMode] = useState<ViewMode>("preview")
	const [deviceSize, setDeviceSize] = useState<DeviceSize>("desktop")

	// Copy status
	const [copied, setCopied] = useState(false)

	// Theme syncing
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	// Handlers
	const selectFile = (component: PreviewKey, fileName: string) => {
		setActiveComponent(component)
		setActiveFile(fileName)
	}

	const getActiveCode = () => {
		if (activeComponent === "motion") {
			return files.motion[activeFile] || ""
		}
		if (activeComponent === "faq") {
			return files["klarheit-faq"][activeFile] || ""
		}
		if (activeComponent === "testimonials") {
			return files["klarheit-testimonial"][activeFile] || ""
		}
		if (activeComponent === "beam-header") {
			return files["beam-header"][activeFile] || ""
		}
		if (activeComponent === "jambo-pricing") {
			return files["jambo-pricing"][activeFile] || ""
		}
		return ""
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(getActiveCode())
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<SidebarProvider className="h-svh" defaultWidth="13.5rem">
			{/* Left Sidebar */}
			<Sidebar theme="gray" collapsible="icon">
				{/* Sidebar Header */}
				<SidebarHeader className="border-border bg-fill2 flex flex-col gap-1 border-b p-4 group-data-[state=collapsed]:items-center group-data-[state=collapsed]:p-4">
					<div className="flex items-center gap-2">
						<div className="bg-primary text-primary-fg shadow-primary/20 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-black shadow-md">
							R
						</div>
						<span className="group-data-[state=collapsed]:hidden">Sandbox</span>
					</div>
				</SidebarHeader>

				{/* Sidebar Navigation */}
				<SidebarContent className="flex-1 space-y-6 overflow-y-auto p-4 group-data-[state=collapsed]:mt-4 group-data-[state=collapsed]:space-y-4 group-data-[state=collapsed]:p-0">
					<SidebarGroup className="p-0">
						<SidebarGroupLabel className="text-fg-tertiary flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wider group-data-[state=collapsed]:hidden">
							<span>Components</span>
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu className="space-y-1">
								{/* Motion / Logo */}
								<SidebarMenuItem>
									<SidebarMenuButton
										isActive={activeComponent === "motion"}
										variant={
											activeComponent === "motion" ? "strong" : "neutral"
										}
										tooltip="src/app/sandbox/motion"
										onClick={() => {
											setActiveComponent("motion")
											setActiveFile("logo-section.tsx")
										}}
										className={cn(
											"group flex w-full items-center justify-start gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200",
											activeComponent !== "motion" &&
												"hover:bg-fill3 text-fg-secondary hover:text-fg",
											"group-data-[state=collapsed]:p-2!"
										)}>
										<Folder className="text-primary size-4 shrink-0" />
										<span className="flex-1 truncate group-data-[state=collapsed]:hidden">
											motion
										</span>
									</SidebarMenuButton>
								</SidebarMenuItem>

								{/* Klarheit FAQ */}
								<SidebarMenuItem>
									<SidebarMenuButton
										isActive={activeComponent === "faq"}
										variant={activeComponent === "faq" ? "strong" : "neutral"}
										tooltip="src/app/sandbox/klarheit-faq"
										onClick={() => {
											setActiveComponent("faq")
											setActiveFile("faq-section.tsx")
										}}
										className={cn(
											"group flex w-full items-center justify-start gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200",
											activeComponent !== "faq" &&
												"hover:bg-fill3 text-fg-secondary hover:text-fg",
											"group-data-[state=collapsed]:p-2!"
										)}>
										<Folder className="text-primary size-4 shrink-0" />
										<span className="flex-1 truncate group-data-[state=collapsed]:hidden">
											klarheit-faq
										</span>
									</SidebarMenuButton>
								</SidebarMenuItem>

								{/* Testimonials */}
								<SidebarMenuItem>
									<SidebarMenuButton
										isActive={activeComponent === "testimonials"}
										variant={
											activeComponent === "testimonials" ? "strong" : "neutral"
										}
										tooltip="src/app/sandbox/klarheit-testimonial"
										onClick={() => {
											setActiveComponent("testimonials")
											setActiveFile("testimonial-section.tsx")
										}}
										className={cn(
											"group flex w-full items-center justify-start gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200",
											activeComponent !== "testimonials" &&
												"hover:bg-fill3 text-fg-secondary hover:text-fg",
											"group-data-[state=collapsed]:p-2!"
										)}>
										<Folder className="text-primary size-4 shrink-0" />
										<span className="flex-1 truncate group-data-[state=collapsed]:hidden">
											klarheit-testimonial
										</span>
									</SidebarMenuButton>
								</SidebarMenuItem>

								{/* Beam Header */}
								<SidebarMenuItem>
									<SidebarMenuButton
										isActive={activeComponent === "beam-header"}
										variant={
											activeComponent === "beam-header" ? "strong" : "neutral"
										}
										tooltip="src/app/sandbox/beam-header"
										onClick={() => {
											setActiveComponent("beam-header")
											setActiveFile("beam-header-section.tsx")
										}}
										className={cn(
											"group flex w-full items-center justify-start gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200",
											activeComponent !== "beam-header" &&
												"hover:bg-fill3 text-fg-secondary hover:text-fg",
											"group-data-[state=collapsed]:p-2!"
										)}>
										<Folder className="text-primary size-4 shrink-0" />
										<span className="flex-1 truncate group-data-[state=collapsed]:hidden">
											beam-header
										</span>
									</SidebarMenuButton>
								</SidebarMenuItem>

								{/* Jambo Pricing */}
								<SidebarMenuItem>
									<SidebarMenuButton
										isActive={activeComponent === "jambo-pricing"}
										variant={
											activeComponent === "jambo-pricing" ? "strong" : "neutral"
										}
										tooltip="src/app/sandbox/jambo-pricing"
										onClick={() => {
											setActiveComponent("jambo-pricing")
											setActiveFile("jambo-pricing-section.tsx")
										}}
										className={cn(
											"group flex w-full items-center justify-start gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200",
											activeComponent !== "jambo-pricing" &&
												"hover:bg-fill3 text-fg-secondary hover:text-fg",
											"group-data-[state=collapsed]:p-2!"
										)}>
										<Folder className="text-primary size-4 shrink-0" />
										<span className="flex-1 truncate group-data-[state=collapsed]:hidden">
											jambo-pricing
										</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>

			{/* Main Workspace Area */}
			<SidebarInset className="bg-bg relative flex min-h-0 flex-1 flex-col overflow-hidden">
				{/* Top Controls Header */}
				<header className="border-border bg-fill1 sticky top-0 z-10 flex items-center justify-between border-b p-2.5 px-6">
					{/* Active Path Breadcrumbs */}
					<div className="text-fg-secondary flex items-center gap-2 text-sm">
						<SidebarTrigger className="text-fg-tertiary hover:bg-fill3 hover:text-fg mr-1" />
						<span className="text-fg-tertiary font-medium">sandbox</span>
						<ChevronRight className="text-fg-tertiary size-3" />
						<span className="font-medium">
							{activeComponent === "motion"
								? "motion"
								: activeComponent === "testimonials"
									? "klarheit-testimonial"
									: activeComponent === "faq"
										? "klarheit-faq"
										: activeComponent === "beam-header"
											? "beam-header"
											: "jambo-pricing"}
						</span>
						<ChevronRight className="text-fg-tertiary size-3" />
						<span className="text-fg overflow-hidden text-ellipsis font-semibold">
							{activeFile}
						</span>
					</div>

					<div className="flex items-center gap-3">
						<div className="flex items-center gap-1">
							{referenceUrls[activeComponent] && (
								<IconButton variant="ghost" color="neutral" size="32">
									<a
										href={referenceUrls[activeComponent]}
										target="_blank"
										rel="noopener noreferrer">
										<Globe className="text-fg-tertiary hover:text-fg size-4" />
									</a>
								</IconButton>
							)}
							<IconButton variant="ghost" color="neutral" size="32">
								<a
									href={previewRoutes[activeComponent]}
									target="_blank"
									rel="noopener noreferrer">
									<ExternalLink className="text-fg-tertiary hover:text-fg size-4" />
								</a>
							</IconButton>
						</div>
						{viewMode === "preview" && (
							<Tabs
								value={deviceSize}
								onValueChange={(v) => setDeviceSize(v as DeviceSize)}>
								<TabsList>
									<TabsTrigger value="desktop" title="Desktop view">
										<Monitor className="size-4" />
									</TabsTrigger>
									<TabsTrigger value="tablet" title="Tablet view (768px)">
										<Tablet className="size-4" />
									</TabsTrigger>
									<TabsTrigger value="mobile" title="Mobile view (375px)">
										<Smartphone className="size-4" />
									</TabsTrigger>
								</TabsList>
							</Tabs>
						)}
						<Tabs
							value={viewMode}
							onValueChange={(v) => setViewMode(v as ViewMode)}>
							<TabsList>
								<TabsTrigger value="preview">
									<Eye className="size-3.5" />
								</TabsTrigger>
								<TabsTrigger value="code">
									<Code className="size-3.5" />
								</TabsTrigger>
							</TabsList>
						</Tabs>

						<IconButton
							variant="ghost"
							color="neutral"
							size="32"
							onClick={() =>
								setTheme(resolvedTheme === "light" ? "dark" : "light")
							}
							title={
								mounted
									? `Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`
									: "Loading theme"
							}
							className="text-fg-tertiary hover:bg-fill3 hover:text-fg transition-all duration-200">
							{!mounted ? (
								<div className="bg-fg-tertiary/30 h-4 w-4 animate-pulse rounded-full" />
							) : resolvedTheme === "light" ? (
								<Moon className="animate-in fade-in zoom-in-75 size-4 duration-200" />
							) : (
								<Sun className="animate-in fade-in zoom-in-75 size-4 duration-200" />
							)}
						</IconButton>
					</div>
				</header>

				{/* Workspace Content */}
				<div className="flex min-h-0 flex-1 overflow-hidden">
					<div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
						{/* Live Preview Pane */}
						{viewMode === "preview" && (
							<div className="flex flex-1 flex-col items-center overflow-y-auto">
								<div
									className={cn(
										"flex h-full min-h-[500px] flex-col gap-6 transition-all duration-300",
										deviceSize === "mobile" && "w-[375px]",
										deviceSize === "tablet" && "w-[768px]",
										deviceSize === "desktop" && "w-full"
									)}>
									{/* Component Preview Card */}
									<div className="text-fg flex flex-1 flex-col overflow-hidden">
										<div className="bg-bg text-fg relative flex flex-1 overflow-hidden">
											<iframe
												key={activeComponent}
												src={previewRoutes[activeComponent]}
												className="bg-bg h-full w-full border-0"
												title="Component Preview"
											/>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Source Code Highlighter Pane */}
						{viewMode === "code" && (
							<div className="bg-bg text-fg relative flex flex-1 overflow-hidden">
								{/* Inner Code Area Files List */}
								<div className="border-border bg-fill1/40 flex w-[200px] shrink-0 flex-col border-r">
									<div className="border-border bg-fill2/20 flex h-[48px] shrink-0 items-center border-b px-4">
										<span className="text-fg-secondary text-xs font-semibold uppercase tracking-wider">
											Files
										</span>
									</div>
									<div className="flex-1 space-y-1 overflow-y-auto p-2">
										{Object.keys(
											activeComponent === "motion"
												? files.motion
												: activeComponent === "testimonials"
													? files["klarheit-testimonial"]
													: activeComponent === "faq"
														? files["klarheit-faq"]
														: activeComponent === "beam-header"
															? files["beam-header"]
															: files["jambo-pricing"]
										).map((fileName) => {
											const isSelected = activeFile === fileName
											return (
												<button
													key={fileName}
													onClick={() => setActiveFile(fileName)}
													className={cn(
														"group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-xs font-medium transition-all duration-200",
														isSelected
															? "bg-primary text-primary-fg"
															: "text-fg-secondary hover:bg-fill3 hover:text-fg"
													)}>
													<FileCode
														className={cn(
															"size-3.5 shrink-0",
															isSelected
																? "text-primary-fg"
																: "text-fg-tertiary group-hover:text-primary"
														)}
													/>
													<span className="flex-1 truncate">{fileName}</span>
												</button>
											)
										})}
									</div>
								</div>

								{/* Main Code View Pane */}
								<div className="flex flex-1 flex-col overflow-hidden">
									{/* Code Pane toolbar */}
									<div className="border-border bg-fill1 flex h-[48px] shrink-0 items-center justify-between border-b px-6">
										<span className="text-fg-secondary flex items-center gap-1.5 font-mono text-xs">
											{activeFile}
										</span>
										<Button
											variant="outline"
											color="neutral"
											size="28"
											onClick={handleCopy}
											className="text-fg-secondary hover:text-fg font-semibold">
											{copied ? (
												<>
													<Check className="text-success-text size-3.5" />
													<span className="text-success-text">Copied!</span>
												</>
											) : (
												<>
													<Copy className="size-3.5" />
													<span>Copy Code</span>
												</>
											)}
										</Button>
									</div>

									{/* Code Editor body */}
									<div className="custom-shiki-container bg-bg flex-1 overflow-auto p-1">
										<CodeArea
											code={getActiveCode()}
											language="tsx"
											theme={
												resolvedTheme === "dark"
													? "github-dark"
													: "github-light"
											}
											lineNumbers={true}
											className="no-scrollbar h-full w-full rounded-none bg-transparent p-0 font-mono text-[13px] leading-relaxed"
										/>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
