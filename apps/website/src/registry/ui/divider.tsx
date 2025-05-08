import React from "react"
import { cn } from "@/lib/utils"

type Orientation = "horizontal" | "vertical"
type Spacing = "2" | "4" | "6" | "8" | "12" | "16" | "24" | "32" | "40" | "80" | "120"

type DividerProps = React.HTMLAttributes<HTMLDivElement> & {
	orientation?: Orientation
	spacing?: Spacing
	className?: string
}

function Divider({ orientation = "horizontal", spacing = "4", className, ...props }: DividerProps) {
	const spacingValue = parseInt(spacing)

	return (
		<div
			role="separator"
			aria-orientation={orientation}
			style={{
				margin: orientation === "horizontal" ? `${spacingValue}px 0` : `0 ${spacingValue}px`,
			}}
			className={cn(orientation === "horizontal" ? "h-0.25 w-full" : "w-0.25 h-full", "bg-border-alpha", className)}
			{...props}
		/>
	)
}

Divider.displayName = "Divider"

export { Divider }
