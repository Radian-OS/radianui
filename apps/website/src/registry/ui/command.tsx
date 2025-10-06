"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog"

type CommandProps = React.ComponentProps<typeof CommandPrimitive>

type CommandDialogProps = React.ComponentProps<typeof Dialog> & {
	title?: string
	description?: string
	className?: string
} & Pick<React.ComponentProps<typeof DialogContent>, "closeButton">

type CommandInputProps = React.ComponentProps<typeof CommandPrimitive.Input>

type CommandListProps = React.ComponentProps<typeof CommandPrimitive.List>

type CommandEmptyProps = React.ComponentProps<typeof CommandPrimitive.Empty>

type CommandGroupProps = React.ComponentProps<typeof CommandPrimitive.Group>

type CommandDividerProps = React.ComponentProps<typeof CommandPrimitive.Separator>

type CommandItemProps = React.ComponentProps<typeof CommandPrimitive.Item>

type CommandShortcutProps = React.ComponentProps<"span">

function Command({ className, ...props }: CommandProps) {
	return <CommandPrimitive data-slot="command" className={cn("bg-bg text-fg border-border flex h-full w-full flex-col overflow-hidden rounded-lg border", className)} {...props} />
}

function CommandDialog({ title = "Command Palette", description = "Search for a command to run...", children, className, closeButton, ...props }: CommandDialogProps) {
	return (
		<Dialog {...props}>
			<DialogHeader className="sr-only">
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			<DialogContent className={cn("overflow-hidden p-0", className)} closeButton={closeButton}>
				<Command className="[&_[cmdk-group-heading]]:text-fg **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	)
}

function CommandInput({ className, ...props }: CommandInputProps) {
	return (
		<div data-slot="command-input-wrapper" className="flex h-10 items-center gap-2 border-b px-3">
			<SearchIcon className="size-4 shrink-0 opacity-50" />
			<CommandPrimitive.Input
				data-slot="command-input"
				className={cn(
					"placeholder:text-fg-tertiary outline-hidden flex h-10 w-full rounded-md bg-transparent py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50",
					className
				)}
				{...props}
			/>
		</div>
	)
}

function CommandList({ className, ...props }: CommandListProps) {
	return <CommandPrimitive.List data-slot="command-list" className={cn("max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden", className)} {...props} />
}

function CommandEmpty({ ...props }: CommandEmptyProps) {
	return <CommandPrimitive.Empty data-slot="command-empty" className="py-6 text-center text-sm" {...props} />
}

function CommandGroup({ className, ...props }: CommandGroupProps) {
	return (
		<CommandPrimitive.Group
			data-slot="command-group"
			className={cn(
				"text-fg [&_[cmdk-group-heading]]:text-fg-secondary overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
				className
			)}
			{...props}
		/>
	)
}

function CommandDivider({ className, ...props }: CommandDividerProps) {
	return <CommandPrimitive.Separator data-slot="command-separator" className={cn("bg-border -mx-1 h-px", className)} {...props} />
}

function CommandItem({ className, ...props }: CommandItemProps) {
	return (
		<CommandPrimitive.Item
			data-slot="command-item"
			className={cn(
				"data-[selected=true]:bg-fill2-alpha data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-fg-tertiary outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm px-2.5 py-2 text-sm data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className
			)}
			{...props}
		/>
	)
}

function CommandShortcut({ className, ...props }: CommandShortcutProps) {
	return <span data-slot="command-shortcut" className={cn("text-fg-tertiary ml-auto text-xs tracking-widest", className)} {...props} />
}

export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandDivider }
