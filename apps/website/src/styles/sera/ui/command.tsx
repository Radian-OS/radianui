import * as React from "react"
import {
	Command as Cmdk,
	CommandEmpty as CmdkEmpty,
	CommandGroup as CmdkGroup,
	CommandInput as CmdkInput,
	CommandItem as CmdkItem,
	CommandList as CmdkList,
	CommandSeparator as CmdkSeparator,
} from "cmdk"
import { cn } from "@/lib/utils"
import { IconSlot } from "@/registry/icon/icon-library"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/styles/sera/ui/dialog"

type CommandProps = React.ComponentProps<typeof Cmdk>

type CommandDialogProps = React.ComponentProps<typeof Dialog> & {
	title?: string
	description?: string
	className?: string
} & Pick<React.ComponentProps<typeof DialogContent>, "closeButton">

type CommandInputProps = React.ComponentProps<typeof CmdkInput>
type CommandListProps = React.ComponentProps<typeof CmdkList>
type CommandEmptyProps = React.ComponentProps<typeof CmdkEmpty>
type CommandGroupProps = React.ComponentProps<typeof CmdkGroup>
type CommandDividerProps = React.ComponentProps<typeof CmdkSeparator>
type CommandItemProps = React.ComponentProps<typeof CmdkItem>
type CommandShortcutProps = React.ComponentProps<"span">

function Command({ className, ...props }: CommandProps) {
	return (
		<Cmdk
			data-slot="command"
			className={cn(
				"bg-bg text-fg border-border flex h-full w-full flex-col overflow-hidden rounded-none border",
				className
			)}
			{...props}
		/>
	)
}

function CommandDialog({
	title = "Command Palette",
	description = "Search for a command to run...",
	children,
	className,
	closeButton,
	...props
}: CommandDialogProps) {
	return (
		<Dialog {...props}>
			<DialogHeader className="sr-only">
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			<DialogContent
				className={cn("overflow-hidden p-0", className)}
				closeButton={closeButton}>
				<Cmdk className="[&_[cmdk-group-heading]]:text-fg-secondary **:data-[slot=command-input-wrapper]:h-14 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-14 [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-3.5 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
					{children}
				</Cmdk>
			</DialogContent>
		</Dialog>
	)
}

function CommandInput({ className, ...props }: CommandInputProps) {
	return (
		<div
			data-slot="command-input-wrapper"
			className="flex h-12 items-center gap-2 border-b px-4 py-3">
			<IconSlot slot="search" className="text-fg-secondary size-4 shrink-0" />
			<CmdkInput
				data-slot="command-input"
				className={cn(
					"outline-hidden placeholder:text-fg-tertiary flex h-12 w-full rounded-md bg-transparent text-sm font-normal disabled:cursor-not-allowed disabled:opacity-50",
					className
				)}
				{...props}
			/>
		</div>
	)
}

function CommandList({ className, ...props }: CommandListProps) {
	return (
		<CmdkList
			data-slot="command-list"
			className={cn(
				"max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden",
				className
			)}
			{...props}
		/>
	)
}

function CommandEmpty({ ...props }: CommandEmptyProps) {
	return (
		<CmdkEmpty
			data-slot="command-empty"
			className="py-8 text-center text-sm"
			{...props}
		/>
	)
}

function CommandGroup({ className, ...props }: CommandGroupProps) {
	return (
		<CmdkGroup
			data-slot="command-group"
			className={cn(
				"text-fg [&_[cmdk-group-heading]]:text-fg-secondary overflow-hidden p-1.5 [&_[cmdk-group-heading]]:p-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
				className
			)}
			{...props}
		/>
	)
}

function CommandDivider({ className, ...props }: CommandDividerProps) {
	return (
		<CmdkSeparator
			data-slot="command-separator"
			className={cn("bg-border -mx-1 h-px", className)}
			{...props}
		/>
	)
}

function CommandItem({ className, ...props }: CommandItemProps) {
	return (
		<CmdkItem
			data-slot="command-item"
			className={cn(
				"outline-hidden data-[selected=true]:bg-fill2-alpha data-[selected=true]:text-fg-secondary [&_svg:not([class*='text-'])]:text-fg-tertiary relative flex cursor-default select-none items-center gap-2 rounded-none px-3 py-2 text-sm data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className
			)}
			{...props}
		/>
	)
}

function CommandShortcut({ className, ...props }: CommandShortcutProps) {
	return (
		<span
			data-slot="command-shortcut"
			className={cn(
				"text-fg-tertiary ml-auto text-xs tracking-widest",
				className
			)}
			{...props}
		/>
	)
}

export {
	Command,
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandShortcut,
	CommandDivider,
}
