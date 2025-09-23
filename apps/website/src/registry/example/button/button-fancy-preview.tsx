import React from "react"
import { Button } from "@/registry/ui/button"

function ButtonFancyExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<Button className="border-primary-hover w-full border bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-lg ring-[1.5px] ring-[#5B3FE0] hover:from-[#6A52F2] hover:to-[#5B3FE0]">
				Fancy Button
			</Button>
			<Button className="border-primary-hover w-full border bg-gradient-to-b from-[#5133CF] to-[#6347EB] shadow-[0px_4px_4px_rgba(24,25,27,0.16)] ring-[1.5px] ring-[#5B3FE0] hover:from-[#5B3FE0] hover:to-[#6A52F2]">
				Fancy Button 2
			</Button>
		</div>
	)
}

export default ButtonFancyExample
