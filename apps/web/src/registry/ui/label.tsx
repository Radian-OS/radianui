"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { LabelProps } from "@radix-ui/react-label"
import { cn } from "@/lib/utils"

// Label component definition
function Label({ className, ...props }: LabelProps & React.RefAttributes<HTMLLabelElement>) {
	return <LabelPrimitive.Root className={cn("text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props} />
}
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
