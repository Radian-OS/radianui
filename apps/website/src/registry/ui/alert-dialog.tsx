"use client"

import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { AlertDialog as AlertDialogPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

type Backdrop = VariantProps<typeof alertDialogOverlayVariants>["backdrop"]
type AlertDialogProps = React.ComponentProps<typeof AlertDialogPrimitive.Root>
type AlertDialogTriggerProps = React.ComponentProps<typeof AlertDialogPrimitive.Trigger>
type AlertDialogPortalProps = React.ComponentProps<typeof AlertDialogPrimitive.Portal>
type AlertDialogOverlayProps = React.ComponentProps<typeof AlertDialogPrimitive.Overlay> & { backdrop?: Backdrop }
type AlertDialogContentProps = React.ComponentProps<typeof AlertDialogPrimitive.Content> & { backdrop?: Backdrop }
type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>
type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>
type AlertDialogTitleProps = React.ComponentProps<typeof AlertDialogPrimitive.Title>
type AlertDialogDescriptionProps = React.ComponentProps<typeof AlertDialogPrimitive.Description>
type AlertDialogActionProps = React.ComponentProps<typeof AlertDialogPrimitive.Action>
type AlertDialogCancelProps = React.ComponentProps<typeof AlertDialogPrimitive.Cancel>

const alertDialogOverlayVariants = cva(
	"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[999]",
	{
		variants: {
			backdrop: {
				overlay: "bg-black/50",
				blur: "backdrop-blur-sm",
				transparent: "bg-transparent",
			},
		},
		defaultVariants: {
			backdrop: "overlay",
		},
	}
)

function AlertDialog({ ...props }: AlertDialogProps) {
	return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}
AlertDialog.displayName = AlertDialogPrimitive.Root.displayName

function AlertDialogTrigger({ ...props }: AlertDialogTriggerProps) {
	return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
}
AlertDialogTrigger.displayName = AlertDialogPrimitive.Trigger.displayName

function AlertDialogPortal({ ...props }: AlertDialogPortalProps) {
	return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
}
AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName

function AlertDialogOverlay({ className, backdrop = "overlay", ...props }: AlertDialogOverlayProps) {
	return <AlertDialogPrimitive.Overlay data-slot="alert-dialog-overlay" className={cn(alertDialogOverlayVariants({ backdrop }), className)} {...props} />
}
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

function AlertDialogContent({ className, backdrop, ...props }: AlertDialogContentProps) {
	return (
		<AlertDialogPortal>
			<AlertDialogOverlay backdrop={backdrop} />
			<AlertDialogPrimitive.Content
				data-slot="alert-dialog-content"
				className={cn(
					"bg-bg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 border-alpha fixed left-[50%] top-[50%] z-[999] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-5 shadow-lg shadow-black/5 duration-200 sm:rounded-lg",
					className
				)}
				{...props}
			/>
		</AlertDialogPortal>
	)
}
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
	return <div data-slot="alert-dialog-header" className={cn("flex flex-col space-y-1 text-center sm:text-left", className)} {...props} />
}
AlertDialogHeader.displayName = "AlertDialogHeader"

function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
	return <div data-slot="alert-dialog-footer" className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2.5", className)} {...props} />
}
AlertDialogFooter.displayName = "AlertDialogFooter"

function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
	return <AlertDialogPrimitive.Title data-slot="alert-dialog-title" className={cn("text-lg font-semibold", className)} {...props} />
}
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
	return <AlertDialogPrimitive.Description data-slot="alert-dialog-description" className={cn("text-fg-secondary text-sm", className)} {...props} />
}
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName

function AlertDialogAction({ ...props }: AlertDialogActionProps) {
	return <AlertDialogPrimitive.Action data-slot="alert-dialog-action" {...props} />
}
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

function AlertDialogCancel({ ...props }: AlertDialogCancelProps) {
	return <AlertDialogPrimitive.Cancel data-slot="alert-dialog-cancel" {...props} />
}
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialogTitle,
	AlertDialogTrigger,
}
