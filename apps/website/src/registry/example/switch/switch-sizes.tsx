import { Label } from "@/styles/default/ui/label"
import { Switch } from "@/styles/default/ui/switch"

export default function SwitchSizes() {
	return (
		<div className="flex gap-6">
			<div className="flex items-center space-x-2">
				<Switch id="size-sm" size="20" />
				<Label htmlFor="size-sm">Size 20</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Switch id="size-md" size="24" />
				<Label htmlFor="size-md">Size 24</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Switch id="size-lg" size="32" />
				<Label htmlFor="size-lg">Size 32</Label>
			</div>
		</div>
	)
}
