"use client"

import { Button, IconButton } from "@/styles/default/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/styles/default/ui/select"
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

export function ThemerTopbar() {
	return (
		<header className="border-border bg-bg flex h-12 shrink-0 items-center justify-between border-b px-3 py-3.5">
			<div className="hidden items-center gap-2.5 md:flex">
				<PagePicker />
				<span className="text-soft-alpha text-xs">|</span>
				<span className="text-fg-secondary text-sm font-normal">
					Want a full site?{" "}
					<a
						href="#"
						className="text-fg hover:text-primary underline transition-colors">
						Open Radian&apos;s builder
					</a>
				</span>
			</div>

			<div className="flex items-center gap-2.5">
				<Tabs>
					<TabsList size="sm" defaultValue="desktop">
						<TabsTrigger value="desktop">
							<Monitor className="size-4" />
						</TabsTrigger>
						<TabsTrigger value="tablet">
							<Tablet className="size-4" />
						</TabsTrigger>
						<TabsTrigger value="mobile">
							<Smartphone className="size-4" />
						</TabsTrigger>
					</TabsList>
				</Tabs>

				<div className="bg-soft-alpha h-4 w-px" />
				<Tabs>
					<TabsList size="sm" defaultValue={"preview"}>
						<TabsTrigger value="preview">
							<Eye className="size-4" />
						</TabsTrigger>
						<TabsTrigger value="code">
							<Code2 className="size-4" />
						</TabsTrigger>
					</TabsList>
				</Tabs>

				<div className="bg-soft-alpha h-4 w-px" />

				<IconButton variant="ghost" size="28" color="neutral">
					<Moon className="text-fg-tertiary size-4" />
				</IconButton>

				<div className="bg-soft-alpha h-4 w-px" />

				<Button color="primary" size="28">
					<Plus />
					Create Project
				</Button>
			</div>
		</header>
	)
}
