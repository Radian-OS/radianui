import React from "react"
import { RefreshCcw, UserPlus } from "lucide-react"
import { Button } from "@/registry/ui/button"

function ButtonWithIconExample() {
	return (
		<div className="flex items-center justify-center gap-3 sm:flex-row">
			<Button variant="outline" color="neutral">
				<UserPlus className="text-fg-secondary" /> Invite Users
			</Button>
			<Button color="primary" variant="strong">
				<RefreshCcw /> Outline
			</Button>
		</div>
	)
}

export default ButtonWithIconExample
