"use client"

import type { LucideIcon } from "lucide-react"
import {
	Bot,
	Boxes,
	BriefcaseBusiness,
	ChevronDown,
	Cloud,
	Code2,
	Cpu,
	CreditCard,
	Database,
	Gamepad2,
	LayoutGrid,
	ListTodo,
	Palette,
	Share2,
} from "lucide-react"
import { Button } from "@/registry/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuDivider,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
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
}

export function BrandLogoCategoryDropdown({
	value,
	onValueChange,
}: BrandLogoCategoryDropdownProps) {
	const activeCategory = brandLogoCategories.find(
		(category) => category.slug === value
	)
	const label = activeCategory?.label ?? ALL_BRAND_LOGO_CATEGORY
	const ActiveIcon = activeCategory
		? (categoryIcons[activeCategory.slug] ?? LayoutGrid)
		: LayoutGrid

	return (
		<DropdownMenu indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<Button
					color="neutral"
					variant="outline"
					className="shrink-0"
					aria-label={`Brand logo category: ${label}`}>
					<ActiveIcon />
					<span className="hidden md:inline">{label}</span>
					<ChevronDown aria-hidden="true" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="max-h-[min(32rem,var(--radix-dropdown-menu-content-available-height))] w-72 overflow-y-auto">
				<DropdownMenuLabel>Categories</DropdownMenuLabel>
				<DropdownMenuDivider />
				<DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
					<DropdownMenuRadioItem value={ALL_BRAND_LOGO_CATEGORY}>
						<LayoutGrid className="text-fg-secondary size-4" />
						<span className="flex-1 text-sm font-medium">
							{ALL_BRAND_LOGO_CATEGORY}
						</span>
						<span className="text-fg-tertiary text-xs">
							{brandLogos.length}
						</span>
					</DropdownMenuRadioItem>
					<DropdownMenuDivider />
					{brandLogoCategories.map((category) => {
						const Icon = categoryIcons[category.slug] ?? LayoutGrid

						return (
							<DropdownMenuRadioItem key={category.slug} value={category.slug}>
								<Icon className="text-fg-secondary size-4" />
								<span className="flex-1 text-sm font-medium">
									{category.label}
								</span>
								<span className="text-fg-tertiary text-xs">
									{category.count}
								</span>
							</DropdownMenuRadioItem>
						)
					})}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
