"use client"

import React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import {
	DropdownMenuContentProps,
	DropdownMenuGroupProps,
	DropdownMenuItemProps,
	DropdownMenuSubContentProps,
	DropdownMenuTriggerProps,
} from "@radix-ui/react-dropdown-menu"
import { Check, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Divider } from "./divider"

// Create a Dropdown component
function Dropdown({ children, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>) {
	return (
		<DropdownMenuPrimitive.Root modal={false} {...props}>
			{children}
		</DropdownMenuPrimitive.Root>
	)
}
Dropdown.displayName = "Dropdown"

// Create a DropdownTrigger component
function DropdownTrigger({ asChild, children, ...props }: DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>) {
	if (asChild) {
		return (
			<DropdownMenuPrimitive.Trigger asChild {...props}>
				{children}
			</DropdownMenuPrimitive.Trigger>
		)
	}

	return (
		<DropdownMenuPrimitive.Trigger
			className={cn(
				"text-sm bg-bg-base text-text flex w-fit",
				"border-border items-center justify-start gap-2 rounded-lg border",
				"px-3 py-2.5 font-medium drop-shadow-xs"
			)}
			{...props}>
			<span className="flex-1">{children}</span>
			<ChevronDown size={20} className="text-text-tertiary" />
		</DropdownMenuPrimitive.Trigger>
	)
}
DropdownTrigger.displayName = "DropdownTrigger"
// Create a DropdownContent component
function DropdownContent({ className, children, ...props }: DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				align="start"
				className={cn(
					"no-scrollbar border-border bg-bg-base z-50 min-w-[var(--radix-dropdown-menu-trigger-width)] overflow-x-visible overflow-y-scroll rounded-lg border px-1.5 py-1.5 drop-shadow-xs",
					className
				)}
				sideOffset={8}
				{...props}>
				{children}
			</DropdownMenuPrimitive.Content>
		</DropdownMenuPrimitive.Portal>
	)
}
DropdownContent.displayName = "DropdownContent"

function useDropdownSelection(value?: string) {
	const { selectedValues = [], onSelectedChange, selectionMode, minSelectionCount = 0 } = React.use(DropdownCtx)
	const isSelectable = selectionMode === "single" || selectionMode === "multiple"
	const isSelected = value ? selectedValues.includes(value) : false

	const handleSelect = React.useCallback(
		(e: Event) => {
			if (!isSelectable || !value || !onSelectedChange) return
			e.preventDefault()
			const currentKeys = selectedValues || []
			if (selectionMode === "multiple") {
				if (isSelected) {
					if (currentKeys.length > minSelectionCount) {
						onSelectedChange(currentKeys.filter((key) => key !== value))
					}
				} else {
					onSelectedChange([...currentKeys, value])
				}
			} else if (selectionMode === "single") {
				if (isSelected && minSelectionCount === 0) {
					onSelectedChange([])
				} else if (!isSelected) {
					onSelectedChange([value])
				}
			}
		},
		[isSelectable, value, onSelectedChange, selectedValues, selectionMode, minSelectionCount, isSelected]
	)

	return { isSelectable, isSelected, handleSelect }
}

// Create a DropdownItem component
function DropdownItem({
	className,
	inset,
	value,
	shortcut,
	children,
	icon,
	asChild = false,
	...props
}: DropdownMenuItemProps &
	React.RefAttributes<HTMLDivElement> & {
		inset?: boolean
		shortcut?: string
		icon?: React.ReactNode
		value?: string
	}) {
	const { isSelectable, isSelected, handleSelect } = useDropdownSelection(value)

	return (
		<DropdownMenuPrimitive.Item
			className={cn(
				"focus:text-primary-foreground text-sm hover:bg-bg-level1 relative flex w-full cursor-pointer items-center gap-2 rounded-sm px-2.5 py-1.5 outline-hidden transition-colors data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
				inset && "pl-9",
				className
			)}
			asChild={asChild}
			onSelect={handleSelect}
			{...props}>
			{asChild ? (
				children
			) : (
				<>
					{icon && <span>{icon}</span>}
					<span className="flex w-full gap-2 truncate font-normal">{children}</span>
					{shortcut && (
						<label
							className={cn(
								"border-border text-text-secondary ml-auto flex h-5 items-center justify-center rounded-sm border px-1.5 py-0 text-xs/4.5 drop-shadow-xs"
							)}>
							{shortcut}
						</label>
					)}
					{isSelectable && <span className="flex h-2.5 w-3.5 items-center">{isSelected && <Check className="text-text" size={20} />}</span>}
				</>
			)}
		</DropdownMenuPrimitive.Item>
	)
}
DropdownItem.displayName = "DropdownItem"

