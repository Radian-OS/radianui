"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"
import { Separator } from "react-aria-components"
import { cn } from "@/lib/utils"

type closeIcon = "visible" | "hidden" | "hover"

type Backdrop = VariantProps<typeof backdropVariants>["backdrop"]

type ModalContext = {
	closeIcon?: closeIcon
	backdrop?: Backdrop
	withSeparator?: boolean
}

type ModalProps = DialogPrimitive.DialogProps & ModalContext

type ModalOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>

type ModalContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>

type ModalHeaderProps = React.HTMLAttributes<HTMLDivElement>

type ModalFooterProps = React.HTMLAttributes<HTMLDivElement>

type ModalTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>

type ModalDescriptionProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>

const backdropVariants = cva("z-50 fixed inset-0", {
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
})

const ModalContext = React.createContext<ModalContext | null>(null)

function useModalContext() {
	const context = React.use(ModalContext)

	if (!context) {
		throw new Error("useModal must be used within a <Modal />")
	}

	return context
}

function Modal({ closeIcon = "visible", backdrop = "overlay", withSeparator = false, children, ...props }: ModalProps) {
	return (
		<DialogPrimitive.Root {...props}>
			<ModalContext.Provider value={{ closeIcon: closeIcon, backdrop: backdrop, withSeparator: withSeparator }}>{children}</ModalContext.Provider>
		</DialogPrimitive.Root>
	)
}

const ModalTrigger = DialogPrimitive.Trigger
const ModalPortal = DialogPrimitive.Portal
const ModalClose = DialogPrimitive.Close

function ModalOverlay({ className, ...props }: ModalOverlayProps) {
	const { backdrop } = useModalContext()
	return (
		<DialogPrimitive.Overlay
			data-slot="modal-overlay"
			className={cn(
				backdropVariants({ backdrop }),
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
				className
			)}
			{...props}
		/>
	)
}
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName

function ModalContent({ className, children, ...props }: ModalContentProps) {
	const { closeIcon, withSeparator } = useModalContext()

	const closeButtonClass = cn(
		"absolute right-5 top-5 text-disabled transition-opacity duration-200",
		{
			hidden: closeIcon === "hidden",
			"opacity-0 group-hover:opacity-100": closeIcon === "hover",
		}
	)
	return (
		<ModalPortal>
			<ModalOverlay />
			<DialogPrimitive.Content
				data-slot="modal-content"
				className={cn(
					"group bg-bg1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-1/2 left-1/2 z-50 flex w-full max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col gap-5 rounded-lg border p-5 shadow-lg duration-200",
					{"p-0 gap-0":withSeparator},
					className
				)}
				{...props}>
				{children}
				{closeIcon !== "hidden" && (
					<DialogPrimitive.Close className={closeButtonClass}>
						<X className="h-4 w-4" />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</ModalPortal>
	)
}
ModalContent.displayName = DialogPrimitive.Content.displayName

function ModalHeader({ className, ...props }: ModalHeaderProps) {
	const { withSeparator } = useModalContext()
	return (
		<>
			<div className={cn("flex flex-col gap-1 text-left", {"p-5":withSeparator}, className)} {...props} />
			{withSeparator && <Separator orientation="horizontal"/>}
		</>
	)
}
ModalHeader.displayName = "DialogHeader"

function ModalFooter({ className, ...props }: ModalFooterProps) {
	const { withSeparator } = useModalContext()
	return (
		<>
			{withSeparator && <Separator orientation="horizontal"/>}
			<div className={cn("flex justify-end gap-2", {"p-5":withSeparator}, className)} {...props} />
		</>
	)
}
ModalFooter.displayName = "DialogFooter"

function ModalTitle({ className, ...props }: ModalTitleProps) {
	return <DialogPrimitive.Title data-slot="modal-title" className={cn("text-lg font-semibold", className)} {...props} />
}
ModalTitle.displayName = DialogPrimitive.Title.displayName

function ModalDescription({ className, ...props }: ModalDescriptionProps) {
	return <DialogPrimitive.Description data-slot="modal-description" className={cn("text-fg2 text-sm leading-tight", className)} {...props} />
}
ModalDescription.displayName = DialogPrimitive.Description.displayName

export { Modal, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalOverlay, ModalPortal, ModalTitle, ModalTrigger }
