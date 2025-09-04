"use client"

import React, { useEffect, useRef, useState } from "react"
// import { cva } from "class-variance-authority"
import { Command as CommandPrimitive } from "cmdk"
import { Check, ChevronDown, ChevronUp, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Button } from "./button"
import { Divider } from "./divider"
import { Dropdown, DropdownContent, DropdownTrigger } from "./dropdown"
import { Input, type InputProps } from "./input"
import { Label } from "./label"

// Type definition for the SelectItem component props
type SelectItemProps = {
	value: string
	children: React.ReactNode
	startContent?: React.ReactNode
	endContent?: React.ReactNode
}
// SelectItem component representing an individual item in the select dropdown
function SelectItem({ value, children, startContent, endContent, ref, className, ...props }: SelectItemProps & React.ComponentPropsWithRef<typeof CommandItem>) {
	const commandRef = React.useRef<React.ElementRef<typeof CommandItem>>(null)
	React.useImperativeHandle(ref, () => commandRef.current!, [])

	const { values, setValues, selectionMode, setOpen, minSelectionCount, showSelectedCheck, open } = useSelectContext()

	const isSelected = values.includes(value as string)

	/* When the popover is open and this item is selected, scroll it into view */
	React.useEffect(
		function () {
			if (open && isSelected && commandRef.current) {
				commandRef.current.scrollIntoView({
					block: "end",
				})
			}
		},
		[open, isSelected]
	)

	return (
		<CommandItem
			keywords={[value, children?.toString() || ""]}
			key={value}
			value={value}
			ref={commandRef}
			onSelect={function (currentValue) {
				/* For single selection, update the value and close the popover */
				if (selectionMode == "single") {
					if (minSelectionCount === 1 && values[0] === currentValue) return
					setValues(isSelected ? [] : [currentValue])
					setOpen(false)
				} else if (selectionMode == "multiple") {
					/* For multiple selections, add or remove the item from the list*/
					if (values.length === minSelectionCount && values.includes(currentValue)) return
					setValues(isSelected ? values.filter((v) => v !== currentValue) : [...values, currentValue])
				}
			}}
			className={cn(
				"text-fgflex cursor-pointer justify-between",
				{
					"bg-fill2": isSelected,
					"hover:bg-fill2": !isSelected,
				},
				className
			)}
			{...props}>
			<div className="flex flex-1 gap-2">
				{startContent && <span className="flex items-center justify-center">{startContent}</span>}
				<span className={`flex flex-1 items-center gap-2 truncate [&_svg]:size-5`}>{children}</span>

				{endContent && <span>{endContent}</span>}
				{showSelectedCheck && (isSelected ? <Check size={20} className="stroke-fg" /> : "")}
			</div>
		</CommandItem>
	)
}
SelectItem.displayName = "SelectItem"
// Hook to use the Select context
function useSelectContext() {
	const context = React.use(SelectContext)
	if (context === undefined) {
		throw new Error("useTabsContext must be used within a Context Provider")
	}
	return context
}
// Type definition for the SelectGroup component props
type SelectGroupProps = {
	children?: React.ReactNode
	label?: string
}
// SelectGroup component for grouping related select items
function SelectGroup({ label, children }: SelectGroupProps) {
	return <CommandGroup heading={label ? label : undefined}>{children}</CommandGroup>
}
// Variants for the Select trigger styling using class variance authority
// const SelectTriggerVariations = cva("active:bg-fill3 justify-start gap-2 border-border px-3 py-2.5 text-fgdrop-shadow-xs hover:bg-fill2", {
// 	variants: {
// 		...cvaInputVariants,
// 	},
// 	defaultVariants: {
// 		size: defaultInputSize,
// 	},
// })
// Type definition for the Select context
type SelectContextType = {
	values: string[]
	setValues: (values: string[]) => void
	selectionMode: "single" | "multiple"
	setOpen: (open: boolean) => void
	open: boolean
	minSelectionCount: number
	showSelectedCheck: boolean
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined)

export type SelectClassNames = {
	base?: string /* The div that wraps the whole component */
	label?: string /* The label of the component */
	trigger?: string /* The trigger of the component */
	content?: string /* The content that is displayed in the popover */
	input?: string /* The search input used inside the select */
}

