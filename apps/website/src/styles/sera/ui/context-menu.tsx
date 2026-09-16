"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function ContextMenu({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
	return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

function ContextMenuTrigger({
	className,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
	return (
		<ContextMenuPrimitive.Trigger
			data-slot="context-menu-trigger"
			className={cn("outline-none select-none", className)}
			{...props}
		/>
	)
}

function ContextMenuGroup({
	children,
	title,
	className,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group> & {
	title?: string
}) {
	return (
		<ContextMenuPrimitive.Group
			data-slot="context-menu-group"
			className={cn(
				"z-50 flex flex-col items-stretch justify-start gap-0.5 px-0 py-0",
				className
			)}
			{...props}>
			{title && (
				<label className="text-fg-tertiary flex h-7 items-center gap-2.5 p-2 text-xs/4.5 font-medium uppercase">
					{title}
				</label>
			)}
			{children}
		</ContextMenuPrimitive.Group>
	)
}

function ContextMenuPortal({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
	return (
		<ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
	)
}

function ContextMenuSub({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
	return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
}

function ContextMenuRadioGroup({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
	return (
		<ContextMenuPrimitive.RadioGroup
			data-slot="context-menu-radio-group"
			{...props}
		/>
	)
}

function ContextMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
	inset?: boolean
}) {
	return (
		<ContextMenuPrimitive.SubTrigger
			data-slot="context-menu-sub-trigger"
			className={cn(
				"data-[state=open]:bg-fill1-alpha focus:bg-fill2-alpha [&_svg]:text-fg-secondary flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				inset && "pl-8",
				className
			)}
			{...props}>
			{children}
			<ChevronRightIcon className="ml-auto" />
		</ContextMenuPrimitive.SubTrigger>
	)
}

function ContextMenuSubContent({
	className,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
	return (
		<ContextMenuPrimitive.Portal>
			<ContextMenuPrimitive.SubContent
				data-slot="context-menu-sub-content"
				className={cn(
					"bg-elevation-level2 border-border z-50 flex min-w-36 flex-col items-stretch justify-start rounded-lg border p-1.5 drop-shadow-xs",
					"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					className
				)}
				sideOffset={10}
				alignOffset={-7}
				{...props}
			/>
		</ContextMenuPrimitive.Portal>
	)
}

function ContextMenuContent({
	className,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
	return (
		<ContextMenuPrimitive.Portal>
			<ContextMenuPrimitive.Content
				data-slot="context-menu-content"
				className={cn(
					"no-scrollbar bg-elevation-level2 border-border z-50 flex min-w-[8rem] flex-col gap-0.5 overflow-y-scroll rounded-lg border p-1.5 drop-shadow-xs",
					"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					className
				)}
				{...props}
			/>
		</ContextMenuPrimitive.Portal>
	)
}

function ContextMenuItem({
	className,
	inset,
	variant = "default",
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
	inset?: boolean
	variant?: "default" | "error"
}) {
	return (
		<ContextMenuPrimitive.Item
			data-slot="context-menu-item"
			className={cn(
				"text-fg focus:bg-fill1-alpha data-disabled:text-fg-disabled data-disabled:[&_*]:text-fg-disabled relative flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none",
				"[&_svg]:text-fg-secondary [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				inset && "pl-9",
				variant === "error" &&
					"text-error focus:bg-error-accent [&_svg]:!text-error",
				className
			)}
			{...props}
		/>
	)
}

function ContextMenuCheckboxItem({
	className,
	children,
	checked,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
	return (
		<ContextMenuPrimitive.CheckboxItem
			data-slot="context-menu-checkbox-item"
			className={cn(
				"focus:bg-fill2-alpha text-fg relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 ps-8 pe-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			checked={checked}
			{...props}>
			<span className="pointer-events-none absolute start-2 flex size-3.5 items-center justify-center">
				<ContextMenuPrimitive.ItemIndicator>
					<CheckIcon className="text-primary size-4" />
				</ContextMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</ContextMenuPrimitive.CheckboxItem>
	)
}

function ContextMenuRadioItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
	return (
		<ContextMenuPrimitive.RadioItem
			data-slot="context-menu-radio-item"
			className={cn(
				"focus:bg-fill2-alpha text-fg relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 ps-8 pe-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}>
			<span className="pointer-events-none absolute start-2 flex size-3.5 items-center justify-center">
				<ContextMenuPrimitive.ItemIndicator>
					<CircleIcon className="fill-primary size-1.5" />
				</ContextMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</ContextMenuPrimitive.RadioItem>
	)
}

function ContextMenuLabel({
	className,
	inset,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
	inset?: boolean
}) {
	return (
		<ContextMenuPrimitive.Label
			data-slot="context-menu-label"
			className={cn(
				"text-fg-tertiary px-2 py-1.5 text-xs font-medium",
				inset && "pl-8",
				className
			)}
			{...props}
		/>
	)
}

function ContextMenuSeparator({
	className,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
	return (
		<ContextMenuPrimitive.Separator
			data-slot="context-menu-separator"
			className={cn("bg-soft-alpha -mx-1.5 my-1 h-px", className)}
			{...props}
		/>
	)
}

function ContextMenuShortcut({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="context-menu-shortcut"
			className={cn(
				"text-fg-secondary ml-auto text-xs tracking-widest",
				className
			)}
			{...props}
		/>
	)
}

export {
	ContextMenu,
	ContextMenuTrigger,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuCheckboxItem,
	ContextMenuRadioItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuGroup,
	ContextMenuPortal,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuRadioGroup,
}
