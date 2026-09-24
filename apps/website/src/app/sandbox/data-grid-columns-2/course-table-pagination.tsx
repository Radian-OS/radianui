"use client"

import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/styles/default/ui/pagination"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/styles/default/ui/select"
import { cn } from "@/lib/utils"

interface CourseTablePaginationProps {
	currentPage: number
	pageSize: number
	totalCount: number
	onPageChange: (page: number) => void
	onPageSizeChange: (size: number) => void
}

export function CourseTablePagination({
	currentPage,
	pageSize,
	totalCount,
	onPageChange,
	onPageSizeChange,
}: CourseTablePaginationProps) {
	const totalPages = Math.ceil(totalCount / pageSize) || 1
	const startItem = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1
	const endItem = Math.min(currentPage * pageSize, totalCount)

	return (
		<div className="flex flex-col gap-4 pt-3 sm:flex-row sm:items-center sm:justify-between">
			{/* Left: Rows per page selector */}
			<div className="flex items-center gap-2">
				<span className="text-fg-secondary text-xs">Rows per page</span>
				<div className="w-[68px]">
					<Select
						value={String(pageSize)}
						onValueChange={(val) => onPageSizeChange(Number(val))}>
						<SelectTrigger
							size="28"
							className="border-border/70 bg-elevation-level1/20 text-xs">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="8">8</SelectItem>
							<SelectItem value="12">12</SelectItem>
							<SelectItem value="24">24</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Right: Counter and Page buttons */}
			<div className="flex items-center gap-3">
				<span className="text-fg-secondary font-mono text-xs">
					{startItem} - {endItem} of {totalCount}
				</span>

				<Pagination className="mx-0 w-auto">
					<PaginationContent className="gap-1">
						{/* Previous Button */}
						<PaginationItem>
							<Button
								type="button"
								variant="ghost"
								color="neutral"
								size="28"
								disabled={currentPage <= 1}
								onClick={() => onPageChange(currentPage - 1)}
								className="text-fg-secondary hover:text-fg size-7 p-0 disabled:opacity-30">
								<ChevronLeft className="size-3.5" />
							</Button>
						</PaginationItem>

						{/* Page Numbers */}
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
							const isActive = page === currentPage
							return (
								<PaginationItem key={page}>
									<Button
										type="button"
										variant={isActive ? "strong" : "ghost"}
										color="neutral"
										size="28"
										onClick={() => onPageChange(page)}
										className={cn(
											"size-7 p-0 font-mono text-xs",
											isActive
												? "bg-elevation-level1 text-fg border-border/80 border font-bold"
												: "text-fg-secondary hover:text-fg"
										)}>
										{page}
									</Button>
								</PaginationItem>
							)
						})}

						{/* Next Button */}
						<PaginationItem>
							<Button
								type="button"
								variant="ghost"
								color="neutral"
								size="28"
								disabled={currentPage >= totalPages}
								onClick={() => onPageChange(currentPage + 1)}
								className="text-fg-secondary hover:text-fg size-7 p-0 disabled:opacity-30">
								<ChevronRight className="size-3.5" />
							</Button>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	)
}
