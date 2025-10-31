import React from "react"
import { Button } from "@/registry/ui/button"

const ButtonGradientExample = () => {
	return (
		<div className="w-50 flex flex-col items-center justify-center gap-3">
			<Button className="relative w-full overflow-hidden border border-black/10 before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-white/0">
				Gradient
			</Button>

			<Button className="before:to-white/16 relative w-full overflow-hidden shadow-[0_0_0_1px_#683BFF,0_1px_2px_0_rgba(27,11,104,0.32),0_6px_16px_0_rgba(27,11,104,0.32)] before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/0">
				Gradient w/shadow
			</Button>
		</div>
	)
}

export default ButtonGradientExample
