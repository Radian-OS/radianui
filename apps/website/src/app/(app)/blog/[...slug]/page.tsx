import React from "react"
import { Badge } from "@/registry/ui/badge"

const page = () => {
	return (
		<div className="max-w-360 mb-70.5 mx-auto mt-20 flex w-full flex-col items-center">
			<div className="max-w-200 w-full">
				<div className="flex flex-col gap-4">
					<Badge variant="soft">Announcements</Badge>
					<h1 className="heading-3 font-semibold">Radian OS Alpha Release</h1>
					<p className="text-text-secondary text-sm">Sunday, June 24, 2025</p>
				</div>
			</div>
		</div>
	)
}

export default page
