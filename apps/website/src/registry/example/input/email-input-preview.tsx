import { Mail } from "lucide-react"
import {
	Input,
	InputAddon,
	InputGroup,
	InputWrapper,
} from "@/styles/default/ui/input"
import { Label } from "@/styles/default/ui/label"

const EmailPreview = () => {
	return (
		<div className="flex w-80 flex-col gap-6">
			<div className="flex flex-col gap-1.5">
				<Label>Email Input</Label>
				<Input
					className="w-full"
					type="email"
					placeholder="info@radianos.com"
				/>
			</div>

			<div className="flex w-full flex-col gap-1.5">
				<Label>Email w/icon</Label>
				<InputWrapper className="w-full">
					<Mail />
					<Input type="email" placeholder="info@radianos.com" />
				</InputWrapper>
			</div>

			<div className="flex w-full flex-col gap-1.5">
				<Label>Email w/icon inside the input</Label>
				<InputGroup className="w-full">
					<InputAddon mode="icon">
						<Mail />
					</InputAddon>
					<Input type="email" placeholder="info@radianos.com" />
				</InputGroup>
			</div>
		</div>
	)
}

export default EmailPreview
