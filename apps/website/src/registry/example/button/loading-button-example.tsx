import { IconSlot } from "@/registry/icon/icon-library"
import { Button, IconButton } from "@/registry/ui/button"

function LoadingButtonExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
			<Button disabled loading>
				Sync Progress
			</Button>
			<IconButton aria-label="Loading Button" disabled loading>
				<IconSlot slot="user" size={16} />
			</IconButton>
		</div>
	)
}
export default LoadingButtonExample
