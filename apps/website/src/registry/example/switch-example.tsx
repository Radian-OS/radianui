"use client"

import { useRef, useState } from "react"
import { Switch } from "../ui/switch"

const SwitchExample = () => {
	const [sendNotif, setSendNotif] = useState(false)

	const ref = useRef<HTMLButtonElement>(null)

	return (
		<div className="my-3 flex flex-col gap-3">
			<Switch size="20" checked={sendNotif} onCheckedChange={(selected) => setSendNotif(selected)}>
				Do you want to receive notifications?
			</Switch>
			<Switch defaultChecked aria-label="For screen readers" size="24" disabled>
				Disabled Label
			</Switch>
			<Switch size="24" ref={ref} defaultChecked={true}>
				Uncontrolled Component
			</Switch>
		</div>
	)
}

export default SwitchExample
