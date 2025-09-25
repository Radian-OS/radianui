import { Bold, Italic, RemoveFormatting, Underline } from "lucide-react"
import { ButtonGroup, IconButton } from "@/registry/ui/button"

function ButtonGroupIconExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<ButtonGroup variant="outline" color="neutral">
				<IconButton className="rounded-none">
					<Bold />
				</IconButton>
				<IconButton className="rounded-none">
					<Underline />
				</IconButton>
				<IconButton className="rounded-none">
					<Italic />
				</IconButton>
				<IconButton className="rounded-none">
					<RemoveFormatting />
				</IconButton>
			</ButtonGroup>
		</div>
	)
}

export default ButtonGroupIconExample
