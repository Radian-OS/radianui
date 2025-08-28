import { useEffect, useState } from "react"
import { EyeIcon, Minus, Plus, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
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
      
      size={size}
      className="border-alpha focus-visible:border-primary -ms-0 w-fit rounded-r-none border focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      variant="neutral-soft"
      onClick={() => setAmount((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"))}
    >
      <Minus className="text-fg-disabled size-5" />
    </Button>
    <Input
      className="w-61 rounded-l-none border-l-0 border-r-0 focus-within:border-l focus-within:border-r"
      size={size}
      placeholder="Enter Number Here"
      inputMode="numeric"
      custom={true}
      onChange={handleChange}
      value={amount}
    />
    <Button
      
      size={size}
      className="border-alpha focus-visible:border-primary -ms-0 w-fit rounded-l-none border focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      variant="neutral-soft"
      onClick={() => setAmount((v) => String(Number(v || "0") + 1))}
    >
      <Plus className="text-fg-disabled size-5" />
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
								<DropdownRadioGroup value={example} onValueChange={(value) => setExample(value as "custom" | "default" | "basic")}>
									<DropdownRadioItem value="custom" onSelect={(e) => e.preventDefault()}>
										Custom
									</DropdownRadioItem>
									<DropdownRadioItem value="default" onSelect={(e) => e.preventDefault()}>
										Default
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
					{example === "custom" && (
						<div className="flex flex-col gap-1.5">
							<Label>Amount</Label>
							<div className="flex rounded-md">
								<IconButton
									size={size}
									className="border-alpha focus-visible:border-primary -ms-0 w-fit rounded-r-none border text-center focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
									variant="soft"
									color="neutral"
									onClick={() => setAmount((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"))}>
									<Minus className="text-fg-disabled size-5" />
								</IconButton>
								<Input
									className="w-61 rounded-l-none border-l-0 border-r-0 text-center focus-within:border-l focus-within:border-r"
									size={size}
									inputMode="numeric"
									custom={true}
									onChange={handleChange}
									value={amount}
								/>
								<IconButton
									size={size}
									className="border-alpha focus-visible:border-primary -ms-0 w-fit rounded-l-none border focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
									variant="soft"
									color="neutral"
									onClick={() => setAmount((v) => String(Number(v || "0") + 1))}>
									<Plus className="text-fg-disabled size-5" />
								</IconButton>
							</div>
						</div>
					)}
					{example === "default" && (
						<Input
							value={amount}
							onChange={handleChange}
							size={size}
							start={
								<Minus
									onClick={(e) => {
										e.stopPropagation()
										setAmount((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"))
									}}
									className="size-5 cursor-pointer"
									onMouseDown={(e) => e.preventDefault()}
								/>
							}
							end={
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
					{example === "basic" && <Input onChange={handleChange} className="w-80" placeholder="Enter Amount Here" size={size} value={amount} label="Amount" inputMode="numeric" />}
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="number-input-preview.tsx" showLineNumber className="h-[420px]" code={code} />
			</TabsContent>
		</Tabs>
	)
}

export default NumberInputPreview
