import React from "react"
import { Input } from "@/registry/ui/input"

const InputSize = () => {
	return (
		<div className="flex w-80 flex-col gap-4">
			{/* Input size 28 */}
			<Input size="28" placeholder="Size 28" />

			{/* Input size 32 */}
			<Input size="32" placeholder="Size 32" />

			{/* Input size 36 */}
			<Input size="36" placeholder="Size 36" />

			{/* Input size 40 */}
			<Input size="40" placeholder="Size 40" />

			{/* Input size 44 */}
			<Input size="44" placeholder="Size 44" />

			{/* Input size 48 */}
			<Input size="48" placeholder="Size 48" />
		</div>
	)
}

export default InputSize
