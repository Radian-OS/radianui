import { toast } from "sonner"
import { Button } from "@/registry/ui/button"

const ToastPreview = () => {
	return (
		<Button
			variant="outline"
			onClick={() =>
				toast("Toast Title", {
					description: "Toast Description Message",
					action: {
						label: "Upgrade",
						onClick: () => console.log("Upgrade clicked!"),
					},
				})
			}>
			Show Toast
		</Button>
	)
}

export default ToastPreview
