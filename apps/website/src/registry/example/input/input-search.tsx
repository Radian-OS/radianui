import { IconSlot } from "@/registry/icon/icon-library"
import { Input, InputWrapper } from "@/registry/ui/input"

export default function InputSearch() {
	return (
		<InputWrapper className="max-w-80">
			<IconSlot slot="search" className="text-fg-tertiary size-4" />
			<Input type="search" placeholder="Search" />
		</InputWrapper>
	)
}
