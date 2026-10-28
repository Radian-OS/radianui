import { Label } from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"

export default function SwitchSizes() {
	return (
		<div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
			<div className="flex items-center space-x-2">
				<Switch id="size-sm" size="sm" />
				<Label htmlFor="size-sm">Size sm</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Switch id="size-md" size="md" />
				<Label htmlFor="size-md">Size md</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Switch id="size-lg" size="lg" />
				<Label htmlFor="size-lg">Size lg</Label>
			</div>
		</div>
	)
}
