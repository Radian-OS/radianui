import React from "react"
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { IconButton } from "@/registry/ui/button"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/registry/ui/pagination"

function PaginationExamplePreview() {
	return (
		<div className="flex items-center justify-center">
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<IconButton color="neutral" variant="ghost" asChild disabled>
							<Link href="#">
								<ChevronFirst className="rtl:rotate-180" />
							</Link>
						</IconButton>
					</PaginationItem>
					<PaginationItem>
						<IconButton color="neutral" variant="ghost" asChild disabled>
							<Link href="#">
								<ChevronLeft className="rtl:rotate-180" />
							</Link>
						</IconButton>
					</PaginationItem>
					<PaginationItem>
						<IconButton color="neutral" variant="ghost" asChild>
							<Link href="#">1</Link>
						</IconButton>
					</PaginationItem>
					<PaginationItem>
						<IconButton color="neutral" variant="outline" asChild>
							<Link href="#">2</Link>
						</IconButton>
					</PaginationItem>
					<PaginationItem>
						<IconButton color="neutral" variant="ghost" asChild>
							<Link href="#">3</Link>
						</IconButton>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<IconButton color="neutral" variant="ghost" asChild>
							<Link href="#">
								<ChevronRight className="rtl:rotate-180" />
							</Link>
						</IconButton>
					</PaginationItem>
					<PaginationItem>
						<IconButton color="neutral" variant="ghost" asChild>
							<Link href="#">
								<ChevronLast className="rtl:rotate-180" />
							</Link>
						</IconButton>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}

export default PaginationExamplePreview
