import React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getPrevNext } from "@/lib/get-prev-next"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/button"

function PreviousNextIconButtons({
	currentPath,
	className,
}: {
	currentPath: string
	className?: string
}) {
	const { prev, next } = getPrevNext(currentPath)

	return (
		<div className={cn("flex items-center gap-2", className)}>
			{prev ? (
				<IconButton
					asChild
					color="neutral"
					size="28"
					variant="outline"
					aria-label="Previous page">
					<Link href={prev.url}>
						<ArrowLeft className="size-4" />
					</Link>
				</IconButton>
			) : (
				<IconButton
					color="neutral"
					size="28"
					variant="outline"
					disabled
					aria-label="Previous page">
					<ArrowLeft className="size-4" />
				</IconButton>
			)}
			{next ? (
				<IconButton
					asChild
					color="neutral"
					size="28"
					variant="outline"
					aria-label="Next page">
					<Link href={next.url}>
						<ArrowRight className="size-4" />
					</Link>
				</IconButton>
			) : (
				<IconButton
					color="neutral"
					size="28"
					variant="outline"
					disabled
					aria-label="Next page">
					<ArrowRight className="size-4" />
				</IconButton>
			)}
		</div>
	)
}

export { PreviousNextIconButtons }
