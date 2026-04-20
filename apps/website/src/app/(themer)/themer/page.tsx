"use client"

import {
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import { useMutation } from "@tanstack/react-query"
import {
	Check,
	ChevronDown,
	ClipboardCopy,
	FolderPlus,
	MoonIcon,
	Palette,
	Plus,
	Rocket,
	SunIcon,
	Type,
} from "lucide-react"
import { useTheme } from "next-themes"
import { COMPONENTS_DATA } from "@/config/navigation-config"
import { useThemerPreset } from "@/lib/themer-preset"
import { cn } from "@/lib/utils"
import { buildRegistryConfig } from "@/registry/config"
import { FONTS, FontValue } from "@/registry/fonts"
import { PRIMARY_COLORS, PrimaryColorValue } from "@/registry/primary-colors"
import { RadiusValue } from "@/registry/radius"
import { TEMPLATES, Template } from "@/registry/templates"
import { Button, IconButton } from "@/registry/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/registry/ui/command"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/registry/ui/dialog"
import {
	Dropdown,
	DropdownContent,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { Spinner } from "@/registry/ui/spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

const FONT_PAGE_SIZE = 30

function SectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<span className="text-fg-tertiary text-[11px] font-medium uppercase tracking-wider">
			{children}
		</span>
	)
}

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
				<button className="border-border hover:border-fg-disabled bg-elevation-level2 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
					<div className="flex flex-col items-start gap-0.5">
						<span className="text-fg-tertiary text-[11px]">{label}</span>
						<span className="text-fg font-medium">
							{selectedFont?.name ?? value}
						</span>
					</div>
					<ChevronDown className="text-fg-tertiary size-3.5 shrink-0" />
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

export const RADII = [
	{ name: "Default", value: "default" },
	{ name: "None", value: "none" },
	{ name: "Small", value: "small" },
	{ name: "Medium", value: "medium" },
	{ name: "Large", value: "large" },
] as const

const PROJECT_NAME_REGEX = /^[a-z0-9][a-z0-9-]*$/

function validateProjectName(name: string): string | null {
	if (!name) return "Project name is required."
	if (name.length < 2) return "Name must be at least 2 characters."
	if (!PROJECT_NAME_REGEX.test(name))
		return "Use only lowercase letters, numbers, and hyphens. Must start with a letter or number."
	if (name.endsWith("-")) return "Name cannot end with a hyphen."
	return null
}

