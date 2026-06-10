"use client"

import React, { useState } from "react"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const ColorInput = () => {
	const [color, setColor] = useState("#623df5")

	return (
		<div className="flex w-80 flex-col gap-6">
			<div className="flex flex-col gap-2">
				<Label>Color Input</Label>
				<InputWrapper size="40">
					<Label className="relative size-5 shrink-0 cursor-pointer overflow-hidden rounded-md">
						<span
							className="block size-full"
							style={{ backgroundColor: color }}
						/>
						<Input
							type="color"
							value={color}
							aria-label="Icon color picker"
							className="absolute inset-0 size-full cursor-pointer opacity-0"
							onChange={(e) => setColor(e.target.value)}
						/>
					</Label>
					<Input
						type="text"
						value={color}
						placeholder="#000000"
						onChange={(e) => setColor(e.target.value)}
					/>
				</InputWrapper>
			</div>
		</div>
	)
}

export default ColorInput
