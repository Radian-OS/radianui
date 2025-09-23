import { UserPen } from "lucide-react"
import { Button, IconButton } from "@/registry/ui/button"

function ButtonSizeExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-6">
			<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<Button variant="outline" color="neutral" size="28">
					<UserPen />
					Button
				</Button>
				<Button variant="outline" color="neutral" size="32">
					<UserPen />
					Button
				</Button>
				<Button variant="outline" color="neutral" size="36">
					<UserPen />
					Button
				</Button>
				<Button variant="outline" color="neutral" size="40">
					<UserPen />
					Button
				</Button>
				<Button variant="outline" color="neutral" size="44">
					<UserPen />
					Button
				</Button>
				<Button variant="outline" color="neutral" size="48">
					<UserPen />
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
