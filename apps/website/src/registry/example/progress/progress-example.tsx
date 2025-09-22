import { Label } from "@/registry/ui/label"
import { Progress } from "@/registry/ui/progress-bar"

const ProgressExample = () => {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex w-80 items-center justify-between">
				<Label>Progress</Label>
				<p className="text-fg-secondary text-sm font-medium">50%</p>
			</div>
			<Progress className="w-80" value={50} />
			<p className="text-fg-tertiary text-sm font-normal">Description</p>
		</div>
	)
}

export default ProgressExample
