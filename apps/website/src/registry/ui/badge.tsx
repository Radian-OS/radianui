"use client"

import { useState } from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
	Omit<VariantProps<typeof badgeVariants>, "size"> & {
		closable?: boolean
		size?: BadgeSize
	}
type BadgeSize = "20" | "24" | "28" | "32"

const badgeVariants = cva("inline-flex items-center font-medium box-border", {
	variants: {
		variant: {
			outline: "border",
			strong: "bg-primary text-white font-semibold",
		},
		size: {
			"20": "h-5 px-1.5 text-xs",
			"24": "h-6 px-2 text-sm",
			"28": "h-7 px-2.5 text-sm",
			"32": "h-8 px-3 text-sm",
		},
		rounded: {
			true: "rounded-full",
			false: "rounded-md",
		},
	},
	defaultVariants: {
		variant: "outline",
		size: "24",
		rounded: false,
	},
})

const iconSizeMap: Record<BadgeSize, string> = {
	"20": "size-3",
	"24": "size-3",
	"28": "size-4",
	"32": "size-4",
}

function Badge({ variant = "outline", size = "24", rounded = false, closable = false, className, children, ...props }: BadgeProps) {
	const [showBadge, setShowBadge] = useState(true)

	return (
		showBadge && (
			<div className={cn(badgeVariants({ variant, size, rounded }), className)} {...props}>
				<div className="flex items-center gap-1">
					{Array.isArray(children)
						? children.map((child, index) =>
								typeof child === "object" && "type" in child && (child.type === "svg" || typeof child.type === "function") ? (
									<span key={index} className="flex items-center">
										{child}
									</span>
								) : (
									child
								)
							)
						: children}
					{closable && (
						<X
							onClick={() => setShowBadge(false)}
							className={cn(variant === "outline" ? "text-text-secondary" : "text-white", iconSizeMap[size], "cursor-pointer font-extrabold")}
						/>
					)}
				</div>
			</div>
		)
	)
}

export { Badge }
