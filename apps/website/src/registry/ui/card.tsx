import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card"
			className={cn("text-fg r-card cn-card flex flex-col", className)}
			{...props}
		/>
	)
}
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 r-card-header cn-card-header grid auto-rows-min grid-rows-[auto_auto] items-start",
				className
			)}
			{...props}
		/>
	)
}
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn("r-card-title cn-card-title leading-none", className)}
			{...props}
		/>
	)
}
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("r-card-description cn-card-description", className)}
			{...props}
		/>
	)
}
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"r-card-action cn-card-action col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className
			)}
			{...props}
		/>
	)
}
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("r-card-content cn-card-content", className)}
			{...props}
		/>
	)
}
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				"[.border-t]:pt-6 r-card-footer cn-card-footer flex items-center",
				className
			)}
			{...props}
		/>
	)
}
export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
}
