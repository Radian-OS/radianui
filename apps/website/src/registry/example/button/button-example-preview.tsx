import React from "react"
import { Button } from "@/registry/ui/button"

function ButtonExamplePreview() {
	return (
		<div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
			<Button variant="strong" color="primary">
				Primary
			</Button>
			<Button variant="strong" color="info">
				Info
			</Button>
			<Button variant="strong" color="success">
				Success
			</Button>
			<Button variant="strong" color="warning">
				Warning
			</Button>
			<Button variant="strong" color="error">
				Error
			</Button>
			<Button variant="strong" color="neutral">
				Neutral
			</Button>
		</div>
	)
}

export default ButtonExamplePreview
