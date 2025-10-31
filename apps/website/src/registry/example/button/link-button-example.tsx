import React from "react"
import { LinkButton } from "@/registry/ui/button"

function LinkButtonExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
			<LinkButton color="neutral" href="#link-button">
				Cancel
			</LinkButton>
			<LinkButton color="primary" href="#link-button">
				Subscribe
			</LinkButton>
		</div>
	)
}

export default LinkButtonExample
