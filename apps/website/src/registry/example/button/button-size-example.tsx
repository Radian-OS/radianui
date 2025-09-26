import { UserPen } from "lucide-react"
import { Button, IconButton } from "@/registry/ui/button"

function ButtonSizeExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<Button variant="outline" color="neutral" size="28">
					Button
				</Button>
				<Button variant="outline" color="neutral" size="32">
					Button
				</Button>
				<Button variant="outline" color="neutral" size="36">
					Button
				</Button>
				<Button variant="outline" color="neutral" size="40">
					Button
				</Button>
				<Button variant="outline" color="neutral" size="44">
					Button
				</Button>
				<Button variant="outline" color="neutral" size="48">
					Button
				</Button>
			</div>
			<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<IconButton variant="outline" color="neutral" size="28">
					<UserPen />
				</IconButton>
				<IconButton variant="outline" color="neutral" size="32">
					<UserPen />
				</IconButton>
				<IconButton variant="outline" color="neutral" size="36">
					<UserPen />
				</IconButton>
				<IconButton variant="outline" color="neutral" size="40">
					<UserPen />
				</IconButton>
				<IconButton variant="outline" color="neutral" size="44">
					<UserPen />
				</IconButton>
				<IconButton variant="outline" color="neutral" size="48">
					<UserPen />
				</IconButton>
			</div>
		</div>
	)
}

export default ButtonSizeExample
