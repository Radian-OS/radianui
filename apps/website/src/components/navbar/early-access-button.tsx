import React, { ComponentProps } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

type EarlyAccessButtonProps = {
	size?: ComponentProps<typeof Button>["size"]
	variant?: ComponentProps<typeof Button>["variant"]
	className?: string
}

function EarlyAccessButton({ size, variant, className }: EarlyAccessButtonProps) {
	return (
		<Button
			size={size ?? "36"}
			variant={variant ?? "strong"}
			color={"primary"}
			className={cn(
				"border-primary-hover border bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-[0px_4px_4px_rgba(24,25,27,0.16),0px_0px_0px_1.5px_#5B3FE0] hover:from-[#6A52F2] hover:to-[#5B3FE0]",
				className
			)}
			asChild>
			<Link href={"#"}>Early Access</Link>
		</Button>
	)
}

export default EarlyAccessButton
