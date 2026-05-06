import React from "react"
import { Button } from "@/styles/default/ui/button"

const ButtonExampleDisabled = () => {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<Button className="rounded-full px-4" color="neutral" variant="outline">
				Cancel
			</Button>
			<Button className="rounded-full px-4">Save Changes</Button>
		</div>
	)
}

export default ButtonExampleDisabled
