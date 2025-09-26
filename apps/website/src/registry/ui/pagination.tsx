"use client"

import * as React from "react"
import { MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
	<nav data-slot="pagination" role="navigation" aria-label="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />
)
Pagination.displayName = "Pagination"

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
	return <ul data-slot="pagination-content" className={cn("flex flex-row items-center gap-1", className)} {...props} />
}
PaginationContent.displayName = "PaginationContent"

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
	return <li data-slot="pagination-item" className={cn("", className)} {...props} />
}
PaginationItem.displayName = "PaginationItem"

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
	<span data-slot="pagination-ellipsis" aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
		<MoreHorizontal className="h-4 w-4" />
		<span className="sr-only">More pages</span>
	</span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem }
