import React from "react"
import { Button } from "@/registry/ui/button"

function ButtonExamplePreview() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
			<Button variant="outline" color="neutral">
				Cancel
			</Button>
			<Button>Save Changes</Button>
		</div>
	)
}

export default ButtonExamplePreview
