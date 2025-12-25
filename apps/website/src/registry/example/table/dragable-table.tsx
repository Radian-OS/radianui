"use client"

import { CSSProperties, useId, useState } from "react"
import { DndContext, type DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Cell, ColumnDef, Header, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { ChevronDownIcon, ChevronUpIcon, GripVerticalIcon } from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { IconButton } from "@/registry/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"

type Item = {
	id: string
	name: string
	email: string
	location: string
	status: "Active" | "Inactive" | "Pending"
	balance: number
}

const data: Item[] = [
	{
		id: "1",
		name: "Alice Johnson",
		email: "alice.johnson@example.com",
		location: "New York, USA",
		status: "Active",
		balance: 4200,
	},
	{
		id: "2",
		name: "Bob Smith",
		email: "bob.smith@example.com",
		location: "London, UK",
		status: "Inactive",
		balance: 3100,
	},
	{
		id: "3",
		name: "Carol Lee",
		email: "carol.lee@example.com",
		location: "Sydney, Australia",
		status: "Pending",
		balance: 5600,
	},
	{
		id: "4",
		name: "Daniel Khan",
		email: "daniel.khan@example.com",
		location: "Toronto, Canada",
		status: "Active",
		balance: 2750,
	},
	{
		id: "5",
		name: "Emily Wilson",
		email: "emily.wilson@example.com",
		location: "Berlin, Germany",
		status: "Inactive",
		balance: 4900,
	},
	{
		id: "6",
		name: "Frank Miller",
		email: "frank.miller@example.com",
		location: "Tokyo, Japan",
		status: "Pending",
		balance: 3300,
	},
	{
		id: "7",
		name: "Grace Taylor",
		email: "grace.taylor@example.com",
		location: "San Francisco, USA",
		status: "Active",
		balance: 6100,
	},
]

const columns: ColumnDef<Item>[] = [
	{
		id: "name",
		header: "Name",
		accessorKey: "name",
		cell: ({ row }) => <div className="truncate font-medium">{row.getValue("name")}</div>,
		sortUndefined: "last",
		sortDescFirst: false,
	},
	{
		id: "email",
		header: "Email",
		accessorKey: "email",
	},
	{
		id: "location",
		header: "Location",
		accessorKey: "location",
		cell: ({ row }) => <div className="truncate">{row.getValue("location")}</div>,
	},
	{
		id: "status",
		header: "Status",
		accessorKey: "status",
		cell: ({ row }) => (
			<Badge size="20" variant="soft" color={row.getValue("status") === "Inactive" ? "error" : row.getValue("status") === "Pending" ? "warning" : "success"}>
				{row.getValue("status")}
			</Badge>
		),
	},
	{
		id: "balance",
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
]

export default function Component() {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnOrder, setColumnOrder] = useState<string[]>(columns.map((column) => column.id as string))

	const table = useReactTable({
		data,
		columns,
		columnResizeMode: "onChange",
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		state: {
			sorting,
			columnOrder,
		},
		onColumnOrderChange: setColumnOrder,
		enableSortingRemoval: false,
	})

	// reorder columns after drag & drop
	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event
		if (active && over && active.id !== over.id) {
			setColumnOrder((columnOrder) => {
				const oldIndex = columnOrder.indexOf(active.id as string)
				const newIndex = columnOrder.indexOf(over.id as string)
				return arrayMove(columnOrder, oldIndex, newIndex) //this is just a splice util
			})
		}
	}

	const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

	return (
		<DndContext id={useId()} collisionDetection={closestCenter} modifiers={[restrictToHorizontalAxis]} onDragEnd={handleDragEnd} sensors={sensors}>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className="bg-fill1">
							<SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
								{headerGroup.headers.map((header) => (
									<DraggableTableHeader key={header.id} header={header} />
								))}
							</SortableContext>
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell) => (
									<SortableContext key={cell.id} items={columnOrder} strategy={horizontalListSortingStrategy}>
										<DragAlongCell key={cell.id} cell={cell} />
									</SortableContext>
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
		</DndContext>
	)
}

const DraggableTableHeader = ({ header }: { header: Header<Item, unknown> }) => {
	const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
		id: header.column.id,
	})

	const style: CSSProperties = {
		opacity: isDragging ? 0.8 : 1,
		position: "relative",
		transform: CSS.Translate.toString(transform),
		transition,
		whiteSpace: "nowrap",
		width: header.column.getSize(),
		zIndex: isDragging ? 1 : 0,
	}

	return (
		<TableHead
			style={style}
			ref={setNodeRef}
			className="before:bg-border relative h-10 border-t before:absolute before:inset-y-0 before:start-0 before:w-px first:before:bg-transparent"
			aria-sort={header.column.getIsSorted() === "asc" ? "ascending" : header.column.getIsSorted() === "desc" ? "descending" : "none"}>
			<div className="flex items-center justify-start gap-0.5">
				<IconButton variant="ghost" color="neutral" className="-ml-2 size-7 shadow-none" {...attributes} {...listeners} aria-label="Drag to reorder">
					<GripVerticalIcon className="opacity-60" size={16} aria-hidden="true" />
				</IconButton>
				<span className="grow truncate">{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</span>
				<IconButton
					variant="ghost"
					color="neutral"
					aria-label="Sorting Button"
					className="group -mr-1 size-7 shadow-none"
					onClick={header.column.getToggleSortingHandler()}
					onKeyDown={(e) => {
						// Enhanced keyboard handling for sorting
						if (header.column.getCanSort() && (e.key === "Enter" || e.key === " ")) {
							e.preventDefault()
							header.column.getToggleSortingHandler()?.(e)
						}
					}}>
					{{
						asc: <ChevronUpIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />,
						desc: <ChevronDownIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />,
					}[header.column.getIsSorted() as string] ?? <ChevronUpIcon className="shrink-0 opacity-0 group-hover:opacity-60" size={16} aria-hidden="true" />}
				</IconButton>
			</div>
		</TableHead>
	)
}

const DragAlongCell = ({ cell }: { cell: Cell<Item, unknown> }) => {
	const { isDragging, setNodeRef, transform, transition } = useSortable({
		id: cell.column.id,
	})

	const style: CSSProperties = {
		opacity: isDragging ? 0.8 : 1,
		position: "relative",
		transform: CSS.Translate.toString(transform),
		transition,
		width: cell.column.getSize(),
		zIndex: isDragging ? 1 : 0,
	}

	return (
		<TableCell ref={setNodeRef} className="truncate" style={style}>
			{flexRender(cell.column.columnDef.cell, cell.getContext())}
		</TableCell>
	)
}
