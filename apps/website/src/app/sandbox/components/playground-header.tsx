"use client"

import React, { useEffect, useState } from "react"
import {
	ChevronRight,
	Code,
	ExternalLink,
	Eye,
	Globe,
	Monitor,
	Moon,
	Smartphone,
	SquareDashedMousePointer,
	Sun,
	Tablet,
} from "lucide-react"
import { useTheme } from "next-themes"
import { IconButton } from "@/styles/default/ui/button"
import { SidebarTrigger } from "@/styles/default/ui/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/styles/default/ui/tabs"
import type { DeviceSize, SandboxComponentConfig, ViewMode } from "./types"

interface PlaygroundHeaderProps {
	activeComponentConfig: SandboxComponentConfig
	activeFile: string
	viewMode: ViewMode
	onViewModeChange: (mode: ViewMode) => void
	deviceSize: DeviceSize
	onDeviceSizeChange: (size: DeviceSize) => void
}

export function PlaygroundHeader({
	activeComponentConfig,
	activeFile,
	viewMode,
	onViewModeChange,
	deviceSize,
	onDeviceSizeChange,
}: PlaygroundHeaderProps) {
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<header className="border-border bg-fill1 sticky top-0 z-10 flex items-center justify-between border-b p-2.5 px-6">
			{/* Active Path Breadcrumbs */}
			<div className="text-fg-secondary flex items-center gap-2 text-sm">
				<SidebarTrigger className="text-fg-tertiary hover:bg-fill3 hover:text-fg mr-1" />
				<span className="text-fg-tertiary font-medium">sandbox</span>
				<ChevronRight className="text-fg-tertiary size-3" />
				<span className="font-medium">{activeComponentConfig.label}</span>
				<ChevronRight className="text-fg-tertiary size-3" />
				<span className="text-fg overflow-hidden text-ellipsis font-semibold">
					{activeFile}
				</span>
			</div>

			<div className="flex items-center gap-3">
				{/* Reference and Preview External Links */}
				<div className="flex items-center gap-1">
					{activeComponentConfig.referenceUrl && (
						<IconButton variant="ghost" color="neutral" size="32">
							<a
								href={activeComponentConfig.referenceUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="View original reference">
								<Globe className="text-fg-tertiary hover:text-fg size-4" />
							</a>
						</IconButton>
					)}
					{activeComponentConfig.previewRoute && (
						<IconButton variant="ghost" color="neutral" size="32">
							<a
								href={activeComponentConfig.previewRoute}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Open preview in new tab">
								<ExternalLink className="text-fg-tertiary hover:text-fg size-4" />
							</a>
						</IconButton>
					)}
				</div>

				{/* Device Size Switcher Tabs (Visible in Preview/Inspect modes) */}
				{(viewMode === "preview" || viewMode === "inspect") && (
					<Tabs
						value={deviceSize}
						onValueChange={(v) => onDeviceSizeChange(v as DeviceSize)}>
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

				{/* View Mode Switcher Tabs (Preview / Inspect / Code) */}
				<Tabs
					value={viewMode}
					onValueChange={(v) => onViewModeChange(v as ViewMode)}>
					<TabsList>
						<TabsTrigger value="preview" title="Preview mode">
							<Eye className="size-3.5" />
						</TabsTrigger>
						<TabsTrigger value="inspect" title="Inspect elements">
							<SquareDashedMousePointer className="size-3.5" />
						</TabsTrigger>
						<TabsTrigger value="code" title="View source code">
							<Code className="size-3.5" />
						</TabsTrigger>
					</TabsList>
				</Tabs>

				{/* Theme Toggle Button */}
				<IconButton
					variant="ghost"
					color="neutral"
					size="32"
					onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
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
	)
}
