"use client"

import React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Minus, Plus } from "lucide-react"
import { cn as classNames } from "@/lib/utils"

type AccordionContextType = {
	size?: "sm" | "lg"
	variant?: "open" | "closed"
}
type AccordionProps = Omit<AccordionPrimitive.AccordionSingleProps, "type"> & React.RefAttributes<HTMLDivElement> & AccordionContextType
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
	const context = React.use(AccordionContext)

	if (!context) {
		throw new Error("useAccordion must be used within a <Accordion />")
	}

	return context
}

function Accordion({ size = "lg", variant = "open", className, children, ...props }: AccordionProps) {
	return (
		<AccordionContext.Provider value={{ size: size, variant: variant }}>
			<AccordionPrimitive.Root
				data-slot="accordion"
				type="single"
				className={classNames("w-full", size === "sm" ? "text-sm" : "text-base", className)}
				{...props}>
				{children}
			</AccordionPrimitive.Root>
		</AccordionContext.Provider>
	)
}

Accordion.displayName = "Accordion"

function AccordionItem({ children, className, ...props }: AccordionItemProps) {
	const { variant } = useAccordion()
	const borderClass = variant === "closed" ? "mb-2 rounded-md border last:mb-0" : "border-b last:border-b-0"

	return (
		<AccordionPrimitive.Item data-slot="accordion-item" className={classNames("overflow-hidden", borderClass, className)} {...props}>
			{children}
		</AccordionPrimitive.Item>
	)
}

AccordionItem.displayName = "AccordionItem"

function AccordionTrigger({ children, className, ...props }: AccordionTriggerProps) {
	const { size, variant } = useAccordion()
	const paddingClass = variant === "closed" ? (size === "sm" ? "p-4 " : "p-5 ") : size === "sm" ? "py-4 " : "py-5"

	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={classNames(
					"group bg-bg1 text-fg1 flex flex-1 cursor-pointer items-center justify-between text-left font-medium outline-hidden",
					paddingClass,
					className
				)}
				{...props}>
				{children}
				<Plus className="text-fg2 size-5 shrink-0 group-data-[state=open]:hidden" aria-hidden />
				<Minus className="text-fg2 size-5 shrink-0 group-data-[state=closed]:hidden" aria-hidden />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	)
}

AccordionTrigger.displayName = "AccordionTrigger"

function AccordionContent({ children, className, ...props }: AccordionContentProps) {
	const { size, variant } = useAccordion()
	const paddingClass = variant === "closed" ? (size === "sm" ? "p-4 pt-0" : "p-5 pt-0") : size === "sm" ? "pb-4" : "pb-5"

	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			className={classNames(
				"text-fg2 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all",
				className
			)}
			{...props}>
			<div className={paddingClass}>{children}</div>
		</AccordionPrimitive.Content>
	)
}

AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
