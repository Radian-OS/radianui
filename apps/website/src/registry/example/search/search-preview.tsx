"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

const suggestions = ["Apple", "Banana", "Orange", "Grapes", "Watermelon", "Mango", "Cherry"]

export default function SearchInput() {
	const [query, setQuery] = React.useState("")
	const [filtered, setFiltered] = React.useState<string[]>([])
	const [open, setOpen] = React.useState(false)

	React.useEffect(() => {
		if (query.length > 0) {
			const matches = suggestions.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
			setFiltered(matches)
		} else {
			setFiltered([])
			setOpen(false)
		}
	}, [query])

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
				<div>
					<InputWrapper className="w-80">
						<Search className="size-5" />
						<Input placeholder="Search fruits..." value={query} onChange={handleChange} />
					</InputWrapper>
				</div>
			</PopoverTrigger>

			{filtered.length > 0 && (
				<PopoverContent onOpenAutoFocus={(e) => e.preventDefault()} className="max-h-100 w-80 overflow-y-auto p-1">
					<ul>
						{filtered.map((item) => (
							<li key={item} className="hover:bg-fill2-alpha cursor-pointer px-2 py-1.5 text-sm" onClick={() => handleSelect(item)}>
								{item}
							</li>
						))}
					</ul>
				</PopoverContent>
			)}
		</Popover>
	)
}
