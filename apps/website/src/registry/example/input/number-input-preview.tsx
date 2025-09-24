import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Input, InputAddon, InputGroup, InputWrapper } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const NumberInputPreview = () => {
	//default number input
	const [amount, setAmount] = useState("")
	//input group number input
	const [amount1, setAmount1] = useState("")
	//input wrapper number input
	const [amount2, setAmount2] = useState("")

	interface HandleChangeEvent {
		target: {
			value: string
		}
	}
	//function to allow only numbers in default input field
	const handleChange = (e: HandleChangeEvent) => {
		const onlyDigits = e.target.value.replace(/\D/g, "")
		setAmount(onlyDigits)
	}

	//function to allow only numbers in input group field
	const handleChange1 = (e: HandleChangeEvent) => {
		const onlyDigits = e.target.value.replace(/\D/g, "")
		setAmount1(onlyDigits)
	}

	//function to allow only numbers in input wrapper field
	const handleChange2 = (e: HandleChangeEvent) => {
		const onlyDigits = e.target.value.replace(/\D/g, "")
		setAmount2(onlyDigits)
	}

	return (
		<div className="flex w-80 flex-col gap-4">
			{/* Default Number Input */}
			<div className="flex flex-col gap-1.5">
				<Label>Default Number Input</Label>
				<Input onChange={handleChange} className="w-80" placeholder="Enter Amount Here" value={amount} type="numeric" />{" "}
			</div>

			{/* Input Group */}
			<div className="flex flex-col gap-1.5">
				<Label>Input Group</Label>
				<InputGroup className="w-80">
					<InputAddon
						onClick={(e) => {
							e.stopPropagation()
							setAmount1((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"))
						}}
						className="cursor-pointer"
						onMouseDown={(e) => e.preventDefault()}>
						<Minus />
					</InputAddon>
					<Input onChange={handleChange1} placeholder="Enter Amount Here" value={amount1} type="numeric" />
					<InputAddon
						className="cursor-pointer"
						onClick={(e) => {
							e.stopPropagation()
							setAmount1((v) => String(Number(v || "0") + 1))
						}}
						onMouseDown={(e) => e.preventDefault()}>
						<Plus />
					</InputAddon>
				</InputGroup>
			</div>

			{/* Input Wrapper */}
			<div className="flex flex-col gap-1.5">
				<Label>Input Wrapper</Label>
				<InputWrapper className="w-80">
					<Minus
						onClick={(e) => {
							e.stopPropagation()
							setAmount2((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"))
						}}
						onMouseDown={(e) => e.preventDefault()}
						className="cursor-pointer"
					/>
					<Input onChange={handleChange2} placeholder="Enter Amount Here" value={amount2} type="numeric" />
					<Plus
						onClick={(e) => {
							e.stopPropagation()
							setAmount2((v) => String(Number(v || "0") + 1))
						}}
						className="cursor-pointer"
						onMouseDown={(e) => e.preventDefault()}
					/>
				</InputWrapper>
			</div>
		</div>
	)
}

export default NumberInputPreview
