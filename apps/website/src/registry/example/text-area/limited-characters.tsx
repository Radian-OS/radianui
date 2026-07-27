"use client"

import React from "react"
import { Label } from "@/registry/ui/label"
import { TextArea, useCharacterLimit } from "@/registry/ui/text-area"

export default function LimitedCharacters() {
	const id = React.useId()
	const { value, handleChange, remainingCharacters } = useCharacterLimit({
		maxLength: 240,
	})

	return (
		<div className="flex w-full max-w-md flex-col gap-1.5">
			<Label htmlFor={id}>Type a message</Label>
			<TextArea
				id={id}
				value={value}
				onChange={handleChange}
				placeholder="Type your message here"
			/>
			<p className="text-fg-tertiary ml-auto text-xs">
				{remainingCharacters} characters left.
			</p>
		</div>
	)
}
