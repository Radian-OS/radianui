import React from "react"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const InputSize = () => {
	return (
		<div className="flex w-80 flex-col gap-6">
			{/* Input size 28 */}
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="input-size-28">Size 28</Label>
				<Input id="input-size-28" size="28" />
			</div>

			{/* Input size 32 */}
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="input-size-32">Size 32</Label>
				<Input id="input-size-32" size="32" />
			</div>
			{/* Input size 36 */}
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="input-size-36">Size 36</Label>
				<Input id="input-size-36" size="36" />
			</div>

			{/* Input size 40 */}
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="input-size-40">Size 40</Label>
				<Input id="input-size-40" size="40" />
			</div>

			{/* Input size 44 */}
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="input-size-44">Size 44</Label>
				<Input id="input-size-44" size="44" />
			</div>

			{/* Input size 48 */}
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="input-size-48">Size 48</Label>
				<Input id="input-size-48" size="48" />
			</div>
		</div>
	)
}

export default InputSize
