import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const InputPreview = () => {
	return (
		<div className="flex w-80 flex-col gap-1.5">
			<Label htmlFor="username">Username</Label>
			<Input className="w-full" id="username" placeholder="Enter username" />
		</div>
	)
}

export default InputPreview
