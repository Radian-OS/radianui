import { RadioGroup, RadioGroupItem } from "../ui/radiogroup"

function RadioGroupExample() {
	return (
		<div className="my-4 flex flex-row flex-wrap gap-8">
			<RadioGroup size="sm" defaultValue="1" label="Small Size">
				<RadioGroupItem value="1">Option 1</RadioGroupItem>
				<RadioGroupItem value="2">Option 2</RadioGroupItem>
				<RadioGroupItem value="3">Option 3</RadioGroupItem>
				<RadioGroupItem value="4" disabled>
					Option 4 (Disabled)
				</RadioGroupItem>
			</RadioGroup>

			<RadioGroup size="md" defaultValue="1" label="Medium Size">
				<RadioGroupItem value="1">Option 1</RadioGroupItem>
				<RadioGroupItem value="2">Option 2</RadioGroupItem>
				<RadioGroupItem value="3">Option 3</RadioGroupItem>
				<RadioGroupItem value="4" disabled checked>
					Option 4 (Disabled)
				</RadioGroupItem>
			</RadioGroup>

			<RadioGroup size="lg" defaultValue="1" label="Large Size">
				<RadioGroupItem value="1">Option 1</RadioGroupItem>
				<RadioGroupItem value="2">Option 2</RadioGroupItem>
				<RadioGroupItem value="3">Option 3</RadioGroupItem>
				<RadioGroupItem value="4" disabled>
					Option 4 (Disabled)
				</RadioGroupItem>
			</RadioGroup>
		</div>
	)
}

export default RadioGroupExample
