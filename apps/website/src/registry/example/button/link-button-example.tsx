import React from "react"
import { LinkButton } from "@/registry/ui/button"

function LinkButtonExample() {
	return (
		<div className="flex items-center justify-center">
			<LinkButton color="primary" href="#link-button">
				Navigate
			</LinkButton>
		</div>
	)
}

export default LinkButtonExample
