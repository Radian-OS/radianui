import React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getPrevNext } from "@/lib/get-prev-next"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function PreviousNextButtons({
	currentPath,
	className,
}: {
	currentPath: string
	className?: string
}) {
	const { prev, next } = getPrevNext(currentPath)

	return (
		<footer className={cn("flex items-center justify-between", className)}>
			<Button asChild color="neutral" size={"36"} variant="outline">
				<Link
					href={prev?.url ?? "#"}
					className={cn(!prev && "invisible")}
					aria-hidden={!prev}>
					<span className="inline-flex items-center gap-2">
						<ArrowLeft className="size-4" />
						<span>{prev?.title}</span>
					</span>
				</Link>
			</Button>

			<Button asChild color="neutral" size={"36"} variant="outline">
				<Link
					href={next?.url ?? "#"}
					className={cn(!next && "invisible")}
					aria-hidden={!next}>
					<span className="inline-flex items-center gap-2">
						<span>{next?.title}</span>
						<ArrowRight className="size-4" />
					</span>
				</Link>
			</Button>
		</footer>
	)
}

export { PreviousNextButtons }
