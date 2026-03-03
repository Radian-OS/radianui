import { TextArea, useCharacterLimit } from "@/registry/ui/text-area"

export default function LimitedCharacters() {
	const { value, handleChange, remainingCharacters } = useCharacterLimit({
		maxLength: 120,
	})

	return (
		<div className="flex w-full max-w-md flex-col gap-1.5">
			<TextArea
				value={value}
				onChange={handleChange}
				placeholder="Type your message here"
			/>
			<p className="text-fg-secondary ml-auto text-sm">
				{remainingCharacters} characters left.
			</p>
		</div>
	)
}
