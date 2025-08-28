import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Avatar, AvatarGroup } from "@/registry/ui/avatar"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
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

type Size = "16" | "20" | "24" | "32"

const DEFAULT_SIZE: Size = "20"

const AvatargroupPreview = () => {
	const [size, setSize] = useState<Size>(DEFAULT_SIZE)
	const [maxItems, setMaxItems] = useState<number>(5)

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
								<DropdownRadioGroup value={size} onValueChange={(value) => setSize(value as Size)}>
									<DropdownRadioItem value="16" onSelect={(e) => e.preventDefault()}>
										16
									</DropdownRadioItem>
									<DropdownRadioItem value="20" onSelect={(e) => e.preventDefault()}>
										20
									</DropdownRadioItem>
									<DropdownRadioItem value="24" onSelect={(e) => e.preventDefault()}>
										24
									</DropdownRadioItem>
									<DropdownRadioItem value="32" onSelect={(e) => e.preventDefault()}>
										32
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
						<DropdownSub>
							<DropdownSubTrigger>Max Items</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(maxItems)} onValueChange={(value) => setMaxItems(Number(value))}>
									<DropdownRadioItem value="2" onSelect={(e) => e.preventDefault()}>
										2
									</DropdownRadioItem>
									<DropdownRadioItem value="3" onSelect={(e) => e.preventDefault()}>
										3
									</DropdownRadioItem>
									<DropdownRadioItem value="4" onSelect={(e) => e.preventDefault()}>
										4
									</DropdownRadioItem>
									<DropdownRadioItem value="5" onSelect={(e) => e.preventDefault()}>
										5
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<AvatarGroup maxItems={maxItems} {...(size !== DEFAULT_SIZE && { size })}>
						{people.map((person) => (
							<Avatar src={person.image} name={person.name} key={person.image} />
						))}
					</AvatarGroup>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="avatargroup.tsx"
					showLineNumber
					className="h-[420px]"
					code={`const people = [
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


export function AvatarGroupPreview() {
	return (
		<AvatarGroup maxItems={${maxItems}} {...(size !== DEFAULT_SIZE && { size })}>
			{people.map((person) => (
				<Avatar src={person.image} name={person.name} key={person.image} />
			))}
		</AvatarGroup>
	)
}`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default AvatargroupPreview
