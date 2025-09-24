import React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & VariantProps<typeof rootStyles>

const rootStyles = cva(
	"bg-fill3 data-[state=checked]:bg-primary peer inline-flex shrink-0 items-center rounded-full transition-all disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:focus-visible:ring-border data-[state=checked]:focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 outline-none cursor-pointer",
	{
		variants: {
			size: {
				"20": "w-8.5 h-5",
				"24": "w-10.5 h-6",
			},
		},
		defaultVariants: {
			size: "24",
		},
	}
)

const thumbStyles = cva("block rounded-full bg-white transition-transform data-[state=unchecked]:translate-x-[3px]", {
	variants: {
		size: {
			"20": "size-3.5 data-[state=checked]:translate-x-4",
			"24": "size-4.5 data-[state=checked]:translate-x-5",
		},
	},
	defaultVariants: {
		size: "24",
	},
})

function Switch({ className, size = "24", ...props }: SwitchProps) {
	return (
		<SwitchPrimitive.Root data-slot="switch" className={cn(rootStyles({ size }), className)} {...props}>
			<SwitchPrimitive.Thumb data-slot="switch-thumb" className={thumbStyles({ size })} />
		</SwitchPrimitive.Root>
	)
}

export { Switch }
