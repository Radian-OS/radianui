"use client"

import {
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import { Check, ChevronDown } from "lucide-react"
import { COMPONENTS_DATA } from "@/config/navigation-config"
import { useThemerPreset } from "@/lib/themer-preset"
import { cn } from "@/lib/utils"
import { FONTS, FontValue } from "@/registry/fonts"
import { PRIMARY_COLORS, PrimaryColorValue } from "@/registry/primary-colors"
import { Card, CardContent } from "@/registry/ui/card"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/registry/ui/command"
import {
	Dropdown,
	DropdownContent,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { Spinner } from "@/registry/ui/spinner"

const FONT_PAGE_SIZE = 30

function FontCombobox({
	label,
	value,
	onValueChange,
}: {
	label: string
	value: string
	onValueChange: (value: string) => void
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
			<PopoverTrigger asChild>
				<button className="border-border bg-elevation-level2 hover:bg-fill1 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
					<div className="flex flex-col items-start gap-0.5">
						<span className="text-fg-tertiary text-xs">{label}</span>
						<span className="text-fg">{selectedFont?.name ?? value}</span>
					</div>
					<ChevronDown className="text-fg-secondary size-4 shrink-0" />
				</button>
			</PopoverTrigger>
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
										setOpen(false)
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

export default function Page() {
	return (
		<Suspense>
			<ThemerPage />
		</Suspense>
	)
}

function ThemerPage() {
	const [params, setParams] = useThemerPreset()
	const [selectedComponent, setSelectedComponent] = useState<string>("button")

	const iframeRef = useRef<HTMLIFrameElement>(null)

	// Dependency array is empty so the iframe is only rendered once
	const iframeSrc = useMemo(
		() =>
			`/preview/test?primaryColor=${params.primaryColor}&component=${selectedComponent}&headingFont=${params.headingFont}&bodyFont=${params.bodyFont}`,
		[]
	)

	const selectedColorName =
		PRIMARY_COLORS.find((c) => c.value === params.primaryColor)?.name ??
		params.primaryColor
	const selectedComponentName =
		COMPONENTS_DATA.find(
			(name) => name.toLowerCase().replace(/\s+/g, "-") === selectedComponent
		) ?? selectedComponent

	const postToIframe = useCallback((message: Record<string, unknown>) => {
		iframeRef.current?.contentWindow?.postMessage(message, "*")
	}, [])

	useEffect(() => {
		postToIframe({
			type: "primary-color-change",
			primaryColor: params.primaryColor,
		})
	}, [params.primaryColor])

	useEffect(() => {
		postToIframe({ type: "component-change", component: selectedComponent })
	}, [selectedComponent])

	useEffect(() => {
		postToIframe({
			type: "heading-font-change",
			headingFont: params.headingFont,
		})
	}, [params.headingFont])

	useEffect(() => {
		postToIframe({ type: "body-font-change", bodyFont: params.bodyFont })
	}, [params.bodyFont])

	return (
		<div className="flex h-screen w-full gap-4 p-3">
			<Card className="bg-fill1">
				<CardContent className="flex flex-col gap-4">
					<Dropdown>
						<DropdownTrigger className="border-border bg-elevation-level2 hover:bg-fill1 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
							<div className="flex flex-col items-start gap-0.5">
								<span className="text-fg-tertiary text-xs">Primary Color</span>
								<span className="text-fg">{selectedColorName}</span>
							</div>
							<ChevronDown className="text-fg-secondary size-4 shrink-0" />
						</DropdownTrigger>
						<DropdownContent side="right" className="max-h-96 w-56">
							<DropdownRadioGroup
								value={params.primaryColor}
								onValueChange={(value) =>
									setParams({ primaryColor: value as PrimaryColorValue })
								}>
								{PRIMARY_COLORS.map((color) => (
									<DropdownRadioItem
										key={color.value}
										value={color.value}
										onSelect={(e) => e.preventDefault()}>
										<span
											className="size-3 shrink-0 rounded-full border border-black/10"
											style={{ backgroundColor: color.cssVars.light.primary }}
										/>
										{color.name}
									</DropdownRadioItem>
								))}
							</DropdownRadioGroup>
						</DropdownContent>
					</Dropdown>

					<Dropdown>
						<DropdownTrigger className="border-border bg-elevation-level2 hover:bg-fill1 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
							<div className="flex flex-col items-start gap-0.5">
								<span className="text-fg-tertiary text-xs">Component</span>
								<span className="text-fg">{selectedComponentName}</span>
							</div>
							<ChevronDown className="text-fg-secondary size-4 shrink-0" />
						</DropdownTrigger>
						<DropdownContent side="right" className="max-h-96 w-56">
							<DropdownRadioGroup
								value={selectedComponent}
								onValueChange={setSelectedComponent}>
								{COMPONENTS_DATA.map((name) => (
									<DropdownRadioItem
										key={name}
										value={name.toLowerCase().replace(/\s+/g, "-")}
										onSelect={(e) => e.preventDefault()}>
										{name}
									</DropdownRadioItem>
								))}
							</DropdownRadioGroup>
						</DropdownContent>
					</Dropdown>

					<FontCombobox
						label="Heading Font"
						value={params.headingFont}
						onValueChange={(value) =>
							setParams({ headingFont: value as FontValue })
						}
					/>

					<FontCombobox
						label="Body Font"
						value={params.bodyFont}
						onValueChange={(value) =>
							setParams({ bodyFont: value as FontValue })
						}
					/>
				</CardContent>
			</Card>

			<div className="flex-1">
				<iframe ref={iframeRef} src={iframeSrc} className="h-full w-full" />
			</div>
		</div>
	)
}
