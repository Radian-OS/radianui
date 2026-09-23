"use client"

import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/styles/default/ui/pagination"

interface ProjectsTablePaginationProps {
	currentPage: number
	totalPages: number
	totalResults: number
	onPageChange: (page: number) => void
}

export function ProjectsTablePagination({
	currentPage,
	totalPages,
	totalResults,
	onPageChange,
}: ProjectsTablePaginationProps) {
	return (
		<div className="flex items-center justify-between pt-3">
			{/* Left: Total Results Count */}
			<span className="text-fg-secondary text-xs">{totalResults} results</span>

			{/* Right: Prev, Active Page, "of N", Next */}
			<Pagination className="mx-0 w-auto">
				<PaginationContent className="items-center gap-1.5">
					<PaginationItem>
						<Button
							type="button"
							variant="ghost"
							color="neutral"
							size="28"
							disabled={currentPage <= 1}
							onClick={() => onPageChange(currentPage - 1)}
							className="text-fg-secondary hover:text-foreground size-7 p-0 disabled:opacity-30">
							<ChevronLeft className="size-3.5" />
						</Button>
					</PaginationItem>

					<PaginationItem>
						<span className="border-border/80 bg-elevation-level1/60 text-foreground flex size-7 items-center justify-center rounded-md border font-mono text-xs font-semibold">
							{currentPage}
						</span>
					</PaginationItem>

					<PaginationItem>
						<span className="text-fg-secondary px-1 font-mono text-xs">
							of {totalPages}
						</span>
					</PaginationItem>

					<PaginationItem>
						<Button
							type="button"
							variant="ghost"
							color="neutral"
							size="28"
							disabled={currentPage >= totalPages}
							onClick={() => onPageChange(currentPage + 1)}
							className="text-fg-secondary hover:text-foreground size-7 p-0 disabled:opacity-30">
							<ChevronRight className="size-3.5" />
						</Button>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}
