"use client"

import * as React from "react"
import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Input } from "@/registry/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

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
		<Tabs defaultValue="preview">
			<TabsList variant="outline-ghost" size="md">
				<TabsTrigger value="preview">
					<EyeIcon />
					Preview
				</TabsTrigger>
				<TabsTrigger value="code">
					<SquareTerminal />
					Code
				</TabsTrigger>
			</TabsList>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center rounded-xl border">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<div>
								<Input placeholder="Search fruits..." value={query} onChange={handleChange} className="w-64" />
							</div>
						</PopoverTrigger>

						{filtered.length > 0 && (
							<PopoverContent onOpenAutoFocus={(e) => e.preventDefault()} className="max-h-100 w-64 overflow-y-auto p-1">
								<ul>
									{filtered.map((item) => (
										<li key={item} className="hover:bg-fill2 cursor-pointer px-2 py-1.5 text-sm" onClick={() => handleSelect(item)}>
											{item}
										</li>
									))}
								</ul>
							</PopoverContent>
						)}
					</Popover>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="search.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

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
					<Input placeholder="Search fruits..." value={query} onChange={handleChange} className="w-64" />
				</div>
			</PopoverTrigger>

			{filtered.length > 0 && (
				<PopoverContent onOpenAutoFocus={(e) => e.preventDefault()} className="max-h-100 w-64 overflow-y-auto p-1">
					<ul>
						{filtered.map((item) => (
							<li key={item} className="hover:bg-fill2 cursor-pointer px-2 py-1.5 text-sm" onClick={() => handleSelect(item)}>
								{item}
							</li>
						))}
					</ul>
				</PopoverContent>
			)}
		</Popover>
	)
}
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
