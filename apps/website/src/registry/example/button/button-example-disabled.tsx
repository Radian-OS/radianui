import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Button } from "@/registry/ui/button"

function ButtonExampleDisabled() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
			<Button disabled>
				<IconSlot slot="refresh" size={16} /> Sync Progress
			</Button>
			<Button color="error" variant="soft" disabled>
				<IconSlot slot="cross" size={16} />
				Delete File
			</Button>
			<Button disabled variant="outline" color="neutral">
				<IconSlot slot="user-plus" size={16} />
				Invite Users
			</Button>
		</div>
	)
}

export default ButtonExampleDisabled
