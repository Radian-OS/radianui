import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const InputPreview = () => {
	return (
		<div className="flex w-80 flex-col gap-1.5">
			<Label>Username</Label>
			<Input className="w-full" placeholder="Enter your username here" />
		</div>
	)
}

export default InputPreview
