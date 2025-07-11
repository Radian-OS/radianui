import React from "react"
import { VariantProps } from "class-variance-authority"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/ui/button"

type EarlyAccessButtonProps = VariantProps<typeof buttonVariants> & {
	className?: string
}

function EarlyAccessButton({ size = "36", variant = "strong", color = "primary", className }: EarlyAccessButtonProps) {
	return (
		<Link
			href={"#"}
			className={cn(
				buttonVariants({ size: size, variant: variant, color: color }),
				"border-primary-hover border bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-[0px_4px_4px_rgba(24,25,27,0.16),0px_0px_0px_1.5px_#5B3FE0] hover:from-[#6A52F2] hover:to-[#5B3FE0]",
				className
			)}>
			Early Access
		</Link>
	)
}

export default EarlyAccessButton
