"use client"

import * as React from "react"
import { Check, ChevronDown, Plus, Squircle, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge, BadgeDot } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/registry/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { ScrollArea } from "@/registry/ui/scroll-area"

const companyDepartments = [
	{ value: "hr", label: "HR", state: "fill-error text-error" },
	{ value: "engineering", label: "Engineering", state: "fill-info text-info" },
	{ value: "marketing", label: "Marketing", state: "fill-info text-info" },
	{ value: "sales", label: "Sales", state: "fill-success text-success" },
	{ value: "finance", label: "Finance", state: "fill-warning text-warning" },
	{ value: "it", label: "IT", state: "fill-success text-success" },
	{ value: "legal", label: "Legal", state: "fill-warning text-warning" },
	{ value: "product", label: "Product", state: "fill-info text-info" },
	{ value: "operations", label: "Operations", state: "fill-error text-error" },
]

export default function ComboboxTags() {
	const [open, setOpen] = React.useState(false)
	const [selectedValues, setSelectedValues] = React.useState<string[]>([
		"hr",
		"engineering",
	])
	const [search, setSearch] = React.useState("")

	const toggleSelection = (value: string) => {
		setSelectedValues((prev) =>
			prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
		)
	}

	const removeSelection = (value: string) => {
		setSelectedValues((prev) => prev.filter((v) => v !== value))
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="relative h-auto min-h-9 w-full max-w-80 justify-start p-2 pe-6"
					color="neutral">
					<div className="flex flex-wrap gap-1">
						{selectedValues.length > 0 ? (
							selectedValues.map((val) => {
								const department = companyDepartments.find(
									(d) => d.value === val
								)
								return department ? (
									<Badge key={val} variant="outline" color="neutral" size="20">
										<BadgeDot className={department.state} />
										{department.label}
										<X
											className="hover:text-fg-secondary text-fg-tertiary size-3! cursor-pointer"
											onClick={(e) => {
												e.stopPropagation()
												removeSelection(val)
											}}
										/>
									</Badge>
								) : null
							})
						) : (
							<span className="px-2.5">Select tags</span>
						)}
					</div>
					<ChevronDown className="absolute end-1.5 top-2" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="fill-bg w-(--radix-popper-anchor-width) p-0">
				<Command className="border-0">
					<CommandInput
						placeholder="Search"
						value={search}
						onValueChange={setSearch}
					/>
					<CommandList className="max-h-none overflow-visible">
						<CommandEmpty>No department found.</CommandEmpty>
						<ScrollArea className="h-74">
							<CommandGroup>
								<CommandItem className="text-info-text cursor-pointer">
									<Plus className="stroke-info-text size-4" /> Create new tag
								</CommandItem>
								{companyDepartments.map((department) => (
									<CommandItem
										key={department.value}
										value={department.value}
										onSelect={() => toggleSelection(department.value)}>
										<Squircle className={cn("size-4", department.state)} />
										<span className="truncate">{department.label}</span>
										{selectedValues.includes(department.value) && (
											<Check className="ml-auto" />
										)}
									</CommandItem>
								))}
							</CommandGroup>
						</ScrollArea>

						{search.trim() != "" && (
							<div className="border-t p-1">
								<div className="[&_svg:not([class*='text-'])]:text-fg-tertiary text-info-text relative flex cursor-default cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
									<Plus className="stroke-info-text size-4" />
									{`Create new tag "${search}"`}
								</div>
							</div>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
