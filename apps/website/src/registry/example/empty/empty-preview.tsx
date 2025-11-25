import React from "react"
import { Button } from "@/registry/ui/button"
import { Empty, EmptyAction, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/ui/empty"

export default function EmptyPreview() {
	return (
		<Empty>
			<EmptyMedia variant="icon" />
			<EmptyHeader>
				<EmptyTitle>Empty State Header</EmptyTitle>
				<EmptyDescription>Message to help users create or search data values for this placeholder</EmptyDescription>
			</EmptyHeader>
			<EmptyAction>
				<Button variant="outline" color="neutral">
					Secondary
				</Button>
				<Button>Primary Action</Button>
			</EmptyAction>
		</Empty>
	)
}
