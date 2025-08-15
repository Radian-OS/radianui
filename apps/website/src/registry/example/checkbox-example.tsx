"use client"

import { Heart, HeartCrack } from "lucide-react"

import { Checkbox, CheckboxGroup } from "../ui/checkbox"

function CheckboxExample() {
	return (
		<div>
			<div className="my-4 flex gap-4">
				<Checkbox size="sm" defaultChecked>
					Option 1
				</Checkbox>

				<Checkbox size="md" defaultChecked>
					Option 2
				</Checkbox>

				<Checkbox icon={<HeartCrack />} size="lg" defaultChecked disabled>
					Option 3
				</Checkbox>

				<Checkbox icon={<Heart className="fill-red-600 stroke-1" />} size="lg" defaultChecked>
					Option 3
				</Checkbox>
			</div>
			<div className="my-4">
				<CheckboxGroup size="lg" defaultValue={["1", "4"]} label="Select Options" className="max-w-[400px]">
					<Checkbox value="1">Option 1</Checkbox>
					<Checkbox value="2">Option 2</Checkbox>
					<Checkbox value="3">Option 3</Checkbox>
					<Checkbox value="4" disabled>
						Option 4 (Disabled)
					</Checkbox>
				</CheckboxGroup>
			</div>
			<div className="my-4">
				<div className="max-w-80 rounded-md border p-4 shadow-sm">
					<CheckboxGroup defaultValue={["angus_mac_gyver", "mike_torrello", "angela_bower"]} label="Select Members" className="gap-3.5">
						<Checkbox value="mike_torrello">
							<div className="flex flex-col">
								<span className="font-medium">Mike Torello</span>
								<p className="text-fg-tertiary font-normal">Head of Department of Physics</p>
							</div>
						</Checkbox>
						<Checkbox value="angela_bower">
							<div className="flex flex-col">
								<span className="font-medium">Angela Bower</span>
								<p className="text-fg-tertiary font-normal">Department of Neurology</p>
							</div>
						</Checkbox>
						<Checkbox value="anna_mureum">
							<div className="flex flex-col">
								<span className="font-medium">Anna Mureum</span>
								<p className="text-fg-tertiary font-normal">Head of Engineering</p>
							</div>
						</Checkbox>
						<Checkbox value="theodore_calvin">
							<div className="flex flex-col">
								<span className="font-medium">Theodore T.C. Calvin</span>
								<p className="text-fg-tertiary font-normal">Department of Thermodynamics</p>
							</div>
						</Checkbox>
						<Checkbox value="angus_mac_gyver" disabled>
							<div className="flex flex-col">
								<span className="font-medium">Angus MacGyver</span>
								<p className="text-fg-tertiary font-normal">Resigned</p>
							</div>
						</Checkbox>
					</CheckboxGroup>
				</div>
			</div>
		</div>
	)
}

export default CheckboxExample
