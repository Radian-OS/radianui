import { Mail } from "lucide-react"
import { Input, InputAddon, InputGroup, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const EmailPreview = () => {
	return (
		<div className="flex w-80 flex-col gap-4">
			{/* Default Email Input */}
			<div className="flex flex-col gap-1.5">
				<Label>Default Email Input</Label>
				<Input className="w-full" type="email" placeholder="designer@radianos.com" />
			</div>

			{/* Input Group */}
			<div className="flex w-full flex-col gap-1.5">
				<Label>Input Group</Label>
				<InputGroup className="w-full">
					<InputAddon mode="icon">
						<Mail />
					</InputAddon>
					<Input type="email" placeholder="designer@radianos.com" />
				</InputGroup>
			</div>

			{/* Input Wrapper */}
			<div className="flex w-full flex-col gap-1.5">
				<Label>Input Wrapper</Label>
				<InputWrapper className="w-full">
					<Mail />
					<Input type="email" placeholder="designer@radianos.com" />
				</InputWrapper>
			</div>
		</div>
	)
}

export default EmailPreview
