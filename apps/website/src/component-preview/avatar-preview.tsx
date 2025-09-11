import { useState } from "react"
import { EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type Size = "16" | "20" | "24" | "32" | "36" | "40" | "48" | "64" | "80"
type Radius = "circle" | "square"

const DEFAULT_SIZE: Size = "36"
const DEFAULT_RADIUS: Radius = "circle"

const AvatarPreview = () => {
	const [size, setSize] = useState<Size>(DEFAULT_SIZE)
	const [radius, setRadius] = useState<Radius>(DEFAULT_RADIUS)

	return (
		<Tabs defaultValue="preview">
			<div className="flex items-center justify-between">
				<TabsList variant="outline-ghost" size="md">
					<TabsTrigger value="preview">
						<EyeIcon />
						Preview
					</TabsTrigger>
					<TabsTrigger value="code">
						<SquareTerminal />
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
									{[16, 20, 24, 32, 36, 40, 48, 64, 80].map((size) => (
										<DropdownRadioItem key={size} value={size.toString()} onSelect={(e) => e.preventDefault()}>
											{size}
										</DropdownRadioItem>
									))}
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
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<Avatar size={size} rounded={radius}>
						<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
						<AvatarFallback>JD</AvatarFallback>
					</Avatar>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet title="avatar.tsx" showLineNumber className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}

export default AvatarPreview
