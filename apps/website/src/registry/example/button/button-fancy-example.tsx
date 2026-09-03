import React from "react"
import { Button } from "@/registry/ui/button"

const ButtonFancyExample = () => {
	return (
		<div className="flex w-50 flex-col items-center justify-center gap-4">
			<Button className="from-primary to-primary-hover w-full overflow-hidden bg-gradient-to-b before:absolute before:inset-px before:rounded-lg before:border before:border-white/16 hover:opacity-92">
				Top Dark
			</Button>
			<Button className="from-primary-hover to-primary w-full overflow-hidden bg-gradient-to-b before:absolute before:inset-px before:rounded-lg before:border before:border-white/16 hover:opacity-92">
				Top Shine
			</Button>
		</div>
	)
}

export default ButtonFancyExample
