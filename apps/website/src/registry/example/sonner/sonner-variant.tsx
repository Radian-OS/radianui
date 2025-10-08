import React from "react"
import { Box, XIcon } from "lucide-react"
import { toast } from "sonner"
import { Button, LinkButton } from "@/registry/ui/button"

const ToastColor = () => {
	return (
		<div className="flex items-center justify-center gap-4">
			<Button
				variant="soft"
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
				Neutral
			</Button>

			<Button
				variant="strong"
				color="primary"
				onClick={() =>
					toast.custom((t) => (
						<div className="bg-primary flex w-[416px] items-center justify-between gap-2 rounded-lg px-3 py-2.5">
							<Box size={20} className="text-white" />
							<div className="text-white">
								<p className="text-sm font-medium">Toast Title</p>
								<p className="text-sm font-normal">Toast description message.</p>
							</div>
							<div className="flex gap-3">
								<LinkButton className="text-white" href="#">
									Learn More
								</LinkButton>
								<LinkButton className="text-white" href="#">
									Upgrade
								</LinkButton>
							</div>
							<XIcon onClick={() => toast.dismiss(t)} size={16} className="cursor-pointer text-white" />
						</div>
					))
				}>
				Strong
			</Button>

			<Button
				variant="outline"
				color="primary"
				onClick={() =>
					toast.custom((t) => (
						<div className="bg-black-inverse text-fg-inverse flex w-[416px] items-center justify-between gap-2 rounded-lg px-3 py-2.5">
							<Box size={20} className="text-primary" />
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
				Inverse
			</Button>
		</div>
	)
}

export default ToastColor
