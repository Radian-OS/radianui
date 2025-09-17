import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Input, InputWrapper } from "@/registry/ui/input"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"

const NumberInputPreview = () => {
	const [amount, setAmount] = useState("")

	interface HandleChangeEvent {
		target: {
			value: string
		}
	}

	const handleChange = (e: HandleChangeEvent) => {
		const onlyDigits = e.target.value.replace(/\D/g, "")
		setAmount(onlyDigits)
	}

	return (
		<InputWrapper className="w-80">
			<Minus
				onClick={(e) => {
					e.stopPropagation()
					setAmount((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"))
				}}
				onMouseDown={(e) => e.preventDefault()}
				className="cursor-pointer"
			/>
			<Input onChange={handleChange} value={amount} type="numeric" />
			<Plus
				onClick={(e) => {
					e.stopPropagation()
					setAmount((v) => String(Number(v || "0") + 1))
				}}
				className="cursor-pointer"
				onMouseDown={(e) => e.preventDefault()}
			/>
		</InputWrapper>
	)
}

export default NumberInputPreview
