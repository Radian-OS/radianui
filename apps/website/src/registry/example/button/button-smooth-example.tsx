import React from "react"
import { Button } from "@/styles/default/ui/button"

const ButtonSmoothExample = () => {
	return (
		<div className="w-50 flex flex-col items-center justify-center gap-3">
			<Button className="w-full" variant="smooth">
				Top Shine
			</Button>
			<Button className="w-full" variant="smooth-inverted">
				Top Dark
			</Button>
		</div>
	)
}

export default ButtonSmoothExample
