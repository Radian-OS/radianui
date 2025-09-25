import React from "react"
import { Box, XIcon } from "lucide-react"
import { toast } from "sonner"
import { Button, LinkButton } from "@/registry/ui/button"

const InverseVariant = () => {
	return (
		<div className="flex items-center justify-center gap-4">
			<div className="flex items-center justify-center gap-4">
				<Button
					variant="strong"
					color="neutral"
					onClick={() =>
						toast.custom((t) => (
							<div className="bg-black-inverse text-fg-inverse flex w-[416px] items-center justify-between gap-2 rounded-lg px-3 py-2.5">
								<Box size={20} className="text-fg-inverse" />
								<div>
									<p className="text-sm font-medium">Toast Title</p>
									<p className="text-sm font-normal">Toast description message.</p>
								</div>
								<div className="flex gap-3">
									<LinkButton href="#" className="text-fg-inverse">
										Learn More
									</LinkButton>
									<LinkButton href="#" className="text-fg-inverse">
										Upgrade
									</LinkButton>
								</div>
								<XIcon onClick={() => toast.dismiss(t)} size={16} className="cursor-pointer" />
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
							<div className="bg-black-inverse text-fg-inverse flex w-[416px] items-center justify-between gap-2 rounded-lg px-3 py-2.5">
								<Box size={20} className="text-primary" />
								<div>
									<p className="text-sm font-medium">Toast Title</p>
									<p className="text-sm font-normal">Toast description message.</p>
								</div>
								<div className="flex gap-3">
									<LinkButton className="text-fg-inverse" href="#">
										Learn More
									</LinkButton>
									<LinkButton className="text-fg-inverse" href="#">
										Upgrade
									</LinkButton>
								</div>
								<XIcon onClick={() => toast.dismiss(t)} size={16} className="cursor-pointer" />
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
							<div className="bg-black-inverse text-fg-inverse flex w-[416px] items-center justify-between gap-2 rounded-lg px-3 py-2.5">
								<Box size={20} className="text-warning" />
								<div className="text-fg-inverse">
									<p className="text-sm font-medium">Toast Title</p>
									<p className="text-sm font-normal">Toast description message.</p>
								</div>
								<div className="flex gap-3">
									<LinkButton className="text-fg-inverse" href="#">
										Learn More
									</LinkButton>
									<LinkButton className="text-fg-inverse" href="#">
										Upgrade
									</LinkButton>
								</div>
								<XIcon onClick={() => toast.dismiss(t)} size={16} className="text-fg-inverse cursor-pointer" />
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
							<div className="bg-black-inverse text-fg-inverse flex w-[416px] items-center justify-between gap-2 rounded-lg px-3 py-2.5">
								<Box size={20} className="text-error" />
								<div className="text-fg-inverse">
									<p className="text-sm font-medium">Toast Title</p>
									<p className="text-sm font-normal">Toast description message.</p>
								</div>
								<div className="flex gap-3">
									<LinkButton className="text-fg-inverse" href="#">
										Learn More
									</LinkButton>
									<LinkButton className="text-fg-inverse" href="#">
										Upgrade
									</LinkButton>
								</div>
								<XIcon onClick={() => toast.dismiss(t)} size={16} className="cursor-pointer" />
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
							<div className="bg-black-inverse text-fg-inverse flex w-[416px] items-center justify-between gap-2 rounded-lg px-3 py-2.5">
								<Box size={20} className="text-info" />
								<div className="text-fg-inverse">
									<p className="text-sm font-medium">Toast Title</p>
									<p className="text-sm font-normal">Toast description message.</p>
								</div>
								<div className="flex gap-3">
									<LinkButton className="text-fg-inverse" href="#">
										Learn More
									</LinkButton>
									<LinkButton className="text-fg-inverse" href="#">
										Upgrade
									</LinkButton>
								</div>
								<XIcon onClick={() => toast.dismiss(t)} size={16} className="cursor-pointer" />
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
							<div className="bg-black-inverse text-fg-inverse flex w-[416px] items-center justify-between gap-2 rounded-lg px-3 py-2.5">
								<Box size={20} className="text-success" />
								<div className="text-fg-inverse">
									<p className="text-sm font-medium">Toast Title</p>
									<p className="text-sm font-normal">Toast description message.</p>
								</div>
								<div className="flex gap-3">
									<LinkButton className="text-fg-inverse" href="#">
										Learn More
									</LinkButton>
									<LinkButton className="text-fg-inverse" href="#">
										Upgrade
									</LinkButton>
								</div>
								<XIcon onClick={() => toast.dismiss(t)} size={16} className="cursor-pointer" />
							</div>
						))
					}>
					Success
				</Button>
			</div>
		</div>
	)
}

export default InverseVariant
