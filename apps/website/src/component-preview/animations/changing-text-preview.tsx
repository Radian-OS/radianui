import { ChangingText } from "@/registry/animated/changing-text"
import { CodeArea } from "@/registry/ui/code-area"
import { Dropdown, DropdownContent, DropdownGroup, DropdownSub, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const ChangingTextPreview = () => {
	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Dropdown>
						<DropdownTrigger>Properties</DropdownTrigger>

						<DropdownContent className="min-w-20">
							<DropdownGroup>
								<DropdownSub></DropdownSub>
							</DropdownGroup>
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
					<span className="w-100 flex items-center gap-1.5 text-3xl font-medium">
						UI library for
						<ChangingText texts={["Developers", "Designers"]} />
					</span>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-[420px]"
					code={`<span className="w-100 flex items-center gap-1.5 text-3xl font-medium">
    UI library for
    <ChangingText texts={["Developers", "Designers"]} />
</span>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default ChangingTextPreview
