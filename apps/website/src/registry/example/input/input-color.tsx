import React, { useState } from "react"
import { Input, InputAddon, InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const ColorInput = () => {
	const [color, setColor] = useState("#623df5")

	return (
		<div className="flex w-80 flex-col gap-6">
			<div className="flex flex-col gap-2">
				<Label>Color Input</Label>
				<InputGroup className="relative">
					<InputAddon className="flex items-center gap-1" size="40">
						<p className="text-fg text-sm">Color</p>
						<label className="left-16.5 absolute size-5 cursor-pointer overflow-hidden rounded-md">
							<Input
								type="color"
								value={color}
								aria-label="Icon color picker"
								className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
								onChange={(e) => setColor(e.target.value)}
							/>
							<span className="block size-full" style={{ backgroundColor: color }} />
						</label>
					</InputAddon>
					<Input size="40" className="pl-8" type="text" value={color} placeholder="#000000" onChange={(e) => setColor(e.target.value)} />
				</InputGroup>
			</div>
		</div>
	)
}

export default ColorInput
