import { useState } from "react"
import { X } from "lucide-react"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function InputClearButton() {
	const [email, setEmail] = useState<string>("")

	const handleClear = () => {
		setEmail("")
	}
	return (
		<div className="flex w-80 flex-col gap-1.5">
			<Label>Email Address</Label>
			<InputWrapper className="max-w-80">
				<Input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="sagunmdr@radian.com"
				/>
				<X
					className="text-fg-tertiary size-4 cursor-pointer"
					onClick={handleClear}
				/>
			</InputWrapper>
		</div>
	)
}
