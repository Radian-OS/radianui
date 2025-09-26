import React from "react"
import { Box, XIcon } from "lucide-react"
import { toast } from "sonner"
import { Button, LinkButton } from "@/registry/ui/button"

const ToastPlacement = () => {
	return (
		<div className="flex items-center justify-center gap-4">
			<Button
				variant="outline"
				color="neutral"
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
				Horizontal
			</Button>

			<Button
				variant="outline"
				color="neutral"
				onClick={() =>
					toast.custom((t) => (
						<div className="bg-success flex w-[259px] items-start justify-between gap-2 rounded-lg px-3 py-2.5">
							<Box size={20} className="text-white" />
							<div>
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
							</div>
							<XIcon onClick={() => toast.dismiss(t)} size={16} className="cursor-pointer text-white" />
						</div>
					))
				}>
				Vertical
			</Button>
		</div>
	)
}

export default ToastPlacement
