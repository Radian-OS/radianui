import React from "react"
import { Button } from "@/registry/ui/button"

const ButtonGradientExample = () => {
	return (
		<div className="w-50 flex flex-col items-center justify-center gap-3">
			<Button className="relative w-full overflow-hidden border border-black/10">
				Gradient
				<span className="pointer-events-none absolute inset-0 z-0 size-full bg-gradient-to-b from-white/20 to-white/0" />
			</Button>
			<Button className="to-white/16 relative w-full overflow-hidden bg-gradient-to-b from-white">Gradient w/shadow</Button>
		</div>
	)
}

export default ButtonGradientExample
