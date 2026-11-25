import { ThemerMobilePicker } from "./themer-mobile-picker"
import {
	ThemerDrawerContext,
	useThemerPickerPlacement,
} from "./themer-picker-placement"
import React, { useRef } from "react"
import {
	Command,
	CommandDivider,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/styles/default/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/styles/default/ui/popover"
import { ScrollArea } from "@/styles/default/ui/scroll-area"
import { CommandInput as CmdkInput } from "cmdk"
import {
	Check,
	ChevronDown,
	ChevronLeft,
	ListFilter,
	RotateCcw,
	Search,
	Shuffle,
	X,
} from "lucide-react"
import { FONTS } from "@/registry/fonts"
import { useVirtualizer } from "@tanstack/react-virtual"
import { Button, IconButton } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import { DEFAULT_CONFIG } from "@/registry/config"
import { cn } from "@/lib/utils"

const loaded = new Set<string>()

async function loadPreview(family: string) {
	if (!family || loaded.has(family)) return
	loaded.add(family)
	try {
		const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}&text=${encodeURIComponent(family)}`
		const res = await fetch(url)
		if (!res.ok) return
		const css = await res.text()
		const style = document.createElement("style")
		style.textContent = css.replace(
			/font-family:\s*'[^']+'/g,
			`font-family: 'preview-${family}'`
		)
		document.head.appendChild(style)
	} catch {
		// Ignore font fetch errors gracefully
	}
}

function CommandInput({
	value,
	onValueChange,
}: {
	value: string
	onValueChange: (value: string) => void
}) {
	return (
		<div
			data-slot="command-input-wrapper"
			className="flex h-11 items-center gap-2 border-b px-3.5 py-3">
			<Search className="text-fg-tertiary size-5 shrink-0" />
			<CmdkInput
				value={value}
				onValueChange={onValueChange}
				placeholder="Search fonts"
				data-slot="command-input"
				className="placeholder:text-fg-tertiary flex h-11 w-full rounded-md bg-transparent text-sm font-normal outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
			/>
		</div>
	)
}

function FontCard({
	label,
	fontName,
	fontClass,
	provider,
	type,
	icon,
	value,
	onValueChange,
	ref,
	...props
}: {
	label: string
	fontName: string
	fontClass: string
	provider: string
	type: string
	icon: React.ReactNode
	value: string
	onValueChange: (value: string) => void
	ref?: React.Ref<HTMLButtonElement>
} & Omit<React.ComponentPropsWithoutRef<"button">, "type" | "color">) {
	const inDrawer = React.useContext(ThemerDrawerContext)
	const selectedFont = React.useMemo(
		() => FONTS.find((f) => f.value === value || f.name === fontName),
		[value, fontName]
	)

	React.useEffect(() => {
		const nameToLoad = selectedFont?.name || fontName
		if (nameToLoad) {
			loadPreview(nameToLoad)
		}
	}, [selectedFont, fontName])

	return (
		<Button
			ref={ref}
			type="button"
			variant="ghost"
			color="neutral"
			className="block h-auto w-full min-w-0 rounded-[10px] p-0 text-left whitespace-normal select-none"
			{...props}>
			<div
				className={cn(
					"bg-fill1-alpha hover:bg-fill2 flex cursor-pointer flex-col rounded-[10px] p-3 transition-colors",
					inDrawer ? "gap-5" : "gap-8"
				)}>
				<span className="text-fg-secondary text-[13px]">{label}</span>
				<div
					className={cn(
						"flex min-w-0 flex-col",
						inDrawer ? "gap-1.5" : "gap-3.5"
					)}>
					<span
						className={cn(
							"truncate font-medium",
							inDrawer ? "text-base" : "text-xl",
							fontClass
						)}
						style={{
							fontFamily: `"preview-${selectedFont?.name || fontName}", ${selectedFont?.font.family || "sans-serif"}`,
						}}>
						{fontName}
					</span>
					<div className="text-fg-tertiary flex items-center gap-1.5 text-xs">
						{icon}
						<span>
							{provider} • {type}
						</span>
					</div>
				</div>
			</div>
		</Button>
	)
}

const CATEGORY_LABELS: Record<string, string> = {
	all: "All",
	"sans-serif": "Sans Serif",
	serif: "Serif",
	display: "Display",
	monospace: "Monospace",
	handwriting: "Handwriting",
}

const POPULAR_FONTS = [
	"inter",
	"manrope",
	"outfit",
	"poppins",
	"playfair-display",
]

function FontList({
	value,
	onValueChange,
	label,
	onBack,
}: {
	value: string
	onValueChange: (value: string) => void
	label: string
	onBack?: () => void
}) {
	const [search, setSearch] = React.useState("")
	const [category, setCategory] = React.useState("all")
	const [searchOpen, setSearchOpen] = React.useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const inDrawer = React.useContext(ThemerDrawerContext)

	const filteredFonts = React.useMemo(() => {
		const lower = search.toLowerCase()
		const matches = FONTS.filter(
			(f) =>
				f.name.toLowerCase().includes(lower) &&
				(category === "all" || f.category === category)
		)
		if (!inDrawer || lower || category !== "all") return matches
		return [
			...POPULAR_FONTS.flatMap((value) =>
				matches.filter((font) => font.value === value)
			),
			...matches.filter((font) => !POPULAR_FONTS.includes(font.value)),
		]
	}, [search, category, inDrawer])

	const showPopular = inDrawer && !search && category === "all"
	const fontRows = React.useMemo(
		() =>
			showPopular
				? [
						...filteredFonts.slice(0, POPULAR_FONTS.length),
						null,
						...filteredFonts.slice(POPULAR_FONTS.length),
					]
				: filteredFonts,
		[filteredFonts, showPopular]
	)

	const virt = useVirtualizer({
		count: fontRows.length,
		getScrollElement: () =>
			ref.current?.querySelector('[data-slot="scroll-area-viewport"]') ?? null,
		estimateSize: () => 32,
		overscan: 8,
	})

	const rows = virt.getVirtualItems()

	React.useEffect(() => {
		rows.forEach((row) => {
			const font = fontRows[row.index]
			if (font) loadPreview(font.name)
		})
	}, [rows, fontRows])

	React.useEffect(() => {
		if (inDrawer) virt.scrollToOffset(0)
	}, [inDrawer, search, category, virt])

	const categoryMenu = (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{inDrawer ? (
					<IconButton
						size="md"
						color="neutral"
						variant="ghost"
						className="text-fg-secondary"
						aria-label="Filter font category">
						<ListFilter />
					</IconButton>
				) : (
					<Button
						color="neutral"
						variant="soft"
						className="w-full justify-start">
						Style: {CATEGORY_LABELS[category]}{" "}
						<ChevronDown className="text-fg-tertiary ml-auto" />
					</Button>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-[130px]" align="end">
				<DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
					{Object.entries(CATEGORY_LABELS).map(([value, label]) => (
						<DropdownMenuRadioItem key={value} value={value}>
							{label}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)

	return (
		<Command
			className={cn("border-0 p-0", inDrawer && "rounded-none bg-transparent")}
			shouldFilter={false}>
			{inDrawer ? (
				<>
					<h2 className="sr-only">{label} font</h2>
					<p className="sr-only">Choose a theme font.</p>
					{searchOpen ? (
						<div className="border-border focus-within:border-primary focus-within:ring-primary-accent mx-3 flex items-center gap-2 rounded-lg border px-2.5 focus-within:ring-2">
							<Search className="text-fg-tertiary size-5 shrink-0" />
							<CmdkInput
								autoFocus
								aria-label="Search fonts"
								placeholder="Search fonts"
								value={search}
								onValueChange={setSearch}
								className="h-9 min-w-0 flex-1 bg-transparent text-sm outline-none"
							/>
							<IconButton
								size="xs"
								variant="ghost"
								color="neutral"
								aria-label="Close search"
								onClick={() => {
									setSearch("")
									setSearchOpen(false)
								}}>
								<X />
							</IconButton>
						</div>
					) : (
						<div className="flex touch-none items-center justify-between gap-1 px-2">
							<div className="flex min-w-0 items-center gap-2">
								<IconButton
									size="sm"
									variant="ghost"
									color="neutral"
									className="text-fg-secondary"
									aria-label="Back to typography"
									onClick={onBack}>
									<ChevronLeft />
								</IconButton>
								<span className="text-fg truncate text-base font-medium">
									{label} font
								</span>
							</div>
							<div className="flex shrink-0 items-center gap-1">
								<IconButton
									size="md"
									variant="ghost"
									color="neutral"
									className="text-fg-secondary"
									aria-label="Search fonts"
									onClick={() => setSearchOpen(true)}>
									<Search />
								</IconButton>
								<IconButton
									size="md"
									variant="ghost"
									color="neutral"
									className="text-fg-secondary"
									aria-label="Reset font"
									onClick={() =>
										onValueChange(
											label === "Heading"
												? DEFAULT_CONFIG.headingFont
												: DEFAULT_CONFIG.bodyFont
										)
									}>
									<RotateCcw />
								</IconButton>
								{categoryMenu}
								<IconButton
									size="md"
									variant="ghost"
									color="neutral"
									className="text-fg-secondary"
									aria-label="Shuffle font"
									onClick={() => {
										const choices = filteredFonts.filter(
											(font) => font.value !== value
										)
										const next =
											choices[Math.floor(Math.random() * choices.length)]
										if (next) onValueChange(next.value)
									}}>
									<Shuffle />
								</IconButton>
							</div>
						</div>
					)}
				</>
			) : (
				<>
					<CommandInput value={search} onValueChange={setSearch} />
					<CommandGroup className="p-1.5">{categoryMenu}</CommandGroup>
					<CommandDivider />
				</>
			)}
			<CommandList className="max-h-none overflow-visible py-1.5">
				{inDrawer && (
					<div className="text-fg-tertiary px-3.5 pt-3 pb-2 text-xs font-medium">
						{search
							? `Results (${filteredFonts.length})`
							: category === "all"
								? "Popular"
								: "Available fonts"}
					</div>
				)}
				{filteredFonts.length === 0 && (
					<CommandEmpty>No font found.</CommandEmpty>
				)}
				<ScrollArea
					ref={ref}
					type="auto"
					data-vaul-no-drag={inDrawer || undefined}
					className={
						inDrawer
							? "h-[min(15rem,calc(65dvh-7rem))] [&>[data-slot=scroll-area-viewport]]:touch-pan-y [&>[data-slot=scroll-area-viewport]]:overscroll-y-contain"
							: "h-100"
					}>
					<div
						style={{
							height: virt.getTotalSize(),
							width: "100%",
							position: "relative",
						}}>
						{rows.map((row) => {
							const font = fontRows[row.index]
							if (!font)
								return (
									<div
										key={row.key}
										className="text-fg-tertiary absolute inset-x-0 top-0 px-3.5 pt-2 text-xs font-medium"
										style={{ transform: `translateY(${row.start}px)` }}>
										Available fonts
									</div>
								)
							return (
								<CommandItem
									key={row.key}
									className={
										inDrawer && value === font.value
											? "bg-fill1-alpha"
											: undefined
									}
									value={font.name}
									style={{
										position: "absolute",
										top: 0,
										left: 6,
										width: "calc(100% - 12px)",
										height: row.size,
										transform: `translateY(${row.start}px)`,
										fontFamily: `"preview-${font.name}", sans-serif`,
									}}
									onSelect={() => {
										onValueChange(font.value)
									}}>
									{font.name}
									<Check
										className={cn(
											"ml-auto",
											value === font.value ? "opacity-100" : "opacity-0"
										)}
									/>
								</CommandItem>
							)
						})}
					</div>
				</ScrollArea>
			</CommandList>
		</Command>
	)
}

export default function FontPicker(
	props: React.ComponentProps<typeof FontCard>
) {
	const placement = useThemerPickerPlacement("start", 20)
	const inDrawer = React.useContext(ThemerDrawerContext)
	const [open, setOpen] = React.useState(false)

	// Don't remove this
	// Sequentially warm preview fonts in the background to prevent fallback font flicker (FOUT) while scrolling.
	React.useEffect(() => {
		FONTS.reduce(
			(p, font) => p.then(() => loadPreview(font.name)),
			Promise.resolve()
		)
	}, [])

	if (inDrawer) {
		return (
			<ThemerMobilePicker
				trigger={<FontCard {...props} />}
				open={open}
				onOpenChange={setOpen}
				label={`${props.label} font`}
				className="min-h-0 pb-[env(safe-area-inset-bottom)] outline-none">
				<FontList
					label={props.label}
					value={props.value}
					onValueChange={props.onValueChange}
					onBack={() => setOpen(false)}
				/>
			</ThemerMobilePicker>
		)
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<FontCard {...props} />
			</PopoverTrigger>
			<PopoverContent
				{...placement}
				className="w-[300px] max-w-[calc(100vw-1.5rem)] rounded-lg p-0 shadow-sm">
				<FontList
					label={props.label}
					value={props.value}
					onValueChange={props.onValueChange}
				/>
			</PopoverContent>
		</Popover>
	)
}
