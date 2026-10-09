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
import { ChevronDown, Search } from "lucide-react"
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query"
import { useVirtualizer } from "@tanstack/react-virtual"
import { Button } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"

const KEY = "AIzaSyA-gBaSLW_XNgUD-H2lXfiT0GlmR0-9d3M"

const fontsQueryOptions = queryOptions({
	queryKey: ["google-fonts"],
	staleTime: Infinity,
	queryFn: () =>
		fetch(
			`https://www.googleapis.com/webfonts/v1/webfonts?key=${KEY}&sort=popularity`
		)
			.then((r) => r.json())
			.then((d) => d.items as { family: string }[]),
})

const loaded = new Set<string>()

async function loadPreview(family: string) {
	if (loaded.has(family)) return
	loaded.add(family)
	const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}&text=${encodeURIComponent(family)}&display=swap`
	const css = await fetch(url).then((r) => r.text())
	const style = document.createElement("style")
	style.textContent = css.replace(
		/font-family:\s*'[^']+'/g,
		`font-family: 'preview-${family}'`
	)
	document.head.appendChild(style)
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
	ref,
	...props
}: {
	label: string
	fontName: string
	fontClass: string
	provider: string
	type: string
	icon: React.ReactNode
	ref?: React.Ref<HTMLDivElement>
} & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div ref={ref} className="flex flex-col gap-1 select-none" {...props}>
			<div className="bg-fill1-alpha hover:bg-fill2 flex cursor-pointer flex-col gap-8 rounded-[10px] p-3 transition-colors">
				<span className="text-fg-secondary text-[13px]">{label}</span>
				<div className="flex flex-col gap-3.5">
					<span className={`text-xl font-medium ${fontClass}`}>{fontName}</span>
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

function FontList() {
	const [search, setSearch] = React.useState("")
	const ref = useRef<HTMLDivElement>(null)

	const { data: fonts = [] } = useQuery(fontsQueryOptions)

	const filteredFonts = React.useMemo(() => {
		const lower = search.toLowerCase()
		return fonts.filter((f) => f.family.toLowerCase().includes(lower))
	}, [fonts, search])

	const virt = useVirtualizer({
		count: filteredFonts.length,
		getScrollElement: () =>
			ref.current?.querySelector('[data-slot="scroll-area-viewport"]') ?? null,
		estimateSize: () => 32,
		overscan: 8,
	})

	const rows = virt.getVirtualItems()

	React.useEffect(() => {
		rows.forEach((row) => loadPreview(filteredFonts[row.index].family))
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
							Style: All <ChevronDown className="text-fg-tertiary ml-auto" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="min-w-[130px]" align="end">
						<DropdownMenuRadioGroup>
							<DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="sans-serif">
								Sans Serif
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="serif">Serif</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="display">
								Display
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="monospace">
								Monospace
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</CommandGroup>
			<CommandDivider />
			<CommandList className="max-h-none overflow-visible py-1.5">
				{filteredFonts.length === 0 && (
					<CommandEmpty>No font found.</CommandEmpty>
				)}
				<ScrollArea ref={ref} className="h-72">
					<div
						style={{
							height: virt.getTotalSize(),
							width: "100%",
							position: "relative",
						}}>
						{rows.map((row) => {
							const { family } = filteredFonts[row.index]
							return (
								<CommandItem
									key={row.key}
									value={family}
									style={{
										position: "absolute",
										top: 0,
										left: 6,
										width: "calc(100% - 12px)",
										height: row.size,
										transform: `translateY(${row.start}px)`,
										// fontFamily: `"preview-${family}", sans-serif`,
									}}>
									{family}
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
	const queryClient = useQueryClient()
	const prefetch = () => queryClient.prefetchQuery(fontsQueryOptions)
	return (
		<Popover>
			<PopoverTrigger asChild onPointerEnter={prefetch} onFocus={prefetch}>
				<FontCard {...props} />
			</PopoverTrigger>
			<PopoverContent
				align="start"
				side="right"
				sideOffset={20}
				className="w-[280px] rounded-lg p-0 shadow-sm">
				<FontList />
			</PopoverContent>
		</Popover>
	)
}
