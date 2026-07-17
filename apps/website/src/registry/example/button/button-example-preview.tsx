import React from "react"
import { Button } from "@/registry/ui/button"

function ButtonExamplePreview() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<Button>Save Changes</Button>
			<Button variant="outline" color="neutral">
				Cancel
			</Button>
		</div>
	)
}

export default ButtonExamplePreview
