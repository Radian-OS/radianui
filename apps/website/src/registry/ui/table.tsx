"use client"

import React, { type CSSProperties, createContext, useContext, useEffect, useId, useState } from "react"
import { DndContext, type DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { type Cell, type ColumnDef, type Header, type SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { ChevronDown, ChevronUp, GripVertical, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "./checkbox"

// Reusable table components with forwardRef for better DOM handling
const DragTable = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(function DragTable({ className, ...props }, ref) {
	return (
		<div className="relative w-full overflow-auto">
			<table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
		</div>
	)
})

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(function TableHeader({ className, ...props }, ref) {
	return <thead ref={ref} className={cn(className)} {...props} />
})

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(function TableBody({ className, ...props }, ref) {
	return <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
})

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(function TableFooter({ className, ...props }, ref) {
	return <tfoot ref={ref} className={cn("border-border bg-muted/50 border-t font-medium last:[&>tr]:border-b-0", className)} {...props} />
})
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(function TableRow({ className, ...props }, ref) {
	return <tr ref={ref} className={cn("border-border hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className)} {...props} />
})

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(function TableHead({ className, ...props }, ref) {
	return (
		<th
			ref={ref}
			className={cn("text-muted-foreground px-3 py-2 text-left align-middle font-medium [&:has([role=checkbox])]:w-px [&>[role=checkbox]]:translate-y-0.5", className)}
			{...props}
		/>
	)
})

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(function TableCell({ className, ...props }, ref) {
	return <td ref={ref} className={cn("px-3 py-2 align-middle [&>[role=checkbox]]:translate-y-0.5", className)} {...props} />
})

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(function TableCaption({ className, ...props }, ref) {
	return <caption ref={ref} className={cn("text-muted-foreground mt-4 text-sm", className)} {...props} />
})
TableCaption.displayName = "TableCaption"

// Define the props for the MainTable component
type MainTableProps<TData> = {
	data: TData[]
	columns: ColumnDef<TData>[]
	enableSorting?: boolean
	headerHeight?: string
	rowHeight?: string
	checkBox?: boolean
	expand?: boolean
	onSelectionChange?: (selectedRows: TData[]) => void
	stripedTable?: boolean
	verticalLine?: boolean
	dense?: boolean
	sticky?: boolean
	enableSearching?: boolean
	dragAndDrop?: boolean
	resizable?: boolean
	tableHeight?: string
}
// Define the context for table configuration
type TableContextType = {
	dragAndDrop?: boolean
	resizable?: boolean
	dense?: boolean
	enableSorting?: boolean
	stripedTable?: boolean
	verticalLine?: boolean
}
// Create a context for table configuration
const TableContext = createContext<TableContextType | null>(null)
// Provider component for table configuration
const TableProvider: React.FC<TableContextType & { children: React.ReactNode }> = function ({ children, ...props }) {
	return <TableContext.Provider value={props}>{children}</TableContext.Provider>
}
// Hook to access table configuration
const useTableContext = function () {
	const context = useContext(TableContext)
	if (!context) throw new Error("useTableContext must be used within TableProvider")
	return context
}

const MainTable = function <TData>({
	data,
	columns,
	enableSorting = false,
	headerHeight,
	rowHeight = "40px",
	checkBox = false,
	onSelectionChange,
	stripedTable = false,
	verticalLine = false,
	dense = false,
	sticky = false,
	// enableSearching = false,
	dragAndDrop = false,
	resizable = false,
	// expand = false,
	tableHeight,
}: MainTableProps<TData>) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnOrder, setColumnOrder] = useState<string[]>(columns.map((column) => column.id as string))
	// Add a checkbox column if enabled
	const tableColumn = checkBox
		? [
				{
					id: "select",
					accessorKey: "select",
					header: "Select",
					size: 10,
				},
				...columns,
			]
		: columns
	// Update column order when columns or checkBox changes
	useEffect(() => {
		setColumnOrder(tableColumn.map((column) => column.id as string))
	}, [columns, checkBox]) // Update when columns or checkBox changes
	// Initialize the table using react-table
	const table = useReactTable({
		data,
		columns: tableColumn,
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
	const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())

	const isAllSelected = table.getRowModel().rows.length > 0 && selectedRows.size === table.getRowModel().rows.length
	const isSomeSelected = selectedRows.size > 0 && !isAllSelected // Some but not all rows are selected
	// Handle select all checkbox change
	const handleSelectAllChange = function () {
		if (isSomeSelected || isAllSelected) {
			// If some or all are selected, clear selection
			setSelectedRows(new Set())
			onSelectionChange?.([])
		} else {
			// Otherwise, select all visible rows
			const newSelection = new Set<number>()
			table.getRowModel().rows.forEach((row) => newSelection.add(row.index))
			setSelectedRows(newSelection)
			onSelectionChange?.(Array.from(newSelection).map((index) => data[index]))
		}
	}
	// Handle individual row selection change
	const handleRowSelectChange = function (rowIndex: number, checked: boolean) {
		const newSelection: Set<number> = new Set(selectedRows)
		if (checked) {
			newSelection.add(rowIndex)
		} else {
			newSelection.delete(rowIndex)
		}
		setSelectedRows(newSelection)
		onSelectionChange?.(Array.from(newSelection).map((index) => data[index]))
	}

	// Handle drag-and-drop column reordering
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
	// Initialize sensors for drag-and-drop
	const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

	return (
		<TableProvider dragAndDrop={dragAndDrop} resizable={resizable} dense={dense} enableSorting={enableSorting} verticalLine={verticalLine}>
			<DndContext id={useId()} collisionDetection={closestCenter} modifiers={[restrictToHorizontalAxis]} onDragEnd={handleDragEnd} sensors={sensors}>
				<div className={cn(`overflow-hidden ${dense && `rounded-md border`}`, tableHeight)}>
					<DragTable
						style={{
							width: resizable ? table.getCenterTotalSize() : "100%",
							minWidth: dragAndDrop ? table.getCenterTotalSize() : "auto",
						}}>
						<TableHeader className={`${sticky ? "bg-base sticky top-0 z-10" : ""}`}>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow style={{ height: headerHeight }} key={headerGroup.id}>
									<SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
										{headerGroup.headers.map((header) => {
											const verticals = header.index !== headerGroup.headers.length - 1
											return (
												<DraggableTableHeader
													selectAll={isAllSelected}
													onSelectAllChange={handleSelectAllChange}
													key={header.id}
													header={header}
													isSomeSelected={isSomeSelected}
													headerGroup={verticals}
												/>
											)
										})}
									</SortableContext>
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row, rowIndex) => (
									<TableRow
										style={{ height: rowHeight }}
										className={`${stripedTable && rowIndex % 2 === 0 ? "bg-elevation-negative" : "hover:bg-elevation-negative"} ${rowIndex % 2 !== 0 && stripedTable ? "hover:bg-transparent" : ""} `}
										key={row.id}
										data-state={row.getIsSelected() && "selected"}>
										{row.getVisibleCells().map((cell: Cell<TData, unknown>, cellIndex) => {
											const isLastVisibleColumn = cellIndex === row.getVisibleCells().length - 1
											return (
												<SortableContext key={cell.id} items={columnOrder} strategy={horizontalListSortingStrategy}>
													<DragAlongCell
														rowIndex={rowIndex}
														selectedRows={selectedRows}
														onRowSelectChange={handleRowSelectChange}
														key={cell.id}
														cell={cell}
														isLastVisibleColumn={isLastVisibleColumn}
													/>
												</SortableContext>
											)
										})}
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
					</DragTable>
				</div>
			</DndContext>
		</TableProvider>
	)
}
// DraggableTableHeader component for sortable headers
const DraggableTableHeader = function <TData>({
	header,
	headerGroup,
	isSomeSelected,
	selectAll,
	onSelectAllChange,
}: {
	header: Header<TData, unknown>
	selectAll: boolean
	onSelectAllChange: (checked: boolean) => void
	isSomeSelected?: boolean
	headerGroup?: boolean
}) {
	const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
		id: header.column.id,
	})
	const { dragAndDrop, resizable, enableSorting, dense, verticalLine } = useTableContext()

	const style: CSSProperties = {
		opacity: isDragging ? 0.8 : 1,
		position: "relative",
		transform: CSS.Translate.toString(transform),
		transition,
		background: " bg-elevation-negative",
		whiteSpace: "nowrap",
		width: header.column.getSize(),
		zIndex: isDragging ? 1 : 0,
	}

	return (
		<TableHead
			ref={setNodeRef}
			className={`before:bg-border relative before:absolute before:inset-y-0 before:start-0 first:before:bg-transparent ${dense ? "bg-elevation-negative" : ""} ${(verticalLine && headerGroup) || (resizable && headerGroup) ? "border-border border-r" : ""} `}
			style={{ ...style, width: header.getSize() }}
			colSpan={header.colSpan}>
			{header.column.id !== "select" ? (
				<div className="flex items-center justify-start">
					{dragAndDrop && (
						<button className="hover:bg-elevation-negative -ml-2 rounded-md py-1 shadow-none" {...attributes} {...listeners} aria-label="Drag to reorder">
							<GripVertical className="text-fg-secondary h-4 opacity-60" strokeWidth={2} aria-hidden="true" />
						</button>
					)}
					<span className="text-fg-secondary z-10 ml-2 grow truncate">{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</span>
					{enableSorting && (
						<button
							className="text-fg-secondary group -mr-1 bg-transparent py-0 shadow-none"
							onClick={header.column.getToggleSortingHandler()}
							onKeyDown={(e) => {
								// Enhanced keyboard handling for sorting
								if (header.column.getCanSort() && (e.key === "Enter" || e.key === " ")) {
									e.preventDefault()
									header.column.getToggleSortingHandler()?.(e)
								}
							}}>
							{{
								asc: <ChevronUp className="h-4 shrink-0 opacity-60" strokeWidth={2} aria-hidden="true" />,
								desc: <ChevronDown className="h-4 shrink-0 opacity-60" strokeWidth={2} aria-hidden="true" />,
							}[header.column.getIsSorted() as string] ?? <ChevronUp className="h-4 shrink-0 opacity-0 group-hover:opacity-60" strokeWidth={2} aria-hidden="true" />}
						</button>
					)}
				</div>
			) : (
				<div className="flex items-center gap-2">
					{isSomeSelected ? (
						<Checkbox
							icon={<Minus />} // Minus if some are selected
							checked={true}
							onChange={onSelectAllChange} // Toggle logic handled in parent
							size="md"
						/>
					) : (
						<Checkbox
							checked={selectAll} // True if all selected
							onChange={onSelectAllChange} // Toggle logic handled in parent
							size="md"
						/>
					)}
				</div>
			)}

			{resizable && header.column.getCanResize() && header.index !== header.headerGroup.headers.length - 1 && (
				<div
					onDoubleClick={() => header.column.resetSize()}
					onMouseDown={header.getResizeHandler()}
					onTouchStart={header.getResizeHandler()}
					className="user-select-none before:bg-border absolute -right-2 top-0 z-10 flex h-full w-4 cursor-col-resize touch-none justify-center before:absolute before:inset-y-0 before:w-px before:translate-x-px"
				/>
			)}
		</TableHead>
	)
}
// Resizable component for resizable headers
const DragAlongCell = function <TData>({
	cell,
	isLastVisibleColumn,
	selectedRows,
	onRowSelectChange,
	rowIndex,
}: {
	cell: Cell<TData, unknown>
	selectedRows: Set<number>
	onRowSelectChange: (rowIndex: number, checked: boolean) => void
	rowIndex: number
	isLastVisibleColumn?: boolean
}) {
	const { isDragging, setNodeRef, transform, transition } = useSortable({
		id: cell.column.id,
	})
	const { verticalLine } = useTableContext()

	const style: CSSProperties = {
		opacity: isDragging ? 0.8 : 1,
		position: "relative",
		transform: CSS.Translate.toString(transform),
		transition,
		background: "bg-elevation-negative",
		width: cell.column.getSize(),
		zIndex: isDragging ? 1 : 0,
	}

	return (
		<TableCell ref={setNodeRef} className={`truncate ${verticalLine && !isLastVisibleColumn ? "border-border border-r" : ""} `} style={style}>
			{cell.column.id === "select" ? (
				<div className="flex items-center">
					<Checkbox
						checked={selectedRows.has(rowIndex)}
						onChange={function (checked: boolean) {
							onRowSelectChange(rowIndex, checked)
						}}
						size="md"
					/>
				</div>
			) : (
				<span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
			)}
		</TableCell>
	)
}

export default MainTable
