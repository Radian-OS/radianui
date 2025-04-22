import React from "react"
import { Checkbox, CheckboxGroup } from "@/registry/ui/checkbox"
import { CodeArea } from "@/registry/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

function SelectMamberCheckboxgroupExample() {
	return (
		<Tabs defaultValue="preview" className="mb-10">
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>
			{/* Preview Tab */}
			<TabsContent value="preview">
				<div className="h-105 flex items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="bg-bg-base max-w-80 rounded-md border p-4 shadow-sm">
						<CheckboxGroup defaultValue={["angus_mac_gyver", "mike_torrello", "angela_bower"]} label="Select Members" className="gap-3.5">
							<Checkbox value="mike_torrello">
								<div className="flex flex-col">
									<span className="font-medium">Mike Torello</span>
									<p className="text-text-tertiary font-normal">Head of Department of Physics</p>
								</div>
							</Checkbox>
							<Checkbox value="angela_bower">
								<div className="flex flex-col">
									<span className="font-medium">Angela Bower</span>
									<p className="text-text-tertiary font-normal">Department of Neurology</p>
								</div>
							</Checkbox>
							<Checkbox value="anna_mureum">
								<div className="flex flex-col">
									<span className="font-medium">Anna Mureum</span>
									<p className="text-text-tertiary font-normal">Head of Engineering</p>
								</div>
							</Checkbox>
							<Checkbox value="theodore_calvin">
								<div className="flex flex-col">
									<span className="font-medium">Theodore T.C. Calvin</span>
									<p className="text-text-tertiary font-normal">Department of Thermodynamics</p>
								</div>
							</Checkbox>
							<Checkbox value="angus_mac_gyver" disabled>
								<div className="flex flex-col">
									<span className="font-medium">Angus MacGyver</span>
									<p className="text-text-tertiary font-normal">Resigned</p>
								</div>
							</Checkbox>
						</CheckboxGroup>
					</div>
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-105"
					code={`<div className="bg-bg-base max-w-80 rounded-md border p-4 shadow-sm">
	<CheckboxGroup defaultValue={["angus_mac_gyver", "mike_torrello", "angela_bower"]} label="Select Members" className="gap-3.5">
		<Checkbox value="mike_torrello">
			<div className="flex flex-col">
				<span className="font-medium">Mike Torello</span>
				<p className="text-text-tertiary font-normal">Head of Department of Physics</p>
			</div>
		</Checkbox>
		<Checkbox value="angela_bower">
			<div className="flex flex-col">
				<span className="font-medium">Angela Bower</span>
				<p className="text-text-tertiary font-normal">Department of Neurology</p>
			</div>
		</Checkbox>
		<Checkbox value="anna_mureum">
			<div className="flex flex-col">
				<span className="font-medium">Anna Mureum</span>
				<p className="text-text-tertiary font-normal">Head of Engineering</p>
			</div>
		</Checkbox>
		<Checkbox value="theodore_calvin">
			<div className="flex flex-col">
				<span className="font-medium">Theodore T.C. Calvin</span>
				<p className="text-text-tertiary font-normal">Department of Thermodynamics</p>
			</div>
		</Checkbox>
		<Checkbox value="angus_mac_gyver" disabled>
			<div className="flex flex-col">
				<span className="font-medium">Angus MacGyver</span>
				<p className="text-text-tertiary font-normal">Resigned</p>
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
