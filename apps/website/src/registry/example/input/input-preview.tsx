import { Input } from "@/styles/default/ui/input"
import { Label } from "@/styles/default/ui/label"

const InputPreview = () => {
	return (
		<div className="flex w-80 flex-col gap-1.5">
			<Label>Username</Label>
			<Input className="w-full" placeholder="Enter username" />
		</div>
	)
}

export default InputPreview
