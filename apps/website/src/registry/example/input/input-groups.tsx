import React, { useState } from "react"
import { Input, InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"

type currencyOption = "USD" | "EUR" | "GBP" | "INR"
type staffOption = "Admin" | "Editor" | "Viewer"

const InputGroups = () => {
	const [currency, setCurrency] = useState<currencyOption>()
	const [staff, setStaff] = useState<staffOption>()

	return (
		<div className="flex w-80 flex-col gap-6">
			<div className="flex flex-col gap-1.5">
				<Label>Currency</Label>
				<div className="flex">
					<InputGroup className="w-full">
						<Select
							value={currency}
							onValueChange={(values) => setCurrency(values as currencyOption)}>
							<SelectTrigger className="w-fit rounded-r-none">
								<SelectValue placeholder="USD" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="USD">USD</SelectItem>
								<SelectItem value="EUR">EUR</SelectItem>
								<SelectItem value="GBP">GBP</SelectItem>
								<SelectItem value="INR">INR</SelectItem>
							</SelectContent>
						</Select>
						<Input
							className="rounded-l-none border-l-0 focus-within:border-l md:w-fit"
							placeholder="160,000"
						/>
					</InputGroup>
				</div>
			</div>

			<div className="flex flex-col gap-1.5">
				<Label>Enter email</Label>
				<div className="flex">
					<InputGroup className="w-full">
						<Input
							className="rounded-r-none border-r-0 focus-within:border-r md:w-fit"
							placeholder="Enter email"
						/>
						<Select
							value={staff}
							onValueChange={(values) => setStaff(values as staffOption)}>
							<SelectTrigger className="w-fit rounded-l-none">
								<SelectValue placeholder="Admin" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Admin">Admin</SelectItem>
								<SelectItem value="Editor">Editor</SelectItem>
								<SelectItem value="Viewer">Viewer</SelectItem>
							</SelectContent>
						</Select>
					</InputGroup>
				</div>
			</div>
		</div>
	)
}

export default InputGroups
