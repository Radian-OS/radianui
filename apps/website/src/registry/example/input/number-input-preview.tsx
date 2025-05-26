import { useEffect, useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import {
	Dropdown,
	DropdownContent,
	DropdownGroup,
	DropdownItem,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
export type LabelOptions = "true" | "false"
export type DisabledOptions = "true" | "false"
export type ErrorOptions = "true" | "false"
export type trailOptions = "show" | "hide" | "onFocus"

const NumberInputPreview = () => {
	const [size, setSize] = useState<SizeOptions>("36")
	const [example, setExample] = useState<"custom" | "default" | "basic">("default")
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
import { Button } from '@/registry/ui/button'
import { Input } from '@/registry/ui/input'
import { Label } from '@/registry/ui/label'
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
	example === "custom" &&
	`<div className="flex flex-col gap-1.5">
  <Label>Amount</Label>
  <div className="flex rounded-md">
    <Button
      isIcon
      size={size}
      className="border-border-alpha focus-visible:border-primary -ms-0 w-fit rounded-r-none border focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      variant="neutral-soft"
      onClick={() => setAmount((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"))}
    >
      <Minus className="text-text-disabled size-5" />
    </Button>
    <Input
      className="w-80 rounded-l-none border-l-0 border-r-0 focus-within:border-l focus-within:border-r"
      size={size}
      placeholder="Enter Number Here"
      inputMode="numeric"
      custom={true}
      onChange={handleChange}
      value={amount}
    />
    <Button
      isIcon
      size={size}
      className="border-border-alpha focus-visible:border-primary -ms-0 w-fit rounded-l-none border focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      variant="neutral-soft"
      onClick={() => setAmount((v) => String(Number(v || "0") + 1))}
    >
      <Plus className="text-text-disabled size-5" />
    </Button>
  </div>
</div>
`
}
${
	example === "default" &&
	`<Input
value={amount}
onChange={handleChange}
lead={
<Plus
className="size-5 cursor-pointer"
onClick={(e) => {
e.stopPropagation();
setAmount((v) => String(Number(v || "0") + 1));
}}
onMouseDown={(e) => e.preventDefault()}
/>
}
trail={
<Minus
onClick={(e) => {
e.stopPropagation();
setAmount((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"));
}}
className="size-5 cursor-pointer"
onMouseDown={(e) => e.preventDefault()}
/>
}
className="w-80"
label="Amount"
/>
`
}

${
	example === "basic" &&
	`<Input
onChange={handleChange}
className="w-80"
size="${size}"
value={${amount}}
label="Amount"
placeholder="Enter Number Here"
inputMode="numeric"
/>`
}
}

export default CounterInput
	`

	return (
		<Tabs defaultValue="preview" className="mb-10 mt-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>
						<DropdownContent className="min-w-20">
							<DropdownSub>
								<DropdownSubTrigger>Size</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setSize(Array.from(keys)[0] as SizeOptions)
										}}
										minSelectionCount={1}
										selectedValues={[size]}>
										<DropdownItem value="28">28</DropdownItem>
										<DropdownItem value="32">32</DropdownItem>
										<DropdownItem value="36">36</DropdownItem>
										<DropdownItem value="40">40</DropdownItem>
										<DropdownItem value="44">44</DropdownItem>
										<DropdownItem value="48">48</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
							<DropdownSub>
								<DropdownSubTrigger>Example</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => {
											setExample(Array.from(keys)[0] as "custom" | "default" | "basic")
										}}
										minSelectionCount={1}
										selectedValues={[example]}>
										<DropdownItem value="custom">Custom</DropdownItem>
										<DropdownItem value="default">Default</DropdownItem>
										<DropdownItem value="basic">Basic</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>
						</DropdownContent>
					</Dropdown>
				</div>
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					{example === "custom" && (
						<div className="flex flex-col gap-1.5">
							<Label>Amount</Label>
							<div className="flex rounded-md">
								<Button
									isIcon
									size={size}
									className="border-border-alpha focus-visible:border-primary -ms-0 w-fit rounded-r-none border text-center focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
									variant="neutral-soft"
									onClick={() => setAmount((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"))}>
									<Minus className="text-text-disabled size-5" />
								</Button>
								<Input
									className="w-80 rounded-l-none border-l-0 border-r-0 text-center focus-within:border-l focus-within:border-r"
									size={size}
									inputMode="numeric"
									custom={true}
									onChange={handleChange}
									value={amount}
								/>
								<Button
									isIcon
									size={size}
									className="border-border-alpha focus-visible:border-primary -ms-0 w-fit rounded-l-none border focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
									variant="neutral-soft"
									onClick={() => setAmount((v) => String(Number(v || "0") + 1))}>
									<Plus className="text-text-disabled size-5" />
								</Button>
							</div>
						</div>
					)}
					{example === "default" && (
						<Input
							value={amount}
							onChange={handleChange}
							size={size}
							lead={
								<Minus
									onClick={(e) => {
										e.stopPropagation()
										setAmount((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"))
									}}
									className="size-5 cursor-pointer"
									onMouseDown={(e) => e.preventDefault()}
								/>
							}
							trail={
								<Plus
									className="size-5 cursor-pointer"
									onClick={(e) => {
										e.stopPropagation()
										setAmount((v) => String(Number(v || "0") + 1))
									}}
									onMouseDown={(e) => e.preventDefault()}
								/>
							}
							className="w-80 text-center"
							label="Amount"
						/>
					)}
					{example === "basic" && (
						<Input onChange={handleChange} className="w-80 text-center" size={size} value={amount} label="Amount" inputMode="numeric" />
					)}
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea language="tsx" showLineNumbers className="h-[420px]" code={code} />
			</TabsContent>
		</Tabs>
	)
}

export default NumberInputPreview
