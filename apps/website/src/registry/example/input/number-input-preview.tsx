import { useEffect, useState } from "react"
import { EyeIcon, Minus, Plus, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Input, InputAddon, InputGroup, InputWrapper } from "@/registry/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"

const NumberInputPreview = () => {
	const [size, setSize] = useState<SizeOptions>("36")
	const [example, setExample] = useState<"inputWrapper" | "inputGroup" | "basic">("inputGroup")
	const [amount, setAmount] = useState("")

	// Reset amount when example changes
	useEffect(() => {
		setAmount("")
	}, [example])

	interface HandleChangeEvent {
		target: {
			value: string
		}
	}

	const handleChange = (e: HandleChangeEvent) => {
		const onlyDigits = e.target.value.replace(/\D/g, "")
		setAmount(onlyDigits)
	}

	const code = `"use client"
import { Input${example === "inputGroup" ? ", InputGroup, InputAddon" : example === "inputWrapper" ? ", InputWrapper" : ""} } from '@/registry/ui/input'
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'
    
interface HandleChangeEvent {
	target: {
		value: string
	}
}
    
const CounterInput = () => {
const [amount, setAmount] = useState('')
    
    
const handleChange = (e: HandleChangeEvent) => {
// strip out any non-digits
const onlyDigits = e.target.value.replace(/\D/g, '')
setAmount(onlyDigits)
}
return (
${
	example === "inputWrapper"
		? `<InputWrapper size="${size}" className="w-80">
		<Minus
			onClick={(e) => {
				e.stopPropagation()
				setAmount((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"))
			}}
			className="cursor-pointer"
			onMouseDown={(e) => e.preventDefault()}
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
`
		: example === "inputGroup"
			? `<InputGroup className="w-80">
	<InputAddon size="${size}">
		<Minus
			onClick={(e) => {
				e.stopPropagation()
				setAmount((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"))
			}}
			className="cursor-pointer"
			onMouseDown={(e) => e.preventDefault()}
		/>
	</InputAddon>
	<Input onChange={handleChange} value={amount} size="${size}" type="numeric" />
	<InputAddon size="${size}">
		<Plus
			className="cursor-pointer"
			onClick={(e) => {
				e.stopPropagation()
				setAmount((v) => String(Number(v || "0") + 1))
			}}
			onMouseDown={(e) => e.preventDefault()}
		/>
	</InputAddon>
</InputGroup>
`
			: `<Input onChange={handleChange} className="w-80" placeholder="Enter Amount Here" size="${size}" value={amount} type="numeric" />`
}
)}

export default CounterInput
	`

	return (
		<Tabs className="mt-3" defaultValue="preview" variant={"outline-ghost"} size={"md"}>
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
				<Dropdown>
					<DropdownTrigger asChild>
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as SizeOptions)}>
									<DropdownRadioItem value="28" onSelect={(e) => e.preventDefault()}>
										28
									</DropdownRadioItem>
									<DropdownRadioItem value="32" onSelect={(e) => e.preventDefault()}>
										32
									</DropdownRadioItem>
									<DropdownRadioItem value="36" onSelect={(e) => e.preventDefault()}>
										36
									</DropdownRadioItem>
									<DropdownRadioItem value="40" onSelect={(e) => e.preventDefault()}>
										40
									</DropdownRadioItem>
									<DropdownRadioItem value="44" onSelect={(e) => e.preventDefault()}>
										44
									</DropdownRadioItem>
									<DropdownRadioItem value="48" onSelect={(e) => e.preventDefault()}>
										48
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Example</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={example} onValueChange={(value) => setExample(value as "inputWrapper" | "inputGroup" | "basic")}>
									<DropdownRadioItem value="inputWrapper" onSelect={(e) => e.preventDefault()}>
										InputWrapper
									</DropdownRadioItem>
									<DropdownRadioItem value="inputGroup" onSelect={(e) => e.preventDefault()}>
										InputGroup
									</DropdownRadioItem>
									<DropdownRadioItem value="basic" onSelect={(e) => e.preventDefault()}>
										Basic
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					{example === "inputWrapper" && (
						<InputWrapper size={size} className="w-80">
							<Minus
								onClick={(e) => {
									e.stopPropagation()
									setAmount((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"))
								}}
								className="cursor-pointer"
								onMouseDown={(e) => e.preventDefault()}
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
					)}
					{example === "inputGroup" && (
						<InputGroup className="w-80">
							<InputAddon size={size}>
								<Minus
									onClick={(e) => {
										e.stopPropagation()
										setAmount((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"))
									}}
									className="cursor-pointer"
									onMouseDown={(e) => e.preventDefault()}
								/>
							</InputAddon>
							<Input onChange={handleChange} value={amount} size={size} type="numeric" />
							<InputAddon size={size}>
								<Plus
									className="cursor-pointer"
									onClick={(e) => {
										e.stopPropagation()
										setAmount((v) => String(Number(v || "0") + 1))
									}}
									onMouseDown={(e) => e.preventDefault()}
								/>
							</InputAddon>
						</InputGroup>
					)}
					{example === "basic" && <Input onChange={handleChange} className="w-80" placeholder="Enter Amount Here" size={size} value={amount} type="numeric" />}
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="number-input-preview.tsx" showLineNumber className="h-[420px]" code={code} />
			</TabsContent>
		</Tabs>
	)
}

export default NumberInputPreview
