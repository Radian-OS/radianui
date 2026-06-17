"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, CheckIcon } from "lucide-react"
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
} from "@/registry/ui/command"
import { Switch } from "@/registry/ui/switch"

interface Integration {
	id: string
	name: string
	tagline: string
	category: "Project Management" | "Communication"
	logo: string
	description: string
	features: string[]
}

const INTEGRATIONS: Integration[] = [
	{
		id: "airtable",
		name: "Airtable",
		tagline: "Project management",
		category: "Project Management",
		logo: "/airtable.svg",
		description:
			"A flexible, all-in-one platform to build custom project management workflows, databases, and automated business applications.",
		features: [
			"Fast, automated workflows.",
			"Real-time status updates and notifications",
			"Connected, smart databases.",
			"Instant team collaboration.",
		],
	},
	{
		id: "asana",
		name: "Asana",
		tagline: "Task Management",
		category: "Project Management",
		logo: "/asana.svg",
		description:
			"Manage your team's work, projects, and tasks in one place to stay on top of deadlines.",
		features: [
			"Task assignments and due dates.",
			"Project timelines and calendars.",
			"Team workload management.",
			"Custom reporting dashboards.",
		],
	},
	{
		id: "clickup",
		name: "Click Up",
		tagline: "Work OS",
		category: "Project Management",
		logo: "/clickup.svg",
		description:
			"One app to replace them all — tasks, docs, goals, and chat in a single productivity platform.",
		features: [
			"Customizable task views.",
			"Docs and wikis built-in.",
			"Goal tracking and reporting.",
			"Integrations with 1000+ tools.",
		],
	},
	{
		id: "notion",
		name: "Notion",
		tagline: "Project Management",
		category: "Project Management",
		logo: "/notion.svg",
		description:
			"An all-in-one workspace for notes, tasks, wikis, and databases to keep your team aligned.",
		features: [
			"Flexible page and database structure.",
			"Real-time collaborative editing.",
			"Templates for any workflow.",
			"Powerful filtering and sorting.",
		],
	},
	{
		id: "outlook",
		name: "Microsoft Outlook",
		tagline: "Email & Calendar",
		category: "Communication",
		logo: "/outlook.svg",
		description:
			"Stay connected with professional email, calendar, and contacts all in one place.",
		features: [
			"Unified inbox for email.",
			"Calendar and meeting scheduling.",
			"Contact management.",
			"Deep Microsoft 365 integration.",
		],
	},
	{
		id: "zoom",
		name: "Zoom",
		tagline: "Team Communication",
		category: "Communication",
		logo: "/zoom.svg",
		description:
			"Video conferencing, webinars, and team chat to keep your distributed team connected.",
		features: [
			"HD video and audio meetings.",
			"Webinars and virtual events.",
			"Team chat messaging.",
			"Screen sharing and recording.",
		],
	},
	{
		id: "discord",
		name: "Discord",
		tagline: "Community Chat",
		category: "Communication",
		logo: "/discord.svg",
		description:
			"Voice, video, and text communication built for communities and teams of all sizes.",
		features: [
			"Organized channels by topic.",
			"Voice and video rooms.",
			"Bot and webhook automation.",
			"Role-based access control.",
		],
	},
]

