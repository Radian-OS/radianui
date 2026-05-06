import React from "react"
import { Button } from "@/styles/default/ui/button"

const ButtonColorsExample = () => {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<Button>Primary</Button>
			<Button color="neutral">Neutral</Button>
			<Button color="error">Error</Button>
			<Button color="success">Success</Button>
			<Button color="info">Info</Button>
			<Button color="warning">Warning</Button>
		</div>
	)
}

export default ButtonColorsExample
