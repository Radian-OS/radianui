"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, CornerDownLeft, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Button, CompactButton } from "@/registry/ui/button"
import {
	Command,
	CommandDivider,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/registry/ui/command"

type Department = "Sales" | "Design" | "HR"

interface Contact {
	id: string
	name: string
	role: string
	avatar: string
	department: Department
}

const ALL_CONTACTS: Contact[] = [
	{
		id: "1",
		name: "James Will",
		role: "Human Resource",
		avatar: "/media/male-1.jpg",
		department: "HR",
	},
	{
		id: "2",
		name: "Jager Brane",
		role: "Project Manager",
		avatar: "/media/male-2.jpg",
		department: "Sales",
	},
	{
		id: "3",
		name: "Jane Smith",
		role: "Software Engineer",
		avatar: "/media/female-1.jpg",
		department: "Design",
	},
	{
		id: "4",
		name: "Ause Teague",
		role: "QA",
		avatar: "/media/male-3.jpg",
		department: "Design",
	},
	{
		id: "5",
		name: "Bory Disher",
		role: "UX Design Engineer",
		avatar: "/media/male-4.jpg",
		department: "Design",
	},
	{
		id: "6",
		name: "Bayson Rue",
		role: "Software Developer",
		avatar: "/media/male-5.jpg",
		department: "Sales",
	},
	{
		id: "7",
		name: "Cerie Plaskett",
		role: "Network Engineer",
		avatar: "/media/female-2.jpg",
		department: "HR",
	},
]

const DEPARTMENTS: Department[] = ["Sales", "Design", "HR"]

function highlightMatch(text: string, query: string) {
	if (!query) return <>{text}</>
	const idx = text.toLowerCase().indexOf(query.toLowerCase())
	if (idx === -1) return <>{text}</>
	return (
		<>
			{text.slice(0, idx)}
			<span className="text-primary font-medium">
				{text.slice(idx, idx + query.length)}
			</span>
			{text.slice(idx + query.length)}
		</>
	)
}

export default function CommandSearchContacts() {
	const [query, setQuery] = useState("Ja")
	const [activeFilters, setActiveFilters] = useState<Department[]>(["Sales"])

	const toggleFilter = (dept: Department) => {
		setActiveFilters((prev) =>
			prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
		)
	}

	const filtered = ALL_CONTACTS.filter((c) => {
		const matchesQuery =
			!query || c.name.toLowerCase().includes(query.toLowerCase())
		const matchesDept =
			activeFilters.length === 0 || activeFilters.includes(c.department)
		return matchesQuery && matchesDept
	})

	const searchResults = filtered.filter((c) =>
		query ? c.name.toLowerCase().includes(query.toLowerCase()) : false
	)

	const allMembers = ALL_CONTACTS.filter(
		(c) => activeFilters.length === 0 || activeFilters.includes(c.department)
	)

	return (
		<div className="w-160 flex flex-col gap-2">
			<Button color="neutral" variant="soft">
				Search Contacts
			</Button>

			<Command shouldFilter={false}>
				{/* Input row */}
				<div className="flex items-center justify-between gap-2 px-3">
					<CommandInput
						value={query}
						onValueChange={setQuery}
						placeholder="Search..."
						className="flex-1"
					/>
					{query && (
						<CompactButton onClick={() => setQuery("")}>
							<X />{" "}
						</CompactButton>
					)}
				</div>

				{/* Filter badges */}
				<div className="border-soft flex items-center gap-1.5 border-b px-3 py-2">
					{DEPARTMENTS.map((dept) => {
						const isActive = activeFilters.includes(dept)
						return (
							<button key={dept} onClick={() => toggleFilter(dept)}>
								<Badge
									variant={isActive ? "outline" : "soft"}
									color={isActive ? "primary" : "neutral"}
									size="24"
									className={cn(
										"cursor-pointer select-none transition-all",
										isActive && "border-primary"
									)}>
									{dept}
									{isActive && <X className="ml-0.5 size-3 opacity-70" />}
								</Badge>
							</button>
						)
					})}
				</div>

				<CommandList>
					<CommandEmpty className="text-fg-tertiary py-8 text-sm">
						No contacts found.
					</CommandEmpty>

					{/* Search Results group */}
					{query && searchResults.length > 0 && (
						<CommandGroup heading={`Search Results (${searchResults.length})`}>
							{searchResults.map((contact) => (
								<ContactItem key={contact.id} contact={contact} query={query} />
							))}
						</CommandGroup>
					)}

					{query && searchResults.length > 0 && <CommandDivider />}

					{/* All Members group */}
					<CommandGroup heading="All Members">
						{allMembers.map((contact) => (
							<ContactItem key={contact.id} contact={contact} query="" />
						))}
					</CommandGroup>
				</CommandList>

				{/* Footer */}
				<div className="border-soft flex items-center justify-between border-t px-3 py-2">
					<div className="text-fg-tertiary flex items-center gap-3 text-xs">
						<span className="flex items-center gap-1">
							<kbd className="border-border bg-fill2 inline-flex size-5 items-center justify-center rounded border text-[10px]">
								<ArrowUp className="size-3" />
							</kbd>
							<kbd className="border-border bg-fill2 inline-flex size-5 items-center justify-center rounded border text-[10px]">
								<ArrowDown className="size-3" />
							</kbd>
							Navigate
						</span>
						<span className="flex items-center gap-1">
							<kbd className="border-border bg-fill2 inline-flex h-5 items-center justify-center rounded border px-1 text-[10px]">
								ESC
							</kbd>
							Close
						</span>
					</div>
					<span className="text-fg-tertiary flex items-center gap-1 text-xs">
						<kbd className="border-border bg-fill2 inline-flex size-5 items-center justify-center rounded border text-[10px]">
							<CornerDownLeft className="size-3" />
						</kbd>
						Select
					</span>
				</div>
			</Command>
		</div>
	)
}

function ContactItem({ contact, query }: { contact: Contact; query: string }) {
	return (
		<CommandItem
			key={contact.id}
			value={contact.id}
			className="flex items-center gap-3 rounded-md px-3 py-2">
			<img
				src={contact.avatar}
				alt={contact.name}
				className="size-8 shrink-0 rounded-full object-cover"
			/>
			<div className="flex min-w-0 flex-col">
				<span className="text-fg text-sm font-medium leading-tight">
					{query ? highlightMatch(contact.name, query) : contact.name}
				</span>
				<span className="text-fg-secondary truncate text-xs">
					{contact.role}
				</span>
			</div>
		</CommandItem>
	)
}
