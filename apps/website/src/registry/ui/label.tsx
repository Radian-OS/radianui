"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "@/lib/utils"

export type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root>

function Label({ className, ...props }: LabelProps) {
	return <LabelPrimitive.Root className={cn("peer-disabled:text-fg-tertiary text-sm font-medium peer-disabled:cursor-not-allowed", className)} {...props} />
}
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
