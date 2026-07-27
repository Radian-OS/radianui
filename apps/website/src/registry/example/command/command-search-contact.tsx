"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Button, CompactButton } from "@/registry/ui/button"
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
import { ScrollArea } from "@/registry/ui/scroll-area"

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
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState("")
	const [activeFilters, setActiveFilters] = useState<Department[]>([])

	const toggleFilter = (dept: Department) => {
		setActiveFilters((prev) =>
			prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
		)
	}

	const searchResults = query
		? ALL_CONTACTS.filter((c) => {
				const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase())
				const matchesDept =
					activeFilters.length === 0 || activeFilters.includes(c.department)
				return matchesQuery && matchesDept
			})
		: []

	const searchResultIds = new Set(searchResults.map((c) => c.id))

	const allMembers = ALL_CONTACTS.filter(
		(c) =>
			(activeFilters.length === 0 || activeFilters.includes(c.department)) &&
			!searchResultIds.has(c.id)
	)

	return (
		<>
			<Button color="neutral" variant="outline" onClick={() => setOpen(true)}>
				Search Contacts
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<Command
					className="**:data-[slot=command-input-wrapper]:border-none **:data-[slot=command-input-wrapper]:p-0 border-none"
					shouldFilter={false}>
					{/* Input row */}
					<div className="flex items-center justify-between gap-2 px-4">
						<CommandInput
							value={query}
							onValueChange={setQuery}
							placeholder="Search..."
							className="flex-1 border-0 p-0"
						/>
						<CompactButton
							color="neutral"
							variant="soft"
							onClick={() => setQuery("")}>
							<X />
						</CompactButton>
					</div>

					{/* Filter badges */}
					<div className="border-soft flex items-center gap-1.5 border-b px-4 pb-3">
						{DEPARTMENTS.map((dept) => {
							const isActive = activeFilters.includes(dept)
							return (
								<Badge
									key={dept}
									onClick={() => toggleFilter(dept)}
									variant={isActive ? "outline" : "soft"}
									color={isActive ? "primary" : "neutral"}
									size="24"
									className="cursor-pointer select-none transition-all">
									{dept}
									{isActive && <X className="ml-0.5 size-3 opacity-70" />}
								</Badge>
							)
						})}
					</div>

					<CommandList>
						<ScrollArea>
							<CommandEmpty className="text-fg-tertiary py-8 text-sm">
								No contacts found.
							</CommandEmpty>

							{/* Search Results — only shown when query is active */}
							{query && searchResults.length > 0 && (
								<>
									<CommandGroup
										heading={`Search results (${searchResults.length})`}>
										{searchResults.map((contact) => (
											<ContactItem
												key={contact.id}
												contact={contact}
												query={query}
											/>
										))}
									</CommandGroup>
									{allMembers.length > 0 && <CommandDivider />}
								</>
							)}

							{/* All Members — always shown, excludes search result contacts when query is active */}
							{allMembers.length > 0 && (
								<CommandGroup heading="All members">
									{allMembers.map((contact) => (
										<ContactItem key={contact.id} contact={contact} query="" />
									))}
								</CommandGroup>
							)}
						</ScrollArea>
					</CommandList>

					{/* Footer */}
					<div className="border-soft flex items-center justify-between border-t p-4">
						<div className="text-fg-tertiary flex items-center gap-4 text-xs">
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
						<span className="text-fg-tertiary flex items-center gap-2 text-sm">
							<Badge size="20" color="neutral" variant="soft">
								⏎
							</Badge>
							Select
						</span>
					</div>
				</Command>
			</CommandDialog>
		</>
	)
}

function ContactItem({ contact, query }: { contact: Contact; query: string }) {
	return (
		<CommandItem
			key={contact.id}
			value={contact.id}
			className="flex items-center gap-2.5 rounded-md p-2">
			<Avatar size="32" rounded="circle">
				<AvatarImage src={contact.avatar} />
				<AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
			</Avatar>
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
