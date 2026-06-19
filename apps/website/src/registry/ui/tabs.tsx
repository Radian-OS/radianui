"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type TabsVariant = VariantProps<typeof tabsListStyles>["variant"]
export type TabsListWidth = VariantProps<typeof tabsListStyles>["width"]
export type TabsListContextType = {
	variant?: TabsVariant
	width?: TabsListWidth
}
export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>
export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> &
	TabsListContextType
export type TabsTriggerProps = React.ComponentProps<
	typeof TabsPrimitive.Trigger
>
export type TabsContentProps = React.ComponentProps<
	typeof TabsPrimitive.Content
>

const tabsListStyles = cva(
	"flex data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:h-9 data-[orientation=horizontal]:items-center data-[orientation=horizontal]:justify-start data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-center  data-[orientation=vertical]:flex-col shrink-0 overflow-x-scroll no-scrollbar",
	{
		variants: {
			width: {
				fit: "w-max min-w-max max-w-full",
				full: "data-[orientation=horizontal]:w-full data-[orientation=horizontal]:items-stretch data-[orientation=horizontal]:*:flex-1",
			}, // default medium
			variant: {
				default: "bg-fill2",
				open: "data-[orientation=horizontal]:border-b data-[orientation=vertical]:border-r border-border",
				outline: "border border-border",
				ghost: "",
				"outline-ghost": "bg-bg",
			},
		},
		defaultVariants: {
			variant: "default",
			width: "fit",
		},
		compoundVariants: [
			{
				variant: "default",
				className: "p-0.5",
			},
			{
				variant: ["default", "outline", "ghost"],
				className: "rounded-lg",
			},
			{
				variant: "open",
				className:
					"data-[orientation=horizontal]:gap-3 data-[orientation=vertical]:gap-2",
			},
		],
	}
)

const tabsTriggerStyles = cva(
	"inline-flex items-center justify-center text-sm [&>svg]:size-5 gap-1.5 focus-visible:ring focus-visible:ring-offset-1 whitespace-nowrap font-medium outline-none text-fg-secondary data-[state=active]:text-fg w-max data-[orientation=vertical]:w-full [&>svg]:text-fg-tertiary [&>svg]:shrink-0 disabled:text-fg-disabled disabled:[&>svg]:text-fg-disabled disabled:cursor-not-allowed box-border",
	{
		variants: {
			variant: {
				default:
					"data-[state=active]:bg-elevation-level2 border border-transparent data-[state=active]:border data-[state=active]:border-soft-alpha data-[state=active]:drop-shadow-xs",
				outline:
					"data-[state=active]:bg-fill2 data-[orientation=horizontal]:not-last:border-r data-[orientation=vertical]:not-last:border-b border-border",
				open: "data-[orientation=horizontal]:border-b-2 data-[orientation=vertical]:border-r-2 border-transparent data-[state=active][orientation=horizontal]:border-b-2 data-[state=active][orientation=vertical]:border-r-2 data-[state=active]:border-primary",
				ghost:
					"data-[state=active]:bg-primary-accent data-[state=active]:text-primary-text",
				"outline-ghost":
					"data-[state=active]:bg-bg border border-transparent data-[state=active]:border-soft data-[state=active]:drop-shadow-xs",
			},
		},
		compoundVariants: [
			{
				variant: ["default"],
				className: "rounded-md px-2.5 py-1.5 h-full",
			},
			{
				variant: ["outline", "ghost", "outline-ghost"],
				className: "p-2",
			},
			{
				variant: "open",
				className:
					"data-[orientation=horizontal]:py-2 data-[orientation=vertical]:px-2 h-9",
			},
			{
				variant: "outline",
				className:
					"data-[orientation=horizontal]:first:rounded-l-[0.625rem] data-[orientation=horizontal]:last:rounded-r-[0.625rem] data-[orientation=vertical]:first:rounded-t-[0.625rem] data-[orientation=vertical]:last:rounded-b-[0.625rem]",
			},
			{
				variant: ["ghost", "outline-ghost"],
				className: "data-[state=active]:rounded-lg h-full",
			},
		],
		defaultVariants: {
			variant: "default",
		},
	}
)

const TabsListContext = React.createContext<TabsListContextType | null>(null)

function useTabsList() {
	const context = React.use(TabsListContext)
	if (!context) {
		throw new Error("useTabsList must be used within a Context Provider")
	}
	return context
}

function Tabs({ className, ...props }: TabsProps) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			className={cn(
				"no-scrollbar flex flex-col gap-3 data-[orientation=vertical]:flex-row",
				className
			)}
			{...props}
		/>
	)
}
Tabs.displayName = TabsPrimitive.Root.displayName

function TabsList({
	className,
	width = "fit",
	children,
	variant = "default",
	...props
}: TabsListProps) {
	const ctxValues = React.useMemo(() => ({ variant, width }), [variant, width])
	return (
		<TabsListContext.Provider value={ctxValues}>
			<TabsPrimitive.List
				data-slot="tabs-list"
				className={cn(tabsListStyles({ variant, width }), className)}
				{...props}>
				{children}
			</TabsPrimitive.List>
		</TabsListContext.Provider>
	)
}
TabsList.displayName = TabsPrimitive.List.displayName

function TabsTrigger({ className, ...props }: TabsTriggerProps) {
	const { variant } = useTabsList()
	return (
		<TabsPrimitive.Trigger
			data-slot="tabs-trigger"
			className={cn(tabsTriggerStyles({ variant }), className)}
			{...props}
		/>
	)
}
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

function TabsContent({ className, ...props }: TabsContentProps) {
	return (
		<TabsPrimitive.Content
			data-slot="tabs-content"
			className={cn(
				"flex-1 outline-none data-[state=inactive]:hidden",
				className
			)}
			{...props}
		/>
	)
}

TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
