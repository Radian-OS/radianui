import { useState } from "react"

import { EyeIcon, Settings, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Avatar } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type Size = "16" | "20" | "24" | "32" | "36" | "40" | "48" | "64" | "80"
type Variant = "circle" | "square"
type Status = "online" | "offline" | "verified" | "plus" | "none"

const DEFAULT_SIZE: Size = "36"
const DEFAULT_VARIANT: Variant = "circle"
const DEFAULT_STATUS: Status = "none"

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

const AvatarPreview = () => {
	const [size, setSize] = useState<Size>(DEFAULT_SIZE)
	const [variant, setVariant] = useState<Variant>(DEFAULT_VARIANT)
	const [status, setStatus] = useState<Status>(DEFAULT_STATUS)

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
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
						<Button variant="outline" color="neutral" size="36" iconOnly>
							<Settings />
						</Button>
					</DropdownTrigger>
					<DropdownContent className="min-w-20">
						{/* Dropdown for 'size' */}
						<DropdownSub>
							<DropdownSubTrigger>Size</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setSize(Array.from(keys)[0] as Size)} minSelectionCount={1} selectedValues={[size]}>
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
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setVariant(Array.from(keys)[0] as Variant)} minSelectionCount={1} selectedValues={[variant]}>
									<DropdownItem value="circle">Circle</DropdownItem>
									<DropdownItem value="square">Square</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						{/* Dropdown for 'status' */}
						<DropdownSub>
							<DropdownSubTrigger>Status</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setStatus(Array.from(keys)[0] as Status)} minSelectionCount={1} selectedValues={[status]}>
									<DropdownItem value="online">Online</DropdownItem>
									<DropdownItem value="offline">Offline</DropdownItem>
									<DropdownItem value="verified">Verified</DropdownItem>
									<DropdownItem value="plus">Plus</DropdownItem>
									<DropdownItem value="none">None</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Avatar
						src={people[0].image}
						name={people[0].name}
						{...(size !== DEFAULT_SIZE && { size: size })}
						{...(variant !== DEFAULT_VARIANT && { variant: variant })}
						{...(status !== DEFAULT_STATUS && { status: status })}
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="avatar.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Avatar src="${people[0].image}" name="${people[0].name}"${size !== DEFAULT_SIZE ? ` size="${size}"` : ""}${variant !== DEFAULT_VARIANT ? ` variant="${variant}"` : ""}${status !== DEFAULT_STATUS ? ` status="${status}"` : ""} />`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default AvatarPreview
