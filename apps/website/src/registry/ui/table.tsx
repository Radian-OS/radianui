import * as React from "react"
import { cn } from "@/lib/utils"

export type TableProps = React.HTMLAttributes<HTMLTableElement>

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>

export type TableHeadProps = React.ComponentProps<"th">

export type TableCellProps = React.ComponentProps<"td">

export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>

function Table({ className, ...props }: TableProps) {
	return (
		<div data-slot="table-wrapper" className="relative w-full overflow-auto">
			<table
				data-slot="table"
				className={cn("text-fg w-full caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	)
}

Table.displayName = "Table"

function TableHeader({ className, ...props }: TableHeaderProps) {
	return (
		<thead
			data-slot="table-header"
			className={cn("[&_tr]:border-b", className)}
			{...props}
		/>
	)
}

TableHeader.displayName = "TableHeader"

function TableBody({ className, ...props }: TableBodyProps) {
	return (
		<tbody
			data-slot="table-body"
			className={cn("[&_tr:last-child]:border-0", className)}
			{...props}
		/>
	)
}
TableBody.displayName = "TableBody"

function TableFooter({ className, ...props }: TableFooterProps) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn(
				"bg-fg-tertiary border-t font-medium last:[&>tr]:border-b-0",
				className
			)}
			{...props}
		/>
	)
}
TableFooter.displayName = "TableFooter"

function TableRow({ className, ...props }: TableRowProps) {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				"[&:has(td):hover]:bg-fill1 data-[state=selected]:bg-fill1 border-b transition-colors",
				className
			)}
			{...props}
		/>
	)
}
TableRow.displayName = "TableRow"

function TableHead({ className, ...props }: TableHeadProps) {
	return (
		<th
			data-slot="table-head"
			className={cn(
				"text-fg-secondary bg-fill1 px-3 py-2.5 text-left align-middle font-medium has-[role=checkbox]:w-px [&:has([role=checkbox])]:pr-0",
				className
			)}
			{...props}
		/>
	)
}
TableHead.displayName = "TableHead"

function TableCell({ className, ...props }: TableCellProps) {
	return (
		<td
			data-slot="table-cell"
			className={cn(
				"p-3 align-middle [&:has([role=checkbox])]:pr-0",
				className
			)}
			{...props}
		/>
	)
}
TableCell.displayName = "TableCell"

function TableCaption({ className, ...props }: TableCaptionProps) {
	return (
		<caption
			data-slot="table-caption"
			className={cn("text-fg mt-4 text-sm", className)}
			{...props}
		/>
	)
}
TableCaption.displayName = "TableCaption"

export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
}
