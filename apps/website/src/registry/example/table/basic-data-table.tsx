"use client"

import * as React from "react"
import {
	type ColumnDef,
	type ColumnFiltersState,
	type ColumnVisibilityState,
	type SortingState,
	columnFilteringFeature,
	columnResizingFeature,
	columnSizingFeature,
	columnVisibilityFeature,
	createFilteredRowModel,
	createPaginatedRowModel,
	createSortedRowModel,
	flexRender,
	rowPaginationFeature,
	rowSelectionFeature,
	rowSortingFeature,
	tableFeatures,
	useTable,
} from "@tanstack/react-table"
import { ChevronsUpDown } from "lucide-react"
import { Checkbox } from "@/registry/ui/checkbox"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/ui/table"

const features = tableFeatures({
	columnFilteringFeature,
	rowSortingFeature,
	rowPaginationFeature,
	rowSelectionFeature,
	columnVisibilityFeature,
	columnResizingFeature,
	columnSizingFeature,
	filteredRowModel: createFilteredRowModel(),
	sortedRowModel: createSortedRowModel(),
	paginatedRowModel: createPaginatedRowModel(),
})

const data: Payment[] = [
	{
		id: "p1a9x7b2",
		amount: 450,
		status: "success",
		email: "lena.miller@example.com",
	},
	{
		id: "t8d2q4m6",
		amount: 299,
		status: "processing",
		email: "ethan.jones@example.com",
	},
	{
		id: "w4f7k3c9",
		amount: 128,
		status: "failed",
		email: "sophia.wilson@example.com",
	},
	{
		id: "h2n8v6d5",
		amount: 620,
		status: "success",
		email: "noah.brown@example.com",
	},
	{
		id: "r1b5k9j3",
		amount: 785,
		status: "success",
		email: "amelia.anderson@example.com",
	},
	{
		id: "x8v2m4q6",
		amount: 205,
		status: "failed",
		email: "oliver.thomas@example.com",
	},
]

export type Payment = {
	id: string
	amount: number
	status: "pending" | "processing" | "success" | "failed"
	email: string
}

export const columns: ColumnDef<typeof features, Payment>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<div className="flex items-center justify-center">
				<Checkbox
					size="sm"
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
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "email",
		header: ({ column }) => {
			return (
				<div
					className="flex cursor-pointer items-center justify-start gap-1"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Email
					<ChevronsUpDown size={16} />
				</div>
			)
		},
		cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("status")}</div>
		),
	},

	{
		accessorKey: "amount",
		header: () => <div className="text-right">Amount</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amount"))

			// Format the amount as a dollar amount
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount)

			return <div className="text-right font-medium">{formatted}</div>
		},
	},
]

export default function BasicDataTable() {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	)
	const [columnVisibility, setColumnVisibility] =
		React.useState<ColumnVisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})

	const table = useTable({
		features,
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
		columnResizeMode: "onChange",
	})

	return (
		<div className="w-full">
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
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
			<div className="flex items-center justify-end pt-4 text-sm">
				{table.getFilteredSelectedRowModel().rows.length} of{" "}
				{table.getFilteredRowModel().rows.length} row(s) selected.
			</div>
		</div>
	)
}
