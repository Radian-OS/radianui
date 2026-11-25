"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button, IconButton } from "@/styles/default/ui/button"
import {
	Monitor,
	Tablet,
	Smartphone,
	Eye,
	Code2,
	Sun,
	Moon,
	Plus,
	Menu,
} from "lucide-react"
import PagePicker from "./page-picker"
import { Tabs, TabsList, TabsTrigger } from "@/styles/default/ui/tabs"
import { CreateProjectDialog } from "./create-project-dialog"
import { MobileNavigation } from "@/components/navbar/mobile-tablet-navigation"

export type DeviceSize = "desktop" | "tablet" | "mobile"

interface ThemerTopbarProps {
	selectedComponent?: string
	onSelectComponent?: (value: string) => void
	device?: DeviceSize
	onDeviceChange?: (value: DeviceSize) => void
}

export function ThemerTopbar({
	selectedComponent,
	onSelectComponent,
	device = "desktop",
	onDeviceChange,
}: ThemerTopbarProps) {
	const [mounted, setMounted] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const { resolvedTheme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	const toggleTheme = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark")
	}

	return (
		<header className="border-border bg-bg flex h-12 shrink-0 items-center justify-between gap-2 border-b px-2 sm:px-3">
			<div className="flex min-w-0 items-center gap-2.5">
				<PagePicker
					selectedComponent={selectedComponent}
					onSelect={onSelectComponent}
				/>
				<span className="text-soft-alpha hidden text-xs 2xl:inline">|</span>
				<span className="text-fg-secondary hidden text-sm font-normal 2xl:inline">
					Want a full site?{" "}
					<a href="#" className="text-fg hover:text-primary transition-colors">
						Open Radian&apos;s builder
					</a>
				</span>
			</div>

			<div className="flex shrink-0 items-center gap-2">
				<Tabs
					className="hidden sm:flex"
					value={device}
					onValueChange={(val) => onDeviceChange?.(val as DeviceSize)}>
					<TabsList
						className="p-0.5 data-[orientation=horizontal]:h-10"
						aria-label="Preview device">
						<TabsTrigger
							value="desktop"
							aria-label="Desktop view"
							title="Desktop view"
							className="size-9 p-0">
							<Monitor />
						</TabsTrigger>
						<TabsTrigger
							value="tablet"
							aria-label="Tablet view"
							title="Tablet view"
							className="size-9 p-0">
							<Tablet />
						</TabsTrigger>
						<TabsTrigger
							value="mobile"
							aria-label="Mobile view"
							title="Mobile view"
							className="size-9 p-0">
							<Smartphone />
						</TabsTrigger>
					</TabsList>
				</Tabs>

				<div className="bg-soft-alpha hidden h-4 w-px xl:block" />
				<Tabs className="hidden xl:flex" defaultValue="preview">
					<TabsList
						className="p-0.5 data-[orientation=horizontal]:h-10"
						aria-label="Preview display">
						<TabsTrigger
							value="preview"
							aria-label="Preview"
							className="size-9 p-0">
							<Eye />
						</TabsTrigger>
						<TabsTrigger value="code" aria-label="Code" className="size-9 p-0">
							<Code2 />
						</TabsTrigger>
					</TabsList>
				</Tabs>
				<div className="bg-soft-alpha hidden h-4 w-px sm:block" />

				<CreateProjectDialog>
					<Button
						color="primary"
						size="md"
						aria-label="Create Project"
						className="max-xl:size-9 max-xl:p-0 sm:order-2">
						<Plus />
						<span className="hidden xl:inline">Create Project</span>
					</Button>
				</CreateProjectDialog>

				<IconButton
					variant="outline"
					size="md"
					color="neutral"
					className="sm:border-transparent"
					aria-label="Toggle theme"
					title="Toggle theme"
					onClick={toggleTheme}>
					{mounted && resolvedTheme === "dark" ? <Sun /> : <Moon />}
				</IconButton>
				<IconButton
					variant="soft"
					size="md"
					color="neutral"
					className="sm:hidden"
					aria-label="Open mobile navigation"
					aria-expanded={isMobileMenuOpen}
					onClick={() => setIsMobileMenuOpen(true)}>
					<Menu />
				</IconButton>
			</div>
			{isMobileMenuOpen && (
				<MobileNavigation
					isMobileMenuOpen={isMobileMenuOpen}
					setIsMobileMenuOpen={setIsMobileMenuOpen}
				/>
			)}
		</header>
	)
}
