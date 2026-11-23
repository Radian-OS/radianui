"use client"

import { useLayoutEffect, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
	ArrowLeft,
	BadgeIcon,
	Bot,
	Boxes,
	BriefcaseBusiness,
	ChevronDown,
	ChevronRight,
	Cloud,
	Code2,
	Cpu,
	CreditCard,
	Database,
	Filter,
	Gamepad2,
	LayoutGrid,
	ListTodo,
	Palette,
	RectangleHorizontal,
	Share2,
	SunMoon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { ScrollArea } from "@/registry/ui/scroll-area"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { useMobileResourceLayout } from "../../components/ResourceDetailsDrawer"
import type { BrandLogoColorway, BrandLogoVariant } from "./brand-logos-data"
import { ALL_BRAND_LOGO_CATEGORY } from "./brand-logos-data"
import { useBrandLogoCatalog } from "./BrandLogoCatalogProvider"

const categoryIcons: Record<string, LucideIcon> = {
	ai: Bot,
	"business-marketing": BriefcaseBusiness,
	"cloud-devops": Cloud,
	"database-data": Database,
	"design-creative": Palette,
	development: Code2,
	"entertainment-gaming": Gamepad2,
	"finance-payments": CreditCard,
	frameworks: Boxes,
	"productivity-work": ListTodo,
	"social-content": Share2,
	technology: Cpu,
}

interface BrandLogoCategoryDropdownProps {
	value: string
	onValueChange: (value: string) => void
	variant?: BrandLogoVariant
	onVariantChange?: (variant: BrandLogoVariant) => void
	colorway?: BrandLogoColorway
	onColorwayChange?: (colorway: BrandLogoColorway) => void
	className?: string
}

export function BrandLogoCategoryDropdown({
	value,
	onValueChange,
	variant,
	onVariantChange,
	colorway,
	onColorwayChange,
	className,
}: BrandLogoCategoryDropdownProps) {
	const { brandLogoCategories, brandLogos } = useBrandLogoCatalog()
	const mobile = useMobileResourceLayout()
	const [open, setOpen] = useState(false)
	const [section, setSection] = useState<string | null>(null)
	const focusedMenuItem = useRef<HTMLDivElement>(null)
	const navigated = useRef(false)
	const categoryChanged = useRef(false)

	const activeCategory = brandLogoCategories.find(
		(category) => category.slug === value
	)
	const label = activeCategory?.label ?? ALL_BRAND_LOGO_CATEGORY

	const handleOpenChange = (nextOpen: boolean) => {
		setOpen(nextOpen)
		if (!nextOpen) {
			setSection(null)
			navigated.current = false
		}
	}

	const handleValueChange = (nextValue: string) => {
		categoryChanged.current = true
		onValueChange(nextValue)
		handleOpenChange(false)
	}

	useLayoutEffect(() => {
		if (mobile && open && navigated.current) focusedMenuItem.current?.focus()
	}, [mobile, open, section])

	const categories = (
		<ScrollArea className="w-full pr-1.5 [&_[data-slot=scroll-area-viewport]]:max-h-[min(18rem,calc(var(--radix-dropdown-menu-content-available-height)-3.5rem))]">
			<DropdownMenuRadioGroup
				aria-label="Category"
				value={value}
				onValueChange={handleValueChange}>
				<DropdownMenuRadioItem
					value={ALL_BRAND_LOGO_CATEGORY}
					className="h-8.5">
					<LayoutGrid className="text-fg-secondary size-4 shrink-0" />
					<span className="flex-1 text-sm font-medium whitespace-nowrap">
						{ALL_BRAND_LOGO_CATEGORY}
					</span>
					<span className="text-fg-tertiary shrink-0 text-xs tabular-nums">
						{brandLogos.length}
					</span>
				</DropdownMenuRadioItem>
				{brandLogoCategories.map((category) => {
					const Icon = categoryIcons[category.slug] ?? LayoutGrid
					return (
						<DropdownMenuRadioItem
							key={category.slug}
							value={category.slug}
							className="h-8.5">
							<Icon className="text-fg-secondary size-4 shrink-0" />
							<span className="flex-1 text-sm font-medium whitespace-nowrap">
								{category.label}
							</span>
							<span className="text-fg-tertiary shrink-0 text-xs tabular-nums">
								{category.count}
							</span>
						</DropdownMenuRadioItem>
					)
				})}
			</DropdownMenuRadioGroup>
		</ScrollArea>
	)
	const sections = [
		...(variant && onVariantChange
			? [
					{
						label: "Variant",
						selected: variant,
						icon: variant === "wordmark" ? RectangleHorizontal : BadgeIcon,
						width: "w-60",
						options: (
							<DropdownMenuRadioGroup
								aria-label="Variant"
								value={variant}
								onValueChange={(val) => {
									onVariantChange(val as BrandLogoVariant)
									handleOpenChange(false)
								}}>
								<DropdownMenuRadioItem value="icon" className="h-8.5">
									<BadgeIcon className="text-fg-secondary size-4 shrink-0" />
									<span className="flex-1 text-sm font-medium whitespace-nowrap">
										Icon
									</span>
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value="wordmark" className="h-8.5">
									<RectangleHorizontal className="text-fg-secondary size-4 shrink-0" />
									<span className="flex-1 text-sm font-medium whitespace-nowrap">
										Wordmark
									</span>
								</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
						),
					},
				]
			: []),
		...(variant && onVariantChange && colorway && onColorwayChange
			? [
					{
						label: "Color",
						selected: colorway,
						icon: colorway === "colored" ? Palette : SunMoon,
						width: "w-52",
						options: (
							<DropdownMenuRadioGroup
								aria-label="Color"
								value={colorway}
								onValueChange={(val) => {
									onColorwayChange(val as BrandLogoColorway)
									handleOpenChange(false)
								}}>
								<DropdownMenuRadioItem value="colored" className="h-8.5">
									<Palette className="text-fg-secondary size-4 shrink-0" />
									<span className="flex-1 text-sm font-medium whitespace-nowrap">
										Colored
									</span>
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value="neutral" className="h-8.5">
									<SunMoon className="text-fg-secondary size-4 shrink-0" />
									<span className="flex-1 text-sm font-medium whitespace-nowrap">
										Neutral
									</span>
								</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
						),
					},
				]
			: []),
		{
			label: "Category",
			selected: label,
			icon: categoryIcons[activeCategory?.slug ?? ""] ?? LayoutGrid,
			width: "w-76",
			options: categories,
		},
	]
	const activeSection = sections.find((item) => item.label === section)
	const navigate = (nextSection: string | null) => (event: Event) => {
		event.preventDefault()
		navigated.current = true
		setSection(nextSection)
	}
	const sectionRow = ({
		icon: Icon,
		label,
		selected,
	}: (typeof sections)[number]) => (
		<>
			<Icon className="text-fg-secondary size-4 shrink-0" />
			<span className="flex-1 text-sm font-medium whitespace-nowrap">
				{label}
			</span>
			<span className="text-fg-secondary max-w-32 truncate text-xs capitalize">
				{selected}
			</span>
		</>
	)

	return (
		<DropdownMenu
			open={open}
			onOpenChange={handleOpenChange}
			indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<Button
					size="xl"
					color="neutral"
					variant="outline"
					className={cn(
						"bg-bg hover:bg-bg active:bg-bg data-[state=open]:bg-bg focus-visible:bg-bg shrink-0 text-[14px] shadow-none",
						className
					)}
					aria-label="Filter brand logos">
					<Filter />
					<span>Filter</span>
					<ChevronDown aria-hidden="true" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className={
					mobile || sections.length === 1
						? "w-76 max-w-[calc(100vw-1rem)]"
						: "w-68"
				}
				onCloseAutoFocus={(event) => {
					if (categoryChanged.current) event.preventDefault()
					categoryChanged.current = false
				}}>
				{sections.length === 1 ? (
					categories
				) : mobile && activeSection ? (
					<>
						<DropdownMenuItem
							ref={focusedMenuItem}
							onSelect={navigate(null)}
							aria-label="Back to filters">
							<ArrowLeft aria-hidden="true" />
							Back
						</DropdownMenuItem>
						{activeSection.options}
					</>
				) : (
					sections.map((item, index) =>
						mobile ? (
							<DropdownMenuItem
								key={item.label}
								ref={index === 0 ? focusedMenuItem : undefined}
								onSelect={navigate(item.label)}
								className="h-9 gap-2.5 px-2.5">
								{sectionRow(item)}
								<ChevronRight aria-hidden="true" />
							</DropdownMenuItem>
						) : (
							<DropdownMenuSub key={item.label}>
								<DropdownMenuSubTrigger className="h-9 gap-2.5 px-2.5">
									{sectionRow(item)}
								</DropdownMenuSubTrigger>
								<DropdownMenuSubContent className={item.width}>
									{item.options}
								</DropdownMenuSubContent>
							</DropdownMenuSub>
						)
					)
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
