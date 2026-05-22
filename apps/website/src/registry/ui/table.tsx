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
				className={cn("r-table cn-table w-full caption-bottom", className)}
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
			className={cn("r-table-header cn-table-header", className)}
			{...props}
		/>
	)
}
TableHeader.displayName = "TableHeader"
function TableBody({ className, ...props }: TableBodyProps) {
	return (
		<tbody
			data-slot="table-body"
			className={cn("r-table-body cn-table-body", className)}
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
				"r-table-footer cn-table-footer font-medium last:[&>tr]:border-b-0",
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
				"r-table-row cn-table-row border-b transition-colors",
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
				"r-table-head cn-table-head text-left align-middle has-[role=checkbox]:w-px [&:has([role=checkbox])]:pr-0",
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
				"r-table-cell cn-table-cell align-middle [&:has([role=checkbox])]:pr-0",
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
			className={cn("r-table-caption cn-table-caption", className)}
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
