import React from "react"
import { Button } from "@/registry/ui/button"

const ButtonGradientExample = () => {
	return (
		<div className="w-50 flex flex-col items-center justify-center gap-3">
			<Button className="w-full" variant="glossy">
				Top Shine
			</Button>
			<Button className="w-full" variant="glossy-inverted">
				Top Dark
			</Button>
		</div>
	)
}

export default ButtonGradientExample
