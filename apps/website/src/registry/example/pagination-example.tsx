"use client"

import { useState } from "react"
import Pagination from "@/registry/ui/pagination"
import { Select, SelectItem } from "@/registry/ui/select"

const PaginationExample = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [goTo, setGoTo] = useState<string[]>([])
	const [buttonVariant, setButtonVariant] = useState<string[]>([])
	const [customRow, setCustomRow] = useState<string[]>(["true"])
	const [rowPerPage, setRowsPerPage] = useState<string[]>(["true"])
	const [control, setControl] = useState<string[]>(["icon"])

	const totalPages = 100

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}
	// console.log(currentPage)

	return (
		<div className="flex flex-col gap-10 py-10">
			<div className="flex flex-wrap gap-4">
				<Select label="Control" placeholder="Control" selectedValues={control} onSelectedChange={setControl} className="w-max">
					<SelectItem value="icon">Icon</SelectItem>
					<SelectItem value="text">Text</SelectItem>
					<SelectItem value="both">Icon & Text</SelectItem>
				</Select>

				<Select label="Enable GoTo" placeholder="Goto page" className="w-max" selectedValues={goTo} onSelectedChange={setGoTo}>
					<SelectItem value="true">True</SelectItem>
					<SelectItem value="false">False</SelectItem>
				</Select>

				<Select label="Button Variant" placeholder="Button Variant" selectedValues={buttonVariant} onSelectedChange={setButtonVariant} className="w-max">
					<SelectItem value="strong">strong</SelectItem>
					<SelectItem value="outline">outline</SelectItem>
				</Select>

				<Select label="Total Page" placeholder="Total Page" selectedValues={customRow} onSelectedChange={setCustomRow} className="w-max">
					<SelectItem value="true">True</SelectItem>
					<SelectItem value="false">False</SelectItem>
				</Select>

				<Select label="Enable Row per page" placeholder="Enable Row per page" selectedValues={rowPerPage} onSelectedChange={setRowsPerPage} className="w-max">
					<SelectItem value="true">True</SelectItem>
					<SelectItem value="false">False</SelectItem>
				</Select>
			</div>
			<Pagination
				currentPage={currentPage}
				totalPage={totalPages}
				onPageChange={handlePageChange}
				rowPerPage={rowPerPage[0] === "true"}
				enableCustomRows={customRow[0] === "true"}
				goToPage={goTo[0] === "true"}
				customRows={15}
				buttonVariant={`${buttonVariant}`}
				control={`${control}`}
			/>
		</div>
	)
}

export default PaginationExample
