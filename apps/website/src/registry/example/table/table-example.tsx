"use client"

import { useId, useState } from "react"
import { ColumnDef, PaginationState, SortingState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { ChevronDownIcon, ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { IconButton } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Label } from "@/registry/ui/label"
import { Pagination, PaginationContent, PaginationItem } from "@/registry/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"

type UserData = {
	email: string
	name: string
	imageSrc: string
	income: string
	progress: number
	status: "Active" | "Inactive" | "Pending"
	lastActiveTime: string
	teamMembers: number
	contact: "email" | "phone" | "both"
}

const data: UserData[] = [
	{
		name: "Alice Johnson",
		imageSrc: "https://randomuser.me/api/portraits/women/44.jpg",
		email: "alice.johnson@example.com",
		status: "Active",
		income: "$85,000",
		lastActiveTime: "2025-09-18T12:30:00Z",
		progress: 72,
		teamMembers: 5,
		contact: "both",
	},
	{
		name: "David Smith",
		imageSrc: "https://randomuser.me/api/portraits/men/32.jpg",
		email: "david.smith@example.com",
		status: "Inactive",
		income: "$64,500",
		lastActiveTime: "2025-09-17T09:45:00Z",
		progress: 40,
		teamMembers: 2,
		contact: "email",
	},
	{
		name: "Sophia Lee",
		imageSrc: "https://randomuser.me/api/portraits/women/12.jpg",
		email: "sophia.lee@example.com",
		status: "Pending",
		income: "$120,000",
		lastActiveTime: "2025-09-15T18:20:00Z",
		progress: 55,
		teamMembers: 8,
		contact: "phone",
	},
	{
		name: "Michael Brown",
		imageSrc: "https://randomuser.me/api/portraits/men/56.jpg",
		email: "michael.brown@example.com",
		status: "Active",
		income: "$92,300",
		lastActiveTime: "2025-09-19T06:10:00Z",
		progress: 88,
		teamMembers: 3,
		contact: "both",
	},
	{
		name: "Emily Carter",
		imageSrc: "https://randomuser.me/api/portraits/women/65.jpg",
		email: "emily.carter@example.com",
		status: "Active",
		income: "$76,800",
		lastActiveTime: "2025-09-18T16:40:00Z",
		progress: 67,
		teamMembers: 6,
		contact: "email",
	},
	{
		name: "James Wilson",
		imageSrc: "https://randomuser.me/api/portraits/men/28.jpg",
		email: "james.wilson@example.com",
		status: "Inactive",
		income: "$58,200",
		lastActiveTime: "2025-09-10T14:00:00Z",
		progress: 33,
		teamMembers: 4,
		contact: "phone",
	},
	{
		name: "Olivia Martinez",
		imageSrc: "https://randomuser.me/api/portraits/women/19.jpg",
		email: "olivia.martinez@example.com",
		status: "Pending",
		income: "$101,500",
		lastActiveTime: "2025-09-13T09:25:00Z",
		progress: 49,
		teamMembers: 7,
		contact: "both",
	},
	{
		name: "Daniel White",
		imageSrc: "https://randomuser.me/api/portraits/men/14.jpg",
		email: "daniel.white@example.com",
		status: "Active",
		income: "$89,700",
		lastActiveTime: "2025-09-19T02:50:00Z",
		progress: 82,
		teamMembers: 5,
		contact: "email",
	},
	{
		name: "Grace Hall",
		imageSrc: "https://randomuser.me/api/portraits/women/29.jpg",
		email: "grace.hall@example.com",
		status: "Active",
		income: "$73,400",
		lastActiveTime: "2025-09-17T20:15:00Z",
		progress: 61,
		teamMembers: 3,
		contact: "both",
	},
	{
		name: "Benjamin King",
		imageSrc: "https://randomuser.me/api/portraits/men/71.jpg",
		email: "benjamin.king@example.com",
		status: "Inactive",
		income: "$95,200",
		lastActiveTime: "2025-09-11T07:45:00Z",
		progress: 46,
		teamMembers: 2,
		contact: "phone",
	},
	{
		name: "Chloe Scott",
		imageSrc: "https://randomuser.me/api/portraits/women/34.jpg",
		email: "chloe.scott@example.com",
		status: "Pending",
		income: "$112,000",
		lastActiveTime: "2025-09-14T11:10:00Z",
		progress: 58,
		teamMembers: 6,
		contact: "both",
	},
	{
		name: "Ethan Harris",
		imageSrc: "https://randomuser.me/api/portraits/men/41.jpg",
		email: "ethan.harris@example.com",
		status: "Active",
		income: "$87,900",
		lastActiveTime: "2025-09-19T05:20:00Z",
		progress: 77,
		teamMembers: 4,
		contact: "email",
	},
	{
		name: "Mia Walker",
		imageSrc: "https://randomuser.me/api/portraits/women/54.jpg",
		email: "mia.walker@example.com",
		status: "Inactive",
		income: "$69,800",
		lastActiveTime: "2025-09-12T15:55:00Z",
		progress: 36,
		teamMembers: 2,
		contact: "phone",
	},
	{
		name: "Lucas Young",
		imageSrc: "https://randomuser.me/api/portraits/men/63.jpg",
		email: "lucas.young@example.com",
		status: "Active",
		income: "$98,400",
		lastActiveTime: "2025-09-18T21:35:00Z",
		progress: 91,
		teamMembers: 8,
		contact: "both",
	},
]

const columns: ColumnDef<UserData>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
		size: 28,
		enableSorting: false,
	},
	{
		header: "Name",
		accessorKey: "name",
		cell: ({ row }) => (
			<div className="flex flex-col font-medium">
				<p>{row.getValue("name")}</p>
				<p>{row.getValue("name")}</p>
			</div>
		),
		size: 180,
	},
	{
		header: "Email",
		accessorKey: "email",
		size: 200,
	},
	{
		header: "Image",
		accessorKey: "imageSrc",
		cell: ({ row }) => (
			<div>
				<img src={row.getValue("imageSrc")} alt={row.getValue("name")} className="h-10 w-10 rounded-full" />
			</div>
		),
		size: 180,
	},
	{
		header: "Status",
		accessorKey: "status",
		cell: ({ row }) => <Badge className={cn(row.getValue("status") === "Inactive" && "bg-muted-foreground/60 text-primary-foreground")}>{row.getValue("status")}</Badge>,
		size: 120,
	},
	{
		header: "Income",
		accessorKey: "income",
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("income"))
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount)
			return formatted
		},
		size: 120,
	},
]

