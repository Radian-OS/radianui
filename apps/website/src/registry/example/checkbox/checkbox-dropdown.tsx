"use client"

import React from "react"
import { ChevronDown, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Button, CompactButton } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import {
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownItem,
	DropdownTrigger,
} from "@/registry/ui/dropdown"

type BadgeColor = "success" | "warning" | "info"

type TechItem = {
	id: string
	label: string
	category: string
	badgeColor: BadgeColor
}

const techItems: TechItem[] = [
	{
		id: "nodejs",
		label: "Node.js",
		category: "Backend",
		badgeColor: "success",
	},
	{
		id: "svelte",
		label: "Svelte",
		category: "Frontend",
		badgeColor: "warning",
	},
	{ id: "vuejs", label: "Vue.js", category: "Frontend", badgeColor: "warning" },
	{ id: "figma", label: "Figma", category: "UI/UX", badgeColor: "info" },
	{ id: "python", label: "Python", category: "Backend", badgeColor: "warning" },
	{ id: "react", label: "React", category: "Frontend", badgeColor: "warning" },
]

const CheckboxDropdown = () => {
	const [selected, setSelected] = React.useState<Set<string>>(
		new Set(["nodejs", "svelte", "figma"])
	)

	const toggle = (id: string) =>
		setSelected((prev) => {
			const next = new Set(prev)
			if (next.has(id)) {
				next.delete(id)
			} else {
				next.add(id)
			}
			return next
		})

	const remove = (id: string, e: React.MouseEvent) => {
		e.stopPropagation()
		setSelected((prev) => {
			const next = new Set(prev)
			next.delete(id)
			return next
		})
	}

	const selectedItems = techItems.filter((t) => selected.has(t.id))

	return (
		<div className="max-w-90 flex w-full flex-col gap-1.5 p-6">
			<p className="text-fg text-base font-semibold">Tech Stack</p>

			<Dropdown>
				<DropdownTrigger asChild>
					<Button
						color="neutral"
						variant="outline"
						className="max-w-90 flex w-full justify-between gap-2">
						<span className="text-fg-tertiary text-sm">
							Choose the technologies...
						</span>
						<ChevronDown className="text-fg-tertiary size-5" />
					</Button>
				</DropdownTrigger>

				{selectedItems.length > 0 && (
					<div className="flex flex-wrap items-center gap-1.5">
						{selectedItems.map((item) => (
							<Badge
								key={item.id}
								variant="outline"
								size="20"
								className="text-fg-tertiary">
								{item.label}
								<X onClick={(e) => remove(item.id, e)} />
							</Badge>
						))}
						<CompactButton color="neutral" variant="ghost">
							<Plus className="text-fg-tertiary" />
						</CompactButton>
					</div>
				)}

				<DropdownContent className="w-full" sideOffset={40}>
					{techItems.map((item) => (
						<DropdownItem
							key={item.id}
							onClick={() => toggle(item.id)}
							className={cn(
								"flex items-center gap-2",
								selected.has(item.id) ? "bg-fill1-alpha" : ""
							)}>
							<Checkbox
								checked={selected.has(item.id)}
								onCheckedChange={() => toggle(item.id)}
								onClick={(e) => e.stopPropagation()}
								size="md"
								className="[&_svg]:text-white"
							/>
							<span className="text-fg flex-1 text-sm font-normal">
								{item.label}
							</span>
							<Badge variant="soft" color={item.badgeColor} size="20">
								{item.category}
							</Badge>
						</DropdownItem>
					))}
					<DropdownDivider />
					<DropdownItem className="flex cursor-pointer items-center gap-2">
						<CompactButton color="neutral" variant="outline">
							<Plus className="text-fg-tertiary" />
						</CompactButton>
						<span className="text-fg-secondary text-sm">Create tag</span>
					</DropdownItem>
				</DropdownContent>
			</Dropdown>
		</div>
	)
}

export default CheckboxDropdown
