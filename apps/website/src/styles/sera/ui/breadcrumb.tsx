import * as React from "react"
import * as SlotPrimitive from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

export type BreadcrumbType = React.ComponentProps<"nav"> & {
	separator?: React.ReactNode
}
export type BreadcrumbListType = React.ComponentProps<"ol">
export type BreadcrumbItemType = React.ComponentProps<"li">
export type BreadcrumbLinkType = React.ComponentProps<"a"> & {
	asChild?: boolean
}
export type BreadcrumbPageType = React.ComponentProps<"span">
export type BreadcrumbSeparatorType = React.ComponentProps<"li">
export type BreadcrumbEllipsisType = React.ComponentProps<"span">

function Breadcrumb({ ...props }: BreadcrumbType) {
	return <nav data-slot="breadcrumb" aria-label="breadcrumb" {...props} />
}

Breadcrumb.displayName = "Breadcrumb"

function BreadcrumbList({ className, ...props }: BreadcrumbListType) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={cn(
				"text-fg-secondary flex flex-wrap items-center gap-1.5 text-sm break-words",
				className
			)}
			{...props}
		/>
	)
}

function BreadcrumbItem({ className, ...props }: BreadcrumbItemType) {
	return (
		<li
			data-slot="breadcrumb-item"
			className={cn("inline-flex items-center gap-1.5", className)}
			{...props}
		/>
	)
}
BreadcrumbItem.displayName = "BreadcrumbItem"

function BreadcrumbLink({ asChild, className, ...props }: BreadcrumbLinkType) {
	const Comp = asChild ? SlotPrimitive.Slot : "a"

	return (
		<Comp
			data-slot="breadcrumb-link"
			className={cn("hover:text-fg transition-colors", className)}
			{...props}
		/>
	)
}
BreadcrumbLink.displayName = "BreadcrumbLink"

function BreadcrumbPage({ className, ...props }: BreadcrumbPageType) {
	return (
		<span
			data-slot="breadcrumb-page"
			role="link"
			aria-disabled="true"
			aria-current="page"
			className={cn("text-fg font-normal", className)}
			{...props}
		/>
	)
}
BreadcrumbPage.displayName = "BreadcrumbPage"

function BreadcrumbSeparator({
	children,
	className,
	...props
}: BreadcrumbSeparatorType) {
	return (
		<li
			data-slot="breadcrumb-separator"
			role="presentation"
			aria-hidden="true"
			className={cn("text-fg-tertiary [&>svg]:size-4", className)}
			{...props}>
			{children ?? <ChevronRight className="rtl:rotate-180" />}
		</li>
	)
}
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

function BreadcrumbEllipsis({ className, ...props }: BreadcrumbEllipsisType) {
	return (
		<span
			data-slot="breadcrumb-ellipsis"
			role="presentation"
			aria-hidden="true"
			className={cn("flex size-9 items-center justify-center", className)}
			{...props}>
			<MoreHorizontal className="size-4" />
			<span className="sr-only">More</span>
		</span>
	)
}
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
}
