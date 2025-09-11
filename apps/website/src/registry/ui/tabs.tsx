"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type TabsVariant = VariantProps<typeof tabsListStyles>["variant"]
export type TabsSize = VariantProps<typeof tabsListStyles>["size"]
export type TabsListWidth = VariantProps<typeof tabsListStyles>["width"]
export type TabsListContextType = {
	variant?: TabsVariant
	size?: TabsSize
	width?: TabsListWidth
}
export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>
export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> & TabsListContextType
export type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger>
export type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Content>

const tabsListStyles = cva(
	"flex data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:items-center data-[orientation=horizontal]:justify-start data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-center  data-[orientation=vertical]:flex-col  overflow-x-scroll no-scrollbar",
	{
		variants: {
			size: {
				sm: "data-[orientation=horizontal]:h-7",
				md: "data-[orientation=horizontal]:h-9",
				lg: "data-[orientation=horizontal]:h-11",
			},
			width: {
				fit: "w-max min-w-max max-w-full",
				full: "data-[orientation=horizontal]:w-full data-[orientation=horizontal]:items-stretch data-[orientation=horizontal]:*:flex-1",
			},
			variant: {
				default: "bg-fill2",
				open: "data-[orientation=horizontal]:border-b data-[orientation=vertical]:border-r border-border",
				outline: "border border-border",
				ghost: "",
				"outline-ghost": "bg-bg",
			},
		},
		defaultVariants: {
			size: "md",
			variant: "default",
			width: "fit",
		},
		compoundVariants: [
			{
				size: ["sm", "md", "lg"],
				variant: "default",
				className: "p-0.5",
			},
			{
				size: "sm",
				variant: ["default", "outline", "ghost"],
				className: "rounded-lg",
			},
			{
				size: "md",
				variant: ["default", "outline", "ghost"],
				className: "rounded-[0.625rem]",
			},
			{
				size: "lg",
				variant: ["default", "outline", "ghost"],
				className: "rounded-xl",
			},
			{
				size: ["sm", "md"],
				variant: "open",
				className: "data-[orientation=horizontal]:gap-3 data-[orientation=vertical]:gap-2",
			},
			{
				size: "lg",
				variant: "open",
				className: "data-[orientation=horizontal]:gap-4 data-[orientation=vertical]:gap-3",
			},
		],
	}
)

