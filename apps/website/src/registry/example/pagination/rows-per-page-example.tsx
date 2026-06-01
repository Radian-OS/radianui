"use client"

import { useId, useState } from "react"
import {
	ChevronFirstIcon,
	ChevronLastIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { IconButton } from "@/registry/ui/button"
import { Label } from "@/registry/ui/label"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/registry/ui/pagination"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/ui/table"

// Mock Data
type UserData = {
	name: string
	email: string
	role: string
	status: string
}

const data: UserData[] = [
	{
		name: "Alice Johnson",
		email: "alice@example.com",
		role: "Admin",
		status: "Active",
	},
	{
		name: "Bob Smith",
		email: "bob@example.com",
		role: "User",
		status: "Active",
	},
	{
		name: "Charlie Brown",
		email: "charlie@example.com",
		role: "Editor",
		status: "Inactive",
	},
	{
		name: "Diana Prince",
		email: "diana@example.com",
		role: "User",
		status: "Active",
	},
	{
		name: "Ethan Hunt",
		email: "ethan@example.com",
		role: "Admin",
		status: "Active",
	},
	{
		name: "Fiona Green",
		email: "fiona@example.com",
		role: "User",
		status: "Inactive",
	},
	{
		name: "George Wilson",
		email: "george@example.com",
		role: "Editor",
		status: "Active",
	},
	{
		name: "Hannah Lee",
		email: "hannah@example.com",
		role: "User",
		status: "Inactive",
	},
	{
		name: "Ian Malcolm",
		email: "ian@example.com",
		role: "Admin",
		status: "Active",
	},
	{
		name: "Julia Roberts",
		email: "julia@example.com",
		role: "User",
		status: "Active",
	},
	{
		name: "Kevin Hart",
		email: "kevin@example.com",
		role: "Editor",
		status: "Active",
	},
	{
		name: "Laura Palmer",
		email: "laura@example.com",
		role: "User",
		status: "Inactive",
	},
	{
		name: "Michael Scott",
		email: "michael@example.com",
		role: "Admin",
		status: "Active",
	},
	{
		name: "Nina Simone",
		email: "nina@example.com",
		role: "User",
		status: "Active",
	},
	{
		name: "Oliver Twist",
		email: "oliver@example.com",
		role: "Editor",
		status: "Inactive",
	},
	{
		name: "Patricia Moore",
		email: "patricia@example.com",
		role: "User",
		status: "Active",
	},
	{
		name: "Quinn Harper",
		email: "quinn@example.com",
		role: "User",
		status: "Inactive",
	},
	{
		name: "Rachel Green",
		email: "rachel@example.com",
		role: "Editor",
		status: "Active",
	},
	{
		name: "Samuel Jackson",
		email: "samuel@example.com",
		role: "Admin",
		status: "Active",
	},
	{
		name: "Tina Turner",
		email: "tina@example.com",
		role: "User",
		status: "Active",
	},
]

export default function Component() {
	const id = useId()
	const [rowsPerPage, setRowsPerPage] = useState(5)
	const [currentPage, setCurrentPage] = useState(0)

	const totalPages = Math.ceil(data.length / rowsPerPage)
	const startIndex = currentPage * rowsPerPage
	const endIndex = startIndex + rowsPerPage
	const displayedData = data.slice(startIndex, endIndex)

	const canPreviousPage = currentPage > 0
	const canNextPage = currentPage < totalPages - 1

	return (
		<div className="flex w-full flex-col gap-4 overflow-auto">
			<div className="bg-bg no-scrollbar overflow-y-scroll rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{displayedData.length > 0 ? (
							displayedData.map((user, index) => (
								<TableRow key={index}>
									<TableCell>{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.role}</TableCell>
									<TableCell>
										<Badge
											variant="soft"
											color={user.status === "Active" ? "success" : "error"}>
											{user.status}
										</Badge>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={4} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Rows per page and pagination */}
			<div className="flex items-center justify-between gap-8">
				<div className="flex items-center gap-3">
					<Label htmlFor={id} className="text-fg-secondary max-sm:sr-only">
						Rows per page
					</Label>
					<Select
						value={rowsPerPage.toString()}
						onValueChange={(value) => {
							setRowsPerPage(Number(value))
							setCurrentPage(0) // Reset to first page when changing rows per page
						}}>
						<SelectTrigger
							size="32"
							id={id}
							className="w-fit whitespace-nowrap">
							<SelectValue placeholder="Select number of results" />
						</SelectTrigger>
						<SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
							{[5, 10, 15, 20].map((pageSize) => (
								<SelectItem key={pageSize} value={pageSize.toString()}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Page number information */}
				<div className="text-fg-secondary flex grow justify-end whitespace-nowrap text-sm">
					<p
						className="text-fg-secondary whitespace-nowrap text-sm"
						aria-live="polite">
						<span className="text-shadow-fg-disabled">
							{startIndex + 1}-{Math.min(endIndex, data.length)}
						</span>{" "}
						of <span className="text-fg-secondary">{data.length}</span>
					</p>
				</div>

				{/* Pagination buttons */}
				<div className="pb-1">
					<Pagination>
						<PaginationContent>
							{/* First page button */}
							<PaginationItem>
								<IconButton
									size="32"
									color="neutral"
									variant="outline"
									className="disabled:pointer-events-none disabled:opacity-50"
									onClick={() => setCurrentPage(0)}
									disabled={!canPreviousPage}
									aria-label="Go to first page">
									<ChevronFirstIcon size={16} aria-hidden="true" />
								</IconButton>
							</PaginationItem>
							{/* Previous page button */}
							<PaginationItem>
								<IconButton
									size="32"
									color="neutral"
									variant="outline"
									className="disabled:pointer-events-none disabled:opacity-50"
									onClick={() => setCurrentPage(currentPage - 1)}
									disabled={!canPreviousPage}
									aria-label="Go to previous page">
									<ChevronLeftIcon size={16} aria-hidden="true" />
								</IconButton>
							</PaginationItem>
							{/* Next page button */}
							<PaginationItem>
								<IconButton
									size="32"
									variant="outline"
									color="neutral"
									className="disabled:pointer-events-none disabled:opacity-50"
									onClick={() => setCurrentPage(currentPage + 1)}
									disabled={!canNextPage}
									aria-label="Go to next page">
									<ChevronRightIcon size={16} aria-hidden="true" />
								</IconButton>
							</PaginationItem>
							{/* Last page button */}
							<PaginationItem>
								<IconButton
									size="32"
									variant="outline"
									color="neutral"
									className="disabled:pointer-events-none disabled:opacity-50"
									onClick={() => setCurrentPage(totalPages - 1)}
									disabled={!canNextPage}
									aria-label="Go to last page">
									<ChevronLastIcon size={16} aria-hidden="true" />
								</IconButton>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div>
	)
}
