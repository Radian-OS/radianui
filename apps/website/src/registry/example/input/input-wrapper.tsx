import React from "react"
import { MapPin, User } from "lucide-react"
import { Input, InputWrapper } from "@/styles/default/ui/input"
import { Label } from "@/styles/default/ui/label"

const InputWrappers = () => {
	return (
		<div className="flex w-80 flex-col gap-6">
			<div className="flex flex-col gap-1.5">
				<Label>Full Name</Label>
				<InputWrapper className="w-full">
					<User />
					<Input placeholder="Anna Mureum" />
				</InputWrapper>
			</div>

			<div className="flex w-full flex-col gap-1.5">
				<Label>Location</Label>
				<InputWrapper className="w-full">
					<Input placeholder="182 St, Port Alsworth, USA" />
					<MapPin />
				</InputWrapper>
			</div>
		</div>
	)
}

export default InputWrappers
