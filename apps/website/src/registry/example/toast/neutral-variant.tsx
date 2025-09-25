import React from "react"
import { Box, XIcon } from "lucide-react"
import { toast } from "sonner"
import { Button, LinkButton } from "@/registry/ui/button"

const ToastVariant = () => {
	return (
		<div className="flex items-center justify-center gap-4">
			<div className="flex items-center justify-center gap-4">
				<Button
					variant="strong"
					color="neutral"
					onClick={() =>
						toast.custom((t) => (
							<div className="bg-elevation-level1 border-border flex w-[416px] items-center justify-between gap-2 rounded-lg border px-3 py-2.5">
								<Box size={20} className="text-fg-secondary" />
								<div>
									<p className="text-fg text-sm font-medium">Toast Title</p>
									<p className="text-fg-secondary text-sm font-normal">Toast description message.</p>
								</div>
								<div className="flex gap-3">
									<LinkButton color="neutral" href="#">
										Learn More
									</LinkButton>
									<LinkButton color="neutral" href="#">
										Upgrade
									</LinkButton>
								</div>
								<XIcon onClick={() => toast.dismiss(t)} size={16} className="text-fg-secondary cursor-pointer" />
							</div>
						))
					}>
					Neutral
				</Button>
				<Button
					variant="strong"
					color="primary"
					onClick={() =>
						toast.custom((t) => (
							<div className="bg-elevation-level1 border-border flex w-[416px] items-center justify-between gap-2 rounded-lg border px-3 py-2.5">
								<Box size={20} className="text-primary" />
								<div>
									<p className="text-fg text-sm font-medium">Toast Title</p>
									<p className="text-fg-secondary text-sm font-normal">Toast description message.</p>
								</div>
								<div className="flex gap-3">
									<LinkButton color="neutral" href="#">
										Learn More
									</LinkButton>
									<LinkButton color="neutral" href="#">
										Upgrade
									</LinkButton>
								</div>
								<XIcon onClick={() => toast.dismiss(t)} size={16} className="text-fg-secondary cursor-pointer" />
							</div>
						))
					}>
					Primary
				</Button>
				<Button
					variant="strong"
					color="warning"
					onClick={() =>
						toast.custom((t) => (
							<div className="bg-elevation-level1 border-border flex w-[416px] items-center justify-between gap-2 rounded-lg border px-3 py-2.5">
								<Box size={20} className="text-warning" />
								<div>
									<p className="text-fg text-sm font-medium">Toast Title</p>
									<p className="text-fg-secondary text-sm font-normal">Toast description message.</p>
								</div>
								<div className="flex gap-3">
									<LinkButton color="neutral" href="#">
										Learn More
									</LinkButton>
									<LinkButton color="neutral" href="#">
										Upgrade
									</LinkButton>
								</div>
								<XIcon onClick={() => toast.dismiss(t)} size={16} className="text-fg-secondary cursor-pointer" />
							</div>
						))
					}>
					Warning
				</Button>
				<Button
					variant="strong"
					color="error"
					onClick={() =>
						toast.custom((t) => (
							<div className="bg-elevation-level1 border-border flex w-[416px] items-center justify-between gap-2 rounded-lg border px-3 py-2.5">
								<Box size={20} className="text-error" />
								<div>
									<p className="text-fg text-sm font-medium">Toast Title</p>
									<p className="text-fg-secondary text-sm font-normal">Toast description message.</p>
								</div>
								<div className="flex gap-3">
									<LinkButton color="neutral" href="#">
										Learn More
									</LinkButton>
									<LinkButton color="neutral" href="#">
										Upgrade
									</LinkButton>
								</div>
								<XIcon onClick={() => toast.dismiss(t)} size={16} className="text-fg-secondary cursor-pointer" />
							</div>
						))
					}>
					Error
				</Button>
				<Button
					variant="strong"
					color="info"
					onClick={() =>
						toast.custom((t) => (
							<div className="bg-elevation-level1 border-border flex w-[416px] items-center justify-between gap-2 rounded-lg border px-3 py-2.5">
								<Box size={20} className="text-info" />
								<div>
									<p className="text-fg text-sm font-medium">Toast Title</p>
									<p className="text-fg-secondary text-sm font-normal">Toast description message.</p>
								</div>
								<div className="flex gap-3">
									<LinkButton color="neutral" href="#">
										Learn More
									</LinkButton>
									<LinkButton color="neutral" href="#">
										Upgrade
									</LinkButton>
								</div>
								<XIcon onClick={() => toast.dismiss(t)} size={16} className="text-fg-secondary cursor-pointer" />
							</div>
						))
					}>
					Info
				</Button>
				<Button
					variant="strong"
					color="success"
					onClick={() =>
						toast.custom((t) => (
							<div className="bg-elevation-level1 border-border flex w-[416px] items-center justify-between gap-2 rounded-lg border px-3 py-2.5">
								<Box size={20} className="text-success" />
								<div>
									<p className="text-fg text-sm font-medium">Toast Title</p>
									<p className="text-fg-secondary text-sm font-normal">Toast description message.</p>
								</div>
								<div className="flex gap-3">
									<LinkButton color="neutral" href="#">
										Learn More
									</LinkButton>
									<LinkButton color="neutral" href="#">
										Upgrade
									</LinkButton>
								</div>
								<XIcon onClick={() => toast.dismiss(t)} size={16} className="text-fg-secondary cursor-pointer" />
							</div>
						))
					}>
					Success
				</Button>
			</div>
		</div>
	)
}

export default ToastVariant
