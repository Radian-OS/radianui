"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { TabsListProps } from "@radix-ui/react-tabs"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type TabsVariant = VariantProps<typeof tabsListStyles>["variant"]
export type TabsSize = VariantProps<typeof tabsListStyles>["size"]
export type TabsListWidth = "fit" | "full"
export type TabsContextType = {
	variant?: TabsVariant
	size?: TabsSize
}

const tabsListStyles = cva("inline-flex w-fit items-center justify-start max-w-full overflow-x-scroll no-scrollbar", {
	variants: {
		size: {
			sm: "",
			md: "",
			lg: "",
		},
		variant: {
			default: "bg-bg-level2",
			open: "border-b border-border",
			outline: "border border-border",
			ghost: "",
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
			className: "rounded-[10px]",
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
})

const tabsTriggerStyles = cva(
	"focus-visible:ring-ring inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium ring-offset-background text-text-secondary focus-visible:ring-2 focus-visible:ring-offset-2 data-[state=active]:text-text w-fit disabled:text-text-disabled disabled:cursor-not-allowed",
	{
		variants: {
			size: {
				sm: "text-xs",
				md: "text-sm",
				lg: "text-sm",
			},
			variant: {
				default:
					"data-[state=active]:bg-bg-base border border-transparent  data-[state=active]:border data-[state=active]:border-border data-[state=active]:drop-shadow-xs",
				outline: "data-[state=active]:bg-bg-level2 not-last:border-r not-last:border-border",
				open: "h-full border-b-0 data-[state=active]:border-b-2 data-[state=active]:border-primary",
				ghost: "data-[state=active]:bg-bg-level2",
			},
		},
		compoundVariants: [
			{
				size: "sm",
				variant: "default",
				className: "rounded-md px-1.5 py-1",
			},
			{
				size: "md",
				variant: "default",
				className: "rounded-lg px-2.5 py-1.5",
			},
			{
				size: "lg",
				variant: "default",
				className: "rounded-[0.625rem] px-3 py-2",
			},
			{
				size: "sm",
				variant: ["outline", "ghost"],
				className: "p-1.5",
			},
			{
				size: "md",
				variant: ["outline", "ghost"],
				className: " px-2.5 py-2",
			},
			{
				size: "lg",
				variant: ["outline", "ghost"],
				className: " p-3",
			},
			{
				size: "sm",
				variant: "open",
				className: "py-1.5",
			},
			{
				size: "md",
				variant: "open",
				className: "py-2",
			},
			{
				size: "lg",
				variant: "open",
				className: "py-3",
			},
			{
				size: "sm",
				variant: "outline",
				className: "first:rounded-l-lg last:rounded-r-lg",
			},
			{
				size: "md",
				variant: "outline",
				className: "first:rounded-l-[0.625rem] last:rounded-r-[0.625rem]",
			},
			{
				size: "lg",
				variant: "outline",
				className: "first:rounded-l-xl last:rounded-r-xl",
			},
			{
				size: "sm",
				variant: "ghost",
				className: "data-[state=active]:rounded-md",
			},
			{
				size: "md",
				variant: "ghost",
				className: "data-[state=active]:rounded-lg",
			},
			{
				size: "lg",
				variant: "ghost",
				className: "data-[state=active]:rounded-[0.625rem]",
			},
		],
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	}
)

const TabsContext = React.createContext<TabsContextType | null>(null)

function useTabs() {
	const context = React.use(TabsContext)
	if (!context) {
		throw new Error("useTabsContext must be used within a Context Provider")
	}
	return context
}

function Tabs({
	variant = "default",
	size = "md",
	className,
	defaultValue,
	children,
	...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & TabsContextType) {
	return (
		<TabsContext.Provider value={{ variant: variant, size: size }}>
			<TabsPrimitive.Root className={cn("no-scrollbar flex w-full flex-col gap-3", className)} defaultValue={defaultValue} {...props}>
				{children}
			</TabsPrimitive.Root>
		</TabsContext.Provider>
	)
}

function TabsList({
	className,
	width = "fit",
	children,
	...props
}: TabsListProps &
	React.RefAttributes<HTMLDivElement> & {
		width?: TabsListWidth
	}) {
	const { size, variant } = useTabs()

	return (
		<TabsPrimitive.List
			className={cn(tabsListStyles({ size, variant }), "items-stretch", { "w-full *:flex-1": width == "full" }, className)}
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
			{icon && <span className={cn("[&>svg]:size-5")}>{icon}</span>}
			{children}
			{counter !== undefined && (
				<span className="border-border bg-bg-base flex h-5 items-center justify-center gap-4 rounded-full border px-1.5 py-0 text-xs">{counter}</span>
			)}
		</TabsPrimitive.Trigger>
	)
}
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName
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
