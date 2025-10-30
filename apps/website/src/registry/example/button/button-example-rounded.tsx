import React from "react"
import { Button } from "@/registry/ui/button"

const ButtonExampleDisabled = () => {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<Button className="rounded-full" color="neutral" variant="outline">
				Cancel
			</Button>
			<Button className="rounded-full">Save Changes</Button>
		</div>
	)
}

export default ButtonExampleDisabled
