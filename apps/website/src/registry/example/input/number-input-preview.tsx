"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react"
import {
	Input,
	InputAddon,
	InputGroup,
	InputWrapper,
} from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const NumberInputPreview = () => {
	const [amount, setAmount] = useState("")
	const [amount1, setAmount1] = useState("")
	const [amount2, setAmount2] = useState("")
	const [amount3, setAmount3] = useState("")

	interface HandleChangeEvent {
		target: {
			value: string
		}
	}
	const handleChange = (e: HandleChangeEvent) => {
		const onlyDigits = e.target.value.replace(/\D/g, "")
		setAmount(onlyDigits)
	}

	const handleChange1 = (e: HandleChangeEvent) => {
		const onlyDigits = e.target.value.replace(/\D/g, "")
		setAmount1(onlyDigits)
	}

	const handleChange2 = (e: HandleChangeEvent) => {
		const onlyDigits = e.target.value.replace(/\D/g, "")
		setAmount2(onlyDigits)
	}

	const handleChange3 = (e: HandleChangeEvent) => {
		const onlyDigits = e.target.value.replace(/\D/g, "")
		setAmount3(onlyDigits)
	}

	return (
		<div className="flex w-32 flex-col gap-6">
			<div className="flex flex-col gap-1.5">
				<Label>Default Number</Label>
				<Input
					onChange={handleChange}
					className="w-full"
					placeholder="Enter number"
					value={amount}
					type="numeric"
				/>{" "}
			</div>

			<div className="flex flex-col gap-1.5">
				<Label>Input with Stepper</Label>
				<InputGroup className="w-full">
					<InputAddon
						mode="icon"
						onClick={(e) => {
							e.stopPropagation()
							setAmount1((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"))
						}}
						className="cursor-pointer"
						onMouseDown={(e) => e.preventDefault()}>
						<Minus />
					</InputAddon>
					<Input
						onChange={handleChange1}
						className="text-center"
						placeholder="12"
						value={amount1}
						type="numeric"
					/>
					<InputAddon
						mode="icon"
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

			<div className="flex flex-col gap-1.5">
				<Label>Input with Arrow</Label>
				<InputGroup className="w-full">
					<Input
						onChange={handleChange3}
						placeholder="12"
						value={amount3}
						type="numeric"
					/>
					<InputAddon
						mode="icon"
						className="divide-border flex flex-col divide-y p-0">
						<div
							className="flex h-1/2 w-full cursor-pointer items-center justify-center"
							onClick={(e) => {
								e.stopPropagation()
								setAmount3((v) => String(Number(v || "0") + 1))
							}}
							onMouseDown={(e) => e.preventDefault()}>
							<ChevronUp className="size-4" />
						</div>
						<div
							className="flex h-1/2 w-full cursor-pointer items-center justify-center"
							onClick={(e) => {
								e.stopPropagation()
								setAmount3((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"))
							}}
							onMouseDown={(e) => e.preventDefault()}>
							<ChevronDown className="size-4" />
						</div>
					</InputAddon>
				</InputGroup>
			</div>

			<div className="flex flex-col gap-1.5">
				<Label>Input with Inline </Label>
				<InputWrapper className="w-full">
					<Minus
						onClick={(e) => {
							e.stopPropagation()
							setAmount2((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"))
						}}
						onMouseDown={(e) => e.preventDefault()}
						className="cursor-pointer"
					/>
					<Input
						onChange={handleChange2}
						className="text-center"
						placeholder="12"
						value={amount2}
						type="numeric"
					/>
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
