"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/registry/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

const backendFrameworks = [
	{ value: "express", label: "Express.js" },
	{ value: "django", label: "Django" },
	{ value: "spring_boot", label: "Spring Boot" },
	{ value: "laravel", label: "Laravel" },
	{ value: "fastapi", label: "FastAPI" },
	{ value: "rails", label: "Ruby on Rails" },
	{ value: "nest", label: "NestJS" },
	{ value: "adonis", label: "AdonisJS" },
	{ value: "flask", label: "Flask" },
	{ value: "aspnet_core", label: "ASP.NET Core" },
]

export default function ComboboxMultiselect() {
	const [open, setOpen] = React.useState(false)
	const [selectedValues, setSelectedValues] = React.useState<string[]>(["express", "django"])

	const toggleSelection = (value: string) => {
		setSelectedValues((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
	}

	const removeSelection = (value: string) => {
		setSelectedValues((prev) => prev.filter((v) => v !== value))
	}

	return (
		<div className="w-[300px]">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" role="combobox" aria-expanded={open} className="hover:bg-bg relative h-auto min-h-9 w-full justify-start p-1 pe-5" color="neutral">
						<div className="flex flex-wrap items-center gap-1">
							{selectedValues.length > 0 ? (
								selectedValues.map((val) => {
									const framework = backendFrameworks.find((f) => f.value === val)
									return framework ? (
										<Badge key={val} variant="outline" color="neutral">
											{framework.label}
											<X
												className="hover:text-fg-secondary ml-1 cursor-pointer"
												onClick={(e) => {
													e.stopPropagation()
													removeSelection(val)
												}}
											/>
										</Badge>
									) : null
								})
							) : (
								<span className="px-2.5">Select backend frameworks</span>
							)}
						</div>
						<ChevronDown className="absolute end-1.5 top-2" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-(--radix-popper-anchor-width) p-0">
					<Command className="border-0">
						<CommandInput placeholder="Search framework..." />
						<CommandList>
							<CommandEmpty>No framework found.</CommandEmpty>
							<CommandGroup>
								{backendFrameworks.map((framework) => (
									<CommandItem key={framework.value} value={framework.value} onSelect={() => toggleSelection(framework.value)}>
										<span className="truncate">{framework.label}</span>
										{selectedValues.includes(framework.value) && <Check className="ml-auto" />}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}
