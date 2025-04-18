"use client"

import { HTMLAttributes, ReactNode, useState } from "react"
import { VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"

type BannerProps = HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof bannerVariants> & {
		children: ReactNode
		variant?: "dark" | "transparent" | "soft"
		closable?: boolean
	}

const bannerVariants = cva("py-2 px-4 flex items-center justify-center gap-2.5 relative text-sm w-full", {
	variants: {
		variant: {
			dark: "bg-black text-white",
			transparent: "bg-transparent border-b",
			soft: "bg-bg-level2",
		},
	},
	defaultVariants: {
		variant: "dark",
	},
})

function Banner({ children, variant = "dark", closable, ...props }: BannerProps) {
	const [showBanner, setShowBanner] = useState(true)

	return (
		showBanner && (
			<div {...props} className={bannerVariants({ variant })}>
				{children}
				{closable && <X size={16} onClick={() => setShowBanner(false)} className="stroke-text-tertiary absolute right-4 cursor-pointer" />}
			</div>
		)
	)
}
export { Banner }
