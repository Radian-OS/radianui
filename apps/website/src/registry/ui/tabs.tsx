"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { TabsListProps } from "@radix-ui/react-tabs"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"

export type TabsVariant = VariantProps<typeof tabsListStyles>["variant"]
export type TabsSize = VariantProps<typeof tabsListStyles>["size"]
export type TabsListWidth = "fit" | "full"
export type TabsContextType = {
	variant?: TabsVariant
	size?: TabsSize
}

const tabsListStyles = cva(
	"flex data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:items-center data-[orientation=horizontal]:justify-start data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-center h-fit w-max data-[orientation=vertical]:flex-col min-w-max max-w-full overflow-x-scroll no-scrollbar",
	{
		variants: {
			size: {
				sm: "",
				md: "",
				lg: "",
			},
			variant: {
				default: "bg-fill-level3",
				open: "data-[orientation=horizontal]:border-b data-[orientation=vertical]:border-r border-border",
				outline: "border border-border",
				ghost: "",
				"outline-ghost": "bg-bg-base",
			},
		},
		defaultVariants: {
			size: "md",
			variant: "default",
		},
		compoundVariants: [
			{
				size: ["sm", "md"],
				variant: "default",
				className: "p-0.5",
			},
			{
				size: "lg",
				variant: "default",
				className: "p-1",
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
				className: "gap-3",
			},
			{
				size: "lg",
				variant: "open",
				className: "gap-4",
			},
		],
	}
)

const tabsTriggerStyles = cva(
	"inline-flex items-center justify-center gap-1.5 focus-visible:ring focus-visible:ring-offset-1 whitespace-nowrap font-medium outline-none text-text-secondary data-[state=active]:text-text w-max data-[orientation=vertical]:w-full disabled:text-text-disabled disabled:cursor-not-allowed",
	{
		variants: {
			size: {
				sm: "text-xs",
				md: "text-sm",
				lg: "text-sm",
			},
			variant: {
				default: "data-[state=active]:bg-bg-base border border-transparent data-[state=active]:border data-[state=active]:border-border data-[state=active]:drop-shadow-xs",
				outline: "data-[state=active]:bg-fill-level2 data-[orientation=horizontal]:not-last:border-r data-[orientation=vertical]:not-last:border-b border-border",
				open: "data-[orientation=horizontal]:border-b-2 data-[orientation=vertical]:border-r-2 border-transparent data-[state=active][orientation=horizontal]:border-b-2 data-[state=active][orientation=vertical]:border-r-2 data-[state=active]:border-primary",
				ghost: "data-[state=active]:bg-fill-level2",
				"outline-ghost": "data-[state=active]:bg-bg-base border border-transparent data-[state=active]:border-border-alpha data-[state=active]:drop-shadow-xs",
			},
		},
		compoundVariants: [
			{
				size: "sm",
				variant: ["default"],
				className: "rounded-md px-1.5 py-1",
			},
			{
				size: "md",
				variant: ["default"],
				className: "rounded-lg px-2.5 py-1.5",
			},
			{
				size: "lg",
				variant: ["default"],
				className: "rounded-[0.625rem] px-3 py-2",
			},
			{
				size: "sm",
				variant: ["outline", "ghost", "outline-ghost"],
				className: "p-1.5",
			},
			{
				size: "md",
				variant: ["outline", "ghost", "outline-ghost"],
				className: " p-2",
			},
			{
				size: "lg",
				variant: ["outline", "ghost", "outline-ghost"],
				className: " p-3",
			},
			{
				size: "sm",
				variant: "open",
				className: "data-[orientation=horizontal]:py-1.5 data-[orientation=vertical]:px-1.5",
			},
			{
				size: "md",
				variant: "open",
				className: "data-[orientation=horizontal]:py-2 data-[orientation=vertical]:px-2",
			},
			{
				size: "lg",
				variant: "open",
				className: "data-[orientation=horizontal]:py-3 data-[orientation=vertical]:px-3",
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
					"data-[orientation=horizontal]:first:rounded-l-xl data-[orientation=horizontal]:last:rounded-r-xl data-[orientation=vertical]:first:rounded-t-xl data-[orientation=vertical]:last:roonded-b-xl",
			},
			{
				size: "sm",
				variant: ["ghost", "outline-ghost"],
				className: "data-[state=active]:rounded-md ",
			},
			{
				size: "md",
				variant: ["ghost", "outline-ghost"],
				className: "data-[state=active]:rounded-lg",
			},
			{
				size: "lg",
				variant: ["ghost", "outline-ghost"],
				className: "data-[state=active]:rounded-[0.625rem]",
			},
		],
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	}
)

const tabTriggerIconStyles = cva("[&>svg]:text-text-tertiary", {
	variants: {
		size: {
			sm: "[&>svg]:size-4",
			md: "[&>svg]:size-5",
			lg: "[&>svg]:size-5",
		},
	},
})

const TabsContext = React.createContext<TabsContextType | null>(null)

function useTabs() {
	const context = React.use(TabsContext)
	if (!context) {
		throw new Error("useTabsContext must be used within a Context Provider")
	}
	return context
}

function Tabs({ variant = "default", size = "md", className, defaultValue, children, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & TabsContextType) {
	const ctxValues = React.useMemo(() => ({ variant, size }), [variant, size])
	return (
		<TabsContext.Provider value={ctxValues}>
			<TabsPrimitive.Root className={cn("no-scrollbar flex w-full flex-col gap-3 data-[orientation=vertical]:flex-row", className)} defaultValue={defaultValue} {...props}>
				{children}
			</TabsPrimitive.Root>
		</TabsContext.Provider>
	)
}
Tabs.displayName = TabsPrimitive.Root.displayName

function TabsList({ className, width = "fit", children, ...props }: TabsListProps & React.RefAttributes<HTMLDivElement> & { width?: TabsListWidth }) {
	const { size, variant } = useTabs()
	return (
		<TabsPrimitive.List
			className={cn(
				tabsListStyles({ size, variant }),
				{ "data-[orientation=horizontal]:w-full data-[orientation=horizontal]:items-stretch data-[orientation=horizontal]:*:flex-1": width == "full" },
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
function TabsTrigger({ className, icon, counter, children, ...props }: PrimitiveTriggerExtended) {
	const { size, variant } = useTabs()

	return (
		<TabsPrimitive.Trigger className={cn(tabsTriggerStyles({ variant, size }), className)} {...props}>
			{icon && <span className={cn(tabTriggerIconStyles({ size }))}>{icon}</span>}
			{children}
			{counter !== undefined && <Badge className={cn("h-5 rounded-full", { "h-4": size === "sm" })}>{counter}</Badge>}
		</TabsPrimitive.Trigger>
	)
}
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

function TabsContent({ className, ...props }: React.ComponentPropsWithRef<typeof TabsPrimitive.Content>) {
	return <TabsPrimitive.Content className={cn("flex-1 outline-none data-[state=inactive]:hidden", className)} {...props} />
}

TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
