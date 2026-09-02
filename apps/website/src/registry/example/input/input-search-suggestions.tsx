"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

const suggestions = [
	"Apple",
	"Banana",
	"Orange",
	"Grapes",
	"Watermelon",
	"Mango",
	"Cherry",
]

export default function SearchInput() {
	const [query, setQuery] = React.useState("")
	const [open, setOpen] = React.useState(false)

	const filtered = React.useMemo(
		() =>
			query.length > 0
				? suggestions.filter((item) =>
						item.toLowerCase().includes(query.toLowerCase())
					)
				: [],
		[query]
	)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setQuery(value)
		setOpen(value.length > 0)
	}

	const handleSelect = (item: string) => {
		setQuery(item)
		setOpen(false)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<div className="w-full max-w-80">
					<InputWrapper className="w-full">
						<Search className="size-5" />
						<Input
							placeholder="eg, Apple, Banana, Orange..."
							value={query}
							onChange={handleChange}
						/>
					</InputWrapper>
				</div>
			</PopoverTrigger>

			{filtered.length > 0 && (
				<PopoverContent
					onOpenAutoFocus={(e) => e.preventDefault()}
					className="no-scrollbar border-border bg-elevation-level2 max-h-60 min-w-[var(--radix-popper-anchor-width)] overflow-y-auto rounded-lg border p-1.5 shadow-xs drop-shadow-xs">
					<ul className="flex flex-col gap-0.5">
						{filtered.map((item) => (
							<li
								key={item}
								className="text-fg hover:bg-fill1-alpha relative flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none"
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => handleSelect(item)}>
								{item}
							</li>
						))}
					</ul>
				</PopoverContent>
			)}
		</Popover>
	)
}
