"use client"

import React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

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
>

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
			<DropdownMenuPrimitive.Root
				data-slot="dropdown-menu"
				modal={false}
				{...props}
			/>
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
			className={cn("outline-none", className)}
			{...props}
		/>
	)
}

function DropdownMenuContent({
	className,
	...props
}: DropdownMenuContentProps) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				data-slot="dropdown-menu-content"
				align="start"
				className={cn(
					"no-scrollbar border-border bg-elevation-level2 z-50 flex min-w-[var(--radix-dropdown-menu-trigger-width)] flex-col gap-0.5 overflow-x-visible overflow-y-scroll rounded-lg border p-1.5 drop-shadow-xs",
					"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					className
				)}
				sideOffset={4}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
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
				"text-fg hover:bg-fill1-alpha focus:bg-fill1-alpha data-disabled:text-fg-disabled data-disabled:[&_*]:text-fg-disabled relative flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none",
				"[&_svg]:text-fg-secondary transition-colors [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
				inset && "pl-9",
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
				"hover:bg-fill1-alpha focus:bg-fill1-alpha [&_svg]:text-fg-secondary flex w-full cursor-pointer items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
				indicatorPosition === "left" ? "ps-9 pe-2" : "ps-2 pe-9",
				className
			)}
			{...props}>
			{children}

			{indicator && React.isValidElement(indicator) ? (
				indicator
			) : (
				<span
					className={cn(
						"absolute flex size-5 items-center justify-center",
						indicatorPosition === "left" ? "start-3.5" : "end-3.5"
					)}>
					<DropdownMenuPrimitive.ItemIndicator>
						<Check size={20} />
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
				"hover:bg-fill1-alpha focus:bg-fill1-alpha [&_svg]:text-fg-secondary flex w-full cursor-pointer items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
				indicatorPosition === "left" ? "ps-8 pe-2" : "ps-2 pe-8",
				className
			)}
			{...props}>
			{children}

			{indicator && React.isValidElement(indicator) ? (
				indicator
			) : (
				<span
					className={cn(
						"absolute flex size-5 items-center justify-center",
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
				"z-50 flex flex-col items-stretch justify-start gap-0.5 px-0 py-0",
				className
			)}
			data-radix-dropdown-menu-group
			{...props}>
			{title && (
				<label className="text-fg-tertiary flex h-7 items-center gap-2.5 p-2 text-xs/4.5 font-medium uppercase">
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
				"hover:bg-fill1-alpha focus:bg-fill1-alpha data-[state=open]:bg-fill1-alpha [&_svg]:text-fg-secondary flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
				{ "pl-8": inset },
				className
			)}
			{...props}>
			{children}
			<ChevronRight className="ml-auto" />
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
					"border-border bg-elevation-level2 z-50 flex min-w-36 flex-col items-stretch justify-start rounded-lg border p-1.5 drop-shadow-xs",
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
				"text-fg-tertiary px-2 py-1.5 text-xs font-medium",
				{ "pl-8": inset },
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
			className={cn(
				"text-fg-secondary ml-auto text-xs tracking-widest",
				className
			)}
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
			className={cn("bg-soft-alpha -mx-1.5 my-1 h-px", className)}
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
