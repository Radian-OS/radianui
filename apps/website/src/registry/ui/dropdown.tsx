"use client"

import React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { DropdownMenuContentProps, DropdownMenuGroupProps, DropdownMenuItemProps, DropdownMenuSubContentProps, DropdownMenuTriggerProps } from "@radix-ui/react-dropdown-menu"
import { Check, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
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

//Create a DropdownTrigger component
function DropdownTrigger({ asChild, children, ...props }: DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>) {
	if (asChild) {
		return (
			<DropdownMenuPrimitive.Trigger asChild {...props}>
				{children}
			</DropdownMenuPrimitive.Trigger>
		)
	}

	return (
		<DropdownMenuPrimitive.Trigger {...props} asChild>
			<Button color="neutral" variant="outline">
				{children}
				<ChevronDown size={20} className="text-text-tertiary" />
			</Button>
		</DropdownMenuPrimitive.Trigger>
	)
}
DropdownTrigger.displayName = "DropdownTrigger"
// Create a DropdownContent component
function DropdownContent({
	className,
	children,
	placement,
	...props
}: Omit<DropdownMenuContentProps, "side"> &
	React.RefAttributes<HTMLDivElement> & {
		placement?: DropdownMenuContentProps["side"]
	}) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				align="start"
				side={placement}
				className={cn(
					"no-scrollbar border-border bg-bg-level2 drop-shadow-xs z-50 min-w-[var(--radix-dropdown-menu-trigger-width)] overflow-x-visible overflow-y-scroll rounded-lg border px-1.5 py-1.5",
					"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",

					className
				)}
				sideOffset={4}
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
	// shortcut,
	children,
	// icon,
	asChild = false,
	startContent,
	endContent,
	...props
}: DropdownMenuItemProps &
	React.RefAttributes<HTMLDivElement> & {
		inset?: boolean
		shortcut?: string
		icon?: React.ReactNode
		value?: string
		startContent?: React.ReactNode
		endContent?: React.ReactNode
	}) {
	const { isSelectable, isSelected, handleSelect } = useDropdownSelection(value)

	return (
		<DropdownMenuPrimitive.Item
			className={cn(
				"focus:text-primary-foreground hover:bg-fill-level2 outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 relative flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm px-2.5 py-1.5 text-sm transition-colors [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
				inset && "pl-9",
				isSelected && "bg-fill-level3",
				className
			)}
			asChild={asChild}
			onSelect={handleSelect}
			{...props}>
			{asChild ? (
				children
			) : (
				<>
					<div className="flex gap-2">
						{startContent && <span className="flex items-center justify-center">{startContent}</span>}
						<span className={`flex flex-1 items-center gap-2 truncate [&_svg]:size-5`}>{children}</span>
					</div>
					<div className="flex items-center gap-2">
						{endContent && <span className="flex items-center justify-center">{endContent}</span>}
						{isSelectable && (isSelected ? <Check size={20} className="stroke-text" /> : "")}
					</div>
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

	// Check if this group should have a divider after it
	const groupRef = React.useRef<HTMLDivElement>(null)
	const [shouldAddDivider, setShouldAddDivider] = React.useState(false)

	React.useEffect(() => {
		if (groupRef.current) {
			const parentElement = groupRef.current.parentElement
			if (parentElement) {
				const allGroups = Array.from(parentElement.children).filter((child) => child.querySelector("[data-radix-dropdown-menu-group]") !== null)
				const currentIndex = allGroups.indexOf(groupRef.current)
				const isLastGroup = currentIndex === allGroups.length - 1
				setShouldAddDivider(!isLastGroup)
			}
		}
	}, [children])

	return (
		<div className="bg-bg-level2" ref={groupRef}>
			<DropdownCtx.Provider value={contextValue}>
				<DropdownMenuPrimitive.Group className={cn(className, "z-50 flex flex-col items-stretch justify-start gap-0.5 px-0 py-0")} data-radix-dropdown-menu-group {...props}>
					{title && <label className="text-text-tertiary text-xs/4.5 flex h-7 items-center px-2 py-2.5 font-medium uppercase">{title}</label>}
					{children}
				</DropdownMenuPrimitive.Group>
			</DropdownCtx.Provider>
			{shouldAddDivider && <DropdownDivider />}
		</div>
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
				"focus:text-primary-foreground hover:bg-fill-level2 outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 flex cursor-pointer items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
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
					"border-border bg-bg-level2 drop-shadow-xs z-50 flex min-w-36 flex-col items-stretch justify-start rounded-lg border p-1.5",
					"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
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

export { Dropdown, DropdownContent, DropdownDivider, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger }
