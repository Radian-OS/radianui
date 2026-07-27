import { User } from "lucide-react"
import { Button, IconButton } from "@/registry/ui/button"

function LoadingButtonExample() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<Button disabled loading>
				Sync Progress
			</Button>
			<IconButton aria-label="Loading Button" disabled loading>
				<User />
			</IconButton>
		</div>
	)
}
export default LoadingButtonExample
