import React from "react"
import { Input } from "@/styles/default/ui/input"
import { Label } from "@/styles/default/ui/label"

const InputSize = () => {
	return (
		<div className="flex w-80 flex-col gap-6">
			{/* Input size 28 */}
			<div className="flex flex-col gap-1.5">
				<Label>Size 28</Label>
				<Input size="28" />
			</div>

			{/* Input size 32 */}
			<div className="flex flex-col gap-1.5">
				<Label>Size 32</Label>
				<Input size="32" />
			</div>
			{/* Input size 36 */}
			<div className="flex flex-col gap-1.5">
				<Label>Size 36</Label>
				<Input size="36" />
			</div>

			{/* Input size 40 */}
			<div className="flex flex-col gap-1.5">
				<Label>Size 40</Label>
				<Input size="40" />
			</div>

			{/* Input size 44 */}
			<div className="flex flex-col gap-1.5">
				<Label>Size 44</Label>
				<Input size="44" />
			</div>

			{/* Input size 48 */}
			<div className="flex flex-col gap-1.5">
				<Label>Size 48</Label>
				<Input size="48" />
			</div>
		</div>
	)
}

export default InputSize
