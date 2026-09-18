"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
	[
		"group/toggle cursor-pointer inline-flex items-center justify-center whitespace-nowrap font-medium",
		"focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
		"disabled:pointer-events-none disabled:opacity-50",
		"[&_svg]:pointer-events-none [&_svg]:shrink-0",
		"outline-none transition-colors",
		"aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error-border",
	].join(" "),
	{
		variants: {
			variant: {
				ghost:
					"text-fg hover:bg-fill1 focus-visible:ring-border bg-transparent" +
					" data-[state=on]:bg-fill1 data-[state=on]:text-fg data-[state=on]:border-transparent",
				outline:
					"border-border text-fg hover:bg-fill1-alpha focus-visible:ring-border border bg-transparent" +
					" data-[state=on]:bg-fill1 data-[state=on]:text-fg data-[state=on]:border-fill4",
			},
			size: {
				"28": "h-7 gap-1 rounded-md px-2 py-1.5 text-[13px] [&>svg]:size-4",
				"32": "h-8 gap-1.5 rounded-md px-2.5 py-1.5 text-sm [&>svg]:size-4.5",
				"36": "h-9 gap-2 rounded-lg px-3 py-2 text-sm [&>svg]:size-5",
				"40": "h-10 gap-2 rounded-lg px-3 py-2.5 text-sm [&>svg]:size-5",
				"44": "h-11 gap-2 rounded-lg px-3 py-2.5 text-base [&>svg]:size-5",
				"48": "h-12 gap-2 rounded-lg px-4 py-3 text-base [&>svg]:size-6",
			},
		},
		defaultVariants: {
			variant: "outline",
			size: "36",
		},
	}
)

function Toggle({
	className,
	variant = "outline",
	size = "36",
	...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
	VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive.Root
			data-slot="toggle"
			className={cn(toggleVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Toggle, toggleVariants }
