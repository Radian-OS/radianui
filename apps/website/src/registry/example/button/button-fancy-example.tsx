import React from "react"
import { Button } from "@/styles/default/ui/button"

const ButtonFancyExample = () => {
	return (
		<div className="w-50 flex flex-col items-center justify-center gap-4">
			<Button className="from-primary to-primary-hover before:border-white/16 hover:opacity-92 w-full overflow-hidden bg-gradient-to-b before:absolute before:inset-px before:rounded-lg before:border">
				Top Dark
			</Button>
			<Button className="from-primary-hover to-primary before:border-white/16 hover:opacity-92 w-full overflow-hidden bg-gradient-to-b before:absolute before:inset-px before:rounded-lg before:border">
				Top Shine
			</Button>
		</div>
	)
}

export default ButtonFancyExample
