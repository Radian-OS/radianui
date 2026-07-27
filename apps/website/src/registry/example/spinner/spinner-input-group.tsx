import { Input, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Spinner } from "@/registry/ui/spinner"

export default function SpinnerInputGroup() {
	return (
		<div className="flex flex-col justify-center gap-1.5">
			<Label htmlFor="search-loading">Records</Label>
			<InputWrapper>
				<Spinner className="size-4" />
				<Input id="search-loading" placeholder="Search records…" />
			</InputWrapper>
		</div>
	)
}
