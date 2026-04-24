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
> & {
	title?: string
}

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
			className={cn("outline-none", className)}
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
				"border-border bg-elevation-level2 drop-shadow-xs min-w-[var(--radix-dropdown-menu-trigger-width)] gap-0.5 rounded-lg border p-1.5",
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
				"text-fg focus:bg-fill1-alpha data-disabled:text-fg-disabled data-disabled:[&_*]:text-fg-disabled [&_svg]:text-fg-secondary gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4",
				"relative flex w-full cursor-pointer select-none items-center",
				"outline-hidden transition-colors",
				"focus:bg-fill1-alpha",
				"data-disabled:pointer-events-none data-disabled:text-fg-disabled data-disabled:[&_*]:text-fg-disabled",
				"[&_svg]:text-fg-secondary [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
				"focus:bg-fill2-alpha [&_svg]:text-fg-secondary gap-2 rounded-sm py-1.5 text-sm [&_svg:not([class*='size-'])]:size-5",
				"flex w-full cursor-pointer select-none items-center",
				"outline-hidden",
				"focus:bg-fill2-alpha",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				"[&_svg]:text-fg-secondary [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
						"size-5",
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
				"focus:bg-fill2-alpha [&_svg]:text-fg-secondary gap-2 rounded-sm py-1.5 text-sm [&_svg:not([class*='size-'])]:size-5",
				"flex w-full cursor-pointer select-none items-center",
				"outline-hidden",
				"focus:bg-fill2-alpha",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				"[&_svg]:text-fg-secondary [&_svg]:pointer-events-none [&_svg]:shrink-0",
				indicatorPosition === "left" ? "pe-2 ps-8" : "pe-8 ps-2",
				className
			)}
			{...props}>
			{children}

			{indicator && React.isValidElement(indicator) ? (
				indicator
			) : (
				<span
					className={cn(
						"size-5",
						"absolute flex items-center justify-center",
						indicatorPosition === "left" ? "start-2" : "end-2"
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
				"gap-0.5 px-0 py-0",
				"z-50 flex flex-col items-stretch justify-start",
				className
			)}
			data-radix-dropdown-menu-group
			{...props}>
			{title && (
				<label
					className={cn(
						"text-xs/4.5 text-fg-tertiary h-7 p-2 font-medium uppercase",
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
				"data-[state=open]:bg-fill1-alpha focus:bg-fill2-alpha [&_svg]:text-fg-secondary gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4",
				"flex cursor-pointer select-none items-center",
				"outline-hidden transition-colors",
				"data-[state=open]:bg-fill1-alpha focus:bg-fill2-alpha",
				"data-disabled:pointer-events-none data-disabled:opacity-50",
				"[&_svg]:text-fg-secondary [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
					"border-border bg-elevation-level2 drop-shadow-xs min-w-36 rounded-lg border p-1.5",
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
				"text-fg-tertiary px-2 py-1.5 text-xs font-medium",
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
			className={cn(
				"text-fg-secondary text-xs tracking-widest",
				"ml-auto",
				className
			)}
			{...props}
		/>
	)
}

function DropdownDivider({ className, ...props }: DropdownDividerProps) {
	return (
		<DropdownMenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			className={cn("bg-soft-alpha -mx-1.5 my-1 h-px", className)}
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
