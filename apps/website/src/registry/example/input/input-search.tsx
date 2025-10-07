import { Search } from "lucide-react"
import { Input, InputWrapper } from "@/registry/ui/input"

export default function InputSearch() {
	return (
		<InputWrapper className="max-w-80">
			<Search className="text-fg-tertiary size-4" />
			<Input type="search" placeholder="Search..." />
		</InputWrapper>
	)
}
