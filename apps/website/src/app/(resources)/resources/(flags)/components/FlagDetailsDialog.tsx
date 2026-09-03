"use client"

import { useMemo, useState } from "react"
import {
	Boxes,
	Check,
	ChevronDown,
	Clipboard,
	CloudDownload,
	CodeXml,
	Download,
	Globe2,
	Image as ImageIcon,
	Lightbulb,
	Share2,
} from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/registry/ui/badge"
import { Button, ButtonGroup, IconButton } from "@/registry/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/registry/ui/dialog"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { NextjsIcon } from "../../(avatar)/components/AvatarTileMenu"
import type { FlagName, FlagShape, FlagSize } from "./flags-data"
import {
	flagNames,
	getFlagDisplayName,
	getFlagHtmlMarkup,
	getFlagNextImageMarkup,
	getFlagSvgMarkup,
	getFlagUrl,
} from "./flags-data"

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

interface FlagDetailsDialogProps {
	name: FlagName | null
	shape: FlagShape
	open: boolean
	onOpenChange: (open: boolean) => void
	onShapeChange: (shape: FlagShape) => void
	onSelectFlag: (name: FlagName) => void
}

const pngSizes: FlagSize[] = [64, 128, 256, 512]

const featuredFlagNames: FlagName[] = [
	"Unitedkingdom",
	"Australia",
	"Newzealand",
	"Fiji",
	"Americansamoa",
	"Samoa",
	"Cookisland",
	"Tuvalu",
	"China",
	"Ghana",
	"Russia",
	"Ukraine",
	"Unitedarabemirates",
	"Uzbekistan",
]

const flagSearchTags: Partial<Record<FlagName, string[]>> = {
	"United States": ["United States", "USA", "America", "USA flag", "USD", "+1"],
	Unitedkingdom: [
		"United Kingdom",
		"UK",
		"Britain",
		"British flag",
		"GBP",
		"+44",
	],
	Australia: ["Australia", "AU", "Australian flag", "AUD", "+61"],
	Canada: ["Canada", "CA", "Canadian flag", "CAD", "+1"],
	India: ["India", "IN", "Indian flag", "INR", "+91"],
	Japan: ["Japan", "JP", "Japanese flag", "JPY", "+81"],
}

const packageCommands: Record<PackageManager, string> = {
	pnpm: "pnpm dlx radianui@latest add flags",
	npm: "npx radianui@latest add flags",
	yarn: "yarn dlx radianui@latest add flags",
	bun: "bunx --bun radianui@latest add flags",
}

function blobToDataUrl(blob: Blob) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => resolve(String(reader.result))
		reader.onerror = () => reject(reader.error)
		reader.readAsDataURL(blob)
	})
}

function downloadBlob(blob: Blob, filename: string) {
	const objectUrl = URL.createObjectURL(blob)
	const link = document.createElement("a")
	link.href = objectUrl
	link.download = filename
	document.body.appendChild(link)
	link.click()
	link.remove()
	URL.revokeObjectURL(objectUrl)
}