export default function Component() {
	const id = useId()
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 5,
	})

	const [sorting, setSorting] = useState<SortingState>([
		{
			id: "name",
			desc: false,
		},
	])

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		enableSortingRemoval: false,
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		state: {
			sorting,
			pagination,
		},
	})

	return (
		<div className="flex h-[330px] w-full flex-col gap-4 overflow-auto">
			<div className="bg-background no-scrollbar overflow-y-scroll rounded-md border">
				<Table className="table-fixed">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="hover:bg-transparent">
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} style={{ width: `${header.getSize()}px` }} className="h-11">
											{header.isPlaceholder ? null : header.column.getCanSort() ? (
												<div
													className={cn(header.column.getCanSort() && "flex h-full cursor-pointer select-none items-center justify-between gap-2")}
													onClick={header.column.getToggleSortingHandler()}
													onKeyDown={(e) => {
														// Enhanced keyboard handling for sorting
														if (header.column.getCanSort() && (e.key === "Enter" || e.key === " ")) {
															e.preventDefault()
															header.column.getToggleSortingHandler()?.(e)
														}
													}}
													tabIndex={header.column.getCanSort() ? 0 : undefined}>
													{flexRender(header.column.columnDef.header, header.getContext())}
													{{
														asc: <ChevronUpIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />,
														desc: <ChevronDownIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />,
													}[header.column.getIsSorted() as string] ?? null}
												</div>
											) : (
												flexRender(header.column.columnDef.header, header.getContext())
											)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			<div className="flex items-center justify-between gap-8">
				{/* Results per page */}
				<div className="flex items-center gap-3">
					<Label htmlFor={id} className="max-sm:sr-only">
						Rows per page
					</Label>
					<Select
						value={table.getState().pagination.pageSize.toString()}
						onValueChange={(value) => {
							table.setPageSize(Number(value))
						}}>
						<SelectTrigger id={id} className="w-fit whitespace-nowrap">
							<SelectValue placeholder="Select number of results" />
						</SelectTrigger>
						<SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
							{[5, 10, 25, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={pageSize.toString()}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				{/* Page number information */}
				<div className="text-muted-foreground flex grow justify-end whitespace-nowrap text-sm">
					<p className="text-muted-foreground whitespace-nowrap text-sm" aria-live="polite">
						<span className="text-foreground">
							{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
							{Math.min(Math.max(table.getState().pagination.pageIndex * table.getState().pagination.pageSize + table.getState().pagination.pageSize, 0), table.getRowCount())}
						</span>{" "}
						of <span className="text-foreground">{table.getRowCount().toString()}</span>
					</p>
				</div>
				{/* Pagination buttons */}
				<div>
					<Pagination>
						<PaginationContent>
							{/* First page button */}
							<PaginationItem>
								<IconButton
									variant="outline"
									className="disabled:pointer-events-none disabled:opacity-50"
									onClick={() => table.firstPage()}
									disabled={!table.getCanPreviousPage()}
									aria-label="Go to first page">
									<ChevronFirstIcon size={16} aria-hidden="true" />
								</IconButton>
							</PaginationItem>
							{/* Previous page button */}
							<PaginationItem>
								<IconButton
									variant="outline"
									className="disabled:pointer-events-none disabled:opacity-50"
									onClick={() => table.previousPage()}
									disabled={!table.getCanPreviousPage()}
									aria-label="Go to previous page">
									<ChevronLeftIcon size={16} aria-hidden="true" />
								</IconButton>
							</PaginationItem>
							{/* Next page button */}
							<PaginationItem>
								<IconButton
									variant="outline"
									className="disabled:pointer-events-none disabled:opacity-50"
									onClick={() => table.nextPage()}
									disabled={!table.getCanNextPage()}
									aria-label="Go to next page">
									<ChevronRightIcon size={16} aria-hidden="true" />
								</IconButton>
							</PaginationItem>
							{/* Last page button */}
							<PaginationItem>
								<IconButton
									variant="outline"
									className="disabled:pointer-events-none disabled:opacity-50"
									onClick={() => table.lastPage()}
									disabled={!table.getCanNextPage()}
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
