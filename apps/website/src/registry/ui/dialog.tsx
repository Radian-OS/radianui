import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { type VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type Backdrop = VariantProps<typeof dialogOverlayVariants>["backdrop"]

type DialogProps = DialogPrimitive.DialogProps

type DialogOverlayProps = React.ComponentPropsWithoutRef<
	typeof DialogPrimitive.Overlay
> & { backdrop?: Backdrop }

type DialogContentProps = React.ComponentPropsWithoutRef<
	typeof DialogPrimitive.Content
> & {
	backdrop?: Backdrop
	closeButton?: "hidden" | "visible" | "hover"
}

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>

type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>

type DialogTitleProps = React.ComponentPropsWithoutRef<
	typeof DialogPrimitive.Title
>

type DialogDescriptionProps = React.ComponentPropsWithoutRef<
	typeof DialogPrimitive.Description
>

const dialogOverlayVariants = cva(
	"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",
	{
		variants: {
			backdrop: {
				overlay: "cn-dialog-overlay-backdrop-overlay",
				blur: "cn-dialog-overlay-backdrop-blur",
				transparent: "cn-dialog-overlay-backdrop-transparent",
			},
		},
		defaultVariants: {
			backdrop: "overlay",
		},
	}
)

function Dialog({ children, ...props }: DialogProps) {
	return (
		<DialogPrimitive.Root data-slot="dialog" {...props}>
			{children}
		</DialogPrimitive.Root>
	)
}

const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

function DialogOverlay({
	className,
	backdrop = "overlay",
	...props
}: DialogOverlayProps) {
	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			className={cn(dialogOverlayVariants({ backdrop }), className)}
			{...props}
		/>
	)
}
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

function DialogContent({
	className,
	children,
	backdrop,
	closeButton = "visible",
	...props
}: DialogContentProps) {
	return (
		<DialogPortal>
			<DialogOverlay backdrop={backdrop} />
			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cn(
					"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 cn-dialog-content group fixed left-1/2 top-1/2 z-50 flex w-full max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col duration-200",
					className
				)}
				{...props}>
				{children}
				{closeButton !== "hidden" && (
					<DialogPrimitive.Close asChild>
						<button
							type="button"
							className={cn(
								"cn-dialog-close-button absolute right-3 top-3 box-border inline-flex h-6 w-6 items-center justify-center whitespace-nowrap font-medium hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 [&>svg]:!h-4 [&>svg]:!w-4",
								closeButton === "hover" && "cn-dialog-close-button-hover"
							)}
							aria-label="Close">
							<X />
						</button>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	)
}
DialogContent.displayName = DialogPrimitive.Content.displayName

function DialogHeader({ className, ...props }: DialogHeaderProps) {
	return (
		<div
			data-slot="dialog-header"
			className={cn(
				"cn-dialog-header flex flex-col text-center sm:text-left",
				className
			)}
			{...props}
		/>
	)
}
DialogHeader.displayName = "DialogHeader"

function DialogBody({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div data-slot="dialog-body" className={cn("", className)} {...props} />
	)
}
DialogBody.displayName = "DialogBody"

function DialogFooter({ className, ...props }: DialogFooterProps) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn("cn-dialog-footer flex justify-end", className)}
			{...props}
		/>
	)
}
DialogFooter.displayName = "DialogFooter"

function DialogTitle({ className, ...props }: DialogTitleProps) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn("cn-dialog-title", className)}
			{...props}
		/>
	)
}
DialogTitle.displayName = DialogPrimitive.Title.displayName

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn("cn-dialog-description", className)}
			{...props}
		/>
	)
}
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogBody,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
}
