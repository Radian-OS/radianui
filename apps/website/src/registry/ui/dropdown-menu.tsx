"use client"

import React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "@/lib/utils"
import { IconSlot } from "@/registry/icon/icon-library"

export type DropdownMenuContextType = {
	indicatorPosition?: "left" | "right"
	indicator?: React.ReactNode
}

export type DropdownMenuProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Root
> &
	DropdownMenuContextType

export type DropdownMenuTriggerProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Trigger
>

export type DropdownMenuContentProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Content
> &
	React.RefAttributes<HTMLDivElement>

export type DropdownMenuItemProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Item
> & {
	inset?: boolean
}

export type DropdownMenuCheckboxItemProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.CheckboxItem
>

export type DropdownMenuRadioGroupProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.RadioGroup
>

export type DropdownMenuRadioItemProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.RadioItem
>

export type DropdownMenuGroupProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Group
> & {
	title?: string
}

export type DropdownMenuSubProps = React.ComponentPropsWithoutRef<
	typeof DropdownMenuPrimitive.Sub
>

export type DropdownMenuSubTriggerProps = React.ComponentPropsWithRef<
	typeof DropdownMenuPrimitive.SubTrigger
> & {
	inset?: boolean
}

export type DropdownMenuSubContentProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.SubContent
>

export type DropdownMenuLabelProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Label
> & {
	inset?: boolean
}

export type DropdownMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>

export type DropdownMenuDividerProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Separator
>

export type DropdownMenuPortalProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.DropdownMenuPortal
>

const DropdownMenuContext = React.createContext<DropdownMenuContextType | null>(
	null
)

function useDropdownMenu() {
	const context = React.useContext(DropdownMenuContext)
	if (!context) {
		throw new Error("useDropdownMenu must be used within a <DropdownMenu />")
	}
	return context
}

function DropdownMenu({
	indicatorPosition = "right",
	indicator,
	...props
}: DropdownMenuProps) {
	return (
		<DropdownMenuContext.Provider
			value={{ indicatorPosition: indicatorPosition ?? "right", indicator }}>
			<DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
		</DropdownMenuContext.Provider>
	)
}

function DropdownMenuTrigger({
	className,
	...props
}: DropdownMenuTriggerProps) {
	return (
		<DropdownMenuPrimitive.Trigger
			data-slot="dropdown-menu-trigger"
			className={cn("cn-dropdown-trigger", className)}
			{...props}
		/>
	)
}

function DropdownMenuContent({
	className,
	...props
}: DropdownMenuContentProps) {
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

function DropdownMenuPortal({ ...props }: DropdownMenuPortalProps) {
	return <DropdownMenuPrimitive.Portal {...props} />
}

function DropdownMenuItem({
	className,
	inset,
	...props
}: DropdownMenuItemProps) {
	return (
		<DropdownMenuPrimitive.Item
			data-slot="dropdown-menu-item"
			className={cn(
				"cn-dropdown-item",
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

function DropdownMenuCheckboxItem({
	children,
	className,
	...props
}: DropdownMenuCheckboxItemProps) {
	const { indicatorPosition, indicator } = useDropdownMenu()

	return (
		<DropdownMenuPrimitive.CheckboxItem
			data-slot="dropdown-menu-checkbox-item"
			className={cn(
				"cn-dropdown-checkbox-item",
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
						"cn-dropdown-item-indicator-wrapper",
						"absolute flex items-center justify-center",
						indicatorPosition === "left"
							? "cn-dropdown-item-indicator-left"
							: "cn-dropdown-item-indicator-right"
					)}>
					<DropdownMenuPrimitive.ItemIndicator>
						<IconSlot slot="check" size={20} />
					</DropdownMenuPrimitive.ItemIndicator>
				</span>
			)}
		</DropdownMenuPrimitive.CheckboxItem>
	)
}

function DropdownMenuRadioGroup({ ...props }: DropdownMenuRadioGroupProps) {
	return (
		<DropdownMenuPrimitive.RadioGroup
			data-slot="dropdown-menu-radio-group"
			{...props}
		/>
	)
}

function DropdownMenuRadioItem({
	children,
	className,
	...props
}: DropdownMenuRadioItemProps) {
	const { indicatorPosition, indicator } = useDropdownMenu()

	return (
		<DropdownMenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			className={cn(
				"cn-dropdown-radio-item",
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
						"cn-dropdown-item-indicator-wrapper",
						"absolute flex items-center justify-center",
						indicatorPosition === "left" ? "start-2" : "end-2"
					)}>
					<DropdownMenuPrimitive.ItemIndicator>
						<IconSlot slot="check" size={20} />
					</DropdownMenuPrimitive.ItemIndicator>
				</span>
			)}
		</DropdownMenuPrimitive.RadioItem>
	)
}

function DropdownMenuGroup({
	children,
	title,
	className,
	...props
}: DropdownMenuGroupProps) {
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

function DropdownMenuSub({ ...props }: DropdownMenuSubProps) {
	return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
	children,
	className,
	inset,
	...props
}: DropdownMenuSubTriggerProps) {
	return (
		<DropdownMenuPrimitive.SubTrigger
			data-slot="dropdown-menu-sub-trigger"
			className={cn(
				"cn-dropdown-sub-trigger",
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
			<IconSlot slot="right" className="ml-auto" />
		</DropdownMenuPrimitive.SubTrigger>
	)
}

function DropdownMenuSubContent({
	className,
	...props
}: DropdownMenuSubContentProps) {
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

function DropdownMenuLabel({
	className,
	inset,
	...props
}: DropdownMenuLabelProps) {
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

function DropdownMenuShortcut({
	className,
	...props
}: DropdownMenuShortcutProps) {
	return (
		<span
			data-slot="dropdown-menu-shortcut"
			className={cn("cn-dropdown-shortcut", "ml-auto", className)}
			{...props}
		/>
	)
}

function DropdownMenuDivider({
	className,
	...props
}: DropdownMenuDividerProps) {
	return (
		<DropdownMenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			className={cn("cn-dropdown-divider", className)}
			{...props}
		/>
	)
}

export {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuDivider,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuShortcut,
	DropdownMenuPortal,
}
