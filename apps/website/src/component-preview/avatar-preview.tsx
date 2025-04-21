import { useState } from "react"
import { Avatar } from "@/registry/ui/avatar"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export const people = [
	{
		name: "John Doe",
		image: "https://randomuser.me/api/portraits/men/1.jpg",
	},
	{
		name: "Jane Smith",
		image: "https://randomuser.me/api/portraits/women/1.jpg",
	},
	{
		name: "Michael Brown",
		image: "https://randomuser.me/api/portraits/men/2.jpg",
	},
	{
		name: "Emily Davis",
		image: "https://randomuser.me/api/portraits/women/2.jpg",
	},
	{
		name: "Chris Johnson",
		image: "https://randomuser.me/api/portraits/men/3.jpg",
	},
	{
		name: "Sophia Lee",
		image: "https://randomuser.me/api/portraits/women/3.jpg",
	},
	{
		name: "Daniel Garcia",
		image: "https://randomuser.me/api/portraits/men/4.jpg",
	},
	{
		name: "Olivia Martinez",
		image: "https://randomuser.me/api/portraits/women/4.jpg",
	},
	{
		name: "Ethan Wilson",
		image: "https://randomuser.me/api/portraits/men/5.jpg",
	},
	{
		name: "Mia Taylor",
		image: "https://randomuser.me/api/portraits/women/5.jpg",
	},
]

type Size = "16" | "20" | "24" | "32" | "36" | "40" | "48" | "64" | "80"
type Variant = "circle" | "square"
type Status = "online" | "offline" | "verified" | "plus"

const AvatarPreview = () => {
	const [size, setSize] = useState<Size>("32")
	const [variant, setVariant] = useState<Variant>("circle")
	const [status, setStatus] = useState<Status>("verified")

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
										onSelectedChange={(keys) => setSize(Array.from(keys)[0] as Size)}
										minSelectionCount={1}
										selectedValues={[size]}>
										<DropdownItem value="16">16</DropdownItem>
										<DropdownItem value="20">20</DropdownItem>
										<DropdownItem value="24">24</DropdownItem>
										<DropdownItem value="32">32</DropdownItem>
										<DropdownItem value="36">36</DropdownItem>
										<DropdownItem value="40">40</DropdownItem>
										<DropdownItem value="48">48</DropdownItem>
										<DropdownItem value="64">64</DropdownItem>
										<DropdownItem value="80">80</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							{/* Dropdown for 'variant' */}
							<DropdownSub>
								<DropdownSubTrigger>Variant</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setVariant(Array.from(keys)[0] as Variant)}
										minSelectionCount={1}
										selectedValues={[variant]}>
										<DropdownItem value="circle">Circle</DropdownItem>
										<DropdownItem value="square">Square</DropdownItem>
									</DropdownGroup>
								</DropdownSubContent>
							</DropdownSub>

							{/* Dropdown for 'onlineIndicator' */}
							<DropdownSub>
								<DropdownSubTrigger>Status</DropdownSubTrigger>
								<DropdownSubContent>
									<DropdownGroup
										selectionMode="single"
										onSelectedChange={(keys) => setStatus(Array.from(keys)[0] as Status)}
										minSelectionCount={1}
										selectedValues={[status]}>
										<DropdownItem value="online">Online</DropdownItem>
										<DropdownItem value="offline">Offline</DropdownItem>
										<DropdownItem value="verified">Verified</DropdownItem>
										<DropdownItem value="plus">Plus</DropdownItem>
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
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Avatar src={people[0].image} name={people[0].name} size={size} variant={variant} status={status} />
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea language="tsx" showLineNumbers className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}

export default AvatarPreview
