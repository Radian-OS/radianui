import React from "react"
import { FileX, RefreshCcw, UserPlus } from "lucide-react"
import { Button } from "@/registry/ui/button"

function ButtonExampleDisabled() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
			<Button disabled>
				<RefreshCcw /> Sync Progress
			</Button>
			<Button color="error" variant="soft" disabled>
				<FileX />
				Delete File
			</Button>
			<Button disabled variant="outline" color="neutral">
				<UserPlus />
				Invite Users
			</Button>
		</div>
	)
}

export default ButtonExampleDisabled
