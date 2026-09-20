"use client"

import { useEffect, useMemo, useState } from "react"
import {
	ChevronDown,
	CodeXml,
	Download,
	Image as ImageIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
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
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { BrandLogoOptions } from "./BrandLogoOptions"
import type { BrandLogoId, BrandLogoVariant } from "./brand-logos-data"
import {
	brandLogos,
	getBrandLogo,
	getBrandLogoHtmlMarkup,
	getBrandLogoNextImageMarkup,
	getBrandLogoUrl,
} from "./brand-logos-data"

interface BrandLogoDetailsDialogProps {
	id: BrandLogoId | null
	variant: BrandLogoVariant
	open: boolean
	onOpenChange: (open: boolean) => void
	onSelectBrand: (id: BrandLogoId) => void
}

const MORE_LOGOS_LIMIT = 12

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

function getMoreLogos(id: BrandLogoId) {
	const selectedIndex = brandLogos.findIndex((brand) => brand.id === id)
	const ordered = [
		...brandLogos.slice(selectedIndex + 1),
		...brandLogos.slice(0, selectedIndex),
	]
	return ordered.slice(0, MORE_LOGOS_LIMIT)
}

export function BrandLogoDetailsDialog({
	id,
	variant,
	open,
	onOpenChange,
	onSelectBrand,
}: BrandLogoDetailsDialogProps) {
	const { resolvedTheme } = useTheme()
	const activeTheme = resolvedTheme === "dark" ? "dark" : "light"
	const [dialogVariant, setDialogVariant] = useState<BrandLogoVariant>(variant)
	const moreLogos = useMemo(() => (id ? getMoreLogos(id) : []), [id])

	useEffect(() => {
		if (!open) return
		setDialogVariant(variant)
	}, [open, variant])

	if (!id) return null

	const brand = getBrandLogo(id)
	const svgUrl = getBrandLogoUrl(id, activeTheme, dialogVariant, "svg")
	const pngUrl = getBrandLogoUrl(id, activeTheme, dialogVariant, "png")
	const lightSvgUrl = getBrandLogoUrl(id, "light", dialogVariant, "svg")
	const darkSvgUrl = getBrandLogoUrl(id, "dark", dialogVariant, "svg")
	const searchTags = Array.from(
		new Set([
			brand.name,
			brand.id,
			...brand.aliases,
			`${brand.name} logo`,
			dialogVariant,
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

	const getSvg = async () => {
		const response = await fetch(svgUrl)
		if (!response.ok) throw new Error("Logo request failed")
		return response.text()
	}

	const copySvg = async () => {
		try {
			await copyText(await getSvg(), "SVG")
		} catch {
			toast.error("Could not copy SVG")
		}
	}

	const copyPng = async () => {
		try {
			if (!navigator.clipboard.write || !("ClipboardItem" in window)) {
				await copyText(pngUrl, "PNG URL")
				return
			}

			const response = await fetch(pngUrl)
			if (!response.ok) throw new Error("Logo request failed")
			await navigator.clipboard.write([
				new ClipboardItem({ "image/png": await response.blob() }),
			])
			toast.success("PNG copied to clipboard")
		} catch {
			toast.error("Could not copy PNG")
		}
	}

	const downloadLogo = async (format: "png" | "svg") => {
		try {
			const filename = `${id}-${activeTheme}-${dialogVariant}.${format}`
			if (format === "svg") {
				downloadBlob(
					new Blob([await getSvg()], { type: "image/svg+xml" }),
					filename
				)
			} else {
				const response = await fetch(pngUrl)
				if (!response.ok) throw new Error("Logo request failed")
				downloadBlob(await response.blob(), filename)
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
					Preview, copy, and download the {brand.name} logo.
				</DialogDescription>

				<div className="grid gap-5 md:grid-cols-[360px_minmax(0,1fr)]">
					<div className="bg-bg border-soft relative flex h-60 items-center justify-center rounded-lg border p-6 md:h-auto md:min-h-80">
						<div className="absolute top-3 right-3">
							<BrandLogoOptions
								variant={dialogVariant}
								onVariantChange={setDialogVariant}
								compact
							/>
						</div>
						<img
							src={lightSvgUrl}
							alt={`${brand.name} ${dialogVariant}`}
							width={dialogVariant === "icon" ? 96 : 270}
							height={dialogVariant === "icon" ? 96 : 72}
							className={cn(
								"object-contain dark:hidden",
								dialogVariant === "icon" ? "size-24" : "h-18 w-full max-w-67.5"
							)}
						/>
						<img
							src={darkSvgUrl}
							alt=""
							width={dialogVariant === "icon" ? 96 : 270}
							height={dialogVariant === "icon" ? 96 : 72}
							className={cn(
								"hidden object-contain dark:block",
								dialogVariant === "icon" ? "size-24" : "h-18 w-full max-w-67.5"
							)}
						/>
					</div>

					<div className="flex min-w-0 flex-col gap-5">
						<div className="flex items-center gap-3">
							<DialogTitle className="min-w-0 flex-1 font-semibold">
								{brand.name} {dialogVariant === "icon" ? "Icon" : "Wordmark"}
							</DialogTitle>
						</div>

						<p className="text-fg-secondary text-sm">
							The preview automatically matches your active theme. SVG scales
							cleanly at any size; the transparent PNG is provided at 48 px
							high.
						</p>

						<div className="flex flex-wrap items-center gap-2">
							<Button size="40" onClick={copyPng}>
								<ImageIcon />
								Copy PNG
							</Button>
							<Button size="40" onClick={copySvg}>
								<CodeXml />
								Copy SVG
							</Button>

							<DropdownMenu>
								<ButtonGroup size="40" color="neutral" variant="outline">
									<Button onClick={() => downloadLogo("svg")}>
										<Download />
										Download
									</Button>
									<DropdownMenuTrigger asChild>
										<IconButton
											className="border-l"
											aria-label="Choose download format">
											<ChevronDown />
										</IconButton>
									</DropdownMenuTrigger>
								</ButtonGroup>
								<DropdownMenuContent align="end">
									<DropdownMenuItem onSelect={() => downloadLogo("svg")}>
										<Download />
										Download SVG
									</DropdownMenuItem>
									<DropdownMenuItem onSelect={() => downloadLogo("png")}>
										<ImageIcon />
										Download PNG
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						<div className="flex flex-col gap-2">
							<p className="text-fg-secondary text-xs font-medium">
								Code snippets
							</p>
							<div className="flex flex-wrap gap-2">
								<Button
									size="32"
									color="neutral"
									variant="outline"
									onClick={() => copyText(svgUrl, "CDN URL")}>
									CDN URL
								</Button>
								<Button
									size="32"
									color="neutral"
									variant="outline"
									onClick={() =>
										copyText(
											getBrandLogoHtmlMarkup(id, activeTheme, dialogVariant),
											"HTML markup"
										)
									}>
									HTML
								</Button>
								<Button
									size="32"
									color="neutral"
									variant="outline"
									onClick={() =>
										copyText(
											getBrandLogoNextImageMarkup(
												id,
												activeTheme,
												dialogVariant
											),
											"Next.js markup"
										)
									}>
									Next.js
								</Button>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<p className="text-fg-secondary text-xs font-medium">
								Available assets
							</p>
							<div className="flex flex-wrap gap-1.5">
								{["Light", "Dark", "Icon", "Wordmark", "SVG", "PNG"].map(
									(option) => (
										<Badge
											key={option}
											size="24"
											color="neutral"
											variant="outline">
											{option}
										</Badge>
									)
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="mt-6 flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						<p className="text-fg-secondary text-xs font-medium">Search tags</p>
						<div className="flex flex-wrap gap-1.5">
							{searchTags.map((tag) => (
								<Badge key={tag} size="24" color="neutral" variant="outline">
									{tag}
								</Badge>
							))}
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<p className="text-fg-secondary text-xs font-medium">More logos</p>
						<div className="grid grid-cols-[repeat(auto-fill,58px)] gap-2">
							{moreLogos.map((moreBrand) => (
								<Button
									key={moreBrand.id}
									size="32"
									color="neutral"
									variant="outline"
									className="bg-bg size-14.5 p-0"
									aria-label={`View ${moreBrand.name} logo`}
									onClick={() => onSelectBrand(moreBrand.id)}>
									<img
										src={getBrandLogoUrl(moreBrand.id, "light", "icon")}
										alt=""
										width={32}
										height={32}
										className="size-8 object-contain dark:hidden"
									/>
									<img
										src={getBrandLogoUrl(moreBrand.id, "dark", "icon")}
										alt=""
										width={32}
										height={32}
										className="hidden size-8 object-contain dark:block"
									/>
								</Button>
							))}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
