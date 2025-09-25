import React from "react"
import { Box, XIcon } from "lucide-react"
import { toast } from "sonner"
import { Button, LinkButton } from "@/registry/ui/button"

const StrongVariant = () => {
	return (
		<div className="flex items-center justify-center gap-4">
			<div className="flex items-center justify-center gap-4">
				<Button
					variant="strong"
					color="neutral"
					onClick={() =>
						toast.custom((t) => (
							<div className="flex w-[416px] items-center justify-between gap-2 rounded-lg bg-black px-3 py-2.5">
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
					Primary
				</Button>
				<Button
					variant="strong"
					color="warning"
					onClick={() =>
						toast.custom((t) => (
							<div className="bg-warning flex w-[416px] items-center justify-between gap-2 rounded-lg px-3 py-2.5">
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
					Warning
				</Button>
				<Button
					variant="strong"
					color="error"
					onClick={() =>
						toast.custom((t) => (
							<div className="bg-error flex w-[416px] items-center justify-between gap-2 rounded-lg px-3 py-2.5">
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
					Error
				</Button>
				<Button
					variant="strong"
					color="info"
					onClick={() =>
						toast.custom((t) => (
							<div className="bg-info flex w-[416px] items-center justify-between gap-2 rounded-lg px-3 py-2.5">
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
					Info
				</Button>
				<Button
					variant="strong"
					color="success"
					onClick={() =>
						toast.custom((t) => (
							<div className="bg-success flex w-[416px] items-center justify-between gap-2 rounded-lg px-3 py-2.5">
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
					Success
				</Button>
			</div>
		</div>
	)
}

export default StrongVariant
