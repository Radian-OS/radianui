import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const InputWrappers = () => {
	return (
		<div className="flex w-80 flex-col gap-6">
			<div className="flex flex-col gap-1.5">
				<Label>Full Name</Label>
				<InputWrapper className="w-full">
					<IconSlot slot="user" />
					<Input placeholder="Anna Mureum" />
				</InputWrapper>
			</div>

			<div className="flex w-full flex-col gap-1.5">
				<Label>Location</Label>
				<InputWrapper className="w-full">
					<Input placeholder="182 St, Port Alsworth, USA" />
					<IconSlot slot="map-pin" />
				</InputWrapper>
			</div>
		</div>
	)
}

export default InputWrappers
