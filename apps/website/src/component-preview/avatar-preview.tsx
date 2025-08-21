import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Avatar } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type Size = "16" | "20" | "24" | "32" | "36" | "40" | "48" | "64" | "80"
type Radius = "circle" | "square"
type Status = "online" | "offline" | "none"
type Variant = "fallback" | "initial" | "image"

const DEFAULT_SIZE: Size = "36"
const DEFAULT_RADIUS: Radius = "circle"
const DEFAULT_STATUS: Status = "none"
const DEFAULT_VARIANT: Variant = "image"

const AvatarPreview = () => {
	const [size, setSize] = useState<Size>(DEFAULT_SIZE)
	const [variant, setVariant] = useState<Variant>(DEFAULT_VARIANT)
	const [status, setStatus] = useState<Status>(DEFAULT_STATUS)
	const [radius, setRadius] = useState<Radius>(DEFAULT_RADIUS)

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

						<DropdownSub>
							<DropdownSubTrigger>Variant</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setVariant(Array.from(keys)[0] as Variant)} minSelectionCount={1} selectedValues={[variant]}>
									<DropdownItem value="fallback">Fallback</DropdownItem>
									<DropdownItem value="initial">Initial</DropdownItem>
									<DropdownItem value="image">Image</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Radius</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setRadius(Array.from(keys)[0] as Radius)} minSelectionCount={1} selectedValues={[radius]}>
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
						{...(variant === "image" && { src: "https://randomuser.me/api/portraits/men/1.jpg" })}
						{...(variant === "initial" && { name: "John Doe" })}
						{...(size !== DEFAULT_SIZE && { size: size })}
						{...(radius !== DEFAULT_RADIUS && { radius: radius })}
						{...(status !== DEFAULT_STATUS && { status: status })}
					/>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="avatar.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Avatar ${variant === "image" ? `src="https://randomuser.me/api/portraits/men/1.jpg"` : ""}${variant === "initial" ? `name="John Doe"` : ""}${size !== DEFAULT_SIZE ? ` size="${size}"` : ""}${radius !== DEFAULT_RADIUS ? ` radius="${radius}"` : ""}${status !== DEFAULT_STATUS ? ` status="${status}"` : ""} />`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default AvatarPreview
