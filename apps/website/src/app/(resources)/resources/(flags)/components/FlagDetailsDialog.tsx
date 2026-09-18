"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronDown, Download, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import PackageManagerTabs, {
	type Commands,
} from "@/components/package-manager-tabs"
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
import type { FlagName, FlagShape, FlagSize } from "./flags-data"
import {
	flagNames,
	getFlagAssetCode,
	getFlagCallingCodes,
	getFlagCountryCodes,
	getFlagDisplayName,
	getFlagHtmlMarkup,
	getFlagNextImageMarkup,
	getFlagSvgMarkup,
	getFlagUrl,
} from "./flags-data"

interface FlagDetailsDialogProps {
	name: FlagName | null
	shape: FlagShape
	open: boolean
	onOpenChange: (open: boolean) => void
	onSelectFlag: (name: FlagName) => void
}

const pngSizes: FlagSize[] = [64, 128, 256, 512]
const MORE_FLAGS_LIMIT = 16

const alphabeticalFlagNames = [...flagNames].sort((first, second) =>
	getFlagDisplayName(first).localeCompare(getFlagDisplayName(second), "en")
)

const flagSearchTags: Partial<Record<FlagName, string[]>> = {
	"united-states": ["United States", "USA", "America", "USA flag", "USD", "+1"],
	"united-kingdom": [
		"United Kingdom",
		"UK",
		"Britain",
		"British flag",
		"GBP",
		"+44",
	],
	australia: ["Australia", "AU", "Australian flag", "AUD", "+61"],
	canada: ["Canada", "CA", "Canadian flag", "CAD", "+1"],
	india: ["India", "IN", "Indian flag", "INR", "+91"],
	japan: ["Japan", "JP", "Japanese flag", "JPY", "+81"],
}

const packageCommandPrefixes: Commands = {
	pnpm: "pnpm dlx radianui@latest",
	npm: "npx radianui@latest",
	yarn: "yarn dlx radianui@latest",
	bun: "bunx --bun radianui@latest",
}

function getPackageCommands(assetCode: string): Commands {
	return Object.fromEntries(
		Object.entries(packageCommandPrefixes).map(([manager, prefix]) => [
			manager,
			`${prefix} add-asset flag ${assetCode}`,
		])
	) as Commands
}

function getMoreFlags(name: FlagName) {
	const selectedIndex = alphabeticalFlagNames.indexOf(name)
	if (selectedIndex < 0) return alphabeticalFlagNames.slice(0, MORE_FLAGS_LIMIT)

	const windowSize = MORE_FLAGS_LIMIT + 1
	const flagsBefore = Math.floor(MORE_FLAGS_LIMIT / 2)
	let startIndex = Math.max(0, selectedIndex - flagsBefore)
	let endIndex = Math.min(alphabeticalFlagNames.length, startIndex + windowSize)

	startIndex = Math.max(0, endIndex - windowSize)
	endIndex = Math.min(alphabeticalFlagNames.length, startIndex + windowSize)

	return alphabeticalFlagNames
		.slice(startIndex, endIndex)
		.filter((flagName) => flagName !== name)
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
	onSelectFlag,
}: FlagDetailsDialogProps) {
	const [pngSize, setPngSize] = useState<FlagSize>(512)
	const [dialogShape, setDialogShape] = useState<FlagShape>(shape)
	const moreFlags = useMemo(() => (name ? getMoreFlags(name) : []), [name])

	useEffect(() => {
		if (open) setDialogShape(shape)
	}, [open, shape])

	if (!name) return null

	const displayName = getFlagDisplayName(name)
	const assetCode = getFlagAssetCode(name)
	const packageCommands = getPackageCommands(assetCode)
	const shapeLabel = dialogShape === "round" ? "Rounded" : "Flat"
	const previewUrl = getFlagUrl(name, dialogShape, 512)
	const searchTags = Array.from(
		new Set([
			...(flagSearchTags[name] ?? [displayName, name, `${displayName} flag`]),
			...getFlagCountryCodes(name),
			...getFlagCallingCodes(name),
		])
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
			const response = await fetch(getFlagUrl(name, dialogShape, pngSize))
			if (!response.ok) throw new Error("Flag request failed")
			const blob = await response.blob()

			if (!navigator.clipboard.write || !("ClipboardItem" in window)) {
				await copyText(getFlagUrl(name, dialogShape, pngSize), "PNG URL")
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
					`${safeName}-${dialogShape}.svg`
				)
			} else {
				const response = await fetch(getFlagUrl(name, dialogShape, pngSize))
				if (!response.ok) throw new Error("Flag request failed")
				downloadBlob(
					await response.blob(),
					`${safeName}-${dialogShape}-${pngSize}px.png`
				)
			}
			toast.success(`${format.toUpperCase()} downloaded`)
		} catch {
			toast.error(`Could not download ${format.toUpperCase()}`)
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
							value={dialogShape}
							onValueChange={setDialogShape}
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
						<div className="flex items-center gap-3">
							<DialogTitle className="min-w-0 flex-1 font-semibold">
								{displayName} {shapeLabel} Flag
							</DialogTitle>
						</div>

						<div className="flex flex-wrap items-center gap-2">
							<DropdownMenu>
								<ButtonGroup size="40" color="primary" variant="strong">
									<Button onClick={copyPng}>PNG</Button>
									<DropdownMenuTrigger asChild>
										<Button
											className="border-l border-black/20"
											aria-label={`PNG size: ${pngSize} pixels`}>
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
								size="40"
								color="primary"
								variant="strong"
								onClick={copySvg}>
								SVG
							</Button>

							<DropdownMenu>
								<ButtonGroup size="40" color="primary" variant="strong">
									<Button onClick={() => downloadFlag("png")}>Download</Button>
									<DropdownMenuTrigger asChild>
										<IconButton
											className="border-l border-black/20"
											aria-label="Choose download format">
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
									CDN
								</Button>
								<Button
									size="32"
									color="neutral"
									variant="outline"
									onClick={() =>
										copyText(
											getFlagHtmlMarkup(name, dialogShape),
											"React snippet"
										)
									}>
									React JS
								</Button>
								<Button
									size="32"
									color="neutral"
									variant="outline"
									onClick={() =>
										copyText(
											getFlagNextImageMarkup(name, dialogShape),
											"Next.js snippet"
										)
									}>
									Next JS
								</Button>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<p className="text-fg-secondary text-xs font-medium">
								Add flag to your radian project
							</p>
							<PackageManagerTabs commands={packageCommands} />
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
						<div className="grid grid-cols-[repeat(auto-fill,50px)] gap-2">
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
											src={getFlagUrl(flagName, dialogShape)}
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
