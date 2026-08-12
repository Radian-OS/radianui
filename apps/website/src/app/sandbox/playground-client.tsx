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
import { BeamHeaderSection } from "./beam-header/beam-header-section"
import { TestimonialSection } from "./test2/testimonial-section"
import { LogoSection } from "./test/logo-section"

// Previews

interface FilesData {
	test: Record<string, string>
	test2: Record<string, string>
	"beam-header": Record<string, string>
}

interface PlaygroundClientProps {
	files: FilesData
}

type PreviewKey = "logo" | "faq" | "beam-header"
type ViewMode = "preview" | "code"
type DeviceSize = "desktop" | "tablet" | "mobile"

const referenceUrls: Record<PreviewKey, string> = {
	logo: "https://www.flowbase.co/preview/jambo-logo-01",
	faq: "https://www.flowbase.co/preview/klarheit-faq-02",
	"beam-header": "https://www.flowbase.co/preview/beam-header-01",
}

const previewRoutes: Record<PreviewKey, string> = {
	logo: "/sandbox/test",
	faq: "/sandbox/test2",
	"beam-header": "/sandbox/beam-header",
}

export function PlaygroundClient({ files }: PlaygroundClientProps) {
	// Sidebar state
	const [activeComponent, setActiveComponent] = useState<PreviewKey>("logo")
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
		if (activeComponent === "logo") {
			return files.test[activeFile] || ""
		}
		if (activeComponent === "faq") {
			return files.test2[activeFile] || ""
		}
		if (activeComponent === "beam-header") {
			return files["beam-header"][activeFile] || ""
		}
		return ""
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(getActiveCode())
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<div className="bg-bg text-fg flex h-screen w-screen overflow-hidden">
			{/* Left Sidebar */}
			<aside className="border-border bg-fill1 z-20 flex w-[230px] shrink-0 flex-col border-r shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
				{/* Sidebar Header */}
				<div className="border-border bg-fill2/50 flex flex-col gap-1 border-b p-6">
					<div className="flex items-center gap-2">
						<div className="bg-primary text-primary-fg shadow-primary/20 flex h-6 w-6 items-center justify-center rounded-lg text-xs font-black shadow-md">
							R
						</div>
						<span className="from-fg via-fg-secondary to-fg bg-gradient-to-r bg-clip-text text-lg font-bold tracking-tight text-transparent">
							Radian Playground
						</span>
					</div>
					<span className="text-fg-tertiary text-xs">
						Interactive Component Sandbox
					</span>
				</div>

				{/* Sidebar Navigation */}
				<div className="flex-1 space-y-6 overflow-y-auto p-4">
					{/* Test Section */}
					<div className="space-y-2">
						<div className="text-fg-tertiary flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wider">
							<Folder className="text-primary size-3.5" />
							<span>src/app/sandbox/test</span>
						</div>
						<div className="space-y-1">
							{Object.keys(files.test).map((fileName) => {
								const isSelected =
									activeComponent === "logo" && activeFile === fileName
								return (
									<Button
										key={fileName}
										variant={isSelected ? "strong" : "ghost"}
										color={isSelected ? "primary" : "neutral"}
										size="32"
										onClick={() => selectFile("logo", fileName)}
										className={cn(
											"group flex w-full items-center justify-start gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200",
											!isSelected &&
												"hover:bg-fill3 text-fg-secondary hover:text-fg"
										)}>
										<FileCode
											className={cn(
												"size-4 shrink-0",
												isSelected
													? "text-primary-fg"
													: "text-fg-tertiary group-hover:text-primary"
											)}
										/>
										<span className="flex-1 truncate">{fileName}</span>
										{fileName === "logo-section.tsx" && (
											<span
												className={cn(
													"rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase",
													isSelected
														? "bg-white/20 text-white"
														: "bg-primary-accent text-primary-text"
												)}>
												Main
											</span>
										)}
									</Button>
								)
							})}
						</div>
					</div>

					{/* Test2 Section */}
					<div className="space-y-2">
						<div className="text-fg-tertiary flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wider">
							<Folder className="text-primary size-3.5" />
							<span>src/app/sandbox/test2</span>
						</div>
						<div className="space-y-1">
							{Object.keys(files.test2).map((fileName) => {
								const isSelected =
									activeComponent === "faq" && activeFile === fileName
								return (
									<Button
										key={fileName}
										variant={isSelected ? "strong" : "ghost"}
										color={isSelected ? "primary" : "neutral"}
										size="32"
										onClick={() => selectFile("faq", fileName)}
										className={cn(
											"group flex w-full items-center justify-start gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200",
											!isSelected &&
												"hover:bg-fill3 text-fg-secondary hover:text-fg"
										)}>
										<FileCode
											className={cn(
												"size-4 shrink-0",
												isSelected
													? "text-primary-fg"
													: "text-fg-tertiary group-hover:text-primary"
											)}
										/>
										<span className="flex-1 truncate">{fileName}</span>
										{fileName === "faq-section.tsx" && (
											<span
												className={cn(
													"rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase",
													isSelected
														? "bg-white/20 text-white"
														: "bg-primary-accent text-primary-text"
												)}>
												Main
											</span>
										)}
									</Button>
								)
							})}
						</div>
					</div>

					{/* Beam Header Section */}
					<div className="space-y-2">
						<div className="text-fg-tertiary flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wider">
							<Folder className="text-primary size-3.5" />
							<span>src/app/sandbox/beam-header</span>
						</div>
						<div className="space-y-1">
							{Object.keys(files["beam-header"]).map((fileName) => {
								const isSelected =
									activeComponent === "beam-header" && activeFile === fileName
								return (
									<Button
										key={fileName}
										variant={isSelected ? "strong" : "ghost"}
										color={isSelected ? "primary" : "neutral"}
										size="32"
										onClick={() => selectFile("beam-header", fileName)}
										className={cn(
											"group flex w-full items-center justify-start gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200",
											!isSelected &&
												"hover:bg-fill3 text-fg-secondary hover:text-fg"
										)}>
										<FileCode
											className={cn(
												"size-4 shrink-0",
												isSelected
													? "text-primary-fg"
													: "text-fg-tertiary group-hover:text-primary"
											)}
										/>
										<span className="flex-1 truncate">{fileName}</span>
										{fileName === "beam-header-section.tsx" && (
											<span
												className={cn(
													"rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase",
													isSelected
														? "bg-white/20 text-white"
														: "bg-primary-accent text-primary-text"
												)}>
												Main
											</span>
										)}
									</Button>
								)
							})}
						</div>
					</div>
				</div>

				{/* Sidebar Footer */}
				<div className="border-border bg-fill2/30 text-fg-tertiary flex items-center justify-between border-t p-4 text-xs">
					<span>OS Workspace</span>
					<span className="bg-success h-2 w-2 animate-pulse rounded-full" />
				</div>
			</aside>

			{/* Main Workspace Area */}
			<main className="bg-bg relative flex flex-1 flex-col overflow-hidden">
				{/* Top Controls Header */}
				<header className="border-border bg-fill1/80 z-10 flex h-[64px] items-center justify-between border-b px-6 backdrop-blur-md">
					{/* Active Path Breadcrumbs */}
					<div className="text-fg-secondary flex items-center gap-2 text-sm">
						<span className="text-fg-tertiary font-medium">sandbox</span>
						<ChevronRight className="text-fg-tertiary size-3" />
						<span className="font-medium">
							{activeComponent === "logo"
								? "test"
								: activeComponent === "faq"
									? "test2"
									: "beam-header"}
						</span>
						<ChevronRight className="text-fg-tertiary size-3" />
						<span className="text-fg max-w-[150px] overflow-hidden text-ellipsis font-semibold">
							{activeFile}
						</span>
					</div>

					{/* Center: Device Sizing Buttons (Only for Preview mode) */}
					{viewMode === "preview" && (
						<div className="bg-fill2 border-border flex items-center gap-1 rounded-xl border p-1">
							<IconButton
								variant={deviceSize === "desktop" ? "strong" : "ghost"}
								color="neutral"
								size="32"
								onClick={() => setDeviceSize("desktop")}
								title="Desktop view"
								className={cn(
									deviceSize === "desktop"
										? "bg-bg text-fg shadow-sm"
										: "text-fg-tertiary hover:bg-fill3 hover:text-fg"
								)}>
								<Monitor className="size-4" />
							</IconButton>
							<IconButton
								variant={deviceSize === "tablet" ? "strong" : "ghost"}
								color="neutral"
								size="32"
								onClick={() => setDeviceSize("tablet")}
								title="Tablet view (768px)"
								className={cn(
									deviceSize === "tablet"
										? "bg-bg text-fg shadow-sm"
										: "text-fg-tertiary hover:bg-fill3 hover:text-fg"
								)}>
								<Tablet className="size-4" />
							</IconButton>
							<IconButton
								variant={deviceSize === "mobile" ? "strong" : "ghost"}
								color="neutral"
								size="32"
								onClick={() => setDeviceSize("mobile")}
								title="Mobile view (375px)"
								className={cn(
									deviceSize === "mobile"
										? "bg-bg text-fg shadow-sm"
										: "text-fg-tertiary hover:bg-fill3 hover:text-fg"
								)}>
								<Smartphone className="size-4" />
							</IconButton>
						</div>
					)}

					{/* Right: Layout Mode Selector & Theme Toggler */}
					<div className="flex items-center gap-3">
						<div className="bg-fill2 border-border flex items-center gap-1 rounded-xl border p-1">
							<Button
								variant={viewMode === "preview" ? "strong" : "ghost"}
								color="neutral"
								size="28"
								onClick={() => setViewMode("preview")}
								className={cn(
									"font-semibold",
									viewMode === "preview"
										? "bg-bg text-fg shadow-sm"
										: "text-fg-tertiary hover:bg-fill3 hover:text-fg"
								)}>
								<Eye className="size-3.5" />
								<span>Preview</span>
							</Button>
							<Button
								variant={viewMode === "code" ? "strong" : "ghost"}
								color="neutral"
								size="28"
								onClick={() => setViewMode("code")}
								className={cn(
									"font-semibold",
									viewMode === "code"
										? "bg-bg text-fg shadow-sm"
										: "text-fg-tertiary hover:bg-fill3 hover:text-fg"
								)}>
								<Code className="size-3.5" />
								<span>Code</span>
							</Button>
						</div>

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
				<div className="flex flex-1 overflow-hidden p-6">
					<div className="flex h-full flex-1 overflow-hidden">
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
									<div className="bg-bg border-border text-fg flex flex-1 flex-col overflow-hidden rounded-xl border shadow-sm">
										<div className="border-border text-fg-tertiary flex select-none items-center justify-between border-b px-4 py-3 text-[11px] font-semibold">
											<span>
												Component Preview —{" "}
												{activeComponent === "logo"
													? "LogoSection"
													: activeComponent === "faq"
														? "FaqSection"
														: "BeamHeaderSection"}
											</span>
											<div className="flex items-center gap-4">
												{referenceUrls[activeComponent] && (
													<a
														href={referenceUrls[activeComponent]}
														target="_blank"
														rel="noopener noreferrer"
														className="text-primary hover:text-primary-hover flex items-center gap-1 font-medium transition-colors">
														<Globe className="size-3.5" />
														<span>Reference Website</span>
													</a>
												)}
												<a
													href={previewRoutes[activeComponent]}
													target="_blank"
													rel="noopener noreferrer"
													className="text-primary hover:text-primary-hover flex items-center gap-1 font-medium transition-colors">
													<ExternalLink className="size-3.5" />
													<span>Full Page Preview</span>
												</a>
												<span className="font-mono">
													{deviceSize === "desktop"
														? "Desktop view"
														: deviceSize === "tablet"
															? "Tablet view"
															: "Mobile view"}
												</span>
											</div>
										</div>
										<div className="bg-bg text-fg relative flex flex-1 items-center justify-center overflow-auto p-6">
											<div className="w-full">
												{activeComponent === "logo" && <LogoSection />}
												{activeComponent === "faq" && <TestimonialSection />}
												{activeComponent === "beam-header" && (
													<BeamHeaderSection />
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Source Code Highlighter Pane */}
						{viewMode === "code" && (
							<div className="bg-bg text-fg border-border relative flex flex-1 flex-col overflow-hidden rounded-xl border shadow-sm">
								{/* Code Pane toolbar */}
								<div className="border-border bg-fill1 flex h-[48px] shrink-0 items-center justify-between border-b px-6">
									<span className="text-fg-secondary flex items-center gap-1.5 font-mono text-xs">
										<span className="bg-primary h-1.5 w-1.5 rounded-full" />
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
								<div className="custom-shiki-container bg-bg flex-1 overflow-auto p-6">
									<CodeArea
										code={getActiveCode()}
										language="tsx"
										theme={
											resolvedTheme === "dark" ? "github-dark" : "github-light"
										}
										lineNumbers={true}
										className="no-scrollbar h-full w-full rounded-none bg-transparent p-0 font-mono text-[13px] leading-relaxed"
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</main>
		</div>
	)
}
