import React from "react"
import { Button, ButtonGroup } from "@/registry/ui/button"

function ButtonGroupExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<ButtonGroup>
				<Button>First</Button>
				<Button>Second</Button>
				<Button>Third</Button>
				<Button>Fourth</Button>
			</ButtonGroup>
			<ButtonGroup color="error" variant="ghost">
				<Button>First</Button>
				<Button>Second</Button>
				<Button>Third</Button>
				<Button>Fourth</Button>
			</ButtonGroup>
			<ButtonGroup color="info" variant="strong">
				<Button>First</Button>
				<Button>Second</Button>
				<Button>Third</Button>
				<Button>Fourth</Button>
			</ButtonGroup>
			<ButtonGroup color="success" variant="soft">
				<Button>First</Button>
				<Button>Second</Button>
				<Button>Third</Button>
				<Button>Fourth</Button>
			</ButtonGroup>
		</div>
	)
}

export default ButtonGroupExample
