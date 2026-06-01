import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Button } from "@/registry/ui/button"

function ButtonWithIconExample() {
	return (
		<div className="flex items-center justify-center gap-3 sm:flex-row">
			<Button variant="outline" color="neutral">
				<IconSlot slot="user" size={16} /> Invite Users
			</Button>
			<Button color="primary" variant="strong">
				<IconSlot slot="refresh" size={16} /> Outline
			</Button>
		</div>
	)
}

export default ButtonWithIconExample
