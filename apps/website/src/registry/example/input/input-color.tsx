import React, { useState } from "react"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const ColorInput = () => {
	const [color, setColor] = useState("#623df5")

	return (
		<div className="flex w-80 flex-col gap-6">
			<div className="flex flex-col gap-2">
				<Label>Color Input</Label>
				<div className="relative">
					<label className="absolute left-2 top-2.5 size-5 cursor-pointer overflow-hidden rounded-md">
						<Input
							type="color"
							value={color}
							aria-label="Icon color picker"
							className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
							onChange={(e) => setColor(e.target.value)}
						/>
						<span className="block size-full" style={{ backgroundColor: color }} />
					</label>
					<Input size="40" className="pl-8" type="text" value={color} placeholder="#000000" onChange={(e) => setColor(e.target.value)} />
				</div>
			</div>
		</div>
	)
}

export default ColorInput
