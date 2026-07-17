"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, CheckIcon } from "lucide-react"
import Image from "next/image"
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
				className="md:min-w-190 w-full p-0">
				<Command
					className="**:data-[slot=command-input-wrapper]:border-none **:data-[slot=command-input-wrapper]:p-0 border-none"
					shouldFilter={false}>
					<div className="flex w-full flex-col">
						<div className="border-soft flex w-full items-center justify-between border-b px-3">
							<CommandInput
								value={query}
								onValueChange={setQuery}
								placeholder="Search integrations..."
							/>
							<span className="text-fg-tertiary shrink-0 font-mono text-xs">
								⌘+K
							</span>
						</div>
						{/* Left: Command list */}
						<div className="flex w-full">
							<div className="border-border flex flex-1 flex-col md:border-r">
								{/* Search */}
								<CommandList className="max-h-none">
									<CommandEmpty className="text-fg-tertiary p-2 text-sm">
										No integrations found.
									</CommandEmpty>

									{projectMgmt.length > 0 && (
										<CommandGroup heading="PROJECT MANAGEMENT">
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
										<CommandGroup heading="COMMUNICATION">
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
							</div>

							{/* Right: Detail panel */}
							<div className="hidden flex-1 flex-col gap-6 p-5 md:flex">
								{/* Logo + toggle */}
								<div className="flex items-start justify-between">
									<Image
										src={selected.logo}
										alt={selected.name}
										width={48}
										height={48}
										className="object-contain"
									/>
									<Switch
										checked={!!enabled[selected.id]}
										onCheckedChange={() => toggleEnabled(selected.id)}
									/>
								</div>

								{/* Name + description */}
								<div className="flex flex-col gap-2">
									<h2 className="text-fg heading-6">{selected.name}</h2>
									<p className="text-fg-secondary text-sm leading-relaxed">
										{selected.description}
									</p>
								</div>

								{/* Key features */}
								<div className="flex flex-col gap-3">
									<p className="text-fg mb-2 text-sm font-medium">
										Key Features
									</p>
									<ul className="flex flex-col gap-3">
										{selected.features.map((f) => (
											<li
												key={f}
												className="text-fg-secondary flex items-center gap-2 text-sm">
												<CheckIcon className="text-primary bg-primary-accent size-3.5 shrink-0 p-0.5" />
												{f}
											</li>
										))}
									</ul>
								</div>

								{/* CTA buttons */}
								<div className="flex flex-col gap-2.5">
									<Button className="w-full">View Integration</Button>
									<Button className="w-full" variant="outline" color="neutral">
										Learn more
									</Button>
								</div>
							</div>
						</div>

						<div className="border-soft flex items-center justify-between border-t p-4">
							<div className="text-fg-tertiaryflex flex items-center gap-4 text-xs">
								<span className="flex items-center gap-2">
									<div className="flex items-center gap-1">
										<Badge size="20" color="neutral" variant="soft">
											<ArrowUp className="size-3.5" />
										</Badge>
										<Badge size="20" color="neutral" variant="soft">
											<ArrowDown className="size-3.5" />
										</Badge>
									</div>
									Navigate
								</span>
								<span className="flex items-center gap-2">
									Close
									<Badge size="20" color="neutral" variant="soft">
										ESC
									</Badge>
								</span>
							</div>

							<div className="text-fg-tertiary flex gap-4 text-xs">
								<span className="flex items-center gap-2">
									<Badge size="20" color="neutral" variant="soft">
										⇧+⏎
									</Badge>
									Visit website
								</span>
								<span className="flex items-center gap-2">
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
				"flex cursor-pointer items-center gap-2.5 rounded-md p-2",
				isSelected && "bg-fill1-alpha"
			)}>
			<Image
				src={item.logo}
				alt={item.name}
				height={32}
				width={32}
				className="object-contain"
			/>
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
