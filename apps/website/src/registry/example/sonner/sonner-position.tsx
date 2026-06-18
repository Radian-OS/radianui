"use client"

import { toast } from "sonner"
import { Button } from "@/registry/ui/button"

const ToastPosition = () => {
	const showToast = (
		position:
			| "top-left"
			| "top-center"
			| "top-right"
			| "bottom-left"
			| "bottom-center"
			| "bottom-right"
	) => {
		toast("Toast Title", {
			description: "Toast Description Message",
			action: {
				label: "Upgrade",
				onClick: () => console.log("Upgrade clicked!"),
			},
			position,
			duration: 2000,
		})
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-2">
				<Button
					variant="outline"
					color="neutral"
					className="flex-1 sm:w-[140px]"
					onClick={() => showToast("top-left")}>
					Top Left
				</Button>
				<Button
					variant="outline"
					color="neutral"
					className="flex-1 sm:w-[140px]"
					onClick={() => showToast("top-center")}>
					Top Center
				</Button>
				<Button
					variant="outline"
					color="neutral"
					className="flex-1 sm:w-[140px]"
					onClick={() => showToast("top-right")}>
					Top Right
				</Button>
			</div>
			<div className="flex gap-2">
				<Button
					variant="outline"
					color="neutral"
					className="flex-1 sm:w-[140px]"
					onClick={() => showToast("bottom-left")}>
					Bottom Left
				</Button>
				<Button
					variant="outline"
					color="neutral"
					className="flex-1 sm:w-[140px]"
					onClick={() => showToast("bottom-center")}>
					Bottom Center
				</Button>
				<Button
					variant="outline"
					color="neutral"
					className="flex-1 sm:w-[140px]"
					onClick={() => showToast("bottom-right")}>
					Bottom Right
				</Button>
			</div>
		</div>
	)
}

export default ToastPosition
