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
import { Check, ChevronDown, Plus } from "lucide-react"
import { COMPONENTS_DATA } from "@/config/navigation-config"
import { useThemerPreset } from "@/lib/themer-preset"
import { cn } from "@/lib/utils"
import { buildRegistryConfig } from "@/registry/config"
import { FONTS, FontValue } from "@/registry/fonts"
import { PRIMARY_COLORS, PrimaryColorValue } from "@/registry/primary-colors"
import { RadiusValue } from "@/registry/radius"
import { TEMPLATES, Template } from "@/registry/templates"
import { Button } from "@/registry/ui/button"
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
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
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

function CreateProjectDialog() {
	const [projectName, setProjectName] = useState("")
	const [params, setParams] = useThemerPreset()
	const [touched, setTouched] = useState(false)

	const error = validateProjectName(projectName)
	const showError = touched && error

	const {
		mutate,
		data,
		isPending,
		error: mutationError,
	} = useMutation({
		mutationFn: saveConfig,
	})

	const handleCreate = () => {
		setTouched(true)
		if (error) return

		const config = buildRegistryConfig({
			...params,
			name: projectName,
		})

		mutate(config)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full">
					<Plus className="size-4" />
					Create Project
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Project</DialogTitle>
					<DialogDescription>
						Enter a name and choose a template for your new project.
					</DialogDescription>
				</DialogHeader>
				{data?.id ? (
					<div className="flex flex-col gap-3">
						<Label>Run this command to get started:</Label>
						<code className="bg-fill2 text-fg border-border select-all break-all rounded-lg border px-3 py-2 text-sm">
							pnpm radianos@latest --config={data.id}
						</code>
					</div>
				) : (
					<>
						<div className="flex flex-col gap-4">
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
								{showError && <p className="text-error text-sm">{error}</p>}
							</div>
							<div className="flex flex-col gap-2">
								<Label>Template</Label>
								<Dropdown>
									<DropdownTrigger className="border-border bg-elevation-level2 hover:bg-fill1 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
										<span className="text-fg">
											{params.template.charAt(0).toUpperCase() +
												params.template.slice(1)}
										</span>
										<ChevronDown className="text-fg-secondary size-4 shrink-0" />
									</DropdownTrigger>
									<DropdownContent className="w-56">
										<DropdownRadioGroup
											value={params.template}
											onValueChange={(value) =>
												setParams({ template: value as Template })
											}>
											{TEMPLATES.map((t) => (
												<DropdownRadioItem
													key={t}
													value={t}
													onSelect={(e) => e.preventDefault()}>
													{t.charAt(0).toUpperCase() + t.slice(1)}
												</DropdownRadioItem>
											))}
										</DropdownRadioGroup>
									</DropdownContent>
								</Dropdown>
							</div>
						</div>
						{mutationError && (
							<p className="text-error text-sm">{mutationError.message}</p>
						)}
						<DialogFooter>
							<Button disabled={!!error || isPending} onClick={handleCreate}>
								{isPending ? <Spinner size={16} variant="simple" /> : "Create"}
							</Button>
						</DialogFooter>
					</>
				)}
			</DialogContent>
		</Dialog>
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
			`/preview/test?primaryColor=${params.primaryColor}&component=${selectedComponent}&headingFont=${params.headingFont}&bodyFont=${params.bodyFont}&radius=${params.radius}&template=${params.template}`,
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
	const selectedRadiusLabel =
		RADII.find((r) => r.value === params.radius)?.name ?? params.radius

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
					<Dropdown>
						<DropdownTrigger className="border-border bg-elevation-level2 hover:bg-fill1 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
							<div className="flex flex-col items-start gap-0.5">
								<span className="text-fg-tertiary text-xs">Radius</span>
								<span className="text-fg">{selectedRadiusLabel}</span>
							</div>
						</DropdownTrigger>
						<DropdownContent side="right" className="max-h-96 w-56">
							<DropdownRadioGroup
								value={params.radius}
								onValueChange={(value) =>
									setParams({ radius: value as RadiusValue })
								}>
								{RADII.map((radius) => (
									<DropdownRadioItem
										key={radius.name}
										value={radius.value}
										onSelect={(e) => e.preventDefault()}>
										{radius.name}
									</DropdownRadioItem>
								))}
							</DropdownRadioGroup>
						</DropdownContent>
					</Dropdown>

					<CreateProjectDialog />
				</CardContent>
			</Card>

			<div className="flex-1">
				<iframe ref={iframeRef} src={iframeSrc} className="h-full w-full" />
			</div>
		</div>
	)
}
