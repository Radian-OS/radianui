import React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/styles/default/ui/button"

interface AnimatedCtaButtonProps {
	buttonText?: string
	buttonHref?: string
}

export function AnimatedCtaButton({
	buttonText = "Start your project",
	buttonHref = "#start",
}: AnimatedCtaButtonProps) {
	return (
		<Button
			asChild
			variant="strong"
			color="neutral"
			size="48"
			className="group bg-fg text-bg hover:bg-fg relative h-12 w-fit overflow-hidden rounded-full border border-transparent p-1 ps-6 pe-14 font-medium shadow-lg transition-all duration-500 hover:ps-14 hover:pe-6">
			<Link href={buttonHref}>
				<span className="relative z-10 transition-all duration-500">
					{buttonText}
				</span>
				<span className="bg-bg text-fg absolute right-1 flex size-10 items-center justify-center rounded-full transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
					<ArrowUpRight className="size-4" />
				</span>
			</Link>
		</Button>
	)
}
