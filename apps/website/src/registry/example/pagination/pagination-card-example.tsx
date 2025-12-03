import React from "react"
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { IconButton } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/registry/ui/pagination"

const PaginationCardExample = () => {
	return (
		<div className="flex items-center justify-center">
			<Card className="p-1">
				<Pagination>
					<PaginationContent className="p-1">
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
							<IconButton color="neutral" variant="ghost" asChild>
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
			</Card>
		</div>
	)
}

export default PaginationCardExample
