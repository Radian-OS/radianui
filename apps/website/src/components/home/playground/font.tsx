import React, { useEffect, useRef, useState } from "react"
import { Type } from "lucide-react"
import { FontCategory, usePlayground } from "@/contexts/playground"
import fonts from "@/data/google-fonts.json"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/registry/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

const PAGE_SIZE = 15

export default function Font() {
	const { setFontName, setFontCategory } = usePlayground()
	const [open, setOpen] = useState(false)
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
	const [loading, setLoading] = useState(false)
	const [searchTerm, setSearchTerm] = useState("")

	const listRef = useRef<HTMLDivElement>(null)

	// Filter fonts based on search term
	const filteredFonts = fonts.fonts.filter((font) => font.family.toLowerCase().includes(searchTerm.toLowerCase()))

	// Handle scroll to load more (only if no search)
	const handleScroll = () => {
		if (loading || searchTerm) return // disable lazy load during search
		const list = listRef.current
		if (!list) return

		if (list.scrollTop + list.clientHeight >= list.scrollHeight - 5) {
			if (visibleCount >= fonts.fonts.length) return
			setLoading(true)

			setTimeout(() => {
				setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, fonts.fonts.length))
				setLoading(false)
			}, 1000)
		}
	}

	// Reset on popover open
	useEffect(() => {
		if (open) setVisibleCount(PAGE_SIZE)
	}, [open])

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<div className="hover:bg-fill2 flex size-8 cursor-pointer items-center justify-center rounded-md">
					<Type size={18} />
				</div>
			</PopoverTrigger>

			<PopoverContent sideOffset={10} className="border-none p-0">
				<Command className="w-full max-w-md">
					<CommandInput placeholder="Search Google Fonts" value={searchTerm} onValueChange={setSearchTerm} />
					<CommandList ref={listRef} onScroll={handleScroll} style={{ maxHeight: "300px", overflowY: "auto" }}>
						<CommandEmpty>No results found</CommandEmpty>

						<CommandGroup>
							{(searchTerm ? filteredFonts : fonts.fonts.slice(0, visibleCount)).map((font) => (
								<CommandItem
									onSelect={() => {
										setFontName?.(font.family)
										setFontCategory?.(font.category as FontCategory)
										setOpen(false)
									}}
									key={font.family}
									className="flex justify-between">
									<span>{font.family}</span>
									<span className="text-fg-tertiary text-[13px] font-normal">{font.category}</span>
								</CommandItem>
							))}

							{!searchTerm && loading && <div className="text-fg-tertiary py-2 text-center text-sm">Loading more fonts...</div>}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
