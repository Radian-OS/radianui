import React from "react"
import { Bell, Calendar, Trash2 } from "lucide-react"
import { Button } from "@/registry/ui/button"

function ButtonWithIconExample() {
	return (
		<div className="flex items-center justify-center gap-4 sm:flex-row">
			<Button className="w-full" variant="strong" color="error">
				<Trash2 /> Delete
			</Button>
			<Button color="neutral" variant="outline">
				<Bell /> Outline
			</Button>
			<Button color="neutral" variant="ghost">
				<Calendar /> Ghost
			</Button>
		</div>
	)
}

export default ButtonWithIconExample
