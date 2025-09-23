import React from "react"
import { Button } from "@/registry/ui/button"

function ButtonGhostExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
			<Button variant="ghost" color="primary">
				Primary
			</Button>
			<Button variant="ghost" color="info">
				Info
			</Button>
			<Button variant="ghost" color="success">
				Success
			</Button>
			<Button variant="ghost" color="warning">
				Warning
			</Button>
			<Button variant="ghost" color="error">
				Error
			</Button>
			<Button variant="ghost" color="neutral">
				Neutral
			</Button>
		</div>
	)
}

export default ButtonGhostExample
