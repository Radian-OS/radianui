import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Avatar } from "@/registry/ui/avatar"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
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
									<DropdownRadioItem value="36" onSelect={(e) => e.preventDefault()}>
										36
									</DropdownRadioItem>
									<DropdownRadioItem value="40" onSelect={(e) => e.preventDefault()}>
										40
									</DropdownRadioItem>
									<DropdownRadioItem value="48" onSelect={(e) => e.preventDefault()}>
										48
									</DropdownRadioItem>
									<DropdownRadioItem value="64" onSelect={(e) => e.preventDefault()}>
										64
									</DropdownRadioItem>
									<DropdownRadioItem value="80" onSelect={(e) => e.preventDefault()}>
										80
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Variant</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={variant} onValueChange={(value) => setVariant(value as Variant)}>
									<DropdownRadioItem value="fallback" onSelect={(e) => e.preventDefault()}>
										Fallback
									</DropdownRadioItem>
									<DropdownRadioItem value="initial" onSelect={(e) => e.preventDefault()}>
										Initial
									</DropdownRadioItem>
									<DropdownRadioItem value="image" onSelect={(e) => e.preventDefault()}>
										Image
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						<DropdownSub>
							<DropdownSubTrigger>Radius</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={radius} onValueChange={(value) => setRadius(value as Radius)}>
									<DropdownRadioItem value="circle" onSelect={(e) => e.preventDefault()}>
										Circle
									</DropdownRadioItem>
									<DropdownRadioItem value="square" onSelect={(e) => e.preventDefault()}>
										Square
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>

						{/* Dropdown for 'status' */}
						<DropdownSub>
							<DropdownSubTrigger>Status</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={status} onValueChange={(value) => setStatus(value as Status)}>
									<DropdownRadioItem value="online" onSelect={(e) => e.preventDefault()}>
										Online
									</DropdownRadioItem>
									<DropdownRadioItem value="offline" onSelect={(e) => e.preventDefault()}>
										Offline
									</DropdownRadioItem>
									<DropdownRadioItem value="none" onSelect={(e) => e.preventDefault()}>
										None
									</DropdownRadioItem>
								</DropdownRadioGroup>
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
