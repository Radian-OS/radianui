"use client"

import { type HTMLAttributes, type ReactNode, useState } from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type BannerProps = HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof bannerVariants> & {
		children: ReactNode
		variant?: "primary" | "outline" | "gray" | "destructive"
		closable?: boolean
		className?: string
	}

const bannerVariants = cva("py-2 px-4 flex items-center justify-center gap-2.5 relative text-sm w-full", {
	variants: {
		variant: {
			gray: "bg-fill-level2",
			primary: "bg-primary text-static-white",
			outline: "bg-base  border-b",
			destructive: "bg-error text-static-white",
		},
	},
	defaultVariants: {
		variant: "gray",
	},
})

function Banner({ children, variant = "gray", closable, className = "", ...props }: BannerProps) {
	const [showBanner, setShowBanner] = useState(true)
	function getClosableVariant() {
		if (["primary", "destructive"].includes(variant)) {
			return "text-static-white"
		}
		if (["outline", "gray"].includes(variant)) {
			return "text-text-disabled"
		}
	}

	return (
		showBanner && (
			<div {...props} className={cn(bannerVariants({ variant }), className)}>
				{children}
				{closable && <X size={20} onClick={() => setShowBanner(false)} className={`${getClosableVariant()} absolute right-4 cursor-pointer`} />}
			</div>
		)
	)
}
export { Banner }
