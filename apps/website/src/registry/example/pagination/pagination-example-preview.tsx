import React from "react"
import Link from "next/link"
import { IconSlot } from "@/registry/icon/icon-library"
import { IconButton } from "@/registry/ui/button"
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
} from "@/registry/ui/pagination"

function PaginationExamplePreview() {
	return (
		<div className="flex items-center justify-center">
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<IconButton
							aria-label="First Page"
							color="neutral"
							variant="ghost"
							asChild
							disabled>
							<Link href="#">
								<IconSlot slot="chevron-first" className="rtl:rotate-180" />
							</Link>
						</IconButton>
					</PaginationItem>
					<PaginationItem>
						<IconButton
							aria-label="Previous Page"
							color="neutral"
							variant="ghost"
							asChild
							disabled>
							<Link href="#">
								<IconSlot slot="left" className="rtl:rotate-180" />
							</Link>
						</IconButton>
					</PaginationItem>
					<PaginationItem>
						<IconButton
							aria-label="Page 1"
							color="neutral"
							variant="ghost"
							asChild>
							<Link href="#">1</Link>
						</IconButton>
					</PaginationItem>
					<PaginationItem>
						<IconButton
							aria-label="Page 2"
							color="neutral"
							variant="outline"
							asChild>
							<Link href="#">2</Link>
						</IconButton>
					</PaginationItem>
					<PaginationItem>
						<IconButton
							aria-label="Page 3"
							color="neutral"
							variant="ghost"
							asChild>
							<Link href="#">3</Link>
						</IconButton>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<IconButton
							aria-label="Next Page"
							color="neutral"
							variant="ghost"
							asChild>
							<Link href="#">
								<IconSlot slot="right" className="rtl:rotate-180" />
							</Link>
						</IconButton>
					</PaginationItem>
					<PaginationItem>
						<IconButton
							aria-label="Last Page"
							color="neutral"
							variant="ghost"
							asChild>
							<Link href="#">
								<IconSlot slot="chevron-last" className="rtl:rotate-180" />
							</Link>
						</IconButton>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}

export default PaginationExamplePreview
