"use client"

import React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { type VariantProps, cva } from "class-variance-authority"
import { ChevronDownIcon, Plus } from "lucide-react"
import { cn as classNames } from "@/lib/utils"

// Defining the types for the accordion
export type AccordionContextType = {
	size?: VariantProps<typeof accordionVariants>["size"]
	variant?: VariantProps<typeof accordionVariants>["variant"]
	indicator?: VariantProps<typeof accordionTriggerVariants>["indicator"]
}

export type AccordionProps = React.ComponentProps<
	typeof AccordionPrimitive.Root
> &
	VariantProps<typeof accordionVariants> & {
		indicator?: VariantProps<typeof accordionTriggerVariants>["indicator"]
	}

export type AccordionItemProps = React.ComponentProps<
	typeof AccordionPrimitive.Item
>

export type AccordionTriggerProps = React.ComponentProps<
	typeof AccordionPrimitive.Trigger
>

export type AccordionContentProps = React.ComponentProps<
	typeof AccordionPrimitive.Content
>

const AccordionContext = React.createContext<AccordionContextType | null>(null)

// Defining the different variants for the accordion
const accordionVariants = cva("cn-accordion", {
	variants: {
		size: {
			sm: "cn-accordion-size-sm",
			lg: "cn-accordion-size-lg",
		},
		variant: {
			box: "cn-accordion-variant-box",
			table: "cn-accordion-variant-table",
			open: "cn-accordion-variant-open",
		},
	},
	defaultVariants: {
		size: "sm",
		variant: "box",
	},
})

const accordionItemVariants = cva("cn-accordion-item", {
	variants: {
		variant: {
			box: "cn-accordion-item-variant-box",
			table: "cn-accordion-item-variant-table",
			open: "cn-accordion-item-variant-open",
		},
		size: {
			sm: "cn-accordion-item-size-sm",
			lg: "cn-accordion-item-size-lg",
		},
	},
	compoundVariants: [
		{
			variant: "box",
			size: "sm",
			class: "cn-accordion-item-box-sm",
		},
		{
			variant: "box",
			size: "lg",
			class: "cn-accordion-item-box-lg",
		},
	],
	defaultVariants: {
		variant: "box",
		size: "sm",
	},
})

const accordionTriggerVariants = cva("cn-accordion-trigger", {
	variants: {
		variant: {
			box: "cn-accordion-trigger-variant-box",
			table: "cn-accordion-trigger-variant-table",
			open: "cn-accordion-trigger-variant-open",
		},
		size: {
			sm: "cn-accordion-trigger-size-sm",
			lg: "cn-accordion-trigger-size-lg",
		},
		indicator: {
			chevron: "cn-accordion-trigger-indicator-chevron",
			"plus-minus": "cn-accordion-trigger-indicator-plus-minus",
		},
	},
	compoundVariants: [
		{
			variant: "open",
			size: "sm",
			class: "cn-accordion-trigger-open-sm",
		},
		{
			variant: "open",
			size: "lg",
			class: "cn-accordion-trigger-open-lg",
		},
		{
			variant: ["box", "table"],
			size: "sm",
			class: "cn-accordion-trigger-box-table-sm",
		},
		{
			variant: ["box", "table"],
			size: "lg",
			class: "cn-accordion-trigger-box-table-lg",
		},
		// Indicator sizing
		{
			indicator: ["chevron", "plus-minus"],
			size: "sm",
			class: "cn-accordion-trigger-indicator-sm",
		},
		{
			indicator: ["chevron", "plus-minus"],
			size: "lg",
			class: "cn-accordion-trigger-indicator-lg",
		},
	],
	defaultVariants: {
		variant: "box",
		size: "sm",
		indicator: "chevron",
	},
})

const accordionContentVariants = cva("cn-accordion-content")

const accordionContentInnerVariants = cva("cn-accordion-content-inner", {
	variants: {
		variant: {
			box: "cn-accordion-content-inner-variant-box",
			table: "cn-accordion-content-inner-variant-table",
			open: "cn-accordion-content-inner-variant-open",
		},
		size: {
			sm: "cn-accordion-content-inner-size-sm",
			lg: "cn-accordion-content-inner-size-lg",
		},
	},
	compoundVariants: [
		{
			variant: "open",
			size: "sm",
			class: "cn-accordion-content-inner-open-sm",
		},
		{
			variant: "open",
			size: "lg",
			class: "cn-accordion-content-inner-open-lg",
		},
		{
			variant: ["box", "table"],
			size: "sm",
			class: "cn-accordion-content-inner-box-table-sm",
		},
		{
			variant: ["box", "table"],
			size: "lg",
			class: "cn-accordion-content-inner-box-table-lg",
		},
	],
	defaultVariants: {
		variant: "box",
		size: "sm",
	},
})

// Defining the hook for the accordion
function useAccordion() {
	const context = React.useContext(AccordionContext)
	if (!context) {
		throw new Error("useAccordion must be used within a <Accordion />")
	}
	return context
}

/* Define the components */
function Accordion({
	size = "sm",
	variant = "box",
	indicator = "chevron",
	className,
	children,
	...props
}: AccordionProps) {
	return (
		<AccordionContext.Provider
			value={{
				size: size ?? "sm",
				variant: variant ?? "box",
				indicator: indicator ?? "chevron",
			}}>
			<AccordionPrimitive.Root
				data-slot="accordion"
				className={classNames(accordionVariants({ size, variant }), className)}
				{...props}>
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
				accordionItemVariants({ variant, size }),
				className
			)}
			{...props}>
			{children}
		</AccordionPrimitive.Item>
	)
}

AccordionItem.displayName = "AccordionItem"

function AccordionTrigger({
	children,
	className,
	...props
}: AccordionTriggerProps) {
	const { size, variant, indicator } = useAccordion()

	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={classNames(
					accordionTriggerVariants({ variant, size, indicator }),
					className
				)}
				{...props}>
				{children}
				{indicator === "chevron" && (
					<ChevronDownIcon
						className="AccordionChevron text-fg-tertiary shrink-0 transition-transform duration-200"
						aria-hidden
					/>
				)}
				{indicator === "plus-minus" && (
					<Plus
						className="AccordionPlus text-fg-tertiary shrink-0 transition-transform duration-200"
						aria-hidden
					/>
				)}
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	)
}

AccordionTrigger.displayName = "AccordionTrigger"

function AccordionContent({
	children,
	className,
	...props
}: AccordionContentProps) {
	const { size, variant } = useAccordion()

	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			className={classNames(accordionContentVariants())}
			{...props}>
			<div
				className={classNames(
					accordionContentInnerVariants({ variant, size }),
					className
				)}>
				{children}
			</div>
		</AccordionPrimitive.Content>
	)
}

AccordionContent.displayName = "AccordionContent"

/* Export all components*/
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
