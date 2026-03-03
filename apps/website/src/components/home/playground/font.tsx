import React, { useEffect, useRef, useState } from "react"
import { Type } from "lucide-react"
import { FONTS } from "@/components/typography/typography-playground"
import { FontCategory, usePlayground } from "@/contexts/playground"
import fonts from "@/data/google-fonts.json"
import { IconButton } from "@/registry/ui/button"
import {
	Command,
	CommandDivider,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/registry/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { Spinner } from "@/registry/ui/spinner"

const PAGE_SIZE = 15

export default function Font() {
	const { setFontName, setFontCategory } = usePlayground()
	const [open, setOpen] = useState(false)
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
	const [loading, setLoading] = useState(false)
	const [searchTerm, setSearchTerm] = useState("")

	const listRef = useRef<HTMLDivElement>(null)

	// Filter fonts based on search term
	const filteredFonts = fonts.fonts.filter((font) =>
		font.family.toLowerCase().includes(searchTerm.toLowerCase())
	)

	// Handle scroll to load more (only if no search)
	const handleScroll = () => {
		if (loading || searchTerm) return // disable lazy load during search
		const list = listRef.current
		if (!list) return

		if (list.scrollTop + list.clientHeight >= list.scrollHeight - 5) {
			if (visibleCount >= fonts.fonts.length) return
			setLoading(true)

			setTimeout(() => {
				setVisibleCount((prev) =>
					Math.min(prev + PAGE_SIZE, fonts.fonts.length)
				)
				setLoading(false)
			}, 1000)
		}
	}

	useEffect(() => {
		if (open) setVisibleCount(PAGE_SIZE)
	}, [open])

	useEffect(() => {
		const visibleFonts = searchTerm
			? filteredFonts.map((f) => f.family)
			: fonts.fonts.slice(0, visibleCount).map((f) => f.family)

		visibleFonts.forEach((family) => {
			const id = `font-preload-${family}`
			if (document.getElementById(id)) return

			const link = document.createElement("link")
			link.id = id
			link.rel = "stylesheet"
			link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}&display=swap`
			document.head.appendChild(link)
		})
	}, [visibleCount, searchTerm])

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<IconButton
					aria-label="Change Font"
					variant="ghost"
					color="neutral"
					className="hover:bg-fill2 text-fg flex size-8 cursor-pointer items-center justify-center rounded-md">
					<Type size={18} />
				</IconButton>
			</PopoverTrigger>

			<PopoverContent sideOffset={10} className="w-82 border-none p-0">
				<Command className="w-full max-w-md">
					<CommandInput
						placeholder="Search Google Fonts"
						value={searchTerm}
						onValueChange={setSearchTerm}
					/>
					<CommandList
						ref={listRef}
						onScroll={handleScroll}
						style={{ maxHeight: "300px", overflowY: "auto" }}>
						<CommandEmpty>No results found</CommandEmpty>
						<CommandGroup>
							{Object.entries(FONTS).map(([family]) => (
								<CommandItem
									className="flex justify-between"
									key={family}
									onSelect={() => {
										setFontName?.(family)
										setOpen(false)
									}}>
									<span style={{ fontFamily: `"${family}", sans-serif` }}>
										{family}
									</span>
									<span className="text-fg-tertiary text-[13px] font-normal">
										sans-serif
									</span>
								</CommandItem>
							))}
						</CommandGroup>
						<CommandDivider />

						<CommandGroup>
							{(searchTerm
								? filteredFonts
								: fonts.fonts.slice(0, visibleCount)
							).map((font) => (
								<CommandItem
									onSelect={() => {
										setFontName?.(font.family)
										setFontCategory?.(font.category as FontCategory)
										setOpen(false)
									}}
									key={font.family}
									className="flex justify-between">
									<span style={{ fontFamily: `"${font.family}", sans-serif` }}>
										{font.family}
									</span>
									<span className="text-fg-tertiary text-[13px] font-normal">
										{font.category}
									</span>
								</CommandItem>
							))}

							{!searchTerm && loading && (
								<div className="flex w-full items-center justify-center">
									<Spinner size={28} variant="simple" />
								</div>
							)}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
