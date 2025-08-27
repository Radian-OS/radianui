import { useState } from "react"
import { Bell, Check, EyeIcon, Plus, Settings, SquareTerminal, TriangleAlert } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Avatar } from "@/registry/ui/avatar"
import { IconButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type Icon = "plus" | "alert" | "check" | "bell"

const DEFAULT_ICON: Icon = "plus"

const IndicatorAvatarPreview = () => {
	const [icon, setIcon] = useState<Icon>(DEFAULT_ICON)

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
							<DropdownSubTrigger>Icon</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownGroup selectionMode="single" onSelectedChange={(keys) => setIcon(Array.from(keys)[0] as Icon)} minSelectionCount={1} selectedValues={[icon]}>
									<DropdownItem value="bell">Bell</DropdownItem>
									<DropdownItem value="plus">Plus</DropdownItem>
									<DropdownItem value="alert">Alert</DropdownItem>
									<DropdownItem value="check">Check</DropdownItem>
								</DropdownGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="relative inline-block">
						<div className="bg-primary border-3 border-bg absolute bottom-0 right-0 z-10 translate-x-1 translate-y-1 transform rounded-full text-white">
							{icon === "bell" && <Bell size={20} className="p-0.5" />}
							{icon === "alert" && <TriangleAlert size={20} className="p-0.5" />}
							{icon === "check" && <Check size={20} className="p-0.5" />}
							{icon === "plus" && <Plus size={20} className="p-0.5" />}
						</div>

						<Avatar src="https://randomuser.me/api/portraits/men/1.jpg" name="John Doe" size="64"></Avatar>
					</div>{" "}
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="avatar.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<div className="relative inline-block">
	<div className="bg-primary border-3 border-bg absolute bottom-0 right-0 z-10 translate-x-1 translate-y-1 transform rounded-full text-white">
		${icon === "bell" ? `<Bell size={20} className="p-0.5" />` : ""}${icon === "alert" ? `<TriangleAlert size={20} className="p-0.5" />` : ""}${icon === "check" ? `<Check size={20} className="p-0.5" />` : ""}${icon === "plus" ? `<Plus size={20} className="p-0.5" />` : ""}
	</div>
	<Avatar src="https://randomuser.me/api/portraits/men/1.jpg" name="John Doe" size="64"></Avatar>
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default IndicatorAvatarPreview
