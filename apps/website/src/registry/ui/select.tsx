"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { IconSlot } from "@/registry/icon-library"

export type SelectContextType = {
	indicatorPosition?: "left" | "right"
	indicatorVisibility?: boolean
	indicator?: React.ReactNode
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
	"cn-select-trigger flex w-full items-center outline-none transition-shadow [&>span]:line-clamp-1",
	{
		variants: {
			size: {
				"28": "cn-select-trigger-28 gap-0.5",
				"32": "cn-select-trigger-32 gap-0.5",
				"36": "cn-select-trigger-36 gap-1",
				"40": "cn-select-trigger-40 gap-1",
				"44": "cn-select-trigger-44 gap-1",
				"48": "cn-select-trigger-48 gap-1",
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
				<IconSlot slot="down" className="-me-0.5 ml-auto size-5 opacity-60" />
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
				"cn-select-scroll-button flex cursor-default items-center justify-center",
				className
			)}
			{...props}>
			<IconSlot slot="up" className="h-4 w-4" />
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
				"cn-select-scroll-button flex cursor-default items-center justify-center",
				className
			)}
			{...props}>
			<IconSlot slot="down" className="h-4 w-4" />
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
					"cn-select-content data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) relative z-50 overflow-y-auto overflow-x-hidden",
					position === "popper" &&
						"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1.5 data-[side=right]:translate-x-1.5 data-[side=top]:-translate-y-1",
					className
				)}
				position={position}
				{...props}>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(
						"cn-select-viewport",
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
			className={cn("cn-select-label", className)}
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
				"cn-select-item outline-hidden relative flex w-full cursor-pointer select-none items-center",
				indicatorPosition === "left" ? "pe-2 ps-8" : "pe-8 ps-2",
				className
			)}
			{...props}>
			{indicatorVisibility &&
				(indicator && React.isValidElement(indicator) ? (
					indicator
				) : (
					<span
						className={cn(
							"absolute flex size-4 items-center justify-center",
							indicatorPosition === "left" ? "start-2" : "end-2"
						)}>
						<SelectPrimitive.ItemIndicator>
							<IconSlot slot="check" className="text-fg-secondary size-5" />
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
			className={cn("cn-select-divider -mx-1.5 my-1.5 h-px", className)}
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
