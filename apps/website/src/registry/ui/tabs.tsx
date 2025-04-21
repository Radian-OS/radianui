"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { TabsListProps } from "@radix-ui/react-tabs"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Define styles for the TabsList component
const tabsListStyles = cva("inline-flex h-10 items-center justify-start max-w-full overflow-x-scroll no-scrollbar", {
	variants: {
		size: {
			small: "",
			base: "",
		},
		variant: {
			default: "rounded-lg bg-bg-level0 w-fit p-1",
			open: "border-b border-border",
			outline: "w-fit",
			ghost: "w-fit",
		},
	},
	defaultVariants: {
		size: "base",
	},
	compoundVariants: [
		{
			size: "small",
			variant: "default",
			className: "h-10",
		},
		{
			size: "small",
			variant: ["ghost", "open", "outline"],
			className: "h-9",
		},
		{
			size: "base",
			variant: "default",
			className: "h-11",
		},
		{
			size: "base",
			variant: ["ghost", "open", "outline"],
			className: "h-10",
		},
	],
})
// Define styles for the TabsTrigger component
const tabsTriggerStyles = cva(
	"focus-visible:ring-ring inline-flex items-center justify-center gap-1.5 whitespace-nowrap \
				px-3 py-1.5 text-sm font-medium ring-offset-background \
				text-text-secondary focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none \
				disabled:opacity-50 data-[state=active]:text-text w-fit",
	{
		variants: {
			variant: {
				default:
					"data-[state=active]:bg-bg-base rounded-sm border border-transparent data-[state=active]:rounded-md data-[state=active]:border data-[state=active]:border-border data-[state=active]:drop-shadow-xs",
				outline:
					"border-b border-t first:rounded-l-lg last:rounded-r-lg last:border-l last:border-r last:border-border data-[state=active]:bg-bg-level0 not-last:border-l not-last:border-border",
				open: "h-full border-b-0 data-[state=active]:border-b-2 data-[state=active]:border-primary",
				ghost: "data-[state=active]:rounded-md data-[state=active]:bg-bg-level1",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
)

export type TabsVariant = "default" | "open" | "outline" | "ghost"
export type TabsSize = "small" | "base"
// Define context for managing tab variants and size
type TabsContext = {
	variant: TabsVariant
	size: TabsSize
}
// Custom hook for accessing the Tabs context
const TabsVariantContext = React.createContext<TabsContext>({
	variant: "default",
	size: "base",
})
// Tabs component that provides context for its children
function useTabsContext() {
	const context = React.use(TabsVariantContext)
	if (context === undefined) {
		throw new Error("useTabsContext must be used within a Context Provider")
	}
	return context
}

function Tabs({
	variant = "default",
	size = "base",
	className,
	defaultValue,
	children,
	...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
	variant?: "default" | "open" | "outline" | "ghost"
	size?: "small" | "base"
}) {
	return (
		<TabsVariantContext.Provider value={{ variant: variant, size: size }}>
			<TabsPrimitive.Root className={cn("no-scrollbar flex w-full flex-col gap-3", className)} defaultValue={defaultValue} {...props}>
				{children}
			</TabsPrimitive.Root>
		</TabsVariantContext.Provider>
	)
}

export type TabsListWidth = "fit" | "full"
// TabsList component that applies styles based on the provided width and context
function TabsList({
	className,
	width = "fit",
	children,
	...props
}: TabsListProps &
	React.RefAttributes<HTMLDivElement> & {
		width?: TabsListWidth
	}) {
	const tabsCtx = useTabsContext()

	return (
		<TabsPrimitive.List
			className={cn(
				tabsListStyles({ size: tabsCtx.size, variant: tabsCtx.variant }),
				"items-stretch",
				{
					"w-full *:flex-1": width == "full",
				},
				className
			)}
			{...props}>
			{children}
		</TabsPrimitive.List>
	)
}
TabsList.displayName = TabsPrimitive.List.displayName

type PrimitiveTriggerExtended = React.ComponentPropsWithRef<typeof TabsPrimitive.Trigger> & {
	counter?: number
	icon?: React.ReactNode
}
// TabsTrigger component that renders a tab button with optional icon and counter
function TabsTrigger({ className, icon, counter, disabled = false, children, ...props }: PrimitiveTriggerExtended) {
	const tabsCtx = useTabsContext()

	return (
		<TabsPrimitive.Trigger
			className={cn(
				tabsTriggerStyles({ variant: tabsCtx.variant }),
				{
					"text-border-secondary text-text-tertiary pointer-events-none cursor-not-allowed": disabled,
				},
				className
			)}
			{...props}>
			{icon != undefined && <span className={cn("text-text-secondary [&>svg]:size-5", { "text-text-tertiary": disabled })}>{icon}</span>}
			{children}
			{counter != undefined && (
				<span className="border-border bg-bg-base text-text-secondary flex h-5 items-center justify-center gap-4 rounded-full border px-1.5 py-0 text-xs">
					{counter}
				</span>
			)}
		</TabsPrimitive.Trigger>
	)
}
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName
// TabsContent component that renders the content for the active tab
function TabsContent({ className, ...props }: React.ComponentPropsWithRef<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			className={cn(
				"focus-visible:ring-ring ring-offset-background focus-visible:outline-hidden m-0 max-w-full p-0 focus-visible:ring-2 focus-visible:ring-offset-2",
				className
			)}
			{...props}
		/>
	)
}

TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
