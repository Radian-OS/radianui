import React from "react"
import { Button } from "@/registry/ui/button"

const ButtonVariantsExample = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-5">
			<div className="flex items-center justify-center gap-3">
				<Button>Strong</Button>
				<Button variant="soft" color="primary">
					Soft
				</Button>
				<Button variant="outline" color="primary">
					Outline
				</Button>
				<Button variant="ghost" color="primary">
					Ghost
				</Button>
			</div>
			<div className="flex items-center justify-center gap-3">
				<Button color="neutral">Strong</Button>
				<Button variant="soft" color="neutral">
					Soft
				</Button>
				<Button variant="outline" color="neutral">
					Outline
				</Button>
				<Button variant="ghost" color="neutral">
					Ghost
				</Button>
			</div>
			<div className="flex items-center justify-center gap-3">
				<Button color="error">Strong</Button>
				<Button variant="soft" color="error">
					Soft
				</Button>
				<Button variant="outline" color="error">
					Outline
				</Button>
				<Button variant="ghost" color="error">
					Ghost
				</Button>
			</div>
		</div>
	)
}

export default ButtonVariantsExample
