"use client"

import React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { type VariantProps, cva } from "class-variance-authority"
import { ChevronDownIcon, Plus } from "lucide-react"
import { cn as classNames } from "@/lib/utils"

// Defining the types for the accordion
export type AccordionContextType = {
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
const accordionVariants = cva("w-full text-sm/6", {
	variants: {
		variant: {
			box: "",
			table: "border-stroke rounded-xl border",
			open: "",
		},
	},
	defaultVariants: {
		variant: "box",
	},
})

const accordionItemVariants = cva("overflow-hidden", {
	variants: {
		variant: {
			box: "border-stroke border shadow-2xs rounded-lg last:mb-0",
			table: "border-b first:rounded-t-xl last:rounded-b-xl last:border-b-0",
			open: "border-b last:border-b-0",
		},
	},
	compoundVariants: [
		{
			variant: "box",
			class: "mb-1.5",
		},
	],
	defaultVariants: {
		variant: "box",
	},
})

const accordionTriggerVariants = cva(
	"text-fg outline-hidden flex flex-1 leading-5 cursor-pointer items-center justify-between text-left font-medium transition-all data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
	{
		variants: {
			variant: {
				box: "",
				table: "",
				open: "",
			},
			indicator: {
				chevron: "[&[data-state=open]>.AccordionChevron]:rotate-180",
				"plus-minus":
					"[&[data-state=open]>.AccordionPlus>path:last-child]:rotate-90 [&[data-state=open]>.AccordionPlus>path:last-child]:opacity-0 [&[data-state=open]>.AccordionPlus]:rotate-180",
			},
		},
		compoundVariants: [
			{
				variant: "open",
				class: "px-0 py-3",
			},
			{
				variant: ["box", "table"],
				class: "p-3",
			},
			{
				indicator: ["chevron", "plus-minus"],
				class: "[&>.AccordionChevron]:size-5 [&>.AccordionPlus]:size-5",
			},
		],
		defaultVariants: {
			variant: "box",
			indicator: "chevron",
		},
	}
)

const accordionContentVariants = cva(
	"text-fg-secondary data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all"
)

const accordionContentInnerVariants = cva("pt-0", {
	variants: {
		variant: {
			box: "",
			table: "",
			open: "",
		},
	},
	compoundVariants: [
		{
			variant: "open",
			class: "px-0 pb-3",
		},
		{
			variant: ["box", "table"],
			class: "px-3 pb-3",
		},
	],
	defaultVariants: {
		variant: "box",
	},
})

function useAccordion() {
	const context = React.useContext(AccordionContext)
	if (!context) {
		throw new Error("useAccordion must be used within a <Accordion />")
	}
	return context
}

function Accordion({
	variant = "box",
	indicator = "chevron",
	className,
	children,
	...props
}: AccordionProps) {
	return (
		<AccordionContext.Provider
			value={{
				variant: variant ?? "box",
				indicator: indicator ?? "chevron",
			}}>
			<AccordionPrimitive.Root
				data-slot="accordion"
				className={classNames(accordionVariants({ variant }), className)}
				{...props}>
				{children}
			</AccordionPrimitive.Root>
		</AccordionContext.Provider>
	)
}
Accordion.displayName = "Accordion"

function AccordionItem({ children, className, ...props }: AccordionItemProps) {
	const { variant } = useAccordion()

	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={classNames(
				accordionItemVariants({ variant }),
				// Dim the entire item when disabled, letting the trigger
				// handle the cursor and interaction blocking via data-[disabled]
				"data-[disabled]:opacity-50",
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
	const { variant, indicator } = useAccordion()

	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={classNames(
					accordionTriggerVariants({ variant, indicator }),
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
	const { variant } = useAccordion()

	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			className={classNames(accordionContentVariants())}
			{...props}>
			<div
				className={classNames(
					accordionContentInnerVariants({ variant }),
					className
				)}>
				{children}
			</div>
		</AccordionPrimitive.Content>
	)
}
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
