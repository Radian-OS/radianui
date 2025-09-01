import React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type Props = React.ComponentProps<typeof SwitchPrimitive.Root> & {
	size?: "20" | "24"
}

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

function Switch({ className, size = "20", children, ...props }: Props) {
	return (
		<label className="flex items-center gap-2">
			<SwitchPrimitive.Root data-slot="switch" className={cn(rootStyles({ size }), className)} {...props}>
				<SwitchPrimitive.Thumb data-slot="switch-thumb" className={cn(thumbStyles({ size }))} />
			</SwitchPrimitive.Root>
			{children && <span className="select-none text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-50">{children}</span>}
		</label>
	)
}

export { Switch }
