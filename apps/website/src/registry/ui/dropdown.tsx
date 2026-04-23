"use client"

import React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type DropdownContextType = {
	indicatorPosition?: "left" | "right"
	indicator?: React.ReactNode
}

export type DropdownProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Root
> &
	DropdownContextType

export type DropdownTriggerProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Trigger
>

export type DropdownContentProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Content
> &
	React.RefAttributes<HTMLDivElement>

export type DropdownItemProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Item
> & {
	inset?: boolean
}

export type DropdownCheckboxItemProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.CheckboxItem
>

export type DropdownRadioGroupProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.RadioGroup
>

export type DropdownRadioItemProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.RadioItem
>

export type DropdownGroupProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Group
>

export type DropdownSubProps = React.ComponentPropsWithoutRef<
	typeof DropdownMenuPrimitive.Sub
>

export type DropdownSubTriggerProps = React.ComponentPropsWithRef<
	typeof DropdownMenuPrimitive.SubTrigger
> & {
	inset?: boolean
}

export type DropdownSubContentProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.SubContent
>

export type DropdownLabelProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Label
> & {
	inset?: boolean
}

export type DropdownShortcutProps = React.HTMLAttributes<HTMLSpanElement>

export type DropdownDividerProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Separator
>

export type DropdownPortalProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.DropdownMenuPortal
>

const DropdownContext = React.createContext<DropdownContextType | null>(null)

function useDropdown() {
	const context = React.useContext(DropdownContext)
	if (!context) {
		throw new Error("useDropdown must be used within a <Dropdown />")
	}
	return context
}

function Dropdown({
	indicatorPosition = "right",
	indicator,
	...props
}: DropdownProps) {
	return (
		<DropdownContext.Provider
			value={{ indicatorPosition: indicatorPosition ?? "right", indicator }}>
			<DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
		</DropdownContext.Provider>
	)
}

function DropdownTrigger({ className, ...props }: DropdownTriggerProps) {
	return (
		<DropdownMenuPrimitive.Trigger
			data-slot="dropdown-menu-trigger"
			className={cn("cn-dropdown-trigger", className)}
			{...props}
		/>
	)
}

function DropdownContent({ className, ...props }: DropdownContentProps) {
	return (
		<DropdownMenuPrimitive.Content
			data-slot="dropdown-menu-content"
			align="start"
			className={cn(
				"cn-dropdown-content",
				"no-scrollbar z-50 flex flex-col overflow-x-visible overflow-y-scroll",
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				className
			)}
			sideOffset={4}
			{...props}
		/>
	)
}

function DropdownPortal({ ...props }: DropdownPortalProps) {
	return <DropdownMenuPrimitive.Portal {...props} />
}

function DropdownItem({ className, inset, ...props }: DropdownItemProps) {
	return (
		<DropdownMenuPrimitive.Item
			data-slot="dropdown-menu-item"
			className={cn(
				"cn-dropdown-item",
				"relative flex w-full cursor-pointer select-none items-center",
				"outline-hidden transition-colors",
				"data-disabled:pointer-events-none",
				"[&_svg]:pointer-events-none [&_svg]:shrink-0",
				inset && "cn-dropdown-item-inset",
				className
			)}
			{...props}
		/>
	)
}

function DropdownCheckboxItem({
	children,
	className,
	...props
}: DropdownCheckboxItemProps) {
	const { indicatorPosition, indicator } = useDropdown()

	return (
		<DropdownMenuPrimitive.CheckboxItem
			data-slot="dropdown-menu-checkbox-item"
			className={cn(
				"cn-dropdown-checkbox-item",
				"flex w-full cursor-pointer select-none items-center",
				"outline-hidden",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				"[&_svg]:pointer-events-none [&_svg]:shrink-0",
				indicatorPosition === "left"
					? "cn-dropdown-checkbox-item-indicator-left"
					: "cn-dropdown-checkbox-item-indicator-right",
				className
			)}
			{...props}>
			{children}

			{indicator && React.isValidElement(indicator) ? (
				indicator
			) : (
				<span
					className={cn(
						"cn-dropdown-item-indicator-wrapper",
						"absolute flex items-center justify-center",
						indicatorPosition === "left"
							? "cn-dropdown-item-indicator-left"
							: "cn-dropdown-item-indicator-right"
					)}>
					<DropdownMenuPrimitive.ItemIndicator>
						<Check size={20} />
					</DropdownMenuPrimitive.ItemIndicator>
				</span>
			)}
		</DropdownMenuPrimitive.CheckboxItem>
	)
}

