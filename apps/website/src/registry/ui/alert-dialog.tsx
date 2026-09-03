import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type Backdrop = VariantProps<
	typeof alertDialogOverlayVariants
>["backdrop"]
export type AlertDialogProps = React.ComponentProps<
	typeof AlertDialogPrimitive.Root
>
export type AlertDialogTriggerProps = React.ComponentProps<
	typeof AlertDialogPrimitive.Trigger
>
export type AlertDialogPortalProps = React.ComponentProps<
	typeof AlertDialogPrimitive.Portal
>
export type AlertDialogOverlayProps = React.ComponentProps<
	typeof AlertDialogPrimitive.Overlay
> & { backdrop?: Backdrop }
export type AlertDialogContentProps = React.ComponentProps<
	typeof AlertDialogPrimitive.Content
> & { backdrop?: Backdrop }
export type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>
export type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>
export type AlertDialogTitleProps = React.ComponentProps<
	typeof AlertDialogPrimitive.Title
>
export type AlertDialogDescriptionProps = React.ComponentProps<
	typeof AlertDialogPrimitive.Description
>
export type AlertDialogActionProps = React.ComponentProps<
	typeof AlertDialogPrimitive.Action
>
export type AlertDialogCancelProps = React.ComponentProps<
	typeof AlertDialogPrimitive.Cancel
>

export const alertDialogOverlayVariants = cva(
	"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",
	{
		variants: {
			backdrop: {
				overlay: "bg-black/50",
				blur: "backdrop-blur-md bg-black/25",
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
	return (
		<AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
	)
}
AlertDialogTrigger.displayName = AlertDialogPrimitive.Trigger.displayName

function AlertDialogPortal({ ...props }: AlertDialogPortalProps) {
	return (
		<AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
	)
}
AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName

function AlertDialogOverlay({
	className,
	backdrop = "overlay",
	...props
}: AlertDialogOverlayProps) {
	return (
		<AlertDialogPrimitive.Overlay
			data-slot="alert-dialog-overlay"
			className={cn(alertDialogOverlayVariants({ backdrop }), className)}
			{...props}
		/>
	)
}
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

function AlertDialogContent({
	className,
	backdrop,
	...props
}: AlertDialogContentProps) {
	return (
		<AlertDialogPortal>
			<AlertDialogOverlay backdrop={backdrop} />
			<AlertDialogPrimitive.Content
				data-slot="alert-dialog-content"
				className={cn(
					"bg-bg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 border-alpha fixed top-[50%] left-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-xl border shadow-lg shadow-black/5 duration-200",
					className
				)}
				{...props}
			/>
		</AlertDialogPortal>
	)
}
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
	return (
		<div
			data-slot="alert-dialog-header"
			className={cn(
				"flex flex-col space-y-1 p-5 text-center sm:text-left",
				className
			)}
			{...props}
		/>
	)
}
AlertDialogHeader.displayName = "AlertDialogHeader"

function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
	return (
		<div
			data-slot="alert-dialog-footer"
			className={cn(
				"border-soft flex flex-col-reverse gap-2 border-t p-4 sm:flex-row sm:justify-end",
				className
			)}
			{...props}
		/>
	)
}
AlertDialogFooter.displayName = "AlertDialogFooter"

function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
	return (
		<AlertDialogPrimitive.Title
			data-slot="alert-dialog-title"
			className={cn("text-base font-medium", className)}
			{...props}
		/>
	)
}
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

function AlertDialogDescription({
	className,
	...props
}: AlertDialogDescriptionProps) {
	return (
		<AlertDialogPrimitive.Description
			data-slot="alert-dialog-description"
			className={cn("text-fg-secondary text-sm", className)}
			{...props}
		/>
	)
}
AlertDialogDescription.displayName =
	AlertDialogPrimitive.Description.displayName

function AlertDialogAction({ ...props }: AlertDialogActionProps) {
	return (
		<AlertDialogPrimitive.Action data-slot="alert-dialog-action" {...props} />
	)
}
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

function AlertDialogCancel({ ...props }: AlertDialogCancelProps) {
	return (
		<AlertDialogPrimitive.Cancel data-slot="alert-dialog-cancel" {...props} />
	)
}
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogContent,
	AlertDialogPortal,
	AlertDialogOverlay,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogAction,
	AlertDialogCancel,
}