const tabsTriggerStyles = cva(
	"inline-flex items-center justify-center gap-1.5 focus-visible:ring focus-visible:ring-offset-1 whitespace-nowrap font-medium outline-none text-fg-secondary data-[state=active]:text-fgw-max data-[orientation=vertical]:w-full [&>svg]:text-fg-tertiary disabled:text-fg-disabled disabled:cursor-not-allowed box-border",
	{
		variants: {
			size: {
				sm: "text-xs [&>svg]:size-4",
				md: "text-sm [&>svg]:size-5",
				lg: "text-sm [&>svg]:size-5",
			},
			variant: {
				default:
					"data-[state=active]:bg-elevation-level2 border border-transparent data-[state=active]:border data-[state=active]:border-soft-alpha data-[state=active]:drop-shadow-xs",
				outline: "data-[state=active]:bg-fill2 data-[orientation=horizontal]:not-last:border-r data-[orientation=vertical]:not-last:border-b border-border",
				open: "data-[orientation=horizontal]:border-b-2 data-[orientation=vertical]:border-r-2 border-transparent data-[state=active][orientation=horizontal]:border-b-2 data-[state=active][orientation=vertical]:border-r-2 data-[state=active]:border-primary",
				ghost: "data-[state=active]:bg-fill2",
				"outline-ghost": "data-[state=active]:bg-bg border border-transparent data-[state=active]:border-soft-alpha data-[state=active]:drop-shadow-xs",
			},
		},
		compoundVariants: [
			{
				size: "sm",
				variant: ["default"],
				className: "rounded-md px-1.5 py-1 h-full",
			},
			{
				size: "md",
				variant: ["default"],
				className: "rounded-lg px-2.5 py-1.5 h-full",
			},
			{
				size: "lg",
				variant: ["default"],
				className: "rounded-[0.625rem] px-3 py-2 h-full",
			},
			{
				size: "sm",
				variant: ["outline", "ghost", "outline-ghost"],
				className: "p-1.5 data-[orientation=horizontal]:h-7",
			},
			{
				size: "md",
				variant: ["outline", "ghost", "outline-ghost"],
				className: "p-2",
			},
			{
				size: "lg",
				variant: ["outline", "ghost", "outline-ghost"],
				className: "p-3",
			},
			{
				size: "sm",
				variant: "open",
				className: "data-[orientation=horizontal]:py-1.5 data-[orientation=vertical]:px-1.5 h-7",
			},
			{
				size: "md",
				variant: "open",
				className: "data-[orientation=horizontal]:py-2 data-[orientation=vertical]:px-2 h-9",
			},
			{
				size: "lg",
				variant: "open",
				className: "data-[orientation=horizontal]:py-3 data-[orientation=vertical]:px-3 h-11",
			},
			{
				size: "sm",
				variant: "outline",
				className:
					"data-[orientation=horizontal]:first:rounded-l-lg data-[orientation=horizontal]:last:rounded-r-lg data-[orientation=vertical]:first:rounded-t-lg data-[orientation=vertical]:last:rounded-b-lg",
			},
			{
				size: "md",
				variant: "outline",
				className:
					"data-[orientation=horizontal]:first:rounded-l-[0.625rem] data-[orientation=horizontal]:last:rounded-r-[0.625rem] data-[orientation=vertical]:first:rounded-t-[0.625rem] data-[orientation=vertical]:last:rounded-b-[0.625rem]",
			},
			{
				size: "lg",
				variant: "outline",
				className:
					"data-[orientation=horizontal]:first:rounded-l-xl data-[orientation=horizontal]:last:rounded-r-xl data-[orientation=vertical]:first:rounded-t-xl data-[orientation=vertical]:last:roonded-b-xl data-[orientation=horizontal]:h-11",
			},
			{
				size: "sm",
				variant: ["ghost", "outline-ghost"],
				className: "data-[state=active]:rounded-md ",
			},
			{
				size: "md",
				variant: ["ghost", "outline-ghost"],
				className: "data-[state=active]:rounded-lg h-full",
			},
			{
				size: "lg",
				variant: ["ghost", "outline-ghost"],
				className: "data-[state=active]:rounded-[0.625rem] h-full",
			},
		],
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	}
)

const TabsListContext = React.createContext<TabsListContextType | null>(null)

function useTabsList() {
	const context = React.use(TabsListContext)
	if (!context) {
		throw new Error("useTabsContext must be used within a Context Provider")
	}
	return context
}

function Tabs({ className, ...props }: TabsProps) {
	return <TabsPrimitive.Root className={cn("no-scrollbar flex w-full flex-col gap-3 data-[orientation=vertical]:flex-row", className)} {...props} />
}
Tabs.displayName = TabsPrimitive.Root.displayName

function TabsList({ className, width = "fit", children, size = "md", variant = "default", ...props }: TabsListProps) {
	const ctxValues = React.useMemo(() => ({ variant, size, width }), [variant, size, width])
	return (
		<TabsListContext.Provider value={ctxValues}>
			<TabsPrimitive.List className={cn(tabsListStyles({ size, variant, width }), className)} {...props}>
				{children}
			</TabsPrimitive.List>
		</TabsListContext.Provider>
	)
}
TabsList.displayName = TabsPrimitive.List.displayName

function TabsTrigger({ className, ...props }: TabsTriggerProps) {
	const { size, variant } = useTabsList()
	return <TabsPrimitive.Trigger className={cn(tabsTriggerStyles({ variant, size }), className)} {...props} />
}
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

function TabsContent({ className, ...props }: TabsContentProps) {
	return <TabsPrimitive.Content className={cn("flex-1 outline-none data-[state=inactive]:hidden", className)} {...props} />
}

TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
