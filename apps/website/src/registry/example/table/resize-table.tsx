"use client"

import { useState } from "react"
import {
	ColumnDef,
	SortingState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { cn } from "@/lib/utils"
import { IconSlot } from "@/registry/icon/icon-library"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/ui/table"

type Item = {
	id: string
	email: string
	location: string
	balance: number
	department: string
	role: string
	joinDate: string
}

const data: Item[] = [
	{
		id: "2",
		email: "bob.smith@example.com",
		location: "London, UK",
		balance: 3100,
		department: "Marketing",
		role: "Content Strategist",
		joinDate: "2021-07-10",
	},
	{
		id: "3",
		email: "carol.lee@example.com",
		location: "Sydney, Australia",
		balance: 5600,
		department: "Finance",
		role: "Accountant",
		joinDate: "2020-11-02",
	},
	{
		id: "4",
		email: "daniel.khan@example.com",
		location: "Toronto, Canada",
		balance: 2750,
		department: "Human Resources",
		role: "HR Manager",
		joinDate: "2023-01-05",
	},
	{
		id: "5",
		email: "emily.wilson@example.com",
		location: "Berlin, Germany",
		balance: 4900,
		department: "Engineering",
		role: "Backend Developer",
		joinDate: "2019-09-22",
	},
	{
		id: "6",
		email: "frank.miller@example.com",
		location: "Tokyo, Japan",
		balance: 3300,
		department: "Support",
		role: "Customer Success",
		joinDate: "2021-04-12",
	},
	{
		id: "7",
		email: "grace.taylor@example.com",
		location: "San Francisco, USA",
		balance: 6100,
		department: "Design",
		role: "UX Designer",
		joinDate: "2022-08-19",
	},
]

const columns: ColumnDef<Item>[] = [
	{
		header: "Email",
		accessorKey: "email",
	},
	{
		header: "Location",
		accessorKey: "location",
		cell: ({ row }) => (
			<div className="truncate">{row.getValue("location")}</div>
		),
	},
	{
		header: "Balance",
		accessorKey: "balance",
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("balance"))
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount)
			return formatted
		},
	},
	{
		header: "Department",
		accessorKey: "department",
	},
	{
		header: "Role",
		accessorKey: "role",
	},
	{
		header: "Join Date",
		accessorKey: "joinDate",
	},
]

export default function ResizableTable() {
	const [sorting, setSorting] = useState<SortingState>([
		{
			id: "email",
			desc: false,
		},
	])

	const table = useReactTable({
		data,
		columns,
		columnResizeMode: "onChange",
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		state: {
			sorting,
		},
		enableSortingRemoval: false,
	})

	return (
		<div className="flex w-full flex-col gap-4 overflow-auto">
			<Table
				className="table-fixed"
				style={{
					width: table.getCenterTotalSize(),
				}}>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										className="relative h-10 select-none border-t last:[&>.cursor-col-resize]:opacity-0"
										aria-sort={
											header.column.getIsSorted() === "asc"
												? "ascending"
												: header.column.getIsSorted() === "desc"
													? "descending"
													: "none"
										}
										{...{
											colSpan: header.colSpan,
											style: {
												width: header.getSize(),
											},
										}}>
										{header.isPlaceholder ? null : (
											<div
												className={cn(
													header.column.getCanSort() &&
														"flex h-full cursor-pointer select-none items-center justify-between gap-2"
												)}
												onClick={header.column.getToggleSortingHandler()}
												onKeyDown={(e) => {
													// Enhanced keyboard handling for sorting
													if (
														header.column.getCanSort() &&
														(e.key === "Enter" || e.key === " ")
													) {
														e.preventDefault()
														header.column.getToggleSortingHandler()?.(e)
													}
												}}
												tabIndex={header.column.getCanSort() ? 0 : undefined}>
												<span className="truncate">
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
												</span>
												{{
													asc: (
														<IconSlot
															slot="up"
															className="shrink-0 opacity-60"
															size={16}
															aria-hidden="true"
														/>
													),
													desc: (
														<IconSlot
															slot="down"
															className="shrink-0 opacity-60"
															size={16}
															aria-hidden="true"
														/>
													),
												}[header.column.getIsSorted() as string] ?? null}
											</div>
										)}
										{header.column.getCanResize() && (
											<div
												{...{
													onDoubleClick: () => header.column.resetSize(),
													onMouseDown: header.getResizeHandler(),
													onTouchStart: header.getResizeHandler(),
													className:
														"absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:translate-x-px",
												}}
											/>
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
									<TableCell key={cell.id} className="truncate">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
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
	)
}
