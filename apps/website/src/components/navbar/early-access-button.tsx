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
		<Button size={size ?? "36"} variant={variant ?? "smooth"} color={"primary"} className={cn(className)} asChild>
			<Link href={"#"}>Early Access</Link>
		</Button>
	)
}

export default EarlyAccessButton
