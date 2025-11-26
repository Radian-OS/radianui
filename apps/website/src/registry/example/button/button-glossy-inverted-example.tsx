import React from "react"
import { Button } from "@/registry/ui/button"

const ButtonGlossyInvertedExample = () => {
	return (
		<div className="w-50 flex flex-col items-center justify-center gap-3">
			<Button className="w-full" variant="glossy-inverted">
				Primary
			</Button>
			<Button color="info" className="w-full" variant="glossy-inverted">
				Info
			</Button>
			<Button color="success" className="w-full" variant="glossy-inverted">
				Success
			</Button>
			<Button color="warning" className="w-full" variant="glossy-inverted">
				Warning
			</Button>
			<Button color="error" className="w-full" variant="glossy-inverted">
				Error
			</Button>
			<Button color="neutral" className="w-full" variant="glossy-inverted">
				Neutral
			</Button>

			{/* <Button className="active:bg-primary before:to-white/16 relative w-full overflow-hidden shadow-[0_0_0_1px_#683BFF,0_1px_2px_0_rgba(27,11,104,0.32),0_6px_16px_0_rgba(27,11,104,0.32)] before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/0">
                        Gradient w/shadow
                    </Button> */}
		</div>
	)
}

export default ButtonGlossyInvertedExample
