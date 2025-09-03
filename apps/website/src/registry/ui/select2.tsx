"use client"

import * as React from "react"
import { ReactNode, isValidElement } from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { VariantProps, cva } from "class-variance-authority"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

// Create a Context for `indicatorPosition` and `indicator` control
const SelectContext = React.createContext<{
	indicatorPosition: "left" | "right"
	indicatorVisibility: boolean
	indicator: ReactNode
}>({ indicatorPosition: "left", indicator: null, indicatorVisibility: true })

// Root Component
const Select = ({
	indicatorPosition = "right",
	indicatorVisibility = true,
	indicator,
	...props
}: {
	indicatorPosition?: "left" | "right"
	indicatorVisibility?: boolean
	indicator?: ReactNode
} & React.ComponentProps<typeof SelectPrimitive.Root>) => {
	return (
		<SelectContext.Provider value={{ indicatorPosition, indicatorVisibility, indicator }}>
			<SelectPrimitive.Root {...props} />
		</SelectContext.Provider>
	)
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

// Define size variants for SelectTrigger
const selectTriggerVariants = cva(
	`
    flex bg-background w-full items-center justify-between outline-none border border-alpha shadow-xs shadow-black/5 transition-shadow 
    text-fg data-placeholder:text-fg-tertiary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40
    focus-visible:ring-offset-primary disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 
    aria-invalid:border-error/60 aria-invalid:ring-error/10 dark:aria-invalid:border-error dark:aria-invalid:ring-error/20
    [[data-invalid=true]_&]:border-error/60 [[data-invalid=true]_&]:ring-error/10  dark:[[data-invalid=true]_&]:border-error dark:[[data-invalid=true]_&]:ring-error/20
  `,
	{
		variants: {
			size: {
				sm: "h-7 px-2.5 text-xs gap-1 rounded-md",
				md: "h-9 px-2.5 text-sm leading-(--text-sm--line-height) gap-1 rounded-md",
				lg: "h-11 px-4 text-sm gap-1.5 rounded-md",
			},
		},
		defaultVariants: {
			size: "md",
		},
	}
)

export interface SelectTriggerProps extends React.ComponentProps<typeof SelectPrimitive.Trigger>, VariantProps<typeof selectTriggerVariants> {}

function SelectTrigger({ className, children, size, ...props }: SelectTriggerProps) {
	return (
		<SelectPrimitive.Trigger data-slot="select-trigger" className={cn(selectTriggerVariants({ size }), className)} {...props}>
			{children}
			<SelectPrimitive.Icon asChild>
				<ChevronDown className="-me-0.5 size-5 opacity-60" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	)
}

function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
	return (
		<SelectPrimitive.ScrollUpButton data-slot="select-scroll-up-button" className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
			<ChevronUp className="h-4 w-4" />
		</SelectPrimitive.ScrollUpButton>
	)
}

function SelectScrollDownButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
	return (
		<SelectPrimitive.ScrollDownButton data-slot="select-scroll-down-button" className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
			<ChevronDown className="h-4 w-4" />
		</SelectPrimitive.ScrollDownButton>
	)
}

function SelectContent({ className, children, position = "popper", ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				data-slot="select-content"
				className={cn(
					"border-border bg-elevation-level2 text-fg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md shadow-black/5",
					position === "popper" && "data-[side=bottom]:translate-y-1.5 data-[side=left]:-translate-x-1.5 data-[side=right]:translate-x-1.5 data-[side=top]:-translate-y-1.5",
					className
				)}
				position={position}
				{...props}>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport className={cn("p-1.5", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]")}>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	)
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
	return <SelectPrimitive.Label data-slot="select-label" className={cn("text-fg px-2 py-1.5 text-xs font-medium uppercase", className)} {...props} />
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
	const { indicatorPosition, indicatorVisibility, indicator } = React.useContext(SelectContext)

	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				"outline-hidden text-fg hover:bg-fill2 focus:bg-fill2 data-disabled:pointer-events-none data-disabled:opacity-50 relative flex w-full cursor-default cursor-pointer select-none items-center rounded-sm py-1.5 text-sm",
				indicatorPosition === "left" ? "pe-2 ps-8" : "pe-8 ps-2",
				className
			)}
			{...props}>
			{indicatorVisibility &&
				(indicator && isValidElement(indicator) ? (
					indicator
				) : (
					<span className={cn("absolute flex size-4 items-center justify-center", indicatorPosition === "left" ? "start-2" : "end-2")}>
						<SelectPrimitive.ItemIndicator>
							<Check className="text-fg-secondary size-5" />
						</SelectPrimitive.ItemIndicator>
					</span>
				))}
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	)
}

function SelectIndicator({ children, className, ...props }: React.ComponentProps<typeof SelectPrimitive.ItemIndicator>) {
	const { indicatorPosition } = React.useContext(SelectContext)

	return (
		<span
			data-slot="select-indicator"
			className={cn("absolute top-1/2 flex -translate-y-1/2 items-center justify-center", indicatorPosition === "left" ? "start-2" : "end-2", className)}
			{...props}>
			<SelectPrimitive.ItemIndicator>{children}</SelectPrimitive.ItemIndicator>
		</span>
	)
}

function SelectDivider({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
	return <SelectPrimitive.Separator data-slot="select-separator" className={cn("bg-border -mx-1.5 my-1.5 h-px", className)} {...props} />
}

export { Select, SelectContent, SelectGroup, SelectIndicator, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectDivider, SelectTrigger, SelectValue }