async function saveConfig(config: ReturnType<typeof buildRegistryConfig>) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BLOCKS_URL}/api/config`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(config),
	})

	if (!res.ok) {
		throw new Error(`Failed to save config (${res.status})`)
	}

	return res.json() as Promise<{ id: string }>
}

function TemplateCard({
	template,
	isSelected,
	onClick,
}: {
	template: Template
	isSelected: boolean
	onClick: () => void
}) {
	const label = template.charAt(0).toUpperCase() + template.slice(1)
	return (
		<button
			onClick={onClick}
			className={cn(
				"relative flex flex-1 flex-col items-center gap-2 rounded-xl border-2 px-4 py-4 transition-all",
				isSelected
					? "border-primary bg-primary-accent"
					: "border-border bg-elevation-level2 hover:border-fg-disabled"
			)}>
			{isSelected && (
				<span className="bg-primary absolute right-2 top-2 flex size-4 items-center justify-center rounded-full">
					<Check className="text-fg-inverse size-2.5" strokeWidth={3} />
				</span>
			)}
			<span className="text-fg-secondary text-2xl">
				{template === "next" ? "N" : "V"}
			</span>
			<span
				className={cn(
					"text-xs font-medium",
					isSelected ? "text-primary-text" : "text-fg-secondary"
				)}>
				{label}
			</span>
		</button>
	)
}

function ThemeSummaryPill({
	label,
	value,
	colorSwatch,
}: {
	label: string
	value: string
	colorSwatch?: string
}) {
	return (
		<div className="bg-fill1 border-border flex items-center gap-2 rounded-lg border px-2.5 py-1.5">
			{colorSwatch && (
				<span
					className="size-3 shrink-0 rounded-full border border-black/10"
					style={{ backgroundColor: colorSwatch }}
				/>
			)}
			<span className="text-fg-tertiary text-[11px]">{label}</span>
			<span className="text-fg text-xs font-medium">{value}</span>
		</div>
	)
}

function CreateProjectDialog() {
	const [projectName, setProjectName] = useState("")
	const [params, setParams] = useThemerPreset()
	const [touched, setTouched] = useState(false)
	const [copied, setCopied] = useState(false)

	const error = validateProjectName(projectName)
	const showError = touched && error

	const selectedColor = PRIMARY_COLORS.find(
		(c) => c.value === params.primaryColor
	)
	const selectedHeadingFont = FONTS.find((f) => f.value === params.headingFont)
	const selectedBodyFont = FONTS.find((f) => f.value === params.bodyFont)
	const selectedRadius = RADII.find((r) => r.value === params.radius)

	const {
		mutate,
		data,
		isPending,
		error: mutationError,
		reset,
	} = useMutation({
		mutationFn: saveConfig,
	})

	const handleOpenChange = (open: boolean) => {
		if (open) {
			setProjectName("")
			setTouched(false)
			setCopied(false)
			reset()
		}
	}

	const handleCreate = () => {
		setTouched(true)
		if (error) return

		const config = buildRegistryConfig({
			...params,
			name: projectName,
		})

		mutate(config)
	}

	const command = data?.id
		? `pnpm dlx radianui@alpha init --preset ${data.id}`
		: ""

	const handleCopy = () => {
		navigator.clipboard.writeText(command)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<Dialog onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button className="w-full">
					<Plus className="size-4" />
					Create Project
				</Button>
			</DialogTrigger>
			<DialogContent className="gap-0 overflow-hidden p-0">
				{data?.id ? (
					<div className="flex flex-col">
						{/* Success header */}
						<div className="bg-success-accent flex flex-col items-center gap-3 px-6 pb-5 pt-8">
							<div className="bg-success flex size-10 items-center justify-center rounded-full">
								<Rocket className="text-fg-inverse size-5" />
							</div>
							<div className="flex flex-col items-center gap-1">
								<h3 className="text-fg text-base font-semibold">
									Project Ready
								</h3>
								<p className="text-fg-secondary text-center text-sm">
									Run this command to get started
								</p>
							</div>
						</div>

						{/* Command block */}
						<div className="flex flex-col gap-4 p-5">
							<div
								className="bg-fill1 border-border hover:border-fg-disabled group relative flex cursor-pointer items-center rounded-lg border p-3 transition-colors"
								onClick={handleCopy}>
								<code className="text-fg flex-1 select-all break-all text-[13px]">
									{command}
								</code>
								<button
									className="text-fg-tertiary hover:text-fg shrink-0 p-1 transition-colors"
									aria-label="Copy command">
									{copied ? (
										<Check className="text-success size-4" />
									) : (
										<ClipboardCopy className="size-4" />
									)}
								</button>
							</div>
							{copied && (
								<p className="text-success text-center text-xs font-medium">
									Copied to clipboard
								</p>
							)}
						</div>
					</div>
				) : (
					<div className="flex flex-col">
						{/* Dialog header with icon */}
						<div className="flex flex-col items-center gap-3 px-6 pb-4 pt-8">
							<div className="bg-primary-accent flex size-10 items-center justify-center rounded-full">
								<FolderPlus className="text-primary size-5" />
							</div>
							<div className="flex flex-col items-center gap-1">
								<DialogTitle className="text-center">
									Create Project
								</DialogTitle>
								<DialogDescription className="text-center">
									Set up a new project with your current theme.
								</DialogDescription>
							</div>
						</div>

						{/* Theme summary */}
						<div className="border-border mx-5 flex flex-wrap gap-1.5 rounded-lg border-t pt-4">
							{selectedColor && (
								<ThemeSummaryPill
									label="Color"
									value={selectedColor.name}
									colorSwatch={selectedColor.cssVars.light.primary}
								/>
							)}
							{selectedHeadingFont && (
								<ThemeSummaryPill
									label="Heading"
									value={selectedHeadingFont.name}
								/>
							)}
							{selectedBodyFont && (
								<ThemeSummaryPill label="Body" value={selectedBodyFont.name} />
							)}
							{selectedRadius && (
								<ThemeSummaryPill label="Radius" value={selectedRadius.name} />
							)}
						</div>

						{/* Form */}
						<div className="flex flex-col gap-5 p-5">
							<div className="flex flex-col gap-2">
								<Label htmlFor="project-name">Project Name</Label>
								<Input
									id="project-name"
									placeholder="my-project"
									value={projectName}
									onChange={(e) => setProjectName(e.target.value)}
									onBlur={() => setTouched(true)}
									aria-invalid={!!showError}
								/>
								{showError && <p className="text-error text-xs">{error}</p>}
							</div>

							<div className="flex flex-col gap-2">
								<Label>Template</Label>
								<div className="flex gap-2">
									{TEMPLATES.map((t) => (
										<TemplateCard
											key={t}
											template={t}
											isSelected={params.template === t}
											onClick={() => setParams({ template: t as Template })}
										/>
									))}
								</div>
							</div>

							{mutationError && (
								<p className="text-error text-sm">{mutationError.message}</p>
							)}

							<Button
								className="w-full"
								disabled={!!error || isPending}
								onClick={handleCreate}>
								{isPending ? (
									<Spinner size={16} variant="simple" />
								) : (
									<>
										<Rocket className="size-4" />
										Create Project
									</>
								)}
							</Button>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}

function ColorSwatch({
	color,
	isSelected,
	onClick,
}: {
	color: (typeof PRIMARY_COLORS)[number]
	isSelected: boolean
	onClick: () => void
}) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					onClick={onClick}
					className={cn(
						"size-7 rounded-full border-2 transition-all",
						isSelected
							? "border-fg scale-110 ring-2 ring-white"
							: "hover:border-border border-transparent hover:scale-110"
					)}
					style={{ backgroundColor: color.cssVars.light.primary }}
				/>
			</TooltipTrigger>
			<TooltipContent side="top">{color.name}</TooltipContent>
		</Tooltip>
	)
}

function RadiusPill({
	radius,
	isSelected,
	onClick,
}: {
	radius: (typeof RADII)[number]
	isSelected: boolean
	onClick: () => void
}) {
	return (
		<button
			onClick={onClick}
			className={cn(
				"rounded-md border px-3 py-1.5 text-xs font-medium transition-all",
				isSelected
					? "border-primary bg-primary-accent text-primary-text"
					: "border-border bg-elevation-level2 text-fg-secondary hover:border-fg-disabled hover:text-fg"
			)}>
			{radius.name}
		</button>
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
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		setMounted(true)
	}, [])

	const iframeRef = useRef<HTMLIFrameElement>(null)

	const iframeSrc = useMemo(
		() =>
			`/preview/test?primaryColor=${params.primaryColor}&component=${selectedComponent}&headingFont=${params.headingFont}&bodyFont=${params.bodyFont}&radius=${params.radius}&template=${params.template}`,
		[]
	)

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

	useEffect(() => {
		postToIframe({ type: "template-change", template: params.template })
	}, [params.template])

	useEffect(() => {
		const iframe = iframeRef.current
		if (!iframe?.contentWindow) return

		iframe.contentWindow.postMessage(
			{ type: "radius-change", radius: params.radius },
			"*"
		)
	}, [params.radius])

	return (
		<div className="bg-fill1 flex h-screen w-full">
			{/* Sidebar */}
			<aside className="bg-elevation-level1 border-border flex w-80 shrink-0 flex-col border-r">
				{/* Header */}
				<div className="border-border flex flex-col gap-1 border-b px-5 py-4">
					<div className="flex items-center gap-2">
						<Palette className="text-primary size-4" />
						<h1 className="text-fg text-sm font-semibold">Theme Builder</h1>
						<IconButton
							aria-label="Toggle light/dark mode"
							variant="ghost"
							color="neutral"
							size="28"
							className="ml-auto transition-transform duration-200 hover:scale-110"
							disabled={!mounted}
							onClick={() =>
								setTheme(resolvedTheme === "light" ? "dark" : "light")
							}>
							{mounted && resolvedTheme === "dark" ? (
								<SunIcon className="size-4" />
							) : (
								<MoonIcon className="size-4" />
							)}
						</IconButton>
					</div>
					<p className="text-fg-tertiary text-xs">
						Customize your design tokens and preview live.
					</p>
				</div>

				{/* Scrollable controls */}
				<div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-5">
					{/* Color Section */}
					<div className="flex flex-col gap-3">
						<SectionLabel>Primary Color</SectionLabel>
						<div className="flex flex-wrap gap-2">
							{PRIMARY_COLORS.map((color) => (
								<ColorSwatch
									key={color.value}
									color={color}
									isSelected={params.primaryColor === color.value}
									onClick={() =>
										setParams({
											primaryColor: color.value as PrimaryColorValue,
										})
									}
								/>
							))}
						</div>
					</div>

					{/* Component Preview */}
					<div className="flex flex-col gap-3">
						<SectionLabel>Component</SectionLabel>
						<Dropdown>
							<DropdownTrigger className="border-border hover:border-fg-disabled bg-elevation-level2 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
								<span className="text-fg font-medium">
									{selectedComponentName}
								</span>
								<ChevronDown className="text-fg-tertiary size-3.5 shrink-0" />
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
					</div>

					{/* Typography */}
					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-1.5">
							<Type className="text-fg-tertiary size-3" />
							<SectionLabel>Typography</SectionLabel>
						</div>
						<div className="flex flex-col gap-2">
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
						</div>
					</div>

					{/* Radius */}
					<div className="flex flex-col gap-3">
						<SectionLabel>Border Radius</SectionLabel>
						<div className="flex flex-wrap gap-1.5">
							{RADII.map((radius) => (
								<RadiusPill
									key={radius.value}
									radius={radius}
									isSelected={params.radius === radius.value}
									onClick={() =>
										setParams({ radius: radius.value as RadiusValue })
									}
								/>
							))}
						</div>
					</div>
				</div>

				{/* Footer action */}
				<div className="border-border border-t px-5 py-4">
					<CreateProjectDialog />
				</div>
			</aside>

			{/* Preview Area */}
			<main className="flex flex-1 flex-col overflow-hidden p-5">
				<div className="border-border bg-elevation-level1 flex flex-1 overflow-hidden rounded-xl border shadow-sm">
					<iframe ref={iframeRef} src={iframeSrc} className="h-full w-full" />
				</div>
			</main>
		</div>
	)
}
