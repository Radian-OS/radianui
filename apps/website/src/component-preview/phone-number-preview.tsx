import React, { useState } from "react"
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
import { Label } from "@/registry/ui/label"
import { PhoneNumber } from "@/registry/ui/phone-number"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const PhoneNumberPreview = () => {
	type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
	const [size, setSize] = useState<SizeOptions>("36")
	const [phone, setPhone] = useState<string>("")
	const [country, setCountry] = useState<import("react-phone-number-input").Country>("US")
	const [showTrigger, setShowTrigger] = useState<"true" | "false">("true")
	return (
		<Tabs defaultValue="preview" className="mb-10">
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
								<DropdownSubTrigger>Trigger</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										minSelectionCount={1}
										selectedValues={[showTrigger]}
										onSelectedChange={(keys) => {
											setShowTrigger(Array.from(keys)[0] as "true" | "false")
										}}>
										<DropdownItem value="true">true</DropdownItem>
										<DropdownItem value="false">false</DropdownItem>
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
				<div className="flex h-[420px] flex-col items-center justify-center rounded-xl border p-10">
					<div className="flex flex-col gap-1.5">
						<Label>Phone Number</Label>
						<PhoneNumber
							showTrigger={showTrigger === "true"}
							value={phone}
							size={size}
							onChange={setPhone}
							country={country}
							onCountryChange={setCountry}
							className="w-80"
						/>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeArea
					className="h-[420px]"
					language="tsx"
					code={` <div className="flex gap-1.5 flex-col">
 <PhoneNumber
 value="${phone}"
 showTrigger={${showTrigger === "true"}}
 size="${size}"
 onChange={setPhone}
 country="${country}"
 onCountryChange={setCountry}
 className='w-80'
 />`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default PhoneNumberPreview
