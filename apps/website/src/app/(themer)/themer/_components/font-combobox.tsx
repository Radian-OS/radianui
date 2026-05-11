"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Check, ChevronDown, Lock, LockOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { FONTS } from "@/registry/fonts"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/styles/default/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/styles/default/ui/popover"
import { Spinner } from "@/styles/default/ui/spinner"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/styles/default/ui/tooltip"

const FONT_PAGE_SIZE = 30

export function FontCombobox({
	label,
	value,
	onValueChange,
	isLocked,
	onToggleLock,
}: {
	label: string
	value: string
	onValueChange: (value: string) => void
	isLocked?: boolean
	onToggleLock?: () => void
}) {
	const [open, setOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState("")
	const [visibleCount, setVisibleCount] = useState(FONT_PAGE_SIZE)
	const [loading, setLoading] = useState(false)
	const listRef = useRef<HTMLDivElement>(null)

	const selectedFont = FONTS.find((f) => f.value === value)

	const filteredFonts = useMemo(
		() =>
			FONTS.filter((font) =>
				font.name.toLowerCase().includes(searchTerm.toLowerCase())
			),
		[searchTerm]
	)

	const [shouldScrollToSelected, setShouldScrollToSelected] = useState(false)

	useEffect(() => {
		if (open) {
			setSearchTerm("")
			const selectedIndex = FONTS.findIndex((f) => f.value === value)
			const minVisible =
				selectedIndex >= 0
					? Math.ceil((selectedIndex + 1) / FONT_PAGE_SIZE) * FONT_PAGE_SIZE
					: FONT_PAGE_SIZE
			setVisibleCount(minVisible)
			setShouldScrollToSelected(true)
		}
	}, [open])

	useEffect(() => {
		if (!shouldScrollToSelected || !open) return
		setShouldScrollToSelected(false)

		const list = listRef.current
		if (!list || !selectedFont) return
		const item = list.querySelector(
			`[data-value="${selectedFont.name.toLowerCase()}"]`
		)
		if (item) {
			item.scrollIntoView({ block: "center" })
		}
	}, [shouldScrollToSelected, visibleCount])

	const handleScroll = () => {
		if (loading || searchTerm) return
		const list = listRef.current
		if (!list) return

		if (list.scrollTop + list.clientHeight >= list.scrollHeight - 5) {
			if (visibleCount >= FONTS.length) return
			setLoading(true)
			setTimeout(() => {
				setVisibleCount((prev) => Math.min(prev + FONT_PAGE_SIZE, FONTS.length))
				setLoading(false)
			}, 500)
		}
	}

	const displayedFonts = searchTerm
		? filteredFonts
		: FONTS.slice(0, visibleCount)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<div
				className={cn(
					"border-border bg-elevation-level2 flex w-full overflow-hidden rounded-lg border transition-colors",
					!isLocked && "hover:border-fg-disabled",
					isLocked && "border-primary/25"
				)}>
				<PopoverTrigger asChild>
					<button className="flex min-w-0 flex-1 items-center justify-between gap-2 px-3 py-2 text-sm">
						<div className="flex min-w-0 flex-col items-start gap-0.5">
							<span className="text-fg-tertiary text-[11px]">{label}</span>
							<span className="text-fg truncate font-medium">
								{selectedFont?.name ?? value}
							</span>
						</div>
						<ChevronDown className="text-fg-tertiary size-3.5 shrink-0" />
					</button>
				</PopoverTrigger>
				{onToggleLock && (
					<Tooltip>
						<TooltipTrigger asChild>
							<button
								type="button"
								aria-label={`${isLocked ? "Unlock" : "Lock"} ${label}`}
								aria-pressed={isLocked}
								onClick={onToggleLock}
								className={cn(
									"border-border relative flex w-10 shrink-0 items-center justify-center border-l transition-colors",
									"focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset",
									isLocked
										? "bg-primary-accent text-primary"
										: "text-fg-tertiary hover:bg-fill1 hover:text-fg"
								)}>
								{isLocked ? (
									<Lock className="size-3.5" />
								) : (
									<LockOpen className="size-3.5" />
								)}
							</button>
						</TooltipTrigger>
						<TooltipContent side="top">
							{isLocked ? `${label} locked` : `Lock ${label}`}
						</TooltipContent>
					</Tooltip>
				)}
			</div>
			<PopoverContent side="right" className="w-56 p-0">
				<Command>
					<CommandInput
						placeholder="Search fonts..."
						value={searchTerm}
						onValueChange={setSearchTerm}
					/>
					<CommandList
						ref={listRef}
						onScroll={handleScroll}
						style={{ maxHeight: "300px", overflowY: "auto" }}>
						<CommandEmpty>No font found.</CommandEmpty>
						<CommandGroup>
							{displayedFonts.map((font) => (
								<CommandItem
									key={font.value}
									value={font.name}
									onSelect={() => {
										onValueChange(font.value)
									}}>
									<span>{font.name}</span>
									<Check
										className={cn(
											"ml-auto",
											value === font.value ? "opacity-100" : "opacity-0"
										)}
									/>
								</CommandItem>
							))}
							{!searchTerm && loading && (
								<div className="flex w-full items-center justify-center py-2">
									<Spinner size={20} variant="simple" />
								</div>
							)}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
