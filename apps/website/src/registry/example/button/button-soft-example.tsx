import React from "react"
import { Button } from "@/registry/ui/button"

function ButtonSoftExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
			<Button variant="soft" color="primary">
				Primary
			</Button>
			<Button variant="soft" color="info">
				Info
			</Button>
			<Button variant="soft" color="success">
				Success
			</Button>
			<Button variant="soft" color="warning">
				Warning
			</Button>
			<Button variant="soft" color="error">
				Error
			</Button>
			<Button variant="soft" color="neutral">
				Neutral
			</Button>
		</div>
	)
}

export default ButtonSoftExample
