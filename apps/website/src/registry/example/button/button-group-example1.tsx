import React from "react"
import { Button, ButtonGroup } from "@/registry/ui/button"

function ButtonGroupExample1() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<ButtonGroup variant="strong" color="info">
				<Button>Sumbit</Button>
				<Button>Fetch Data</Button>
				<Button disabled loading>
					Save
				</Button>
			</ButtonGroup>
		</div>
	)
}

export default ButtonGroupExample1
