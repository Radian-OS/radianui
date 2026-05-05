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
	"flex w-full items-center outline-none transition-shadow [&>span]:line-clamp-1 border-border text-fg data-placeholder:text-fg-tertiary focus-visible:ring-primary-focus focus-visible:border-primary aria-invalid:border-error aria-invalid:ring-error [[data-invalid=true]_&]:border-error [[data-invalid=true]_&]:ring-error border-b bg-transparent shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			size: {
				"28": "gap-0.5 h-7 rounded-none px-3 py-1.5 text-[13px]",
				"32": "gap-0.5 h-8 rounded-none px-3 py-1.5 text-sm",
				"36": "gap-1 h-9 rounded-none px-3.5 py-2 text-sm",
				"40": "gap-1 h-10 rounded-none px-4 py-2.5 text-sm",
				"44": "gap-1 h-11 rounded-none px-4 py-2.5 text-base",
				"48": "gap-1 px-4.5 h-12 rounded-none py-3 text-base",
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
				"flex cursor-default items-center justify-center py-1.5",
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
				"flex cursor-default items-center justify-center py-1.5",
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
					"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) border-border bg-popover text-fg relative z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-none border shadow-none",
					position === "popper" &&
						"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1.5 data-[side=right]:translate-x-1.5 data-[side=top]:-translate-y-1",
					className
				)}
				position={position}
				{...props}>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(
						"p-2",
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
				"text-fg px-3 py-2 text-xs font-medium uppercase",
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
				"outline-hidden focus:bg-fill2-alpha data-disabled:pointer-events-none data-disabled:opacity-50 relative flex w-full cursor-pointer select-none items-center rounded-none py-2 text-sm",
				indicatorPosition === "left" ? "pe-2 ps-8" : "pe-8 ps-2",
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
