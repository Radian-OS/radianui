"use client"

import { useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
	BadgeIcon,
	Bot,
	Boxes,
	BriefcaseBusiness,
	ChevronDown,
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
	DropdownMenuDivider,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import type { BrandLogoColorway, BrandLogoVariant } from "./brand-logos-data"
import {
	ALL_BRAND_LOGO_CATEGORY,
	brandLogoCategories,
	brandLogos,
} from "./brand-logos-data"

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
	const [open, setOpen] = useState(false)
	const triggerRef = useRef<HTMLButtonElement>(null)

	const activeCategory = brandLogoCategories.find(
		(category) => category.slug === value
	)
	const label = activeCategory?.label ?? ALL_BRAND_LOGO_CATEGORY
	const ActiveIcon = activeCategory
		? (categoryIcons[activeCategory.slug] ?? LayoutGrid)
		: LayoutGrid
	const VariantIcon = variant === "wordmark" ? RectangleHorizontal : BadgeIcon

	const handleValueChange = (nextValue: string) => {
		onValueChange(nextValue)
		setOpen(false)
	}

	return (
		<DropdownMenu open={open} onOpenChange={setOpen} indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<Button
					ref={triggerRef}
					size="44"
					color="neutral"
					variant="outline"
					className={cn(
						"bg-bg hover:bg-bg active:bg-bg data-[state=open]:bg-bg focus-visible:bg-bg shrink-0 text-[14px] shadow-none",
						className
					)}
					aria-label="Filter brand logos">
					<Filter className="size-4" />
					<span>Filter</span>
					<ChevronDown aria-hidden="true" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className={cn(variant ? "w-68 p-1.5" : "w-76 p-1.5")}
				onCloseAutoFocus={(event) => event.preventDefault()}
				onPointerDownOutside={(event) => {
					const originalTarget = (event.detail?.originalEvent?.target ??
						event.target) as Node | null
					if (originalTarget && triggerRef.current?.contains(originalTarget)) {
						event.preventDefault()
					}
				}}>
				{variant && onVariantChange ? (
					<>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger className="h-9 gap-2.5 px-2.5">
								<ActiveIcon className="text-fg-secondary size-4 shrink-0" />
								<span className="flex-1 text-sm font-medium whitespace-nowrap">
									Category
								</span>
								<span className="text-fg-secondary max-w-32 truncate text-xs">
									{label}
								</span>
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent className="w-76 p-1.5">
								<DropdownMenuLabel className="text-fg-tertiary px-2 py-1 text-xs font-medium">
									Categories
								</DropdownMenuLabel>
								<DropdownMenuDivider />
								<ScrollArea className="h-72 w-full pr-1.5">
									<DropdownMenuRadioGroup
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
										<DropdownMenuDivider />
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
							</DropdownMenuSubContent>
						</DropdownMenuSub>

						<DropdownMenuDivider />

						<DropdownMenuSub>
							<DropdownMenuSubTrigger className="h-9 gap-2.5 px-2.5">
								<VariantIcon className="text-fg-secondary size-4 shrink-0" />
								<span className="flex-1 text-sm font-medium whitespace-nowrap">
									Variant
								</span>
								<span className="text-fg-secondary text-xs capitalize">
									{variant}
								</span>
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent className="w-60 p-1.5">
								<DropdownMenuLabel className="text-fg-tertiary px-2 py-1 text-xs font-medium">
									Logo variant
								</DropdownMenuLabel>
								<DropdownMenuDivider />
								<DropdownMenuRadioGroup
									value={variant}
									onValueChange={(val) => {
										onVariantChange(val as BrandLogoVariant)
										setOpen(false)
									}}>
									<DropdownMenuRadioItem value="icon" className="h-8.5">
										<BadgeIcon className="text-fg-secondary size-4 shrink-0" />
										<span className="flex-1 text-sm font-medium whitespace-nowrap">
											Icon (24×24)
										</span>
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="wordmark" className="h-8.5">
										<RectangleHorizontal className="text-fg-secondary size-4 shrink-0" />
										<span className="flex-1 text-sm font-medium whitespace-nowrap">
											Wordmark (180×48)
										</span>
									</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>
							</DropdownMenuSubContent>
						</DropdownMenuSub>

						{colorway && onColorwayChange && (
							<>
								<DropdownMenuDivider />
								<DropdownMenuSub>
									<DropdownMenuSubTrigger className="h-9 gap-2.5 px-2.5">
										{colorway === "colored" ? (
											<Palette className="text-fg-secondary size-4 shrink-0" />
										) : (
											<SunMoon className="text-fg-secondary size-4 shrink-0" />
										)}
										<span className="flex-1 text-sm font-medium whitespace-nowrap">
											Colorway
										</span>
										<span className="text-fg-secondary text-xs capitalize">
											{colorway}
										</span>
									</DropdownMenuSubTrigger>
									<DropdownMenuSubContent className="w-52 p-1.5">
										<DropdownMenuLabel className="text-fg-tertiary px-2 py-1 text-xs font-medium">
											Colorway
										</DropdownMenuLabel>
										<DropdownMenuDivider />
										<DropdownMenuRadioGroup
											value={colorway}
											onValueChange={(val) => {
												onColorwayChange(val as BrandLogoColorway)
												setOpen(false)
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
									</DropdownMenuSubContent>
								</DropdownMenuSub>
							</>
						)}
					</>
				) : (
					<>
						<DropdownMenuLabel className="text-fg-tertiary px-2 py-1 text-xs font-medium">
							Categories
						</DropdownMenuLabel>
						<DropdownMenuDivider />
						<ScrollArea className="h-72 w-full pr-1.5">
							<DropdownMenuRadioGroup
								value={value}
								onValueChange={handleValueChange}>
								<DropdownMenuRadioItem
									value={ALL_BRAND_LOGO_CATEGORY}
									className="h-8.5"
									onSelect={() => handleValueChange(ALL_BRAND_LOGO_CATEGORY)}>
									<LayoutGrid className="text-fg-secondary size-4 shrink-0" />
									<span className="flex-1 text-sm font-medium whitespace-nowrap">
										{ALL_BRAND_LOGO_CATEGORY}
									</span>
									<span className="text-fg-tertiary shrink-0 text-xs tabular-nums">
										{brandLogos.length}
									</span>
								</DropdownMenuRadioItem>
								<DropdownMenuDivider />
								{brandLogoCategories.map((category) => {
									const Icon = categoryIcons[category.slug] ?? LayoutGrid

									return (
										<DropdownMenuRadioItem
											key={category.slug}
											value={category.slug}
											className="h-8.5"
											onSelect={() => handleValueChange(category.slug)}>
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
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
