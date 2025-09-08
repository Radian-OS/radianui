"use client"

import React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { type DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

function Dropdown({ ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>) {
	return <DropdownMenuPrimitive.Root modal={false} data-slot="dropdown-menu" {...props} />
}

function DropdownTrigger({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
	return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" className={cn("outline-none", className)} {...props} />
}

function DropdownContent({
	className,
	placement,
	...props
}: Omit<DropdownMenuContentProps, "side"> &
	React.RefAttributes<HTMLDivElement> & {
		placement?: DropdownMenuContentProps["side"]
	}) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				data-slot="dropdown-menu-content"
				align="start"
				side={placement}
				className={cn(
					"no-scrollbar border-border bg-elevation-level2 drop-shadow-xs z-50 min-w-[var(--radix-dropdown-menu-trigger-width)] overflow-x-visible overflow-y-scroll rounded-lg border p-1",
					"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					className
				)}
				sideOffset={4}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	)
}

function DropdownItem({
	className,
	inset,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.DropdownMenuItem> & {
	inset?: boolean
}) {
	return (
		<DropdownMenuPrimitive.Item
			data-slot="dropdown-menu-item"
			className={cn(
				"focus:bg-fill2-alpha data-disabled:pointer-events-none data-disabled:opacity-50 outline-hidden relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm",
				"[&_svg]:text-fg-secondary transition-colors [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				inset && "pl-9",
				className
			)}
			{...props}
		/>
	)
}

function DropdownCheckboxItem({ children, className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
	return (
		<DropdownMenuPrimitive.CheckboxItem
			data-slot="dropdown-menu-checkbox-item"
			className={cn(
				"focus:bg-fill2-alpha [&_svg]:text-fg-secondary outline-hidden flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className
			)}
			{...props}>
			{children}
			<span className="ml-auto flex size-5 items-center justify-center">
				<DropdownMenuPrimitive.ItemIndicator>
					<Check size={20} />
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
		</DropdownMenuPrimitive.CheckboxItem>
	)
}

function DropdownRadioGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
	return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
}

function DropdownRadioItem({ children, className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
	return (
		<DropdownMenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			className={cn(
				"focus:bg-fill2-alpha [&_svg]:text-fg-secondary outline-hidden flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className
			)}
			{...props}>
			{children}
			<span className="ml-auto flex size-5 items-center justify-center">
				<DropdownMenuPrimitive.ItemIndicator>
					<Check size={20} />
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
		</DropdownMenuPrimitive.RadioItem>
	)
}

function DropdownGroup({ children, title, className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
	return (
		<DropdownMenuPrimitive.Group
			data-slot="dropdown-menu-group"
			className={cn(className, "z-50 flex flex-col items-stretch justify-start gap-0.5 px-0 py-0")}
			data-radix-dropdown-menu-group
			{...props}>
			{title && <label className="text-fg-tertiary text-xs/4.5 flex h-7 items-center px-2 py-2.5 font-medium uppercase">{title}</label>}
			{children}
		</DropdownMenuPrimitive.Group>
	)
}

function DropdownSub({ ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Sub>) {
	return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownSubTrigger({
	children,
	className,
	inset,
	...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubTrigger> & {
	inset?: boolean
}) {
	return (
		<DropdownMenuPrimitive.SubTrigger
			data-slot="dropdown-menu-sub-trigger"
			className={cn(
				"data-[state=open]:bg-fill2-alpha focus:bg-fill2-alpha outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:text-fg-secondary flex cursor-pointer select-none items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm transition-colors [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				{ "pl-8": inset },
				className
			)}
			{...props}>
			{children}
			<ChevronRight className="ml-auto" />
		</DropdownMenuPrimitive.SubTrigger>
	)
}
DropdownSubTrigger.displayName = "DropdownSubTrigger"

function DropdownSubContent({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.SubContent
				data-slot="dropdown-menu-sub-content"
				className={cn(
					"border-border bg-elevation-level2 drop-shadow-xs z-50 flex min-w-36 flex-col items-stretch justify-start rounded-lg border p-1.5",
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

function DropdownLabel({
	className,
	inset,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
	inset?: boolean
}) {
	return <DropdownMenuPrimitive.Label data-slot="dropdown-menu-label" className={cn("text-fg-tertiary px-2 py-1.5 text-xs font-medium", { "pl-8": inset }, className)} {...props} />
}

function DropdownShortcut({ ...props }: React.HTMLAttributes<HTMLSpanElement>) {
	return <span data-slot="dropdown-menu-shortcut" className={cn("text-fg-secondary ml-auto text-xs tracking-widest")} {...props} />
}

function DropdownDivider() {
	return <DropdownMenuPrimitive.Separator data-slot="dropdown-menu-separator" className={cn("bg-soft-alpha -mx-1 my-1 h-px")} />
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
}
