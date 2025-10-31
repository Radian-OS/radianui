import React from "react"
import { Button } from "@/registry/ui/button"

const ButtonFancyExample = () => {
	return (
		<div className="w-50 flex flex-col items-center justify-center gap-3">
			<Button className="border-white/44 relative w-full overflow-hidden border bg-gradient-to-b from-[#542AC7] to-[#6F38FF] shadow-[0_4px_4px_0_rgba(24,25,27,0.16),0_0_0_1.5px_#683BFF] hover:shadow-[0_6px_8px_0_rgba(24,25,27,0.12),0_0_0_1.5px_#683BFF] hover:brightness-105">
				Top Dark
			</Button>
			<Button className="border-white/44 relative w-full overflow-hidden rounded-lg border bg-gradient-to-b from-[#6F38FF] to-[#542AC7] shadow-[0_4px_4px_0_rgba(24,25,27,0.16),0_0_0_1.5px_#683BFF] hover:shadow-[0_6px_8px_0_rgba(24,25,27,0.12),0_0_0_1.5px_#683BFF] hover:brightness-105">
				Top Shine
			</Button>
		</div>
	)
}

export default ButtonFancyExample
