import React from "react"
import { Button } from "@/registry/ui/button"

function ButtonExampleDisabled() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button disabled>Strong</Button>
			<Button variant="soft" disabled>
				Soft
			</Button>
			<Button disabled variant="outline">
				Outline
			</Button>
			<Button disabled variant="ghost">
				Ghost
			</Button>
		</div>
	)
}

export default ButtonExampleDisabled