export type SelectProps = Pick<InputProps, "label" | "placeholder" | "children" | "size" | "disabled" | "className"> & {
	selectedValues?: string[]
	variant?: "strong" | "outline" | "soft" | "ghost" | "neutral-soft" | "neutral-outline" | null
	disableOpenStyle?: boolean
	onSelectedChange?: (values: string[]) => void
	selectionMode?: "single" | "multiple"
	isSearchable?: boolean
	searchPlaceholder?: string
	/* Allow user to render a custom trigger */
	renderTrigger?: (selectedValues: string[]) => React.ReactNode
	defaultSelected?: string[]
	minSelectionCount?: number
	showSelectedCheck?: boolean
	classNames?: SelectClassNames
	variants?: "input" | "button" | "tags"
	lead?: React.ReactNode
	trail?: React.ReactNode
	customValue?: React.ReactNode
	endIcon?: boolean
	hint?: string
	hasError?: boolean
	// New props for external open state control
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

// Select component for rendering a dropdown with selection options
function Select({
	children,
	label,
	// disableOpenStyle = false,
	placeholder,
	selectedValues,
	onSelectedChange,
	isSearchable = false,
	selectionMode = "single",
	lead,
	// trail,
	searchPlaceholder = "Search",
	renderTrigger,
	size = "40",
	defaultSelected = [],
	minSelectionCount = 0,
	showSelectedCheck = true,
	disabled = false,
	className,
	classNames,
	customValue,
	variants = "button",
	endIcon = true,
	hint,
	hasError = false,
	// New props for external open state control
	open: externalOpen,
	onOpenChange,
}: SelectProps) {
	const [internalOpen, setInternalOpen] = React.useState(false)
	const [internalSelectedValues, setInternalSelectedValues] = React.useState<string[]>(defaultSelected)

	const isControlled = selectedValues !== undefined
	const isOpenControlled = externalOpen !== undefined

	// Use external open state if provided, otherwise use internal state
	const open = isOpenControlled ? externalOpen : internalOpen

	// Handle open state changes
	const handleOpenChange = React.useCallback(
		(newOpen: boolean) => {
			if (onOpenChange) {
				onOpenChange(newOpen)
			}
			if (!isOpenControlled) {
				setInternalOpen(newOpen)
			}
		},
		[onOpenChange, isOpenControlled]
	)

	if (minSelectionCount < 0) throw new Error("minSelectionCount cannot be negative")

	function handleSelectionChange(newValues: string[]) {
		onSelectedChange?.(newValues)
		setInternalSelectedValues(newValues)
	}

	/**
	 * Helper function to extract value and label information from children.
	 * This flattens out both SelectItem and nested SelectGroup components.
	 */
	function getChildrenArray(children: React.ReactNode): { value: string; label: string }[] {
		const childrenArr: { value: string; label: string }[] = []
		React.Children.forEach(children, (child) => {
			if (React.isValidElement(child)) {
				// Cast the child as a React element with props of either SelectItemProps or SelectGroupProps.
				const childElement = child as React.ReactElement<SelectItemProps | SelectGroupProps>
				if (childElement.type === SelectItem) {
					const props = childElement.props as SelectItemProps
					childrenArr.push({
						value: props.value,
						label: String(props.children),
					})
				}
				if (childElement.type === SelectGroup) {
					const groupProps = childElement.props as SelectGroupProps
					childrenArr.push(...getChildrenArray(groupProps.children))
				}
			}
		})
		return childrenArr
	}

	const childrenArr = getChildrenArray(children)

	/* Always use this values instead of internalSelectedValues */
	const values = isControlled ? selectedValues : internalSelectedValues
	/* Retrieve the labels of the selected items to display in the trigger */
	const selectedLabels = values.length > 0 ? childrenArr.filter((data) => values.includes(data.value)).map((data) => data.label) : []

	const removeValue = (labelToRemove: string) => {
		const updated = internalSelectedValues.filter((val) => val !== labelToRemove)
		handleSelectionChange(updated)
	}

	return (
		<div className="flex items-center justify-center">
			<SelectContext.Provider
				value={{
					values: values,
					setValues: handleSelectionChange,
					selectionMode,
					setOpen: handleOpenChange,
					open,
					minSelectionCount,
					showSelectedCheck,
				}}>
				<div className={cn("flex h-full w-full flex-col gap-1", classNames?.base)}>
					{label && <Label className={cn({ "text-fg-tertiary": disabled }, classNames?.label)}>{label}</Label>}
					<Dropdown
						open={open}
						onOpenChange={(newOpen) => {
							if (!disabled) {
								handleOpenChange(newOpen)
							}
						}}>
						<DropdownTrigger asChild>
							{renderTrigger ? (
								renderTrigger(values)
							) : (
								<div>
									{variants === "input" ? (
										<Input
											placeholder={placeholder}
											start={lead}
											end={!open ? <ChevronDown size={20} className="text-fg-tertiary" /> : <ChevronUp size={20} className="text-fg-tertiary" />}
											size={size}
											value={selectedLabels}
											hint={hint}
											hasError={hasError}
											disabled={disabled}
										/>
									) : variants === "button" ? (
										<Button
											end={endIcon && (!open ? <ChevronDown size={16} className="text-fg-tertiary" /> : <ChevronUp size={16} className="text-fg-tertiary" />)}
											variant="outline"
											color="neutral"
											size={["28", "32", "36", "40", "44", "48"].includes(String(size)) ? (size as "28" | "32" | "36" | "40" | "44" | "48") : "40"}
											disabled={disabled}
											className={className}>
											<span
												className={cn("text-fg flex-1 shrink-0 items-center gap-2 truncate text-start font-medium", {
													"text-base": size === "44" || size === "48",
												})}>
												{selectedLabels.length == 0 && placeholder}
												{customValue && `${customValue}`}
												{selectionMode === "single" && selectedLabels.length === 1 && " " + selectedLabels[0]}
												{selectionMode === "multiple" && selectedLabels.length > 0 && " " + selectedLabels.join(", ")}
											</span>
										</Button>
									) : (
										<div
											tabIndex={0}
											className={`focus-within:border-primary focus-within:ring-primary/10 border-alpha flex cursor-pointer border focus-within:ring-2 ${
												disabled ? "text-fg-disabled bg-fill1 cursor-not-allowed drop-shadow-none" : ""
											} flex min-h-[35px] w-full flex-wrap items-center gap-2 p-2 text-sm`}>
											{internalSelectedValues.length === 0 ? (
												<span className="text-fg-tertiary">{placeholder}</span>
											) : (
												internalSelectedValues.map((value) => (
													<span key={value} className="flex items-center">
														{disabled ? <Badge>{value}</Badge> : <Badge onClick={() => removeValue(value)}>{value}</Badge>}
													</span>
												))
											)}
										</div>
									)}
								</div>
							)}
						</DropdownTrigger>
						<DropdownContent className="w-fit p-0">
							<Command className={cn("max-h-96 min-w-[var(--radix-popover-trigger-width)]", classNames?.content)}>
								{isSearchable && <CommandInput className={classNames?.input} placeholder={searchPlaceholder} />}
								<CommandList>
									<CommandEmpty>No items found</CommandEmpty>
									<CommandItem value="-" className="hidden" />
									{children}
								</CommandList>
							</Command>
						</DropdownContent>
					</Dropdown>
				</div>
			</SelectContext.Provider>
		</div>
	)
}

// SelectDivider component that renders a Divider with specific styling
function SelectDivider() {
	return <Divider className="-mx-1.5 w-[calc(100%+0.75rem)]" />
}
// Command component that wraps the CommandPrimitive with additional styling
function Command({ className, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive>) {
	return <CommandPrimitive className={cn("bg-elevation-level2 text-fgflex h-full w-full flex-col overflow-hidden rounded-md", className)} {...props} />
}
Command.displayName = CommandPrimitive.displayName
// CommandInput component that renders an input field with a search icon
function CommandInput({ className, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive.Input>) {
	return (
		<div className="flex items-center gap-2 border-b px-3.5 py-1.5" cmdk-input-wrapper="">
			<Search className="h-5 w-5 shrink-0 opacity-50" />
			<CommandPrimitive.Input
				className={cn(
					"placeholder:text-fg-tertiary outline-hidden flex h-8 w-full rounded-md bg-transparent py-3 text-sm font-normal disabled:cursor-not-allowed disabled:opacity-50",
					className
				)}
				{...props}
			/>
		</div>
	)
}
CommandInput.displayName = CommandPrimitive.Input.displayName
// CommandList component that renders a list of command items
function CommandList({ className, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive.List>) {
	return <CommandPrimitive.List className={cn("no-scrollbar max-h-100 h-fit w-full overflow-y-auto overflow-x-hidden py-1.5", className)} {...props} />
}
CommandList.displayName = CommandPrimitive.List.displayName
// CommandEmpty component that displays a message when the command list is empty
function CommandEmpty(props: React.ComponentPropsWithRef<typeof CommandPrimitive.Empty>) {
	return <CommandPrimitive.Empty className="py-6 text-center text-sm" {...props} />
}
CommandEmpty.displayName = CommandPrimitive.Empty.displayName
// CommandGroup component that groups related command items together
function CommandGroup({ className, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive.Group>) {
	const [shouldShowDivider, setShouldShowDivider] = useState(false)
	const groupRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const checkDividerVisibility = () => {
			if (!groupRef.current) return

			const commandList = groupRef.current.closest("[cmdk-list]")
			if (!commandList) return

			// Get all groups in the command list
			const allGroups = Array.from(commandList.querySelectorAll("[cmdk-group]"))

			// Find groups that have visible items
			const visibleGroups = allGroups.filter((group) => {
				const visibleItems = group.querySelectorAll("[cmdk-item]:not([hidden])")
				return visibleItems.length > 0
			})

			// Check if current group has visible items
			const currentGroupHasVisibleItems = groupRef.current.querySelectorAll("[cmdk-item]:not([hidden])").length > 0

			// Check if this is the last visible group
			const isLastVisibleGroup = visibleGroups[visibleGroups.length - 1] === groupRef.current

			// Only show divider if:
			// 1. Current group has visible items
			// 2. There are multiple visible groups
			// 3. This is NOT the last visible group
			const shouldShow = currentGroupHasVisibleItems && visibleGroups.length > 1 && !isLastVisibleGroup

			setShouldShowDivider(shouldShow)
		}

		const observer = new MutationObserver(checkDividerVisibility)

		if (groupRef.current) {
			// Watch the entire command list for changes
			const commandList = groupRef.current.closest("[cmdk-list]")
			if (commandList) {
				observer.observe(commandList, {
					childList: true,
					subtree: true,
					attributes: true,
					attributeFilter: ["hidden"],
				})
			}

			// Initial check
			checkDividerVisibility()
		}

		return () => observer.disconnect()
	}, [])

	return (
		<>
			<CommandPrimitive.Group
				ref={groupRef}
				className={cn(
					"text-fg[&_[cmdk-group-heading]]:text-fg-tertiary overflow-hidden p-0 px-1.5 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-items]]:flex [&_[cmdk-group-items]]:flex-col [&_[cmdk-group-items]]:gap-0.5",
					className
				)}
				{...props}
			/>
			{shouldShowDivider && <Divider className="bg-border mx-2 my-1 h-px" />}
		</>
	)
}
CommandGroup.displayName = CommandPrimitive.Group.displayName
// CommandItem component that represents an individual command item in the list
function CommandItem({ className, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive.Item>) {
	return (
		<CommandPrimitive.Item
			className={cn(
				"hover:bg-fill2 outline-hidden relative flex cursor-default select-none items-center rounded-sm px-2.5 py-1.5 text-sm font-normal data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className
			)}
			{...props}
		/>
	)
}
CommandItem.displayName = CommandPrimitive.Item.displayName
// CommandShortcut component that displays a keyboard shortcut
function CommandShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
	return <span className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)} {...props} />
}
CommandShortcut.displayName = "CommandShortcut"

export { Select, SelectDivider, SelectGroup, SelectItem }
