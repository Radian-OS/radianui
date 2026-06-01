"use client"

import React from "react"
import { toast } from "sonner"
import { IconSlot } from "@/registry/icon/icon-library"
import { Button } from "@/registry/ui/button"

const ToastPlacement = () => {
	return (
		<div className="flex items-center justify-center gap-4">
			<Button
				variant="outline"
				color="neutral"
				onClick={() =>
					toast.custom((t) => (
						<div className="bg-primary flex items-center justify-between gap-2 rounded-lg px-3 py-2.5">
							<IconSlot slot="box" size={20} className="text-primary-fg" />
							<div className="flex gap-3">
								<div className="text-primary-fg">
									<p className="text-sm font-medium">Toast Title</p>
									<p className="text-sm font-normal sm:whitespace-nowrap">
										Toast description message.
									</p>
								</div>
								<div className="flex gap-3">
									<Button
										className="text-primary-fg !font-medium"
										variant={"link"}>
										Learn More
									</Button>
									<Button
										className="text-primary-fg !font-medium"
										variant={"link"}>
										Upgrade
									</Button>
								</div>
							</div>
							<IconSlot
								slot="cross"
								onClick={() => toast.dismiss(t)}
								size={16}
								className="text-primary-fg cursor-pointer"
							/>
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
						<div className="bg-primary flex items-start justify-between gap-2 rounded-lg px-3 py-2.5">
							<IconSlot slot="box" size={20} className="text-primary-fg" />
							<div className="flex flex-col gap-1.5">
								<div className="text-primary-fg">
									<p className="text-sm font-medium">Toast Title</p>
									<p className="text-sm font-normal">
										Toast description message.
									</p>
								</div>
								<div className="flex gap-3">
									<Button
										className="text-primary-fg !font-medium"
										variant="link">
										Learn More
									</Button>
									<Button
										className="text-primary-fg !font-medium"
										variant={"link"}>
										Upgrade
									</Button>
								</div>
							</div>
							<IconSlot
								slot="cross"
								onClick={() => toast.dismiss(t)}
								size={16}
								className="text-primary-fg cursor-pointer"
							/>
						</div>
					))
				}>
				Vertical
			</Button>
		</div>
	)
}

export default ToastPlacement
