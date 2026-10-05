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
import {
	downloadBlob,
	fetchBrandLogoSvg,
	renderBrandLogoPng,
} from "./brand-logo-assets"
import { BrandLogoOptions } from "./BrandLogoOptions"
import { showBrandLogoToast } from "./BrandLogoToast"
import type {
	BrandLogoColorway,
	BrandLogoId,
	BrandLogoVariant,
} from "./brand-logos-data"
import {
	brandLogos,
	getBrandLogo,
	getBrandLogoDisplayUrl,
	getBrandLogoFallbackUrl,
	getBrandLogoHtmlMarkup,
	getBrandLogoNextImageMarkup,
	getBrandLogoSvgUrl,
	registerBrandLogoFallback,
} from "./brand-logos-data"

interface BrandLogoDetailsDialogProps {
	id: BrandLogoId | null
	variant: BrandLogoVariant
	colorway?: BrandLogoColorway
	open: boolean
	onOpenChange: (open: boolean) => void
	onSelectBrand: (id: BrandLogoId) => void
}

const MORE_LOGOS_LIMIT = 12

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
	colorway = "colored",
	open,
	onOpenChange,
	onSelectBrand,
}: BrandLogoDetailsDialogProps) {
	const { resolvedTheme } = useTheme()
	const activeTheme = resolvedTheme === "dark" ? "dark" : "light"
	const [dialogVariant, setDialogVariant] = useState<BrandLogoVariant>(variant)
	const [dialogColorway, setDialogColorway] =
		useState<BrandLogoColorway>(colorway)
	const moreLogos = useMemo(() => (id ? getMoreLogos(id) : []), [id])

	useEffect(() => {
		if (!open) return
		setDialogVariant(variant)
		setDialogColorway(colorway)
	}, [open, variant, colorway])

	if (!id) return null

	const brand = getBrandLogo(id)
	const activeSvgUrl = getBrandLogoSvgUrl(
		id,
		activeTheme,
		dialogColorway,
		dialogVariant
	)
	const activeDisplayUrl = getBrandLogoDisplayUrl(
		id,
		activeTheme,
		dialogColorway,
		dialogVariant
	)

	const searchTags = Array.from(
		new Set([
			brand.name,
			brand.id,
			...brand.aliases,
			`${brand.name} logo`,
			dialogVariant,
			dialogColorway,
		])
	)

	const showToast = (description: string, title?: string) => {
		showBrandLogoToast({
			logoUrl: activeDisplayUrl,
			description,
			title,
		})
	}

	const copyText = async (value: string, label: string) => {
		try {
			await navigator.clipboard.writeText(value)
			showToast(`${label} has been copied to your clipboard.`)
		} catch {
			toast.error(`Could not copy ${label}`)
		}
	}

	const copySvg = async () => {
		try {
			const svgMarkup = await fetchBrandLogoSvg(
				id,
				activeTheme,
				dialogColorway,
				dialogVariant
			)
			await navigator.clipboard.writeText(svgMarkup)
			showToast("SVG code has been copied to your clipboard.")
		} catch {
			toast.error("Could not copy SVG code")
		}
	}

	const copyPng = async () => {
		try {
			if (!navigator.clipboard.write || !("ClipboardItem" in window)) {
				await copyText(activeSvgUrl, "CDN URL")
				return
			}

			const blob = await renderBrandLogoPng(
				id,
				activeTheme,
				dialogColorway,
				dialogVariant
			)
			await navigator.clipboard.write([
				new ClipboardItem({ "image/png": blob }),
			])
			showToast("PNG image has been copied to your clipboard.")
		} catch {
			toast.error("Could not copy PNG image")
		}
	}

	const downloadLogo = async (format: "png" | "svg") => {
		try {
			const filename = `${id}-${activeTheme}-${dialogColorway}-${dialogVariant}.${format}`
			if (format === "svg") {
				const svgMarkup = await fetchBrandLogoSvg(
					id,
					activeTheme,
					dialogColorway,
					dialogVariant
				)
				downloadBlob(new Blob([svgMarkup], { type: "image/svg+xml" }), filename)
			} else {
				const blob = await renderBrandLogoPng(
					id,
					activeTheme,
					dialogColorway,
					dialogVariant
				)
				downloadBlob(blob, filename)
			}
			showToast(
				`${format.toUpperCase()} has been downloaded.`,
				"Download Complete"
			)
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
								colorway={dialogColorway}
								onColorwayChange={setDialogColorway}
								compact
							/>
						</div>
						<img
							src={activeDisplayUrl}
							alt={`${brand.name} ${dialogVariant}`}
							width={dialogVariant === "icon" ? 96 : 270}
							height={dialogVariant === "icon" ? 96 : 72}
							onError={(e) => {
								registerBrandLogoFallback(id)
								const fallback = getBrandLogoFallbackUrl(
									id,
									activeTheme,
									dialogColorway,
									dialogVariant
								)
								if (
									e.currentTarget.src !== fallback &&
									!e.currentTarget.src.endsWith(fallback)
								) {
									e.currentTarget.src = fallback
								}
							}}
							className={cn(
								"object-contain",
								dialogVariant === "icon"
									? "size-20 sm:size-24"
									: "h-16 w-full max-w-67.5 sm:h-18"
							)}
						/>
					</div>

					<div className="flex min-w-0 flex-col gap-5">
						<div className="flex items-center gap-3">
							<DialogTitle className="min-w-0 flex-1 font-semibold">
								{brand.name} {dialogVariant === "icon" ? "Icon" : "Wordmark"}
							</DialogTitle>
						</div>

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
									onClick={() => copyText(activeSvgUrl, "CDN URL")}>
									CDN URL
								</Button>
								<Button
									size="32"
									color="neutral"
									variant="outline"
									onClick={copySvg}>
									SVG Code
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
												dialogColorway,
												dialogVariant
											),
											"Next.js markup"
										)
									}>
									Next.js &lt;Image&gt;
								</Button>
								<Button
									size="32"
									color="neutral"
									variant="outline"
									onClick={() =>
										copyText(
											getBrandLogoHtmlMarkup(
												id,
												activeTheme,
												dialogColorway,
												dialogVariant
											),
											"HTML markup"
										)
									}>
									HTML &lt;img&gt;
								</Button>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<p className="text-fg-secondary text-xs font-medium">
								Properties
							</p>
							<div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
								<div className="bg-bg border-soft rounded-lg border p-2.5">
									<p className="text-fg-tertiary text-xs">Category</p>
									<p className="font-medium">{brand.categoryLabel}</p>
								</div>
								<div className="bg-bg border-soft rounded-lg border p-2.5">
									<p className="text-fg-tertiary text-xs">Variant</p>
									<p className="font-medium capitalize">{dialogVariant}</p>
								</div>
								<div className="bg-bg border-soft rounded-lg border p-2.5">
									<p className="text-fg-tertiary text-xs">Colorway</p>
									<p className="font-medium capitalize">{dialogColorway}</p>
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<p className="text-fg-secondary text-xs font-medium">Tags</p>
							<div className="flex flex-wrap gap-1.5">
								{searchTags.map((tag) => (
									<Badge key={tag} color="neutral" variant="soft" size="24">
										{tag}
									</Badge>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="mt-8 flex flex-col gap-3">
					<p className="text-fg font-medium">More brand logos</p>
					<div className="grid grid-cols-3 gap-2 sm:grid-cols-6 md:grid-cols-12">
						{moreLogos.map((item) => (
							<Button
								key={item.id}
								size="36"
								color="neutral"
								variant="outline"
								onClick={() => onSelectBrand(item.id)}
								className="bg-bg hover:bg-bg aspect-square size-full p-2">
								<img
									src={getBrandLogoDisplayUrl(
										item.id,
										activeTheme,
										dialogColorway,
										"icon"
									)}
									alt={item.name}
									width={24}
									height={24}
									onError={(e) => {
										registerBrandLogoFallback(item.id)
										const fallback = getBrandLogoFallbackUrl(
											item.id,
											activeTheme,
											dialogColorway,
											"icon"
										)
										if (
											e.currentTarget.src !== fallback &&
											!e.currentTarget.src.endsWith(fallback)
										) {
											e.currentTarget.src = fallback
										}
									}}
									className="size-7 object-contain"
								/>
							</Button>
						))}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