export default function CommandSearchIntegration() {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState("")
	const [selected, setSelected] = useState<Integration>(INTEGRATIONS[0])
	const [enabled, setEnabled] = useState<Record<string, boolean>>({
		airtable: true,
	})

	const filtered = INTEGRATIONS.filter(
		(i) =>
			!query ||
			i.name.toLowerCase().includes(query.toLowerCase()) ||
			i.tagline.toLowerCase().includes(query.toLowerCase())
	)

	const projectMgmt = filtered.filter(
		(i) => i.category === "Project Management"
	)
	const communication = filtered.filter((i) => i.category === "Communication")

	const toggleEnabled = (id: string) =>
		setEnabled((prev) => ({ ...prev, [id]: !prev[id] }))

	return (
		<>
			<Button color="neutral" variant="outline" onClick={() => setOpen(true)}>
				Search Integration
			</Button>
			<CommandDialog
				open={open}
				onOpenChange={setOpen}
				className="max-w-[760px] overflow-hidden p-0">
				<Command shouldFilter={false}>
					<div className="flex" style={{ minHeight: 520 }}>
						{/* Left: Command list */}
						<div
							className="border-border flex flex-col border-r"
							style={{ width: 280 }}>
							{/* Search */}
							<div className="border-border flex items-center gap-2 border-b px-3">
								<CommandInput
									value={query}
									onValueChange={setQuery}
									placeholder="Search integrations..."
								/>
								<span className="text-fg-tertiary shrink-0 font-mono text-xs">
									⌘+K
								</span>
							</div>

							<CommandList className="max-h-[460px]">
								<CommandEmpty className="text-fg-tertiary py-8 text-sm">
									No integrations found.
								</CommandEmpty>

								{projectMgmt.length > 0 && (
									<CommandGroup heading="Project Management">
										{projectMgmt.map((item) => (
											<IntegrationItem
												key={item.id}
												item={item}
												isSelected={selected.id === item.id}
												onSelect={() => setSelected(item)}
											/>
										))}
									</CommandGroup>
								)}

								{projectMgmt.length > 0 && communication.length > 0 && (
									<CommandDivider />
								)}

								{communication.length > 0 && (
									<CommandGroup heading="Communication">
										{communication.map((item) => (
											<IntegrationItem
												key={item.id}
												item={item}
												isSelected={selected.id === item.id}
												onSelect={() => setSelected(item)}
											/>
										))}
									</CommandGroup>
								)}
							</CommandList>

							{/* Left footer */}
							<div className="border-border text-fg-tertiary mt-auto flex items-center gap-3 border-t px-3 py-2 text-xs">
								<span className="flex items-center gap-1">
									<Badge size="20" color="neutral" variant="soft">
										<ArrowUp className="size-3.5" />
									</Badge>
									<Badge size="20" color="neutral" variant="soft">
										<ArrowDown className="size-3.5" />
									</Badge>
									Navigate
								</span>
								<span className="flex items-center gap-1">
									<Badge size="20" color="neutral" variant="soft">
										ESC
									</Badge>
									Close
								</span>
							</div>
						</div>

						{/* Right: Detail panel */}
						<div className="flex flex-1 flex-col gap-4 p-5">
							{/* Logo + toggle */}
							<div className="flex items-start justify-between">
								<div className="bg-fill2 border-border flex size-12 items-center justify-center overflow-hidden rounded-xl border p-2">
									<img
										src={selected.logo}
										alt={selected.name}
										className="size-8 object-contain"
									/>
								</div>
								<Switch
									checked={!!enabled[selected.id]}
									onCheckedChange={() => toggleEnabled(selected.id)}
								/>
							</div>

							{/* Name + description */}
							<div>
								<h2 className="text-fg mb-1 text-xl font-bold">
									{selected.name}
								</h2>
								<p className="text-fg-secondary text-sm leading-relaxed">
									{selected.description}
								</p>
							</div>

							{/* Key features */}
							<div>
								<p className="text-fg mb-2 text-sm font-semibold">
									Key Features
								</p>
								<ul className="flex flex-col gap-1.5">
									{selected.features.map((f) => (
										<li
											key={f}
											className="text-fg-secondary flex items-center gap-2 text-sm">
											<CheckIcon className="text-primary size-4 shrink-0" />
											{f}
										</li>
									))}
								</ul>
							</div>

							{/* CTA buttons */}
							<div className="mt-auto flex flex-col gap-2">
								<Button>View Integration</Button>
								<Button variant="outline" color="neutral">
									Learn more
								</Button>
							</div>

							{/* Right footer hints */}
							<div className="text-fg-tertiary flex items-center justify-end gap-4 pt-1 text-xs">
								<span className="flex items-center gap-1">
									<Badge size="20" color="neutral" variant="soft">
										⇧+⏎
									</Badge>
									Visit website
								</span>
								<span className="flex items-center gap-1">
									<Badge size="20" color="neutral" variant="soft">
										⏎
									</Badge>
									View Integration
								</span>
							</div>
						</div>
					</div>
				</Command>
			</CommandDialog>
		</>
	)
}

function IntegrationItem({
	item,
	isSelected,
	onSelect,
}: {
	item: Integration
	isSelected: boolean
	onSelect: () => void
}) {
	return (
		<CommandItem
			value={item.id}
			onSelect={onSelect}
			className={cn(
				"flex cursor-pointer items-center gap-3 rounded-md px-3 py-2",
				isSelected && "bg-fill1-alpha"
			)}>
			<div className="bg-fill2 border-border flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border p-1">
				<img
					src={item.logo}
					alt={item.name}
					className="size-5 object-contain"
				/>
			</div>
			<div className="flex min-w-0 flex-col">
				<span className="text-fg text-sm font-medium leading-tight">
					{item.name}
				</span>
				<span className="text-fg-secondary truncate text-xs">
					{item.tagline}
				</span>
			</div>
		</CommandItem>
	)
}
