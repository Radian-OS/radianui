"use client"

import React from "react"

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { type DropdownMenuContentProps, type DropdownMenuGroupProps, type DropdownMenuItemProps, type DropdownMenuSubContentProps } from "@radix-ui/react-dropdown-menu"
import { Slot } from "@radix-ui/react-slot"
import { Check, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

function Dropdown({ ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>) {
	return <DropdownMenuPrimitive.Root modal={false} data-slot="dropdown-menu" {...props} />
}
Dropdown.displayName = "Dropdown"

function DropdownTrigger({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
	return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}
DropdownTrigger.displayName = "DropdownTrigger"

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

function DropdownItem({
	className,
	inset,
	value,
	children,
	asChild = false,
	start,
	end,
	...props
}: DropdownMenuItemProps &
	React.RefAttributes<HTMLDivElement> & {
		inset?: boolean
		shortcut?: string
		icon?: React.ReactNode
		value?: string
		start?: React.ReactNode
		end?: React.ReactNode
	}) {
	const { isSelectable, isSelected, handleSelect } = useDropdownSelection(value)

	if (asChild) {
		return (
			<DropdownMenuPrimitive.Item data-slot="dropdown-menu-item" asChild className={className} {...props}>
				{children}
			</DropdownMenuPrimitive.Item>
		)
	}

	return (
		<DropdownMenuPrimitive.Item
			data-slot="dropdown-menu-item"
			className={cn(
				"focus:bg-fill2-alpha data-disabled:pointer-events-none data-disabled:opacity-50 outline-hidden",
				"relative flex w-full cursor-pointer items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm",
				"[&_svg]:text-fg-secondary transition-colors [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
				inset && "pl-9",
				className
			)}
			onSelect={handleSelect}
			{...props}>
			{start && <span>{start}</span>}
			<span className="flex items-center gap-2 truncate">{children}</span>
			{end && <span className="ml-auto">{end}</span>}
			{isSelectable && isSelected && <Check size={20} className="stroke-fg ml-auto" />}
		</DropdownMenuPrimitive.Item>
	)
}
DropdownItem.displayName = "DropdownItem"

type DropdownGroupProps = {
	selectionMode?: "single" | "multiple"
	selectedValues?: string[]
	onSelectedChange?: (selectedValues: string[]) => void
	minSelectionCount?: number
}

const DropdownCtx = React.createContext<DropdownGroupProps>({
	selectionMode: undefined,
})

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
		<div className="bg-elevation-level2" ref={groupRef}>
			<DropdownCtx.Provider value={contextValue}>
				<DropdownMenuPrimitive.Group
					data-slot="dropdown-menu-group"
					className={cn(className, "z-50 flex flex-col items-stretch justify-start gap-0.5 px-0 py-0")}
					data-radix-dropdown-menu-group
					{...props}>
					{title && <label className="text-fg-tertiary text-xs/4.5 flex h-7 items-center px-2 py-2.5 font-medium uppercase">{title}</label>}
					{children}
				</DropdownMenuPrimitive.Group>
			</DropdownCtx.Provider>
			{shouldAddDivider && <DropdownDivider />}
		</div>
	)
}

DropdownGroup.displayName = "DropdownGroup"

function DropdownSub({ ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Sub>) {
	return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}
DropdownSub.displayName = "DropdownSub"

function DropdownSubTrigger({
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
			<DropdownMenuPrimitive.SubTrigger asChild {...props}>
				<Slot className={cn(className)}>{children}</Slot>
			</DropdownMenuPrimitive.SubTrigger>
		)
	}

	return (
		<DropdownMenuPrimitive.SubTrigger
			data-slot="dropdown-menu-sub-trigger"
			className={cn(
				"data-[state=open]:bg-fill2-alpha focus:bg-fill2-alpha outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 flex cursor-pointer select-none items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
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

function DropdownSubContent({ children, className, ...props }: DropdownMenuSubContentProps & React.RefAttributes<HTMLDivElement>) {
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
				{...props}>
				{children}
			</DropdownMenuPrimitive.SubContent>
		</DropdownMenuPrimitive.Portal>
	)
}
DropdownSubContent.displayName = "DropdownSubContent"

function DropdownDivider() {
	return <DropdownMenuPrimitive.Separator data-slot="dropdown-menu-separator" className={cn("bg-soft-alpha -mx-1 my-1 h-px")} />
}

export { Dropdown, DropdownContent, DropdownDivider, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger }
