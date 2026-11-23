"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronDown, Download } from "lucide-react"
import { useBrandLogoTheme } from "./use-brand-logo-theme"
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
import { DrawerDescription, DrawerTitle } from "@/registry/ui/drawer"
import { ScrollArea } from "@/registry/ui/scroll-area"
import {
	ResourceDetailsDrawer,
	useMobileResourceLayout,
} from "../../components/ResourceDetailsDrawer"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import {
	downloadBlob,
	fetchBrandLogoSvg,
	renderBrandLogoPng,
} from "./brand-logo-assets"
import { BrandLogoOptions } from "./BrandLogoOptions"
import { showBrandLogoToast } from "./BrandLogoToast"
import {
	type BrandLogoColorway,
	type BrandLogoId,
	type BrandLogoVariant,
	getLogoDimensions,
} from "./brand-logos-data"
import { useBrandLogoCatalog } from "./BrandLogoCatalogProvider"

interface BrandLogoDetailsDialogProps {
	id: BrandLogoId | null
	variant: BrandLogoVariant
	colorway?: BrandLogoColorway
	open: boolean
	onOpenChange: (open: boolean) => void
	onSelectBrand: (id: BrandLogoId) => void
}

const MORE_LOGOS_LIMIT = 12
const PNG_SIZES = [16, 24, 32, 64, 128, 256, 512] as const

function getMoreLogos(
	brandLogos: readonly import("./brand-logos-data").BrandLogo[],
	id: BrandLogoId
) {
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
	const mobile = useMobileResourceLayout()
	const {
		brandLogos,
		getBrandLogo,
		getBrandLogoDisplayUrl,
		getBrandLogoHtmlMarkup,
		getBrandLogoNextImageMarkup,
		getBrandLogoSvgUrl,
	} = useBrandLogoCatalog()
	const activeTheme = useBrandLogoTheme() ?? "dark"
	const [dialogVariant, setDialogVariant] = useState<BrandLogoVariant>(variant)
	const [dialogColorway, setDialogColorway] =
		useState<BrandLogoColorway>(colorway)
	const [pngExportWidth, setPngExportWidth] = useState(512)
	const moreLogos = useMemo(
		() => (id ? getMoreLogos(brandLogos, id) : []),
		[brandLogos, id]
	)

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
			const svgMarkup = await fetchBrandLogoSvg(activeSvgUrl)
			await navigator.clipboard.writeText(svgMarkup)
			showToast("SVG code has been copied to your clipboard.")
		} catch {
			toast.error("Could not copy SVG code")
		}
	}

	const renderPng = () =>
		renderBrandLogoPng(
			activeSvgUrl,
			dialogVariant,
			pngExportWidth / getLogoDimensions(dialogVariant).width
		)

	const copyPng = async () => {
		try {
			if (!navigator.clipboard.write || !("ClipboardItem" in window)) {
				await copyText(activeSvgUrl, "CDN URL")
				return
			}

			await navigator.clipboard.write([
				new ClipboardItem({ "image/png": renderPng() }),
			])
			showToast("PNG image has been copied to your clipboard.")
		} catch {
			toast.error("Could not copy PNG image")
		}
	}

	const downloadLogo = async (format: "png" | "svg") => {
		try {
			const filename = `${id}-${activeTheme}-${dialogColorway}-${dialogVariant}`
			if (format === "svg") {
				const svgMarkup = await fetchBrandLogoSvg(activeSvgUrl)
				downloadBlob(
					new Blob([svgMarkup], { type: "image/svg+xml" }),
					`${filename}.svg`
				)
			} else {
				const blob = await renderPng()
				downloadBlob(blob, `${filename}-${pngExportWidth}px.png`)
			}
			showToast(
				`${format.toUpperCase()} has been downloaded.`,
				"Download Complete"
			)
		} catch {
			toast.error(`Could not download ${format.toUpperCase()}`)
		}
	}

	const title = `${brand.name} ${dialogVariant === "icon" ? "Icon" : "Wordmark"}`
	const description = `Preview, copy, and download the ${brand.name} logo.`
	const content = (
		<>
			<div className="grid gap-5 md:grid-cols-[360px_minmax(0,1fr)]">
				<div className="bg-bg border-soft relative flex h-40 items-center justify-center rounded-lg border p-6 sm:h-60 md:h-auto md:min-h-80">
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
						className={cn(
							"object-contain",
							dialogVariant === "icon"
								? "size-20 sm:size-24"
								: "h-16 w-full max-w-67.5 sm:h-18"
						)}
					/>
				</div>

				<div className="flex min-w-0 flex-col gap-5">
					{!mobile && (
						<DialogTitle className="font-semibold">{title}</DialogTitle>
					)}

					<div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
						<DropdownMenu>
							<ButtonGroup
								size="sm"
								color="primary"
								variant="strong"
								className="w-full sm:w-auto">
								<Button className="flex-1 sm:flex-none" onClick={copyPng}>
									Copy PNG
								</Button>
								<DropdownMenuTrigger asChild>
									<Button
										aria-label={`PNG width: ${pngExportWidth} pixels`}
										className="border-alpha border-l">
										{pngExportWidth} px
										<ChevronDown />
									</Button>
								</DropdownMenuTrigger>
							</ButtonGroup>
							<DropdownMenuContent align="start">
								<DropdownMenuLabel className="uppercase">
									PNG width
								</DropdownMenuLabel>
								<DropdownMenuRadioGroup
									value={String(pngExportWidth)}
									onValueChange={(value) => setPngExportWidth(Number(value))}>
									{PNG_SIZES.map((size) => (
										<DropdownMenuRadioItem key={size} value={String(size)}>
											{size} px
										</DropdownMenuRadioItem>
									))}
								</DropdownMenuRadioGroup>
							</DropdownMenuContent>
						</DropdownMenu>
						<Button size="sm" className="w-full sm:w-fit" onClick={copySvg}>
							Copy SVG
						</Button>

						<DropdownMenu>
							<ButtonGroup
								size="sm"
								color="neutral"
								variant="outline"
								className="w-full sm:w-auto">
								<Button
									className="flex-1 sm:flex-none"
									onClick={() => downloadLogo("svg")}>
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
								<DropdownMenuLabel className="uppercase">
									Download format
								</DropdownMenuLabel>
								<DropdownMenuItem onSelect={() => downloadLogo("svg")}>
									Download SVG
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={() => downloadLogo("png")}>
									Download PNG
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					<div className="flex flex-col gap-2">
						<p className="text-fg-secondary text-xs font-medium">
							Code snippets
						</p>
						<div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap [&>button]:w-full sm:[&>button]:w-fit">
							<Button
								size="sm"
								color="neutral"
								variant="outline"
								onClick={() => copyText(activeSvgUrl, "CDN URL")}>
								CDN URL
							</Button>
							<Button
								size="sm"
								color="neutral"
								variant="outline"
								onClick={copySvg}>
								SVG Code
							</Button>
							<Button
								size="sm"
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
								size="sm"
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
						<p className="text-fg-secondary text-xs font-medium">Tags</p>
						<div className="flex flex-wrap gap-1.5">
							{searchTags.map((tag) => (
								<Badge key={tag} color="neutral" variant="soft" size="md">
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
							size="md"
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
								className="size-7 object-contain"
							/>
						</Button>
					))}
				</div>
			</div>
		</>
	)

	return mobile ? (
		<ResourceDetailsDrawer
			open={open}
			onOpenChange={onOpenChange}
			header={
				<>
					<DrawerTitle className="min-w-0 truncate">{title}</DrawerTitle>
					<DrawerDescription className="sr-only">
						{description}
					</DrawerDescription>
				</>
			}>
			<div className="p-4 pb-[max(16px,env(safe-area-inset-bottom))]">
				{content}
			</div>
		</ResourceDetailsDrawer>
	) : (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-h-[calc(100dvh-8px)] w-[calc(100%-8px)] max-w-[1000px] gap-0 overflow-hidden rounded-xl p-0 sm:max-w-[1000px]">
				<DialogDescription className="sr-only">{description}</DialogDescription>
				<ScrollArea
					className="min-h-0 [&_[data-slot=scroll-area-viewport]]:max-h-[calc(100dvh-8px)]"
					type="auto">
					<div className="p-6">{content}</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}
