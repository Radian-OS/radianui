import { useState } from "react"
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

const CounterInputPreview = () => {
	const [size, setSize] = useState<SizeOptions>("36")
	const [amount, setAmount] = useState("")

	interface HandleChangeEvent {
		target: {
			value: string
		}
	}

	const handleChange = (e: HandleChangeEvent) => {
		// strip out any non-digits
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
    
const page = () => {
const [amount, setAmount] = useState('')
    
    
const handleChange = (e: HandleChangeEvent) => {
// strip out any non-digits
const onlyDigits = e.target.value.replace(/\D/g, '')
setAmount(onlyDigits)
}
return (
<div className="*:not-first:mt-2">
<Label>Amount</Label>
<div className="flex rounded-md">
<Button
size="${size}"
className="-ms-0 w-fit border rounded-r-none border-border-alpha" variant="neutral-soft"
onClick={() => setAmount((v) => (Number(v) > 0 ? String(Number(v) - 1) : '0'))}
>
<Minus className="size-5 text-text-disabled" />
</Button>
<Input
className="w-80 border-r-0 border-l-0 focus-within:border-r focus-within:border-l rounded-l-none"
size="${size}"
placeholder="Enter Number Here"
inputMode="numeric"
custom={true}
onChange={handleChange}
value={amount}
/>
<Button
size="${size}"
className="-ms-0 w-fit border border-border-alpha rounded-l-none" variant="neutral-soft"
onClick={() => setAmount((v) => String(Number(v || '0') + 1))}
>
<Plus className="size-5 text-text-disabled" />
</Button>
</div>
</div>
)
}
    
export default page
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
					<div className="*:not-first:mt-2">
						<Label>Amount</Label>
						<div className="flex rounded-md">
							<Button
								size={size}
								className="border-border-alpha focus-visible:border-primary -ms-0 w-fit rounded-r-none border focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
								variant="neutral-soft"
								onClick={() => setAmount((v) => (Number(v) > 0 ? String(Number(v) - 1) : "0"))}>
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
								size={size}
								className="border-border-alpha focus-visible:border-primary -ms-0 w-fit rounded-l-none border focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
								variant="neutral-soft"
								onClick={() => setAmount((v) => String(Number(v || "0") + 1))}>
								<Plus className="text-text-disabled size-5" />
							</Button>
						</div>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea language="tsx" showLineNumbers className="h-[420px]" code={code} />
			</TabsContent>
		</Tabs>
	)
}

export default CounterInputPreview
