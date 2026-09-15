import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { type VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { CompactButton } from "./button"

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
> & {
	closeButton?: boolean
}

type DialogDescriptionProps = React.ComponentPropsWithoutRef<
	typeof DialogPrimitive.Description
>

const dialogOverlayVariants = cva(
	"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",
	{
		variants: {
			backdrop: {
				whiteOverlay: "bg-white/50",
				blackOverlay: "bg-black/50",
				blur: "backdrop-blur-sm",
				transparent: "bg-transparent",
			},
		},
		defaultVariants: {
			backdrop: "blackOverlay",
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
	backdrop = "blackOverlay",
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
					"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 bg-bg border-alpha group fixed left-1/2 top-1/2 z-50 flex w-full max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-none border p-6 shadow-none duration-200",
					className
				)}
				{...props}>
				{children}
				{closeButton !== "hidden" && (
					<DialogPrimitive.Close asChild>
						<button
							type="button"
							className={cn(
								"focus-visible:ring-offset-bg text-fg-tertiary hover:bg-fill2 focus-visible:ring-border absolute right-3 top-3 box-border inline-flex h-6 w-6 items-center justify-center whitespace-nowrap rounded-none bg-transparent font-medium hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 [&>svg]:!h-4 [&>svg]:!w-4",
								closeButton === "hover" &&
									"opacity-0 transition-opacity group-hover:opacity-100"
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
				"flex flex-col space-y-2 text-center sm:text-left",
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
	return <div data-slot="dialog-body" className={cn(className)} {...props} />
}
DialogBody.displayName = "DialogBody"

function DialogFooter({ className, ...props }: DialogFooterProps) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn("flex justify-end gap-3", className)}
			{...props}
		/>
	)
}
DialogFooter.displayName = "DialogFooter"

function DialogTitle({
	className,
	closeButton = true,
	children,
	...props
}: DialogTitleProps) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn("text-xl font-semibold", className)}
			{...props}>
			<span className="self-center">{children}</span>
			{closeButton && (
				<DialogPrimitive.Close asChild>
					<CompactButton
						aria-label="Close Button"
						size="24"
						variant="soft"
						color="neutral">
						<X />
					</CompactButton>
				</DialogPrimitive.Close>
			)}
		</DialogPrimitive.Title>
	)
}
DialogTitle.displayName = DialogPrimitive.Title.displayName

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn("text-fg-secondary text-sm/5 leading-tight", className)}
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
