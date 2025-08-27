import { EyeIcon, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const DropdownWithCheckboxExample = () => {
	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"}>
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
				<Dropdown></Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Dropdown>
						<DropdownTrigger asChild>
							<IconButton variant="outline" color="neutral">
								Open
							</IconButton>
						</DropdownTrigger>
						<DropdownContent align="center" className="w-80 space-y-0.5">
							<DropdownItem className="px-2 py-1.5" onClick={(e) => e.preventDefault()}>
								<Checkbox className="[&_svg]:text-white">Checkbox A</Checkbox>
							</DropdownItem>
							<DropdownItem className="px-2 py-1.5" onClick={(e) => e.preventDefault()}>
								<Checkbox className="[&_svg]:text-white">Checkbox B</Checkbox>
							</DropdownItem>
							<DropdownItem className="px-2 py-1.5" onClick={(e) => e.preventDefault()}>
								<Checkbox className="[&_svg]:text-white">Checkbox C</Checkbox>
							</DropdownItem>
							<DropdownItem className="px-2 py-1.5" onClick={(e) => e.preventDefault()}>
								<Checkbox className="[&_svg]:text-white">Checkbox D</Checkbox>
							</DropdownItem>
						</DropdownContent>
					</Dropdown>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="user-menu-dropdown.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Dropdown>
	<DropdownTrigger asChild>
		<Button variant="outline" color="neutral">
			Open
		</Button>
	</DropdownTrigger>
	<DropdownContent align="center" className="w-80 space-y-0.5">
		<DropdownItem className="px-2 py-1.5" onClick={(e) => e.preventDefault()}>
			<Checkbox className="[&_svg]:text-white">Checkbox A</Checkbox>
		</DropdownItem>
		<DropdownItem className="px-2 py-1.5" onClick={(e) => e.preventDefault()}>
			<Checkbox className="[&_svg]:text-white">Checkbox B</Checkbox>
		</DropdownItem>
		<DropdownItem className="px-2 py-1.5" onClick={(e) => e.preventDefault()}>
			<Checkbox className="[&_svg]:text-white">Checkbox C</Checkbox>
		</DropdownItem>
		<DropdownItem className="px-2 py-1.5" onClick={(e) => e.preventDefault()}>
			<Checkbox className="[&_svg]:text-white">Checkbox D</Checkbox>
		</DropdownItem>
	</DropdownContent>
</Dropdown>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default DropdownWithCheckboxExample
