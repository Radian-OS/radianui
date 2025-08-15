"use client"

import React, { useEffect, useState } from "react"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import { Button } from "./button"
import { Select, SelectItem } from "./select"

type PaginationProps = {
	currentPage: number
	totalPage: number // Total number of items
	onPageChange: (page: number) => void
	enableArrowText?: boolean
	goToPage?: boolean
	rowPerPage?: boolean
	customRows?: number
	enableCustomRows?: boolean
	onRowsPerPageChange?: (rowsPerPage: number) => void // Callback for rows per page change
	enableTextOnly?: boolean
	enableIconOnly?: boolean
	navButton?: string
}

const Pagination: React.FC<PaginationProps> = function ({
	currentPage,
	onRowsPerPageChange,
	totalPage,
	goToPage = false,
	rowPerPage = true,
	customRows = 5,
	enableCustomRows = false,
	onPageChange,
	navButton = "icon",
}) {
	const [rowsPerPage, setRowsPerPage] = useState(customRows || 10) // Default rows per page
	const [totalPages, setTotalPages] = useState(Math.ceil(totalPage / rowsPerPage))

	// Update total pages whenever rowsPerPage or totalPage changes
	useEffect(() => {
		setTotalPages(Math.ceil(totalPage / rowsPerPage))
	}, [rowsPerPage, totalPage])

	// Handles page change ensuring it stays within valid range
	const handlePageChange = function (page: number) {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page)
		}
	}

	// Handles change in rows per page
	const handleRowsPerPageChange = function (values: string[]) {
		const newRowsPerPage = parseInt(values[0], 10)
		setRowsPerPage(newRowsPerPage)
		// Reset to the first page when rows per page changes
		onPageChange(1)

		// Invoke the callback with the new rows per page value
		if (onRowsPerPageChange) {
			onRowsPerPageChange(newRowsPerPage)
		}
	}
	// Handles selection change from dropdown for direct page selection
	const handleSelectChange = function (values: string[]) {
		const selectedPage = parseInt(values[0], 10)
		handlePageChange(selectedPage)
	}

	const maxPagesToShow = 2

	let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
	const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)
	// State to track hidden pages when using ellipsis dropdown
	const [hiddenPages, setHiddenPages] = useState<number[]>([])

	const hiddenPagesBefore = startPage > 2 ? Array.from({ length: startPage - 2 }, (_, i) => i + 2) : []
	const hiddenPagesAfter = endPage < totalPages - 1 ? Array.from({ length: totalPages - endPage - 1 }, (_, i) => endPage + i + 1) : []
	// Renders the page number buttons with logic for handling ellipsis
	const renderPageNumbers = function () {
		const pages = []

		if (endPage - startPage + 1 < maxPagesToShow) {
			startPage = Math.max(1, endPage - maxPagesToShow + 1)
		}

		if (startPage > 1) {
			pages.push(
				<Button
					color="neutral"
					key={1}
					variant="outline"
					onClick={function () {
						handlePageChange(1)
					}}
					size="32"
					className="h-8 w-8">
					1
				</Button>
			)
			if (startPage > 2) {
				pages.push(
					<div
						key="ellipsis-start"
						onClick={function () {
							setHiddenPages(hiddenPagesBefore)
						}}>
						<Select
							placeholder="..."
							size="32"
							endIcon={false}
							selectedValues={[]}
							onSelectedChange={handleSelectChange}
							className="border-alpha focus-visible:border-primary -ms-0 w-fit border text-center focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
							{hiddenPages.map((page) => (
								<SelectItem className="w-20" key={page} value={page.toString()}>
									{page}
								</SelectItem>
							))}
						</Select>
					</div>
				)
			}
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(
				<Button
					variant={currentPage === i ? "outline" : "outline"}
					color={currentPage === i ? "primary" : "neutral"}
					key={i}
					onClick={function () {
						handlePageChange(i)
					}}
					iconOnly
					size="32"
					className={`w-8 font-semibold`}>
					{i}
				</Button>
			)
		}

		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				pages.push(
					<div
						key="ellipsis-end"
						onClick={function () {
							setHiddenPages(hiddenPagesAfter)
						}}>
						<Select
							placeholder="..."
							selectedValues={[]}
							size="32"
							endIcon={false}
							onSelectedChange={handleSelectChange}
							className="border-alpha focus-visible:border-primary -ms-0 w-fit border text-center focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
							{hiddenPages.map((page) => (
								<SelectItem className="w-20" key={page} value={page.toString()}>
									{page}
								</SelectItem>
							))}
						</Select>
					</div>
				)
			}
			pages.push(
				<Button
					variant="outline"
					color="neutral"
					key={totalPages}
					size="32"
					onClick={function () {
						handlePageChange(totalPages)
					}}
					className="text-fgh-8 w-8">
					{totalPages}
				</Button>
			)
		}

		return pages
	}

	const indexOfLastRow = currentPage * rowsPerPage
	const indexOfFirstRow = indexOfLastRow - rowsPerPage

	const navButtons = [
		{ type: "first", icon: <ChevronsLeft />, text: "First" },
		{ type: "previous", icon: <ChevronLeft />, text: "Previous" },
		{ type: "next", icon: <ChevronRight />, text: "Next" },
		{ type: "last", icon: <ChevronsRight />, text: "Last" },
	]

	return (
		<div className="relative flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-0">
			<div className="flex flex-col items-center gap-3 sm:flex-row">
				<div className="flex items-center gap-1.5">
					{navButtons.slice(0, 2).map(function ({ type, icon, text }) {
						return (
							<React.Fragment key={type}>
								{(navButton === "icon" || navButton === "both") && (
									<Button
										variant="outline"
										color="neutral"
										onClick={() => (type === "first" ? handlePageChange(1) : handlePageChange(currentPage - 1))}
										disabled={currentPage === 1}
										iconOnly={navButton === "icon"}
										size="32"
										className="flex gap-1.5">
										{icon}
										{navButton === "both" && <span>{text}</span>}
									</Button>
								)}
								{navButton === "text" && (
									<Button
										variant="outline"
										color="neutral"
										onClick={() => (type === "first" ? handlePageChange(1) : handlePageChange(currentPage - 1))}
										disabled={currentPage === 1}
										size="32"
										className="flex gap-1.5">
										{text}
									</Button>
								)}
							</React.Fragment>
						)
					})}

					{/* Pagination Numbers in the Middle */}
					{renderPageNumbers()}

					{navButtons.slice(2).map(function ({ type, icon, text }) {
						return (
							<React.Fragment key={type}>
								{(navButton === "icon" || navButton === "both") && (
									<Button
										variant="outline"
										color="neutral"
										onClick={() => (type === "last" ? handlePageChange(totalPages) : handlePageChange(currentPage + 1))}
										disabled={currentPage === totalPages} // Adjust logic for last page
										iconOnly={navButton === "icon"}
										size="32"
										className="flex gap-1.5">
										{navButton === "both" && <span>{text}</span>}
										{icon}
									</Button>
								)}
								{navButton === "text" && (
									<Button
										variant="outline"
										color="neutral"
										onClick={() => (type === "last" ? handlePageChange(totalPages) : handlePageChange(currentPage + 1))}
										disabled={currentPage === totalPages} // Adjust logic for last page
										size="32"
										className="flex gap-1.5">
										{text}
									</Button>
								)}
							</React.Fragment>
						)
					})}
				</div>

				{enableCustomRows && (
					<span>
						Showing {indexOfFirstRow + 1}-{indexOfLastRow > totalPage ? totalPage : indexOfLastRow} of {totalPage} results
					</span>
				)}
			</div>
			<div className="flex gap-6">
				{rowPerPage && (
					<div className="flex items-center justify-center gap-6">
						<span className="text-sm">Row per page</span>
						<div>
							<Select selectedValues={[rowsPerPage.toString()]} onSelectedChange={handleRowsPerPageChange} className="h-8 w-max">
								{Array.from({ length: Math.ceil(totalPage / 5) }, (_, i) => {
									const value = (i + 1) * 5
									return (
										<SelectItem key={value} value={value.toString()}>
											{value}
										</SelectItem>
									)
								})}
							</Select>
						</div>
					</div>
				)}
				{goToPage && (
					<div className="flex items-center justify-center gap-6">
						<span className="text-sm">Go to</span>
						<div>
							<Select selectedValues={[currentPage.toString()]} onSelectedChange={(values) => handlePageChange(parseInt(values[0], 10))} className="h-8 w-max">
								{[...Array(totalPages)].map((_, index) => {
									const value = index + 1 // Calculate the value dynamically

									return (
										<SelectItem key={value} value={value.toString()}>
											{value}
										</SelectItem>
									)
								})}
							</Select>
						</div>
						<span className="text-sm">page</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default Pagination
