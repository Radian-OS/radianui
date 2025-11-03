import React from "react"
import { Button } from "@/registry/ui/button"

const ButtonFancyExample = () => {
	return (
		<div className="w-50 flex flex-col items-center justify-center gap-3">
			{/* variant1 */}
			<Button className="relative w-full overflow-hidden rounded-lg bg-gradient-to-b from-[#542AC7] to-[#6F38FF] shadow-[0_4px_4px_0_rgba(24,25,27,0.16),0_0_0_1.5px_#683BFF] ring-1 ring-white/10 hover:shadow-[0_6px_8px_0_rgba(24,25,27,0.12),0_0_0_1.5px_#683BFF] hover:brightness-105">
				Top Dark
			</Button>

			{/* variant2 */}
			<Button className="relative w-full overflow-hidden rounded-lg bg-gradient-to-b from-[#6F38FF] to-[#542AC7] shadow-[0_4px_4px_0_rgba(24,25,27,0.16),0_0_0_1.5px_#683BFF] ring-1 ring-white/10 hover:shadow-[0_6px_8px_0_rgba(24,25,27,0.12),0_0_0_1.5px_#683BFF] hover:brightness-105">
				Top Shine
			</Button>
		</div>
	)
}

export default ButtonFancyExample
