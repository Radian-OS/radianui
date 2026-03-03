"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
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

const frameworks = [
	{ value: "react", label: "React" },
	{ value: "vue", label: "Vue" },
	{ value: "svelte", label: "Svelte" },
	{ value: "angular", label: "Angular" },
	{ value: "solid", label: "Solid" },
	{ value: "qwik", label: "Qwik" },
	{ value: "astro", label: "Astro" },
	{ value: "ember", label: "Ember" },
	{ value: "preact", label: "Preact" },
	{ value: "backbone", label: "Backbone" },
	{ value: "nextjs", label: "Next.js" },
	{ value: "nuxt", label: "Nuxt" },
	{ value: "remix", label: "Remix" },
	{ value: "blitz", label: "Blitz.js" },
	{ value: "redwood", label: "RedwoodJS" },
	{ value: "marko", label: "Marko" },
	{ value: "alpine", label: "Alpine.js" },
	{ value: "stimulus", label: "Stimulus" },
	{ value: "knockout", label: "Knockout" },
	{ value: "mithril", label: "Mithril" },
	{ value: "dojo", label: "Dojo" },
	{ value: "sapui5", label: "SAPUI5" },
	{ value: "riot", label: "Riot" },
	{ value: "lit", label: "Lit" },
	{ value: "inferno", label: "Inferno" },
	{ value: "stencil", label: "Stencil" },
	{ value: "hyperapp", label: "Hyperapp" },
	{ value: "choo", label: "Choo" },
	{ value: "jquery", label: "jQuery" },
	{ value: "dojo2", label: "Dojo 2" },
]

export default function ComboboxWithScrollArea() {
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState("")

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					color="neutral"
					role="combobox"
					aria-expanded={open}
					className="w-80 justify-between">
					{value
						? frameworks.find((f) => f.value === value)?.label
						: "Select framework..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-(--radix-popper-anchor-width) bg-bg p-0">
				<Command className="border-0">
					<CommandInput placeholder="Search framework..." />
					<CommandEmpty>No framework found.</CommandEmpty>

					<CommandList className="max-h-none overflow-visible">
						<ScrollArea className="h-48">
							<CommandGroup>
								{frameworks.map((framework) => (
									<CommandItem
										key={framework.value}
										onSelect={() => {
											setValue(framework.value)
											setOpen(false)
										}}>
										<span className="truncate">{framework.label}</span>
										<Check
											className={cn(
												"ml-auto",
												value === framework.value ? "opacity-100" : "opacity-0"
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</ScrollArea>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
