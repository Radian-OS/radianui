import * as React from "react"
import { MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

export type PaginationProps = React.ComponentProps<"nav">
export type PaginationContentProps = React.ComponentProps<"ul">
export type PaginationItemProps = React.ComponentProps<"li">
export type PaginationEllipsisProps = React.ComponentProps<"span">

function Pagination({ className, ...props }: PaginationProps) {
	return (
		<nav
			data-slot="pagination"
			role="navigation"
			aria-label="pagination"
			className={cn("mx-auto flex w-full justify-center", className)}
			{...props}
		/>
	)
}
Pagination.displayName = "Pagination"

function PaginationContent({ className, ...props }: PaginationContentProps) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn("flex flex-row items-center gap-1", className)}
			{...props}
		/>
	)
}
PaginationContent.displayName = "PaginationContent"

function PaginationItem({ className, ...props }: PaginationItemProps) {
	return <li data-slot="pagination-item" className={cn(className)} {...props} />
}
PaginationItem.displayName = "PaginationItem"

function PaginationEllipsis({ className, ...props }: PaginationEllipsisProps) {
	return (
		<span
			data-slot="pagination-ellipsis"
			aria-hidden
			className={cn("flex h-9 w-9 items-center justify-center", className)}
			{...props}>
			<MoreHorizontal className="text-fg-secondarys h-4 w-4" />
			<span className="sr-only">More pages</span>
		</span>
	)
}
PaginationEllipsis.displayName = "PaginationEllipsis"

export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem }
