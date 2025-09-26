import React from "react"
import { LinkButton } from "@/registry/ui/button"

function LinkButtonExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<LinkButton color="primary" href="#link-button">
				Primary
			</LinkButton>
			<LinkButton color="info" href="#link-button">
				Info
			</LinkButton>
			<LinkButton color="success" href="#link-button">
				Success
			</LinkButton>
			<LinkButton color="error" href="#link-button">
				Error
			</LinkButton>
			<LinkButton color="warning" href="#link-button">
				Warning
			</LinkButton>
			<LinkButton color="neutral" href="#link-button">
				Neutral
			</LinkButton>
		</div>
	)
}

export default LinkButtonExample
