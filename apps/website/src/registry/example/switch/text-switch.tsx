"use client"

import { useId, useState } from "react"
import { Label } from "@/styles/default/ui/label"
import {
	Switch,
	SwitchIndicator,
	SwitchWrapper,
} from "@/styles/default/ui/switch"

export default function TextInsideSwitch() {
	const [isOn, setIsOn] = useState(false)
	const id = useId()

	return (
		<div className="flex items-center gap-2.5">
			<SwitchWrapper>
				<Switch id={id} size={"32"} checked={isOn} onCheckedChange={setIsOn}>
					<SwitchIndicator
						state={isOn ? "on" : "off"}
						className="text-fg-tertiary text-[8px] font-semibold">
						{isOn ? "ON" : "OFF"}
					</SwitchIndicator>
				</Switch>
			</SwitchWrapper>
			<Label className="text-base" htmlFor={id}>
				Text Indicator
			</Label>
		</div>
	)
}
