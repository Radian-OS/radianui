import React from "react"
import { Button, ButtonGroup } from "@/styles/default/ui/button"

function ButtonGroupExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<ButtonGroup>
				<Button>Day</Button>
				<Button>Week</Button>
				<Button>Month</Button>
				<Button>Year</Button>
				<Button>Custom</Button>
			</ButtonGroup>
		</div>
	)
}

export default ButtonGroupExample
