import React from "react"
import { Button } from "@/registry/ui/button"

function ButtonOutlineExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button variant="outline" color="primary">
				Primary
			</Button>
			<Button variant="outline" color="info">
				Info
			</Button>
			<Button variant="outline" color="success">
				Success
			</Button>
			<Button variant="outline" color="warning">
				Warning
			</Button>
			<Button variant="outline" color="error">
				Error
			</Button>
			<Button variant="outline" color="neutral">
				Neutral
			</Button>
		</div>
	)
}

export default ButtonOutlineExample
