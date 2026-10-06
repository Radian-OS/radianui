"use client"

import React, { useState } from "react"
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react"
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
} from "@/styles/default/ui/pagination"
import { Button } from "@/styles/default/ui/button"

export function OrdersPagination() {
	const [currentPage, setCurrentPage] = useState(2)

	return (
		<div className="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
			{/* Left text */}
			<div className="text-fg-secondary text-xs">
				Page <span className="text-fg font-medium">{currentPage}</span> of{" "}
				<span className="text-fg font-medium">16</span>
			</div>

			{/* Center Pagination Controls */}
			<Pagination className="mx-0 w-auto">
				<PaginationContent className="gap-1">
					{/* First page */}
					<PaginationItem>
						<Button
							variant="ghost"
							color="neutral"
							size="32"
							className="text-fg-secondary hover:text-fg size-8 p-0"
							onClick={() => setCurrentPage(1)}
							disabled={currentPage === 1}>
							<ChevronsLeft className="size-4" />
						</Button>
					</PaginationItem>

					{/* Previous page */}
					<PaginationItem>
						<Button
							variant="ghost"
							color="neutral"
							size="32"
							className="text-fg-secondary hover:text-fg size-8 p-0"
							onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
							disabled={currentPage === 1}>
							<ChevronLeft className="size-4" />
						</Button>
					</PaginationItem>

					{/* Numbers */}
					{[1, 2, 3, 4, 5].map((pageNum) => {
						const isActive = pageNum === currentPage
						return (
							<PaginationItem key={pageNum}>
								<Button
									variant={isActive ? "strong" : "ghost"}
									color="neutral"
									size="32"
									onClick={() => setCurrentPage(pageNum)}
									className={`size-8 p-0 text-xs font-medium ${
										isActive
											? "bg-fg text-fg-inverse"
											: "text-fg-secondary hover:text-fg"
									}`}>
									{pageNum}
								</Button>
							</PaginationItem>
						)
					})}

					{/* Ellipsis */}
					<PaginationItem>
						<PaginationEllipsis className="text-fg-secondary size-8" />
					</PaginationItem>

					{/* Last page */}
					<PaginationItem>
						<Button
							variant="ghost"
							color="neutral"
							size="32"
							onClick={() => setCurrentPage(16)}
							className="text-fg-secondary hover:text-fg size-8 p-0 text-xs font-medium">
							16
						</Button>
					</PaginationItem>

					{/* Next page */}
					<PaginationItem>
						<Button
							variant="ghost"
							color="neutral"
							size="32"
							className="text-fg-secondary hover:text-fg size-8 p-0"
							onClick={() => setCurrentPage((p) => Math.min(16, p + 1))}
							disabled={currentPage === 16}>
							<ChevronRight className="size-4" />
						</Button>
					</PaginationItem>

					{/* Last page jump */}
					<PaginationItem>
						<Button
							variant="ghost"
							color="neutral"
							size="32"
							className="text-fg-secondary hover:text-fg size-8 p-0"
							onClick={() => setCurrentPage(16)}
							disabled={currentPage === 16}>
							<ChevronsRight className="size-4" />
						</Button>
					</PaginationItem>
				</PaginationContent>
			</Pagination>

			{/* Right Page Size Selector */}
			<div className="flex items-center">
				<Button
					variant="outline"
					color="neutral"
					size="32"
					className="gap-2 text-xs font-normal">
					<span>7 / page</span>
					<ChevronDown className="text-fg-secondary size-3.5" />
				</Button>
			</div>
		</div>
	)
}
