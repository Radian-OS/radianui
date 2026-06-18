// "use client"

// import { toast } from "sonner"
// import { Button } from "@/registry/ui/button"

// export default function Pattern() {
// 	return (
// 		<div className="grid grid-cols-3 gap-2">
// 			<Button
// 				variant="outline"
// 				className="w-full"
// 				onClick={() =>
// 					toast("Top Left", {
// 						description: "Notification appears in the top left.",
// 						position: "top-left",
// 					})
// 				}
// 			>
// 				Top Left
// 			</Button>
// 			<Button
// 				variant="outline"
// 				className="w-full"
// 				onClick={() =>
// 					toast("Top Center", {
// 						description: "Notification appears in the top center.",
// 						position: "top-center",
// 					})
// 				}
// 			>
// 				Top Center
// 			</Button>
// 			<Button
// 				variant="outline"
// 				className="w-full"
// 				onClick={() =>
// 					toast("Top Right", {
// 						description: "Notification appears in the top right.",
// 						position: "top-right",
// 					})
// 				}
// 			>
// 				Top Right
// 			</Button>
// 			<Button
// 				variant="outline"
// 				className="w-full"
// 				onClick={() =>
// 					toast("Bottom Left", {
// 						description: "Notification appears in the bottom left.",
// 						position: "bottom-left",
// 					})
// 				}
// 			>
// 				Bottom Left
// 			</Button>
// 			<Button
// 				variant="outline"
// 				className="w-full"
// 				onClick={() =>
// 					toast("Bottom Center", {
// 						description: "Notification appears in the bottom center.",
// 						position: "bottom-center",
// 					})
// 				}
// 			>
// 				Bottom Center
// 			</Button>
// 			<Button
// 				variant="outline"
// 				className="w-full"
// 				onClick={() =>
// 					toast("Bottom Right", {
// 						description: "Notification appears in the bottom right.",
// 						position: "bottom-right",
// 					})
// 				}
// 			>
// 				Bottom Right
// 			</Button>
// 		</div>
// 	)
// }

"use client"

import { toast } from "sonner"
import { useToast } from "@/contexts/toast-context"
import { Button } from "@/registry/ui/button"

// "use client"

// import { toast } from "sonner"
// import { Button } from "@/registry/ui/button"

// export default function Pattern() {
// 	return (
// 		<div className="grid grid-cols-3 gap-2">
// 			<Button
// 				variant="outline"
// 				className="w-full"
// 				onClick={() =>
// 					toast("Top Left", {
// 						description: "Notification appears in the top left.",
// 						position: "top-left",
// 					})
// 				}
// 			>
// 				Top Left
// 			</Button>
// 			<Button
// 				variant="outline"
// 				className="w-full"
// 				onClick={() =>
// 					toast("Top Center", {
// 						description: "Notification appears in the top center.",
// 						position: "top-center",
// 					})
// 				}
// 			>
// 				Top Center
// 			</Button>
// 			<Button
// 				variant="outline"
// 				className="w-full"
// 				onClick={() =>
// 					toast("Top Right", {
// 						description: "Notification appears in the top right.",
// 						position: "top-right",
// 					})
// 				}
// 			>
// 				Top Right
// 			</Button>
// 			<Button
// 				variant="outline"
// 				className="w-full"
// 				onClick={() =>
// 					toast("Bottom Left", {
// 						description: "Notification appears in the bottom left.",
// 						position: "bottom-left",
// 					})
// 				}
// 			>
// 				Bottom Left
// 			</Button>
// 			<Button
// 				variant="outline"
// 				className="w-full"
// 				onClick={() =>
// 					toast("Bottom Center", {
// 						description: "Notification appears in the bottom center.",
// 						position: "bottom-center",
// 					})
// 				}
// 			>
// 				Bottom Center
// 			</Button>
// 			<Button
// 				variant="outline"
// 				className="w-full"
// 				onClick={() =>
// 					toast("Bottom Right", {
// 						description: "Notification appears in the bottom right.",
// 						position: "bottom-right",
// 					})
// 				}
// 			>
// 				Bottom Right
// 			</Button>
// 		</div>
// 	)
// }

const ToastPosition = () => {
	const { setPosition } = useToast()

	const showToast = (
		position:
			| "top-left"
			| "top-center"
			| "top-right"
			| "bottom-left"
			| "bottom-center"
			| "bottom-right"
	) => {
		setPosition(position)
		toast("Toast Title", {
			description: "Toast Description Message",
			action: {
				label: "Upgrade",
				onClick: () => console.log("Upgrade clicked!"),
			},
			duration: 2000,
		})
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-2">
				<Button
					variant="outline"
					className="flex-1 sm:w-[140px]"
					onClick={() => showToast("top-left")}>
					Top Left
				</Button>
				<Button
					variant="outline"
					className="flex-1 sm:w-[140px]"
					onClick={() => showToast("top-center")}>
					Top Center
				</Button>
				<Button
					variant="outline"
					className="flex-1 sm:w-[140px]"
					onClick={() => showToast("top-right")}>
					Top Right
				</Button>
			</div>
			<div className="flex gap-2">
				<Button
					variant="outline"
					className="flex-1 sm:w-[140px]"
					onClick={() => showToast("bottom-left")}>
					Bottom Left
				</Button>
				<Button
					variant="outline"
					className="flex-1 sm:w-[140px]"
					onClick={() => showToast("bottom-center")}>
					Bottom Center
				</Button>
				<Button
					variant="outline"
					className="flex-1 sm:w-[140px]"
					onClick={() => showToast("bottom-right")}>
					Bottom Right
				</Button>
			</div>
		</div>
	)
}

export default ToastPosition
