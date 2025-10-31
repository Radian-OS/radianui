import React from "react"
import { LinkButton } from "@/registry/ui/button"

function LinkButtonSizeExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
			<LinkButton size="14" color="primary" href="#link-button">
				Size 14
			</LinkButton>
			<LinkButton size="16" color="primary" href="#link-button">
				Size 16
			</LinkButton>
		</div>
	)
}

export default LinkButtonSizeExample
