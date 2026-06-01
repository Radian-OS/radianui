"use client"

import { useId, useState } from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Label } from "@/registry/ui/label"
import { Switch, SwitchIndicator, SwitchWrapper } from "@/registry/ui/switch"

export default function IconInsideSwitch() {
	const [isOn, setIsOn] = useState(false)
	const id = useId()

	return (
		<div className="flex items-center gap-2.5">
			<SwitchWrapper>
				<Switch id={id} size={"32"} checked={isOn} onCheckedChange={setIsOn}>
					<SwitchIndicator
						state={isOn ? "on" : "off"}
						className="text-fg-secondary text-[8px] font-semibold">
						{isOn ? (
							<IconSlot slot="moon" size={16} />
						) : (
							<IconSlot slot="sun" size={16} />
						)}
					</SwitchIndicator>
				</Switch>
			</SwitchWrapper>
			<Label className="text-base" htmlFor={id}>
				Icon Indicator
			</Label>
		</div>
	)
}
