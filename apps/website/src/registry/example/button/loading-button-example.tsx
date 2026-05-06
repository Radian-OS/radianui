import { User } from "lucide-react"
import { Button, IconButton } from "@/styles/default/ui/button"

function LoadingButtonExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
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
