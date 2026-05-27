"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { CheckIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function Menubar({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
	return (
		<MenubarPrimitive.Root
			data-slot="menubar"
			className={cn(
				"p-0.75 flex h-8 items-center gap-0.5 rounded-lg border",
				"bg-bg border-border",
				className
			)}
			{...props}
		/>
	)
}

function MenubarMenu({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
	return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
	return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarPortal({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
	return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

function MenubarRadioGroup({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
	return (
		<MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
	)
}

function MenubarTrigger({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
	return (
		<MenubarPrimitive.Trigger
			data-slot="menubar-trigger"
			className={cn(
				"outline-hidden flex select-none items-center rounded-sm px-1.5 py-0.5 text-sm font-medium",
				"text-fg",
				"hover:bg-fill2 aria-expanded:bg-fill2",
				className
			)}
			{...props}
		/>
	)
}

function MenubarContent({
	className,
	align = "start",
	alignOffset = -4,
	sideOffset = 8,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
	return (
		<MenubarPortal>
			<MenubarPrimitive.Content
				data-slot="menubar-content"
				align={align}
				alignOffset={alignOffset}
				sideOffset={sideOffset}
				className={cn(
					"origin-(--radix-menubar-content-transform-origin) z-50 min-w-36 overflow-hidden rounded-lg p-1 shadow-md ring-1",
					"bg-elevation-level1 text-fg ring-alpha",
					"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 duration-100",
					className
				)}
				{...props}
			/>
		</MenubarPortal>
	)
}

function MenubarItem({
	className,
	inset,
	variant = "default",
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
	inset?: boolean
	variant?: "default" | "destructive"
}) {
	return (
		<MenubarPrimitive.Item
			data-slot="menubar-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"group/menubar-item outline-hidden relative flex cursor-default select-none items-center gap-1.5 rounded-md px-1.5 py-1 text-sm",
				"text-fg",
				"hover:bg-fill2 focus:bg-fill2",
				"data-inset:pl-7",
				"data-[variant=destructive]:text-error-text",
				"data-[variant=destructive]:hover:bg-error-accent",
				"data-[variant=destructive]:focus:bg-error-accent",
				"data-[variant=destructive]:[&_svg]:text-error-text!",
				"data-disabled:pointer-events-none data-disabled:opacity-50",
				"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className
			)}
			{...props}
		/>
	)
}

function MenubarCheckboxItem({
	className,
	children,
	checked,
	inset,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem> & {
	inset?: boolean
}) {
	return (
		<MenubarPrimitive.CheckboxItem
			data-slot="menubar-checkbox-item"
			data-inset={inset}
			className={cn(
				"outline-hidden relative flex cursor-default select-none items-center gap-1.5 rounded-md py-1 pl-7 pr-1.5 text-sm",
				"text-fg",
				"hover:bg-fill2 focus:bg-fill2",
				"data-inset:pl-7",
				"data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className
			)}
			checked={checked}
			{...props}>
			<span className="pointer-events-none absolute left-1.5 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
				<MenubarPrimitive.ItemIndicator>
					<CheckIcon />
				</MenubarPrimitive.ItemIndicator>
			</span>
			{children}
		</MenubarPrimitive.CheckboxItem>
	)
}

function MenubarRadioItem({
	className,
	children,
	inset,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem> & {
	inset?: boolean
}) {
	return (
		<MenubarPrimitive.RadioItem
			data-slot="menubar-radio-item"
			data-inset={inset}
			className={cn(
				"outline-hidden relative flex cursor-default select-none items-center gap-1.5 rounded-md py-1 pl-7 pr-1.5 text-sm",
				"text-fg",
				"hover:bg-fill2 focus:bg-fill2",
				"data-inset:pl-7",
				"data-disabled:pointer-events-none data-disabled:opacity-50",
				"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className
			)}
			{...props}>
			<span className="pointer-events-none absolute left-1.5 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
				<MenubarPrimitive.ItemIndicator>
					<CheckIcon />
				</MenubarPrimitive.ItemIndicator>
			</span>
			{children}
		</MenubarPrimitive.RadioItem>
	)
}

function MenubarLabel({
	className,
	inset,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
	inset?: boolean
}) {
	return (
		<MenubarPrimitive.Label
			data-slot="menubar-label"
			data-inset={inset}
			className={cn(
				"px-1.5 py-1 text-sm font-medium",
				"text-fg-secondary",
				"data-inset:pl-7",
				className
			)}
			{...props}
		/>
	)
}

function MenubarSeparator({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
	return (
		<MenubarPrimitive.Separator
			data-slot="menubar-separator"
			className={cn("bg-border -mx-1 my-1 h-px", className)}
			{...props}
		/>
	)
}

function MenubarShortcut({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="menubar-shortcut"
			className={cn(
				"ml-auto text-xs tracking-widest",
				"text-fg-secondary",
				"group-focus/menubar-item:text-fg",
				className
			)}
			{...props}
		/>
	)
}

function MenubarSub({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
	return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
	className,
	inset,
	children,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
	inset?: boolean
}) {
	return (
		<MenubarPrimitive.SubTrigger
			data-slot="menubar-sub-trigger"
			data-inset={inset}
			className={cn(
				"flex cursor-default select-none items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none",
				"text-fg",
				"hover:bg-fill2 focus:bg-fill2 data-open:bg-fill2",
				"data-inset:pl-7",
				"[&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}>
			{children}
			<ChevronRightIcon className="cn-rtl-flip ml-auto size-4" />
		</MenubarPrimitive.SubTrigger>
	)
}

function MenubarSubContent({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
	return (
		<MenubarPrimitive.SubContent
			data-slot="menubar-sub-content"
			className={cn(
				"origin-(--radix-menubar-content-transform-origin) z-50 min-w-32 overflow-hidden rounded-lg p-1 shadow-lg ring-1",
				"bg-elevation-level1 text-fg ring-alpha",
				"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 duration-100",
				className
			)}
			{...props}
		/>
	)
}

export {
	Menubar,
	MenubarPortal,
	MenubarMenu,
	MenubarTrigger,
	MenubarContent,
	MenubarGroup,
	MenubarSeparator,
	MenubarLabel,
	MenubarItem,
	MenubarShortcut,
	MenubarCheckboxItem,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSub,
	MenubarSubTrigger,
	MenubarSubContent,
}
