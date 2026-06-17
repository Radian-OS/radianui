"use client"

import { Fragment, useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import {
	Command,
	CommandDialog,
	CommandDivider,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from "@/registry/ui/command"
import { ScrollArea } from "@/registry/ui/scroll-area"

type Category = "All" | "Actions" | "Navigation" | "Settings"

interface SystemCommand {
	id: string
	label: string
	description: string
	shortcut: string
	category: Exclude<Category, "All">
}

const COMMANDS: SystemCommand[] = [
	{
		id: "1",
		label: "Create New Task",
		description: "Add a quick to-do item with due date.",
		shortcut: "⌘+N",
		category: "Actions",
	},
	{
		id: "2",
		label: "Mark All Notifications Read",
		description: "Clear your inbox quickly.",
		shortcut: "⌘+R",
		category: "Actions",
	},
	{
		id: "3",
		label: "Export Data",
		description: "Download your tasks and projects.",
		shortcut: "⌘+E",
		category: "Actions",
	},
	{
		id: "4",
		label: "Go to Dashboard",
		description: "View team and personal activity overview.",
		shortcut: "⌘+H",
		category: "Navigation",
	},
	{
		id: "5",
		label: "Team Directory",
		description: "Search for and view colleague profiles.",
		shortcut: "⌘+P",
		category: "Navigation",
	},
	{
		id: "6",
		label: "View Documentation",
		description: "Access help guides and tutorials.",
		shortcut: "⌘+D",
		category: "Navigation",
	},
	{
		id: "7",
		label: "Open Settings",
		description: "Configure account and application defaults.",
		shortcut: "⌘+,",
		category: "Settings",
	},
	{
		id: "8",
		label: "Manage Credentials",
		description: "Manage your login and security preferences.",
		shortcut: "⌘+I",
		category: "Settings",
	},
]

const CATEGORIES: Category[] = ["All", "Actions", "Navigation", "Settings"]

export default function CommandSystemCommands() {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState("")
	const [activeCategory, setActiveCategory] = useState<Category>("All")

	const visible = COMMANDS.filter((cmd) => {
		const matchesQuery =
			!query ||
			cmd.label.toLowerCase().includes(query.toLowerCase()) ||
			cmd.description.toLowerCase().includes(query.toLowerCase())
		const matchesCategory =
			activeCategory === "All" || cmd.category === activeCategory
		return matchesQuery && matchesCategory
	})

	const grouped = (["Actions", "Navigation", "Settings"] as const)
		.map((cat) => ({
			category: cat,
			items: visible.filter((c) => c.category === cat),
		}))
		.filter((g) => g.items.length > 0)

	return (
		<>
			<Button color="neutral" variant="outline" onClick={() => setOpen(true)}>
				System Commands
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<Command
					className="**:data-[slot=command-input-wrapper]:border-none"
					shouldFilter={false}>
					{/* Input */}
					<div className="border-soft flex items-center justify-between gap-2 border-b px-3">
						<CommandInput
							value={query}
							onValueChange={setQuery}
							placeholder="Search projects, files, and commands..."
						/>
						<span className="text-fg-tertiary shrink-0 font-mono text-xs">
							⌘+K
						</span>
					</div>

					{/* Category filter badges */}
					<div className="border-soft flex items-center gap-1.5 border-b px-3 py-2.5">
						{CATEGORIES.map((cat) => {
							const isActive = activeCategory === cat
							return (
								<Badge
									key={cat}
									onClick={() => setActiveCategory(cat)}
									variant={isActive ? "outline" : "soft"}
									color={isActive ? "primary" : "neutral"}
									size="24"
									className={cn(
										"cursor-pointer select-none transition-all",
										isActive && "border-primary"
									)}>
									{cat}
									{isActive && <X className="ml-0.5 size-3 opacity-70" />}
								</Badge>
							)
						})}
					</div>

					<CommandList className="max-h-150">
						<ScrollArea>
							<CommandEmpty className="text-fg-tertiary py-8 text-sm">
								No commands found.
							</CommandEmpty>

							{grouped.map((group, i) => (
								<Fragment key={group.category}>
									{i > 0 && <CommandDivider />}
									<CommandGroup heading={group.category.toUpperCase()}>
										{group.items.map((cmd) => (
											<CommandItem
												key={cmd.id}
												value={cmd.id}
												className="group flex items-center justify-between gap-2 rounded-md p-2">
												<div className="flex min-w-0 flex-col gap-0.5">
													<span className="text-fg text-sm font-medium leading-tight">
														{cmd.label}
													</span>
													<span className="text-fg-secondary text-xs">
														{cmd.description}
													</span>
												</div>
												<CommandShortcut className="text-fg-tertiary ml-4 shrink-0 font-mono text-xs">
													<Badge variant="soft" color="neutral" size="20">
														{cmd.shortcut}
													</Badge>
												</CommandShortcut>
											</CommandItem>
										))}
									</CommandGroup>
								</Fragment>
							))}
						</ScrollArea>
					</CommandList>
				</Command>
			</CommandDialog>
		</>
	)
}
