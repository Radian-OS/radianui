import React from "react"
import { MapPin, User } from "lucide-react"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const InputWrappers = () => {
	return (
		<div className="flex w-80 flex-col gap-6">
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="full-name">Full Name</Label>
				<InputWrapper className="w-full">
					<User />
					<Input id="full-name" placeholder="Anna Mureum" />
				</InputWrapper>
			</div>

			<div className="flex w-full flex-col gap-1.5">
				<Label htmlFor="location">Location</Label>
				<InputWrapper className="w-full">
					<Input id="location" placeholder="182 St, Port Alsworth, USA" />
					<MapPin />
				</InputWrapper>
			</div>
		</div>
	)
}

export default InputWrappers
