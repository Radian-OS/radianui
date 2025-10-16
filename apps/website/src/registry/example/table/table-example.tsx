"use client"

import { useId, useState } from "react"
import { ColumnDef, PaginationState, SortingState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { ChevronDownIcon, ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, Ellipsis, Mail, Pen, PhoneCall, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { IconButton } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/registry/ui/dropdown"
import { Label } from "@/registry/ui/label"
import { Pagination, PaginationContent, PaginationItem } from "@/registry/ui/pagination"
import { Progress } from "@/registry/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"

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
		image: "https://randomuser.me/api/portraits/men/1.jpg",
	},
	{
		name: "Jane Smith",
		image: "https://randomuser.me/api/portraits/women/1.jpg",
	},
	{
		name: "Michael Brown",
		image: "https://randomuser.me/api/portraits/men/2.jpg",
	},
	{
		name: "Emily Davis",
		image: "https://randomuser.me/api/portraits/women/2.jpg",
	},
	{
		name: "Chris Johnson",
		image: "https://randomuser.me/api/portraits/men/3.jpg",
	},
	{
		name: "Sophia Lee",
		image: "https://randomuser.me/api/portraits/women/3.jpg",
	},
	{
		name: "Daniel Garcia",
		image: "https://randomuser.me/api/portraits/men/4.jpg",
	},
	{
		name: "Olivia Martinez",
		image: "https://randomuser.me/api/portraits/women/4.jpg",
	},
	{
		name: "Ethan Wilson",
		image: "https://randomuser.me/api/portraits/men/5.jpg",
	},
	{
		name: "Mia Taylor",
		image: "https://randomuser.me/api/portraits/women/5.jpg",
	},
]

function getInitials(name: string) {
	const parts = name.trim().split(" ")
	if (parts.length === 1) {
		return parts[0][0]?.toUpperCase() ?? ""
	}
	return (parts[0][0]?.toUpperCase() ?? "") + (parts[parts.length - 1][0]?.toUpperCase() ?? "")
}
const data: UserData[] = [
	{
		user_details: {
			name: "Alice Johnson",
			imageSrc: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
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
			imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
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
			imageSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
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
			imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
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
			imageSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
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
			imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
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
			imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
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
			imageSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
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
			imageSrc: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face",
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
			imageSrc: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
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
			imageSrc: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
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
			imageSrc: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&crop=face",
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
			imageSrc: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
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
			imageSrc: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
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
			<Checkbox
				size="sm"
				className="flex w-full items-center justify-start"
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => <Checkbox size="sm" checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
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
						<p className="text-fg-secondary text-xs font-normal">{userDetails.email}</p>
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
						<Avatar size="20" className="border-bg border-2 hover:z-10" key={person.name}>
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
		cell: ({ row }) => <p className="text-fg-secondary text-sm font-normal">{row.getValue("income")}</p>,
		size: 140,
	},
	{
		header: "Status",
		accessorKey: "status",
		cell: ({ row }) => (
			<Badge size="20" variant="soft" color={row.getValue("status") === "Inactive" ? "error" : row.getValue("status") === "Pending" ? "warning" : "success"}>
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
					{(contactValue === "both" || contactValue === "email") && <Mail size={16} />}
					{(contactValue === "both" || contactValue === "phone") && <PhoneCall size={16} />}
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
			return <p className="text-fg-secondary text-sm font-normal">{getTimeAgo(lastActiveTime)}</p>
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
				<Dropdown>
					<DropdownTrigger className="flex w-full items-center justify-center">
						<Ellipsis size={20} />
					</DropdownTrigger>
					<DropdownContent className="w-fit">
						<DropdownItem>
							<Pen />
							Edit
						</DropdownItem>
						<DropdownItem>
							<Settings />
							Delete
						</DropdownItem>
					</DropdownContent>
				</Dropdown>
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
				<div className="flex items-center gap-3">
					<Label htmlFor={id} className="text-fg-secondary max-sm:sr-only">
						Rows per page
					</Label>
					<Select
						value={table.getState().pagination.pageSize.toString()}
						onValueChange={(value) => {
							table.setPageSize(Number(value))
						}}>
						<SelectTrigger size="32" id={id} className="w-fit whitespace-nowrap">
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
					<p className="text-fg-secondary whitespace-nowrap text-sm" aria-live="polite">
						<span className="text-shadow-fg-disabled">
							{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
							{Math.min(Math.max(table.getState().pagination.pageIndex * table.getState().pagination.pageSize + table.getState().pagination.pageSize, 0), table.getRowCount())}
						</span>{" "}
						of <span className="text-fg-secondary">{table.getRowCount().toString()}</span>
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
