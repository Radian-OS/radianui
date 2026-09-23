"use client"

import React from "react"
import Image from "next/image"
import { MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"
import { Checkbox } from "@/styles/default/ui/checkbox"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import { TableCell, TableRow } from "@/styles/default/ui/table"
import type { VisibleColumns } from "./columns-customizer"
import { HealthProgressBar } from "./health-progress-bar"
import type { CompanyCategory, CompanyItem, CompanyStage } from "./types"

interface CompaniesTableRowProps {
	company: CompanyItem
	isSelected: boolean
	onToggleSelect: (id: string) => void
	columns: VisibleColumns
}

export function CompaniesTableRow({
	company,
	isSelected,
	onToggleSelect,
	columns,
}: CompaniesTableRowProps) {
	const renderStageBadge = (stage: CompanyStage) => {
		switch (stage) {
			case "Committed":
				return (
					<Badge
						variant="soft"
						color="emerald"
						size="20"
						className="border-emerald-500/30">
						Committed
					</Badge>
				)
			case "Proposal":
				return (
					<Badge
						variant="soft"
						color="amber"
						size="20"
						className="border-amber-500/30">
						Proposal
					</Badge>
				)
			case "Renewal":
				return (
					<Badge
						variant="soft"
						color="neutral"
						size="20"
						className="text-fg-secondary">
						Renewal
					</Badge>
				)
			case "Evaluation":
				return (
					<Badge
						variant="soft"
						color="purple"
						size="20"
						className="border-purple-500/30">
						Evaluation
					</Badge>
				)
			case "Discovery":
				return (
					<Badge
						variant="soft"
						color="neutral"
						size="20"
						className="text-fg-secondary">
						Discovery
					</Badge>
				)
		}
	}

	const renderCategoryBadge = (category: CompanyCategory) => {
		switch (category) {
			case "Enterprise":
				return (
					<Badge key={category} variant="soft" color="blue" size="20">
						Enterprise
					</Badge>
				)
			case "Design partner":
				return (
					<Badge key={category} variant="soft" color="purple" size="20">
						Design partner
					</Badge>
				)
			case "Regulated":
				return (
					<Badge key={category} variant="soft" color="amber" size="20">
						Regulated
					</Badge>
				)
			case "Expansion":
				return (
					<Badge key={category} variant="soft" color="emerald" size="20">
						Expansion
					</Badge>
				)
			case "Open source":
				return (
					<Badge key={category} variant="soft" color="cyan" size="20">
						Open source
					</Badge>
				)
			case "Self-serve":
				return (
					<Badge key={category} variant="soft" color="light-blue" size="20">
						Self-serve
					</Badge>
				)
		}
	}

	return (
		<TableRow
			data-state={isSelected ? "selected" : undefined}
			className="border-border/60 hover:bg-elevation-level1/20 transition-colors">
			{/* Row Selection Checkbox */}
			<TableCell className="w-10 py-3.5 pr-1 pl-4">
				<Checkbox
					size="sm"
					checked={isSelected}
					onCheckedChange={() => onToggleSelect(company.id)}
					aria-label={`Select ${company.name}`}
				/>
			</TableCell>

			{/* Company Logo, Name & Domain */}
			{columns.company && (
				<TableCell className="py-3.5">
					<div className="flex items-center gap-3">
						<div className="border-border/70 bg-elevation-level1/40 relative flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md border">
							<Image
								src={`https://www.google.com/s2/favicons?sz=32&domain=${company.domain}`}
								alt={company.name}
								width={18}
								height={18}
								unoptimized
								className="size-4.5 object-contain"
							/>
						</div>
						<div className="flex flex-col">
							<span className="text-foreground text-xs font-semibold">
								{company.name}
							</span>
							<span className="text-fg-tertiary font-mono text-[11px]">
								{company.domain}
							</span>
						</div>
					</div>
				</TableCell>
			)}

			{/* Owner */}
			{columns.owner && (
				<TableCell className="py-3.5">
					<div className="flex items-center gap-2">
						<Avatar
							size="20"
							rounded="circle"
							className="border-border/60 border">
							<AvatarImage
								src={company.owner.avatarUrl}
								alt={company.owner.name}
							/>
							<AvatarFallback className="text-[9px] font-semibold">
								{company.owner.initials}
							</AvatarFallback>
						</Avatar>
						<span className="text-foreground text-xs font-medium">
							{company.owner.name}
						</span>
					</div>
				</TableCell>
			)}

			{/* Stage */}
			{columns.stage && (
				<TableCell className="py-3.5">
					{renderStageBadge(company.stage)}
				</TableCell>
			)}

			{/* ARR */}
			{columns.arr && (
				<TableCell className="py-3.5">
					<span className="text-foreground font-mono text-xs font-semibold">
						{company.arr}
					</span>
				</TableCell>
			)}

			{/* Categories */}
			{columns.categories && (
				<TableCell className="py-3.5">
					<div className="flex flex-wrap items-center gap-1.5">
						{company.categories.map(renderCategoryBadge)}
					</div>
				</TableCell>
			)}

			{/* Health */}
			{columns.health && (
				<TableCell className="py-3.5">
					<HealthProgressBar health={company.health} />
				</TableCell>
			)}

			{/* Actions Dropdown */}
			<TableCell className="w-10 py-3.5 pr-4 text-right">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							type="button"
							variant="ghost"
							color="neutral"
							size="28"
							className="text-fg-tertiary hover:text-foreground size-7 p-0">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="text-xs">
						<DropdownMenuItem>View details</DropdownMenuItem>
						<DropdownMenuItem>Edit company</DropdownMenuItem>
						<DropdownMenuItem>Change owner</DropdownMenuItem>
						<DropdownMenuItem className="text-error">Archive</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	)
}
