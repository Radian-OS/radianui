import React from "react"
import { Database } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Empty, EmptyAction, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/ui/empty"

export default function NoProjectsYet() {
	return (
		<Empty>
			<EmptyMedia variant="icon" className="border-soft shadow-2xs rounded-full border">
				<span className="bg-bg border-soft shadow-2xs flex items-center justify-center rounded-[inherit] border p-3.5">
					<Database />
				</span>
			</EmptyMedia>
			<EmptyHeader>
				<EmptyTitle>No Projects Yet</EmptyTitle>
				<EmptyDescription>You don’t have any projects yet. Create your first one to get started</EmptyDescription>
			</EmptyHeader>
			<EmptyAction>
				<Button>Create Project</Button>
			</EmptyAction>
		</Empty>
	)
}
