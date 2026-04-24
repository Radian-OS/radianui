"use client"

import React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { type VariantProps, cva } from "class-variance-authority"
import { ChevronDownIcon, Plus } from "lucide-react"
import { cn as classNames } from "@/lib/utils"

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

const accordionVariants = cva("w-full", {
	variants: {
		size: {
			sm: "text-sm/6",
			lg: "text-base/7",
		},
		variant: {
			box: "",
			table: "border-border rounded-none border",
			open: "",
		},
	},
	defaultVariants: {
		size: "sm",
		variant: "box",
	},
})

const accordionItemVariants = cva("overflow-hidden", {
	variants: {
		variant: {
			box: "border-border rounded-none border shadow-none last:mb-0",
			table: "border-b first:rounded-none last:rounded-none last:border-b-0",
			open: "border-b last:border-b-0",
		},
		size: {
			sm: "",
			lg: "",
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

const accordionTriggerVariants = cva(
	"outline-hidden flex flex-1 cursor-pointer items-center justify-between text-left font-medium transition-all",
	{
		variants: {
			variant: {
				box: "",
				table: "",
				open: "",
			},
			size: {
				sm: "leading-5",
				lg: "leading-6",
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
				class: "cn-accordion-trigger-boxed-sm",
			},
			{
				variant: ["box", "table"],
				size: "lg",
				class: "cn-accordion-trigger-boxed-lg",
			},
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
	}
)

const accordionContentVariants = cva(
	"data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all"
)

const accordionContentInnerVariants = cva("pt-0", {
	variants: {
		variant: {
			box: "",
			table: "",
			open: "",
		},
		size: {
			sm: "",
			lg: "",
		},
	},
	compoundVariants: [
		{
			variant: "open",
			size: "sm",
			class: "cn-accordion-content-open-sm",
		},
		{
			variant: "open",
			size: "lg",
			class: "cn-accordion-content-open-lg",
		},
		{
			variant: ["box", "table"],
			size: "sm",
			class: "cn-accordion-content-boxed-sm",
		},
		{
			variant: ["box", "table"],
			size: "lg",
			class: "cn-accordion-content-boxed-lg",
		},
	],
	defaultVariants: {
		variant: "box",
		size: "sm",
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
					"cn-accordion-trigger",
					accordionTriggerVariants({ variant, size, indicator }),
					className
				)}
				{...props}>
				{children}
				{indicator === "chevron" && (
					<ChevronDownIcon
						className="AccordionChevron shrink-0 transition-transform duration-200"
						aria-hidden
					/>
				)}
				{indicator === "plus-minus" && (
					<Plus
						className="AccordionPlus shrink-0 transition-transform duration-200"
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
			className={classNames("cn-accordion-content", accordionContentVariants())}
			{...props}>
			<div
				className={classNames(
					"cn-accordion-content-inner",
					accordionContentInnerVariants({ variant, size }),
					className
				)}>
				{children}
			</div>
		</AccordionPrimitive.Content>
	)
}
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
