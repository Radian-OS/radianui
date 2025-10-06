import { toast } from "sonner"
import { useToast } from "@/contexts/toast-context"
import { Button } from "@/registry/ui/button"

const ToastExpand = () => {
	const { setIsExpandable } = useToast()

	const showToast = (expand: boolean) => {
		setIsExpandable(expand)
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
				<Button variant="outline" className="flex-1 sm:w-[140px]" onClick={() => showToast(true)}>
					Expand
				</Button>
				<Button variant="outline" className="flex-1 sm:w-[140px]" onClick={() => showToast(false)}>
					Stack
				</Button>
			</div>
		</div>
	)
}

export default ToastExpand