// Type definition for DropdownGroup props
type DropdownGroupProps = {
	selectionMode?: "single" | "multiple"
	selectedValues?: string[]
	onSelectedChange?: (selectedValues: string[]) => void
	minSelectionCount?: number
}

const DropdownCtx = React.createContext<DropdownGroupProps>({
	selectionMode: undefined,
})
// DropdownGroup component definition
function DropdownGroup({
	children,
	title,
	selectionMode,
	selectedValues = [],
	onSelectedChange,
	className,
	minSelectionCount = 0,
	...props
}: DropdownMenuGroupProps & React.RefAttributes<HTMLDivElement> & DropdownGroupProps) {
	if (minSelectionCount < 0) throw new Error("minSelectionCount cannot be negative")

	React.useEffect(
		function () {
			if (selectedValues.length < minSelectionCount) console.warn("minSelectionCount is greater than the number of selected keys")
		},
		[selectedValues, minSelectionCount]
	)

	const contextValue = React.useMemo(
		function () {
			return {
				selectionMode,
				selectedValues,
				onSelectedChange,
				minSelectionCount,
			}
		},
		[selectionMode, selectedValues, onSelectedChange, minSelectionCount]
	)
	return (
		<>
			<DropdownCtx.Provider value={contextValue}>
				<DropdownMenuPrimitive.Group className={cn(className, "bg-bg-base z-50 flex flex-col items-stretch justify-start px-0 py-0")} {...props}>
					{title && <label className="text-text-tertiary flex h-7 items-center px-2 py-2.5 text-xs/4.5 font-medium uppercase">{title}</label>}
					{children}
				</DropdownMenuPrimitive.Group>
			</DropdownCtx.Provider>
		</>
	)
}

DropdownGroup.displayName = "DropdownGroup"

// DropdownSub component definition
function DropdownSub({ children, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Sub>) {
	return <DropdownMenuPrimitive.Sub {...props}>{children}</DropdownMenuPrimitive.Sub>
}
DropdownSub.displayName = "DropdownSub"

// DropdownSubTrigger component definition
function DropdownSubTrigger({
	disabled,
	icon,
	children,
	asChild,
	className,
	...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubTrigger> & {
	icon?: React.ReactNode
}) {
	if (asChild) {
		return (
			<DropdownMenuPrimitive.SubTrigger asChild className={cn(className)} {...props}>
				{children}
			</DropdownMenuPrimitive.SubTrigger>
		)
	}

	return (
		<DropdownMenuPrimitive.SubTrigger
			disabled={disabled}
			className={cn(
				"text-sm focus:text-primary-foreground focus:bg-bg-level1 flex cursor-pointer items-center gap-2 rounded-sm px-2.5 py-1.5 outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
				className
			)}
			{...props}>
			{icon && icon}
			{children}
			<ChevronRight className="ml-auto" />
		</DropdownMenuPrimitive.SubTrigger>
	)
}
DropdownSubTrigger.displayName = "DropdownSubTrigger"

// DropdownSubContent component definition
function DropdownSubContent({ children, className, ...props }: DropdownMenuSubContentProps & React.RefAttributes<HTMLDivElement>) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.SubContent
				className={cn(
					"border-border bg-bg-base z-50 flex min-w-36 flex-col items-stretch justify-start rounded-lg border p-1.5 drop-shadow-xs",
					className
				)}
				sideOffset={10}
				alignOffset={-7}
				{...props}>
				{children}
			</DropdownMenuPrimitive.SubContent>
		</DropdownMenuPrimitive.Portal>
	)
}
DropdownSubContent.displayName = "DropdownSubContent"

function DropdownDivider() {
	return <Divider spacing="6" className="-mx-1.5! w-[calc(100%+0.75rem)]" />
}

export {
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownGroup,
	DropdownItem,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
}
