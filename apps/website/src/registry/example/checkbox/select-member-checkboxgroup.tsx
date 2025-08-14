import React from "react"

import { EyeIcon, SquareTerminal } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Checkbox, CheckboxGroup } from "@/registry/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

function SelectMamberCheckboxgroupExample() {
	return (
		<Tabs defaultValue="preview" variant="outline-ghost">
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
			</div>
			{/* Preview Tab */}
			<TabsContent value="preview">
				<div className="h-105 flex items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="bg-base min-w-80 rounded-md border p-4 shadow-sm">
						<CheckboxGroup defaultValue={["angus_mac_gyver", "mike_torrello", "angela_bower"]} label="Select Members" className="gap-3.5">
							<Checkbox value="mike_torrello" className="items-start">
								<div className="flex flex-col">
									<span className="font-medium">Mike Torello</span>
									<p className="text-fg-tertiary font-normal">Head of Department of Physics</p>
								</div>
							</Checkbox>
							<Checkbox value="angela_bower" className="items-start">
								<div className="flex flex-col">
									<span className="font-medium">Angela Bower</span>
									<p className="text-fg-tertiary font-normal">Department of Neurology</p>
								</div>
							</Checkbox>
							<Checkbox value="anna_mureum" className="items-start">
								<div className="flex flex-col">
									<span className="font-medium">Anna Mureum</span>
									<p className="text-fg-tertiary font-normal">Head of Engineering</p>
								</div>
							</Checkbox>
							<Checkbox value="theodore_calvin" className="items-start">
								<div className="flex flex-col">
									<span className="font-medium">Theodore T.C. Calvin</span>
									<p className="text-fg-tertiary font-normal">Department of Thermodynamics</p>
								</div>
							</Checkbox>
							<Checkbox value="angus_mac_gyver" className="items-start" disabled>
								<div className="flex flex-col">
									<span className="font-medium">Angus MacGyver</span>
									<p className="text-fg-tertiary font-normal">Resigned</p>
								</div>
							</Checkbox>
						</CheckboxGroup>
					</div>
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeSnippet
					title="select-member-checkboxgroup.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<div className="bg-base max-w-80 rounded-md border p-4 shadow-sm">
	<CheckboxGroup defaultValue={["angus_mac_gyver", "mike_torrello", "angela_bower"]} label="Select Members" className="gap-3.5">
		<Checkbox value="mike_torrello" className="items-start">
			<div className="flex flex-col">
				<span className="font-medium">Mike Torello</span>
				<p className="text-fg-tertiary font-normal">Head of Department of Physics</p>
			</div>
		</Checkbox>
		<Checkbox value="angela_bower" className="items-start">
			<div className="flex flex-col">
				<span className="font-medium">Angela Bower</span>
				<p className="text-fg-tertiary font-normal">Department of Neurology</p>
			</div>
		</Checkbox>
		<Checkbox value="anna_mureum" className="items-start">
			<div className="flex flex-col">
				<span className="font-medium">Anna Mureum</span>
				<p className="text-fg-tertiary font-normal">Head of Engineering</p>
			</div>
		</Checkbox>
		<Checkbox value="theodore_calvin" className="items-start">
			<div className="flex flex-col">
				<span className="font-medium">Theodore T.C. Calvin</span>
				<p className="text-fg-tertiary font-normal">Department of Thermodynamics</p>
			</div>
		</Checkbox>
		<Checkbox value="angus_mac_gyver" className="items-start" disabled>
			<div className="flex flex-col">
				<span className="font-medium">Angus MacGyver</span>
				<p className="text-fg-tertiary font-normal">Resigned</p>
			</div>
		</Checkbox>
	</CheckboxGroup>
</div>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default SelectMamberCheckboxgroupExample
