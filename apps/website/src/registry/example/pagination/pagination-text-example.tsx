import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button, IconButton } from "@/registry/ui/button"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/registry/ui/pagination"

const PaginationTextExample = () => {
	return (
		<div className="flex items-center justify-center gap-2">
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<Button color="neutral" variant="ghost" asChild>
							<Link href="#">
								<ChevronLeft className="rtl:rotate-180" /> Preview
							</Link>
						</Button>
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
						<Button color="neutral" variant="ghost" asChild>
							<Link href="#">
								Next <ChevronRight className="rtl:rotate-180" />
							</Link>
						</Button>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}

export default PaginationTextExample