export function FlagDetailsDialog({
	name,
	shape,
	open,
	onOpenChange,
	onShapeChange,
	onSelectFlag,
}: FlagDetailsDialogProps) {
	const [pngSize, setPngSize] = useState<FlagSize>(512)
	const [packageManager, setPackageManager] = useState<PackageManager>("pnpm")
	const [commandCopied, setCommandCopied] = useState(false)

	const moreFlags = useMemo(() => {
		if (!name) return featuredFlagNames

		const featured = featuredFlagNames.filter((flagName) => flagName !== name)
		if (featured.length === featuredFlagNames.length) return featured

		const replacement = flagNames.find(
			(flagName) => flagName !== name && !featured.includes(flagName)
		)
		return replacement ? [...featured, replacement] : featured
	}, [name])

	if (!name) return null

	const displayName = getFlagDisplayName(name)
	const shapeLabel = shape === "round" ? "Rounded" : "Flat"
	const previewUrl = getFlagUrl(name, shape, 512)
	const searchTags =
		flagSearchTags[name] ??
		Array.from(
			new Set([displayName, name, `${displayName} flag`, `${shapeLabel} flag`])
		)

	const copyText = async (value: string, label: string) => {
		try {
			await navigator.clipboard.writeText(value)
			toast.success(`${label} copied to clipboard`)
		} catch {
			toast.error(`Could not copy ${label}`)
		}
	}

	const copyPng = async () => {
		try {
			const response = await fetch(getFlagUrl(name, shape, pngSize))
			if (!response.ok) throw new Error("Flag request failed")
			const blob = await response.blob()

			if (!navigator.clipboard.write || !("ClipboardItem" in window)) {
				await copyText(getFlagUrl(name, shape, pngSize), "PNG URL")
				return
			}

			await navigator.clipboard.write([
				new ClipboardItem({ "image/png": blob }),
			])
			toast.success("PNG copied to clipboard")
		} catch {
			toast.error("Could not copy PNG")
		}
	}

	const getSvg = async () => {
		const response = await fetch(previewUrl)
		if (!response.ok) throw new Error("Flag request failed")
		return getFlagSvgMarkup(name, await blobToDataUrl(await response.blob()))
	}

	const copySvg = async () => {
		try {
			await copyText(await getSvg(), "SVG")
		} catch {
			toast.error("Could not copy SVG")
		}
	}

	const downloadFlag = async (format: "png" | "svg") => {
		try {
			const safeName = displayName.toLowerCase().replace(/[^a-z0-9]+/g, "-")
			if (format === "svg") {
				downloadBlob(
					new Blob([await getSvg()], { type: "image/svg+xml" }),
					`${safeName}-${shape}.svg`
				)
			} else {
				const response = await fetch(getFlagUrl(name, shape, pngSize))
				if (!response.ok) throw new Error("Flag request failed")
				downloadBlob(
					await response.blob(),
					`${safeName}-${shape}-${pngSize}px.png`
				)
			}
			toast.success(`${format.toUpperCase()} downloaded`)
		} catch {
			toast.error(`Could not download ${format.toUpperCase()}`)
		}
	}

	const shareFlag = async () => {
		const url = getFlagUrl(name, shape, pngSize)
		try {
			if (navigator.share) {
				await navigator.share({
					title: `${displayName} ${shapeLabel} Flag`,
					text: `Download the ${displayName} flag from Radian UI.`,
					url,
				})
				return
			}
			await copyText(url, "Flag link")
		} catch (error) {
			if (error instanceof DOMException && error.name === "AbortError") return
			toast.error("Could not share this flag")
		}
	}

	const copyCommand = async () => {
		try {
			await navigator.clipboard.writeText(packageCommands[packageManager])
			setCommandCopied(true)
			window.setTimeout(() => setCommandCopied(false), 1200)
			toast.success("Install command copied to clipboard")
		} catch {
			toast.error("Could not copy install command")
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="no-scrollbar max-h-[calc(100dvh-8px)] w-[calc(100%-8px)] max-w-[1000px] gap-0 overflow-y-auto rounded-xl p-6 sm:max-w-[1000px]">
				<DialogDescription className="sr-only">
					Preview, copy, download, and use the {displayName} flag.
				</DialogDescription>

				<div className="grid gap-5 md:grid-cols-[320px_minmax(0,1fr)]">
					<div className="bg-fill1 relative flex h-60 items-center justify-center rounded-lg p-6 md:h-auto md:min-h-80">
						<FlagDetailsShapeDropdown
							value={shape}
							onValueChange={onShapeChange}
						/>
						<img
							src={previewUrl}
							alt={`${displayName} ${shapeLabel.toLowerCase()} flag`}
							width={160}
							height={160}
							className="size-40 object-contain"
						/>
					</div>

					<div className="flex min-w-0 flex-col gap-5">
						<div className="flex items-center justify-between gap-3">
							<DialogTitle
								closeButton={false}
								className="min-w-0 font-semibold">
								{displayName} {shapeLabel} Flag
							</DialogTitle>
							<IconButton
								size="28"
								color="neutral"
								variant="soft"
								aria-label={`Share ${displayName} flag`}
								onClick={shareFlag}>
								<Share2 />
							</IconButton>
						</div>

						<div className="flex flex-wrap items-center gap-2">
							<DropdownMenu>
								<ButtonGroup size="32" color="primary" variant="strong">
									<Button onClick={copyPng}>
										<ImageIcon />
										PNG
									</Button>
									<DropdownMenuTrigger asChild>
										<Button aria-label={`PNG size: ${pngSize} pixels`}>
											{pngSize} px
											<ChevronDown />
										</Button>
									</DropdownMenuTrigger>
								</ButtonGroup>
								<DropdownMenuContent align="start">
									<DropdownMenuRadioGroup
										value={String(pngSize)}
										onValueChange={(value) =>
											setPngSize(Number(value) as FlagSize)
										}>
										{pngSizes.map((size) => (
											<DropdownMenuRadioItem key={size} value={String(size)}>
												{size} px
											</DropdownMenuRadioItem>
										))}
									</DropdownMenuRadioGroup>
								</DropdownMenuContent>
							</DropdownMenu>

							<Button
								size="32"
								color="primary"
								variant="strong"
								onClick={copySvg}>
								<Boxes />
								SVG
							</Button>

							<IconButton
								size="32"
								color="primary"
								variant="strong"
								className="sm:hidden"
								aria-label={`Download ${displayName} PNG`}
								onClick={() => downloadFlag("png")}>
								<CloudDownload />
							</IconButton>

							<DropdownMenu>
								<ButtonGroup
									size="32"
									color="primary"
									variant="strong"
									className="hidden sm:inline-flex">
									<Button onClick={() => downloadFlag("png")}>
										<CloudDownload />
										Download
									</Button>
									<DropdownMenuTrigger asChild>
										<IconButton aria-label="Choose download format">
											<ChevronDown />
										</IconButton>
									</DropdownMenuTrigger>
								</ButtonGroup>
								<DropdownMenuContent align="end">
									<DropdownMenuItem onSelect={() => downloadFlag("png")}>
										<ImageIcon />
										Download PNG
									</DropdownMenuItem>
									<DropdownMenuItem onSelect={() => downloadFlag("svg")}>
										<Download />
										Download SVG
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						<div className="flex flex-col gap-2">
							<p className="text-fg-secondary text-xs font-medium">
								Code Snippets
							</p>
							<div className="flex flex-wrap gap-2">
								<Button
									size="32"
									color="neutral"
									variant="outline"
									onClick={() => copyText(previewUrl, "CDN URL")}>
									<Globe2 />
									CDN
								</Button>
								<Button
									size="32"
									color="neutral"
									variant="outline"
									onClick={() =>
										copyText(getFlagHtmlMarkup(name, shape), "React snippet")
									}>
									<CodeXml />
									React JS
								</Button>
								<Button
									size="32"
									color="neutral"
									variant="outline"
									onClick={() => toast.message("Thanks for your suggestion!")}>
									<Lightbulb />
									Suggest
								</Button>
								<Button
									size="32"
									color="neutral"
									variant="outline"
									onClick={() =>
										copyText(
											getFlagNextImageMarkup(name, shape),
											"Next.js snippet"
										)
									}>
									<NextjsIcon />
									Next JS
								</Button>
								<Button
									size="32"
									color="neutral"
									variant="outline"
									onClick={() =>
										copyText(packageCommands.pnpm, "Radian UI command")
									}>
									<Boxes />
									Radian UI
								</Button>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<p className="text-fg-secondary text-xs font-medium">
								Add flag to your project
							</p>
							<Tabs
								value={packageManager}
								onValueChange={(value) =>
									setPackageManager(value as PackageManager)
								}
								className="bg-fill1 gap-0 overflow-hidden rounded-lg">
								<div className="flex h-9 items-center justify-between px-1">
									<TabsList variant="ghost" className="h-8 bg-transparent">
										{Object.keys(packageCommands).map((manager) => (
											<TabsTrigger
												key={manager}
												value={manager}
												className="h-7 px-2 text-xs">
												{manager}
											</TabsTrigger>
										))}
									</TabsList>
									<IconButton
										size="28"
										color="neutral"
										variant="ghost"
										aria-label="Copy install command"
										onClick={copyCommand}>
										{commandCopied ? <Check /> : <Clipboard />}
									</IconButton>
								</div>
								{Object.entries(packageCommands).map(([manager, command]) => (
									<TabsContent
										key={manager}
										value={manager}
										className="px-1 pb-1">
										<div className="border-soft bg-bg overflow-x-auto rounded-md border px-3 py-2 font-mono text-xs whitespace-nowrap">
											{command}
										</div>
									</TabsContent>
								))}
							</Tabs>
						</div>
					</div>
				</div>

				<div className="mt-6 flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						<p className="text-fg-secondary text-xs font-medium">Search Tags</p>
						<div className="flex flex-wrap gap-1.5">
							{searchTags.map((tag) => (
								<Badge key={tag} size="24" color="neutral" variant="outline">
									{tag}
								</Badge>
							))}
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<p className="text-fg-secondary text-xs font-medium">More Flags</p>
						<div className="grid grid-cols-[repeat(auto-fit,50px)] justify-between gap-y-2">
							{moreFlags.map((flagName) => {
								const moreFlagDisplayName = getFlagDisplayName(flagName)
								return (
									<Button
										key={flagName}
										size="32"
										color="neutral"
										variant="outline"
										className="size-[50px] p-0"
										aria-label={`View ${moreFlagDisplayName} flag`}
										onClick={() => onSelectFlag(flagName)}>
										<img
											src={getFlagUrl(flagName, shape)}
											alt=""
											width={28}
											height={28}
											className="size-7 object-contain"
										/>
									</Button>
								)
							})}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

interface FlagDetailsShapeDropdownProps {
	value: FlagShape
	onValueChange: (value: FlagShape) => void
}

function FlagDetailsShapeDropdown({
	value,
	onValueChange,
}: FlagDetailsShapeDropdownProps) {
	const label = value === "round" ? "Rounded" : "Flat"

	return (
		<div className="absolute top-3 right-3">
			<DropdownMenu indicatorPosition="right">
				<DropdownMenuTrigger asChild>
					<Button
						size="28"
						color="neutral"
						variant="soft"
						aria-label={`Flag style: ${label}`}>
						{label}
						<ChevronDown />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-32">
					<DropdownMenuRadioGroup
						value={value}
						onValueChange={(nextValue) =>
							onValueChange(nextValue as FlagShape)
						}>
						<DropdownMenuRadioItem value="round">Rounded</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="flat">Flat</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
