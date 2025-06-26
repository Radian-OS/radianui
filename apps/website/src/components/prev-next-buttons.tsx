import React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getPrevNext } from "@/lib/get-prev-next"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function PreviousNextButtons({ currentPath, className }: { currentPath: string; className?: string }) {
	const { prev, next } = getPrevNext(currentPath)

	return (
		<div className={cn("flex items-center justify-between", className)}>
			<Link href={prev?.url ?? "#"} className={cn(!prev && "invisible")} aria-hidden={!prev}>
				<Button color="neutral" variant="soft" lead={<ArrowLeft />}>
					{prev?.title}
				</Button>
			</Link>

			<Link href={next?.url ?? "#"} className={cn(!next && "invisible")} aria-hidden={!next}>
				<Button color="neutral" variant="soft" trail={<ArrowRight />}>
					{next?.title}
				</Button>
			</Link>
		</div>
	)
}

export { PreviousNextButtons }