function DropdownRadioGroup({ ...props }: DropdownRadioGroupProps) {
	return (
		<DropdownMenuPrimitive.RadioGroup
			data-slot="dropdown-menu-radio-group"
			{...props}
		/>
	)
}

function DropdownRadioItem({
	children,
	className,
	...props
}: DropdownRadioItemProps) {
	const { indicatorPosition, indicator } = useDropdown()

	return (
		<DropdownMenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			className={cn(
				"cn-dropdown-radio-item",
				"flex w-full cursor-pointer select-none items-center",
				"outline-hidden",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				"[&_svg]:pointer-events-none [&_svg]:shrink-0",
				indicatorPosition === "left"
					? "cn-dropdown-radio-item-indicator-left"
					: "cn-dropdown-radio-item-indicator-right",
				className
			)}
			{...props}>
			{children}

			{indicator && React.isValidElement(indicator) ? (
				indicator
			) : (
				<span
					className={cn(
						"cn-dropdown-item-indicator-wrapper",
						"absolute flex items-center justify-center",
						indicatorPosition === "left"
							? "cn-dropdown-item-indicator-left"
							: "cn-dropdown-item-indicator-right"
					)}>
					<DropdownMenuPrimitive.ItemIndicator>
						<Check size={20} />
					</DropdownMenuPrimitive.ItemIndicator>
				</span>
			)}
		</DropdownMenuPrimitive.RadioItem>
	)
}

function DropdownGroup({
	children,
	title,
	className,
	...props
}: DropdownGroupProps) {
	return (
		<DropdownMenuPrimitive.Group
			data-slot="dropdown-menu-group"
			className={cn(
				"cn-dropdown-group",
				"z-50 flex flex-col items-stretch justify-start",
				className
			)}
			data-radix-dropdown-menu-group
			{...props}>
			{title && (
				<label
					className={cn(
						"cn-dropdown-group-label",
						"flex items-center gap-2.5"
					)}>
					{title}
				</label>
			)}
			{children}
		</DropdownMenuPrimitive.Group>
	)
}

function DropdownSub({ ...props }: DropdownSubProps) {
	return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownSubTrigger({
	children,
	className,
	inset,
	...props
}: DropdownSubTriggerProps) {
	return (
		<DropdownMenuPrimitive.SubTrigger
			data-slot="dropdown-menu-sub-trigger"
			className={cn(
				"cn-dropdown-sub-trigger",
				"flex cursor-pointer select-none items-center",
				"outline-hidden transition-colors",
				"data-disabled:pointer-events-none data-disabled:opacity-50",
				"[&_svg]:pointer-events-none [&_svg]:shrink-0",
				inset && "cn-dropdown-sub-trigger-inset",
				className
			)}
			{...props}>
			{children}
			<ChevronRight className="ml-auto" />
		</DropdownMenuPrimitive.SubTrigger>
	)
}

function DropdownSubContent({ className, ...props }: DropdownSubContentProps) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.SubContent
				data-slot="dropdown-menu-sub-content"
				className={cn(
					"cn-dropdown-sub-content",
					"z-50 flex flex-col items-stretch justify-start",
					"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					className
				)}
				sideOffset={10}
				alignOffset={-7}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	)
}

function DropdownLabel({ className, inset, ...props }: DropdownLabelProps) {
	return (
		<DropdownMenuPrimitive.Label
			data-slot="dropdown-menu-label"
			className={cn(
				"cn-dropdown-label",
				inset && "cn-dropdown-label-inset",
				className
			)}
			{...props}
		/>
	)
}

function DropdownShortcut({ className, ...props }: DropdownShortcutProps) {
	return (
		<span
			data-slot="dropdown-menu-shortcut"
			className={cn("cn-dropdown-shortcut", "ml-auto", className)}
			{...props}
		/>
	)
}

function DropdownDivider({ className, ...props }: DropdownDividerProps) {
	return (
		<DropdownMenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			className={cn("cn-dropdown-divider", className)}
			{...props}
		/>
	)
}

export {
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownGroup,
	DropdownItem,
	DropdownCheckboxItem,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
	DropdownLabel,
	DropdownShortcut,
	DropdownPortal,
}
