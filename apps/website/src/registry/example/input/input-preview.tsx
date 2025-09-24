import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const InputPreview = () => {
	return (
		<div className="flex flex-col gap-1.5">
			<Label>Username</Label>
			<Input className="w-80" placeholder="Enter your username here" />
		</div>
	)
}

export default InputPreview
