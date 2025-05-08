"use client"

import React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"
import { cn as classNames } from "@/lib/utils"

type BaseProps = AccordionContextType & {
	className?: string
	children: React.ReactNode
	ref?: React.Ref<HTMLDivElement>
}

type AccordionSingleProps = {
	interaction?: "single"
	collapsible?: boolean
} & Omit<AccordionPrimitive.AccordionSingleProps, "type" | "collapsible"> &
	BaseProps

type AccordionMultipleProps = {
	interaction: "multiple"
} & Omit<AccordionPrimitive.AccordionMultipleProps, "type"> &
	BaseProps

type AccordionContextType = {
	size?: "sm" | "lg"
	variant?: "box" | "table" | "open"
}

type AccordionProps = AccordionSingleProps | AccordionMultipleProps

type AccordionItemProps = React.ComponentProps<typeof AccordionPrimitive.Item> & {
	className?: string
}
type AccordionTriggerProps = React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
	className?: string
}
type AccordionContentProps = React.ComponentProps<typeof AccordionPrimitive.Content> & {
	className?: string
}

const AccordionContext = React.createContext<AccordionContextType | null>(null)

function useAccordion() {
	const context = React.useContext(AccordionContext)
	if (!context) {
		throw new Error("useAccordion must be used within a <Accordion />")
	}
	return context
}

function Accordion({ size = "sm", variant = "box", interaction = "single", className, children, ...rest }: AccordionProps) {
	const rootProps =
		interaction === "single"
			? {
					...(rest as AccordionPrimitive.AccordionSingleProps),
					type: "single" as const,
					collapsible: (rest as AccordionSingleProps).collapsible ?? true,
				}
			: {
					...(rest as AccordionPrimitive.AccordionMultipleProps),
					type: "multiple" as const,
				}

	return (
		<AccordionContext.Provider value={{ size, variant }}>
			<AccordionPrimitive.Root
				data-slot="accordion"
				className={classNames(
					"w-full",
					size === "sm" ? "text-sm/6" : "text-base/7",
					variant === "table" && "border-stroke rounded-xl border",
					className
				)}
				{...rootProps}>
				{children}
			</AccordionPrimitive.Root>
		</AccordionContext.Provider>
	)
}

Accordion.displayName = "Accordion"

function AccordionItem({ children, className, ...props }: AccordionItemProps) {
	const { variant, size } = useAccordion()
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={classNames(
				"overflow-hidden",
				variant === "box"
					? size === "sm"
						? "border-stroke shadow-2xs mb-1.5 rounded-md border last:mb-0"
						: "border-stroke shadow-2xs mb-2 rounded-md border last:mb-0"
					: "border-b first:rounded-t-xl last:rounded-b-xl last:border-b-0",
				className
			)}
			{...props}>
			{children}
		</AccordionPrimitive.Item>
	)
}

AccordionItem.displayName = "AccordionItem"

function AccordionTrigger({ children, className, ...props }: AccordionTriggerProps) {
	const { size, variant } = useAccordion()
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={classNames(
					"bg-bg1 text-fg1 outline-hidden flex flex-1 cursor-pointer items-center justify-between text-left font-medium transition-all [&[data-state=open]>.AccordionChevron]:rotate-180",
					variant === "open" ? (size === "sm" ? "px-0 py-3" : "px-0 py-4") : size === "sm" ? "px-4 py-3" : "p-4",
					className
				)}
				{...props}>
				{children}
				<ChevronDownIcon
					className={classNames(
						"AccordionChevron text-text-tertiary shrink-0 transition-transform duration-200",
						size === "sm" ? "size-5" : "size-6"
					)}
					aria-hidden
				/>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	)
}

AccordionTrigger.displayName = "AccordionTrigger"

function AccordionContent({ children, className, ...props }: AccordionContentProps) {
	const { size, variant } = useAccordion()
	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			className={classNames(
				"text-text-secondary overflow-hidden transition-all data-[state=closed]:animate-[accordion-close_0.2s_ease-out] data-[state=open]:animate-[accordion-open_0.2s_ease-out]",
				className
			)}
			{...props}>
			<div className={classNames(variant === "open" ? (size === "sm" ? "px-0 pb-3" : "px-0 pb-4") : size === "sm" ? "px-4 pb-3" : "p-4", "pt-0")}>
				{children}
			</div>
		</AccordionPrimitive.Content>
	)
}

AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
