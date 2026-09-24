"use client"

import * as React from "react"
import { type ReactNode, isValidElement } from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { type VariantProps, cva } from "class-variance-authority"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

export type SelectContextType = {
	indicatorPosition?: "left" | "right"
	indicatorVisibility?: boolean
	indicator?: ReactNode
}

export type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root> &
	SelectContextType

export type SelectTriggerProps = React.ComponentProps<
	typeof SelectPrimitive.SelectTrigger
> &
	VariantProps<typeof selectTriggerVariants>

export type SelectGroupProps = React.ComponentProps<
	typeof SelectPrimitive.Group
>

export type SelectValueProps = React.ComponentProps<
	typeof SelectPrimitive.Value
>

export type SelectScrollUpButtonProps = React.ComponentProps<
	typeof SelectPrimitive.ScrollUpButton
>

export type SelectScrollDownButtonProps = React.ComponentProps<
	typeof SelectPrimitive.ScrollDownButton
>

export type SelectContentProps = React.ComponentProps<
	typeof SelectPrimitive.Content
>

export type SelectLabelProps = React.ComponentProps<
	typeof SelectPrimitive.Label
>

export type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item>

export type SelectIndicatorProps = React.ComponentProps<
	typeof SelectPrimitive.ItemIndicator
>

export type SelectDividerProps = React.ComponentProps<
	typeof SelectPrimitive.Separator
>

const SelectContext = React.createContext<SelectContextType | null>(null)

const selectTriggerVariants = cva(
	`
    flex bg-bg w-full items-center outline-none border border-border shadow-xs shadow-black/5 transition-shadow 
    text-fg data-placeholder:text-fg-tertiary focus-visible:ring-primary-focus  focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 
    disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 
    aria-invalid:border-error aria-invalid:ring-error
    [[data-invalid=true]_&]:border-error [[data-invalid=true]_&]:ring-error
  `,
	{
		variants: {
			size: {
				"28": "gap-0.5 h-7 px-2 py-1.5 text-[13px] rounded-md",
				"32": "gap-0.5 h-8 px-2 py-1.5 text-sm rounded-md",
				"36": "gap-1 h-9 px-2.5 py-2 text-sm rounded-lg",
				"40": "gap-1 h-10 px-3 py-2.5 text-sm rounded-lg",
				"44": "gap-1 h-11 px-3 py-2.5 text-base rounded-lg",
				"48": "gap-1 h-12 px-3.5 py-3 text-base rounded-lg",
			},
		},
		defaultVariants: {
			size: "36",
		},
	}
)

function useSelect() {
	const context = React.useContext(SelectContext)
	if (!context) {
		throw new Error("useSelect must be used within a <Select />")
	}
	return context
}

const Select = ({
	indicatorPosition = "right",
	indicatorVisibility = true,
	indicator,
	...props
}: SelectProps) => {
	return (
		<SelectContext.Provider
			value={{ indicatorPosition, indicatorVisibility, indicator }}>
			<SelectPrimitive.Root {...props} />
		</SelectContext.Provider>
	)
}

function SelectGroup({ ...props }: SelectGroupProps) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({ ...props }: SelectValueProps) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
	className,
	children,
	size,
	...props
}: SelectTriggerProps) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			className={cn(selectTriggerVariants({ size }), className)}
			{...props}>
			{children}
			<SelectPrimitive.Icon asChild>
				<ChevronDown className="-me-0.5 ml-auto size-5 opacity-60" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	)
}

function SelectScrollUpButton({
	className,
	...props
}: SelectScrollUpButtonProps) {
	return (
		<SelectPrimitive.ScrollUpButton
			data-slot="select-scroll-up-button"
			className={cn(
				"flex cursor-default items-center justify-center py-1",
				className
			)}
			{...props}>
			<ChevronUp className="h-4 w-4" />
		</SelectPrimitive.ScrollUpButton>
	)
}

function SelectScrollDownButton({
	className,
	...props
}: SelectScrollDownButtonProps) {
	return (
		<SelectPrimitive.ScrollDownButton
			data-slot="select-scroll-down-button"
			className={cn(
				"flex cursor-default items-center justify-center py-1",
				className
			)}
			{...props}>
			<ChevronDown className="h-4 w-4" />
		</SelectPrimitive.ScrollDownButton>
	)
}

function SelectContent({
	className,
	children,
	position = "popper",
	...props
}: SelectContentProps) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				data-slot="select-content"
				className={cn(
					"border-border bg-elevation-level2 text-fg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md shadow-black/5",
					position === "popper" &&
						"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1.5 data-[side=right]:translate-x-1.5 data-[side=top]:-translate-y-1",
					className
				)}
				position={position}
				{...props}>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(
						"p-1.5",
						position === "popper" &&
							"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
					)}>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	)
}

function SelectLabel({ className, ...props }: SelectLabelProps) {
	return (
		<SelectPrimitive.Label
			data-slot="select-label"
			className={cn(
				"text-fg px-2 py-1.5 text-xs font-medium uppercase",
				className
			)}
			{...props}
		/>
	)
}

function SelectItem({ className, children, ...props }: SelectItemProps) {
	const { indicatorPosition, indicatorVisibility, indicator } = useSelect()

	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				"text-fg focus:bg-fill1-alpha relative flex w-full cursor-pointer items-center rounded-sm py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50",
				indicatorPosition === "left" ? "ps-8 pe-2" : "ps-2 pe-8",
				className
			)}
			{...props}>
			{indicatorVisibility &&
				(indicator && isValidElement(indicator) ? (
					indicator
				) : (
					<span
						className={cn(
							"absolute flex size-4 items-center justify-center",
							indicatorPosition === "left" ? "start-2" : "end-2"
						)}>
						<SelectPrimitive.ItemIndicator>
							<Check className="text-fg-secondary size-5" />
						</SelectPrimitive.ItemIndicator>
					</span>
				))}
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	)
}

function SelectIndicator({
	children,
	className,
	...props
}: SelectIndicatorProps) {
	const { indicatorPosition } = useSelect()

	return (
		<span
			data-slot="select-indicator"
			className={cn(
				"absolute top-1/2 flex -translate-y-1/2 items-center justify-center",
				indicatorPosition === "left" ? "start-2" : "end-2",
				className
			)}
			{...props}>
			<SelectPrimitive.ItemIndicator>{children}</SelectPrimitive.ItemIndicator>
		</span>
	)
}

function SelectDivider({ className, ...props }: SelectDividerProps) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn("bg-border -mx-1.5 my-1.5 h-px", className)}
			{...props}
		/>
	)
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectIndicator,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectDivider,
	SelectTrigger,
	SelectValue,
}
