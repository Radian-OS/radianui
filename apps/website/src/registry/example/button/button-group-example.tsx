import React from "react"
import { Archive, Pencil, Trash2 } from "lucide-react"
import { Button, ButtonGroup } from "@/registry/ui/button"

function ButtonGroupExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<ButtonGroup>
				<Button>
					<Archive />
					Archive
				</Button>
				<Button>
					<Pencil />
					Edit
				</Button>
				<Button>
					<Trash2 />
					Delete
				</Button>
			</ButtonGroup>
		</div>
	)
}

export default ButtonGroupExample
