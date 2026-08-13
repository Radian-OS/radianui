"use client"

import { useId, useState } from "react"
import {
	ColumnDef,
	PaginationState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"
import {
	ChevronDownIcon,
	ChevronFirstIcon,
	ChevronLastIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronUpIcon,
	Ellipsis,
	Mail,
	Pen,
	PhoneCall,
	Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { IconButton } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { Label } from "@/registry/ui/label"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/registry/ui/pagination"
import { Progress } from "@/registry/ui/progress"
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

type UserDetails = {
	name: string
	imageSrc: string
	email: string
}

type UserData = {
	user_details: UserDetails
	income: string
	progress: number
	status: "Active" | "Inactive" | "Pending"
	lastActiveTime: string
	teamMembers: number
	contact: "email" | "phone" | "both"
}

export const people = [
	{
		name: "John Doe",
		image: "/media/male-1.jpg",
	},
	{
		name: "Jane Smith",
		image: "/media/female-1.jpg",
	},
	{
		name: "Michael Brown",
		image: "/media/male-2.jpg",
	},
	{
		name: "Emily Davis",
		image: "/media/female-2.jpg",
	},
	{
		name: "Chris Johnson",
		image: "/media/male-3.jpg",
	},
	{
		name: "Sophia Lee",
		image: "/media/female-3.jpg",
	},
	{
		name: "Daniel Garcia",
		image: "/media/male-4.jpg",
	},
	{
		name: "Olivia Martinez",
		image: "/media/female-4.jpg",
	},
	{
		name: "Ethan Wilson",
		image: "/media/male-5.jpg",
	},
	{
		name: "Mia Taylor",
		image: "/media/female-5.jpg",
	},
]

function getInitials(name: string) {
	const parts = name.trim().split(" ")
	if (parts.length === 1) {
		return parts[0][0]?.toUpperCase() ?? ""
	}
	return (
		(parts[0][0]?.toUpperCase() ?? "") +
		(parts[parts.length - 1][0]?.toUpperCase() ?? "")
	)
}
const data: UserData[] = [
	{
		user_details: {
			name: "Alice Johnson",
			imageSrc: "/media/male-1.jpg",
			email: "alice.johnson@example.com",
		},
		status: "Active",
		income: "$85,000",
		lastActiveTime: "2025-09-18T12:30:00Z",
		progress: 72,
		teamMembers: 5,
		contact: "both",
	},
	{
		user_details: {
			name: "David Smith",
			imageSrc: "/media/male-2.jpg",
			email: "david.smith@example.com",
		},
		status: "Inactive",
		income: "$64,500",
		lastActiveTime: "2025-09-17T09:45:00Z",
		progress: 40,
		teamMembers: 2,
		contact: "email",
	},
	{
		user_details: {
			name: "Sophia Lee",
			imageSrc: "/media/female-1.jpg",
			email: "sophia.lee@example.com",
		},
		status: "Pending",
		income: "$120,000",
		lastActiveTime: "2025-09-15T18:20:00Z",
		progress: 55,
		teamMembers: 8,
		contact: "phone",
	},
	{
		user_details: {
			name: "Michael Brown",
			imageSrc: "/media/male-3.jpg",
			email: "michael.brown@example.com",
		},
		status: "Active",
		income: "$92,300",
		lastActiveTime: "2025-09-19T06:10:00Z",
		progress: 88,
		teamMembers: 3,
		contact: "both",
	},
	{
		user_details: {
			name: "Emily Carter",
			imageSrc: "/media/female-2.jpg",
			email: "emily.carter@example.com",
		},
		status: "Active",
		income: "$76,800",
		lastActiveTime: "2025-09-18T16:40:00Z",
		progress: 67,
		teamMembers: 6,
		contact: "email",
	},
	{
		user_details: {
			name: "James Wilson",
			imageSrc: "/media/male-4.jpg",
			email: "james.wilson@example.com",
		},
		status: "Inactive",
		income: "$58,200",
		lastActiveTime: "2025-09-10T14:00:00Z",
		progress: 33,
		teamMembers: 4,
		contact: "phone",
	},
	{
		user_details: {
			name: "Olivia Martinez",
			imageSrc: "/media/female-3.jpg",
			email: "olivia.martinez@example.com",
		},
		status: "Pending",
		income: "$101,500",
		lastActiveTime: "2025-09-13T09:25:00Z",
		progress: 49,
		teamMembers: 7,
		contact: "both",
	},
	{
		user_details: {
			name: "Daniel White",
			imageSrc: "/media/male-5.jpg",
			email: "daniel.white@example.com",
		},
		status: "Active",
		income: "$89,700",
		lastActiveTime: "2025-09-19T02:50:00Z",
		progress: 82,
		teamMembers: 5,
		contact: "email",
	},
	{
		user_details: {
			name: "Grace Hall",
			imageSrc: "/media/female-5.jpg",
			email: "grace.hall@example.com",
		},
		status: "Active",
		income: "$73,400",
		lastActiveTime: "2025-09-17T20:15:00Z",
		progress: 61,
		teamMembers: 3,
		contact: "both",
	},
	{
		user_details: {
			name: "Benjamin King",
			imageSrc: "/media/male-6.jpg",
			email: "benjamin.king@example.com",
		},
		status: "Inactive",
		income: "$95,200",
		lastActiveTime: "2025-09-11T07:45:00Z",
		progress: 46,
		teamMembers: 2,
		contact: "phone",
	},
	{
		user_details: {
			name: "Chloe Scott",
			imageSrc: "/media/female-6.jpg",
			email: "chloe.scott@example.com",
		},
		status: "Pending",
		income: "$112,000",
		lastActiveTime: "2025-09-14T11:10:00Z",
		progress: 58,
		teamMembers: 6,
		contact: "both",
	},
	{
		user_details: {
			name: "Ethan Harris",
			imageSrc: "/media/male-7.jpg",
			email: "ethan.harris@example.com",
		},
		status: "Active",
		income: "$87,900",
		lastActiveTime: "2025-09-19T05:20:00Z",
		progress: 77,
		teamMembers: 4,
		contact: "email",
	},
	{
		user_details: {
			name: "Milli Walker",
			imageSrc: "/media/female-7.jpg",
			email: "milli.walker@example.com",
		},
		status: "Inactive",
		income: "$69,800",
		lastActiveTime: "2025-09-12T15:55:00Z",
		progress: 36,
		teamMembers: 2,
		contact: "phone",
	},
	{
		user_details: {
			name: "Lucas Young",
			imageSrc: "/media/male-8.jpg",
			email: "lucas.young@example.com",
		},
		status: "Active",
		income: "$98,400",
		lastActiveTime: "2025-09-18T21:35:00Z",
		progress: 91,
		teamMembers: 8,
		contact: "both",
	},
]

const getTimeAgo = (dateString: string): string => {
	const now = new Date()
	const pastDate = new Date(dateString)
	const diffInMs = now.getTime() - pastDate.getTime()

	const seconds = Math.floor(diffInMs / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)
	const weeks = Math.floor(days / 7)
	const months = Math.floor(days / 30)
	const years = Math.floor(days / 365)

	if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`
	if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`
	if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`
	if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`
	if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`
	if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
	if (seconds > 30) return `${seconds} seconds ago`
	return "Just now"
}

const columns: ColumnDef<UserData>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<div className="flex items-center justify-center">
				<Checkbox
					size="sm"
					className="flex w-full items-center justify-start"
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className="flex items-center justify-center">
				<Checkbox
					size="sm"
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			</div>
		),
		size: 28,
		enableSorting: false,
	},
	{
		header: "User Details",
		accessorKey: "user_details",
		cell: ({ row }) => {
			const userDetails = row.getValue("user_details") as UserDetails
			return (
				<div className="flex items-center gap-3">
					<Avatar rounded="square" size="36">
						<AvatarImage src={userDetails.imageSrc} />
						<AvatarFallback>{getInitials(userDetails.name)}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<p className="text-fg text-sm font-medium">{userDetails.name}</p>
						<p className="text-fg-secondary text-xs font-normal">
							{userDetails.email}
						</p>
					</div>
				</div>
			)
		},
		size: 250,
	},
	{
		header: "Team",
		accessorKey: "teamMembers",
		cell: ({ row }) => {
			// Use row index to create a stable "random" number
			const avatarCount = (row.index % 5) + 1

			return (
				<div className="flex -space-x-2.5">
					{people.slice(0, avatarCount).map((person) => (
						<Avatar
							size="20"
							className="border-bg border-2 hover:z-10"
							key={person.name}>
							<AvatarImage src={person.image} />
							<AvatarFallback>{getInitials(person.name)}</AvatarFallback>
						</Avatar>
					))}
					<Avatar size="20" className="border-bg border-2 hover:z-10">
						<AvatarFallback>{row.getValue("teamMembers")}</AvatarFallback>
					</Avatar>
				</div>
			)
		},
		size: 140,
	},
	{
		header: "Total Spend",
		accessorKey: "income",
		cell: ({ row }) => (
			<p className="text-fg-secondary text-sm font-normal">
				{row.getValue("income")}
			</p>
		),
		size: 140,
	},
	{
		header: "Status",
		accessorKey: "status",
		cell: ({ row }) => (
			<Badge
				size="20"
				variant="soft"
				color={
					row.getValue("status") === "Inactive"
						? "error"
						: row.getValue("status") === "Pending"
							? "warning"
							: "success"
				}>
				{row.getValue("status")}
			</Badge>
		),
		size: 120,
	},
	{
		header: "Contact",
		accessorKey: "contact",
		cell: ({ row }) => {
			const contactValue = row.getValue("contact") as string

			return (
				<div className="text-fg-secondary flex items-center justify-start gap-2">
					{(contactValue === "both" || contactValue === "email") && (
						<Mail size={16} />
					)}
					{(contactValue === "both" || contactValue === "phone") && (
						<PhoneCall size={16} />
					)}
				</div>
			)
		},
		size: 100,
	},
	{
		header: "Last Active",
		accessorKey: "lastActiveTime",
		cell: ({ row }) => {
			const lastActiveTime = row.getValue("lastActiveTime") as string
			return (
				<p className="text-fg-secondary text-sm font-normal">
					{getTimeAgo(lastActiveTime)}
				</p>
			)
		},
		size: 140,
	},
	{
		header: "Progress",
		accessorKey: "progress",
		cell: ({ row }) => {
			const progress = row.getValue("progress") as number
			return (
				<div className="flex items-center justify-center gap-1">
					<Progress className="w-40" value={progress} />
					<p className="text-fg-secondary text-sm font-normal">{progress}%</p>
				</div>
			)
		},
		size: 200,
	},
	{
		header: "Edit",
		cell: ({}) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger className="flex w-full items-center justify-center">
						<Ellipsis size={20} />
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-fit">
						<DropdownMenuItem>
							<Pen />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Settings />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
		size: 60,
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
			id: "user_details",
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
		<div className="flex w-full flex-col gap-4 overflow-auto">
			<div className="bg-bg no-scrollbar overflow-y-scroll rounded-md border">
				<Table className="table-fixed">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="hover:bg-transparent">
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											style={{ width: `${header.getSize()}px` }}
											className="h-11">
											{header.isPlaceholder ? null : header.column.getCanSort() ? (
												<div
													className={cn(
														header.column.getCanSort() &&
															"flex h-full cursor-pointer select-none items-center justify-between gap-2"
													)}
													onClick={header.column.getToggleSortingHandler()}
													onKeyDown={(e) => {
														if (
															header.column.getCanSort() &&
															(e.key === "Enter" || e.key === " ")
														) {
															e.preventDefault()
															header.column.getToggleSortingHandler()?.(e)
														}
													}}
													tabIndex={header.column.getCanSort() ? 0 : undefined}>
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
													{{
														asc: (
															<ChevronUpIcon
																className="shrink-0 opacity-60"
																size={16}
																aria-hidden="true"
															/>
														),
														desc: (
															<ChevronDownIcon
																className="shrink-0 opacity-60"
																size={16}
																aria-hidden="true"
															/>
														),
													}[header.column.getIsSorted() as string] ?? null}
												</div>
											) : (
												flexRender(
													header.column.columnDef.header,
													header.getContext()
												)
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
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			<div className="flex items-center justify-between gap-8">
				<div className="flex items-center gap-3">
					<Label htmlFor={id} className="text-fg-secondary max-sm:sr-only">
						Rows per page
					</Label>
					<Select
						value={table.getState().pagination.pageSize.toString()}
						onValueChange={(value) => {
							table.setPageSize(Number(value))
						}}>
						<SelectTrigger
							size="32"
							id={id}
							className="w-fit whitespace-nowrap">
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
				<div className="text-fg-secondary flex grow justify-end whitespace-nowrap text-sm">
					<p
						className="text-fg-secondary whitespace-nowrap text-sm"
						aria-live="polite">
						<span className="text-shadow-fg-disabled">
							{table.getState().pagination.pageIndex *
								table.getState().pagination.pageSize +
								1}
							-
							{Math.min(
								Math.max(
									table.getState().pagination.pageIndex *
										table.getState().pagination.pageSize +
										table.getState().pagination.pageSize,
									0
								),
								table.getRowCount()
							)}
						</span>{" "}
						of{" "}
						<span className="text-fg-secondary">
							{table.getRowCount().toString()}
						</span>
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
									size="32"
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
									size="32"
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
									size="32"
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
