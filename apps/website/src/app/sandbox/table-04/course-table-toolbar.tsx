"use client"

import React from "react"
import { Search, Settings2 } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { Input } from "@/styles/default/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/styles/default/ui/select"

interface CourseTableToolbarProps {
	searchQuery: string
	onSearchChange: (query: string) => void
	selectedCategory: string
	onCategoryChange: (category: string) => void
	onOpenSettings?: () => void
}

export function CourseTableToolbar({
	searchQuery,
	onSearchChange,
	selectedCategory,
	onCategoryChange,
	onOpenSettings,
}: CourseTableToolbarProps) {
	return (
		<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			{/* Left: Category select + Search */}
			<div className="flex flex-1 flex-col gap-2.5 sm:flex-row sm:items-center">
				<div className="w-full sm:w-[170px]">
					<Select value={selectedCategory} onValueChange={onCategoryChange}>
						<SelectTrigger
							size="32"
							className="border-border/70 bg-elevation-level1/20 text-xs">
							<SelectValue placeholder="All categories" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All categories</SelectItem>
							<SelectItem value="Development">Development</SelectItem>
							<SelectItem value="Fundamental">Fundamental</SelectItem>
							<SelectItem value="Design">Design</SelectItem>
							<SelectItem value="UI/UX">UI/UX</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="relative w-full sm:w-[240px]">
					<Search className="text-fg-tertiary absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
					<Input
						type="text"
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						placeholder="Search courses"
						className="border-border/70 bg-elevation-level1/20 h-8 pl-8 text-xs"
					/>
				</div>
			</div>

			{/* Right: Settings button */}
			<div className="flex items-center">
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="32"
					onClick={onOpenSettings}
					className="border-border/70 bg-elevation-level1/20 gap-2 text-xs font-medium">
					<Settings2 className="size-3.5" />
					<span>Settings</span>
				</Button>
			</div>
		</div>
	)
}
