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
			className="group relative h-12 w-fit overflow-hidden rounded-full border border-transparent bg-white p-1 ps-6 pe-14 font-medium text-zinc-950 shadow-lg transition-all duration-500 hover:bg-white hover:ps-14 hover:pe-6">
			<Link href={buttonHref}>
				<span className="relative z-10 transition-all duration-500">
					{buttonText}
				</span>
				<span className="absolute right-1 flex size-10 items-center justify-center rounded-full bg-zinc-950 text-white transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
					<ArrowUpRight className="size-4" />
				</span>
			</Link>
		</Button>
	)
}
