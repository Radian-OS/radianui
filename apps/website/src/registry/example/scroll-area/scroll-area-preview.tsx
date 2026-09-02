"use client"

import { useState } from "react"
import {
	type ColumnDef,
	type SortingState,
	columnSizingFeature,
	columnVisibilityFeature,
	createSortedRowModel,
	flexRender,
	rowSelectionFeature,
	rowSortingFeature,
	tableFeatures,
	useTable,
} from "@tanstack/react-table"
import { ChevronDownIcon, ChevronUpIcon, Mail, PhoneCall } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Checkbox } from "@/registry/ui/checkbox"
import { Progress } from "@/registry/ui/progress"
import { ScrollArea, ScrollBar } from "@/registry/ui/scroll-area"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/ui/table"

const features = tableFeatures({
	rowSortingFeature,
	rowSelectionFeature,
	columnVisibilityFeature,
	columnSizingFeature,
	sortedRowModel: createSortedRowModel(),
})

type UserDetails = {
	name: string
	imageSrc: string
}

type UserData = {
	user_details: UserDetails
	email: string
	income: string
	progress: number
	status: "Active" | "Inactive" | "Pending"
	contact: "email" | "phone" | "both"
}

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
			imageSrc:
				"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
		},
		email: "alice.johnson@example.com",
		status: "Active",
		income: "$85,000",
		progress: 72,
		contact: "both",
	},
	{
		user_details: {
			name: "David Smith",
			imageSrc:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
		},
		email: "david.smith@example.com",
		status: "Inactive",
		income: "$64,500",
		progress: 40,
		contact: "email",
	},
	{
		user_details: {
			name: "Sophia Lee",
			imageSrc:
				"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
		},
		email: "sophia.lee@example.com",
		status: "Pending",
		income: "$120,000",
		progress: 55,
		contact: "phone",
	},
	{
		user_details: {
			name: "Michael Brown",
			imageSrc:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
		},
		email: "michael.brown@example.com",
		status: "Active",
		income: "$92,300",
		progress: 88,
		contact: "both",
	},
	{
		user_details: {
			name: "Emily Carter",
			imageSrc:
				"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
		},
		email: "emily.carter@example.com",
		status: "Active",
		income: "$76,800",
		progress: 67,
		contact: "email",
	},
	{
		user_details: {
			name: "James Wilson",
			imageSrc:
				"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
		},
		email: "james.wilson@example.com",
		status: "Inactive",
		income: "$58,200",
		progress: 33,
		contact: "phone",
	},
	{
		user_details: {
			name: "Olivia Martinez",
			imageSrc:
				"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
		},
		email: "olivia.martinez@example.com",
		status: "Pending",
		income: "$101,500",
		progress: 49,
		contact: "both",
	},
	{
		user_details: {
			name: "Daniel White",
			imageSrc:
				"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
		},
		email: "daniel.white@example.com",
		status: "Active",
		income: "$89,700",
		progress: 82,
		contact: "email",
	},
	{
		user_details: {
			name: "Lucas Young",
			imageSrc:
				"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
		},
		email: "lucas.young@example.com",
		status: "Active",
		income: "$98,400",
		progress: 91,
		contact: "both",
	},
]

const columns: ColumnDef<typeof features, UserData>[] = [
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
		header: "User",
		accessorKey: "user_details",
		cell: ({ row }) => {
			const userDetails = row.getValue("user_details") as UserDetails
			return (
				<div className="flex items-center gap-3">
					<Avatar rounded="circle" size="24">
						<AvatarImage src={userDetails.imageSrc} />
						<AvatarFallback>{getInitials(userDetails.name)}</AvatarFallback>
					</Avatar>
					<p className="text-fg text-sm font-medium">{userDetails.name}</p>
				</div>
			)
		},
		size: 190,
	},
	{
		header: "Email",
		accessorKey: "email",
		cell: ({ row }) => (
			<p className="text-fg-secondary text-sm font-normal">
				{row.getValue("email")}
			</p>
		),
		size: 210,
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
]

export default function ScrollAreaPreview() {
	const [sorting, setSorting] = useState<SortingState>([
		{
			id: "user_details",
			desc: false,
		},
	])

	const table = useTable({
		features,
		data,
		columns,
		onSortingChange: setSorting,
		enableSortingRemoval: false,
		state: {
			sorting,
		},
	})

	return (
		<div className="flex w-150 flex-col gap-4 overflow-auto">
			<ScrollArea className="bg-bg h-90 overflow-hidden rounded-md border">
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
															"flex h-full cursor-pointer items-center justify-between gap-2 select-none"
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
				<ScrollBar orientation="horizontal" />
				<ScrollBar orientation="vertical" />
			</ScrollArea>
		</div>
	)
}
