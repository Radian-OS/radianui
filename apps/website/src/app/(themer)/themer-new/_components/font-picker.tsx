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
import { Check, ChevronDown, Search } from "lucide-react"
import { FONTS } from "@/registry/fonts"
import { useVirtualizer } from "@tanstack/react-virtual"
import { Button } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
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
	ref?: React.Ref<HTMLDivElement>
} & React.HTMLAttributes<HTMLDivElement>) {
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
		<div ref={ref} className="flex flex-col gap-1 select-none" {...props}>
			<div className="bg-fill1-alpha hover:bg-fill2 flex cursor-pointer flex-col gap-8 rounded-[10px] p-3 transition-colors">
				<span className="text-fg-secondary text-[13px]">{label}</span>
				<div className="flex flex-col gap-3.5">
					<span
						className={`text-xl font-medium ${fontClass}`}
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
		</div>
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

function FontList({
	value,
	onValueChange,
}: {
	value: string
	onValueChange: (value: string) => void
}) {
	const [search, setSearch] = React.useState("")
	const [category, setCategory] = React.useState("all")
	const ref = useRef<HTMLDivElement>(null)

	const filteredFonts = React.useMemo(() => {
		const lower = search.toLowerCase()
		return FONTS.filter(
			(f) =>
				f.name.toLowerCase().includes(lower) &&
				(category === "all" ||
					f.category === category ||
					(category === "sans-serif" &&
						(f.category === "sans-serif" || (f as any).fontType === "sans")))
		)
	}, [search, category])

	const virt = useVirtualizer({
		count: filteredFonts.length,
		getScrollElement: () =>
			ref.current?.querySelector('[data-slot="scroll-area-viewport"]') ?? null,
		estimateSize: () => 32,
		overscan: 8,
	})

	const rows = virt.getVirtualItems()

	React.useEffect(() => {
		rows.forEach((row) => loadPreview(filteredFonts[row.index].name))
	}, [rows, filteredFonts])

	return (
		<Command className="border-0 p-0" shouldFilter={false}>
			<CommandInput value={search} onValueChange={setSearch} />
			<CommandGroup className="p-1.5">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							color="neutral"
							variant="soft"
							className="w-full justify-start">
							Style: {CATEGORY_LABELS[category]}{" "}
							<ChevronDown className="text-fg-tertiary ml-auto" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="min-w-[130px]" align="end">
						<DropdownMenuRadioGroup
							value={category}
							onValueChange={setCategory}>
							{Object.entries(CATEGORY_LABELS).map(([value, label]) => (
								<DropdownMenuRadioItem key={value} value={value}>
									{label}
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</CommandGroup>
			<CommandDivider />
			<CommandList className="max-h-none overflow-visible py-1.5">
				{filteredFonts.length === 0 && (
					<CommandEmpty>No font found.</CommandEmpty>
				)}
				<ScrollArea ref={ref} className="h-100">
					<div
						style={{
							height: virt.getTotalSize(),
							width: "100%",
							position: "relative",
						}}>
						{rows.map((row) => {
							const font = filteredFonts[row.index]
							return (
								<CommandItem
									key={row.key}
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
	React.useEffect(() => {
		if (props.fontName) {
			loadPreview(props.fontName)
		}
	}, [props.fontName])

	return (
		<Popover>
			<PopoverTrigger asChild>
				<FontCard {...props} />
			</PopoverTrigger>
			<PopoverContent
				align="start"
				side="right"
				sideOffset={20}
				className="w-[300px] rounded-lg p-0 shadow-sm">
				<FontList value={props.value} onValueChange={props.onValueChange} />
			</PopoverContent>
		</Popover>
	)
}
