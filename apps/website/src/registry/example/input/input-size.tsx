import React from "react"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const InputSize = () => {
	return (
		<div className="flex w-80 flex-col gap-6">
			{/* Input size xs */}
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="input-size-xs">Size xs</Label>
				<Input id="input-size-xs" size="xs" />
			</div>

			{/* Input size sm */}
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="input-size-sm">Size sm</Label>
				<Input id="input-size-sm" size="sm" />
			</div>
			{/* Input size md */}
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="input-size-md">Size md</Label>
				<Input id="input-size-md" size="md" />
			</div>

			{/* Input size lg */}
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="input-size-lg">Size lg</Label>
				<Input id="input-size-lg" size="lg" />
			</div>

			{/* Input size xl */}
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="input-size-xl">Size xl</Label>
				<Input id="input-size-xl" size="xl" />
			</div>

			{/* Input size 2xl */}
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="input-size-2xl">Size 2xl</Label>
				<Input id="input-size-2xl" size="2xl" />
			</div>
		</div>
	)
}

export default InputSize
