import React from "react"
import { Button } from "@/styles/default/ui/button"

const ButtonElevatedExample = () => {
	return (
		<div className="w-50 flex flex-col items-center justify-center gap-3">
			<Button className="active:bg-primary w-full shadow-[0_2px_4px_0_rgba(35,20,85,0.16),0_-2px_0_0_rgba(0,0,0,0.3)_inset] hover:shadow-[0_2px_4px_0_rgba(35,20,85,0.12),0_-2px_0_0_rgba(0,0,0,0.2)_inset] active:shadow-[0_2px_4px_0_rgba(35,20,85,0.16)]">
				Elevated Button
			</Button>
			<Button
				className="active:bg-elevation-level1 w-full shadow-[0_-1px_0_0_var(--color-border)_inset,0_1px_1px_0_rgba(25,24,27,0.04)] active:shadow-[0_0px_0_0_var(--color-border)_inset,0_1px_1px_0_rgba(25,24,27,0.04)]"
				color="neutral"
				variant="outline">
				Elevated Neutral
			</Button>
		</div>
	)
}

export default ButtonElevatedExample
