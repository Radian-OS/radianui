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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/registry/ui/dialog"
import { IconSlot } from "../icon-library"

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
				"cn-command flex h-full w-full flex-col overflow-hidden",
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
				<Cmdk className="cn-command-dialog-cmdk">{children}</Cmdk>
			</DialogContent>
		</Dialog>
	)
}

function CommandInput({ className, ...props }: CommandInputProps) {
	return (
		<div
			data-slot="command-input-wrapper"
			className="cn-command-input-wrapper flex items-center gap-2">
			<IconSlot slot="search" className="cn-command-input-icon shrink-0" />
			<CmdkInput
				data-slot="command-input"
				className={cn(
					"outline-hidden cn-command-input flex w-full rounded-md bg-transparent disabled:cursor-not-allowed disabled:opacity-50",
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
				"cn-command-list overflow-y-auto overflow-x-hidden",
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
			className="cn-command-empty"
			{...props}
		/>
	)
}

function CommandGroup({ className, ...props }: CommandGroupProps) {
	return (
		<CmdkGroup
			data-slot="command-group"
			className={cn("cn-command-group overflow-hidden", className)}
			{...props}
		/>
	)
}

function CommandDivider({ className, ...props }: CommandDividerProps) {
	return (
		<CmdkSeparator
			data-slot="command-separator"
			className={cn("cn-command-divider -mx-1 h-px", className)}
			{...props}
		/>
	)
}

function CommandItem({ className, ...props }: CommandItemProps) {
	return (
		<CmdkItem
			data-slot="command-item"
			className={cn(
				"outline-hidden cn-command-item relative flex cursor-default select-none items-center gap-2 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
			className={cn("cn-command-shortcut ml-auto", className)}
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
