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
} from "lucide-react"
import PagePicker from "./page-picker"
import { Tabs, TabsList, TabsTrigger } from "@/styles/default/ui/tabs"
import { CreateProjectDialog } from "./create-project-dialog"

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
	const { resolvedTheme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	const toggleTheme = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark")
	}
	return (
		<header className="border-border bg-bg flex h-12 shrink-0 items-center justify-between border-b px-3 py-3.5">
			<div className="hidden items-center gap-2.5 md:flex">
				<PagePicker
					selectedComponent={selectedComponent}
					onSelect={onSelectComponent}
				/>
				<span className="text-soft-alpha text-xs">|</span>
				<span className="text-fg-secondary text-sm font-normal">
					Want a full site?{" "}
					<a href="#" className="text-fg hover:text-primary transition-colors">
						Open Radian&apos;s builder
					</a>
				</span>
			</div>

			<div className="flex items-center gap-2.5">
				<Tabs
					value={device}
					onValueChange={(val) => onDeviceChange?.(val as DeviceSize)}>
					<TabsList className="p-0.5 data-[orientation=horizontal]:h-7">
						<TabsTrigger
							value="desktop"
							title="Desktop View"
							className="px-1.5 py-1 [&>svg]:size-4">
							<Monitor />
						</TabsTrigger>
						<TabsTrigger
							value="tablet"
							title="Tablet View"
							className="px-1.5 py-1 [&>svg]:size-4">
							<Tablet />
						</TabsTrigger>
						<TabsTrigger
							value="mobile"
							title="Mobile View"
							className="px-1.5 py-1 [&>svg]:size-4">
							<Smartphone />
						</TabsTrigger>
					</TabsList>
				</Tabs>

				<div className="bg-soft-alpha h-4 w-px" />
				<Tabs defaultValue="preview">
					<TabsList className="p-0.5 data-[orientation=horizontal]:h-7">
						<TabsTrigger value="preview" className="px-1.5 py-1 [&>svg]:size-4">
							<Eye />
						</TabsTrigger>
						<TabsTrigger value="code" className="px-1.5 py-1 [&>svg]:size-4">
							<Code2 />
						</TabsTrigger>
					</TabsList>
				</Tabs>

				<div className="bg-soft-alpha h-4 w-px" />

				<IconButton
					variant="ghost"
					size="xs"
					color="neutral"
					aria-label="Toggle theme"
					title="Toggle theme"
					onClick={toggleTheme}>
					{mounted && resolvedTheme === "dark" ? (
						<Sun className="text-fg-tertiary size-4" />
					) : (
						<Moon className="text-fg-tertiary size-4" />
					)}
				</IconButton>

				<div className="bg-soft-alpha h-4 w-px" />

				<CreateProjectDialog>
					<Button color="primary" size="xs">
						<Plus />
						Create Project
					</Button>
				</CreateProjectDialog>
			</div>
		</header>
	)
}
