import React from "react"
import { Mail, Settings, User } from "lucide-react"
import { IconButton } from "@/registry/ui/button"

function ButtonIconOnlyExample() {
	return (
		<div className="flex items-center justify-center gap-4">
			<IconButton>
				<User />
			</IconButton>
			<IconButton variant="outline" color="neutral">
				<Mail />
			</IconButton>
			<IconButton variant="ghost" color="neutral">
				<Settings className="hover:animate-spin" />
			</IconButton>
		</div>
	)
}

export default ButtonIconOnlyExample
