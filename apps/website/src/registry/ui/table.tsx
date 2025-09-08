"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
	return (
		<div data-slot="table-wrapper" className="relative w-full overflow-auto">
			<table data-slot="table" className={cn("text-fg w-full caption-bottom text-sm", className)} {...props} />
		</div>
	)
}

function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
	return <thead data-slot="table-header" className={cn("[&_tr]:border-b", className)} {...props} />
}

function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
	return <tbody data-slot="table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />
}

function TableFooter({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
	return <tfoot data-slot="table-footer" className={cn("bg-fg-tertiary border-t font-medium last:[&>tr]:border-b-0", className)} {...props} />
}

function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
	return <tr data-slot="table-row" className={cn("[&:has(td):hover]:bg-elevation-level2 data-[state=selected]:bg-fg-secondary border-b transition-colors", className)} {...props} />
}

function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
	return (
		<th
			data-slot="table-head"
			className={cn("text-fg-secondary h-10 px-2 text-left align-middle font-normal rtl:text-right [&:has([role=checkbox])]:pe-0", className)}
			{...props}
		/>
	)
}

function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
	return <td data-slot="table-cell" className={cn("px-2 py-4 align-middle [&:has([role=checkbox])]:pe-0", className)} {...props} />
}

function TableCaption({ className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>) {
	return <caption data-slot="table-caption" className={cn("text-fg mt-4 text-sm", className)} {...props} />
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
