import { useState } from "react"
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react"
import { TableRow } from "@/components/props-table"
import { Badge } from "@/registry/ui/badge"
import { IconButton } from "@/registry/ui/button"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/registry/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/registry/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader } from "@/registry/ui/table"

const sampleData = [
	{ id: 1, name: "Sarah Johnson", email: "sarah.j@example.com", role: "Fullstack Dev", status: "Active" },
	{ id: 2, name: "Michael Chen", email: "michael.c@example.com", role: "Backend Dev", status: "Active" },
	{ id: 3, name: "Emma Williams", email: "emma.w@example.com", role: "Frontend Dev", status: "Active" },
	{ id: 4, name: "James Anderson", email: "james.a@example.com", role: "DevOps", status: "Inactive" },
	{ id: 5, name: "Olivia Martinez", email: "olivia.m@example.com", role: "Designer", status: "Active" },
	{ id: 6, name: "David Thompson", email: "david.t@example.com", role: "Product Manager", status: "Active" },
	{ id: 7, name: "Sophia Garcia", email: "sophia.g@example.com", role: "QA Engineer", status: "Active" },
	{ id: 8, name: "Robert Miller", email: "robert.m@example.com", role: "Data Analyst", status: "Inactive" },
	{ id: 9, name: "Isabella Davis", email: "isabella.d@example.com", role: "Marketing", status: "Active" },
	{ id: 10, name: "William Brown", email: "william.b@example.com", role: "Sales", status: "Active" },
	{ id: 11, name: "Ava Wilson", email: "ava.w@example.com", role: "HR", status: "Active" },
	{ id: 12, name: "Christopher Lee", email: "chris.l@example.com", role: "Finance", status: "Inactive" },
	{ id: 13, name: "Mia Robinson", email: "mia.r@example.com", role: "Content Writer", status: "Active" },
	{ id: 14, name: "Daniel Taylor", email: "daniel.t@example.com", role: "SEO Specialist", status: "Active" },
	{ id: 15, name: "Charlotte Moore", email: "charlotte.m@example.com", role: "Support", status: "Active" },
]

export default function PaginationTable() {
	const [currentPage, setCurrentPage] = useState(1)
	const [rowsPerPage, setRowsPerPage] = useState(5)

	// Calculate pagination values
	const totalPages = Math.ceil(sampleData.length / rowsPerPage)
	const startIndex = (currentPage - 1) * rowsPerPage
	const endIndex = startIndex + rowsPerPage
	const currentData = sampleData.slice(startIndex, endIndex)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	const goToFirstPage = () => setCurrentPage(1)
	const goToLastPage = () => setCurrentPage(totalPages)
	const handlePrevious = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1)
	}
	const handleNext = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1)
	}

	// Generate page numbers with ellipsis
	const getPageNumbers = () => {
		const pages = []
		const maxVisible = 5

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i)
			}
		} else {
			if (currentPage <= 3) {
				pages.push(1, 2, 3, 4, "...", totalPages)
			} else if (currentPage >= totalPages - 2) {
				pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
			} else {
				pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
			}
		}

		return pages
	}

	return (
		<div className="mx-auto w-full max-w-6xl space-y-4 p-6">
			<div className="rounded-lg border shadow-sm">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{currentData.map((row) => (
							<TableRow key={row.id}>
								<TableCell className="font-medium">{row.id}</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell>{row.email}</TableCell>
								<TableCell>{row.role}</TableCell>
								<TableCell>
									{
										<Badge variant="soft" color={row.status === "Active" ? "success" : "neutral"}>
											{row.status}
										</Badge>
									}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* Pagination Controls */}
			<div className="flex items-center justify-between px-2">
				<div className="flex items-center gap-2 text-sm">
					<Select
						value={rowsPerPage.toString()}
						onValueChange={(value) => {
							setRowsPerPage(Number(value))
							setCurrentPage(1)
						}}>
						<SelectTrigger>Rows Per Page: {rowsPerPage}</SelectTrigger>
						<SelectContent>
							<SelectItem value="5">5</SelectItem>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="15">15</SelectItem>
							<SelectItem value="20">20</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="flex items-center gap-6">
					<span className="text-sm">
						{startIndex + 1}-{Math.min(endIndex, sampleData.length)} of {sampleData.length}
					</span>

					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<IconButton color="neutral" variant="ghost" onClick={goToFirstPage} disabled={currentPage === 1}>
									<ChevronFirst className="rtl:rotate-180" />
								</IconButton>
							</PaginationItem>

							<PaginationItem>
								<IconButton color="neutral" variant="ghost" onClick={handlePrevious} disabled={currentPage === 1}>
									<ChevronLeft className="rtl:rotate-180" />
								</IconButton>
							</PaginationItem>

							{getPageNumbers().map((page, index) => (
								<PaginationItem key={index}>
									{page === "..." ? (
										<PaginationEllipsis />
									) : (
										<IconButton color="neutral" variant={currentPage === page ? "outline" : "ghost"} onClick={() => handlePageChange(Number(page))}>
											{page}
										</IconButton>
									)}
								</PaginationItem>
							))}

							<PaginationItem>
								<IconButton color="neutral" variant="ghost" onClick={handleNext} disabled={currentPage === totalPages}>
									<ChevronRight className="rtl:rotate-180" />
								</IconButton>
							</PaginationItem>

							<PaginationItem>
								<IconButton color="neutral" variant="ghost" onClick={goToLastPage} disabled={currentPage === totalPages}>
									<ChevronLast className="rtl:rotate-180" />
								</IconButton>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div>
	)
}
